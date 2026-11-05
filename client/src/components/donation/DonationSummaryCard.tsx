import React from "react";
import { Award, BadgeCheck, Lock, Receipt, ShieldCheck, Sparkles, Star } from "lucide-react";
import { donorTierFor, type DonorTier } from "@/components/documents/donorTier";

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
  "Medical Emergency":
    "Provides urgent ICU care, surgeries and life-saving medication for critical patients.",
  "Education & Learning":
    "Funds school fees, books, uniforms and digital learning kits for underprivileged students.",
  "Health Care & Well-being":
    "Supports community health clinics, maternal healthcare and routine medical check-ups.",
  "Women & Youth Empowerment":
    "Supports vocational skill workshops, livelihood programmes and youth employment drives.",
  "Skills, Livelihoods & Entrepreneurship":
    "Provides tools, training and micro-enterprise support for sustainable family incomes.",
  "Social Justice & Legal Empowerment":
    "Offers legal awareness and rights assistance to vulnerable communities.",
  "Agriculture & Rural Livelihoods":
    "Equips rural farmers with training, seeds and sustainable farming tools.",
  "Environment & Sustainability":
    "Drives tree plantation, clean water and sustainable community initiatives.",
  "Humanitarian Relief & Rehabilitation":
    "Delivers emergency food, blankets and disaster relief packs.",
  "General Donation": "Allocated where the need is greatest across all ISLAH programmes.",
  "Capital Donation":
    "Contributes to permanent community infrastructure such as health centres and schools.",
};

const TIER_STYLE: Record<DonorTier, { icon: typeof Award; color: string }> = {
  Platinum: { icon: Sparkles, color: "text-slate-800" },
  Gold: { icon: Award, color: "text-amber-700" },
  Silver: { icon: Star, color: "text-slate-600" },
};

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-3 py-1.5 text-xs sm:text-[13px]">
      <dt className="text-slate-500 shrink-0">{label}</dt>
      <dd className={`text-slate-800 text-right truncate ${mono ? "font-mono" : ""}`}>{value}</dd>
    </div>
  );
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
  const tier = donorTierFor(safeAmount);
  const tierStyle = TIER_STYLE[tier.tier];
  const TierIcon = tierStyle.icon;
  const recurring = frequency !== "One Time";
  const impactText =
    CAUSE_IMPACTS[financialType] ||
    "Every rupee strengthens underserved communities and transforms lives.";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden text-left">
      <div className="px-5 pt-5 pb-4 border-b border-slate-100 flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            Donation Summary
          </span>
          <h3 className="text-lg font-semibold text-[#071527] mt-0.5">Your Contribution</h3>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Amount */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total amount</span>
            <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
              {recurring
                ? `${frequency}${recurringPledge ? ` · ${pledgeMonths || "12 Months"}` : ""}`
                : "One-time gift"}
            </span>
          </div>
          <p className="text-3xl font-semibold text-[#071527] mt-1">
            ₹{safeAmount.toLocaleString("en-IN")}
          </p>
          <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">Tax documentation</span>
              <span className="text-slate-800 font-medium">
                {taxExemption ? "Requested" : "Not requested"}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Recognition</span>
              <span className={`font-medium inline-flex items-center gap-1 ${tierStyle.color}`}>
                <TierIcon className="w-3.5 h-3.5" /> {tier.label}
              </span>
            </div>
          </div>
        </div>

        {/* Cause */}
        <div>
          <span className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">
            Supporting
          </span>
          <p className="text-sm font-semibold text-[#071527] mt-0.5">
            {financialType || "General Donation"}
          </p>
          {contextPatient && (
            <p className="text-xs font-medium text-brand-orange">
              Beneficiary: {contextPatient.name}
            </p>
          )}
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{impactText}</p>
        </div>

        {/* Details */}
        <dl className="divide-y divide-slate-100 border-y border-slate-100">
          <Row label="Donor" value={fullName || "—"} />
          <Row label="Category" value={donorType || "Individual"} />
          <Row label="Email" value={email || "—"} />
          <Row label="Mobile" value={phone ? `${countryCode} ${phone}` : "—"} />
          <Row
            label="PAN"
            value={
              taxExemption
                ? pan
                  ? pan.toUpperCase()
                  : "Needed for tax documentation"
                : "Not required"
            }
          />
        </dl>

        <p className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
          <Receipt className="w-4 h-4 text-brand-orange shrink-0 mt-px" />
          Your receipt and a {tier.label.toLowerCase()} certificate of appreciation are ready to
          download as soon as payment is confirmed.
        </p>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
          <span className="inline-flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-emerald-600" /> Secure payment
          </span>
          <span className="inline-flex items-center gap-1">
            <BadgeCheck className="w-3.5 h-3.5 text-blue-600" /> Registered NGO
          </span>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> 80G & 12A
          </span>
        </div>
      </div>
    </div>
  );
};
