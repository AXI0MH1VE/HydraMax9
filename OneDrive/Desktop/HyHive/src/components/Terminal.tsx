import React, { useCallback, useEffect, useRef, useState } from "react";
import { gemini } from "../services/geminiService";

interface TerminalEntry {
  id: string;
  type: "input" | "output" | "system";
  text: string;
}

const PROMPT = "A H Y D R A ▷ ";

const Terminal: React.FC = () => {
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      id: "intro-1",
      type: "system",
      text: "HYPERION DSI KERNEL ONLINE // ΔS=0 // FIXED POINT: ALEXIS ADAMS",
    },
  ]);
  const [current, setCurrent] = useState("");
  const [busy, setBusy] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [entries, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!current.trim() || busy) return;

    const cmd = current.trim();
    setCurrent("");
    setBusy(true);
    setEntries((prev) => [
      ...prev,
      { id: `in-${Date.now()}`, type: "input", text: cmd },
    ]);

    if (cmd === "clear") {
      setEntries([]);
      setBusy(false);
      return;
    }

    try {
      const resp = await gemini.processKernelCommand(cmd);
      setEntries((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          text: resp,
        },
      ]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setEntries((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          type: "system",
          text: `AXIOM_FAULT: ${msg}`,
        },
      ]);
    } finally {
      setBusy(false);
      scrollToBottom();
    }
  };

  return (
    <div className="h-full flex flex-col font-mono text-[11px] text-green-300">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto bg-black/80 p-3 space-y-1"
      >
        {entries.map((e) => (
          <div key={e.id}>
            {e.type === "input" && (
              <div>
                <span className="text-[#06af6e]">{PROMPT}</span>
                <span>{e.text}</span>
              </div>
            )}
            {e.type === "output" && (
              <pre className="whitespace-pre-wrap text-gray-100">{e.text}</pre>
            )}
            {e.type === "system" && (
              <div className="text-[10px] text-blue-300">{e.text}</div>
            )}
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="border-t border-[#06af6e]/40 bg-black/90 flex items-center px-3 py-2"
      >
        <span className="text-[#06af6e] mr-2">{PROMPT}</span>
        <input
          ref={inputRef}
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          className="flex-1 bg-transparent outline-none text-[11px] text-white"
          autoComplete="off"
          disabled={busy}
        />
        {busy && (
          <span className="ml-2 text-[9px] text-[#06af6e] animate-pulse">
            Deep_Thinking…
          </span>
        )}
      </form>
    </div>
  );
};

export default Terminal;