"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LaraVideoPresenter from "@/components/LaraVideoPresenter";
import ChapterNav from "@/components/ChapterNav";
import Ch08Agenten from "@/components/chapters/Ch08Agenten";

const slides = [
  { icon: "🚀", tag: "Willkommen", tagColor: "#7c3aed", title: "Fortgeschritten startet jetzt", body: "Willkommen im Fortgeschrittenen-Bereich! Hier wird es richtig spannend." },
  { icon: "🤖", tag: "Der Unterschied", tagColor: "#0891b2", title: "Chatbot ≠ Agent", body: "Ein Chatbot antwortet auf Fragen. Ein Agent denkt selbst, plant Schritte und nutzt Werkzeuge." },
  { icon: "💡", tag: "Vorstellung", tagColor: "#9333ea", title: "Einmal sagen, fertig", body: "Du sagst einmal, was du willst – der Agent erledigt den Rest." },
  { icon: "🛠️", tag: "Fähigkeiten", tagColor: "#059669", title: "Dateien, Code, Web", body: "Liest Dateien, schreibt Code, bedient Webseiten und prüft seine eigenen Ergebnisse." },
  { icon: "⚡", tag: "Fazit", tagColor: "#dc2626", title: "Genau das macht ihn mächtig", body: "Selbstständigkeit + Werkzeuge + Reflexion = echter digitaler Mitarbeiter." },
];

const cues: [number, number, string][] = [
  [0.0, 4.5, "Willkommen im Fortgeschrittenen-Bereich! Hier wird es richtig spannend."],
  [4.5, 14.5, "Ein normaler Chatbot antwortet auf Fragen. Ein KI-Agent dagegen denkt selbstständig, plant Schritte und nutzt Werkzeuge."],
  [14.5, 19.5, "Stell dir vor: Du sagst einmal was du willst, und der Agent erledigt alles andere."],
  [19.5, 25.5, "Er liest Dateien, schreibt Code, bedient Webseiten und prüft sogar seine eigenen Ergebnisse."],
  [25.5, 30.0, "Genau das macht ihn so mächtig."],
];

export default function Kapitel1() {
  return (
    <main style={{ background: "#f0f4f8", minHeight: "100vh" }}>
      <div className="sticky top-0 z-40 px-4 py-2 flex items-center gap-3"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
        <Link href="/fortgeschritten" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-cyan-600 transition-colors">← Übersicht</Link>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-black" style={{ color: "#7c3aed" }}>🤖 Kapitel 1</span>
        <span className="text-slate-500 text-sm font-medium hidden sm:inline">– KI-Agenten</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge" style={{ background: "#f5f3ff", color: "#7c3aed", border: "1px solid rgba(124,58,237,0.3)" }}>
              <span>🤖</span><span>Kapitel 1 von 8</span>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.3), transparent)" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
            Was sind <span style={{ background: "linear-gradient(135deg,#7c3aed,#0891b2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KI-Agenten</span>?
          </h1>
          <p className="text-slate-500 text-lg">Der Unterschied zwischen Antworten und Handeln.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <LaraVideoPresenter audioSrc="/audio/ch08_lara.mp3" label="Lara erklärt: KI-Agenten" slides={slides} cues={cues} accent="#7c3aed" defaultVideoSrc="/lara/videos/lara_fort_ch1.webm" />
        </motion.div>
      </div>

      <Ch08Agenten />

      <ChapterNav chapter={1} track="fortgeschritten" />
    </main>
  );
}
