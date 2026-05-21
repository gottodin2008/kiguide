"use client";
import { motion } from "framer-motion";

interface TabNavProps {
  active: "beginner" | "advanced";
  onChange: (tab: "beginner" | "advanced") => void;
  hideSwitch?: boolean;
}

const beginnerChapters = [
  { id: "ch1", label: "Was ist KI?", icon: "🧠" },
  { id: "ch2", label: "Möglichkeiten", icon: "✨" },
  { id: "ch3", label: "KI im Alltag", icon: "🌍" },
  { id: "ch4", label: "Plattformen", icon: "💻" },
  { id: "ch5", label: "Modelle", icon: "🔬" },
  { id: "ch6", label: "Preise", icon: "💰" },
  { id: "ch7", label: "Erste Übungen", icon: "🎯" },
];

const advancedChapters = [
  { id: "ch8", label: "KI-Agenten", icon: "🤖" },
  { id: "ch9", label: "Agenten vs. Chat", icon: "⚖️" },
  { id: "ch10", label: "Agenten-Tools", icon: "🛠️" },
  { id: "ch11", label: "OpenClaw", icon: "🦅" },
  { id: "ch12", label: "Claude Code", icon: "⚡" },
  { id: "ch13", label: "Alternativen", icon: "🌐" },
  { id: "ch14", label: "Modell-Guide", icon: "🎯" },
  { id: "ch15", label: "Sicherheit", icon: "🔒" },
];

export default function TabNav({ active, onChange, hideSwitch = false }: TabNavProps) {
  const chapters = active === "beginner" ? beginnerChapters : advancedChapters;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="sticky top-0 z-50"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Tab switcher – hidden on sub-pages */}
      {!hideSwitch && <div className="flex items-center justify-center gap-2 px-4 pt-3 pb-2">
        <button
          onClick={() => onChange("beginner")}
          className="relative px-5 py-2 rounded-xl font-bold text-sm transition-all duration-200"
          style={{
            background: active === "beginner"
              ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
              : "transparent",
            color: active === "beginner" ? "white" : "#64748b",
            boxShadow: active === "beginner" ? "0 4px 14px rgba(79,70,229,0.3)" : "none",
          }}
        >
          🌱 Anfänger
        </button>

        <div className="w-px h-5 bg-slate-200" />

        <button
          onClick={() => onChange("advanced")}
          className="relative px-5 py-2 rounded-xl font-bold text-sm transition-all duration-200"
          style={{
            background: active === "advanced"
              ? "linear-gradient(135deg, #0891b2, #0284c7)"
              : "transparent",
            color: active === "advanced" ? "white" : "#64748b",
            boxShadow: active === "advanced" ? "0 4px 14px rgba(8,145,178,0.3)" : "none",
          }}
        >
          🚀 Fortgeschritten
        </button>
      </div>}

      {/* Chapter pills */}
      <div
        className="flex gap-2 overflow-x-auto pb-2.5 px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {chapters.map((ch, i) => (
          <motion.button
            key={ch.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => scrollTo(ch.id)}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 hover:scale-105 whitespace-nowrap"
            style={{
              background: active === "beginner" ? "rgba(79,70,229,0.08)" : "rgba(8,145,178,0.08)",
              color: active === "beginner" ? "#4f46e5" : "#0891b2",
              border: `1px solid ${active === "beginner" ? "rgba(79,70,229,0.15)" : "rgba(8,145,178,0.15)"}`,
            }}
          >
            <span>{ch.icon}</span>
            <span>{ch.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
