"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LaraVideoPresenter from "@/components/LaraVideoPresenter";
import ChapterNav from "@/components/ChapterNav";
import { SlideVisual } from "@/components/SlideVisuals";
import Ch05Modelle from "@/components/chapters/Ch05Modelle";

// 1:1 zum Audio (ch05_lara.mp3, 28.0s)
const slides = [
  { tag: "Einführung", tagColor: "#7c3aed", title: "Was sind LLMs?", body: "Hinter den Plattformen stecken große Sprachmodelle, kurz LLMs.", visual: <SlideVisual type="llm-brain" /> },
  { tag: "Modell 1", tagColor: "#059669", title: "GPT von OpenAI", body: "OpenAI hat GPT für allgemeine Aufgaben.", visual: <SlideVisual type="gpt-card" /> },
  { tag: "Modell 2", tagColor: "#7c3aed", title: "Claude in 3 Stärken", body: "Anthropic bietet Claude in drei Stärken: Haiku ist schnell, Sonnet ist ausgewogen, und Opus ist für die schwierigsten Aufgaben.", visual: <SlideVisual type="claude-tiers" /> },
  { tag: "Modell 3", tagColor: "#2563eb", title: "Gemini von Google", body: "Google hat Gemini mit starker Integration.", visual: <SlideVisual type="gemini-card" /> },
  { tag: "Modell 4", tagColor: "#f97316", title: "Llama Open Source", body: "Und Meta veröffentlicht Llama als Open-Source-Modell, das du kostenlos auf deinem PC nutzen kannst.", visual: <SlideVisual type="llama-card" /> },
];

const cues: [number, number, string][] = [
  [0.0, 4.8, "Hinter den Plattformen stecken große Sprachmodelle, kurz LLMs."],
  [4.8, 7.8, "OpenAI hat GPT für allgemeine Aufgaben."],
  [7.8, 17.3, "Anthropic bietet Claude in drei Stärken: Haiku ist schnell, Sonnet ist ausgewogen, und Opus ist für die schwierigsten Aufgaben."],
  [17.3, 20.5, "Google hat Gemini mit starker Integration."],
  [20.5, 28.5, "Und Meta veröffentlicht Llama als Open-Source-Modell, das du kostenlos auf deinem PC nutzen kannst."],
];

export default function Kapitel5() {
  return (
    <main style={{ background: "#f0f4f8", minHeight: "100vh" }}>
      <div className="sticky top-0 z-40 px-4 py-2 flex items-center gap-3"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
        <Link href="/anfaenger" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">← Übersicht</Link>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-black" style={{ color: "#7c3aed" }}>🤖 Kapitel 5</span>
        <span className="text-slate-500 text-sm font-medium hidden sm:inline">– KI-Modelle</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge" style={{ background: "#f5f3ff", color: "#7c3aed", border: "1px solid rgba(124,58,237,0.3)" }}>
              <span>🤖</span><span>Kapitel 5 von 7</span>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.3), transparent)" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
            Welche <span style={{ background: "linear-gradient(135deg,#7c3aed,#9333ea)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KI-Modelle</span> gibt es?
          </h1>
          <p className="text-slate-500 text-lg">Die wichtigsten Anbieter und ihre Modelle im Überblick.</p>
        </motion.div>

        <LaraVideoPresenter
          audioSrc="/audio/ch05_lara.mp3"
          label="Lara erklärt: KI-Modelle"
          slides={slides}
          cues={cues}
          accent="#7c3aed"
          defaultVideoSrc="/lara/videos/lara_anf_ch5.webm"
        />
      </div>

      <Ch05Modelle />

      <ChapterNav chapter={5} />
    </main>
  );
}
