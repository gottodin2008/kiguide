#!/usr/bin/env node
// YouTube-MCP-Server ohne Abhängigkeiten: Videoinfos, Kapitel und Transkripte
// über YouTubes InnerTube-API (youtubei.googleapis.com), dieselbe Schnittstelle,
// die auch die YouTube-Apps nutzen. Kein API-Key, keine Credits.
//
// Als MCP-Server (stdio):   node tools/youtube-mcp/server.mjs
// Direkt im Terminal:       node tools/youtube-mcp/server.mjs info <url|id>
//                           node tools/youtube-mcp/server.mjs transcript <url|id> [von] [bis] [sprache]

const API = "https://youtubei.googleapis.com/youtubei/v1";
const WEB_CLIENT = { clientName: "WEB", clientVersion: "2.20250101.00.00", hl: "de", gl: "DE" };
const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36";
const PLAYER_CLIENTS = [
  {
    client: { clientName: "ANDROID", clientVersion: "20.10.38", androidSdkVersion: 30, hl: "de", gl: "DE" },
    ua: "com.google.android.youtube/20.10.38 (Linux; U; Android 11) gzip",
  },
  {
    client: { clientName: "IOS", clientVersion: "20.10.4", deviceModel: "iPhone16,2", hl: "de", gl: "DE" },
    ua: "com.google.ios.youtube/20.10.4 (iPhone16,2; U; CPU iOS 18_3 like Mac OS X)",
  },
  { client: WEB_CLIENT, ua: BROWSER_UA },
];

// ---------- Hilfsfunktionen ----------

export function parseVideoId(input) {
  const s = String(input ?? "").trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:[?&]v=|youtu\.be\/|\/shorts\/|\/embed\/|\/live\/|\/v\/)([\w-]{11})/);
  if (m) return m[1];
  throw new Error(`Keine gültige YouTube-Video-ID oder -URL: "${s}"`);
}

// "6:40", "1:02:03", "400" oder 400 -> Sekunden
export function parseTime(t) {
  if (t === undefined || t === null || t === "") return undefined;
  if (typeof t === "number") return t;
  const parts = String(t).trim().split(":").map(Number);
  if (parts.some(Number.isNaN)) throw new Error(`Ungültige Zeitangabe: "${t}"`);
  return parts.reduce((acc, p) => acc * 60 + p, 0);
}

export function formatTime(sec) {
  sec = Math.floor(sec);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = String(sec % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`;
}

async function innertube(endpoint, body, ua = BROWSER_UA, client = WEB_CLIENT) {
  const request = () =>
    fetch(`${API}/${endpoint}?prettyPrint=false`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": ua,
        "X-Youtube-Client-Name": client.clientName === "WEB" ? "1" : client.clientName,
        "X-Youtube-Client-Version": client.clientVersion,
      },
      body: JSON.stringify({ context: { client }, ...body }),
    });
  let res = await request();
  // YouTube antwortet gelegentlich sporadisch mit 403/429/5xx: einmal kurz warten und wiederholen
  if (res.status === 403 || res.status === 429 || res.status >= 500) {
    await new Promise((r) => setTimeout(r, 1500));
    res = await request();
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const msg = text.match(/"message":\s*"([^"]+)"/)?.[1] ?? res.statusText;
    throw new Error(`${endpoint}: HTTP ${res.status} ${msg}`);
  }
  return res.json();
}

// Sucht rekursiv das erste Objekt mit Schlüssel `key`
function find(obj, key) {
  if (!obj || typeof obj !== "object") return undefined;
  if (Array.isArray(obj)) {
    for (const v of obj) {
      const r = find(v, key);
      if (r !== undefined) return r;
    }
    return undefined;
  }
  if (key in obj) return obj[key];
  for (const v of Object.values(obj)) {
    const r = find(v, key);
    if (r !== undefined) return r;
  }
  return undefined;
}

function findAll(obj, key, out = []) {
  if (!obj || typeof obj !== "object") return out;
  if (Array.isArray(obj)) {
    for (const v of obj) findAll(v, key, out);
    return out;
  }
  if (key in obj) out.push(obj[key]);
  for (const v of Object.values(obj)) findAll(v, key, out);
  return out;
}

const text = (t) => t?.simpleText ?? t?.runs?.map((r) => r.text).join("") ?? t?.content ?? "";

// Kapitel aus Zeilen wie "06:38 Mod 2 installieren" in der Beschreibung
function chaptersFromDescription(desc) {
  const chapters = [];
  for (const line of desc.split("\n")) {
    const m = line.match(/^\s*(\d{1,2}(?::\d{2}){1,2})\s*[-–—:]?\s+(.+)$/);
    if (m) chapters.push({ start: parseTime(m[1]), time: m[1], title: m[2].trim() });
  }
  return chapters;
}

// ---------- YouTube ----------

async function fetchNext(videoId) {
  return innertube("next", { videoId });
}

export async function videoInfo(input) {
  const videoId = parseVideoId(input);
  const next = await fetchNext(videoId);
  const primary = find(next, "videoPrimaryInfoRenderer");
  const secondary = find(next, "videoSecondaryInfoRenderer");
  if (!primary) throw new Error(`Video ${videoId} nicht gefunden oder nicht verfügbar.`);
  const description = text(secondary?.attributedDescription) || text(secondary?.description);
  return {
    videoId,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    title: text(primary.title),
    channel: text(secondary?.owner?.videoOwnerRenderer?.title),
    published: text(primary.dateText),
    views: text(primary.viewCount?.videoViewCountRenderer?.viewCount),
    chapters: chaptersFromDescription(description),
    description,
  };
}

async function transcriptViaPanel(next) {
  const params = find(next, "getTranscriptEndpoint")?.params;
  if (!params) throw new Error("Video hat kein Transkript-Panel");
  const r = await innertube("get_transcript", { params });
  const segs = findAll(r, "transcriptSegmentRenderer").map((s) => ({
    start: Number(s.startMs) / 1000,
    text: text(s.snippet).trim(),
  }));
  if (!segs.length) throw new Error("Transkript-Panel ist leer");
  return { source: "transcript-panel", segments: segs };
}

async function transcriptViaPlayer(videoId, language) {
  let tracks;
  const errors = [];
  for (const { client, ua } of PLAYER_CLIENTS) {
    try {
      const p = await innertube("player", { videoId }, ua, client);
      tracks = p?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
      if (tracks?.length) break;
      errors.push(`${client.clientName}: ${p?.playabilityStatus?.status ?? "keine Untertitel"}`);
    } catch (e) {
      errors.push(`${client.clientName}: ${e.message}`);
    }
  }
  if (!tracks?.length) throw new Error(`Player: ${errors.join("; ")}`);
  const pick =
    (language && tracks.find((t) => t.languageCode === language && t.kind !== "asr")) ||
    (language && tracks.find((t) => t.languageCode?.startsWith(language))) ||
    tracks.find((t) => t.kind !== "asr") ||
    tracks[0];
  const url = new URL(pick.baseUrl);
  url.searchParams.set("fmt", "json3");
  const res = await fetch(url, { headers: { "User-Agent": BROWSER_UA } }).catch((e) => {
    throw new Error(`Untertitel-Download von ${url.host}: ${e.cause?.message ?? e.message}`);
  });
  if (!res.ok) throw new Error(`Untertitel-Download: HTTP ${res.status}`);
  const data = await res.json();
  const segs = (data.events ?? [])
    .filter((e) => e.segs)
    .map((e) => ({ start: e.tStartMs / 1000, text: e.segs.map((s) => s.utf8).join("").replace(/\n/g, " ").trim() }))
    .filter((s) => s.text);
  return { source: `captions:${pick.languageCode}${pick.kind === "asr" ? " (automatisch)" : ""}`, segments: segs };
}

export async function transcript(input, { from, to, language } = {}) {
  const videoId = parseVideoId(input);
  const fromSec = parseTime(from);
  const toSec = parseTime(to);
  const errors = [];
  let result;
  try {
    result = await transcriptViaPanel(await fetchNext(videoId));
  } catch (e) {
    errors.push(e.message);
  }
  if (!result) {
    try {
      result = await transcriptViaPlayer(videoId, language);
    } catch (e) {
      errors.push(e.message);
    }
  }
  if (!result) {
    throw new Error(
      `Kein Transkript für ${videoId} abrufbar (${errors.join(" | ")}). ` +
        "Von Cloud-/Rechenzentrums-IPs blockt YouTube Transkripte oft; youtube_video_info liefert trotzdem Beschreibung und Kapitel.",
    );
  }
  const segments = result.segments.filter(
    (s) => (fromSec === undefined || s.start >= fromSec) && (toSec === undefined || s.start <= toSec),
  );
  return { videoId, source: result.source, segments };
}

// ---------- Ausgabeformat ----------

function infoText(i) {
  const lines = [
    `Titel: ${i.title}`,
    `Kanal: ${i.channel}`,
    `Veröffentlicht: ${i.published}`,
    `Aufrufe: ${i.views}`,
    `URL: ${i.url}`,
  ];
  if (i.chapters.length) {
    lines.push("", "Kapitel:", ...i.chapters.map((c) => `  ${c.time} ${c.title}`));
  }
  lines.push("", "Beschreibung:", i.description);
  return lines.join("\n");
}

function transcriptText(t) {
  if (!t.segments.length) return `Keine Transkript-Zeilen im gewählten Zeitraum (Quelle: ${t.source}).`;
  return [`Quelle: ${t.source}`, ...t.segments.map((s) => `[${formatTime(s.start)}] ${s.text}`)].join("\n");
}

// ---------- MCP (JSON-RPC 2.0 über stdio, eine Nachricht pro Zeile) ----------

const TOOLS = [
  {
    name: "youtube_video_info",
    description:
      "Titel, Kanal, Datum, Aufrufe, Beschreibung und Kapitel (Zeitstempel) eines YouTube-Videos. Funktioniert auch dort, wo Transkripte blockiert sind.",
    inputSchema: {
      type: "object",
      properties: { video: { type: "string", description: "YouTube-URL oder 11-stellige Video-ID" } },
      required: ["video"],
    },
  },
  {
    name: "youtube_video_transcript",
    description:
      "Transkript eines YouTube-Videos mit Zeitstempeln, optional auf einen Zeitraum begrenzt (z. B. from \"6:40\", to \"7:15\").",
    inputSchema: {
      type: "object",
      properties: {
        video: { type: "string", description: "YouTube-URL oder 11-stellige Video-ID" },
        from: { type: "string", description: "Startzeit, z. B. \"6:40\" oder \"400\" (Sekunden)" },
        to: { type: "string", description: "Endzeit, z. B. \"7:15\"" },
        language: { type: "string", description: "Bevorzugte Untertitelsprache, z. B. \"de\" oder \"en\"" },
      },
      required: ["video"],
    },
  },
];

async function callTool(name, args = {}) {
  if (name === "youtube_video_info") return infoText(await videoInfo(args.video));
  if (name === "youtube_video_transcript") return transcriptText(await transcript(args.video, args));
  throw new Error(`Unbekanntes Tool: ${name}`);
}

function send(msg) {
  process.stdout.write(JSON.stringify({ jsonrpc: "2.0", ...msg }) + "\n");
}

async function handle(msg) {
  const { id, method, params } = msg;
  if (id === undefined) return; // Notification (z. B. notifications/initialized)
  try {
    switch (method) {
      case "initialize":
        return send({
          id,
          result: {
            protocolVersion: params?.protocolVersion ?? "2025-06-18",
            capabilities: { tools: {} },
            serverInfo: { name: "youtube", version: "1.0.0" },
          },
        });
      case "ping":
        return send({ id, result: {} });
      case "tools/list":
        return send({ id, result: { tools: TOOLS } });
      case "tools/call":
        try {
          const out = await callTool(params?.name, params?.arguments);
          return send({ id, result: { content: [{ type: "text", text: out }] } });
        } catch (e) {
          return send({ id, result: { content: [{ type: "text", text: `Fehler: ${e.message}` }], isError: true } });
        }
      default:
        return send({ id, error: { code: -32601, message: `Methode nicht unterstützt: ${method}` } });
    }
  } catch (e) {
    send({ id, error: { code: -32603, message: e.message } });
  }
}

function serve() {
  let buf = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (chunk) => {
    buf += chunk;
    let nl;
    while ((nl = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (!line) continue;
      let msg;
      try {
        msg = JSON.parse(line);
      } catch {
        send({ id: null, error: { code: -32700, message: "Parse error" } });
        continue;
      }
      handle(msg);
    }
  });
}

// ---------- Einstieg ----------

const [cmd, ...rest] = process.argv.slice(2);
if (!cmd) {
  serve();
} else {
  try {
    if (cmd === "info") console.log(infoText(await videoInfo(rest[0])));
    else if (cmd === "transcript")
      console.log(transcriptText(await transcript(rest[0], { from: rest[1], to: rest[2], language: rest[3] })));
    else {
      console.error("Aufruf: server.mjs [info <url> | transcript <url> [von] [bis] [sprache]]");
      process.exit(2);
    }
  } catch (e) {
    console.error(`Fehler: ${e.message}`);
    process.exit(1);
  }
}
