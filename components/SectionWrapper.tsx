"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  chapter: number;
  title: string;
  subtitle?: string;
  icon: string;
  children: ReactNode;
  accent?: string;
  alt?: boolean;
}

export default function SectionWrapper({
  id, chapter, title, subtitle, icon, children, accent = "#4f46e5", alt = false
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative py-20 px-4 md:px-8 ${alt ? "section-alt" : "section-white"}`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Chapter badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-5"
        >
          <div
            className="badge"
            style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}
          >
            <span>{icon}</span>
            <span>Kapitel {chapter}</span>
          </div>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${accent}30, transparent)` }} />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="text-3xl md:text-4xl font-black text-slate-900 mb-2 leading-tight"
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.14 }}
            className="text-slate-500 text-lg mb-10"
          >
            {subtitle}
          </motion.p>
        )}

        {children}
      </div>
    </section>
  );
}
