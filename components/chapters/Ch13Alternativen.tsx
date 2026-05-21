"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "../SectionWrapper";

function CodeBlock({ code, delay = 0 }: { code: string; delay?: number }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="terminal mt-3">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-slate-500 ml-2">Terminal</span>
      </div>
      <div className="p-3 flex items-start justify-between gap-2">
        <pre className="text-xs text-green-300 overflow-x-auto flex-1 whitespace-pre-wrap">{code}</pre>
        <button onClick={copy} className={`copy-btn text-xs ${copied ? "copied" : ""}`}>
          {copied ? "✓" : "Copy"}
        </button>
      </div>
    </div>
  );
}

const tools = [
  {
    name: "Ollama",
    icon: "🦙",
    type: "Lokal (offline)",
    color: "#f97316",
    desc: "KI komplett auf deinem PC – offline, kostenlos, privat. Keine Daten verlassen deinen Computer.",
    pros: ["100% privat & offline", "Kostenlos", "Viele Modelle"],
    cons: ["Benötigt gute Hardware", "Langsamer als Cloud"],
    models: ["Llama 3.3", "Qwen 2.5", "Mistral", "Gemma 3", "DeepSeek-R1"],
    steps: ["Ollama installieren (ollama.com)", "Modell herunterladen", "Modell starten", "Chat testen", "In Tools integrieren"],
    code: `# Installieren (Mac/Linux):
curl -fsSL https://ollama.com/install.sh | sh

# Modell starten:
ollama run llama3.3

# Oder Qwen Coder (für Code):
ollama run qwen2.5-coder`,
    link: "ollama.com",
  },
  {
    name: "OpenRouter",
    icon: "🌐",
    type: "Cloud API",
    color: "#6366f1",
    desc: "Ein API-Key für über 400 Modelle. Pay-as-you-go, kein Abo-Zwang. Inkl. Free-Tier Modelle.",
    pros: ["400+ Modelle per API", "Pay-as-you-go", "Free-Modelle verfügbar"],
    cons: ["API-Kenntnisse nötig", "Daten gehen zu OpenRouter"],
    models: ["Claude Sonnet", "GPT-5", "Llama 3.3", "Gemini 2.5", "Mistral"],
    steps: ["Account erstellen (openrouter.ai)", "API-Key generieren", "Modell auswählen & Preis prüfen", "API-Key in Tool eintragen", "Testprompt ausführen"],
    code: `# In Python:
import requests
response = requests.post(
  "https://openrouter.ai/api/v1/chat/completions",
  headers={"Authorization": "Bearer sk-or-..."},
  json={"model": "meta-llama/llama-3.3-70b-instruct:free",
        "messages": [{"role": "user", "content": "Hallo!"}]}
)`,
    link: "openrouter.ai",
  },
  {
    name: "LM Studio",
    icon: "🖥️",
    type: "Lokal + GUI",
    color: "#9333ea",
    desc: "Wie Ollama, aber mit grafischer Oberfläche. Ideal für Einsteiger die lokal arbeiten wollen.",
    pros: ["Schöne GUI", "Einfaches Modell-Browsing", "Lokaler API-Server"],
    cons: ["Große Downloads", "GPU empfohlen"],
    models: ["Llama 3.3", "Mistral", "Phi-4", "Gemma", "Qwen"],
    steps: ["Download von lmstudio.ai", "Modell im Browser suchen", "Herunterladen", "Server starten", "Mit anderen Tools verbinden"],
    code: `# Download: lmstudio.ai
# Kein Terminal nötig – alles über die GUI!
# Nach dem Start läuft ein lokaler API-Server:
http://localhost:1234/v1/chat/completions`,
    link: "lmstudio.ai",
  },
];

const moreProviders = [
  { name: "Groq", desc: "Extrem schnelle Inferenz (500+ Tokens/s). Open-Source-Modelle. Großzügiges Free-Tier.", color: "#f59e0b", icon: "⚡" },
  { name: "Together AI", desc: "Open-Source-Modelle per API. Fine-Tuning auf eigene Daten möglich.", color: "#10b981", icon: "🤝" },
  { name: "Fireworks AI", desc: "Schnelle Modellbereitstellung. Viele OpenSource-Modelle per API.", color: "#f97316", icon: "🔥" },
  { name: "Replicate", desc: "Bild-, Video- und KI-Modelle per API. Viele Spezialmodelle.", color: "#ec4899", icon: "🔁" },
  { name: "Hugging Face", desc: "Modelle finden, testen und hosten. Das GitHub für KI-Modelle.", color: "#f59e0b", icon: "🤗" },
  { name: "AnythingLLM", desc: "Lokale Wissensdatenbank + Chat. Dokumente einlesen, lokal chatten.", color: "#0891b2", icon: "📚" },
];

export default function Ch13Alternativen() {
  const [expanded, setExpanded] = useState<string | null>("Ollama");

  return (
    <SectionWrapper
      id="ch6"
      chapter={6}
      title="Alternative KI-Modelle & Anbieter"
      subtitle="Warum Alternativen? Günstiger, schneller, lokaler oder mehr Kontrolle."
      icon="🌐"
      accent="#6366f1"
      alt
    >
      {/* Main 3 tools */}
      <div className="space-y-3 my-8">
        {tools.map((tool) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="card overflow-hidden"
          >
            <button
              onClick={() => setExpanded(expanded === tool.name ? null : tool.name)}
              className="w-full flex items-center gap-4 p-5 text-left"
            >
              <span className="text-3xl">{tool.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-black text-slate-900 text-lg">{tool.name}</span>
                  <span
                    className="badge"
                    style={{ background: `${tool.color}12`, color: tool.color, border: `1px solid ${tool.color}25` }}
                  >
                    {tool.type}
                  </span>
                </div>
                <p className="text-slate-500 text-sm mt-0.5">{tool.desc}</p>
              </div>
              <span className="text-slate-400">{expanded === tool.name ? "▲" : "▼"}</span>
            </button>

            {expanded === tool.name && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="px-5 pb-5 border-t"
                style={{ borderColor: "#f1f5f9" }}
              >
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">✓ Vorteile</p>
                    {tool.pros.map(p => <div key={p} className="text-xs text-slate-600 mb-1">• {p}</div>)}
                    <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2 mt-3">✗ Nachteile</p>
                    {tool.cons.map(c => <div key={c} className="text-xs text-slate-500 mb-1">• {c}</div>)}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: tool.color }}>Modelle</p>
                    {tool.models.map(m => <div key={m} className="text-xs text-slate-600 mb-1">→ {m}</div>)}
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 mt-3 text-slate-500">Schritte</p>
                    {tool.steps.map((s, i) => (
                      <div key={s} className="text-xs text-slate-500 mb-1 flex gap-1.5">
                        <span className="font-bold" style={{ color: tool.color }}>{i + 1}.</span> {s}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Quick Start</p>
                    <CodeBlock code={tool.code} />
                    <div className="text-xs text-slate-400 mt-2">🔗 {tool.link}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* More providers */}
      <h3 className="font-bold text-slate-800 mb-4">Weitere Anbieter im Überblick:</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {moreProviders.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="card p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{p.icon}</span>
              <span className="font-bold text-sm" style={{ color: p.color }}>{p.name}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
