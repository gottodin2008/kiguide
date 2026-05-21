"use client";
import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";

const rules = [
  { icon: "🚫", title: "Keine Admin-Rechte", desc: "Gib Agenten nur Zugriff auf das, was sie wirklich brauchen. Nie System-Admin-Rechte.", level: "Kritisch", color: "#dc2626" },
  { icon: "🔑", title: "API-Keys sichern", desc: "Nutze .env-Dateien, niemals Keys direkt im Code oder in GitHub commiten.", level: "Kritisch", color: "#dc2626" },
  { icon: "📁", title: "Arbeitsordner begrenzen", desc: "Setze einen klaren Arbeitsordner. Der Agent sollte nur dort lesen und schreiben dürfen.", level: "Wichtig", color: "#d97706" },
  { icon: "📋", title: "Logs regelmäßig prüfen", desc: "Was hat der Agent gemacht? Transparenz ist wichtig – aktiviere immer Logging.", level: "Wichtig", color: "#d97706" },
  { icon: "✋", title: "Freigaben manuell bestätigen", desc: "Wichtige Aktionen (E-Mail senden, Dateien löschen) immer manuell bestätigen lassen.", level: "Wichtig", color: "#d97706" },
  { icon: "💳", title: "Zahlungs-APIs sperren", desc: "Niemals unkontrollierten Zugriff auf Zahlungssysteme oder Banking geben.", level: "Kritisch", color: "#dc2626" },
  { icon: "🌐", title: "Netzwerkzugriff begrenzen", desc: "Definiere welche externen Dienste der Agent kontaktieren darf.", level: "Empfohlen", color: "#059669" },
  { icon: "🔄", title: "Regelmäßige Reviews", desc: "Überprüfe alle Automatisierungen regelmäßig – KI-Outputs können sich verändern.", level: "Empfohlen", color: "#059669" },
];

const levelColors: Record<string, string> = {
  "Kritisch": "#dc2626",
  "Wichtig": "#d97706",
  "Empfohlen": "#059669",
};

const dos = [
  "Mit kleinen, begrenzten Aufgaben starten",
  "Jeden Agent-Lauf reviewen bevor automatisiert wird",
  "Backup vor größeren Änderungen",
  "Klare, eindeutige Anweisungen geben",
  "Testumgebungen nutzen bevor Produktiveinsatz",
];

const donts = [
  "Agenten blind auf wichtige Systeme lassen",
  "API-Keys in öffentlichem Code speichern",
  "Unbegrenzte Ressourcen-Budgets setzen",
  "Agenten-Output ohne Prüfung direkt verwenden",
  "Echte Kundendaten ohne Datenschutzprüfung verarbeiten",
];

export default function Ch15Sicherheit() {
  return (
    <SectionWrapper
      id="ch8"
      chapter={8}
      title="Sicherheitsregeln für KI-Agenten"
      subtitle="Mit großer Macht kommt große Verantwortung."
      icon="🔒"
      accent="#dc2626"
    >
      {/* Rules grid */}
      <div className="grid sm:grid-cols-2 gap-4 my-8">
        {rules.map((rule, i) => (
          <motion.div
            key={rule.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="card p-5 flex items-start gap-3"
          >
            <span className="text-2xl">{rule.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-bold text-slate-800 text-sm">{rule.title}</h3>
                <span
                  className="badge"
                  style={{ background: `${rule.color}12`, color: rule.color, border: `1px solid ${rule.color}25` }}
                >
                  {rule.level}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{rule.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Do / Don't */}
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card p-5"
          style={{ borderLeft: "4px solid #059669" }}
        >
          <h3 className="font-bold text-green-700 mb-4 flex items-center gap-2">✅ Das solltest du tun</h3>
          <ul className="space-y-2">
            {dos.map(d => (
              <li key={d} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="text-green-500 font-bold mt-0.5">✓</span> {d}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card p-5"
          style={{ borderLeft: "4px solid #dc2626" }}
        >
          <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2">🚫 Das solltest du vermeiden</h3>
          <ul className="space-y-2">
            {donts.map(d => (
              <li key={d} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="text-red-500 font-bold mt-0.5">✗</span> {d}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10 text-center p-8 rounded-2xl"
        style={{ background: "linear-gradient(135deg, #eef2ff, #faf5ff)", border: "2px solid #e0e7ff" }}
      >
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">Du hast es geschafft!</h3>
        <p className="text-slate-500 max-w-xl mx-auto text-sm">
          Du kennst jetzt die wichtigsten KI-Tools, Modelle, Agenten und Sicherheitsregeln.
          Der beste nächste Schritt? Einfach ausprobieren! Starte mit einem kostenlosen Account bei Claude oder ChatGPT.
        </p>
        <div className="mt-4 text-purple-600 font-bold">
          — Lara, deine KI-Assistentin von Higgsfield.ai 🤖
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
