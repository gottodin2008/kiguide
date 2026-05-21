"use client";
import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import LaraAvatar from "../LaraAvatar";

const sectors = [
  { icon: "💬", title: "Kundenservice", desc: "Chatbots beantworten Anfragen 24/7 ohne Wartezeit", color: "#4f46e5" },
  { icon: "🖼️", title: "Bildbearbeitung", desc: "KI entfernt Hintergründe, verbessert Qualität, generiert Bilder", color: "#9333ea" },
  { icon: "🎵", title: "Musik & Video", desc: "KI komponiert, mixt, schneidet und vertont automatisch", color: "#ec4899" },
  { icon: "🏥", title: "Medizin", desc: "Röntgenbilder auswerten, Diagnosen unterstützen, Forschung", color: "#dc2626" },
  { icon: "🏭", title: "Industrie", desc: "Qualitätskontrolle, Wartungsvorhersage, Robotersteuerung", color: "#f97316" },
  { icon: "🌍", title: "Übersetzungen", desc: "100+ Sprachen sofort, mit Kontext und Tonfall", color: "#0891b2" },
  { icon: "🚗", title: "Navigation", desc: "Google Maps, Tesla-Autopilot – alles KI-gesteuert", color: "#059669" },
  { icon: "🔒", title: "Sicherheit", desc: "Betrugserkennnung, Anomalie-Analyse, Cyberabwehr", color: "#7c3aed" },
  { icon: "📋", title: "Büro", desc: "E-Mails schreiben, Protokolle erstellen, Kalender planen", color: "#2563eb" },
  { icon: "💻", title: "Programmierung", desc: "Code vorschlagen, Fehler finden, Tests schreiben", color: "#0891b2" },
];

const stats = [
  { num: "77 %", label: "der Smartphones nutzen KI-Funktionen", color: "#4f46e5" },
  { num: "400+", label: "Millionen ChatGPT-Nutzer weltweit", color: "#9333ea" },
  { num: "2027", label: "KI-Markt: über 400 Mrd. USD erwartet", color: "#0891b2" },
];

export default function Ch03Alltag() {
  return (
    <SectionWrapper
      id="ch3"
      chapter={3}
      title="Wo wird KI heute schon eingesetzt?"
      subtitle="KI ist überall – du nutzt sie täglich, ohne es zu merken."
      icon="🌍"
      accent="#059669"
    >
      <LaraAvatar
        message="Wenn Netflix dir eine Serie empfiehlt, wenn deine Bank eine verdächtige Zahlung blockiert oder wenn Google Maps die schnellste Route berechnet – überall steckt KI dahinter!"
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 my-8">
        {sectors.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            whileHover={{ scale: 1.04, y: -2 }}
            className="card p-4 text-center cursor-default"
          >
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="font-bold text-sm mb-1" style={{ color: s.color }}>{s.title}</div>
            <div className="text-xs text-slate-500 leading-snug">{s.desc}</div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {stats.map((st, i) => (
          <motion.div
            key={st.num}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
            className="card text-center p-6"
          >
            <div className="text-4xl font-black mb-1" style={{ color: st.color }}>{st.num}</div>
            <div className="text-sm text-slate-500">{st.label}</div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
