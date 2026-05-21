"use client";
import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import LaraAvatar from "../LaraAvatar";

const providers = [
  {
    provider: "OpenAI",
    emoji: "🟢",
    color: "#059669",
    models: "GPT-5.5, GPT-5.4, GPT-realtime, Codex",
    best: "Allround, Coding, Sprache, Agenten",
    note: "GPT-5.5 ab $5 Input / $30 Output pro 1 Mio. Tokens",
  },
  {
    provider: "Anthropic",
    emoji: "🟣",
    color: "#7c3aed",
    models: "Claude Opus 4.7, Claude Sonnet 4.6, Claude Haiku 4.5",
    best: "Lange Kontexte, Coding, Agenten, Dokumente",
    note: "Haiku 4.5: $1 Input / $5 Output · Sonnet 4.6: $3 / $15 pro 1 Mio. Tokens",
  },
  {
    provider: "Google",
    emoji: "🔵",
    color: "#2563eb",
    models: "Gemini 3.1 Pro, Veo, Vertex AI",
    best: "Google-Integration, Video-KI, Cloud-Workflows",
    note: "Veo für Video-Generierung, Gemini im Google-Ökosystem integriert",
  },
  {
    provider: "Meta / Open Source",
    emoji: "🦙",
    color: "#f97316",
    models: "Llama 3.x (verschiedene Größen)",
    best: "Lokale Nutzung, Open Source, kein API-Key nötig",
    note: "Kostenlos via Ollama oder LM Studio auf dem eigenen PC nutzbar",
  },
  {
    provider: "Mistral",
    emoji: "🐱",
    color: "#0891b2",
    models: "Mistral Large, Medium, Small, Codestral",
    best: "Schnell, EU-nah, Entwickler, Datenschutz",
    note: "Europäischer Anbieter – DSGVO-konformer als US-Alternativen",
  },
  {
    provider: "Qwen (Alibaba)",
    emoji: "🈳",
    color: "#dc2626",
    models: "Qwen 2.5, Qwen Coder, Qwen-VL",
    best: "Coding, mehrsprachig (Chinesisch/Englisch), lokal",
    note: "Qwen Coder besonders stark bei Code-Aufgaben",
  },
  {
    provider: "DeepSeek",
    emoji: "🔍",
    color: "#6366f1",
    models: "DeepSeek-R1, DeepSeek-V3",
    best: "Reasoning, Analyse, Entwickler",
    note: "Open-Source-Modell mit starkem Reasoning – kostenlos lokal nutzbar",
  },
  {
    provider: "xAI (Elon Musk)",
    emoji: "✖️",
    color: "#374151",
    models: "Grok 3, Grok 3 mini",
    best: "Chat, Recherche, große Kontexte, X/Twitter-Integration",
    note: "Verfügbar über X Premium und xAI API",
  },
  {
    provider: "Bildgenerierung",
    emoji: "🎨",
    color: "#ec4899",
    models: "Flux, Stable Diffusion, DALL-E, Ideogram",
    best: "Bilder und Design aus Textbeschreibungen",
    note: "Flux von Black Forest Labs gilt 2026 als qualitativ führend",
  },
];

function Bar({ value, max = 5, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.06, duration: 0.25 }}
          className="h-2 rounded-full flex-1"
          style={{ background: i < value ? color : "#e2e8f0", transformOrigin: "left" }}
        />
      ))}
    </div>
  );
}

export default function Ch05Modelle() {
  return (
    <SectionWrapper
      id="ch5"
      chapter={5}
      title="Welche KI-Modelle gibt es?"
      subtitle={`Stand: 07. Mai 2026 – die wichtigsten Anbieter im Überblick.`}
      icon="🔬"
      accent="#6366f1"
    >
      <LaraAvatar
        message="Die KI-Welt dreht sich rasend schnell! Für die meisten Aufgaben empfehle ich Claude Sonnet 4.6 oder GPT-5.5. Für günstigen Einstieg: Haiku 4.5 oder GPT-4o-mini."
        side="right"
      />

      <div className="card overflow-hidden my-8">
        <div className="overflow-x-auto">
          <table className="ki-table">
            <thead>
              <tr>
                <th>Anbieter</th>
                <th>Modelle / Familie</th>
                <th>Besonders gut für</th>
                <th>Hinweis</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((p, i) => (
                <motion.tr
                  key={p.provider}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{p.emoji}</span>
                      <span className="font-bold" style={{ color: p.color }}>{p.provider}</span>
                    </div>
                  </td>
                  <td>
                    <div className="text-xs text-slate-600 font-mono">{p.models}</div>
                  </td>
                  <td>
                    <div className="text-xs text-slate-700">{p.best}</div>
                  </td>
                  <td>
                    <div className="text-xs text-slate-400 italic max-w-xs">{p.note}</div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="highlight-box"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-bold text-slate-800 mb-1">Welches Modell für wen?</p>
            <div className="grid sm:grid-cols-3 gap-3 mt-2 text-sm">
              {[
                { for: "Einsteiger", rec: "ChatGPT Free oder Claude.ai", icon: "🌱" },
                { for: "Coding & Agenten", rec: "Claude Sonnet 4.6 via Claude Code", icon: "💻" },
                { for: "Lokal & privat", rec: "Llama 3 oder Qwen via Ollama", icon: "🔒" },
              ].map(r => (
                <div key={r.for} className="bg-white rounded-xl p-3 border border-slate-100">
                  <div className="text-lg mb-1">{r.icon}</div>
                  <div className="font-semibold text-slate-700 text-xs mb-0.5">{r.for}</div>
                  <div className="text-indigo-600 text-xs font-medium">{r.rec}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
