"use client";
import { useState, useRef, useCallback, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PresenterSlide {
  icon?: string;
  tag?: string;
  tagColor?: string;
  title: string;
  body?: string;
  /** Optional unique speaking video for this slide (Lara mit passender Gestik). Falls leer wird Default-Video genutzt. */
  videoSrc?: string;
  /** Optional: kürzere Karaoke-Variante des Bodies (was Lara wirklich sagt). Default: body. */
  caption?: string;
  /** Optional: animierter Visual-Mockup (z.B. Mini-Mockup, Chat-Vorschau, Code-Snippet). Wird über dem Title gerendert. */
  visual?: ReactNode;
}

interface LaraVideoPresenterProps {
  audioSrc: string;
  label: string;
  slides: PresenterSlide[];
  accent?: string;
  /** Optional fein abgestimmte Karaoke-Cues [start, end, text]. Override automatischer Aufteilung. */
  cues?: [number, number, string][];
  /** Default-Video falls Slide kein eigenes hat. */
  defaultVideoSrc?: string;
}

const DEFAULT_VIDEO = "/lara/lara_speaking_v2.webm";

export default function LaraVideoPresenter({
  audioSrc,
  label,
  slides,
  accent = "#9333ea",
  cues,
  defaultVideoSrc = DEFAULT_VIDEO,
}: LaraVideoPresenterProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [done, setDone] = useState(false);
  const [karaoke, setKaraoke] = useState<string>("");

  const onTimeUpdate = useCallback(() => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const t = a.currentTime;
    const ratio = t / a.duration;
    setProgress(ratio);

    if (cues && cues.length > 0) {
      // cues drive both slide and karaoke (1:1 with slides expected)
      let cueIdx = cues.findIndex(([s, e]) => t >= s && t < e);
      if (cueIdx === -1) cueIdx = t < cues[0][0] ? 0 : cues.length - 1;
      const slideTarget = Math.min(cueIdx, slides.length - 1);
      setSlideIdx(slideTarget);
      setKaraoke(cues[cueIdx][2]);
    } else {
      const newIdx = Math.min(Math.floor(ratio * slides.length), slides.length - 1);
      setSlideIdx(newIdx);
      const s = slides[newIdx];
      setKaraoke(s.caption || s.body || s.title);
    }
  }, [slides, cues]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    const video = videoRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      video?.pause();
      setPlaying(false);
    } else {
      if (done) {
        audio.currentTime = 0;
        setProgress(0);
        setDone(false);
        setSlideIdx(0);
      }
      try {
        await audio.play();
      } catch {
        return;
      }
      video?.play().catch(() => {});
      setPlaying(true);
    }
  };

  const handleEnd = () => {
    setPlaying(false);
    setDone(true);
    videoRef.current?.pause();
    setKaraoke("");
  };

  const goToSlide = (i: number) => {
    const a = audioRef.current;
    setSlideIdx(i);
    if (a && duration) {
      const t = cues && cues[i] ? cues[i][0] : (i / slides.length) * duration;
      a.currentTime = t;
      setProgress(a.currentTime / duration);
    }
  };

  const seekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const a = audioRef.current;
    if (a && duration) {
      a.currentTime = ratio * duration;
      setProgress(ratio);
    }
  };

  // When slide changes during playback, restart video from beginning
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !playing) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [slideIdx, playing]);

  const slide = slides[slideIdx];
  const currentVideo = slide.videoSrc || defaultVideoSrc;

  return (
    <div
      className="rounded-3xl overflow-hidden mb-10"
      style={{
        background: "white",
        border: "1.5px solid #e0e7ff",
        boxShadow: "0 8px 40px rgba(79,70,229,0.10)",
      }}
    >
      {/* Header bar */}
      <div
        className="px-5 py-3 flex items-center gap-2.5"
        style={{ background: `${accent}08`, borderBottom: "1px solid #f0f4ff" }}
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full"
          style={{ background: accent }}
        />
        <span
          className="text-xs font-black uppercase tracking-widest"
          style={{ color: accent }}
        >
          ▶ {label}
        </span>
      </div>

      {/* Main body: Lara | Slide */}
      <div className="flex flex-col md:flex-row">
        {/* Lara column */}
        <div
          className="relative flex-shrink-0 flex items-end justify-center md:w-56"
          style={{
            minHeight: 300,
            background: "linear-gradient(160deg, #f5f3ff 0%, #eff6ff 100%)",
          }}
        >
          {/* Speaking video (per-slide, alpha) - re-mounts when slide changes
              Multi-source: HEVC mov for Safari/WKWebView, webm for Chromium */}
          <video
            key={currentVideo}
            ref={videoRef}
            loop
            muted
            playsInline
            style={{
              display: playing ? "block" : "none",
              width: "100%",
              maxHeight: 280,
              objectFit: "contain",
              objectPosition: "bottom",
            }}
          >
            <source src={currentVideo} type="video/webm" />
            <source src={currentVideo.replace(/\.webm$/, ".mov")} type='video/quicktime; codecs="hvc1"' />
          </video>

          {/* Static image when idle */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lara/lara_grey_suit_nobg.png"
            alt="Lara"
            style={{
              display: playing ? "none" : "block",
              width: "100%",
              maxHeight: 280,
              objectFit: "contain",
              objectPosition: "bottom",
            }}
          />

          {/* Name pill */}
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{ background: "rgba(5,150,105,0.12)", color: "#059669" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              style={{ animation: playing ? "pulse 1.5s infinite" : "none" }}
            />
            Lara
          </div>

          {/* Play overlay on hover when not started */}
          {!playing && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 group"
              style={{ background: "transparent" }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    `0 0 0 0 ${accent}60`,
                    `0 0 0 16px ${accent}00`,
                    `0 0 0 0 ${accent}00`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(135deg, ${accent}, #ec4899)` }}
              >
                ▶
              </motion.div>
              <span
                className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: accent }}
              >
                {done ? "Nochmal anhören" : "Lara anhören"}
              </span>
            </button>
          )}
        </div>

        {/* Slide column */}
        <div
          className="flex-1 p-6 md:p-10 flex flex-col justify-center"
          style={{ minHeight: 280 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIdx}
              initial={{ opacity: 0, x: 32, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -32, scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {slide.tag && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold mb-3"
                  style={{
                    background: `${slide.tagColor || accent}15`,
                    color: slide.tagColor || accent,
                  }}
                >
                  {slide.tag}
                </motion.div>
              )}

              {slide.visual ? (
                <div className="mb-4">{slide.visual}</div>
              ) : (
                slide.icon && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.08, type: "spring", stiffness: 200 }}
                    className="text-5xl mb-4"
                  >
                    {slide.icon}
                  </motion.div>
                )
              )}

              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="text-2xl md:text-3xl font-black text-slate-900 mb-3 leading-tight"
              >
                {slide.title}
              </motion.h3>

              {slide.body && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                  className="text-slate-500 text-base leading-relaxed"
                >
                  {slide.body}
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Dot navigation */}
          <div className="flex gap-2 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className="transition-all duration-300 rounded-full hover:opacity-80"
                style={{
                  width: i === slideIdx ? 28 : 8,
                  height: 8,
                  background:
                    i < slideIdx
                      ? `${accent}80`
                      : i === slideIdx
                      ? accent
                      : "#e2e8f0",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Karaoke subtitle bar */}
      <AnimatePresence mode="wait">
        {playing && karaoke && (
          <motion.div
            key={karaoke}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="px-6 py-4 text-center"
            style={{
              background: `linear-gradient(135deg, ${accent}06, ${accent}10)`,
              borderTop: "1px solid #f0f4ff",
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <span
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: accent, opacity: 0.6 }}
              >
                💬 Lara sagt
              </span>
            </div>
            <p
              className="text-base md:text-lg font-medium leading-snug max-w-2xl mx-auto"
              style={{ color: "#334155" }}
            >
              {karaoke}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control bar */}
      <div
        className="px-5 py-4 flex items-center gap-3"
        style={{ borderTop: "1px solid #f0f4ff" }}
      >
        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={(e) =>
            setDuration((e.target as HTMLAudioElement).duration)
          }
          onEnded={handleEnd}
          preload="metadata"
        />

        {/* Play / Pause / Replay button */}
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ background: `linear-gradient(135deg, ${accent}, #ec4899)` }}
        >
          {playing ? "⏸" : done ? "↩" : "▶"}
        </motion.button>

        {/* Progress bar */}
        <div
          className="flex-1 h-2.5 rounded-full overflow-hidden cursor-pointer"
          style={{ background: "#e8edf4" }}
          onClick={seekClick}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${accent}, #ec4899)`,
              width: `${progress * 100}%`,
            }}
          />
        </div>

        {/* Status */}
        <div
          className="text-xs font-bold shrink-0 tabular-nums"
          style={{
            color: done ? "#059669" : "#94a3b8",
            minWidth: 52,
            textAlign: "right",
          }}
        >
          {done ? "✓ Fertig" : `${slideIdx + 1} / ${slides.length}`}
        </div>
      </div>
    </div>
  );
}
