"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "../SectionWrapper";
import LaraAvatar from "../LaraAvatar";

const tiles = [
  { icon: "✍️", label: "Texte schreiben", color: "#4f46e5", example: "\"Schreibe mir eine professionelle E-Mail an meinen Kunden über eine Verzögerung – höflich und lösungsorientiert.\"" },
  { icon: "📧", label: "E-Mails formulieren", color: "#7c3aed", example: "\"Formuliere eine Absage für einen Termin – freundlich und mit Alternativvorschlag.\"" },
  { icon: "🖼️", label: "Bilder generieren", color: "#9333ea", example: "\"A futuristic city at sunset, cyberpunk style, highly detailed\" → KI erstellt das Bild." },
  { icon: "🎬", label: "Videos erstellen", color: "#ec4899", example: "\"Lara erklärt KI-Agenten in einem 30-Sekunden Video\" → Higgsfield generiert das Video." },
  { icon: "🎵", label: "Musik-Ideen", color: "#f59e0b", example: "\"Erstelle ein Lied im Stil von Deep House mit einem motivierenden Text über Erfolg.\"" },
  { icon: "🌐", label: "Webseiten bauen", color: "#0891b2", example: "\"Baue mir eine Landingpage für mein DJ-Business mit Booking-Formular.\"" },
  { icon: "💻", label: "Code schreiben", color: "#059669", example: "\"Schreibe ein Python-Skript, das täglich meine Mails zusammenfasst und an mich weiterleitet.\"" },
  { icon: "📊", label: "Daten analysieren", color: "#dc2626", example: "\"Analysiere diese Excel-Tabelle und sag mir, welche Produkte am meisten Gewinn machen.\"" },
  { icon: "🤝", label: "Kundenservice", color: "#2563eb", example: "\"Erstelle einen Chatbot, der häufige Fragen zu meinem Online-Shop automatisch beantwortet.\"" },
  { icon: "📚", label: "Lernhilfe", color: "#7c3aed", example: "\"Erkläre mir Quantencomputing so, als wäre ich 12 Jahre alt.\"" },
  { icon: "📱", label: "Social Media", color: "#ec4899", example: "\"Erstelle 5 Instagram-Posts für meinen DJ-Auftritt am Samstag – mit Hashtags.\"" },
  { icon: "🎤", label: "DJ / Event-Promo", color: "#f97316", example: "\"Schreibe einen Pressetext für meinen neuen Mix und eine Event-Ankündigung für Clubs.\"" },
];

export default function Ch02Moeglichkeiten() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <SectionWrapper
      id="ch2"
      chapter={2}
      title="Was kann man mit KI machen?"
      subtitle="Klicke auf eine Kachel – Lara zeigt dir ein konkretes Beispiel."
      icon="✨"
      accent="#9333ea"
      alt
    >
      <LaraAvatar
        message="Du musst kein Experte sein! Ob Texte, Bilder, Code oder Musik – KI hilft dir bei fast allem. Klicke auf einen Bereich, den du dir anschauen willst!"
        side="right"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-6">
        {tiles.map((tile, i) => (
          <motion.button
            key={tile.label}
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.35, type: "spring", stiffness: 180 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActive(active === i ? null : i)}
            className="p-4 rounded-2xl text-left transition-all duration-200"
            style={{
              background: active === i ? `${tile.color}12` : "white",
              border: `2px solid ${active === i ? tile.color : "#e2e8f0"}`,
              boxShadow: active === i ? `0 4px 20px ${tile.color}20` : "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <div className="text-2xl mb-2">{tile.icon}</div>
            <div className="text-sm font-bold" style={{ color: active === i ? tile.color : "#374151" }}>
              {tile.label}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Example panel */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div
              className="p-5 rounded-2xl mb-4"
              style={{
                background: `${tiles[active].color}08`,
                border: `1.5px solid ${tiles[active].color}25`,
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{tiles[active].icon}</span>
                <div>
                  <div className="font-bold text-slate-800 mb-2">{tiles[active].label} – Beispiel-Prompt:</div>
                  <div
                    className="text-sm italic text-slate-600 p-3 rounded-xl"
                    style={{ background: "white", border: `1px solid ${tiles[active].color}20` }}
                  >
                    {tiles[active].example}
                  </div>
                  <div className="mt-2 text-xs text-slate-400">
                    💡 Genau so kannst du das in ChatGPT, Claude oder Gemini eingeben.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!active && (
        <div className="text-center text-slate-400 text-sm py-3">
          ☝️ Klicke auf eine Kachel für ein Prompt-Beispiel
        </div>
      )}
    </SectionWrapper>
  );
}
