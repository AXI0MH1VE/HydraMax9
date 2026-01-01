import React, { useState } from "react";
import { gemini } from "../services/geminiService";
import { SendHorizontal, Loader2 } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "sys-1",
      role: "model",
      text: "TACTICAL INTEL ONLINE. Provide a scenario, hypothesis, or threat surface for deep analysis.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const send = async () => {
    if (!input.trim() || busy) return;
    const text = input.trim();
    setInput("");
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setBusy(true);
    try {
      const reply = await gemini.processKernelCommand(text);
      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          role: "model",
          text: reply,
        },
      ]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "model",
          text: `AXIOM_FAULT: ${msg}`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void send();
  };

  return (
    <div className="flex flex-col h-full border border-[#06af6e]/30 bg-black/70 brutalist-border">
      <div className="border-b border-[#06af6e]/30 px-4 py-2 flex justify-between items-center">
        <div className="text-[10px] text-[#06af6e] font-bold uppercase tracking-[0.3em]">
          AXIOM TACTICAL INTEL
        </div>
        <div className="text-[9px] text-gray-500 font-mono">
          Model: G3-Pro / Deep Thinking: ENABLED
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-[11px]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={
              m.role === "user" ? "text-right" : "text-left text-gray-100 whitespace-pre-wrap"
            }
          >
            <div
              className={
                m.role === "user"
                  ? "inline-block bg-[#06af6e]/10 border border-[#06af6e]/30 px-3 py-2 rounded-sm text-[#e5e7eb]"
                  : "inline-block bg-black/80 border border-[#06af6e]/10 px-3 py-2 rounded-sm"
              }
            >
              {m.text}
            </div>
          </div>
        ))}
        {busy && (
          <div className="text-left text-[10px] text-[#06af6e] flex items-center gap-2">
            <Loader2 size={12} className="animate-spin" />
            Deep-thinking tactical pass…
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="border-t border-[#06af6e]/30 flex items-center gap-2 px-3 py-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-black/70 border border-[#06af6e]/20 text-[11px] text-white px-2 py-1 outline-none rounded-sm"
          placeholder="Inject scenario, threat surface, or hypothesis…"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="px-3 py-1 text-[10px] uppercase tracking-widest bg-[#06af6e]/20 border border-[#06af6e]/40 text-[#06af6e] flex items-center gap-1 rounded-sm hover:bg-[#06af6e]/30 disabled:opacity-40"
        >
          <SendHorizontal size={12} />
          Send
        </button>
      </form>
    </div>
  );
};

export default AIChat;
