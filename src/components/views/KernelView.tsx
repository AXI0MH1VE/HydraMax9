import React from "react";
import Terminal from "../Terminal";
import { Terminal as TerminalIcon, Info, Cpu } from "lucide-react";

const KernelView: React.FC = () => {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex-1 border-2 border-[#06af6e]/40 bg-black/60 relative flex flex-col brutalist-border overflow-hidden crt-scanlines">
        <div className="bg-[#06af6e]/10 px-4 py-2 text-[10px] flex justify-between items-center border-b border-[#06af6e]/20 text-[#06af6e]">
          <div className="flex items-center gap-2">
            <TerminalIcon size={14} />
            <span className="font-bold tracking-[0.3em] uv-glow uppercase">
              Hyperion DSI Kernel Shell
            </span>
          </div>
          <div className="flex gap-4">
            <span className="opacity-50">NODE: RT-77</span>
            <span className="opacity-50">ENTROPY: ΔS=0</span>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <Terminal />
        </div>
      </div>

      <div className="h-24 grid grid-cols-3 gap-4">
        <div className="bg-black/40 border border-[#06af6e]/20 p-3 rounded-sm flex items-center gap-3">
          <div className="p-2 bg-[#06af6e]/10 rounded-sm text-[#06af6e]">
            <Info size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-500 uppercase font-bold">
              Bit Integrity
            </span>
            <span className="text-[10px] text-white font-mono">
              BIT_PERFECT_GUARANTEED
            </span>
          </div>
        </div>
        <div className="bg-black/40 border border-[#06af6e]/20 p-3 rounded-sm flex items-center gap-3">
          <div className="p-2 bg-[#06af6e]/10 rounded-sm text-[#06af6e]">
            <TerminalIcon size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-500 uppercase font-bold">
              Latency Mode
            </span>
            <span className="text-[10px] text-white font-mono">
              0.00ms_INVARIANT
            </span>
          </div>
        </div>
        <div className="bg-black/40 border border-[#06af6e]/20 p-3 rounded-sm flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-sm text-blue-400">
            <Cpu size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-500 uppercase font-bold">
              Inference Engine
            </span>
            <span className="text-[10px] text-white font-mono">
              G3_PRO_KERNEL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KernelView;