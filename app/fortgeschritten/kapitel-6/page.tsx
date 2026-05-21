"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LaraVideoPresenter from "@/components/LaraVideoPresenter";
import ChapterNav from "@/components/ChapterNav";
import Ch13Alternativen from "@/components/chapters/Ch13Alternativen";

const slides = [
  { icon: "💸", tag: "Gute Nachricht", tagColor: "#6366f1", title: "Keine teuren Abos nötig", body: "Du brauchst keine teuren Abos – es gibt richtig starke Alternativen." },
  { icon: "🦙", tag: "Lokal", tagColor: "#059669", title: "Ollama", body: "KI läuft komplett auf deinem eigenen PC – kostenlos, offline, absolut privat." },
  { icon: "🌐", tag: "Flexibel", tagColor: "#9333ea", title: "OpenRouter", body: "Zugang zu 400+ Modellen mit nur einem einzigen API-Schlüssel." },
  { icon: "🎚️", tag: "Fazit", tagColor: "#0891b2", title: "Unabhängig & flexibel", body: "Du bleibst flexibel und unabhängig von einzelnen Anbietern." },
];

const cues: [number, number, string][] = [
  [0.0, 3.5, "Du brauchst keine teuren Abos!"],
  [3.5, 13.5, "Ollama: KI läuft lokal auf deinem PC – kostenlos, offline, privat."],
  [13.5, 23.0, "OpenRouter: 400+ Modelle mit nur einem API-Schlüssel."],
  [23.0, 28.0, "Flexibel und unabhängig von einzelnen Anbietern."],
];

export default function Kapitel6() {
  return (
    <main style={{ background: "#f0f4f8", minHeight: "100vh" }}>
      <div className="sticky top-0 z-40 px-4 py-2 flex items-center gap-3"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
        <Link href="/fortgeschritten" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-cyan-600 transition-colors">← Übersicht</Link>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-black" style={{ color: "#6366f1" }}>🌐 Kapitel 6</span>
        <span className="text-slate-500 text-sm font-medium hidden sm:inline">– Alternativen</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge" style={{ background: "#eef2ff", color: "#6366f1", border: "1px solid rgba(99,102,241,0.3)" }}>
              <span>🌐</span><span>Kapitel 6 von 8</span>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.3), transparent)" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
            Alternative <span style={{ background: "linear-gradient(135deg,#6366f1,#9333ea)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KI-Modelle</span>
          </h1>
          <p className="text-slate-500 text-lg">Günstiger, lokaler, flexibler – Ollama, OpenRouter & Co.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <LaraVideoPresenter audioSrc="/audio/ch13_lara.mp3" label="Lara erklärt: Alternativen" slides={slides} cues={cues} accent="#6366f1" defaultVideoSrc="/lara/videos/lara_fort_ch6.webm" />
        </motion.div>
      </div>

      <Ch13Alternativen />

      <ChapterNav chapter={6} track="fortgeschritten" />
    </main>
  );
}
