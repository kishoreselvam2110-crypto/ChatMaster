"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  "Show me inventory analytics",
  "What's the top-selling product?",
  "Generate a sales report",
  "Add a new product to inventory",
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your AI inventory assistant. I can help you analyze data, manage inventory, and generate reports. What would you like to do?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(text.trim()),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/20">
              AI
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 status-online" />
          </div>
          <div>
            <p className="text-sm font-semibold">ChatMaster Agent</p>
            <p className="text-xs text-[var(--text-muted)]">Supervisor • Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-br-md"
                  : "bg-white/[0.04] border border-white/[0.06] text-[var(--text-primary)] rounded-bl-md"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-pulse" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-pulse" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-pulse" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {/* Suggestions (shown only when 1 message) */}
        {messages.length <= 1 && (
          <div className="space-y-2 pt-2">
            <p className="text-xs text-[var(--text-muted)] font-medium">Suggestions</p>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="block w-full text-left px-3 py-2.5 text-sm text-[var(--text-secondary)] rounded-xl border border-white/[0.06] hover:bg-white/[0.04] hover:border-[var(--border-glow)] transition-all duration-200"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/[0.06]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI agent..."
            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-indigo)] focus:ring-1 focus:ring-[var(--accent-indigo)]/20 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center text-white text-sm font-bold disabled:opacity-30 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-200 shrink-0"
          >
            ↑
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Simulated AI Responses ─── */
function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("analytics") || lower.includes("report"))
    return "I've analyzed your inventory data. Revenue is up 12.5% this month, with the Quantum Keyboard being your top performer at $129.99 per unit with 45 in stock. I can switch the canvas to the Analytics view for more details — just say the word!";
  if (lower.includes("top") || lower.includes("selling") || lower.includes("best"))
    return "Based on recent order data, the **Ergonomic Mouse** leads in volume (120 units in stock, high turnover), while the **Standing Desk** leads in revenue per unit at $499.00. Want me to generate a detailed breakdown?";
  if (lower.includes("add") || lower.includes("new") || lower.includes("create"))
    return "I can help you add a new product! Please provide the product name, category, price, and initial stock quantity, and I'll insert it into the inventory database.";
  if (lower.includes("inventory"))
    return "Your current inventory has 3,847 items across 6 product lines. I notice that the Standing Desk stock is low at 15 units — you may want to reorder soon. Switch to the Inventory tab for the full table view.";
  return "I understand your request. As your AI supervisor agent, I can analyze inventory data, generate reports, manage stock levels, and orchestrate sub-agents for complex tasks. What specific task would you like me to help with?";
}
