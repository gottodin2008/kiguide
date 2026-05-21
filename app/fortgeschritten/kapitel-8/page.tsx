"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LaraVideoPresenter from "@/components/LaraVideoPresenter";
import ChapterNav from "@/components/ChapterNav";
import Ch15Sicherheit from "@/components/chapters/Ch15Sicherheit";

const slides = [
  { icon: "🔒", tag: "Zum Abschluss", tagColor: "#dc2626", title: "Mächtig braucht Grenzen", body: "KI-Agenten sind mächtig – und genau deshalb brauchen sie klare Grenzen." },
  { icon: "🔑", tag: "Regel 1", tagColor: "#b91c1c", title: "Keine sensiblen Daten", body: "Keine Passwörter, Kreditkarten oder Firmendaten ohne Nachzudenken." },
  { icon: "✋", tag: "Regel 2", tagColor: "#f97316", title: "Prüfen, nicht blind vertrauen", body: "Keine ungeprüften Mails oder Zahlungen – gerade am Anfang prüfen." },
  { icon: "🛡️", tag: "Warum", tagColor: "#7c3aed", title: "Schützt dich & deine Systeme", body: "Diese Regeln schützen dich, deine Daten und deine Systeme." },
  { icon: "🎉", tag: "Viel Erfolg", tagColor: "#059669", title: "Dein bester Mitarbeiter", body: "Dann wird KI dein bester Mitarbeiter. Viel Erfolg auf deiner KI-Reise!" },
];

const cues: [number, number, string][] = [
  [0.0, 7.0, "Zum Abschluss: KI-Agenten sind mächtig – sie brauchen klare Grenzen!"],
  [7.0, 14.0, "Keine Passwörter, Kreditkarten oder sensible Firmendaten ohne Nachdenken."],
  [14.0, 22.0, "Keine ungeprüften Mails oder Zahlungen. Prüfe, gerade am Anfang."],
  [22.0, 27.0, "Diese Regeln schützen dich, deine Daten und Systeme."],
  [27.0, 32.0, "Dann wird KI dein bester Mitarbeiter. Viel Erfolg auf deiner KI-Reise!"],
];

export default function Kapitel8() {
  return (
    <main style={{ background: "#f0f4f8", minHeight: "100vh" }}>
      <div className="sticky top-0 z-40 px-4 py-2 flex items-center gap-3"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
        <Link href="/fortgeschritten" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-cyan-600 transition-colors">← Übersicht</Link>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-black" style={{ color: "#dc2626" }}>🔒 Kapitel 8</span>
        <span className="text-slate-500 text-sm font-medium hidden sm:inline">– Sicherheit</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge" style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid rgba(220,38,38,0.3)" }}>
              <span>🔒</span><span>Kapitel 8 von 8</span>
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(220,38,38,0.3), transparent)" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-tight">
            <span style={{ background: "linear-gradient(135deg,#dc2626,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Sicherheitsregeln</span> für KI-Agenten
          </h1>
          <p className="text-slate-500 text-lg">Mit großer Macht kommt große Verantwortung.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <LaraVideoPresenter audioSrc="/audio/ch15_lara.mp3" label="Lara erklärt: Sicherheitsregeln" slides={slides} cues={cues} accent="#dc2626" defaultVideoSrc="/lara/videos/lara_fort_ch8.webm" />
        </motion.div>
      </div>

      <Ch15Sicherheit />

      <ChapterNav chapter={8} track="fortgeschritten" />
    </main>
  );
}
