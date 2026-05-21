"use client";
import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";

const systems = [
  { tool: "Claude Code", desc: "Agentisches Coding-Tool von Anthropic. Liest Codebase, ändert Dateien, führt Tests aus, committet Code.", target: "Entwickler, Builder", color: "#7c3aed", icon: "⚡", link: "claude.ai/code" },
  { tool: "OpenClaw", desc: "Persönlicher Open-Source-Agent. Browser, Canvas, Nodes, Cron, Sessions, Discord/Slack-Aktionen.", target: "Fortgeschritten", color: "#059669", icon: "🦅", link: "openclaw.ai" },
  { tool: "OpenHands", desc: "Coding-Agent / Software-Agent-SDK. Autonomous software development agent.", target: "Entwickler", color: "#2563eb", icon: "🤝", link: "github.com/All-Hands-AI/OpenHands" },
  { tool: "CrewAI", desc: "Multi-Agent-Framework. Mehrere spezialisierte Agenten arbeiten als Team zusammen.", target: "Entwickler", color: "#f97316", icon: "👥", link: "crewai.com" },
  { tool: "LangGraph", desc: "Framework für komplexe Agenten-Workflows mit State-Management und Loops.", target: "Entwickler", color: "#ec4899", icon: "🕸️", link: "langchain.com/langgraph" },
  { tool: "n8n + KI", desc: "No-Code/Low-Code Automatisierung mit KI-Knoten. Verbindet hunderte Apps mit KI.", target: "No-Code / Low-Code", color: "#dc2626", icon: "🔄", link: "n8n.io" },
  { tool: "Zapier Agents", desc: "KI-Agenten die Business-Workflows in Zapier ausführen. Für Nicht-Techniker.", target: "Anfänger bis Profi", color: "#f59e0b", icon: "⚡", link: "zapier.com" },
  { tool: "Make.com + KI", desc: "Visuelle Workflow-Automatisierung mit KI-Integration. Drag & Drop.", target: "No-Code", color: "#0891b2", icon: "🔧", link: "make.com" },
];

export default function Ch10AgentenSysteme() {
  return (
    <SectionWrapper
      id="ch3"
      chapter={3}
      title="Wichtige Agenten-Systeme"
      subtitle="Vom No-Code-Tool bis zum professionellen Agent-Framework."
      icon="🛠️"
      accent="#f97316"
      alt
    >
      <div className="grid md:grid-cols-2 gap-4 my-8">
        {systems.map((s, i) => (
          <motion.div
            key={s.tool}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="card p-5 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div
                className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `${s.color}12`, border: `1.5px solid ${s.color}25` }}
              >
                {s.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-black text-slate-800">{s.tool}</h3>
                  <span
                    className="badge"
                    style={{ background: `${s.color}12`, color: s.color, border: `1px solid ${s.color}25` }}
                  >
                    {s.target}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{s.desc}</p>
                <div className="text-xs text-slate-400 mt-2">🔗 {s.link}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MCP explainer */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card p-5"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">🔌</span>
          <div>
            <h3 className="font-bold text-slate-800 mb-2">MCP – Model Context Protocol einfach erklärt</h3>
            <p className="text-slate-500 text-sm mb-3">
              MCP ist ein offenes Standard-Protokoll, das KI-Modelle mit externen Tools verbindet. Stelle dir MCP wie einen <strong>USB-Standard für KI</strong> vor: Jede App die MCP unterstützt, kann automatisch von KI-Agenten genutzt werden.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Claude Code", "OpenClaw", "Higgsfield", "VS Code", "JetBrains", "Zapier"].map(app => (
                <span key={app} className="badge badge-primary">{app}</span>
              ))}
              <span className="badge" style={{ background: "#f8fafc", color: "#64748b" }}>+ viele mehr</span>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
