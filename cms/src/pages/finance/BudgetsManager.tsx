import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PieChart as PieIcon,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  PlusCircle,
  Edit2,
  CheckCircle2,
  X,
  Loader2,
  Building2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { financeApi, BudgetOverview } from "../../services/financeApi";
import { useAuth } from "../../context/AuthContext";

function formatINR(val: number): string {
  if (isNaN(val) || val === 0) return "₹ 0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

const SECTOR_DESCRIPTIONS: Record<string, string> = {
  EDU: "School sponsorships, learning centers, textbooks & vocational kits",
  HLT: "Emergency medical aid, patient dialyses, surgeries & health clinics",
  SLE: "Artisan toolkits, micro-enterprise seed grants & skill training",
  WYE: "Self-help groups, girls scholarship funds & legal advocacy",
  ENV: "Tree plantation drives, community cleanups & rainwater harvesting",
  SJL: "Legal aid for marginalized families & rights awareness camps",
  AGR: "Farmer seeds, micro-irrigation systems & food grain distribution",
  HRR: "Disaster emergency response kits, blanket distribution & winter relief",
};

export default function BudgetsManager() {
  const { can } = useAuth();
  const [fy, setFy] = useState("2025-26");
  const [data, setData] = useState<BudgetOverview | null>(null);
  const [loading, setLoading] = useState(true);

  // Edit Budget Modal
  const [editingSector, setEditingSector] = useState<{ code: string; name: string; allocated: number } | null>(null);

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const res = await financeApi.getBudgets(fy);
      if (res.success) {
        setData(res);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch budget allocations");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [fy]);

  const summary = data?.summary || {
    totalAllocated: 0,
    totalSpent: 0,
    totalRemaining: 0,
    overallUtilization: 0,
  };

  const sectors = data?.sectorBudgets || [];

  return (
    <div className="space-y-6 max-w-[1550px] mx-auto pb-12 font-sans select-none">
      {/* ── TOP HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <Link to="/finance" className="hover:text-blue-700 transition">
              Donations &amp; Finance
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-bold">Budgets &amp; Sector Allocations</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <PieIcon className="w-6 h-6 text-blue-600" />
            <span>Budgets &amp; Sector Allocations</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure fiscal year envelopes, monitor real-time spend variance, and track sector utilization against authorized limits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <Calendar className="w-4 h-4 text-blue-600" />
            <select
              value={fy}
              onChange={(e) => setFy(e.target.value)}
              className="text-xs font-bold text-slate-800 bg-transparent focus:outline-none"
            >
              <option value="2026-27">Financial Year 2026-27 (Current)</option>
              <option value="2025-26">Financial Year 2025-26 (Active)</option>
              <option value="2024-25">Financial Year 2024-25</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── SUMMARY STAT CARDS ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Total Approved Budget</p>
          <h3 className="text-xl font-black text-slate-900 mt-1">{formatINR(summary.totalAllocated)}</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Governing Board approved</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Actual Incurred Spend</p>
          <h3 className="text-xl font-black text-blue-700 mt-1">{formatINR(summary.totalSpent)}</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Verified voucher disbursements</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Remaining Budget Envelope</p>
          <h3 className="text-xl font-black text-orange-600 mt-1">{formatINR(summary.totalRemaining)}</h3>
          <p className="text-[10px] text-orange-700 font-medium mt-0.5">Available for deployment</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Overall Utilization</p>
          <h3 className="text-xl font-black text-slate-900 mt-1">{summary.overallUtilization}%</h3>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-blue-600 h-1.5 rounded-full"
              style={{ width: `${Math.min(100, summary.overallUtilization)}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── PER-SECTOR BUDGET CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full py-16 text-center text-slate-400">
            <Loader2 className="w-7 h-7 animate-spin mx-auto text-blue-600 mb-2" />
            <p className="text-xs font-semibold">Loading fiscal budget allocations...</p>
          </div>
        ) : (
          sectors.map((sec) => {
            const isHigh = sec.utilization > 90;
            const isMedium = sec.utilization > 75 && !isHigh;
            const progressColor = isHigh ? "bg-rose-500" : isMedium ? "bg-amber-500" : "bg-blue-600";

            return (
              <div
                key={sec.code}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:shadow-xs transition space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 font-mono font-bold text-[10px]">
                      {sec.code}
                    </span>
                    {can("finance.budget:manage") && (
                      <button
                        onClick={() =>
                          setEditingSector({
                            code: sec.code,
                            name: sec.name,
                            allocated: sec.allocated,
                          })
                        }
                        title="Edit Budget Allocation"
                        className="p-1 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-slate-50 transition cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <h4 className="text-sm font-black text-slate-900 mt-2">{sec.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
                    {SECTOR_DESCRIPTIONS[sec.code] || "Sector programmes and initiatives"}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Spent vs Budget</span>
                      <span className="font-bold text-slate-900">{sec.utilization}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`${progressColor} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${Math.min(100, sec.utilization)}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <p className="text-[10px] text-slate-400">Allocated</p>
                      <p className="font-bold text-slate-800">{formatINR(sec.allocated)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400">Incurred</p>
                      <p className="font-bold text-blue-700">{formatINR(sec.spent)}</p>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">Remaining</span>
                      <span className="text-xs font-bold text-orange-600">{formatINR(sec.remaining)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── EDIT BUDGET MODAL ── */}
      {editingSector && (
        <EditBudgetModal
          fy={fy}
          sector={editingSector}
          onClose={() => setEditingSector(null)}
          onSuccess={() => {
            setEditingSector(null);
            fetchBudgets();
          }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// EDIT BUDGET ALLOCATION MODAL
// ─────────────────────────────────────────────────────────────
function EditBudgetModal({
  fy,
  sector,
  onClose,
  onSuccess,
}: {
  fy: string;
  sector: { code: string; name: string; allocated: number };
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [amount, setAmount] = useState(String(sector.allocated));
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await financeApi.setBudget({
        fy,
        workAreaId: sector.code,
        allocatedAmount: Number(amount),
      });

      toast.success(`Budget updated for ${sector.name} (${fy})`);
      onSuccess();
    } catch (err: any) {
      toast.error(err.message || "Failed to update budget");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-slate-200 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Configure Budget</h3>
            <p className="text-[11px] text-slate-500">{sector.name} ({sector.code})</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="text-[11px] font-bold text-slate-700">Financial Year</label>
            <input
              type="text"
              readOnly
              value={`FY ${fy}`}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700">Allocated Budget Envelope (₹) *</label>
            <input
              type="number"
              required
              min={1000}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-sm font-black text-slate-900 focus:ring-2 focus:ring-[#f97316] focus:outline-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Save Envelope</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
