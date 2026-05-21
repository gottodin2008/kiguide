"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AudioPlayerProps {
  src: string;
  label?: string;
  autoPlay?: boolean;
  compact?: boolean;
}

export default function AudioPlayer({ src, label, autoPlay = false, compact = false }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onMeta = () => { setDuration(audio.duration); setLoaded(true); };
    const onTime = () => setProgress(audio.currentTime / audio.duration);
    const onEnd = () => { setPlaying(false); setProgress(0); };
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    if (autoPlay) { audio.play().then(() => setPlaying(true)).catch(() => {}); }
    return () => {
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, [autoPlay]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play(); setPlaying(true); }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
    setProgress(ratio);
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <audio ref={audioRef} src={src} preload="metadata" />
        <button
          onClick={toggle}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs transition-transform hover:scale-110"
          style={{ background: "linear-gradient(135deg, #9333ea, #7c3aed)" }}
          title={playing ? "Pause" : "Anhören"}
        >
          {playing ? "⏸" : "▶"}
        </button>
        {label && <span className="text-xs text-slate-500">{label}</span>}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl"
      style={{ background: "rgba(147,51,234,0.06)", border: "1.5px solid rgba(147,51,234,0.15)" }}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      <button
        onClick={toggle}
        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm transition-all hover:scale-110 active:scale-95"
        style={{ background: playing ? "linear-gradient(135deg, #7c3aed, #9333ea)" : "linear-gradient(135deg, #9333ea, #c026d3)" }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={playing ? "pause" : "play"}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {playing ? "⏸" : "▶"}
          </motion.span>
        </AnimatePresence>
      </button>

      <div className="flex-1 min-w-0">
        {label && <div className="text-xs font-semibold text-purple-700 mb-1 truncate">{label}</div>}
        <div
          className="h-2 rounded-full cursor-pointer overflow-hidden"
          style={{ background: "#e2e8f0" }}
          onClick={seek}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #9333ea, #c026d3)", width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {loaded && (
        <div className="text-xs text-slate-400 shrink-0 tabular-nums">
          {fmt((audioRef.current?.currentTime ?? 0))}&nbsp;/&nbsp;{fmt(duration)}
        </div>
      )}
    </motion.div>
  );
}
