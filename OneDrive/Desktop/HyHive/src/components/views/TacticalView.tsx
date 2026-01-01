import React from "react";
import AIChat from "../AIChat";
import { Cpu, AlertTriangle, Zap } from "lucide-react";

const TacticalView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      <div className="lg:col-span-9 flex flex-col h-full">
        <AIChat />
      </div>

      <div className="lg:col-span-3 flex flex-col gap-6">
        <section className="bg-[#06af6e]/5 border border-[#06af6e]/20 p-5 brutalist-border">
          <div className="flex items-center gap-2 mb-4 text-[#06af6e]">
            <Cpu size={18} />
            <h3 className="text-xs font-bold uppercase tracking-widest">Protocol Pro-3</h3>
          </div>
          <p className="text-[10px] text-gray-500 leading-relaxed mb-4">
            Utilizing <span className="text-[#06af6e]">gemini-3-pro-preview</span>
            for high-complexity analysis. Thinking budget configured at
            <span className="text-[#06af6e]">32,768</span> tokens for structural reasoning and Omega
            Invariant verification.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-[9px] uppercase font-bold text-gray-600">
              <span>Thinking Budget</span>
              <span className="text-white">32,768 T</span>
            </div>
            <div className="h-1 bg-white/5 w-full">
              <div className="h-full bg-blue-500" style={{ width: "100%" }} />
            </div>
          </div>
        </section>

        <section className="bg-red-500/5 border border-red-500/20 p-5 brutalist-border">
          <div className="flex items-center gap-2 mb-4 text-red-500">
            <AlertTriangle size={18} />
            <h3 className="text-xs font-bold uppercase tracking-widest">Safety Limit</h3>
          </div>
          <p className="text-[10px] text-gray-500 leading-relaxed">
            All tactical outputs are bound to the Zero-Entropy Law. Hallucination thresholds are
            monitored at sub-nanosecond latency with immediate kernel veto on non-deterministic
            branches.
          </p>
        </section>

        <div className="mt-auto p-4 border border-[#3b82f6]/20 bg-[#3b82f6]/5 rounded-sm">
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <Zap size={14} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Cognition State</span>
          </div>
          <div className="text-[11px] text-gray-400">
            Superposition Stable.
            <br />
            Model: G3-Pro
            <br />
            Deep Thinking: ENABLED
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticalView;
