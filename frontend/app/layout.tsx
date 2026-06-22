import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatMaster - AI Agent Ecosystem",
  description: "Stateful AI agent dashboard with Realtime collaboration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-neutral-950 text-white min-h-screen`}>
        {/* Explicitly configuring CopilotKit for AG-UI and setting runtimeUrl */}
        <CopilotKit 
          runtimeUrl="/api/chat/stream"
          agent="ChatMaster Supervisor"
          properties={{ protocol: "ag-ui" }}
        >
          {children}
        </CopilotKit>
      </body>
    </html>
  );
}
