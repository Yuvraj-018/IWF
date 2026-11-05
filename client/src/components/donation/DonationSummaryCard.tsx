import { Award, BadgeCheck, Bell, FileText, Lock, ShieldCheck, Sparkles, Star } from "lucide-react";
import { donorTierFor, type DonorTier } from "@/components/documents/donorTier";

export type ReminderChoice = "None" | "Monthly" | "Yearly";

const CAUSE_IMPACTS: Record<string, string> = {
  "Medical Emergency":
    "Pays for urgent treatment, surgery and medicines for verified patients who cannot afford them.",
  "Education & Learning":
    "Funds school fees, books, uniforms and learning kits for children from low-income families.",
  "Health Care & Well-being":
    "Supports health camps, maternal care and routine check-ups in rural communities.",
  "Women & Youth Empowerment":
    "Supports skill workshops, livelihood programmes and youth employment drives.",
  "Skills, Livelihoods & Entrepreneurship":
    "Provides tools, training and small-business support for steady family incomes.",
  "Social Justice & Legal Empowerment":
    "Offers legal awareness and rights assistance to vulnerable communities.",
  "Agriculture & Rural Livelihoods":
    "Equips rural farmers with training, seeds and sustainable farming tools.",
  "Environment & Sustainability":
    "Drives tree plantation, clean water and sustainable village initiatives.",
  "Humanitarian Relief & Rehabilitation": "Delivers food, blankets and relief kits in emergencies.",
  "General Donation": "Used where the need is greatest across all ISLAH programmes.",
  "Capital Donation": "Builds lasting community infrastructure such as health centres and schools.",
};

const TIER_STYLE: Record<DonorTier, { icon: typeof Award; color: string }> = {
  Platinum: { icon: Sparkles, color: "text-slate-800 bg-slate-100 border-slate-300" },
  Gold: { icon: Award, color: "text-amber-800 bg-amber-50 border-amber-200" },
  Silver: { icon: Star, color: "text-slate-600 bg-slate-50 border-slate-200" },
};

const REMINDER_TEXT: Record<ReminderChoice, string> = {
  None: "One-time donation",
  Monthly: "One-time now · monthly reminder",
  Yearly: "One-time now · yearly reminder",
};

/** Live summary beside the donation form: what is being given, to what, and what follows. */
export function DonationSummaryCard({
  cause,
  patientName,
  amount,
  reminder,
  taxRequested,
}: {
  cause: string;
  patientName?: string;
  amount: number;
  reminder: ReminderChoice;
  taxRequested: boolean;
}) {
  const safeAmount = Number(amount) || 0;
  const tier = donorTierFor(safeAmount);
  const style = TIER_STYLE[tier.tier];
  const TierIcon = style.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden text-left">
      <div className="p-5 border-b border-slate-100">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
          Your Donation
        </span>
        <div className="flex items-end justify-between gap-3 mt-1">
          <p className="text-3xl font-semibold text-[#071527] tabular-nums">
            ₹{safeAmount.toLocaleString("en-IN")}
          </p>
          {safeAmount > 0 && (
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${style.color}`}
            >
              <TierIcon className="w-3.5 h-3.5" /> {tier.label}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-1">{REMINDER_TEXT[reminder]}</p>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <span className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">
            Supporting
          </span>
          <p className="text-sm font-semibold text-[#071527] mt-0.5">
            {cause || "General Donation"}
          </p>
          {patientName && (
            <p className="text-xs font-medium text-brand-orange">Patient: {patientName}</p>
          )}
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {CAUSE_IMPACTS[cause] ?? CAUSE_IMPACTS["General Donation"]}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
          <p className="text-xs font-semibold text-slate-800 mb-2">After payment you receive</p>
          <ul className="space-y-1.5 text-xs text-slate-600">
            <li className="flex gap-2">
              <FileText className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-px" />
              {taxRequested
                ? "Donation receipt with your PAN for tax-deduction documentation"
                : "Donation receipt (PDF)"}
            </li>
            <li className="flex gap-2">
              <TierIcon className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-px" />
              {tier.label} certificate of appreciation
            </li>
            {reminder !== "None" && (
              <li className="flex gap-2">
                <Bell className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-px" />A{" "}
                {reminder.toLowerCase()} reminder — nothing is charged automatically
              </li>
            )}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-emerald-600" /> Secure payment
          </span>
          <span className="inline-flex items-center gap-1">
            <BadgeCheck className="w-3.5 h-3.5 text-blue-600" /> Registered NGO
          </span>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> 80G &amp; 12AB
          </span>
        </div>
      </div>
    </div>
  );
}
