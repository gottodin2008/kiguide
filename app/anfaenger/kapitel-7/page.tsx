"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LaraVideoPresenter from "@/components/LaraVideoPresenter";
import ChapterNav from "@/components/ChapterNav";
import { SlideVisual } from "@/components/SlideVisuals";
import Ch07Uebungen from "@/components/chapters/Ch07Uebungen";

// 1:1 zum Audio (ch07_lara.mp3, 21.7s)
const slides = [
  { tag: "Einführung", tagColor: "#059669", title: "Jetzt geht's ans Üben", body: "Genug Theorie – jetzt geht es ans Üben!", visual: <SlideVisual type="exercises-grid" /> },
  { tag: "Übersicht", tagColor: "#0891b2", title: "8 Übungen", body: "Ich habe acht praktische Übungen für dich.", visual: <SlideVisual type="exercises-grid" /> },
  { tag: "Übung 1-3", tagColor: "#ec4899", title: "Texte, Posts & Bilder", body: "Du lernst E-Mails zu schreiben, Social-Media-Posts zu erstellen, Bilder mit KI zu generieren.", visual: <SlideVisual type="email-social" /> },
  { tag: "Übung 4-6", tagColor: "#0891b2", title: "Pläne & Erklärungen", body: "To-do-Listen zu planen, schwierige Themen einfach erklären zu lassen, und ganze Events zu organisieren.", visual: <SlideVisual type="todo-explain" /> },
  { tag: "Tipp", tagColor: "#f97316", title: "Sofort loslegen", body: "Jede Übung hat einen fertigen Prompt, den du sofort ausprobieren kannst.", visual: <SlideVisual type="events-plan" /> },
];

const cues: [number, number, string][] = [
  [0.0, 2.5, "Genug Theorie – jetzt geht es ans Üben!"],
  [2.5, 5.1, "Ich habe acht praktische Übungen für dich."],
  [5.1, 10.9, "Du lernst E-Mails zu schreiben, Social-Media-Posts zu erstellen, Bilder mit KI zu generieren."],
  [10.9, 17.3, "To-do-Listen zu planen, schwierige Themen einfach erklären zu lassen, und ganze Events zu organisieren."],
  [17.3, 22.0, "Jede Übung hat einen fertigen Prompt, den du sofort ausprobieren kannst."],
];

export default function Kapitel7() {
  return (
    <main style={{ background: "#f0f4f8", minHeight: "100vh" }}>
      <div className="sticky top-0 z-40 px-4 py-2 flex items-center gap-3"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
        <Link href="/anfaenger" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">← Übersicht</Link>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-black" style={{ color: "#059669" }}>🎯 Kapitel 7</span>
        <span className="text-slate-500 text-sm font-medium hidden sm:inline">– Übungen</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge" style={{ background: "#ecfdf5", color: "#059669", border: "1px solid rgba(5,150,105,0.3)" }}>
              <span>🎯</span><span>Kapitel 7 von 7</span>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(5,150,105,0.3), transparent)" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
            Erste praktische <span style={{ background: "linear-gradient(135deg,#059669,#0891b2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Übungen</span>
          </h1>
          <p className="text-slate-500 text-lg">Lerne KI durch Ausprobieren – mit echten Prompts die du direkt nutzen kannst.</p>
        </motion.div>

        <LaraVideoPresenter
          audioSrc="/audio/ch07_lara.mp3"
          label="Lara erklärt: Praktische Übungen"
          slides={slides}
          cues={cues}
          accent="#059669"
          defaultVideoSrc="/lara/videos/lara_anf_ch7.webm"
        />
      </div>

      <Ch07Uebungen />

      <ChapterNav chapter={7} />
    </main>
  );
}
