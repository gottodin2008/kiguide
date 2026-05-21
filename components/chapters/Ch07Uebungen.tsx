"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "../SectionWrapper";
import LaraAvatar from "../LaraAvatar";

const exercises = [
  {
    icon: "📧", title: "Bessere E-Mail schreiben",
    task: "Schreibe eine höfliche, professionelle E-Mail an einen Kunden über eine Projektverzögerung.",
    prompt: "Ich muss meinem Kunden erklären, dass sein Webprojekt 2 Wochen später fertig wird. Schreibe eine E-Mail: höflich, lösungsorientiert, und biete als Ausgleich einen Rabatt an.",
    laraFeedback: "Super! Jetzt kannst du den Ton anpassen – bitte Claude, die E-Mail noch freundlicher oder formeller zu machen!",
    color: "#4f46e5",
  },
  {
    icon: "📱", title: "Social-Media-Idee erstellen",
    task: "Erstelle 5 Instagram-Post-Ideen für einen DJ, der am Wochenende auftritt.",
    prompt: "Ich bin DJ und trete am Samstag im Club XY auf. Erstelle mir 5 kreative Instagram-Post-Ideen – mit Emojis, Hashtags und Bildvorschlägen.",
    laraFeedback: "Ausgezeichnet! Probiere jetzt: Lass Claude einen dieser Posts komplett mit Caption und 10 passenden Hashtags ausarbeiten.",
    color: "#ec4899",
  },
  {
    icon: "🖼️", title: "Bild-Prompt erstellen",
    task: "Erstelle einen detaillierten Prompt für ein KI-generiertes Event-Poster.",
    prompt: "Erstelle mir einen Midjourney-Prompt für ein futuristisches Event-Poster: Elektronische Musik, Neon-Lichter, Crowd, modernes Design. Auf Englisch, sehr detailliert.",
    laraFeedback: "Perfekt! Kopiere diesen Prompt in Midjourney oder Higgsfield und schau was passiert. Frage mich danach nach Verbesserungen!",
    color: "#9333ea",
  },
  {
    icon: "📋", title: "To-do-Liste erstellen",
    task: "Lass KI eine strukturierte Wochenplanung für ein Event erstellen.",
    prompt: "Ich organisiere eine Party für 100 Personen in 3 Wochen. Erstelle eine detaillierte To-do-Liste mit Prioritäten, aufgeteilt nach Kategorien: Ort, Catering, Deko, Musik, Marketing.",
    laraFeedback: "Toll! Füge jetzt hinzu: 'Erstelle daraus einen Wochenplan mit konkreten Deadlines' – und du hast einen echten Projektplan.",
    color: "#059669",
  },
  {
    icon: "🎓", title: "Schwieriges Thema erklären",
    task: "Lass dir Quantencomputing so erklären, als wärst du 10 Jahre alt.",
    prompt: "Erkläre mir Quantencomputing. Ich bin 10 Jahre alt und liebe Lego. Nutze eine Lego-Analogie und erkläre in maximal 5 Sätzen.",
    laraFeedback: "Genial, oder? KI kann jedes komplizierte Thema auf dein Niveau anpassen. Probiere es mit einem Thema aus deiner Branche!",
    color: "#0891b2",
  },
  {
    icon: "🎤", title: "DJ-Pressetext schreiben",
    task: "Schreibe einen professionellen Pressetext für deinen nächsten Auftritt.",
    prompt: "Schreibe einen professionellen Pressetext (200 Wörter) für mich als DJ. Mein Style: House & Techno. Nächster Auftritt: Club Ampere, München, 15. Juni. Ton: energetisch, professionell.",
    laraFeedback: "Starker Pressetext! Probiere jetzt eine kürzere Version für Instagram und eine noch kürzere für Twitter/X.",
    color: "#f97316",
  },
  {
    icon: "🌐", title: "Landingpage-Struktur",
    task: "Lass KI eine komplette Landingpage-Struktur für dein Business erstellen.",
    prompt: "Erstelle eine Landingpage-Struktur für mein DJ-Booking-Business. Sektionen: Hero, Über mich, Musikstile, Referenzen, Preise, Kontakt. Mit kurzen Texten für jede Sektion.",
    laraFeedback: "Sehr gut! Jetzt kannst du sagen: 'Schreibe die Hero-Sektion komplett aus – mit Headline, Subline und CTA-Button-Text.'",
    color: "#7c3aed",
  },
  {
    icon: "🎉", title: "Event mit KI planen",
    task: "Plane ein komplettes Event – von der Location bis zur Playlist.",
    prompt: "Plane ein Geburtstags-Event für 30 Personen (Budget 800€). Ich brauche: Locations-Ideen, Catering-Vorschläge, Playlist-Genres, Deko-Konzept und eine 30-Tage-Checkliste.",
    laraFeedback: "Wow, was für ein Event-Plan! Nutze die Checkliste und frage mich nach jedem erledigten Punkt: 'Was ist als nächstes wichtig?'",
    color: "#dc2626",
  },
];

export default function Ch07Uebungen() {
  const [active, setActive] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SectionWrapper
      id="ch7"
      chapter={7}
      title="Erste praktische Übungen"
      subtitle="Lerne KI durch Ausprobieren – mit echten Prompts die du direkt nutzen kannst."
      icon="🎯"
      accent="#059669"
    >
      <LaraAvatar
        message="Theorie ist gut – Praxis ist besser! Wähle eine Aufgabe, kopiere den Prompt und probiere es direkt in ChatGPT oder Claude aus. Ich gebe dir danach Feedback!"
        side="right"
      />

      <div className="grid sm:grid-cols-2 gap-3 my-8">
        {exercises.map((ex, i) => (
          <motion.div
            key={ex.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
          >
            <button
              onClick={() => setActive(active === i ? null : i)}
              className="w-full text-left p-4 rounded-2xl transition-all duration-200"
              style={{
                background: active === i ? `${ex.color}10` : "white",
                border: `2px solid ${active === i ? ex.color : "#e2e8f0"}`,
                boxShadow: active === i ? `0 4px 16px ${ex.color}20` : "0 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{ex.icon}</span>
                <div>
                  <div className="font-bold text-slate-800 text-sm">{ex.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{ex.task}</div>
                </div>
                <div
                  className="ml-auto shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                  style={{ background: `${ex.color}15`, color: ex.color }}
                >
                  {active === i ? "▲" : "▼"}
                </div>
              </div>
            </button>

            <AnimatePresence>
              {active === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className="p-4 rounded-b-2xl border-x-2 border-b-2 -mt-1"
                    style={{ borderColor: ex.color, background: "#fafafa" }}
                  >
                    {/* Prompt box */}
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      📋 Dein Prompt – einfach kopieren:
                    </p>
                    <div
                      className="p-3 rounded-xl text-sm italic text-slate-700 mb-3 relative"
                      style={{ background: "white", border: "1px solid #e2e8f0" }}
                    >
                      {ex.prompt}
                      <button
                        onClick={() => copy(ex.prompt)}
                        className="mt-2 flex items-center gap-1 text-xs px-3 py-1 rounded-lg font-semibold transition-all"
                        style={{
                          background: copied ? "#dcfce7" : `${ex.color}12`,
                          color: copied ? "#059669" : ex.color,
                        }}
                      >
                        {copied ? "✓ Kopiert!" : "📋 Prompt kopieren"}
                      </button>
                    </div>

                    {/* Lara feedback */}
                    <div
                      className="flex items-start gap-2 p-3 rounded-xl"
                      style={{ background: `${ex.color}08`, border: `1px solid ${ex.color}20` }}
                    >
                      <span className="text-lg">🤖</span>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: ex.color }}>
                          Lara sagt:
                        </span>
                        <p className="text-xs text-slate-600 mt-0.5">{ex.laraFeedback}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Tip box */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="highlight-box mt-4"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">🚀</span>
          <div>
            <p className="font-bold text-slate-800">Nächster Schritt: Fortgeschrittenen-Bereich</p>
            <p className="text-slate-600 text-sm mt-1">
              Du hast die Grundlagen drauf? Im Fortgeschrittenen-Bereich zeige ich dir, wie du KI-Agenten baust, die selbstständig arbeiten – mit Claude Code und OpenClaw.
            </p>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
