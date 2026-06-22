import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@copilotkit/react-ui/styles.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ChatMaster — AI Agent Ecosystem",
  description:
    "Stateful AI agent dashboard with real-time collaboration, dynamic analytics canvas, and multi-agent orchestration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-[var(--font-sans)] antialiased">
        {children}
      </body>
    </html>
  );
}
