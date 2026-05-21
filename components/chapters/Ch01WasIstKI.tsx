"use client";
import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import LaraAvatar from "../LaraAvatar";
import AudioPlayer from "../AudioPlayer";

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

export default function Ch01WasIstKI() {
  return (
    <SectionWrapper
      id="ch1"
      chapter={1}
      title="Was ist Künstliche Intelligenz?"
      subtitle="Einfach erklärt – ohne Fachchinesisch."
      icon="🧠"
      alt={false}
    >
      <LaraAvatar
        message="Stell dir KI wie einen sehr schnellen Assistenten vor, der Muster erkennt, Texte versteht und Aufgaben erledigen kann – rund um die Uhr, ohne Pause."
      />
      <div className="mb-6 space-y-2">
        <AudioPlayer src="/audio/ch01_lara.mp3" label="Lara erklärt: Was ist KI?" />
        <AudioPlayer src="/audio/ch01_example.mp3" label="Lara erklärt: Alltags-Beispiele" />
      </div>

      {/* 4 Types */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
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
            <h3 className="font-bold text-slate-800 text-sm mb-2" style={{ color: t.color }}>{t.title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-3">{t.desc}</p>
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
        transition={{ duration: 0.7, delay: 0.4 }}
        className="hidden md:flex items-center justify-between px-8 py-4 rounded-2xl mb-8 origin-left"
        style={{ background: "linear-gradient(135deg, #eef2ff, #faf5ff)", border: "1px solid #e0e7ff" }}
      >
        {["Regeln", "Muster", "Kreativität", "Sprache"].map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-xs font-bold text-slate-500">{label}</div>
            </div>
            {i < 3 && <div className="text-indigo-300 font-bold text-lg">→</div>}
          </div>
        ))}
        <div
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: "#4f46e5", color: "white" }}
        >
          Heute
        </div>
      </motion.div>

      {/* Use cases grid */}
      <div className="mb-2">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Was KI heute kann:</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
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
              <div className="text-xs font-semibold text-slate-600">{ex.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
