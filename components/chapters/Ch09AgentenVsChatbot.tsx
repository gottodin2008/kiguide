"use client";
import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";

const rows = [
  { feature: "Funktion", chat: "Antwortet auf Fragen", agent: "Führt Aufgaben aus" },
  { feature: "Arbeitsweise", chat: "Wartet auf jeden Prompt", agent: "Arbeitet in eigenständigen Schritten" },
  { feature: "Tools", chat: "Meist nur Text", agent: "Tools, Dateien, Browser, APIs" },
  { feature: "Ideal für", chat: "Ideen, Erklärungen, Texte", agent: "Automatisierung, komplexe Aufgaben" },
  { feature: "Kontrolle", chat: "Du steuerst jeden Schritt", agent: "Agent entscheidet selbst" },
  { feature: "Risiko", chat: "Gering", agent: "Höher – braucht Sicherheitsregeln" },
  { feature: "Beispiel", chat: '„Was ist Python?“', agent: '„Schreibe, teste und deploye ein Python-Skript“' },
];

const wann = [
  { type: "Chatbot nutzen wenn...", items: ["Du eine schnelle Antwort brauchst", "Du erklären oder kreativ schreiben willst", "Du Einsteiger bist", "Kein Tool-Zugriff nötig ist"], color: "#64748b", icon: "💬" },
  { type: "Agent nutzen wenn...", items: ["Aufgaben mehrere Schritte brauchen", "Du Dateien, Code oder APIs nutzen willst", "Wiederkehrende Aufgaben automatisiert werden sollen", "Du Zeit sparen willst"], color: "#7c3aed", icon: "🤖" },
];

export default function Ch09AgentenVsChatbot() {
  return (
    <SectionWrapper
      id="ch2"
      chapter={2}
      title="Agenten vs. Chatbots"
      subtitle="Wann nimmst du welches Tool? Ein klarer Vergleich."
      icon="⚖️"
      accent="#0891b2"
    >
      {/* Comparison table */}
      <div className="card overflow-hidden my-8">
        <div className="overflow-x-auto">
          <table className="ki-table">
            <thead>
              <tr>
                <th className="w-32">Merkmal</th>
                <th className="text-slate-500">💬 Chatbot</th>
                <th style={{ color: "#7c3aed" }}>🤖 KI-Agent</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.feature}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <td className="font-bold text-slate-600 text-xs uppercase tracking-wider">{row.feature}</td>
                  <td className="text-slate-500 text-sm">{row.chat}</td>
                  <td className="text-sm font-medium" style={{ color: "#6d28d9" }}>{row.agent}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* When to use */}
      <div className="grid md:grid-cols-2 gap-4">
        {wann.map((w, i) => (
          <motion.div
            key={w.type}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.45 }}
            className="card p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{w.icon}</span>
              <h3 className="font-bold text-slate-800 text-sm">{w.type}</h3>
            </div>
            <ul className="space-y-2">
              {w.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-0.5 font-bold" style={{ color: w.color }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Lara tip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="highlight-box mt-6"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-bold text-slate-800">Tool-Calling – die Brücke zwischen Chat und Agent</p>
            <p className="text-slate-600 text-sm mt-1">
              <strong>Tool-Calling</strong> bedeutet, dass ein KI-Modell Tools aufrufen kann (z.B. eine Websuche oder eine API). Das macht aus einem Chatbot einen Mini-Agenten. Claude, GPT-5 und Gemini unterstützen das alle nativ.
            </p>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
