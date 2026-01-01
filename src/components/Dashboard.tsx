import React, { useState } from "react";
import Sidebar from "./Sidebar";
import OverviewView from "./views/OverviewView";
import TacticalView from "./views/TacticalView";
import IntelView from "./views/IntelView";
import KernelView from "./views/KernelView";
import { UserCheck } from "lucide-react";
import { PageId } from "../types";

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>("overview");

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

        <div className="flex-1 overflow-auto p-6">{renderPage()}</div>
      </main>
    </div>
  );
};

export default Dashboard;