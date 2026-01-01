import React from "react";
import NeuralGraph from "../NeuralGraph";
import PerformanceMonitor from "../PerformanceMonitor";
import SecurityModule from "../SecurityModule";
import { Activity, Layers, Shield } from "lucide-react";

const OverviewView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="flex-1 min-h-[400px] border-2 border-[#06af6e]/40 bg-black/20 relative rounded-sm brutalist-border overflow-hidden crt-scanlines">
          <div className="absolute top-2 left-4 z-10 flex items-center gap-2 bg-[#020202] px-2 py-1 border border-[#06af6e]/20">
            <Layers size={12} className="text-[#06af6e]" />
            <span className="text-[9px] uppercase font-bold text-[#06af6e]">
              DETERMINISTIC_STATE_PROJECTION [β=0.0839]
            </span>
          </div>
          <NeuralGraph />
          <div className="absolute bottom-4 right-4 text-[40px] font-black opacity-10 select-none pointer-events-none text-[#06af6e]">
            AXIOM
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 flex flex-col gap-6">
        <section className="flex-1 border border-[#06af6e]/30 p-4 bg-black/40 overflow-y-auto brutalist-border">
          <div className="flex items-center gap-2 mb-4 border-b border-[#06af6e]/20 pb-2 text-[#06af6e]">
            <Activity size={16} />
            <h2 className="text-xs font-bold uppercase tracking-[0.2em]">
              Log-Quadric Telemetry
            </h2>
          </div>
          <PerformanceMonitor />
        </section>

        <section className="h-[280px] border border-[#06af6e]/30 bg-black/40 p-4 brutalist-border overflow-hidden">
          <div className="flex items-center gap-2 mb-4 border-b border-[#06af6e]/20 pb-2">
            <Shield size={16} className="text-white" />
            <h2 className="text-xs font-bold uppercase tracking-[0.2em]">
              ZEL Events
            </h2>
          </div>
          <SecurityModule />
        </section>
      </div>
    </div>
  );
};

export default OverviewView;