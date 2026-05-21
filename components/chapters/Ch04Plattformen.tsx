"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "../SectionWrapper";
import LaraAvatar from "../LaraAvatar";

const platforms = [
  { name: "ChatGPT", company: "OpenAI", emoji: "🟢", cat: "Text, Bilder, Code", beginner: "⭐⭐⭐ Sehr gut", desc: "Der bekannteste KI-Assistent. Sehr vielseitig – ideal für Einsteiger.", free: true, link: "chat.openai.com", color: "#059669" },
  { name: "Claude", company: "Anthropic", emoji: "🟣", cat: "Lange Texte, Code, Agenten", beginner: "⭐⭐⭐ Sehr gut", desc: "Stark bei langen Texten, Coding und Dokumenten. Basis dieser Seite!", free: true, link: "claude.ai", color: "#7c3aed" },
  { name: "Gemini", company: "Google", emoji: "🔵", cat: "Recherche, Multimodal", beginner: "⭐⭐ Gut", desc: "Googles KI – perfekt integriert in Google Docs, Gmail & Search.", free: true, link: "gemini.google.com", color: "#2563eb" },
  { name: "Perplexity", company: "Perplexity AI", emoji: "🔮", cat: "Recherche mit Quellen", beginner: "⭐⭐⭐ Sehr gut", desc: "Die KI-Suchmaschine. Antwortet immer mit zitierten Quellen.", free: true, link: "perplexity.ai", color: "#9333ea" },
  { name: "Midjourney", company: "Midjourney", emoji: "🎨", cat: "Bildgenerierung", beginner: "⭐⭐ Mittel", desc: "Der Goldstandard für KI-Bilder. Fotorealistisch, alle Stile.", free: false, link: "midjourney.com", color: "#f59e0b" },
  { name: "Higgsfield", company: "Higgsfield AI", emoji: "🎬", cat: "Charaktere, Video, cinematic", beginner: "⭐⭐ Mittel", desc: "KI-Video mit konsistenten Charakteren. Hier lebt Lara! MCP-Integration für Agenten.", free: false, link: "higgsfield.ai", color: "#ec4899" },
  { name: "Runway", company: "Runway AI", emoji: "🎞️", cat: "Video-KI", beginner: "⭐⭐ Mittel", desc: "Professionelle Video-Bearbeitung und -Generierung mit KI.", free: false, link: "runwayml.com", color: "#f97316" },
  { name: "ElevenLabs", company: "ElevenLabs", emoji: "🎤", cat: "Stimmen & Audio", beginner: "⭐⭐ Gut", desc: "Realistische KI-Stimmen in jeder Sprache. Ideal für Voiceovers.", free: true, link: "elevenlabs.io", color: "#0891b2" },
  { name: "Suno / Udio", company: "Suno AI", emoji: "🎵", cat: "Musik", beginner: "⭐⭐ Gut", desc: "Komplette Lieder aus einer Textbeschreibung – mit Stimme und Instrumenten.", free: true, link: "suno.ai", color: "#10b981" },
  { name: "Ollama", company: "Open Source", emoji: "🦙", cat: "Lokale KI-Modelle", beginner: "🔧 Fortgeschritten", desc: "KI auf dem eigenen PC – ohne Cloud, ohne Kosten, ohne Datenweitergabe.", free: true, link: "ollama.com", color: "#64748b" },
  { name: "OpenRouter", company: "OpenRouter", emoji: "🌐", cat: "400+ Modelle per API", beginner: "🔧 Fortgeschritten", desc: "Ein API-Key für über 400 Modelle. Pay-as-you-go, kein Abo-Zwang.", free: true, link: "openrouter.ai", color: "#4f46e5" },
];

export default function Ch04Plattformen() {
  const [sel, setSel] = useState<string | null>(null);

  return (
    <SectionWrapper
      id="ch4"
      chapter={4}
      title="Wichtige KI-Plattformen"
      subtitle="Klicke auf eine Plattform für mehr Details."
      icon="💻"
      accent="#2563eb"
      alt
    >
      <LaraAvatar
        message="Für Einsteiger empfehle ich: Starte mit ChatGPT oder Claude – beide sind kostenlos. Wenn du Videos willst, bin ich über Higgsfield zu erreichen! 😊"
        side="right"
      />

      {/* Table */}
      <div className="card overflow-hidden my-8">
        <div className="overflow-x-auto">
          <table className="ki-table">
            <thead>
              <tr>
                <th>Plattform</th>
                <th>Gut für</th>
                <th>Anfängerfreundlich</th>
                <th>Kostenlos</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map((p, i) => (
                <motion.tr
                  key={p.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSel(sel === p.name ? null : p.name)}
                  className="cursor-pointer transition-colors"
                  style={{ background: sel === p.name ? `${p.color}08` : undefined }}
                >
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{p.emoji}</span>
                      <div>
                        <div className="font-bold text-slate-800">{p.name}</div>
                        <div className="text-xs text-slate-400">{p.company}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className="badge"
                      style={{ background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}25` }}
                    >
                      {p.cat}
                    </span>
                  </td>
                  <td className="text-xs text-slate-600">{p.beginner}</td>
                  <td>
                    {p.free
                      ? <span className="badge badge-success">✓ Gratis</span>
                      : <span className="badge badge-warning">💳 Kostenpflichtig</span>
                    }
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail panel */}
      {sel && (() => {
        const p = platforms.find(x => x.name === sel)!;
        return (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-5 rounded-2xl flex items-start gap-4"
            style={{ background: `${p.color}08`, border: `1.5px solid ${p.color}30` }}
          >
            <span className="text-3xl">{p.emoji}</span>
            <div>
              <div className="font-bold text-slate-800 mb-1">{p.name} – {p.cat}</div>
              <p className="text-slate-600 text-sm mb-2">{p.desc}</p>
              <div className="text-xs text-slate-400">🔗 {p.link}</div>
            </div>
          </motion.div>
        );
      })()}
    </SectionWrapper>
  );
}
