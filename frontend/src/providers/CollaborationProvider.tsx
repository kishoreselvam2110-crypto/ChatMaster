"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key";

export const supabase = createClient(supabaseUrl, supabaseKey);

const CollaborationContext = createContext<any>(null);

export function CollaborationProvider({ children }: { children: React.ReactNode }) {
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

  useEffect(() => {
    // Stub implementation for Supabase Presence
    const channel = supabase.channel('online-users', {
      config: {
        presence: { key: 'user-' + Math.random().toString(36).substring(7) },
      },
    });

    channel.on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      setOnlineUsers(Object.values(state).flat());
    }).subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({ 
          user: 'Demo User', 
          color: '#' + Math.floor(Math.random()*16777215).toString(16),
          onlineAt: new Date().toISOString(),
        });
      }
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <CollaborationContext.Provider value={{ onlineUsers }}>
      {children}
    </CollaborationContext.Provider>
  );
}

export const useCollaboration = () => useContext(CollaborationContext);
