import React from "react";
import { LayoutDashboard, ShieldCheck, Globe, Terminal as TerminalIcon, Cpu } from "lucide-react";
import { PageId } from "../types";

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const navItems = [
    { id: "overview" as PageId, label: "Overview", icon: LayoutDashboard },
    { id: "tactical" as PageId, label: "Tactical Intel", icon: Cpu },
    { id: "intel" as PageId, label: "Intel Search", icon: Globe },
    { id: "kernel" as PageId, label: "Kernel Access", icon: TerminalIcon },
  ];

  return (
    <div className="w-20 md:w-64 h-full border-r border-[#06af6e]/20 flex flex-col bg-black/80 brutalist-border relative z-50">
      <div className="p-6 mb-8">
        <div className="relative h-12 w-12 md:h-16 md:w-full flex items-center justify-center md:justify-start">
          <div className="md:hidden text-2xl font-black text-[#06af6e] uv-glow">AA</div>
          <div className="hidden md:block">
            <div className="text-xl font-black uv-glow tracking-tighter text-[#06af6e]">
              AXIOM HIVE
            </div>
            <div className="text-[8px] tracking-[0.4em] opacity-40 font-bold">DETERMINISM</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-sm transition-all group ${
              activePage === item.id
                ? "bg-[#06af6e]/10 border border-[#06af6e]/30 text-[#06af6e]"
                : "text-gray-500 hover:text-[#06af6e] hover:bg-[#06af6e]/5 border border-transparent"
            }`}
          >
            <item.icon size={20} className={activePage === item.id ? "uv-glow" : ""} />
            <span className="hidden md:block text-xs font-bold uppercase tracking-widest">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-[#06af6e]/5 border border-[#06af6e]/10 p-3 rounded-sm hidden md:block">
          <div className="flex items-center gap-2 mb-2 text-[#06af6e]">
            <ShieldCheck size={14} />
            <span className="text-[9px] font-bold uppercase">Safe State</span>
          </div>
          <div className="text-[8px] text-gray-500 leading-tight font-mono">
            ΔS = 0
            <br />
            Beta = 0.0839
            <br />
            Substrate: ACTIVE
          </div>
        </div>
        <div className="md:hidden flex justify-center">
          <ShieldCheck size={20} className="text-[#06af6e]/40" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
