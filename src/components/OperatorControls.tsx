import React, { useState } from "react";
import { AlertTriangle, RefreshCw, StopCircle, SlidersHorizontal, Flag, Eye } from "lucide-react";
import { EntropyMetrics, AxiomLogLevel } from "../types";

interface OperatorControlsProps {
  entropyMetrics: EntropyMetrics;
  onSetEntropyThreshold: (value: number) => void;
  onEmergencyStop: () => void;
  onSystemReset: () => void;
  onSetLogLevel: (level: AxiomLogLevel) => void;
  onFlagAnomaly: () => void;
  logLevel: AxiomLogLevel;
  systemStatus: string;
}

const OperatorControls: React.FC<OperatorControlsProps> = ({
  entropyMetrics,
  onSetEntropyThreshold,
  onEmergencyStop,
  onSystemReset,
  onSetLogLevel,
  onFlagAnomaly,
  logLevel,
  systemStatus,
}) => {
  const [threshold, setThreshold] = useState(entropyMetrics.entropyThreshold);
  const [level, setLevel] = useState<AxiomLogLevel>(logLevel);

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setThreshold(val);
  };

  const handleThresholdSet = () => {
    onSetEntropyThreshold(threshold);
  };

  const handleLogLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lvl = e.target.value as AxiomLogLevel;
    setLevel(lvl);
    onSetLogLevel(lvl);
  };

  return (
    <div className="p-4 border border-[#06af6e]/30 bg-black/70 rounded-sm space-y-4">
      <div className="flex items-center gap-2 mb-2 text-[#06af6e]">
        <Eye size={16} />
        <span className="text-xs font-bold uppercase tracking-widest">Operator Controls</span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-[11px]">
        <button
          className="flex items-center gap-2 px-2 py-1 bg-red-500/10 border border-red-500/30 text-red-500 rounded-sm font-bold hover:bg-red-500/20 transition"
          onClick={onEmergencyStop}
        >
          <StopCircle size={14} /> Emergency Stop
        </button>
        <button
          className="flex items-center gap-2 px-2 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-sm font-bold hover:bg-blue-500/20 transition"
          onClick={onSystemReset}
        >
          <RefreshCw size={14} /> System Reset
        </button>
        <button
          className="flex items-center gap-2 px-2 py-1 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 rounded-sm font-bold hover:bg-yellow-400/20 transition"
          onClick={onFlagAnomaly}
        >
          <Flag size={14} /> Flag Anomaly
        </button>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <SlidersHorizontal size={14} className="text-[#06af6e]" />
        <span>Entropy Threshold:</span>
          <input
            type="number"
            min={0}
            max={1}
            step={0.01}
            value={threshold}
            onChange={handleThresholdChange}
            className="w-16 px-1 py-0.5 bg-black/80 border border-[#06af6e]/20 text-[#06af6e] rounded-sm text-xs"
            aria-label="Entropy Threshold"
            title="Set entropy threshold"
            placeholder="0.5"
          />
        <button
          className="ml-2 px-2 py-1 text-xs bg-[#06af6e]/20 border border-[#06af6e]/40 text-[#06af6e] rounded-sm hover:bg-[#06af6e]/30"
          onClick={handleThresholdSet}
        >
          Set
        </button>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span>Log Level:</span>
          <select
            value={level}
            onChange={handleLogLevelChange}
            className="px-2 py-1 bg-black/80 border border-[#06af6e]/20 text-[#06af6e] rounded-sm text-xs"
            aria-label="Log Level"
            title="Select log level"
          >
          <option value="INFO">INFO</option>
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>
        </select>
      </div>
      <div className="mt-4 text-xs text-gray-400">
        <span className="font-bold text-[#06af6e]">System Status:</span> {systemStatus}
      </div>
    </div>
  );
};

export default OperatorControls;
