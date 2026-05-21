"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LaraVideoPresenter from "@/components/LaraVideoPresenter";
import ChapterNav from "@/components/ChapterNav";
import Ch14ModellGuide from "@/components/chapters/Ch14ModellGuide";

const slides = [
  { icon: "🎯", tag: "Die Frage", tagColor: "#f59e0b", title: "Welches Modell wofür?", body: "Die häufigste Frage, die ich höre – hier kommt die kurze Antwort." },
  { icon: "✍️", tag: "Texte", tagColor: "#64748b", title: "Haiku & GPT-Mini", body: "Für einfache Texte und Mails – günstig und schnell." },
  { icon: "💻", tag: "Code", tagColor: "#4f46e5", title: "Claude Sonnet", body: "Für Code und komplexe Logik – ungeschlagen." },
  { icon: "🎬", tag: "Video & lokal", tagColor: "#ec4899", title: "Higgsfield, Sora, Ollama", body: "Für Videos: Higgsfield oder Sora. Für alles lokal: Ollama." },
  { icon: "🔍", tag: "Recherche", tagColor: "#0891b2", title: "Perplexity", body: "Für Recherche mit Quellenangaben unschlagbar. Das beste Modell ist das passende Modell." },
];

const cues: [number, number, string][] = [
  [0.0, 5.0, "Welches Modell für welche Aufgabe? Häufigste Frage!"],
  [5.0, 12.0, "Einfache Texte: Haiku oder GPT-Mini – günstig und schnell."],
  [12.0, 16.0, "Code & komplexe Logik: Claude Sonnet ungeschlagen."],
  [16.0, 23.0, "Videos: Higgsfield oder Sora. Lokal: Ollama."],
  [23.0, 31.0, "Recherche: Perplexity. Merk dir: Das beste Modell ist das passende Modell."],
];

export default function Kapitel7() {
  return (
    <main style={{ background: "#f0f4f8", minHeight: "100vh" }}>
      <div className="sticky top-0 z-40 px-4 py-2 flex items-center gap-3"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
        <Link href="/fortgeschritten" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-cyan-600 transition-colors">← Übersicht</Link>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-black" style={{ color: "#f59e0b" }}>🎯 Kapitel 7</span>
        <span className="text-slate-500 text-sm font-medium hidden sm:inline">– Modell-Guide</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge" style={{ background: "#fffbeb", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)" }}>
              <span>🎯</span><span>Kapitel 7 von 8</span>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(245,158,11,0.3), transparent)" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
            Welches <span style={{ background: "linear-gradient(135deg,#f59e0b,#dc2626)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Modell</span> für welchen Zweck?
          </h1>
          <p className="text-slate-500 text-lg">Der schnelle Entscheidungsguide – kein Trial &amp; Error mehr.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <LaraVideoPresenter audioSrc="/audio/ch14_lara.mp3" label="Lara erklärt: Welches Modell wofür?" slides={slides} cues={cues} accent="#f59e0b" defaultVideoSrc="/lara/videos/lara_fort_ch7.webm" />
        </motion.div>
      </div>

      <Ch14ModellGuide />

      <ChapterNav chapter={7} track="fortgeschritten" />
    </main>
  );
}
