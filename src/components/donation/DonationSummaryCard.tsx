import React from "react";
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BadgeCheck,
  Lock,
  FileCheck,
  Award,
  Star,
  Wallet,
  Phone,
  Mail,
  Receipt,
  Gift,
  ArrowUpRight,
  Info,
} from "lucide-react";

interface DonationSummaryCardProps {
  financialType: string;
  frequency: string;
  amount: number;
  recurringPledge?: boolean;
  pledgeMonths?: string;
  donorType: string;
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  taxExemption: boolean;
  pan?: string;
  contextPatient?: { name: string; slug?: string } | null;
  onProceed?: () => void;
}

const CAUSE_IMPACTS: Record<string, string> = {
  "Medical Emergency": "100% of your gift provides urgent ICU care, surgeries, and life-saving medications for critical patients.",
  "Education & Learning": "Directly funds school tuition, books, uniforms, and digital learning kits for underprivileged students.",
  "Health Care & Well-being": "Powers free community health clinics, maternal healthcare, and routine medical checkups.",
  "Women & Youth Empowerment": "Supports vocational skill workshops, sewing programs, and youth employment drives.",
  "Skills, Livelihoods & Entrepreneurship": "Provides micro-grants, artisan tools, and livelihood training to create sustainable family incomes.",
  "Social Justice & Legal Empowerment": "Offers pro-bono legal advocacy and civic rights assistance to vulnerable communities.",
  "Agriculture & Rural Livelihoods": "Equips rural farmers with water pumps, organic seeds, and sustainable farming tools.",
  "Environment & Sustainability": "Drives tree plantation, clean drinking water systems, and solar community lighting.",
  "Humanitarian Relief & Rehabilitation": "Delivers emergency food rations, warm blankets, and disaster relief packs.",
  "General Donation": "Allocated where the need is greatest across all Islah community development programs.",
  "Capital Donation": "Contributes to permanent community infrastructure, medical centers, and school buildings.",
};

function getDonorTier(amount: number) {
  if (amount >= 50000) return { label: "Platinum Benefactor", color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200", icon: Sparkles };
  if (amount >= 20000) return { label: "Gold Champion", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", icon: Award };
  if (amount >= 5000) return { label: "Silver Guardian", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", icon: Star };
  return { label: "Community Supporter", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", icon: Heart };
}

export const DonationSummaryCard: React.FC<DonationSummaryCardProps> = ({
  financialType,
  frequency,
  amount,
  recurringPledge,
  pledgeMonths,
  donorType,
  fullName,
  email,
  phone,
  countryCode,
  taxExemption,
  pan,
  contextPatient,
}) => {
  const safeAmount = Number(amount) || 0;
  const formattedAmount = `₹${safeAmount.toLocaleString("en-IN")}`;
  const taxDeduction = safeAmount > 0 ? `₹${Math.round(safeAmount * 0.5).toLocaleString("en-IN")}` : "₹0";
  const tier = getDonorTier(safeAmount);
  const TierIcon = tier.icon;
  const impactText =
    CAUSE_IMPACTS[financialType] ||
    "Every rupee directly strengthens underprivileged communities and transforms lives.";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden text-left transition-all">
      {/* ── Top Header Banner with Brand Color Gradient ── */}
      <div className="bg-gradient-to-r from-[#071527] via-[#0b2440] to-[#071527] text-white p-5 sm:p-6 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-extrabold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Donation Summary
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
              <ShieldCheck className="w-3.5 h-3.5" /> 80G Tax Eligible
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              Review Your Contribution
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Live breakdown of your donation before payment completion.
            </p>
          </div>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* ── Hero Amount Block (Symmetrical & Eye-Catching) ── */}
        <div className="bg-gradient-to-br from-[#00381e] via-[#005a30] to-[#014725] rounded-2xl p-5 text-white shadow-lg shadow-emerald-950/20 relative overflow-hidden text-center">
          {/* Subtle background ring artwork */}
          <div className="absolute -right-8 -top-8 w-28 h-28 border border-white/10 rounded-full pointer-events-none" />
          <div className="absolute -right-4 -top-4 w-20 h-20 border border-white/10 rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between text-xs text-emerald-200">
              <span className="uppercase tracking-widest font-extrabold text-[10px] text-emerald-300 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5" /> Total Gift Amount
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-white font-bold text-[11px]">
                {frequency === "One Time" ? "One-Time Gift" : `${frequency} Support`}
              </span>
            </div>

            {/* Giant Amount */}
            <div className="py-1">
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-sm">
                {formattedAmount}
              </div>
              <p className="text-[11px] text-emerald-200 font-medium mt-1">
                Zero Platform Fees • 100% Transferred to Beneficiaries
              </p>
            </div>

            {/* Symmetrical Dual Stats Bar */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-emerald-400/20 text-left">
              <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
                <span className="text-[10px] text-emerald-300 block uppercase font-extrabold">
                  80G Tax Benefit
                </span>
                <span className="text-xs font-black text-white block mt-0.5">
                  Save ~{taxDeduction}
                </span>
                <span className="text-[9px] text-emerald-200 block">50% exemption</span>
              </div>

              <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
                <span className="text-[10px] text-emerald-300 block uppercase font-extrabold flex items-center gap-1">
                  <TierIcon className="w-3 h-3 text-amber-300" /> Donor Tier
                </span>
                <span className="text-xs font-black text-white block mt-0.5 truncate">
                  {tier.label}
                </span>
                <span className="text-[9px] text-emerald-200 block">Honored Partner</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Cause / Beneficiary Highlight ── */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-2 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">
              Selected Cause &amp; Mission
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Verified Need
            </span>
          </div>

          <div className="space-y-1">
            <div className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-green shrink-0" />
              {financialType || "Medical Emergency"}
            </div>
            {contextPatient && (
              <div className="text-xs font-semibold text-brand-orange pl-4">
                Beneficiary: Patient {contextPatient.name}
              </div>
            )}
            <p className="text-xs text-slate-600 leading-relaxed pl-4">
              {impactText}
            </p>
          </div>
        </div>

        {/* ── Symmetrical Summary Breakdown Grid ── */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 bg-white shadow-xs">
          {/* Row 1: Donor & Type */}
          <div className="grid grid-cols-2 p-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">Donor Name</span>
              <span className="font-bold text-slate-800 truncate block mt-0.5">
                {fullName || "Anonymous Contributor"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">Donor Category</span>
              <span className="font-bold text-slate-800 block mt-0.5">
                {donorType || "Individual"}
              </span>
            </div>
          </div>

          {/* Row 2: Contact & Channel */}
          <div className="grid grid-cols-2 p-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">Email Address</span>
              <span className="font-bold text-slate-800 truncate block mt-0.5">
                {email || "Will be prompted"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">Mobile Number</span>
              <span className="font-bold text-slate-800 block mt-0.5">
                {phone ? `${countryCode} ${phone}` : "Will be prompted"}
              </span>
            </div>
          </div>

          {/* Row 3: Tax Exemption & PAN */}
          <div className="grid grid-cols-2 p-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">80G Exemption</span>
              <span className="font-bold text-brand-green block mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                {taxExemption ? "Claimed (100% Eligible)" : "Optional"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">PAN Status</span>
              <span className="font-bold text-slate-800 block mt-0.5 font-mono">
                {taxExemption && pan ? pan.toUpperCase() : taxExemption ? "Pending Input" : "Not Provided"}
              </span>
            </div>
          </div>

          {/* Row 4: Recurring Pledge & Frequency */}
          {frequency !== "One Time" && (
            <div className="grid grid-cols-2 p-3 text-xs bg-emerald-50/40">
              <div>
                <span className="text-slate-500 block text-[11px] font-medium">Recurring Frequency</span>
                <span className="font-bold text-brand-green block mt-0.5">
                  {frequency}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-medium">Pledge Duration</span>
                <span className="font-bold text-slate-800 block mt-0.5">
                  {recurringPledge ? pledgeMonths || "12 Months" : "Continuous"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ── Official Post-Payment Receipt Guarantee (Direct User Fulfillment) ── */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-sky-50 border border-emerald-200/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-green text-white flex items-center justify-center shrink-0 shadow-xs">
              <Receipt className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <span>Official Receipt Generated Post-Payment</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-1.5 py-0.2 rounded">
                  80G Certified
                </span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                To guarantee complete financial integrity, your official receipt with permanent Receipt ID, government 80G/12A registration numbers, digital seal, and verification QR code will be generated immediately after your payment completes.
              </p>
            </div>
          </div>

          {/* Symmetrical 3-pillar receipt delivery guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-center text-[10px] text-slate-700 font-bold">
            <div className="bg-white/80 border border-emerald-100 rounded-lg p-2 flex flex-col items-center gap-1 shadow-2xs">
              <FileCheck className="w-4 h-4 text-brand-green" />
              <span>Instant PDF</span>
            </div>
            <div className="bg-white/80 border border-emerald-100 rounded-lg p-2 flex flex-col items-center gap-1 shadow-2xs">
              <Mail className="w-4 h-4 text-sky-600" />
              <span>Email Delivery</span>
            </div>
            <div className="bg-white/80 border border-emerald-100 rounded-lg p-2 flex flex-col items-center gap-1 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>IT Act 80G</span>
            </div>
          </div>
        </div>

        {/* ── Trust, Encryption & NGO Governance Badges ── */}
        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-bold border-t border-slate-100">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-600" /> 256-Bit SSL
          </span>
          <span className="flex items-center gap-1.5">
            <BadgeCheck className="w-3.5 h-3.5 text-blue-600" /> Verified NGO
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" /> Zero Fee
          </span>
        </div>
      </div>
    </div>
  );
};
