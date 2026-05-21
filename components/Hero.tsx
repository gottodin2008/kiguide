"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

// Karaoke cues timed to lara_intro.mp3 [start, end, text]
const CUES: [number, number, string][] = [
  [0.0,  2.8,  "Hallo und herzlich willkommen!"],
  [2.8,  6.2,  "Ich bin Lara, deine persönliche KI-Begleiterin."],
  [6.2,  10.5, "Gemeinsam entdecken wir die Welt der Künstlichen Intelligenz."],
  [10.5, 15.2, "Egal ob du ganz am Anfang stehst oder schon Erfahrung hast –"],
  [15.2, 18.5, "ich begleite dich Schritt für Schritt."],
  [18.5, 22.8, "Von einfachen Grundlagen bis hin zu eigenen KI-Agenten."],
  [22.8, 27.0, "Los geht's – ich freue mich auf dich! 🎉"],
];

export default function Hero() {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoPlaying, setVideoPlaying] = useState(false); // video running (muted, always autoplay)
  const [started, setStarted] = useState(false);           // audio playing (karaoke active)
  const [currentCue, setCurrentCue] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [audioDone, setAudioDone] = useState(false);
  const [bubble, setBubble] = useState(0);

  const bubbles = [
    "Hallo! Ich bin Lara, deine KI-Assistentin. 👋",
    "Ich begleite dich von Grundlagen bis zu Agenten!",
    "Wähle dein Level – und wir legen los! 🚀",
  ];

  // Rotating bubble when idle
  useEffect(() => {
    if (started) return;
    const t = setInterval(() => setBubble(i => (i + 1) % bubbles.length), 3000);
    return () => clearInterval(t);
  }, [started]);

  // Track audio progress for karaoke
  const onTimeUpdate = useCallback(() => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const t = a.currentTime;
    setProgress(t / a.duration);
    const cue = CUES.find(([s, e]) => t >= s && t < e);
    setCurrentCue(cue ? cue[2] : null);
  }, []);

  // Start: play video (always muted/allowed) + audio (needs user gesture if blocked)
  const handleStart = useCallback(async () => {
    const audio = audioRef.current;
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
      setVideoPlaying(true); // character animates as soon as video runs
    }
    if (audio) {
      audio.currentTime = 0;
      try {
        await audio.play();
        setStarted(true); // karaoke activates only when audio plays
      } catch {
        // audio blocked — play button stays visible, video still animates
      }
    }
  }, []);

  // Try autoplay on mount — if browser allows it, everything starts automatically
  useEffect(() => {
    const t = setTimeout(handleStart, 600);
    return () => clearTimeout(t);
  }, [handleStart]);

  const handleAudioEnd = () => {
    setAudioDone(true);
    setVideoPlaying(false);
    setCurrentCue(null);
    setProgress(0);
    videoRef.current?.pause();
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden hero-bg">

      {/* Hidden audio */}
      <audio
        ref={audioRef}
        src="/audio/lara_intro.mp3"
        onTimeUpdate={onTimeUpdate}
        onEnded={handleAudioEnd}
        preload="auto"
      />

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ x: [0, 50, 0], y: [0, -40, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(199,210,254,0.5), transparent 70%)" }} />
        <motion.div animate={{ x: [0, -40, 0], y: [0, 50, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(233,213,255,0.4), transparent 70%)" }} />
        <motion.div animate={{ x: [0, 30, 0], y: [0, 30, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 w-72 h-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(165,243,252,0.3), transparent 70%)" }} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center max-w-7xl mx-auto w-full px-6 lg:px-12 gap-0 lg:gap-8">

        {/* ── Lara Column ── */}
        <div className="relative flex-shrink-0 flex flex-col items-center lg:items-start w-full lg:w-auto">

          {/* Character video/image – transparent via mix-blend-mode */}
          <motion.div
            className="relative cursor-pointer"
            animate={started ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            onClick={!started ? handleStart : undefined}
            style={{ width: "min(320px, 85vw)", height: "min(480px, 60vw)" }}
          >
            {/* Speaking video with alpha — multi-source: HEVC mov for Safari, webm for Chromium */}
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-contain object-bottom"
              style={{
                display: videoPlaying ? "block" : "none",
              }}
            >
              <source src="/lara/videos/lara_hero_welcome.webm" type="video/webm" />
              <source src="/lara/videos/lara_hero_welcome.mov" type='video/quicktime; codecs="hvc1"' />
            </video>

            {/* Static image – shown when idle or after video stops */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lara/lara_grey_suit_nobg.png"
              alt="Lara"
              className="absolute inset-0 w-full h-full object-contain object-bottom"
              style={{
                display: videoPlaying ? "none" : "block",
              }}
            />

            {/* Foot shadow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-6 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(147,51,234,0.12), transparent 70%)" }} />

            {/* Start overlay – click to speak */}
            <AnimatePresence>
              {!started && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                >
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], boxShadow: ["0 0 0 0 rgba(147,51,234,0.4)", "0 0 0 14px rgba(147,51,234,0)", "0 0 0 0 rgba(147,51,234,0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl pointer-events-auto cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #9333ea, #ec4899)" }}
                    onClick={handleStart}
                  >
                    ▶
                  </motion.div>
                  <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Lara anhören</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Online dot */}
            <div className="absolute top-4 right-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white pointer-events-none"
              style={{ background: "rgba(5,150,105,0.88)", backdropFilter: "blur(8px)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
              Online
            </div>
          </motion.div>

          {/* Lara name tag */}
          <div className="text-center lg:text-left mt-1 mb-4">
            <div className="font-black text-slate-800 text-base">Lara</div>
          </div>

          {/* Karaoke subtitle bar */}
          <div className="w-full max-w-xs mb-6 min-h-[56px]">
            <AnimatePresence mode="wait">
              {started && !audioDone && (
                <motion.div
                  key={currentCue ?? "empty"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 py-3 rounded-2xl text-sm font-semibold text-center leading-snug"
                  style={{
                    background: "rgba(147,51,234,0.09)",
                    border: "1.5px solid rgba(147,51,234,0.2)",
                    color: "#4b5563",
                  }}
                >
                  {currentCue || "…"}
                  {/* Progress bar */}
                  <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: "#e9d5ff" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #9333ea, #ec4899)", width: `${progress * 100}%` }}
                    />
                  </div>
                </motion.div>
              )}
              {audioDone && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-4 py-2 rounded-2xl text-xs font-semibold text-center"
                  style={{ background: "rgba(5,150,105,0.08)", border: "1.5px solid rgba(5,150,105,0.2)", color: "#059669" }}
                >
                  ✓ Bereit – wähle dein Level!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Right: Headline + Cards ── */}
        <div className="flex-1 text-center lg:text-left pb-8 lg:pb-0">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}
            className="text-5xl md:text-6xl xl:text-7xl font-black mb-5 leading-[1.08] tracking-tight" style={{ color: "#0f172a" }}>
            KI verstehen.{" "}
            <span className="grad-primary">KI nutzen.</span>
            <br />
            <span className="grad-lara">KI automatisieren.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-slate-500 mb-10 max-w-xl leading-relaxed">
            Lara führt dich Schritt für Schritt durch die Welt der Künstlichen Intelligenz –
            von den Grundlagen bis zu eigenen KI-Agenten.
          </motion.p>

          {/* Level cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Wähle deinen Einstieg</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

              <motion.button
                onClick={() => router.push("/anfaenger")}
                whileHover={{ scale: 1.04, y: -5 }}
                whileTap={{ scale: 0.97 }}
                className="group relative w-full sm:w-64 p-6 rounded-2xl text-left overflow-hidden"
                style={{ background: "white", border: "2px solid rgba(79,70,229,0.18)", boxShadow: "0 8px 32px rgba(79,70,229,0.11)" }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.05), rgba(124,58,237,0.06))" }} />
                <div className="relative z-10">
                  <div className="text-3xl mb-3">🌱</div>
                  <h3 className="text-lg font-black text-slate-900 mb-1">KI-Anfänger</h3>
                  <p className="text-xs text-slate-500 mb-3">Grundlagen · Plattformen · Erste Schritte · Übungen</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600">7 Kapitel</span>
                    <span className="text-xs text-slate-400">· ca. 20 min</span>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl text-white"
                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
                    Jetzt starten →
                  </div>
                </div>
              </motion.button>

              <motion.button
                onClick={() => router.push("/fortgeschritten")}
                whileHover={{ scale: 1.04, y: -5 }}
                whileTap={{ scale: 0.97 }}
                className="group relative w-full sm:w-64 p-6 rounded-2xl text-left overflow-hidden"
                style={{ background: "white", border: "2px solid rgba(8,145,178,0.18)", boxShadow: "0 8px 32px rgba(8,145,178,0.11)" }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(8,145,178,0.05), rgba(6,182,212,0.06))" }} />
                <div className="relative z-10">
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="text-lg font-black text-slate-900 mb-1">Fortgeschritten</h3>
                  <p className="text-xs text-slate-500 mb-3">Agenten · Claude Code · OpenClaw · Workflows</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-cyan-50 text-cyan-600">8 Kapitel</span>
                    <span className="text-xs text-slate-400">· ca. 35 min</span>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl text-white"
                    style={{ background: "linear-gradient(135deg, #0891b2, #0284c7)" }}>
                    Direkt rein →
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
