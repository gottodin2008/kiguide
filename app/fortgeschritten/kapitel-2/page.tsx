"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LaraVideoPresenter from "@/components/LaraVideoPresenter";
import ChapterNav from "@/components/ChapterNav";
import Ch09AgentenVsChatbot from "@/components/chapters/Ch09AgentenVsChatbot";

const slides = [
  { icon: "❓", tag: "Die Frage", tagColor: "#0891b2", title: "Welches Tool für welche Aufgabe?", body: "Wann brauchst du einen Chatbot, wann einen Agenten?" },
  { icon: "💬", tag: "Chatbot", tagColor: "#64748b", title: "Für Antworten", body: "Nur eine Antwort oder Information? Nimm einen Chatbot wie ChatGPT oder Claude." },
  { icon: "🤖", tag: "Agent", tagColor: "#7c3aed", title: "Für Aufgaben", body: "Soll KI selbstständig handeln – Dateien bearbeiten, Mails schreiben, Code bauen – dann nimm einen Agenten." },
  { icon: "🤝", tag: "Fazit", tagColor: "#059669", title: "Beide haben Stärken", body: "Im Alltag ergänzen sich Chatbot und Agent oft perfekt." },
];

const cues: [number, number, string][] = [
  [0.0, 3.5, "Wann brauchst du einen Chatbot und wann einen Agenten?"],
  [3.5, 12.0, "Faustregel: Nur eine Antwort? Nimm einen Chatbot wie ChatGPT oder Claude."],
  [12.0, 21.5, "Soll die KI selbstständig handeln – Dateien bearbeiten, Mails schreiben, Code bauen – brauchst du einen Agenten."],
  [21.5, 27.0, "Beide haben ihre Stärken und ergänzen sich oft perfekt."],
];

export default function Kapitel2() {
  return (
    <main style={{ background: "#f0f4f8", minHeight: "100vh" }}>
      <div className="sticky top-0 z-40 px-4 py-2 flex items-center gap-3"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
        <Link href="/fortgeschritten" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-cyan-600 transition-colors">← Übersicht</Link>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-black" style={{ color: "#0891b2" }}>⚖️ Kapitel 2</span>
        <span className="text-slate-500 text-sm font-medium hidden sm:inline">– Agent vs Chatbot</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge" style={{ background: "#ecfeff", color: "#0891b2", border: "1px solid rgba(8,145,178,0.3)" }}>
              <span>⚖️</span><span>Kapitel 2 von 8</span>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(8,145,178,0.3), transparent)" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
            Agenten vs. <span style={{ background: "linear-gradient(135deg,#0891b2,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Chatbots</span>
          </h1>
          <p className="text-slate-500 text-lg">Wann nimmst du welches Tool? Ein klarer Vergleich.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <LaraVideoPresenter audioSrc="/audio/ch09_lara.mp3" label="Lara erklärt: Agent oder Chatbot?" slides={slides} cues={cues} accent="#0891b2" defaultVideoSrc="/lara/videos/lara_fort_ch2.webm" />
        </motion.div>
      </div>

      <Ch09AgentenVsChatbot />

      <ChapterNav chapter={2} track="fortgeschritten" />
    </main>
  );
}
