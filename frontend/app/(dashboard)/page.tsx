"use client";

import { ChatInterface } from "@/components/chat/ChatInterface";
import { DynamicCanvas } from "@/components/canvas/DynamicCanvas";
import {
  CollaborationProvider,
  useCollaboration,
} from "@/providers/CollaborationProvider";
import { LiveBackendProvider } from "@/providers/LiveBackendProvider";

/* ─── Online Users Avatars ─── */
function PresenceAvatars() {
  const { onlineUsers } = useCollaboration();

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {onlineUsers.slice(0, 4).map((u, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full border-2 border-[var(--bg-primary)] flex items-center justify-center text-[10px] font-bold text-white shadow-lg transition-transform hover:scale-110 hover:z-10"
            style={{ backgroundColor: u.color || "#818cf8" }}
            title={u.user}
          >
            {u.user?.substring(0, 2).toUpperCase() || "U"}
          </div>
        ))}
        {onlineUsers.length > 4 && (
          <div className="w-8 h-8 rounded-full border-2 border-[var(--bg-primary)] bg-white/[0.08] flex items-center justify-center text-[10px] font-bold text-[var(--text-secondary)] shadow-lg">
            +{onlineUsers.length - 4}
          </div>
        )}
      </div>
      <div className="flex items-center gap-1.5 ml-1">
        <div className="status-online" />
        <span className="text-xs text-[var(--text-muted)]">
          {onlineUsers.length} online
        </span>
      </div>
    </div>
  );
}

/* ─── Top Navigation Bar ─── */
function TopBar() {
  return (
    <header className="h-14 border-b border-white/[0.06] bg-[var(--bg-secondary)]/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-black shadow-lg shadow-indigo-500/20">
          C
        </div>
        <span className="text-sm font-semibold tracking-tight">
          <span className="text-gradient">ChatMaster</span>
        </span>
        <span className="text-[10px] font-medium text-[var(--text-muted)] bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">
          v1.0
        </span>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <PresenceAvatars />
        <div className="w-px h-6 bg-white/[0.08]" />
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          All systems operational
        </div>
      </div>
    </header>
  );
}

/* ─── Main Dashboard ─── */
function DashboardContent() {
  return (
    <div className="flex h-screen w-full flex-col bg-[var(--bg-primary)] overflow-hidden">
      <TopBar />

      <div className="flex flex-1 min-h-0">
        {/* Main canvas area */}
        <main className="flex-1 p-6 overflow-auto dot-grid">
          <DynamicCanvas />
        </main>

        {/* Chat sidebar */}
        <aside className="w-[380px] border-l border-white/[0.06] bg-[var(--bg-secondary)]/50 backdrop-blur-xl flex flex-col shrink-0">
          <ChatInterface />
        </aside>
      </div>
    </div>
  );
}

/* ─── Page Export ─── */
export default function Dashboard() {
  return (
    <CollaborationProvider>
      <LiveBackendProvider>
        <DashboardContent />
      </LiveBackendProvider>
    </CollaborationProvider>
  );
}
