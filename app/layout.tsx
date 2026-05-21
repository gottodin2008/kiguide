import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KI Guide mit Lara – Anfänger bis Profi",
  description: "Lerne alles über Künstliche Intelligenz – von den Grundlagen bis zu KI-Agenten mit Claude Code und OpenClaw.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
