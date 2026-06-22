"use client";

import { useEffect } from "react";
import { supabase } from "./CollaborationProvider";

export function LiveBackendProvider({ children }: { children: React.ReactNode }) {
  
  useEffect(() => {
    // Listen to changes on the inventory table
    const inventoryChannel = supabase.channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'inventory' },
        (payload) => {
          console.log('Realtime change received!', payload);
          // In a full implementation, we'd invalidate queries or update Zustand store here
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(inventoryChannel);
    };
  }, []);

  return <>{children}</>;
}
