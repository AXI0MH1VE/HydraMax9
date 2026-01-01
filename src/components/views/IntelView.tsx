import React, { useState } from "react";
import { gemini } from "../../services/geminiService";
import { Search, Globe, ExternalLink, Zap } from "lucide-react";

const IntelView: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    text: string;
    sources: Array<{ web?: { title?: string; uri?: string } }>;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await gemini.searchIntel(query);
      setResult(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 flex-1">
        <section className="bg-black/60 border border-[#06af6e]/30 p-8 rounded-sm brutalist-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#06af6e]/10 rounded-sm">
              <Globe className="text-[#06af6e]" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tighter uppercase">
                Search Grounding Unit
              </h2>
              <p className="text-xs text-[#06af6e]/60 font-bold uppercase tracking-widest">
                Real-time External Intelligence
              </p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="relative">
            <input
              className="w-full bg-black/80 border-2 border-[#06af6e]/20 p-4 pr-16 text-white font-mono text-sm outline-none focus:border-[#06af6e]/60 transition-all rounded-sm"
              placeholder="ENTER_INTEL_QUERY..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#06af6e] hover:text-white transition-colors"
            >
              {loading ? (
                <Zap className="animate-spin" size={20} />
              ) : (
                <Search size={20} />
              )}
            </button>
          </form>

          <div className="mt-4 flex items-center gap-4">
            <span className="text-[9px] text-gray-600 font-bold uppercase">
              Model: Gemini 3 Flash
            </span>
            <span className="text-[9px] text-[#06af6e] font-bold uppercase">
              Grounding: Google Search
            </span>
          </div>
          {error && (
            <div className="mt-3 text-[10px] text-red-400 font-mono">
              AXIOM_FAULT: {error}
            </div>
          )}
        </section>

        {result && (
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-black/40 border border-[#06af6e]/20 p-6 rounded-sm">
              <div className="mb-4 text-[10px] text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <Zap size={12} /> Intelligence Payload
              </div>
              <div className="text-sm text-gray-200 leading-relaxed font-mono whitespace-pre-wrap">
                {result.text}
              </div>
            </div>

            {result.sources && result.sources.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.sources.map(
                  (chunk, idx) =>
                    chunk.web && (
                      <a
                        key={idx}
                        href={chunk.web.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/60 border border-[#06af6e]/10 p-4 rounded-sm hover:border-[#06af6e]/40 transition-all group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="p-1 bg-blue-500/10 rounded-sm">
                            <Globe size={14} className="text-blue-400" />
                          </div>
                          <ExternalLink
                            size={12}
                            className="text-gray-600 group-hover:text-[#06af6e]"
                          />
                        </div>
                        <h4 className="text-[11px] font-bold text-gray-300 group-hover:text-white line-clamp-2">
                          {chunk.web.title || "Untitled source"}
                        </h4>
                        <p className="text-[9px] text-gray-600 mt-2 truncate font-mono">
                          {chunk.web.uri}
                        </p>
                      </a>
                    )
                )}
              </div>
            )}
          </div>
        )}

        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-[#06af6e]">
            <div className="w-12 h-12 border-2 border-t-[#06af6e] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
              Scanning_Global_Streams...
            </span>
          </div>
        )}

        {!result && !loading && !error && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center opacity-20 select-none">
              <Globe size={120} className="mx-auto mb-4 text-[#06af6e]" />
              <p className="text-xs font-bold uppercase tracking-[0.5em]">
                Awaiting Instruction
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntelView;