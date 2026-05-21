"use client";
import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";

const agentCapabilities = [
  { icon: "\u{1F4C1}", label: "Dateien lesen & schreiben" },
  { icon: "\u{1F310}", label: "Webseiten bedienen" },
  { icon: "\u{1F4BB}", label: "Code schreiben & ausführen" },
  { icon: "\u{1F527}", label: "Tools & APIs nutzen" },
  { icon: "\u{1F4CB}", label: "Aufgaben selbst planen" },
  { icon: "\u{1F501}", label: "Mehrere Schritte ausführen" },
  { icon: "✅", label: "Ergebnisse selbst prüfen" },
  { icon: "\u{1F4CA}", label: "Rechnungen analysieren" },
];

const examples = [
  { prompt: "Erstelle mir eine komplette Webseite.", result: "Agent schreibt HTML, CSS, JS und liefert fertige Dateien." },
  { prompt: "Analysiere meine Rechnungen und erstelle ein Monatsreport.", result: "Agent liest Dateien, rechnet aus, erstellt PDF." },
  { prompt: "Plane meine Social-Media-Woche.", result: "Agent plant, schreibt Texte, erstellt Posting-Kalender." },
  { prompt: "Überwache täglich die Preise meiner Konkurrenz.", result: "Agent läuft automatisch, sendet dir Berichte." },
];

const loop = [
  { icon: "\u{1F3AF}", label: "Ziel erhalten", color: "#4f46e5" },
  { icon: "\u{1F9E0}", label: "Plan erstellen", color: "#7c3aed" },
  { icon: "\u{1F527}", label: "Tool nutzen", color: "#9333ea" },
  { icon: "\u{1F441}️", label: "Ergebnis prüfen", color: "#a855f7" },
  { icon: "\u{1F501}", label: "Wiederholen", color: "#c026d3" },
  { icon: "✅", label: "Fertig!", color: "#059669" },
];

export default function Ch08Agenten() {
  return (
    <SectionWrapper
      id="ch1"
      chapter={1}
      title="Was sind KI-Agenten?"
      subtitle="Der Unterschied zwischen Antworten und Handeln."
      icon="🤖"
      accent="#7c3aed"
      alt
    >
      {/* Agent loop */}
      <div className="card p-6 my-8">
        <h3 className="font-bold text-slate-700 mb-5 text-center">Der Agent-Loop – so arbeitet ein Agent:</h3>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {loop.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 220 }}
                className="flex flex-col items-center text-center p-3 rounded-xl min-w-20"
                style={{ background: `${step.color}10`, border: `1.5px solid ${step.color}25` }}
              >
                <span className="text-2xl mb-1">{step.icon}</span>
                <span className="text-xs font-bold" style={{ color: step.color }}>{step.label}</span>
              </motion.div>
              {i < loop.length - 1 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-slate-300 text-xl hidden sm:block"
                >
                  {"→"}
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <h3 className="font-bold text-slate-800 mb-4">Agenten können:</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {agentCapabilities.map((cap, i) => (
          <motion.div
            key={cap.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="card p-3 flex items-center gap-2"
          >
            <span className="text-xl">{cap.icon}</span>
            <span className="text-xs font-semibold text-slate-700">{cap.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Examples */}
      <h3 className="font-bold text-slate-800 mb-4">Praxis-Beispiele:</h3>
      <div className="space-y-3">
        {examples.map((ex, i) => (
          <motion.div
            key={ex.prompt}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card p-4 flex items-start gap-4"
          >
            <div
              className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
            >
              {i + 1}
            </div>
            <div>
              <div className="font-semibold text-slate-800 text-sm italic">
                {"„"}{ex.prompt}{"“"}
              </div>
              <div className="text-xs text-slate-500 mt-1">{"→"} {ex.result}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
