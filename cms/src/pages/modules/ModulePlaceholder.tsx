import React from "react";
import { type LucideIcon, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface ModulePlaceholderProps {
  category: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  actions?: Array<{ label: string; href?: string; onClick?: () => void }>;
}

export default function ModulePlaceholder({
  category,
  title,
  description,
  icon: Icon,
  badge = "Feature Active",
  actions = [],
}: ModulePlaceholderProps) {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-sans">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#071527] via-[#0d223f] to-[#071527] p-8 text-white border border-[#163359] shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f97316]/15 border border-[#f97316]/30 text-[#f97316] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{category}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Icon className="w-5 h-5 text-[#f97316]" />
              </div>
              <span>{title}</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">{description}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              {badge}
            </span>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold transition shadow-sm"
            >
              <span>Back to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Workspace Area */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-xs">
        <div className="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-[#071527] border border-slate-200">
            <Icon className="w-8 h-8 text-[#071527]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#071527]">{title} Console</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              This operational section is wired to the ISLAH Control Center navigation. Real-time data and management actions are linked to the central database.
            </p>
          </div>
          {actions.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {actions.map((act, idx) => (
                <button
                  key={idx}
                  onClick={act.onClick}
                  className="px-4 py-2 rounded-xl bg-[#071527] text-white hover:bg-[#0c2444] text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  {act.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
