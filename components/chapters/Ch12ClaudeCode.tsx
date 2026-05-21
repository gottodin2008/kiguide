"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "../SectionWrapper";

function CodeBlock({ code, lang = "bash", delay = 0 }: { code: string; lang?: string; delay?: number }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.35 }}
      className="terminal my-3"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-slate-500 ml-2">{lang}</span>
      </div>
      <div className="p-4 flex items-start justify-between gap-3">
        <pre className="text-sm text-purple-300 overflow-x-auto flex-1 whitespace-pre-wrap leading-relaxed">{code}</pre>
        <button onClick={copy} className={`copy-btn ${copied ? "copied" : ""}`}>
          {copied ? "✓ OK" : "Copy"}
        </button>
      </div>
    </motion.div>
  );
}

const steps = [
  {
    icon: "📦", title: "Was ist Claude Code?",
    desc: "Claude Code ist ein agentisches Coding-System von Anthropic. Es liest deine Codebase, ändert Dateien, führt Tests aus und kann Code committen – direkt im Terminal und in deiner IDE.",
    isList: true,
    items: ["Liest gesamte Codebase und versteht Zusammenhänge", "Ändert Dateien auf Basis deiner Anweisungen", "Führt Tests aus und behebt Fehler selbst", "Committet Code in Git", "IDE-Integration: VS Code & JetBrains"],
  },
  {
    icon: "⬇️", title: "Installation",
    desc: "Voraussetzung: Node.js 18+. Dann ein Befehl:",
    code: "npm install -g @anthropic-ai/claude-code",
  },
  {
    icon: "🔑", title: "Anmeldung",
    desc: "Starte Claude Code – es öffnet sich der Browser zur Authentifizierung:",
    code: `claude
# Browser öffnet sich → mit Anthropic-Account einloggen
# Alternativ: API-Key direkt setzen
export ANTHROPIC_API_KEY=sk-ant-...`,
  },
  {
    icon: "🚀", title: "Erstes Projekt starten",
    desc: "In dein Projekt navigieren und Claude Code starten:",
    code: `cd mein-projekt
claude

# Sofort eine Aufgabe geben:
claude "Analysiere dieses Projekt. Erkläre mir zuerst die Struktur. Ändere noch nichts, bevor ich es freigebe."`,
  },
  {
    icon: "⚙️", title: "Wichtige Befehle",
    desc: "Die häufigsten Claude Code Slash-Commands:",
    code: `/help          # Alle Befehle anzeigen
/model         # Modell wechseln (Sonnet, Opus, Haiku)
/clear         # Chat zurücksetzen
/cost          # Kosten dieser Session anzeigen
/compact       # Kontext komprimieren
/exit          # Beenden`,
  },
];

const wann = [
  "Du ein Coding-Projekt hast (egal welche Sprache)",
  "Du Fehler debuggen willst ohne stundenlang zu suchen",
  "Du Code refaktorieren oder testen möchtest",
  "Du KI-Agenten für eigene Projekte bauen willst",
  "Du komplexe Agentenaufgaben ausführen willst",
];

export default function Ch12ClaudeCode() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionWrapper
      id="ch5"
      chapter={5}
      title="Claude Code – KI-Agent für Entwickler"
      subtitle="Das offizielle Coding-Tool von Anthropic. Schritt für Schritt erklärt."
      icon="⚡"
      accent="#7c3aed"
    >
      {/* When to use */}
      <div className="card p-5 my-6">
        <h3 className="font-bold text-slate-800 mb-3">Claude Code lohnt sich wenn...</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {wann.map((w, i) => (
            <motion.div
              key={w}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-start gap-2 text-sm text-slate-600"
            >
              <span className="text-purple-500 font-bold mt-0.5">✓</span> {w}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Install accordion */}
      <div className="space-y-2 my-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl overflow-hidden border"
            style={{ borderColor: open === i ? "#7c3aed40" : "#e2e8f0" }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center gap-3 p-4 text-left transition-colors"
              style={{ background: open === i ? "#faf5ff" : "white" }}
            >
              <div
                className="step-num"
                style={{ background: open === i ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "linear-gradient(135deg, #64748b, #94a3b8)" }}
              >
                {step.icon}
              </div>
              <div className="font-bold text-slate-800">{step.title}</div>
              <span className="ml-auto text-slate-400 text-sm">{open === i ? "▲" : "▼"}</span>
            </button>

            {open === i && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 pb-4"
              >
                <p className="text-sm text-slate-500 mb-2">{step.desc}</p>
                {step.isList && step.items && (
                  <ul className="space-y-1 mb-2">
                    {step.items.map(item => (
                      <li key={item} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-purple-500">→</span> {item}
                      </li>
                    ))}
                  </ul>
                )}
                {step.code && <CodeBlock code={step.code} delay={0.1} />}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Example prompt */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="highlight-box"
      >
        <h3 className="font-bold text-slate-800 mb-3">💡 Beispiel-Einstieg in jedes Projekt:</h3>
        <div className="bg-white rounded-xl p-4 border border-indigo-100 text-sm font-mono text-slate-700 italic">
          "Analysiere dieses Projekt. Erkläre mir zuerst die Struktur.<br />
          Ändere noch nichts, bevor ich es freigebe."
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Dieser Prompt stellt sicher, dass Claude Code erst erklärt und dann wartet – du hast immer die Kontrolle.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
