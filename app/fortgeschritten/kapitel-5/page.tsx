"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LaraVideoPresenter from "@/components/LaraVideoPresenter";
import ChapterNav from "@/components/ChapterNav";
import Ch12ClaudeCode from "@/components/chapters/Ch12ClaudeCode";

const slides = [
  { icon: "⚡", tag: "Mein Favorit", tagColor: "#7c3aed", title: "Claude Code", body: "Claude Code ist mein persönlicher Favorit." },
  { icon: "💻", tag: "Was er kann", tagColor: "#4f46e5", title: "Im Terminal & IDE", body: "Läuft im Terminal, versteht dein ganzes Projekt – und ändert Dateien selbstständig." },
  { icon: "👷", tag: "Für wen", tagColor: "#9333ea", title: "Für Builder", body: "Perfekt für Entwickler und alle, die ernsthaft mit KI arbeiten." },
  { icon: "🚀", tag: "In Minuten", tagColor: "#0891b2", title: "Senior an deiner Seite", body: "Installation in wenigen Minuten – dann hast du jederzeit einen Senior-Entwickler griffbereit." },
];

const cues: [number, number, string][] = [
  [0.0, 3.5, "Claude Code ist mein persönlicher Favorit!"],
  [3.5, 15.5, "Er läuft im Terminal, versteht dein ganzes Projekt und nimmt selbstständig Änderungen vor."],
  [15.5, 22.0, "Perfekt für Builder und alle, die ernsthaft mit KI arbeiten."],
  [22.0, 29.0, "Installation in Minuten – dann hast du einen Senior-Entwickler an deiner Seite."],
];

export default function Kapitel5() {
  return (
    <main style={{ background: "#f0f4f8", minHeight: "100vh" }}>
      <div className="sticky top-0 z-40 px-4 py-2 flex items-center gap-3"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
        <Link href="/fortgeschritten" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-cyan-600 transition-colors">← Übersicht</Link>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-black" style={{ color: "#7c3aed" }}>⚡ Kapitel 5</span>
        <span className="text-slate-500 text-sm font-medium hidden sm:inline">– Claude Code</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge" style={{ background: "#f5f3ff", color: "#7c3aed", border: "1px solid rgba(124,58,237,0.3)" }}>
              <span>⚡</span><span>Kapitel 5 von 8</span>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.3), transparent)" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
            <span style={{ background: "linear-gradient(135deg,#7c3aed,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Claude Code</span> – KI für Entwickler
          </h1>
          <p className="text-slate-500 text-lg">Das offizielle Coding-Tool von Anthropic. Schritt für Schritt.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <LaraVideoPresenter audioSrc="/audio/ch12_lara.mp3" label="Lara erklärt: Claude Code" slides={slides} cues={cues} accent="#7c3aed" defaultVideoSrc="/lara/videos/lara_fort_ch5.webm" />
        </motion.div>
      </div>

      <Ch12ClaudeCode />

      <ChapterNav chapter={5} track="fortgeschritten" />
    </main>
  );
}
