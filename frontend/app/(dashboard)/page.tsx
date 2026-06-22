"use client";

import { CopilotSidebar } from "@copilotkit/react-ui";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { DynamicCanvas } from "@/components/canvas/DynamicCanvas";
import { CollaborationProvider, useCollaboration } from "@/providers/CollaborationProvider";
import { LiveBackendProvider } from "@/providers/LiveBackendProvider";

function TopNav() {
  const { onlineUsers } = useCollaboration();
  
  return (
    <div className="absolute top-4 right-4 z-50 flex -space-x-2">
      {onlineUsers.slice(0, 3).map((u: any, i: number) => (
        <div 
          key={i} 
          className="w-10 h-10 rounded-full border-2 border-neutral-950 flex items-center justify-center text-xs font-bold text-white shadow-lg"
          style={{ backgroundColor: u.color || '#3b82f6' }}
        >
          {u.user?.substring(0, 2).toUpperCase() || 'U'}
        </div>
      ))}
      {onlineUsers.length > 3 && (
        <div className="w-10 h-10 rounded-full border-2 border-neutral-950 bg-neutral-800 flex items-center justify-center text-xs font-bold text-white shadow-lg">
          +{onlineUsers.length - 3}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <CollaborationProvider>
      <LiveBackendProvider>
        <div className="flex h-screen w-full bg-neutral-950 overflow-hidden relative">
          <TopNav />
          
          <div className="flex-1 p-4 lg:p-8 flex items-center justify-center">
            <div className="w-full max-w-5xl h-full lg:h-[80vh]">
              <DynamicCanvas />
            </div>
          </div>
          
          <div className="w-[400px] h-full border-l border-neutral-800 bg-neutral-900/50 backdrop-blur-xl relative">
            <CopilotSidebar 
              defaultOpen={true}
              labels={{
                title: "ChatMaster Supervisor",
                initial: "Hello! I am your AI architect. How can I assist you with your database or analytics today?",
              }}
              className="h-full !bg-transparent"
            />
            <ChatInterface />
          </div>
        </div>
      </LiveBackendProvider>
    </CollaborationProvider>
  );
}
