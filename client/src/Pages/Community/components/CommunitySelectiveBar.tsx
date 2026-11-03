import { Users, Heart, Building2, UserCheck, LayoutGrid } from "lucide-react";
import { COMMUNITY_STATS } from "../communityData";

export type CommunityTab = "overview" | "members" | "donors" | "partners" | "volunteers";

interface CommunitySelectiveBarProps {
  activeTab: CommunityTab;
  onTabChange: (tab: CommunityTab) => void;
}

export function CommunitySelectiveBar({
  activeTab,
  onTabChange,
}: CommunitySelectiveBarProps) {
  const tabs = [
    {
      id: "overview" as CommunityTab,
      label: "Overview",
      badge: "Hub",
      icon: LayoutGrid,
    },
    {
      id: "members" as CommunityTab,
      label: "Members",
      badge: COMMUNITY_STATS.membersCount,
      icon: Users,
    },
    {
      id: "donors" as CommunityTab,
      label: "Donors",
      badge: COMMUNITY_STATS.donorsCount,
      icon: Heart,
    },
    {
      id: "partners" as CommunityTab,
      label: "Partners & Sponsors",
      badge: COMMUNITY_STATS.partnersCount,
      icon: Building2,
    },
    {
      id: "volunteers" as CommunityTab,
      label: "Volunteers & Mentors",
      badge: COMMUNITY_STATS.volunteersCount,
      icon: UserCheck,
    },
  ];

  return (
    <div className="w-full bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onTabChange(t.id)}
                className={`group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? "bg-[#071527] text-white shadow-md shadow-slate-900/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? "text-brand-orange" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
                <span>{t.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold tracking-tight transition-colors ${
                    isActive
                      ? "bg-brand-orange text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                  }`}
                >
                  {t.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

