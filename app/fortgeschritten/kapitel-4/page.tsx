"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LaraVideoPresenter from "@/components/LaraVideoPresenter";
import ChapterNav from "@/components/ChapterNav";
import Ch11OpenClaw from "@/components/chapters/Ch11OpenClaw";

const slides = [
  { icon: "🦅", tag: "Vorstellung", tagColor: "#059669", title: "OpenClaw", body: "Ein persönlicher Assistent mit Superkräften." },
  { icon: "🔌", tag: "Fähigkeiten", tagColor: "#0891b2", title: "Verbindet alles", body: "Verbindet sich mit deinen Tools, liest Dateien, sendet Nachrichten – rund um die Uhr." },
  { icon: "⚙️", tag: "Setup", tagColor: "#7c3aed", title: "Nur 2 Zutaten", body: "Node.js und ein Anthropic-API-Schlüssel – dann kann es losgehen." },
  { icon: "🔓", tag: "Open Source", tagColor: "#16a34a", title: "Kostenlos & transparent", body: "Du siehst selbst, was passiert – und kannst alles anpassen." },
  { icon: "🧩", tag: "Erweiterbar", tagColor: "#9333ea", title: "Eigene Werkzeuge", body: "Ergänze eigene Tools und passe den Agenten exakt deinen Bedürfnissen an." },
];

const cues: [number, number, string][] = [
  [0.0, 4.0, "OpenClaw – persönlicher Assistent mit Superkräften."],
  [4.0, 12.0, "Verbindet sich mit Tools, liest Dateien, sendet Nachrichten – rund um die Uhr."],
  [12.0, 18.0, "Du brauchst nur Node.js und einen Anthropic-API-Key, dann geht's los."],
  [18.0, 22.5, "Open Source – kostenlos und transparent."],
  [22.5, 29.5, "Eigene Werkzeuge ergänzen und genau auf deine Bedürfnisse anpassen."],
];

export default function Kapitel4() {
  return (
    <main style={{ background: "#f0f4f8", minHeight: "100vh" }}>
      <div className="sticky top-0 z-40 px-4 py-2 flex items-center gap-3"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
        <Link href="/fortgeschritten" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-cyan-600 transition-colors">← Übersicht</Link>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-black" style={{ color: "#059669" }}>🦅 Kapitel 4</span>
        <span className="text-slate-500 text-sm font-medium hidden sm:inline">– OpenClaw</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge" style={{ background: "#ecfdf5", color: "#059669", border: "1px solid rgba(5,150,105,0.3)" }}>
              <span>🦅</span><span>Kapitel 4 von 8</span>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(5,150,105,0.3), transparent)" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
            <span style={{ background: "linear-gradient(135deg,#059669,#0891b2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>OpenClaw</span> – dein persönlicher Agent
          </h1>
          <p className="text-slate-500 text-lg">Installation, Setup und Sicherheitsregeln Schritt für Schritt.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <LaraVideoPresenter audioSrc="/audio/ch11_lara.mp3" label="Lara erklärt: OpenClaw" slides={slides} cues={cues} accent="#059669" defaultVideoSrc="/lara/videos/lara_fort_ch4.webm" />
        </motion.div>
      </div>

      <Ch11OpenClaw />

      <ChapterNav chapter={4} track="fortgeschritten" />
    </main>
  );
}
