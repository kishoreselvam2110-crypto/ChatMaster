"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key";

export const supabase = createClient(supabaseUrl, supabaseKey);

interface OnlineUser {
  user: string;
  color: string;
  onlineAt: string;
}

interface CollaborationContextValue {
  onlineUsers: OnlineUser[];
}

const CollaborationContext = createContext<CollaborationContextValue>({
  onlineUsers: [],
});

export function CollaborationProvider({ children }: { children: React.ReactNode }) {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([
    { user: "Kishore", color: "#818cf8", onlineAt: new Date().toISOString() },
    { user: "Agent-1", color: "#22d3ee", onlineAt: new Date().toISOString() },
    { user: "Agent-2", color: "#34d399", onlineAt: new Date().toISOString() },
  ]);

  useEffect(() => {
    try {
      const channel = supabase.channel("online-users", {
        config: {
          presence: { key: "user-" + Math.random().toString(36).substring(7) },
        },
      });

      channel
        .on("presence", { event: "sync" }, () => {
          const state = channel.presenceState();
          const users = Object.values(state).flat() as unknown as OnlineUser[];
          if (users.length > 0) setOnlineUsers(users);
        })
        .subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            await channel.track({
              user: "Demo User",
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              onlineAt: new Date().toISOString(),
            });
          }
        });

      return () => {
        supabase.removeChannel(channel);
      };
    } catch {
      // Silently handle Supabase connection errors in demo mode
    }
  }, []);

  return (
    <CollaborationContext.Provider value={{ onlineUsers }}>
      {children}
    </CollaborationContext.Provider>
  );
}

export const useCollaboration = () => useContext(CollaborationContext);
