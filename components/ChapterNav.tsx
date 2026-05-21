"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export const ANFAENGER_CHAPTERS = [
  { id: 1, title: "Was ist KI?", icon: "🧠" },
  { id: 2, title: "Was kann KI?", icon: "✨" },
  { id: 3, title: "KI im Einsatz", icon: "🌍" },
  { id: 4, title: "Plattformen", icon: "🖥️" },
  { id: 5, title: "KI-Modelle", icon: "🤖" },
  { id: 6, title: "Preise & Kosten", icon: "💰" },
  { id: 7, title: "Übungen", icon: "🎯" },
];

export const FORTGESCHRITTEN_CHAPTERS = [
  { id: 1, title: "KI-Agenten", icon: "🤖" },
  { id: 2, title: "Agent vs Chatbot", icon: "⚖️" },
  { id: 3, title: "Agenten-Systeme", icon: "🛠️" },
  { id: 4, title: "OpenClaw", icon: "🦅" },
  { id: 5, title: "Claude Code", icon: "⚡" },
  { id: 6, title: "Alternativen", icon: "🌐" },
  { id: 7, title: "Modell-Guide", icon: "🎯" },
  { id: 8, title: "Sicherheit", icon: "🔒" },
];

interface ChapterNavProps {
  chapter: number;
  track?: "anfaenger" | "fortgeschritten";
}

export default function ChapterNav({ chapter, track = "anfaenger" }: ChapterNavProps) {
  const chapters = track === "anfaenger" ? ANFAENGER_CHAPTERS : FORTGESCHRITTEN_CHAPTERS;
  const basePath = track === "anfaenger" ? "/anfaenger" : "/fortgeschritten";
  const total = chapters.length;
  const prevChapter = chapters.find((c) => c.id === chapter - 1);
  const nextChapter = chapters.find((c) => c.id === chapter + 1);

  const prevHref = chapter === 1 ? basePath : `${basePath}/kapitel-${chapter - 1}`;
  const prevLabel =
    chapter === 1
      ? "← Kapitel-Übersicht"
      : `← ${prevChapter?.icon} Kapitel ${chapter - 1}: ${prevChapter?.title}`;

  const nextHref =
    chapter === total
      ? track === "anfaenger"
        ? "/fortgeschritten"
        : "/"
      : `${basePath}/kapitel-${chapter + 1}`;
  const nextLabel =
    chapter === total
      ? track === "anfaenger"
        ? "🚀 Fortgeschritten starten →"
        : "🎉 Zurück zur Startseite →"
      : `${nextChapter?.icon} Kapitel ${chapter + 1}: ${nextChapter?.title} →`;

  const isLast = chapter === total;

  const primaryGrad =
    track === "anfaenger"
      ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
      : "linear-gradient(135deg, #0891b2, #7c3aed)";
  const primaryShadow =
    track === "anfaenger"
      ? "0 4px 20px rgba(79,70,229,0.35)"
      : "0 4px 20px rgba(8,145,178,0.35)";
  const lastGrad =
    track === "anfaenger"
      ? "linear-gradient(135deg, #0891b2, #0284c7)"
      : "linear-gradient(135deg, #9333ea, #ec4899)";
  const lastShadow =
    track === "anfaenger"
      ? "0 4px 20px rgba(8,145,178,0.35)"
      : "0 4px 20px rgba(147,51,234,0.35)";

  const dotActive =
    track === "anfaenger"
      ? "#4f46e5"
      : "#0891b2";
  const dotActiveGrad =
    track === "anfaenger"
      ? "linear-gradient(90deg, #4f46e5, #9333ea)"
      : "linear-gradient(90deg, #0891b2, #7c3aed)";

  return (
    <div
      className="border-t py-10 px-4"
      style={{ borderColor: "#e2e8f0", background: "white" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          {chapters.map((c) => (
            <Link key={c.id} href={`${basePath}/kapitel-${c.id}`} title={`Kapitel ${c.id}: ${c.title}`}>
              <motion.div
                whileHover={{ scale: 1.3 }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: c.id === chapter ? 32 : 10,
                  height: 10,
                  background:
                    c.id < chapter
                      ? dotActive
                      : c.id === chapter
                      ? dotActiveGrad
                      : "#e2e8f0",
                }}
              />
            </Link>
          ))}
          <span className="ml-3 text-xs text-slate-400 font-semibold tabular-nums">
            {chapter} / {total}
          </span>
        </div>

        <div className="flex gap-4 justify-between items-center">
          <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={prevHref}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all"
              style={{
                background: "#f8fafc",
                border: "1.5px solid #e2e8f0",
                color: "#475569",
              }}
            >
              {prevLabel}
            </Link>
          </motion.div>

          <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={nextHref}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white transition-all"
              style={{
                background: isLast ? lastGrad : primaryGrad,
                boxShadow: isLast ? lastShadow : primaryShadow,
              }}
            >
              {nextLabel}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
