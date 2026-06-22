"use client";

import { useEffect } from "react";
import { supabase } from "./CollaborationProvider";

export function LiveBackendProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const inventoryChannel = supabase
        .channel("schema-db-changes")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "inventory" },
          (payload) => {
            console.log("Realtime change received!", payload);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(inventoryChannel);
      };
    } catch {
      // Silently handle Supabase connection errors in demo mode
    }
  }, []);

  return <>{children}</>;
}
