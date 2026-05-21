"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LaraVideoPresenter from "@/components/LaraVideoPresenter";
import ChapterNav from "@/components/ChapterNav";
import { SlideVisual } from "@/components/SlideVisuals";
import Ch02Moeglichkeiten from "@/components/chapters/Ch02Moeglichkeiten";

// 1:1 zum Audio (ch02_lara.mp3, 22.4s)
const slides = [
  { tag: "Einführung", tagColor: "#9333ea", title: "KI ist vielseitig", body: "KI ist unglaublich vielseitig.", visual: <SlideVisual type="vielseitig" /> },
  { tag: "Beispiel 1", tagColor: "#4f46e5", title: "Texte schreiben", body: "Du kannst Texte schreiben wie E-Mails und Berichte.", visual: <SlideVisual type="text" /> },
  { tag: "Beispiel 2", tagColor: "#9333ea", title: "Bilder generieren", body: "Du kannst Bilder generieren aus einer kurzen Beschreibung.", visual: <SlideVisual type="image" /> },
  { tag: "Beispiel 3", tagColor: "#059669", title: "Programmcode schreiben", body: "Du kannst Programmcode schreiben für deine eigenen Apps.", visual: <SlideVisual type="code" /> },
  { tag: "Beispiel 4", tagColor: "#0891b2", title: "Daten analysieren", body: "Und du kannst Daten analysieren, zum Beispiel Tabellen und Statistiken.", visual: <SlideVisual type="data-chart" /> },
  { tag: "Tipp", tagColor: "#ec4899", title: "Probier es selbst", body: "Klicke auf eine Kachel unten und ich zeige dir ein konkretes Beispiel.", visual: <SlideVisual type="genai" /> },
];

const cues: [number, number, string][] = [
  [0.0, 2.1, "KI ist unglaublich vielseitig."],
  [2.1, 5.5, "Du kannst Texte schreiben wie E-Mails und Berichte."],
  [5.5, 9.4, "Du kannst Bilder generieren aus einer kurzen Beschreibung."],
  [9.4, 13.1, "Du kannst Programmcode schreiben für deine eigenen Apps."],
  [13.1, 17.8, "Und du kannst Daten analysieren, zum Beispiel Tabellen und Statistiken."],
  [17.8, 22.5, "Klicke auf eine Kachel unten und ich zeige dir ein konkretes Beispiel."],
];

export default function Kapitel2() {
  return (
    <main style={{ background: "#f0f4f8", minHeight: "100vh" }}>
      <div className="sticky top-0 z-40 px-4 py-2 flex items-center gap-3"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
        <Link href="/anfaenger" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">← Übersicht</Link>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-black" style={{ color: "#9333ea" }}>✨ Kapitel 2</span>
        <span className="text-slate-500 text-sm font-medium hidden sm:inline">– Was kann KI?</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge" style={{ background: "#faf5ff", color: "#9333ea", border: "1px solid rgba(147,51,234,0.3)" }}>
              <span>✨</span><span>Kapitel 2 von 7</span>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(147,51,234,0.3), transparent)" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
            Was kann man mit <span className="grad-lara">KI</span> machen?
          </h1>
          <p className="text-slate-500 text-lg">Ein Überblick über alles, wobei KI dir helfen kann.</p>
        </motion.div>

        <LaraVideoPresenter
          audioSrc="/audio/ch02_lara.mp3"
          label="Lara erklärt: Was kann KI?"
          slides={slides}
          cues={cues}
          accent="#9333ea"
          defaultVideoSrc="/lara/videos/lara_anf_ch2.webm"
        />
      </div>

      <Ch02Moeglichkeiten />

      <ChapterNav chapter={2} />
    </main>
  );
}
