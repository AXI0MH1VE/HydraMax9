import React, { useState } from "react";

import Sidebar from "./Sidebar";
import OverviewView from "./views/OverviewView";
import TacticalView from "./views/TacticalView";
import IntelView from "./views/IntelView";
import KernelView from "./views/KernelView";
import OperatorControls from "./OperatorControls";
import { UserCheck } from "lucide-react";
import { PageId, EntropyMetrics, AxiomLogLevel } from "../types";


const DEFAULT_ENTROPY: EntropyMetrics = {
  currentEntropy: 0,
  averageEntropy: 0,
  entropyThreshold: 0.1,
  violations: 0,
};

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>("overview");
  const [entropyMetrics, setEntropyMetrics] = useState<EntropyMetrics>(DEFAULT_ENTROPY);
  const [logLevel, setLogLevel] = useState<AxiomLogLevel>("INFO");
  const [systemStatus, setSystemStatus] = useState<string>("AXIOMATIC");

  // Operator control handlers
  const handleSetEntropyThreshold = (value: number) => {
    setEntropyMetrics((prev) => ({ ...prev, entropyThreshold: value }));
    setSystemStatus(`Entropy threshold set to ${value}`);
  };
  const handleEmergencyStop = () => {
    setSystemStatus("EMERGENCY STOP: AI HALTED");
    // Additional logic to halt AI subsystems would go here
  };
  const handleSystemReset = () => {
    setSystemStatus("System reset triggered");
    // Additional logic to reset system state would go here
  };
  const handleSetLogLevel = (level: AxiomLogLevel) => {
    setLogLevel(level);
    setSystemStatus(`Log level set to ${level}`);
  };
  const handleFlagAnomaly = () => {
    setSystemStatus("Manual anomaly flagged by operator");
    // Additional logic to flag anomaly would go here
  };

  const renderPage = () => {
    switch (currentPage) {
      case "overview":
        return <OverviewView />;
      case "tactical":
        return <TacticalView />;
      case "intel":
        return <IntelView />;
      case "kernel":
        return <KernelView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#020202]">
      <Sidebar activePage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-[#06af6e]/20 flex items-center justify-between px-8 bg-black/40">
          <div className="flex flex-col">
            <h1 className="text-lg font-extrabold uv-glow tracking-tighter text-[#06af6e] uppercase">
              {currentPage.replace("_", " ")}
            </h1>
            <span className="text-[9px] text-[#06af6e]/40 tracking-[0.3em] font-bold">
              SUBSTRATE_ACCESS_NODE_01
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-gray-500 uppercase tracking-widest text-[8px]">
                Supervisor
              </span>
              <span className="text-[10px] font-bold text-white flex items-center gap-1">
                <UserCheck size={10} className="text-[#06af6e]" /> ALEXIS ADAMS
              </span>
            </div>
            <div className="h-8 w-px bg-[#06af6e]/20" />
            <div className="flex flex-col items-end">
              <span className="text-gray-500 uppercase tracking-widest text-[8px]">
                Status
              </span>
              <span className="text-[10px] font-bold text-[#06af6e] animate-pulse">
                AXIOMATIC
              </span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3">{renderPage()}</div>
          <div className="xl:col-span-1">
            <OperatorControls
              entropyMetrics={entropyMetrics}
              onSetEntropyThreshold={handleSetEntropyThreshold}
              onEmergencyStop={handleEmergencyStop}
              onSystemReset={handleSystemReset}
              onSetLogLevel={handleSetLogLevel}
              onFlagAnomaly={handleFlagAnomaly}
              logLevel={logLevel}
              systemStatus={systemStatus}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;