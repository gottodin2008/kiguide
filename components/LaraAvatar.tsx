"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface LaraAvatarProps {
  message: string;
  size?: "sm" | "md" | "lg";
  side?: "left" | "right";
}

export default function LaraAvatar({ message, size = "md", side = "left" }: LaraAvatarProps) {
  const sizes = { sm: 52, md: 68, lg: 90 };
  const px = sizes[size];

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`flex items-end gap-3 my-6 ${side === "right" ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative shrink-0"
        style={{ width: px, height: px }}
      >
        <div
          className="w-full h-full rounded-full overflow-hidden"
          style={{
            boxShadow: "0 4px 20px rgba(147,51,234,0.3)",
            border: "2px solid rgba(147,51,234,0.25)",
          }}
        >
          <Image
            src="/lara/lara_phone_nobg.png"
            alt="Lara"
            width={px}
            height={px}
            style={{ objectFit: "cover", objectPosition: "top center" }}
          />
        </div>
        <div
          className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white"
          style={{ boxShadow: "0 0 6px rgba(74,222,128,0.6)" }}
        />
      </motion.div>

      {/* Bubble */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        viewport={{ once: true }}
        className="max-w-sm relative"
      >
        <div
          className="lara-bubble px-4 py-3 text-sm leading-relaxed"
          style={{
            borderRadius: side === "left" ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
          }}
        >
          <span
            className="block text-xs font-bold mb-1 uppercase tracking-wider"
            style={{ color: "#9333ea" }}
          >
            Lara · KI-Assistentin
          </span>
          <span className="text-slate-700">{message}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
