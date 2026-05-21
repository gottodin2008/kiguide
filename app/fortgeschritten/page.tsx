"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const chapters = [
  {
    id: 1,
    icon: "🤖",
    title: "Was sind KI-Agenten?",
    subtitle: "Der Unterschied zwischen Antworten und Handeln.",
    duration: "ca. 4 min",
    accent: "#7c3aed",
    accentLight: "#f5f3ff",
  },
  {
    id: 2,
    icon: "⚖️",
    title: "Agenten vs. Chatbots",
    subtitle: "Wann nimmst du welches Tool? Klarer Vergleich.",
    duration: "ca. 4 min",
    accent: "#0891b2",
    accentLight: "#ecfeff",
  },
  {
    id: 3,
    icon: "🛠️",
    title: "Agenten-Systeme",
    subtitle: "Vom No-Code-Tool bis zum Profi-Framework.",
    duration: "ca. 5 min",
    accent: "#f97316",
    accentLight: "#fff7ed",
  },
  {
    id: 4,
    icon: "🦅",
    title: "OpenClaw",
    subtitle: "Installation, Setup und Sicherheitsregeln Schritt für Schritt.",
    duration: "ca. 5 min",
    accent: "#059669",
    accentLight: "#ecfdf5",
  },
  {
    id: 5,
    icon: "⚡",
    title: "Claude Code",
    subtitle: "Das offizielle Coding-Tool von Anthropic.",
    duration: "ca. 5 min",
    accent: "#7c3aed",
    accentLight: "#f5f3ff",
  },
  {
    id: 6,
    icon: "🌐",
    title: "Alternative KI-Modelle",
    subtitle: "Ollama, OpenRouter & Co. – günstiger, lokaler, flexibler.",
    duration: "ca. 4 min",
    accent: "#6366f1",
    accentLight: "#eef2ff",
  },
  {
    id: 7,
    icon: "🎯",
    title: "Modell-Guide",
    subtitle: "Welches Modell für welchen Zweck – der Entscheidungs-Guide.",
    duration: "ca. 4 min",
    accent: "#f59e0b",
    accentLight: "#fffbeb",
  },
  {
    id: 8,
    icon: "🔒",
    title: "Sicherheitsregeln",
    subtitle: "Mit großer Macht kommt große Verantwortung.",
    duration: "ca. 4 min",
    accent: "#dc2626",
    accentLight: "#fef2f2",
  },
];

export default function FortgeschrittenOverview() {
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
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-cyan-600 transition-colors"
        >
          ← Startseite
        </Link>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-black" style={{ color: "#0891b2" }}>
          🚀 KI-Fortgeschritten
        </span>
      </div>

      {/* Hero section */}
      <div
        className="py-14 px-4"
        style={{
          background: "linear-gradient(135deg, #ecfeff 0%, #f5f3ff 60%, #fdf4ff 100%)",
          borderBottom: "1px solid #cffafe",
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
                background: "#ecfeff",
                color: "#0891b2",
                border: "1px solid rgba(8,145,178,0.25)",
              }}
            >
              🚀 KI-Fortgeschritten · 8 Kapitel
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
              Werde zum{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#0891b2,#7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                KI-Profi
              </span>
            </h1>
            <p className="text-slate-500 text-lg mb-6 max-w-xl leading-relaxed">
              Ich bin Lara und begleite dich durch alle 8 Kapitel – von Agenten
              über Claude Code bis zu deinen eigenen sicheren Workflows.
            </p>
            <Link
              href="/fortgeschritten/kapitel-1"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-white text-base transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #0891b2, #7c3aed)",
                boxShadow: "0 8px 28px rgba(8,145,178,0.35)",
              }}
            >
              🤖 Kapitel 1 starten →
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
              <Link href={`/fortgeschritten/kapitel-${ch.id}`} className="block group">
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

        {/* Bridge back to anfaenger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 p-8 rounded-3xl text-center"
          style={{
            background: "linear-gradient(135deg, #eef2ff, #faf5ff)",
            border: "1.5px solid #e0e7ff",
          }}
        >
          <div className="text-5xl mb-4">🌱</div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            Erstmal Grundlagen auffrischen?
          </h2>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">
            Zurück zur Anfänger-Übersicht – KI-Grundlagen, Plattformen, Modelle
            und erste Übungen.
          </p>
          <Link
            href="/anfaenger"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              boxShadow: "0 6px 20px rgba(79,70,229,0.3)",
            }}
          >
            🧠 Zur Anfänger-Übersicht →
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
