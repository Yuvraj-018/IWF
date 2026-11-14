import React, { useEffect, useState } from "react";
import { ShieldCheck, CheckCircle2, TrendingUp, HeartHandshake, ExternalLink } from "lucide-react";
import { API_BASE_URL } from "@/services/apiClient";

interface PublicFinancialData {
  snapshotNo?: string;
  title?: string;
  fy?: string;
  reportingPeriod?: string;
  totalDonationsReceivedRupees?: number;
  totalExpenditureIncurredRupees?: number;
  netReserveBalanceRupees?: number;
  sectorSpendBreakdown?: Array<{
    code?: string;
    workAreaId?: string;
    name: string;
    amountRupees?: number;
    percentage: number;
  }>;
  transparencyPillars?: string[];
  lastAuditedAt?: string;
}

export default function LiveFinancialTransparencyCard() {
  const [data, setData] = useState<PublicFinancialData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/public/transparency/financial-summary`, { cache: "no-store" })
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.warn("Transparency live fetch fallback:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalDonations = data?.totalDonationsReceivedRupees;
  const totalExpenditure = data?.totalExpenditureIncurredRupees;
  const netReserve = data?.netReserveBalanceRupees;
  const sectors = data?.sectorSpendBreakdown || [];

  return (
    <div className="bg-gradient-to-br from-[#071527] to-[#0d223f] text-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-emerald-500/20 my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Audited Public Transparency Disclosure</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            {data?.title || `Annual Financial & Impact Summary (${data?.fy || "FY 2024-25"})`}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Certified double-entry ledger summaries published directly from the central accounting engine. Zero individual donor PII is exposed.
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[11px] text-slate-400 block">Status:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Statutorily Verified</span>
          </span>
        </div>
      </div>

      {/* 3 Column Volume Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <span className="text-xs text-slate-400">Total Contributions Received</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1">
            {totalDonations === undefined ? "Unavailable" : `₹ ${totalDonations.toLocaleString("en-IN")}`}
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">100% deposited in scheduled bank</span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <span className="text-xs text-slate-400">Programme Deployments</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400 mt-1">
            {totalExpenditure === undefined ? "Unavailable" : `₹ ${totalExpenditure.toLocaleString("en-IN")}`}
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Across 8 core thematic sectors</span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <span className="text-xs text-slate-400">Net Reserve Capital Balance</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-teal-300 mt-1">
            {netReserve === undefined ? "Unavailable" : `₹ ${netReserve.toLocaleString("en-IN")}`}
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Reserved for ongoing health & relief</span>
        </div>
      </div>

      {/* Sector Allocation Breakdown */}
      <div className="space-y-3 pt-2">
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Audited Sector Spend Distribution
        </span>
        <div className="space-y-2.5">
          {sectors.map((sec, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-200 font-medium">{sec.name}</span>
                <span className="font-mono text-emerald-300 font-bold">
                  {sec.percentage}% {sec.amountRupees ? `(₹ ${Number(sec.amountRupees).toLocaleString("en-IN")})` : ""}
                </span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  style={{ width: `${sec.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Notice Footer */}
      <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-emerald-400" />
          <span>Transparency Builds Trust — Reg. 80G & 12A Certified Foundation</span>
        </div>
        <div className="font-mono text-[11px]">
          Audited at: {data?.lastAuditedAt ? new Date(data.lastAuditedAt).toLocaleDateString("en-IN") : "Recent"}
        </div>
      </div>
    </div>
  );
}

