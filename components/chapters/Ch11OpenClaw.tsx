"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "../SectionWrapper";
import LaraAvatar from "../LaraAvatar";

function CodeBlock({ code, delay = 0 }: { code: string; delay?: number }) {
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
        <span className="text-xs text-slate-500 ml-2">Terminal</span>
      </div>
      <div className="p-4 flex items-start justify-between gap-3">
        <pre className="text-sm text-green-300 overflow-x-auto flex-1 whitespace-pre-wrap leading-relaxed">{code}</pre>
        <button onClick={copy} className={`copy-btn ${copied ? "copied" : ""}`}>
          {copied ? "✓ OK" : "Copy"}
        </button>
      </div>
    </motion.div>
  );
}

const installSteps = [
  { num: "01", icon: "🖥️", title: "Terminal öffnen", desc: "Mac: CMD+Space → Terminal. Windows: Win+R → cmd oder PowerShell." },
  { num: "02", icon: "⬇️", title: "OpenClaw installieren", desc: "Führe diesen Befehl im Terminal aus:", code: "curl -fsSL https://openclaw.ai/install.sh | bash" },
  { num: "03", icon: "🚀", title: "Onboarding starten", desc: "Nach der Installation startest du OpenClaw:", code: "openclaw" },
  { num: "04", icon: "🔑", title: "API-Key eintragen", desc: "Wähle deinen Modellanbieter und trage deinen API-Key ein:", code: `# Claude (Anthropic):
ANTHROPIC_API_KEY=sk-ant-...

# Oder OpenRouter (400+ Modelle):
OPENROUTER_API_KEY=sk-or-...` },
  { num: "05", icon: "💬", title: "Messenger verbinden", desc: "Optional: Verbinde Discord, Slack oder Telegram.", code: "openclaw connect discord" },
  { num: "06", icon: "🎯", title: "Erste Aufgabe geben", desc: "Jetzt ist OpenClaw bereit:", code: `openclaw task "Analysiere die Dateien in diesem Ordner und erstelle eine Zusammenfassung"` },
  { num: "07", icon: "🔒", title: "Sicherheit prüfen", desc: "Stelle sicher, dass Arbeitsordner begrenzt und Logs aktiviert sind.", code: "openclaw config --show" },
];

const security = [
  { icon: "🚫", rule: "Niemals Admin-Rechte", desc: "Gib dem Agenten nur Zugriff auf benötigte Ordner – nie auf System-Dateien." },
  { icon: "🔑", rule: "API-Keys sicher speichern", desc: "Nutze .env-Dateien oder einen Passwort-Manager. Nie in den Code direkt." },
  { icon: "📁", rule: "Arbeitsordner begrenzen", desc: "Setze einen Arbeitsordner – der Agent darf nur dort arbeiten." },
  { icon: "📋", rule: "Logs regelmäßig prüfen", desc: "Was hat der Agent gemacht? Logs geben Transparenz." },
  { icon: "✋", rule: "Freigaben bestätigen", desc: "Wichtige Aktionen (Senden, Löschen) immer manuell bestätigen lassen." },
  { icon: "💳", rule: "Zahlungs-APIs sperren", desc: "Niemals unkontrollierten Zugriff auf Zahlungssysteme geben." },
];

export default function Ch11OpenClaw() {
  const [openStep, setOpenStep] = useState<number | null>(0);

  return (
    <SectionWrapper
      id="ch4"
      chapter={4}
      title="OpenClaw – persönlicher KI-Agent"
      subtitle="Installation, Setup und Sicherheitsregeln Schritt für Schritt."
      icon="🦅"
      accent="#059669"
    >
      {/* What it does */}
      <div className="grid sm:grid-cols-3 gap-3 my-6">
        {[
          { icon: "🔍", title: "Recherche-Agent", desc: "Sucht, fasst zusammen, hält dich informiert" },
          { icon: "📝", title: "Content-Agent", desc: "Schreibt Texte, Posts, E-Mails automatisch" },
          { icon: "⚙️", title: "Coding-Agent", desc: "Schreibt und testet Code in deinem Projekt" },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card p-4 text-center"
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="font-bold text-slate-800 text-sm">{item.title}</div>
            <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
          </motion.div>
        ))}
      </div>

      {/* Install accordion */}
      <h3 className="font-bold text-slate-800 mb-3 mt-8">Installation Schritt für Schritt:</h3>
      <div className="space-y-2">
        {installSteps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="rounded-xl overflow-hidden border"
            style={{ borderColor: openStep === i ? "#05966940" : "#e2e8f0" }}
          >
            <button
              onClick={() => setOpenStep(openStep === i ? null : i)}
              className="w-full flex items-center gap-3 p-4 text-left transition-colors"
              style={{ background: openStep === i ? "#f0fdf4" : "white" }}
            >
              <div className="step-num" style={{ background: openStep === i ? "linear-gradient(135deg, #059669, #10b981)" : "linear-gradient(135deg, #64748b, #94a3b8)" }}>
                {step.num}
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-800 flex items-center gap-2">
                  <span>{step.icon}</span> {step.title}
                </div>
                <div className="text-xs text-slate-400">{step.desc}</div>
              </div>
              <span className="text-slate-400 text-sm">{openStep === i ? "▲" : "▼"}</span>
            </button>
            {openStep === i && step.code && (
              <div className="px-4 pb-3">
                <CodeBlock code={step.code} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Security section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10"
      >
        <h3 className="font-bold text-slate-800 mb-1">🔒 Sicherheitsregeln</h3>
        <LaraAvatar
          message="Ein Agent ist wie ein Praktikant mit Superkräften. Gib ihm klare Aufgaben – aber nicht sofort den Generalschlüssel zum ganzen Haus!"
          size="sm"
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {security.map((s, i) => (
            <motion.div
              key={s.rule}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card p-4"
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="font-bold text-slate-800 text-sm mb-1">{s.rule}</div>
              <div className="text-xs text-slate-500">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
