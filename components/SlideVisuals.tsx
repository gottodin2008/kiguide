"use client";
import { motion } from "framer-motion";

export type VisualType =
  | "ki-intro" | "classic" | "ml" | "genai" | "llm"
  | "alltag" | "text" | "image" | "music" | "code" | "automate"
  // Ch02
  | "vielseitig" | "data-chart"
  // Ch03
  | "globe-sectors" | "chatbot-cs" | "medical" | "map-route" | "bank-shield" | "factory"
  // Ch04
  | "platform-grid" | "chatgpt-card" | "claude-card" | "gemini-card" | "perplexity-card" | "recommend"
  // Ch05
  | "llm-brain" | "gpt-card" | "claude-tiers" | "llama-card"
  // Ch06
  | "pricing-3tiers" | "pricing-free" | "pricing-pro" | "pricing-api"
  // Ch07
  | "exercises-grid" | "email-social" | "todo-explain" | "events-plan";

interface FrameProps {
  children: React.ReactNode;
  accent?: string;
  bg?: string;
}

function Frame({ children, accent = "#9333ea", bg = "#fafbff" }: FrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full rounded-2xl overflow-hidden mb-5"
      style={{
        background: bg,
        border: `1.5px solid ${accent}25`,
        boxShadow: `0 4px 24px ${accent}10`,
        height: 170,
      }}
    >
      {/* Title bar */}
      <div
        className="absolute top-0 left-0 right-0 px-3 py-1.5 flex items-center gap-1.5"
        style={{ background: `${accent}10`, borderBottom: `1px solid ${accent}15` }}
      >
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full" style={{ background: "#fca5a5" }} />
          <span className="w-2 h-2 rounded-full" style={{ background: "#fcd34d" }} />
          <span className="w-2 h-2 rounded-full" style={{ background: "#86efac" }} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent, opacity: 0.7 }}>
          Beispiel
        </span>
      </div>
      <div className="absolute inset-0 pt-7 px-4 pb-3">{children}</div>
    </motion.div>
  );
}

// 1. Was ist KI? — Hub mit 4 verbundenen Knoten
function KiIntroVisual() {
  const nodes = [
    { x: 20, y: 25, label: "Regeln", color: "#64748b" },
    { x: 80, y: 25, label: "Daten", color: "#0891b2" },
    { x: 20, y: 75, label: "Kreativ", color: "#9333ea" },
    { x: 80, y: 75, label: "Sprache", color: "#4f46e5" },
  ];
  return (
    <Frame accent="#4f46e5">
      <div className="relative w-full h-full">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {nodes.map((n, i) => (
            <motion.line key={i}
              x1={50} y1={50} x2={n.x} y2={n.y}
              stroke={n.color} strokeWidth="0.4" strokeDasharray="2 2"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            />
          ))}
        </svg>
        {nodes.map((n, i) => (
          <motion.div key={n.label}
            className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{
              left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)",
              background: `${n.color}15`, color: n.color, border: `1px solid ${n.color}30`,
            }}
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            {n.label}
          </motion.div>
        ))}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
          style={{ background: "linear-gradient(135deg, #4f46e5, #9333ea)", boxShadow: "0 4px 14px rgba(79,70,229,0.4)" }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          🧠
        </motion.div>
      </div>
    </Frame>
  );
}

// 2. Klassische Software — Terminal mit Regel-Code
function ClassicVisual() {
  return (
    <Frame accent="#64748b" bg="#1e1e2e">
      <div className="font-mono text-[11px] leading-relaxed" style={{ color: "#cbd5e1" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <span style={{ color: "#c084fc" }}>WENN</span> <span style={{ color: "#fbbf24" }}>regen</span> <span style={{ color: "#94a3b8" }}>=</span> <span style={{ color: "#86efac" }}>true</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          {"  "}<span style={{ color: "#c084fc" }}>DANN</span> nimm <span style={{ color: "#fde68a" }}>"Schirm"</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <span style={{ color: "#c084fc" }}>SONST</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
          {"  "}nimm <span style={{ color: "#fde68a" }}>"Sonnenbrille"</span>
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}> ▋</motion.span>
        </motion.div>
        <div className="mt-2 text-[10px]" style={{ color: "#64748b" }}>
          → folgt nur festen Regeln
        </div>
      </div>
    </Frame>
  );
}

// 3. Machine Learning — Scatter Plot mit Trendlinie
function MLVisual() {
  const dots = [
    [15, 80], [22, 70], [30, 75], [38, 60], [45, 55],
    [52, 50], [60, 45], [68, 35], [75, 30], [85, 22],
  ];
  return (
    <Frame accent="#0891b2">
      <div className="relative w-full h-full">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="5" y1="95" x2="95" y2="95" stroke="#cbd5e1" strokeWidth="0.4" />
          <line x1="5" y1="5" x2="5" y2="95" stroke="#cbd5e1" strokeWidth="0.4" />
          <motion.line
            x1="10" y1="85" x2="90" y2="20"
            stroke="#0891b2" strokeWidth="0.8"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          />
          {dots.map(([x, y], i) => (
            <motion.circle key={i}
              cx={x} cy={y} r="1.6" fill="#0891b2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.06 }}
            />
          ))}
        </svg>
        <div className="absolute bottom-1 right-2 text-[10px] font-bold flex items-center gap-1" style={{ color: "#0891b2" }}>
          📈 erkennt Muster
        </div>
      </div>
    </Frame>
  );
}

// 4. Generative KI — Prompt → 4 Bilder
function GenAIVisual() {
  const grads = [
    "linear-gradient(135deg,#fbbf24,#ec4899)",
    "linear-gradient(135deg,#06b6d4,#9333ea)",
    "linear-gradient(135deg,#10b981,#0891b2)",
    "linear-gradient(135deg,#f97316,#dc2626)",
  ];
  return (
    <Frame accent="#9333ea">
      <div className="flex gap-3 items-center h-full">
        <div className="flex-1">
          <div className="text-[10px] font-mono px-2 py-1 rounded mb-1" style={{ background: "#f1f5f9", color: "#475569" }}>
            <span style={{ color: "#9333ea" }}>prompt:</span> &quot;Sonnenuntergang...&quot;
          </div>
          <motion.div
            className="text-[10px] font-bold px-2 py-1 rounded inline-block"
            style={{ background: "#9333ea15", color: "#9333ea" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ✨ generiert...
          </motion.div>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {grads.map((g, i) => (
            <motion.div key={i}
              className="w-10 h-10 rounded-lg"
              style={{ background: g }}
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5 + i * 0.15, type: "spring" }}
            />
          ))}
        </div>
      </div>
    </Frame>
  );
}

// 5. Sprachmodelle — Chat
function LLMVisual() {
  return (
    <Frame accent="#4f46e5">
      <div className="space-y-1.5 text-[11px]">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="px-2.5 py-1.5 rounded-lg max-w-[80%]"
          style={{ background: "#e0e7ff", color: "#3730a3" }}>
          Was ist die Hauptstadt von Frankreich?
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
          className="px-2.5 py-1.5 rounded-lg max-w-[80%] ml-auto"
          style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "white" }}>
          Paris! 🇫🇷 Möchtest du mehr wissen?
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="px-2.5 py-1.5 rounded-lg max-w-[60%] flex gap-1"
          style={{ background: "#e0e7ff" }}>
          {[0,1,2].map(i => (
            <motion.span key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#6366f1" }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </Frame>
  );
}

// 6. Alltag — Devices
function AlltagVisual() {
  const devices = [
    { i: "📱", l: "Smartphone" }, { i: "💻", l: "Laptop" },
    { i: "🚗", l: "Auto" }, { i: "🏠", l: "Smart Home" },
    { i: "⌚", l: "Watch" }, { i: "🔊", l: "Speaker" },
  ];
  return (
    <Frame accent="#059669">
      <div className="grid grid-cols-3 gap-1.5 h-full content-center">
        {devices.map((d, i) => (
          <motion.div key={d.l}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, type: "spring" }}
            className="flex flex-col items-center gap-0.5 p-1 rounded-lg"
            style={{ background: "white", border: "1px solid #d1fae5" }}
          >
            <div className="text-xl">{d.i}</div>
            <div className="text-[9px] font-semibold" style={{ color: "#059669" }}>{d.l}</div>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

// 7. Texte schreiben — E-Mail Mockup mit Typewriter
function TextVisual() {
  const text = "Sehr geehrte Frau Müller, gerne verschieben wir den Termin auf...";
  return (
    <Frame accent="#4f46e5">
      <div className="text-[10px]">
        <div className="flex items-center gap-1 mb-1.5 font-semibold" style={{ color: "#4f46e5" }}>
          ✉️ <span>Neue E-Mail</span>
        </div>
        <div className="px-2 py-1 rounded mb-1" style={{ background: "#f1f5f9" }}>
          <span style={{ color: "#64748b" }}>Betreff:</span> <span style={{ color: "#0f172a" }} className="font-semibold">Termin verschieben</span>
        </div>
        <div className="px-2 py-1.5 rounded leading-relaxed" style={{ background: "white", border: "1px solid #e2e8f0", color: "#334155", minHeight: 50 }}>
          <motion.span
            initial={{ width: 0 }} animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
            style={{ display: "inline-block", overflow: "hidden", whiteSpace: "nowrap", verticalAlign: "top" }}
          >
            {text}
          </motion.span>
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} style={{ color: "#4f46e5" }}>▋</motion.span>
        </div>
      </div>
    </Frame>
  );
}

// 8. Bilder erstellen — 2x2 Grid mit gradientartigen "generierten" Bildern
function ImageVisual() {
  const grads = [
    { g: "linear-gradient(135deg,#fbbf24,#f97316,#ec4899)", emoji: "🌅" },
    { g: "linear-gradient(135deg,#3b82f6,#8b5cf6)", emoji: "🌌" },
    { g: "linear-gradient(135deg,#10b981,#06b6d4)", emoji: "🏞️" },
    { g: "linear-gradient(135deg,#ec4899,#9333ea)", emoji: "🎨" },
  ];
  return (
    <Frame accent="#9333ea">
      <div className="flex gap-2 items-center h-full">
        <div className="text-[10px] flex-1">
          <div className="font-mono mb-1 px-1.5 py-0.5 rounded" style={{ background: "#faf5ff", color: "#9333ea" }}>
            🖼️ DALL-E
          </div>
          <div style={{ color: "#64748b" }}>4 Varianten<br/>aus deinem<br/>Prompt</div>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {grads.map((g, i) => (
            <motion.div key={i}
              className="w-12 h-12 rounded-lg flex items-center justify-center text-lg"
              style={{ background: g.g, boxShadow: "0 2px 8px rgba(147,51,234,0.2)" }}
              initial={{ opacity: 0, y: 20, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.3 + i * 0.18, type: "spring" }}
            >
              {g.emoji}
            </motion.div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// 9. Musik — Equalizer-Bars + Note
function MusicVisual() {
  const heights = [40, 70, 30, 90, 50, 80, 35, 65, 45, 75, 55, 60];
  return (
    <Frame accent="#f59e0b">
      <div className="flex gap-3 items-center h-full">
        <motion.div
          className="text-4xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎵
        </motion.div>
        <div className="flex gap-0.5 items-end h-20 flex-1">
          {heights.map((h, i) => (
            <motion.div key={i}
              className="flex-1 rounded-sm"
              style={{ background: "linear-gradient(180deg,#f59e0b,#ec4899)" }}
              animate={{ height: [`${h}%`, `${100 - h}%`, `${h}%`] }}
              transition={{ duration: 0.8 + (i % 3) * 0.2, repeat: Infinity, delay: i * 0.05 }}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-2 right-3 text-[10px] font-bold flex items-center gap-1" style={{ color: "#f59e0b" }}>
        🎤 Suno.ai
      </div>
    </Frame>
  );
}

// 10. Code — VS Code-Style Editor
function CodeVisual() {
  return (
    <Frame accent="#059669" bg="#0f172a">
      <div className="font-mono text-[10px] leading-relaxed">
        <div className="flex items-center gap-1 mb-1 text-[9px]" style={{ color: "#94a3b8" }}>
          📄 app.tsx
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <span style={{ color: "#c084fc" }}>const</span> <span style={{ color: "#86efac" }}>begruessung</span> <span style={{ color: "#cbd5e1" }}>=</span> <span style={{ color: "#fbbf24" }}>(name)</span> <span style={{ color: "#cbd5e1" }}>=&gt;</span> {"{"}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ color: "#cbd5e1" }}>
          {"  "}<span style={{ color: "#fb7185" }}>return</span> <span style={{ color: "#fde68a" }}>{"`Hallo ${name}!`"}</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} style={{ color: "#cbd5e1" }}>
          {"}"}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
          className="mt-1 px-1.5 py-0.5 rounded inline-block text-[9px] font-bold"
          style={{ background: "rgba(16,185,129,0.2)", color: "#86efac" }}>
          ✓ ohne Programmiererfahrung
        </motion.div>
      </div>
    </Frame>
  );
}

// 11. Automatisieren — Workflow Pipeline
function AutomateVisual() {
  const steps = [
    { i: "📧", l: "E-Mail", c: "#0891b2" },
    { i: "🤖", l: "KI prüft", c: "#9333ea" },
    { i: "✅", l: "sortiert", c: "#059669" },
  ];
  return (
    <Frame accent="#0891b2">
      <div className="flex items-center justify-between h-full">
        {steps.map((s, i) => (
          <div key={s.l} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.4, type: "spring" }}
              className="flex flex-col items-center gap-1 p-2 rounded-xl"
              style={{ background: `${s.c}10`, border: `1.5px solid ${s.c}30`, minWidth: 60 }}
            >
              <div className="text-2xl">{s.i}</div>
              <div className="text-[9px] font-bold" style={{ color: s.c }}>{s.l}</div>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                className="mx-1"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4 + 0.5 }}
                style={{ color: "#94a3b8", fontSize: 18, fontWeight: 900 }}
              >
                →
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 right-3 text-[10px] font-bold" style={{ color: "#0891b2" }}>
        ⏱️ spart Stunden
      </div>
    </Frame>
  );
}

// ============ Ch02 ============
function VielseitigVisual() {
  const tiles = [
    { i: "✍️", l: "Texte", c: "#4f46e5" },
    { i: "🖼️", l: "Bilder", c: "#9333ea" },
    { i: "💻", l: "Code", c: "#059669" },
    { i: "📊", l: "Daten", c: "#0891b2" },
  ];
  return (
    <Frame accent="#9333ea">
      <div className="grid grid-cols-2 gap-2 h-full content-center">
        {tiles.map((t, i) => (
          <motion.div key={t.l}
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.12, type: "spring" }}
            className="rounded-lg p-2 flex items-center gap-2"
            style={{ background: `${t.c}10`, border: `1.5px solid ${t.c}30` }}>
            <div className="text-2xl">{t.i}</div>
            <div className="text-xs font-bold" style={{ color: t.c }}>{t.l}</div>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

function DataChartVisual() {
  const bars = [40, 70, 55, 90, 35, 65];
  return (
    <Frame accent="#0891b2">
      <div className="flex flex-col h-full">
        <div className="text-[10px] font-mono mb-1 px-1.5 py-0.5 rounded inline-block self-start" style={{ background: "#f0f9ff", color: "#0891b2" }}>
          📊 Tabelle.xlsx
        </div>
        <div className="flex gap-1.5 items-end flex-1 mt-1">
          {bars.map((h, i) => (
            <motion.div key={i}
              className="flex-1 rounded-t"
              style={{ background: `linear-gradient(180deg,#06b6d4,#0891b2)`, transformOrigin: "bottom" }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1, height: `${h}%` }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
            />
          ))}
        </div>
        <div className="text-[10px] font-bold mt-1" style={{ color: "#0891b2" }}>
          📈 Top-Produkt: Mai +47 %
        </div>
      </div>
    </Frame>
  );
}

// ============ Ch03 ============
function GlobeSectorsVisual() {
  const sectors = [
    { i: "💬", x: 15, y: 20 }, { i: "🏥", x: 80, y: 15 },
    { i: "🚗", x: 10, y: 65 }, { i: "🏭", x: 85, y: 70 },
    { i: "🔒", x: 50, y: 10 }, { i: "📱", x: 50, y: 80 },
  ];
  return (
    <Frame accent="#059669">
      <div className="relative w-full h-full">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
          🌍
        </motion.div>
        {sectors.map((s, i) => (
          <motion.div key={i}
            className="absolute text-xl"
            style={{ left: `${s.x}%`, top: `${s.y}%`, transform: "translate(-50%,-50%)" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring" }}>
            {s.i}
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

function ChatbotCSVisual() {
  return (
    <Frame accent="#4f46e5">
      <div className="space-y-1.5 text-[11px]">
        <div className="flex items-center gap-1 mb-1 font-semibold" style={{ color: "#4f46e5" }}>
          <span>💬</span><span>Live-Chat</span>
          <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "#dcfce7", color: "#059669" }}>● 24/7</span>
        </div>
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="px-2 py-1 rounded-lg max-w-[80%]" style={{ background: "#f1f5f9", color: "#334155" }}>
          Wo ist meine Bestellung?
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
          className="px-2 py-1 rounded-lg max-w-[85%] ml-auto" style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "white" }}>
          🤖 Versand am 12.05., voraussichtlich morgen bei dir!
        </motion.div>
      </div>
    </Frame>
  );
}

function MedicalVisual() {
  return (
    <Frame accent="#dc2626" bg="#fef2f2">
      <div className="flex items-center gap-3 h-full">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-4xl">
          🩻
        </motion.div>
        <div className="flex-1">
          <div className="text-[10px] font-mono mb-1 px-1.5 py-0.5 rounded inline-block" style={{ background: "#fee2e2", color: "#dc2626" }}>
            KI-Analyse
          </div>
          <motion.div className="space-y-0.5 text-[10px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div style={{ color: "#475569" }}>✓ Lunge: unauffällig</div>
            <div style={{ color: "#dc2626", fontWeight: 700 }}>⚠ Auffälligkeit links</div>
            <div style={{ color: "#475569" }}>→ Empfehlung: CT</div>
          </motion.div>
        </div>
      </div>
    </Frame>
  );
}

function MapRouteVisual() {
  return (
    <Frame accent="#059669">
      <div className="relative w-full h-full" style={{ background: "linear-gradient(135deg,#ecfdf5,#dbeafe)", borderRadius: 8 }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M 10 80 Q 30 60 50 70 T 90 20"
            stroke="#059669" strokeWidth="2" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.5 }} />
        </svg>
        <div className="absolute" style={{ left: "8%", top: "75%" }}>📍</div>
        <motion.div className="absolute text-xl"
          initial={{ left: "8%", top: "75%" }}
          animate={{ left: "85%", top: "15%" }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}>
          🚗
        </motion.div>
        <div className="absolute right-2 top-2 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: "white", color: "#059669" }}>
          schnellste Route
        </div>
      </div>
    </Frame>
  );
}

function BankShieldVisual() {
  return (
    <Frame accent="#7c3aed">
      <div className="flex items-center gap-3 h-full">
        <motion.div className="text-5xl" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          🛡️
        </motion.div>
        <div className="flex-1 space-y-1 text-[10px]">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="px-2 py-1 rounded-lg" style={{ background: "#fef2f2", color: "#dc2626", fontWeight: 700 }}>
            ⚠ Verdächtige Buchung 8.500 €
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="px-2 py-1 rounded-lg" style={{ background: "#dcfce7", color: "#059669", fontWeight: 700 }}>
            ✓ Blockiert · Kunde benachrichtigt
          </motion.div>
        </div>
      </div>
    </Frame>
  );
}

function FactoryVisual() {
  return (
    <Frame accent="#f97316">
      <div className="flex items-center gap-2 h-full">
        <motion.div className="text-4xl" animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>⚙️</motion.div>
        <div className="text-3xl">🤖</div>
        <div className="flex-1 space-y-0.5 text-[10px]">
          <div style={{ color: "#475569" }}>Stk. heute:</div>
          <motion.div className="text-lg font-black" style={{ color: "#f97316" }}
            animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>
            12.847
          </motion.div>
          <div className="text-[9px] font-bold" style={{ color: "#059669" }}>+18 % vs. gestern</div>
        </div>
      </div>
    </Frame>
  );
}

// ============ Ch04 ============
function PlatformGridVisual() {
  const p = [
    { e: "🟢", n: "ChatGPT", c: "#059669" }, { e: "🟣", n: "Claude", c: "#7c3aed" },
    { e: "🔵", n: "Gemini", c: "#2563eb" }, { e: "🔮", n: "Perplexity", c: "#9333ea" },
  ];
  return (
    <Frame accent="#2563eb">
      <div className="grid grid-cols-2 gap-2 h-full content-center">
        {p.map((x, i) => (
          <motion.div key={x.n}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg"
            style={{ background: "white", border: `1.5px solid ${x.c}40` }}>
            <span className="text-xl">{x.e}</span>
            <span className="text-xs font-bold" style={{ color: x.c }}>{x.n}</span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

function PlatformCard({ emoji, name, company, tagline, accent, bg }: { emoji: string; name: string; company: string; tagline: string; accent: string; bg?: string }) {
  return (
    <Frame accent={accent} bg={bg ?? `${accent}05`}>
      <div className="flex items-center gap-3 h-full">
        <motion.div className="text-5xl"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity }}>
          {emoji}
        </motion.div>
        <div>
          <div className="text-xl font-black" style={{ color: accent }}>{name}</div>
          <div className="text-[10px] uppercase font-bold tracking-wider mb-1" style={{ color: accent, opacity: 0.6 }}>{company}</div>
          <div className="text-xs" style={{ color: "#475569" }}>{tagline}</div>
        </div>
      </div>
    </Frame>
  );
}

function RecommendVisual() {
  return (
    <Frame accent="#059669">
      <div className="flex items-center gap-2 h-full">
        <motion.div className="text-4xl"
          animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          👍
        </motion.div>
        <div className="flex-1 space-y-1">
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="px-2 py-1 rounded-lg flex items-center gap-1.5"
            style={{ background: "#dcfce7" }}>
            <span>🟢</span>
            <span className="text-xs font-bold" style={{ color: "#059669" }}>ChatGPT</span>
            <span className="ml-auto text-[10px]" style={{ color: "#059669" }}>kostenlos</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
            className="px-2 py-1 rounded-lg flex items-center gap-1.5"
            style={{ background: "#f3e8ff" }}>
            <span>🟣</span>
            <span className="text-xs font-bold" style={{ color: "#7c3aed" }}>Claude</span>
            <span className="ml-auto text-[10px]" style={{ color: "#7c3aed" }}>kostenlos</span>
          </motion.div>
        </div>
      </div>
    </Frame>
  );
}

// ============ Ch05 ============
function LLMBrainVisual() {
  return (
    <Frame accent="#7c3aed">
      <div className="flex items-center gap-3 h-full">
        <motion.div className="text-5xl relative"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}>
          🧠
          <motion.span className="absolute -top-1 -right-2 text-xs"
            animate={{ opacity: [0, 1, 0], y: [-5, -15, -25] }}
            transition={{ duration: 2, repeat: Infinity }}>✨</motion.span>
        </motion.div>
        <div className="flex-1 space-y-0.5 text-[10px] font-mono">
          <div style={{ color: "#7c3aed" }}>&quot;Hallo&quot; → 0.42</div>
          <div style={{ color: "#7c3aed" }}>&quot;Welt&quot; → 0.89</div>
          <div style={{ color: "#94a3b8" }}>... 175 Mrd. Parameter</div>
          <div className="mt-1 px-1.5 py-0.5 rounded inline-block font-bold" style={{ background: "#f3e8ff", color: "#7c3aed" }}>
            LLM
          </div>
        </div>
      </div>
    </Frame>
  );
}

function ClaudeTiersVisual() {
  const tiers = [
    { name: "Haiku", desc: "schnell", c: "#06b6d4", w: "60%" },
    { name: "Sonnet", desc: "ausgewogen", c: "#7c3aed", w: "80%" },
    { name: "Opus", desc: "stärkstes Modell", c: "#9333ea", w: "100%" },
  ];
  return (
    <Frame accent="#7c3aed">
      <div className="space-y-1.5">
        {tiers.map((t, i) => (
          <motion.div key={t.name}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="flex items-center gap-2">
            <div className="text-xs font-bold w-14" style={{ color: t.c }}>🟣 {t.name}</div>
            <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "#f1f5f9" }}>
              <motion.div className="h-full rounded-full"
                initial={{ width: 0 }} animate={{ width: t.w }}
                transition={{ delay: i * 0.15 + 0.2, duration: 0.6 }}
                style={{ background: `linear-gradient(90deg,${t.c},#ec4899)` }}
              />
            </div>
            <div className="text-[10px]" style={{ color: "#64748b", minWidth: 80 }}>{t.desc}</div>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

function LlamaCardVisual() {
  return (
    <Frame accent="#f97316">
      <div className="flex items-center gap-3 h-full">
        <motion.div className="text-5xl"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}>
          🦙
        </motion.div>
        <div className="flex-1">
          <div className="text-lg font-black" style={{ color: "#f97316" }}>Llama</div>
          <div className="text-[10px] font-bold uppercase mb-1" style={{ color: "#f97316", opacity: 0.7 }}>Meta · Open Source</div>
          <div className="space-y-0.5 text-[10px]" style={{ color: "#475569" }}>
            <div>✓ kostenlos</div>
            <div>✓ läuft lokal auf deinem PC</div>
            <div>✓ keine Cloud nötig</div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ============ Ch06 ============
function PriceTierCard({ tier, price, color, items, highlight }: { tier: string; price: string; color: string; items: string[]; highlight?: boolean }) {
  return (
    <Frame accent={color}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-base font-black" style={{ color }}>{tier}</div>
          {highlight && <div className="text-[9px] font-black px-1.5 py-0.5 rounded" style={{ background: color, color: "white" }}>EMPFOHLEN</div>}
        </div>
        <div className="text-xl font-black mb-1" style={{ color }}>{price}</div>
        <div className="space-y-0.5">
          {items.map((it, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
              className="text-[10px] flex items-center gap-1" style={{ color: "#475569" }}>
              <span style={{ color }}>✓</span> {it}
            </motion.div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function Pricing3TiersVisual() {
  const tiers = [
    { e: "🆓", n: "Free", c: "#059669" },
    { e: "⭐", n: "Pro", c: "#4f46e5" },
    { e: "🔌", n: "API", c: "#0891b2" },
  ];
  return (
    <Frame accent="#d97706">
      <div className="grid grid-cols-3 gap-2 h-full content-center">
        {tiers.map((t, i) => (
          <motion.div key={t.n}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
            className="flex flex-col items-center gap-1 p-2 rounded-lg"
            style={{ background: `${t.c}10`, border: `1.5px solid ${t.c}30` }}>
            <div className="text-2xl">{t.e}</div>
            <div className="text-xs font-black" style={{ color: t.c }}>{t.n}</div>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

// ============ Ch07 ============
function ExercisesGridVisual() {
  const ex = ["📧", "📱", "🖼️", "📋", "🎓", "🎤", "🌐", "🎉"];
  return (
    <Frame accent="#059669">
      <div className="grid grid-cols-4 gap-1.5 h-full content-center">
        {ex.map((e, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, type: "spring" }}
            className="aspect-square rounded-lg flex items-center justify-center text-xl"
            style={{ background: "white", border: "1.5px solid #d1fae5" }}>
            {e}
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-2 right-3 text-[10px] font-bold" style={{ color: "#059669" }}>
        8 Übungen
      </div>
    </Frame>
  );
}

function EmailSocialVisual() {
  return (
    <Frame accent="#ec4899">
      <div className="flex items-center gap-3 h-full">
        <div className="flex-1 space-y-1.5">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="px-2 py-1 rounded-lg text-[10px]" style={{ background: "#eef2ff", color: "#4f46e5" }}>
            ✉️ <span className="font-bold">An: Kunde</span><br/>Termin verschieben...
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="px-2 py-1 rounded-lg text-[10px]" style={{ background: "#fdf2f8", color: "#ec4899" }}>
            📱 <span className="font-bold">5 Insta-Posts</span><br/>#dj #house...
          </motion.div>
        </div>
      </div>
    </Frame>
  );
}

function TodoExplainVisual() {
  return (
    <Frame accent="#0891b2">
      <div className="flex gap-3 h-full items-center">
        <div className="flex-1 space-y-0.5 text-[10px]">
          <div className="font-bold mb-1" style={{ color: "#0891b2" }}>📋 Wochenplan</div>
          {["Location buchen", "Catering anfragen", "Deko bestellen"].map((it, i) => (
            <motion.div key={it}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-1" style={{ color: "#475569" }}>
              <span style={{ color: "#0891b2" }}>☐</span> {it}
            </motion.div>
          ))}
        </div>
        <motion.div className="text-4xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}>
          🎓
        </motion.div>
      </div>
    </Frame>
  );
}

function EventsPlanVisual() {
  return (
    <Frame accent="#f97316">
      <div className="flex items-center gap-3 h-full">
        <motion.div className="text-5xl"
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}>
          🎉
        </motion.div>
        <div className="flex-1 space-y-0.5 text-[10px]">
          <div className="font-bold" style={{ color: "#f97316" }}>30-Tage-Eventplan</div>
          <div style={{ color: "#475569" }}>📍 Location · 🍽️ Catering</div>
          <div style={{ color: "#475569" }}>🎵 Playlist · 🎨 Deko</div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-[9px] font-bold px-1.5 py-0.5 rounded inline-block mt-1" style={{ background: "#fff7ed", color: "#f97316" }}>
            Budget: 800 €
          </motion.div>
        </div>
      </div>
    </Frame>
  );
}

export function SlideVisual({ type }: { type: VisualType }) {
  switch (type) {
    case "ki-intro": return <KiIntroVisual />;
    case "classic": return <ClassicVisual />;
    case "ml": return <MLVisual />;
    case "genai": return <GenAIVisual />;
    case "llm": return <LLMVisual />;
    case "alltag": return <AlltagVisual />;
    case "text": return <TextVisual />;
    case "image": return <ImageVisual />;
    case "music": return <MusicVisual />;
    case "code": return <CodeVisual />;
    case "automate": return <AutomateVisual />;
    // Ch02
    case "vielseitig": return <VielseitigVisual />;
    case "data-chart": return <DataChartVisual />;
    // Ch03
    case "globe-sectors": return <GlobeSectorsVisual />;
    case "chatbot-cs": return <ChatbotCSVisual />;
    case "medical": return <MedicalVisual />;
    case "map-route": return <MapRouteVisual />;
    case "bank-shield": return <BankShieldVisual />;
    case "factory": return <FactoryVisual />;
    // Ch04
    case "platform-grid": return <PlatformGridVisual />;
    case "chatgpt-card": return <PlatformCard emoji="🟢" name="ChatGPT" company="OpenAI" tagline="Allrounder · Text, Bilder, Code" accent="#059669" />;
    case "claude-card": return <PlatformCard emoji="🟣" name="Claude" company="Anthropic" tagline="Lange Texte · Coding · Agenten" accent="#7c3aed" />;
    case "gemini-card": return <PlatformCard emoji="🔵" name="Gemini" company="Google" tagline="Gmail · Docs · Suche" accent="#2563eb" />;
    case "perplexity-card": return <PlatformCard emoji="🔮" name="Perplexity" company="Perplexity AI" tagline="Suchmaschine mit Quellen" accent="#9333ea" />;
    case "recommend": return <RecommendVisual />;
    // Ch05
    case "llm-brain": return <LLMBrainVisual />;
    case "gpt-card": return <PlatformCard emoji="🟢" name="GPT" company="OpenAI" tagline="Allgemeine Aufgaben" accent="#059669" />;
    case "claude-tiers": return <ClaudeTiersVisual />;
    case "llama-card": return <LlamaCardVisual />;
    // Ch06
    case "pricing-3tiers": return <Pricing3TiersVisual />;
    case "pricing-free": return <PriceTierCard tier="🆓 Kostenlos" price="0 € / Monat" color="#059669" items={["ChatGPT, Claude, Gemini","Tägliches Limit","Perfekt zum Testen"]} />;
    case "pricing-pro": return <PriceTierCard tier="⭐ Pro" price="~ 20 € / Monat" color="#4f46e5" highlight items={["Neueste Modelle","Keine Limits","Schnellere Antworten"]} />;
    case "pricing-api": return <PriceTierCard tier="🔌 API" price="Pay-per-Use" color="#0891b2" items={["Zahle nur was du nutzt","Eigene Apps bauen","Alle Modelle"]} />;
    // Ch07
    case "exercises-grid": return <ExercisesGridVisual />;
    case "email-social": return <EmailSocialVisual />;
    case "todo-explain": return <TodoExplainVisual />;
    case "events-plan": return <EventsPlanVisual />;
  }
}
