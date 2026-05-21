"use client";
import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import LaraAvatar from "../LaraAvatar";

const plans = [
  {
    icon: "🆓", tier: "Kostenlos", price: "0 €/Monat", color: "#059669",
    platforms: ["ChatGPT (begrenzt)", "Claude.ai (tägl. Limit)", "Gemini Basic", "Copilot", "Perplexity Basic"],
    pros: ["Sofort loslegen", "Kein Risiko", "Ideal zum Testen"],
    cons: ["Langsamere Antworten", "Ältere Modelle", "Tägliche Limits"],
    for: "Perfekt zum Ausprobieren",
  },
  {
    icon: "⭐", tier: "Pro / Plus", price: "ab ~20 €/Monat", color: "#4f46e5", highlight: true,
    platforms: ["ChatGPT Plus ($20)", "Claude Pro ($18)", "Gemini Advanced ($20)", "Perplexity Pro ($20)"],
    pros: ["Neueste Modelle", "Keine Tageslimits", "Schnellere Antworten", "Erweiterte Features"],
    cons: ["Monatliche Kosten", "Kein API-Zugang"],
    for: "Empfohlen für regelmäßige Nutzung",
  },
  {
    icon: "🔌", tier: "API (Pay-per-Use)", price: "Nach Nutzung", color: "#0891b2",
    platforms: ["Anthropic API", "OpenAI API", "Google AI API", "OpenRouter (400+ Modelle)"],
    pros: ["Zahle nur was du nutzt", "Alle Modelle verfügbar", "Eigene Apps bauen", "Maximale Kontrolle"],
    cons: ["Technisches Setup", "Variable Kosten", "Kein Chat-Interface"],
    for: "Für Entwickler & Fortgeschrittene",
  },
];

export default function Ch06Preise() {
  return (
    <SectionWrapper
      id="ch6"
      chapter={6}
      title="Was kostet KI?"
      subtitle="Von kostenlos bis Enterprise – einfach erklärt."
      icon="💰"
      accent="#d97706"
      alt
    >
      <LaraAvatar
        message="Die gute Nachricht: Du kannst KI kostenlos ausprobieren! Für den täglichen Einsatz lohnt sich ein Pro-Abo – du sparst damit leicht Stunden Arbeit pro Woche."
      />

      <div className="grid md:grid-cols-3 gap-5 my-8">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.tier}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.45 }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "white",
              border: `2px solid ${plan.highlight ? plan.color : "#e2e8f0"}`,
              boxShadow: plan.highlight ? `0 8px 30px ${plan.color}20` : "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            {plan.highlight && (
              <div
                className="text-center py-1.5 text-xs font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${plan.color}, #7c3aed)` }}
              >
                ⭐ Empfohlen
              </div>
            )}
            <div className="p-6">
              <div className="text-3xl mb-2">{plan.icon}</div>
              <h3 className="font-black text-lg text-slate-900">{plan.tier}</h3>
              <div className="text-2xl font-black my-2" style={{ color: plan.color }}>{plan.price}</div>

              <div className="mb-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Plattformen</p>
                {plan.platforms.map(p => (
                  <div key={p} className="text-xs text-slate-600 flex items-center gap-1.5 mb-1">
                    <span style={{ color: plan.color }}>→</span> {p}
                  </div>
                ))}
              </div>

              <div className="space-y-1 mb-4">
                {plan.pros.map(p => (
                  <div key={p} className="text-xs text-green-600 flex items-center gap-1">✓ {p}</div>
                ))}
                {plan.cons.map(c => (
                  <div key={c} className="text-xs text-slate-400 flex items-center gap-1">✗ {c}</div>
                ))}
              </div>

              <div
                className="text-xs text-center px-3 py-2 rounded-xl font-medium"
                style={{ background: `${plan.color}10`, color: plan.color }}
              >
                {plan.for}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Token explainer */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card p-5"
      >
        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          🎓 Tokens einfach erklärt
        </h3>
        <p className="text-slate-500 text-sm mb-4">
          Bei der API zahlst du nach <strong>Tokens</strong>. Ein Token ist ein kleines Textstück – etwa ¾ eines Wortes.
          Je mehr du schreibst und je länger die Antwort, desto mehr kostet es.
        </p>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { val: "1 Token", eq: "≈ ¾ Wort auf Englisch" },
            { val: "1.000 Tokens", eq: "≈ 1 DIN-A4-Seite Text" },
            { val: "1 Mio. Tokens", eq: "kostet $1–$30 je nach Modell" },
          ].map((t, i) => (
            <div key={t.val} className="p-3 rounded-xl text-center bg-slate-50 border border-slate-100">
              <div className="font-bold text-indigo-600 text-sm">{t.val}</div>
              <div className="text-slate-500 text-xs mt-0.5">{t.eq}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
