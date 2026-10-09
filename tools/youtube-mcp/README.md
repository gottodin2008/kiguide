# YouTube-MCP-Server

Eigener Ersatz für TubeAlfred, ohne Abhängigkeiten, ohne API-Key und ohne Credits.
Nutzt YouTubes InnerTube-API (`youtubei.googleapis.com`), über die auch die YouTube-Apps laufen.

Claude Code startet ihn über `.mcp.json` automatisch in jeder Sitzung in diesem Projekt.
Beim ersten Start fragt Claude Code einmal, ob der Projekt-Server `youtube` laufen darf.

## Tools

| Tool | Liefert |
| --- | --- |
| `youtube_video_info` | Titel, Kanal, Datum, Aufrufe, Beschreibung, Kapitel mit Zeitstempeln |
| `youtube_video_transcript` | Transkript mit Zeitstempeln, optional `from`/`to` (z. B. `6:40` bis `7:15`) und `language` |

## Im Terminal

```sh
node tools/youtube-mcp/server.mjs info https://www.youtube.com/watch?v=StNM5RYefXQ
node tools/youtube-mcp/server.mjs transcript StNM5RYefXQ 6:40 7:15 de
```

## Hinweise

- Das Transkript kommt zuerst aus dem Transkript-Panel, sonst aus den Untertiteln des Players.
  Von Cloud-/Rechenzentrums-IPs blockt YouTube Transkripte häufig; Titel, Beschreibung und Kapitel
  funktionieren dort trotzdem.
- `NODE_USE_ENV_PROXY=1` in `.mcp.json` lässt Node einen gesetzten `HTTPS_PROXY` nutzen
  (Cloud-Sitzungen); ohne Proxy hat es keine Wirkung.
- Braucht Node.js 18 oder neuer.
