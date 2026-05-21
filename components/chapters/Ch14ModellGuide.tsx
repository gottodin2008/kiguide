"use client";
import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";

const rows = [
  { task: "Einfache Texte", icon: "✍️", rec: "Claude Haiku 4.5, GPT-4o-mini", why: "Günstig, schnell, reicht vollkommen aus", color: "#64748b" },
  { task: "Lange Texte & Dokumente", icon: "📄", rec: "Claude Sonnet 4.6, Gemini 2.5 Pro", why: "Großes Kontextfenster für viele Seiten", color: "#7c3aed" },
  { task: "Programmieren / Code", icon: "💻", rec: "Claude Code (Sonnet), Qwen Coder, DeepSeek", why: "Beste Code-Qualität und Agentenunterstützung", color: "#4f46e5" },
  { task: "Lokale Nutzung / Datenschutz", icon: "🔒", rec: "Ollama + Llama 3.3 / Qwen / Mistral", why: "Läuft offline, keine Datenweitergabe", color: "#059669" },
  { task: "Bildideen & Prompts", icon: "💡", rec: "GPT-5, Claude, Gemini", why: "Gut für kreative Beschreibungen", color: "#9333ea" },
  { task: "Bildgenerierung", icon: "🖼️", rec: "Higgsfield, Flux, Midjourney, DALL-E", why: "Spezialisierte Bildgenerierungs-Modelle", color: "#ec4899" },
  { task: "Video-Erstellung", icon: "🎬", rec: "Higgsfield, Veo (Google), Runway, Kling", why: "Konsistente Charaktere (Higgsfield), Qualität (Veo)", color: "#f97316" },
  { task: "KI-Agenten & Workflows", icon: "🤖", rec: "Claude (Code), OpenAI, OpenRouter", why: "Beste Agenten-Unterstützung und Tool-Calling", color: "#dc2626" },
  { task: "Recherche & Web-Suche", icon: "🔍", rec: "Perplexity, Gemini, ChatGPT Deep Research", why: "Echtzeit-Internetzugang mit Quellenangaben", color: "#0891b2" },
  { task: "Automatisierung", icon: "⚙️", rec: "n8n + KI, Make.com, Zapier, OpenClaw", why: "Verbindet hunderte Apps mit KI-Intelligenz", color: "#6366f1" },
  { task: "Musik", icon: "🎵", rec: "Suno, Udio, ElevenLabs (Stimmen)", why: "Komplette Songs oder professionelle Voiceovers", color: "#10b981" },
  { task: "Sehr komplexe Aufgaben", icon: "🧠", rec: "Claude Opus 4.7, GPT-5.5, o3", why: "Stärkstes Reasoning für mehrstufige Probleme", color: "#7c3aed" },
];

export default function Ch14ModellGuide() {
  return (
    <SectionWrapper
      id="ch7"
      chapter={7}
      title="Welches Modell für welchen Zweck?"
      subtitle="Der schnelle Entscheidungsguide – kein Trial & Error mehr."
      icon="🎯"
      accent="#f59e0b"
    >
      <div className="card overflow-hidden my-8">
        <div className="overflow-x-auto">
          <table className="ki-table">
            <thead>
              <tr>
                <th>Aufgabe</th>
                <th>Empfohlen</th>
                <th>Warum</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.task}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{row.icon}</span>
                      <span className="font-semibold text-slate-700">{row.task}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className="badge text-xs"
                      style={{ background: `${row.color}12`, color: row.color, border: `1px solid ${row.color}25` }}
                    >
                      {row.rec}
                    </span>
                  </td>
                  <td className="text-xs text-slate-500 italic">{row.why}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick decision */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="highlight-box"
      >
        <h3 className="font-bold text-slate-800 mb-4">⚡ Schnell-Entscheidung:</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { q: "Einsteiger?", a: "ChatGPT Free oder Claude.ai", icon: "🌱", c: "#059669" },
            { q: "Ich will Coden?", a: "Claude Code + Sonnet 4.6", icon: "💻", c: "#7c3aed" },
            { q: "Datenschutz?", a: "Ollama + Llama 3.3 lokal", icon: "🔒", c: "#0891b2" },
            { q: "Viele Modelle?", a: "OpenRouter (400+ Modelle)", icon: "🌐", c: "#6366f1" },
          ].map((item) => (
            <div key={item.q} className="bg-white rounded-xl p-3 border border-slate-100">
              <div className="text-xl mb-1">{item.icon}</div>
              <div className="text-xs text-slate-500 mb-1">❓ {item.q}</div>
              <div className="text-sm font-bold" style={{ color: item.c }}>{item.a}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
