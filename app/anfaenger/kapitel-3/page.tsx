"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LaraVideoPresenter from "@/components/LaraVideoPresenter";
import ChapterNav from "@/components/ChapterNav";
import { SlideVisual } from "@/components/SlideVisuals";
import Ch03Alltag from "@/components/chapters/Ch03Alltag";

// 1:1 zum Audio (ch03_lara.mp3, 20.5s)
const slides = [
  { tag: "Einführung", tagColor: "#059669", title: "KI ist überall", body: "KI ist überall um dich herum.", visual: <SlideVisual type="globe-sectors" /> },
  { tag: "Bereich 1", tagColor: "#4f46e5", title: "Kundenservice", body: "Im Kundenservice beantworten Chatbots Anfragen rund um die Uhr.", visual: <SlideVisual type="chatbot-cs" /> },
  { tag: "Bereich 2", tagColor: "#dc2626", title: "Medizin", body: "In der Medizin werten Ärzte mit KI Röntgenbilder aus.", visual: <SlideVisual type="medical" /> },
  { tag: "Bereich 3", tagColor: "#059669", title: "Navigation", body: "Google Maps nutzt KI für die schnellste Route.", visual: <SlideVisual type="map-route" /> },
  { tag: "Bereich 4", tagColor: "#7c3aed", title: "Banken", body: "Banken erkennen damit Betrug.", visual: <SlideVisual type="bank-shield" /> },
  { tag: "Bereich 5", tagColor: "#f97316", title: "Industrie", body: "Und in der Industrie steuern Roboter mit KI ganze Produktionslinien.", visual: <SlideVisual type="factory" /> },
];

const cues: [number, number, string][] = [
  [0.0, 2.1, "KI ist überall um dich herum."],
  [2.1, 6.5, "Im Kundenservice beantworten Chatbots Anfragen rund um die Uhr."],
  [6.5, 10.2, "In der Medizin werten Ärzte mit KI Röntgenbilder aus."],
  [10.2, 13.5, "Google Maps nutzt KI für die schnellste Route."],
  [13.5, 15.6, "Banken erkennen damit Betrug."],
  [15.6, 21.0, "Und in der Industrie steuern Roboter mit KI ganze Produktionslinien."],
];

export default function Kapitel3() {
  return (
    <main style={{ background: "#f0f4f8", minHeight: "100vh" }}>
      <div className="sticky top-0 z-40 px-4 py-2 flex items-center gap-3"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
        <Link href="/anfaenger" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">← Übersicht</Link>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-black" style={{ color: "#059669" }}>🌍 Kapitel 3</span>
        <span className="text-slate-500 text-sm font-medium hidden sm:inline">– KI im Einsatz</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge" style={{ background: "#ecfdf5", color: "#059669", border: "1px solid rgba(5,150,105,0.3)" }}>
              <span>🌍</span><span>Kapitel 3 von 7</span>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(5,150,105,0.3), transparent)" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
            Wo wird <span style={{ background: "linear-gradient(135deg,#059669,#0891b2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KI</span> heute schon eingesetzt?
          </h1>
          <p className="text-slate-500 text-lg">KI ist überall – du nutzt sie täglich, ohne es zu merken.</p>
        </motion.div>

        <LaraVideoPresenter
          audioSrc="/audio/ch03_lara.mp3"
          label="Lara erklärt: KI im Einsatz"
          slides={slides}
          cues={cues}
          accent="#059669"
          defaultVideoSrc="/lara/videos/lara_anf_ch3.webm"
        />
      </div>

      <Ch03Alltag />

      <ChapterNav chapter={3} />
    </main>
  );
}
