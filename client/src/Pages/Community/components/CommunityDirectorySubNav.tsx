import { Users, Heart, Handshake, GraduationCap, LayoutGrid } from "lucide-react";
import type { CommunityTab } from "./CommunitySelectiveBar";

interface CommunityDirectorySubNavProps {
  activeTab: CommunityTab;
  onSwitchTab: (tab: CommunityTab) => void;
}

export function CommunityDirectorySubNav({
  activeTab,
  onSwitchTab,
}: CommunityDirectorySubNavProps) {
  const tabs = [
    {
      id: "members" as const,
      label: "Members",
      icon: Users,
    },
    {
      id: "donors" as const,
      label: "Donors",
      icon: Heart,
    },
    {
      id: "partners" as const,
      label: "Partners & Sponsors",
      icon: Handshake,
    },
    {
      id: "volunteers" as const,
      label: "Volunteers & Mentors",
      icon: GraduationCap,
    },
  ];

  return (
    <div className="w-full bg-[#f8fafc] border-b border-[#cfe1f3]/80 py-4 mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Tab Pills */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSwitchTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? "bg-[#071527] text-white shadow-sm ring-2 ring-[#071527]/20 scale-[1.02]"
                      : "bg-[#f0f6fc] hover:bg-[#e4effa] text-slate-700 hover:text-[#071527] border border-[#cfe1f3] hover:border-[#1c558c]/40 hover:-translate-y-0.5 shadow-2xs"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-white" : "text-[#1c558c]"
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick return to overview */}
          <button
            onClick={() => onSwitchTab("overview")}
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#071527] px-3.5 py-2 rounded-xl bg-white hover:bg-[#f0f6fc] border border-[#cfe1f3] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-2xs"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#1c558c]" />
            <span>&larr; Overview Hub</span>
          </button>
        </div>
      </div>
    </div>
  );
}
