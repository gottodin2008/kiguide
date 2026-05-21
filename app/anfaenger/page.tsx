"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const chapters = [
  {
    id: 1,
    icon: "🧠",
    title: "Was ist KI?",
    subtitle: "Grundlagen, Typen und wie KI wirklich funktioniert.",
    duration: "ca. 5 min",
    accent: "#4f46e5",
    accentLight: "#eef2ff",
  },
  {
    id: 2,
    icon: "✨",
    title: "Was kann KI?",
    subtitle: "Texte, Bilder, Code, Musik – klicke auf konkrete Beispiele.",
    duration: "ca. 4 min",
    accent: "#9333ea",
    accentLight: "#faf5ff",
  },
  {
    id: 3,
    icon: "🌍",
    title: "KI im Einsatz",
    subtitle: "Wo KI heute schon eingesetzt wird – du nutzt sie täglich.",
    duration: "ca. 3 min",
    accent: "#059669",
    accentLight: "#ecfdf5",
  },
  {
    id: 4,
    icon: "🖥️",
    title: "Plattformen",
    subtitle: "ChatGPT, Claude, Gemini & Co. – was passt zu dir?",
    duration: "ca. 4 min",
    accent: "#0891b2",
    accentLight: "#ecfeff",
  },
  {
    id: 5,
    icon: "🤖",
    title: "KI-Modelle",
    subtitle: "GPT-5, Claude, Gemini, Llama – die wichtigsten Modelle.",
    duration: "ca. 4 min",
    accent: "#7c3aed",
    accentLight: "#f5f3ff",
  },
  {
    id: 6,
    icon: "💰",
    title: "Preise & Kosten",
    subtitle: "Von kostenlos bis Enterprise – was KI wirklich kostet.",
    duration: "ca. 3 min",
    accent: "#d97706",
    accentLight: "#fffbeb",
  },
  {
    id: 7,
    icon: "🎯",
    title: "Erste Übungen",
    subtitle: "Lerne KI durch Ausprobieren – echte Prompts zum Starten.",
    duration: "ca. 5 min",
    accent: "#059669",
    accentLight: "#ecfdf5",
  },
];

export default function AnfaengerOverview() {
  return (
    <main style={{ background: "#f0f4f8", minHeight: "100vh" }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-40 px-4 py-2 flex items-center gap-3"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          ← Startseite
        </Link>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-black" style={{ color: "#4f46e5" }}>
          🌱 KI-Anfänger
        </span>
      </div>

      {/* Hero section */}
      <div
        className="py-14 px-4"
        style={{
          background: "linear-gradient(135deg, #eef2ff 0%, #faf5ff 60%, #ecfeff 100%)",
          borderBottom: "1px solid #e0e7ff",
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Lara */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex-shrink-0"
            style={{ width: 160, height: 220 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/lara/lara_grey_suit_nobg.png"
                alt="Lara"
                width={160}
                height={220}
                style={{ objectFit: "contain", objectPosition: "bottom" }}
              />
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <div
              className="badge mb-4"
              style={{
                background: "#eef2ff",
                color: "#4f46e5",
                border: "1px solid rgba(79,70,229,0.25)",
              }}
            >
              🌱 KI-Anfänger · 7 Kapitel
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
              Dein Einstieg in{" "}
              <span className="grad-primary">die Welt der KI</span>
            </h1>
            <p className="text-slate-500 text-lg mb-6 max-w-xl leading-relaxed">
              Ich bin Lara und begleite dich durch alle 7 Kapitel – von den
              Grundlagen bis zu deinen ersten praktischen Übungen.
            </p>
            <Link
              href="/anfaenger/kapitel-1"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-white text-base transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                boxShadow: "0 8px 28px rgba(79,70,229,0.35)",
              }}
            >
              🧠 Kapitel 1 starten →
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Chapter cards grid */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
          Alle Kapitel im Überblick
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map((ch, i) => (
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <Link href={`/anfaenger/kapitel-${ch.id}`} className="block group">
                <div
                  className="p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                  style={{
                    background: "white",
                    border: `2px solid ${ch.accentLight}`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.border = `2px solid ${ch.accent}40`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${ch.accent}15`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.border = `2px solid ${ch.accentLight}`;
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{ch.icon}</div>
                    <div
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${ch.accent}12`,
                        color: ch.accent,
                      }}
                    >
                      Kap. {ch.id}
                    </div>
                  </div>
                  <h3 className="font-black text-slate-900 mb-1">{ch.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {ch.subtitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{ch.duration}</span>
                    <span
                      className="text-xs font-bold group-hover:translate-x-1 transition-transform inline-block"
                      style={{ color: ch.accent }}
                    >
                      Starten →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bridge to advanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 p-8 rounded-3xl text-center"
          style={{
            background: "linear-gradient(135deg, #ecfeff, #eef2ff)",
            border: "1.5px solid #e0e7ff",
          }}
        >
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            Schon Erfahrung mit KI?
          </h2>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">
            Steige direkt in die Fortgeschritten-Tracks ein – Agenten, Claude
            Code, OpenClaw und eigene Workflows.
          </p>
          <Link
            href="/fortgeschritten"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #0891b2, #0284c7)",
              boxShadow: "0 6px 20px rgba(8,145,178,0.3)",
            }}
          >
            🤖 Fortgeschritten starten →
          </Link>
        </motion.div>
      </div>

      <footer
        className="py-10 px-4 text-center border-t"
        style={{ background: "white", borderColor: "#e2e8f0" }}
      >
        <div className="text-3xl mb-2">🤖</div>
        <p className="text-slate-400 text-sm">
          Erstellt mit ❤️ & KI · Lara powered by{" "}
          <span className="text-purple-500 font-semibold">Higgsfield.ai</span>
        </p>
        <p className="text-slate-300 text-xs mt-1">Stand: Mai 2026</p>
      </footer>
    </main>
  );
}
