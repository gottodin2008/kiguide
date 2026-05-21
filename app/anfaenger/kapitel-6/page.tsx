"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LaraVideoPresenter from "@/components/LaraVideoPresenter";
import ChapterNav from "@/components/ChapterNav";
import { SlideVisual } from "@/components/SlideVisuals";
import Ch06Preise from "@/components/chapters/Ch06Preise";

// 1:1 zum Audio (ch06_lara.mp3, 21.8s)
const slides = [
  { tag: "Einführung", tagColor: "#d97706", title: "Drei Preismodelle", body: "Es gibt drei Preismodelle.", visual: <SlideVisual type="pricing-3tiers" /> },
  { tag: "Modell 1", tagColor: "#059669", title: "Kostenlos", body: "Erstens: kostenlos. ChatGPT, Claude und Gemini bieten kostenlose Versionen mit täglichem Limit.", visual: <SlideVisual type="pricing-free" /> },
  { tag: "Modell 2", tagColor: "#4f46e5", title: "Pro-Abo", body: "Zweitens: Pro-Abos. Für etwa zwanzig Euro pro Monat bekommst du die neuesten Modelle ohne Limit.", visual: <SlideVisual type="pricing-pro" /> },
  { tag: "Modell 3", tagColor: "#0891b2", title: "API-Zugang", body: "Und drittens: API-Zugang. Du zahlst nur was du nutzt – ideal für eigene Apps oder Entwickler.", visual: <SlideVisual type="pricing-api" /> },
];

const cues: [number, number, string][] = [
  [0.0, 1.8, "Es gibt drei Preismodelle."],
  [1.8, 8.5, "Erstens: kostenlos. ChatGPT, Claude und Gemini bieten kostenlose Versionen mit täglichem Limit."],
  [8.5, 15.2, "Zweitens: Pro-Abos. Für etwa zwanzig Euro pro Monat bekommst du die neuesten Modelle ohne Limit."],
  [15.2, 22.0, "Und drittens: API-Zugang. Du zahlst nur was du nutzt – ideal für eigene Apps oder Entwickler."],
];

export default function Kapitel6() {
  return (
    <main style={{ background: "#f0f4f8", minHeight: "100vh" }}>
      <div className="sticky top-0 z-40 px-4 py-2 flex items-center gap-3"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
        <Link href="/anfaenger" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">← Übersicht</Link>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-black" style={{ color: "#d97706" }}>💰 Kapitel 6</span>
        <span className="text-slate-500 text-sm font-medium hidden sm:inline">– Preise & Kosten</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge" style={{ background: "#fffbeb", color: "#d97706", border: "1px solid rgba(217,119,6,0.3)" }}>
              <span>💰</span><span>Kapitel 6 von 7</span>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(217,119,6,0.3), transparent)" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
            Was kostet <span style={{ background: "linear-gradient(135deg,#d97706,#f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KI</span>?
          </h1>
          <p className="text-slate-500 text-lg">Von kostenlos bis Enterprise – einfach erklärt.</p>
        </motion.div>

        <LaraVideoPresenter
          audioSrc="/audio/ch06_lara.mp3"
          label="Lara erklärt: Preise & Kosten"
          slides={slides}
          cues={cues}
          accent="#d97706"
          defaultVideoSrc="/lara/videos/lara_anf_ch6.webm"
        />
      </div>

      <Ch06Preise />

      <ChapterNav chapter={6} />
    </main>
  );
}
