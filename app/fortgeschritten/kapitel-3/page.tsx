"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LaraVideoPresenter from "@/components/LaraVideoPresenter";
import ChapterNav from "@/components/ChapterNav";
import Ch10AgentenSysteme from "@/components/chapters/Ch10AgentenSysteme";

const slides = [
  { icon: "🛠️", tag: "Überblick", tagColor: "#f97316", title: "Für jeden das richtige Tool", body: "Es gibt mittlerweile für jeden das passende Agenten-System." },
  { icon: "⚡", tag: "Einsteiger", tagColor: "#f59e0b", title: "Zapier", body: "Per Klick verbinden – perfekt für Einsteiger ohne Code-Kenntnisse." },
  { icon: "🔄", tag: "No-Code Pro", tagColor: "#dc2626", title: "n8n", body: "Mehr Flexibilität, läuft sogar lokal bei dir auf eigener Hardware." },
  { icon: "💻", tag: "Entwickler", tagColor: "#7c3aed", title: "Claude Code & OpenClaw", body: "Für Entwickler – echte Power-Agenten mit voller Kontrolle." },
  { icon: "🎯", tag: "Mein Tipp", tagColor: "#059669", title: "Wähle eins – und starte!", body: "Du musst nicht alles lernen. Der Rest kommt von selbst." },
];

const cues: [number, number, string][] = [
  [0.0, 4.0, "Es gibt für jeden das richtige Agenten-System."],
  [4.0, 9.0, "Zapier: per Klick verbinden – perfekt für Einsteiger ohne Code."],
  [9.0, 14.0, "n8n: mehr Flexibilität, läuft sogar lokal bei dir."],
  [14.0, 20.0, "Claude Code & OpenClaw: für Entwickler echte Power-Agenten."],
  [20.0, 27.0, "Mein Tipp: Wähle eins und starte – der Rest kommt von selbst."],
];

export default function Kapitel3() {
  return (
    <main style={{ background: "#f0f4f8", minHeight: "100vh" }}>
      <div className="sticky top-0 z-40 px-4 py-2 flex items-center gap-3"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
        <Link href="/fortgeschritten" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-cyan-600 transition-colors">← Übersicht</Link>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-black" style={{ color: "#f97316" }}>🛠️ Kapitel 3</span>
        <span className="text-slate-500 text-sm font-medium hidden sm:inline">– Agenten-Systeme</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge" style={{ background: "#fff7ed", color: "#f97316", border: "1px solid rgba(249,115,22,0.3)" }}>
              <span>🛠️</span><span>Kapitel 3 von 8</span>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(249,115,22,0.3), transparent)" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
            Wichtige <span style={{ background: "linear-gradient(135deg,#f97316,#dc2626)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Agenten-Systeme</span>
          </h1>
          <p className="text-slate-500 text-lg">Vom No-Code-Tool bis zum professionellen Agent-Framework.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <LaraVideoPresenter audioSrc="/audio/ch10_lara.mp3" label="Lara erklärt: Agenten-Systeme" slides={slides} cues={cues} accent="#f97316" defaultVideoSrc="/lara/videos/lara_fort_ch3.webm" />
        </motion.div>
      </div>

      <Ch10AgentenSysteme />

      <ChapterNav chapter={3} track="fortgeschritten" />
    </main>
  );
}
