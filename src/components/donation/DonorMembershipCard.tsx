import React, { useState } from "react";
import {
  Award,
  Crown,
  Sparkles,
  Star,
  Heart,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  UserCheck,
  Zap,
  Info,
} from "lucide-react";

interface DonorMembershipCardProps {
  fullName?: string;
  currentAmount: number;
  donorType?: string;
  // Optional pre-existing stats for returning donors (will be fetched from backend in production)
  initialStats?: {
    isReturningDonor: boolean;
    donorId?: string;
    previousTotalAmount: number;
    previousDonationsCount: number;
    memberSince?: string;
  };
}

interface TierConfig {
  id: "general" | "silver" | "gold" | "platinum";
  title: string;
  subtitle: string;
  threshold: number;
  nextThreshold?: number;
  nextTierTitle?: string;
  badgeBg: string;
  badgeText: string;
  cardBg: string;
  cardBorder: string;
  accentGlow: string;
  icon: React.ComponentType<{ className?: string }>;
  perks: string[];
}

const TIERS: Record<string, TierConfig> = {
  general: {
    id: "general",
    title: "Community Supporter",
    subtitle: "General Donor Status",
    threshold: 0,
    nextThreshold: 5000,
    nextTierTitle: "Silver Guardian",
    badgeBg: "bg-emerald-500/20 border-emerald-400/30",
    badgeText: "text-emerald-300",
    cardBg: "from-[#00381e] via-[#014725] to-[#071527]",
    cardBorder: "border-emerald-600/40",
    accentGlow: "bg-emerald-500/15",
    icon: Heart,
    perks: [
      "Official 80G Tax Exemption Certificate",
      "Digital Certificate of Humanitarian Appreciation",
      "Quarterly Impact & Field Project Newsletter",
    ],
  },
  silver: {
    id: "silver",
    title: "Silver Guardian",
    subtitle: "Dedicated Donor Tier",
    threshold: 5000,
    nextThreshold: 20000,
    nextTierTitle: "Gold Champion",
    badgeBg: "bg-sky-500/20 border-sky-400/30",
    badgeText: "text-sky-300",
    cardBg: "from-[#0c2340] via-[#10335c] to-[#071527]",
    cardBorder: "border-sky-500/40",
    accentGlow: "bg-sky-500/20",
    icon: Star,
    perks: [
      "All Community Supporter benefits included",
      "Direct WhatsApp field updates & patient recovery briefs",
      "Annual Islah Printed Impact Magazine mailed to address",
      "Acknowledgment on Foundation Annual Honor Roll",
    ],
  },
  gold: {
    id: "gold",
    title: "Gold Champion",
    subtitle: "Distinguished Patron Tier",
    threshold: 20000,
    nextThreshold: 50000,
    nextTierTitle: "Platinum Benefactor",
    badgeBg: "bg-amber-500/20 border-amber-400/30",
    badgeText: "text-amber-300",
    cardBg: "from-[#2e1d05] via-[#4d3209] to-[#071527]",
    cardBorder: "border-amber-500/50",
    accentGlow: "bg-amber-500/25",
    icon: Award,
    perks: [
      "All Silver Guardian benefits included",
      "Personalized audited social impact dossier",
      "VIP Invitation to Annual Foundation Gala & Medical Camps",
      "Dedicated Donor Relationship Care Officer",
    ],
  },
  platinum: {
    id: "platinum",
    title: "Platinum Benefactor",
    subtitle: "Visionary Philanthropist Tier",
    threshold: 50000,
    badgeBg: "bg-purple-500/20 border-purple-400/30",
    badgeText: "text-purple-300",
    cardBg: "from-[#220e3a] via-[#37165c] to-[#071527]",
    cardBorder: "border-purple-500/50",
    accentGlow: "bg-purple-500/25",
    icon: Crown,
    perks: [
      "All Gold Champion benefits included",
      "Permanent Memorial/Honor Plaque at Islah Healthcare Unit",
      "Direct advisory dialogue with Foundation Board & Trustees",
      "Dedicated naming recognition for sponsored community initiatives",
    ],
  },
};

function determineTier(cumulativeAmount: number): TierConfig {
  if (cumulativeAmount >= 50000) return TIERS.platinum;
  if (cumulativeAmount >= 20000) return TIERS.gold;
  if (cumulativeAmount >= 5000) return TIERS.silver;
  return TIERS.general;
}

export const DonorMembershipCard: React.FC<DonorMembershipCardProps> = ({
  fullName = "Md. Aftab Alam",
  currentAmount = 0,
  donorType = "Individual",
  initialStats,
}) => {
  // Demo switch: lets the user/developer preview First-Time vs Returning Donor criteria
  const [isSimulatedReturning, setIsSimulatedReturning] = useState(false);

  // When backend is connected, this will come from user session/API
  const mockPreviousAmount = isSimulatedReturning ? 3500 : (initialStats?.previousTotalAmount || 0);
  const mockPreviousCount = isSimulatedReturning ? 2 : (initialStats?.previousDonationsCount || 0);
  const isReturning = isSimulatedReturning || (initialStats?.isReturningDonor ?? false);

  const safeCurrent = Number(currentAmount) || 0;
  const cumulativeAmount = mockPreviousAmount + safeCurrent;

  const currentTier = determineTier(cumulativeAmount);
  const TierIcon = currentTier.icon;

  // Next tier progress calculation
  const nextTarget = currentTier.nextThreshold || 50000;
  const currentBase = currentTier.threshold;
  const progressPercent = currentTier.nextThreshold
    ? Math.min(
        100,
        Math.max(10, Math.round(((cumulativeAmount - currentBase) / (nextTarget - currentBase)) * 100))
      )
    : 100;
  const amountToNext = currentTier.nextThreshold
    ? Math.max(0, currentTier.nextThreshold - cumulativeAmount)
    : 0;

  const donorDisplayName = (fullName || "Valued Contributor").trim().toUpperCase();
  const donorId = isReturning ? "Islah-DON-2024-8841" : "Islah-NEW-2025";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden text-left transition-all space-y-4 p-5 sm:p-6">
      {/* ── Section Title & Simulation Pill ── */}
      <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-100">
        <div>
          <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">
            Donor Recognition &amp; Status
          </span>
          <h4 className="text-base font-black text-slate-900 flex items-center gap-1.5 mt-0.5">
            <UserCheck className="w-4 h-4 text-brand-green" />
            <span>Donor Membership Pass</span>
          </h4>
        </div>

        {/* Interactive toggle for previewing criteria */}
        <button
          type="button"
          onClick={() => setIsSimulatedReturning(!isSimulatedReturning)}
          className="text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-brand-green border-slate-200 hover:border-brand-green/30"
          title="Click to toggle between New Donor and Returning Donor criteria preview"
        >
          <Zap className="w-3 h-3 text-brand-orange" />
          <span>{isReturning ? "Returning Donor Mode" : "First-Time Donor Mode"}</span>
        </button>
      </div>

      {/* ── Visual Digital Card (Apple Wallet / VIP Card Style) ── */}
      <div
        className={`relative rounded-2xl bg-gradient-to-br ${currentTier.cardBg} border ${currentTier.cardBorder} text-white p-5 shadow-lg overflow-hidden transition-all duration-300`}
      >
        {/* Ambient background glow & holographic circle artwork */}
        <div
          className={`absolute -top-12 -right-12 w-40 h-40 ${currentTier.accentGlow} rounded-full blur-2xl pointer-events-none`}
        />
        <div className="absolute top-1/2 -right-6 w-32 h-32 border border-white/10 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 -right-12 w-44 h-44 border border-white/5 rounded-full pointer-events-none" />

        {/* Card Header: Brand Crest + Tier Pill */}
        <div className="relative z-10 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white">
              <TierIcon className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <span className="text-[11px] font-black tracking-wider text-white block leading-none">
                ISLAH WELFARE
              </span>
              <span className="text-[8px] font-bold tracking-[0.2em] text-emerald-200/90 block mt-0.5">
                HONORARY PATRON
              </span>
            </div>
          </div>

          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-extrabold uppercase tracking-wide backdrop-blur-xs ${currentTier.badgeBg} ${currentTier.badgeText}`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{currentTier.title}</span>
          </div>
        </div>

        {/* Card Middle: Chip graphic & Donor Name */}
        <div className="relative z-10 my-4 space-y-1">
          <div className="flex items-center gap-2">
            {/* Golden Chip Graphic */}
            <div className="w-9 h-6 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-inner border border-amber-300/60 relative overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-2 divide-x divide-amber-700/30 opacity-60">
                <div className="border-b border-amber-700/30" />
                <div className="border-b border-amber-700/30" />
              </div>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-slate-300 opacity-80">
              {donorId}
            </span>
          </div>

          <div className="pt-1">
            <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-300 block">
              Cardholder / Contributor
            </span>
            <div className="text-base sm:text-lg font-black tracking-wide text-white truncate drop-shadow-xs font-mono">
              {donorDisplayName}
            </div>
          </div>
        </div>

        {/* Card Footer: Cumulative Impact + Donor Category */}
        <div className="relative z-10 pt-2 border-t border-white/15 grid grid-cols-3 gap-2 text-[10px]">
          <div>
            <span className="text-slate-300 block text-[9px] uppercase">Category</span>
            <span className="font-bold text-white block mt-0.5">{donorType}</span>
          </div>
          <div>
            <span className="text-slate-300 block text-[9px] uppercase">This Gift</span>
            <span className="font-bold text-emerald-300 block mt-0.5">
              ₹{safeCurrent.toLocaleString("en-IN")}
            </span>
          </div>
          <div>
            <span className="text-slate-300 block text-[9px] uppercase">
              {isReturning ? "Lifetime Total" : "Status"}
            </span>
            <span className="font-bold text-amber-300 block mt-0.5 truncate">
              {isReturning ? `₹${cumulativeAmount.toLocaleString("en-IN")}` : "Active Patron"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Criteria & Lifetime Context Breakdown ── */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-slate-700 uppercase tracking-wide text-[10px]">
            Tier Criteria &amp; Progress
          </span>
          <span className="text-[11px] font-bold text-slate-500">
            {isReturning ? (
              <span className="text-emerald-700 font-bold">
                {mockPreviousCount} past donation{mockPreviousCount > 1 ? "s" : ""} recorded
              </span>
            ) : (
              <span className="text-slate-500">First-time contribution</span>
            )}
          </span>
        </div>

        {/* Progress to next tier */}
        {currentTier.nextThreshold ? (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-600 flex items-center gap-1 text-[11px]">
                <TrendingUp className="w-3.5 h-3.5 text-brand-green" />
                <span>
                  Next Tier: <strong>{currentTier.nextTierTitle}</strong>
                </span>
              </span>
              <span className="text-slate-700 font-bold text-[11px]">
                {amountToNext === 0
                  ? "Achieved!"
                  : `₹${amountToNext.toLocaleString("en-IN")} away`}
              </span>
            </div>

            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-green to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-[10px] text-slate-500 leading-tight">
              {amountToNext > 0 ? (
                <>
                  Contributing an additional{" "}
                  <strong className="text-brand-green font-bold">
                    ₹{amountToNext.toLocaleString("en-IN")}
                  </strong>{" "}
                  elevates you to{" "}
                  <strong className="text-slate-700">{currentTier.nextTierTitle}</strong> status.
                </>
              ) : (
                <span className="text-emerald-600 font-bold">
                  Congratulations! This contribution unlocks {currentTier.nextTierTitle} privileges.
                </span>
              )}
            </p>
          </div>
        ) : (
          <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 flex items-center gap-2">
            <Crown className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="font-semibold text-[11px]">
              Highest Tier Achieved: Thank you for your visionary leadership and philanthropy!
            </span>
          </div>
        )}

        {/* Tier Privileges Checklist */}
        <div className="pt-2 border-t border-slate-200/70 space-y-1.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
            {currentTier.title} Privileges:
          </span>
          <ul className="space-y-1 text-xs text-slate-600">
            {currentTier.perks.map((perk, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                <span className="text-[11px]">{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
