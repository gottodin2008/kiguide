"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LaraVideoPresenter from "@/components/LaraVideoPresenter";
import ChapterNav from "@/components/ChapterNav";
import { SlideVisual } from "@/components/SlideVisuals";

// Slides 1:1 zum gesprochenen Audio (ch01_lara.mp3, 23.5s)
const kiTypesSlides = [
  {
    icon: "🧠",
    tag: "Einführung",
    tagColor: "#4f46e5",
    title: "Was ist KI?",
    body: "Künstliche Intelligenz ist Software, die aus Daten lernt und Aufgaben übernimmt. Es gibt vier Arten von KI.",
    visual: <SlideVisual type="ki-intro" />,
  },
  {
    icon: "⚙️",
    tag: "Erstens",
    tagColor: "#64748b",
    title: "Klassische Software",
    body: "Klassische Software folgt festen Regeln.",
    visual: <SlideVisual type="classic" />,
  },
  {
    icon: "📊",
    tag: "Zweitens",
    tagColor: "#0891b2",
    title: "Machine Learning",
    body: "Machine Learning erkennt Muster in Daten.",
    visual: <SlideVisual type="ml" />,
  },
  {
    icon: "🎨",
    tag: "Drittens",
    tagColor: "#9333ea",
    title: "Generative KI",
    body: "Generative KI erschafft Texte, Bilder und Videos.",
    visual: <SlideVisual type="genai" />,
  },
  {
    icon: "💬",
    tag: "Viertens",
    tagColor: "#4f46e5",
    title: "Sprachmodelle",
    body: "Sprachmodelle wie Claude oder ChatGPT verstehen unsere Sprache.",
    visual: <SlideVisual type="llm" />,
  },
];

// Karaoke-Cues: [start, end, gesprochener Text] – 1:1 mit kiTypesSlides
const kiTypesCues: [number, number, string][] = [
  [0.0, 7.5, "Künstliche Intelligenz ist Software, die aus Daten lernt und Aufgaben übernimmt. Es gibt vier Arten von KI."],
  [7.5, 11.0, "Erstens: Klassische Software folgt festen Regeln."],
  [11.0, 14.7, "Zweitens: Machine Learning erkennt Muster in Daten."],
  [14.7, 18.7, "Drittens: Generative KI erschafft Texte, Bilder und Videos."],
  [18.7, 24.0, "Und viertens: Sprachmodelle wie Claude oder ChatGPT verstehen unsere Sprache."],
];

// Slides 1:1 zum gesprochenen Audio (ch01_example.mp3, 22s)
const alltagsSlides = [
  {
    icon: "🌍",
    tag: "Alltag",
    tagColor: "#059669",
    title: "KI im Alltag",
    body: "KI ist längst Teil deines Alltags.",
    visual: <SlideVisual type="alltag" />,
  },
  {
    icon: "✍️",
    tag: "Beispiel 1",
    tagColor: "#4f46e5",
    title: "Texte schreiben",
    body: "Du kannst damit Texte schreiben, zum Beispiel E-Mails und Berichte.",
    visual: <SlideVisual type="text" />,
  },
  {
    icon: "🖼️",
    tag: "Beispiel 2",
    tagColor: "#9333ea",
    title: "Bilder erstellen",
    body: "Du kannst Bilder erstellen aus einer kurzen Beschreibung.",
    visual: <SlideVisual type="image" />,
  },
  {
    icon: "🎵",
    tag: "Beispiel 3",
    tagColor: "#f59e0b",
    title: "Musik komponieren",
    body: "Du kannst Musik komponieren mit Gesang.",
    visual: <SlideVisual type="music" />,
  },
  {
    icon: "💻",
    tag: "Beispiel 4",
    tagColor: "#059669",
    title: "Code schreiben",
    body: "Du kannst Programmcode schreiben ohne Vorkenntnisse.",
    visual: <SlideVisual type="code" />,
  },
  {
    icon: "🔄",
    tag: "Beispiel 5",
    tagColor: "#0891b2",
    title: "Aufgaben automatisieren",
    body: "Und du kannst wiederkehrende Aufgaben automatisieren. Das spart dir Stunden pro Woche.",
    visual: <SlideVisual type="automate" />,
  },
];

const alltagsCues: [number, number, string][] = [
  [0.0, 2.5, "KI ist längst Teil deines Alltags."],
  [2.5, 7.0, "Du kannst damit Texte schreiben, zum Beispiel E-Mails und Berichte."],
  [7.0, 10.7, "Du kannst Bilder erstellen aus einer kurzen Beschreibung."],
  [10.7, 13.5, "Du kannst Musik komponieren mit Gesang."],
  [13.5, 17.0, "Du kannst Programmcode schreiben ohne Vorkenntnisse."],
  [17.0, 22.5, "Und du kannst wiederkehrende Aufgaben automatisieren. Das spart dir Stunden pro Woche."],
];

const types = [
  {
    icon: "⚙️",
    title: "Klassische Software",
    desc: "Folgt exakten Regeln. Tut genau das, was programmiert wurde – nicht mehr.",
    example: "Taschenrechner, Excel",
    color: "#64748b",
  },
  {
    icon: "📊",
    title: "Machine Learning",
    desc: "Lernt aus Daten und erkennt Muster. Verbessert sich mit jeder Erfahrung.",
    example: "Spam-Filter, Empfehlungen",
    color: "#0891b2",
  },
  {
    icon: "🎨",
    title: "Generative KI",
    desc: "Erschafft neuen Content: Texte, Bilder, Videos, Musik – aus einer Beschreibung.",
    example: "ChatGPT, Midjourney",
    color: "#9333ea",
  },
  {
    icon: "💬",
    title: "Sprachmodelle (LLMs)",
    desc: "Versteht und erzeugt Sprache. Wie ein sehr kluger Gesprächspartner.",
    example: "Claude, GPT-5, Gemini",
    color: "#4f46e5",
  },
];

const examples = [
  { icon: "✍️", label: "Texte schreiben" },
  { icon: "🖼️", label: "Bilder erstellen" },
  { icon: "🎵", label: "Musik generieren" },
  { icon: "🎬", label: "Videos erstellen" },
  { icon: "💻", label: "Code schreiben" },
  { icon: "🔄", label: "Automatisieren" },
];

export default function Kapitel1() {
  return (
    <main style={{ background: "#f0f4f8", minHeight: "100vh" }}>
      {/* Sticky top bar */}
      <div
        className="sticky top-0 z-40 px-4 py-2 flex items-center gap-3"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Link
          href="/anfaenger"
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          ← Übersicht
        </Link>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-black" style={{ color: "#4f46e5" }}>
          🧠 Kapitel 1
        </span>
        <span className="text-slate-500 text-sm font-medium hidden sm:inline">
          – Was ist KI?
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        {/* Chapter header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="badge"
              style={{
                background: "#eef2ff",
                color: "#4f46e5",
                border: "1px solid rgba(79,70,229,0.3)",
              }}
            >
              <span>🧠</span>
              <span>Kapitel 1 von 7</span>
            </div>
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(90deg, rgba(79,70,229,0.3), transparent)",
              }}
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
            Was ist{" "}
            <span className="grad-primary">Künstliche Intelligenz</span>?
          </h1>
          <p className="text-slate-500 text-lg">
            Einfach erklärt – ohne Fachchinesisch.
          </p>
        </motion.div>

        {/* Presenter 1: Was ist KI? */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <LaraVideoPresenter
            audioSrc="/audio/ch01_lara.mp3"
            label="Lara erklärt: Was ist KI?"
            slides={kiTypesSlides}
            cues={kiTypesCues}
            accent="#4f46e5"
            defaultVideoSrc="/lara/videos/lara_anf_ch1.webm"
          />
        </motion.div>

        {/* 4 Types grid */}
        <h2 className="text-2xl font-black text-slate-800 mb-5">
          Die 4 Arten von KI im Überblick
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {types.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="card p-5"
            >
              <div className="text-3xl mb-3">{t.icon}</div>
              <h3 className="font-bold text-sm mb-2" style={{ color: t.color }}>
                {t.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-3">
                {t.desc}
              </p>
              <div
                className="text-xs px-2 py-1 rounded-lg font-medium inline-block"
                style={{ background: `${t.color}12`, color: t.color }}
              >
                Beispiel: {t.example}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Evolution arrow */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden md:flex items-center justify-between px-8 py-4 rounded-2xl mb-14 origin-left"
          style={{
            background: "linear-gradient(135deg, #eef2ff, #faf5ff)",
            border: "1px solid #e0e7ff",
          }}
        >
          {["Regeln", "Muster", "Kreativität", "Sprache"].map((lbl, i) => (
            <div key={lbl} className="flex items-center gap-3">
              <div className="text-xs font-bold text-slate-500">{lbl}</div>
              {i < 3 && (
                <div className="text-indigo-300 font-bold text-lg">→</div>
              )}
            </div>
          ))}
          <div
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: "#4f46e5", color: "white" }}
          >
            Heute
          </div>
        </motion.div>

        {/* Divider */}
        <div
          className="h-px mb-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, #c7d2fe, transparent)",
          }}
        />

        {/* Presenter 2: Alltags-Beispiele */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-black text-slate-800 mb-5">
            KI in deinem Alltag
          </h2>
          <LaraVideoPresenter
            audioSrc="/audio/ch01_example.mp3"
            label="Lara erklärt: Alltags-Beispiele"
            slides={alltagsSlides}
            cues={alltagsCues}
            accent="#9333ea"
            defaultVideoSrc="/lara/videos/lara_anf_ch1.webm"
          />
        </motion.div>

        {/* Use-case grid */}
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Was KI heute kann:
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
          {examples.map((ex, i) => (
            <motion.div
              key={ex.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, type: "spring", stiffness: 200 }}
              className="card p-4 text-center card-primary"
            >
              <div className="text-2xl mb-1.5">{ex.icon}</div>
              <div className="text-xs font-semibold text-slate-600">
                {ex.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ChapterNav chapter={1} />
    </main>
  );
}
