"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LaraVideoPresenter from "@/components/LaraVideoPresenter";
import ChapterNav from "@/components/ChapterNav";
import { SlideVisual } from "@/components/SlideVisuals";
import Ch04Plattformen from "@/components/chapters/Ch04Plattformen";

// 1:1 zum Audio (ch04_lara.mp3, 25.0s)
const slides = [
  { tag: "Einführung", tagColor: "#2563eb", title: "Viele KI-Plattformen", body: "Es gibt viele KI-Plattformen.", visual: <SlideVisual type="platform-grid" /> },
  { tag: "Plattform 1", tagColor: "#059669", title: "ChatGPT", body: "ChatGPT von OpenAI ist der bekannteste Allrounder.", visual: <SlideVisual type="chatgpt-card" /> },
  { tag: "Plattform 2", tagColor: "#7c3aed", title: "Claude", body: "Claude von Anthropic ist besonders stark bei langen Texten und Code.", visual: <SlideVisual type="claude-card" /> },
  { tag: "Plattform 3", tagColor: "#2563eb", title: "Gemini", body: "Gemini ist die KI von Google, perfekt integriert in Gmail und Docs.", visual: <SlideVisual type="gemini-card" /> },
  { tag: "Plattform 4", tagColor: "#9333ea", title: "Perplexity", body: "Und Perplexity ist eine KI-Suchmaschine, die immer ihre Quellen nennt.", visual: <SlideVisual type="perplexity-card" /> },
  { tag: "Empfehlung", tagColor: "#059669", title: "Mein Tipp für Einsteiger", body: "Für Einsteiger empfehle ich ChatGPT oder Claude. Beide sind kostenlos.", visual: <SlideVisual type="recommend" /> },
];

const cues: [number, number, string][] = [
  [0.0, 2.1, "Es gibt viele KI-Plattformen."],
  [2.1, 5.7, "ChatGPT von OpenAI ist der bekannteste Allrounder."],
  [5.7, 10.6, "Claude von Anthropic ist besonders stark bei langen Texten und Code."],
  [10.6, 15.3, "Gemini ist die KI von Google, perfekt integriert in Gmail und Docs."],
  [15.3, 20.2, "Und Perplexity ist eine KI-Suchmaschine, die immer ihre Quellen nennt."],
  [20.2, 25.5, "Für Einsteiger empfehle ich ChatGPT oder Claude. Beide sind kostenlos."],
];

export default function Kapitel4() {
  return (
    <main style={{ background: "#f0f4f8", minHeight: "100vh" }}>
      <div className="sticky top-0 z-40 px-4 py-2 flex items-center gap-3"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
        <Link href="/anfaenger" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">← Übersicht</Link>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-black" style={{ color: "#2563eb" }}>🖥️ Kapitel 4</span>
        <span className="text-slate-500 text-sm font-medium hidden sm:inline">– Plattformen</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge" style={{ background: "#eff6ff", color: "#2563eb", border: "1px solid rgba(37,99,235,0.3)" }}>
              <span>🖥️</span><span>Kapitel 4 von 7</span>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(37,99,235,0.3), transparent)" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
            Die wichtigsten <span style={{ background: "linear-gradient(135deg,#2563eb,#0891b2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KI-Plattformen</span>
          </h1>
          <p className="text-slate-500 text-lg">Welche Plattform passt zu dir? Lara stellt die wichtigsten vor.</p>
        </motion.div>

        <LaraVideoPresenter
          audioSrc="/audio/ch04_lara.mp3"
          label="Lara erklärt: Plattformen"
          slides={slides}
          cues={cues}
          accent="#2563eb"
          defaultVideoSrc="/lara/videos/lara_anf_ch4.webm"
        />
      </div>

      <Ch04Plattformen />

      <ChapterNav chapter={4} />
    </main>
  );
}
