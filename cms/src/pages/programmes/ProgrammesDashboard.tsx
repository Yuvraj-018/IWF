import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Award,
  Users,
  Coins,
  PlusCircle,
  ArrowRight,
  Database,
  Layers,
  HeartHandshake,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "../../services/api";
import { financeApi } from "../../services/financeApi";

export default function ProgrammesDashboard() {
  const navigate = useNavigate();
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [financeData, setFinanceData] = useState<any>(null);
  const [budgetsData, setBudgetsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Derive programme sectors dynamically from registered budget lines in MongoDB
  const sectors = useMemo(() => {
    if (budgetsData?.budgets && Array.isArray(budgetsData.budgets) && budgetsData.budgets.length > 0) {
      return budgetsData.budgets.map((b: any) => ({
        code: b.sectorCode || b.code || "SEC",
        name: b.sector || b.name || "Programme Sector",
        leadOfficer: b.leadOfficer || b.allocatedBy || "Working Committee",
      }));
    }
    return [];
  }, [budgetsData]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [statsRes, finRes, budRes] = await Promise.all([
          api.getDashboardStats({ force: true }),
          financeApi.getFinancialDashboardOverview({}),
          financeApi.getBudgets(),
        ]);
        if (statsRes) setDashboardStats(statsRes);
        if (finRes?.success && finRes.data) setFinanceData(finRes.data);
        if (budRes) setBudgetsData(budRes);
      } catch (err) {
        console.error("ProgrammesDashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalAllocated = budgetsData?.totalAllocated || 0;
  const totalSpent = financeData?.monthlyFinancialSummary?.totalExpenses || 0;

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12 font-sans select-none">
      {/* ── 1. HEADER BANNER ── */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#071527] border border-[#0f3458] shadow-xs flex items-center justify-center p-2.5 shrink-0">
            <Award className="w-8 h-8 text-[#f97316]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-[#071527] tracking-tight">
                Programmes &amp; Master Sectors
              </h1>
              <span className="text-[10px] font-bold bg-[#f97316]/10 text-[#ea580c] px-2.5 py-0.5 rounded-full border border-[#f97316]/20 uppercase">
                8 Core Work Areas
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Field operational overview, budget utilization per sector, and verified social impact tracking.
            </p>
          </div>
        </div>

        {/* Quick Top Actions */}
        <div className="flex items-center gap-2.5 self-stretch md:self-auto">
          <Link
            to="/programmes/initiatives"
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Manage Initiatives</span>
          </Link>
          <Link
            to="/finance/budgets"
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 transition cursor-pointer"
          >
            <Coins className="w-3.5 h-3.5 text-[#071527]" />
            <span>Sector Budgets</span>
          </Link>
        </div>
      </div>

      {/* ── 2. DYNAMIC SUMMARY KPI CARDS (PULLED FROM REAL DATABASE) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: 8 Master Sectors */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Master Sectors</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#071527]">
              <Layers className="w-4 h-4 text-[#071527]" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#071527]">8 Sectors</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">● Active Foundation Charter</p>
        </div>

        {/* Metric 2: Total Program Budget */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Allocated Budget (FY)</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-28 bg-slate-100 animate-pulse rounded-lg mt-1" />
          ) : (
            <p className="text-2xl font-black text-[#071527]">
              ₹{totalAllocated.toLocaleString("en-IN")}
            </p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">
            Total Disbursed: ₹{totalSpent.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Metric 3: Medical Patients */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Medical Beneficiaries</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-20 bg-slate-100 animate-pulse rounded-lg mt-1" />
          ) : (
            <p className="text-2xl font-black text-[#071527]">
              {dashboardStats?.totalPatients || 0} Cases
            </p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">Verified patient records in MongoDB</p>
        </div>

        {/* Metric 4: Community & Volunteer Network */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Inbound Applications</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#f97316]">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-20 bg-slate-100 animate-pulse rounded-lg mt-1" />
          ) : (
            <p className="text-2xl font-black text-[#071527]">
              {dashboardStats?.totalApplications || 0} Submissions
            </p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">Volunteers, mentors, and partners</p>
        </div>
      </div>

      {/* ── 3. MASTER SECTORS DIRECTORY & BUDGET TRACKER TABLE ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-[#071527]">Eight Official Master Work Areas</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Sector operational overview and live administrative routing.
            </p>
          </div>
          <Link
            to="/programmes/initiatives"
            className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Manage All Initiatives</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3 py-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-slate-100 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : sectors.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-xs">
            No active programme sectors registered in budget master yet. Add budget allocations under Donations &amp; Finance to view sector tracking.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Sector Name &amp; Code</th>
                  <th className="pb-3">Lead Working Committee</th>
                  <th className="pb-3">Budget Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {sectors.map((sector: any) => {
                  return (
                    <tr key={sector.code} className="hover:bg-slate-50/70 transition">
                      <td className="py-4">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono text-[10px] font-bold border border-slate-200">
                            {sector.code}
                          </span>
                          <div>
                            <span className="font-bold text-[#071527] block text-xs">{sector.name}</span>
                            <span className="text-[11px] text-slate-400">Master Sector</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-slate-600">{sector.leadOfficer}</td>
                      <td className="py-4 text-slate-500 font-medium">
                        Configured in Budget Register
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            to="/programmes/initiatives"
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition"
                          >
                            Initiatives
                          </Link>
                          <Link
                            to="/finance/expenses"
                            className="px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#ea580c] text-[11px] font-bold transition"
                          >
                            Add Voucher
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── 4. QUICK ACCESS CONSOLES ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#f97316] flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#071527]">Field Initiatives Master</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Review, add, and monitor grassroots social projects across the 8 sectors.
            </p>
          </div>
          <Link
            to="/programmes/initiatives"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f97316] hover:text-[#ea580c]"
          >
            <span>Open Initiatives Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#071527]">Sector Budget Allocations</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Configure fiscal year spending ceilings and track variance vs. actual vouchers.
            </p>
          </div>
          <Link
            to="/finance/budgets"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            <span>Configure Sector Budgets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#071527]">Beneficiary Records</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Access individual patient cases, surgical assistance files, and student records.
            </p>
          </div>
          <Link
            to="/patients"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
          >
            <span>View Medical Assistance</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── 5. PROFESSIONAL FOOTER STATUS BAR ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 pt-3 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#071527]">ISLAH Welfare Foundation</span>
          <span>•</span>
          <span>Programmes &amp; Impact Console</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
            <Database className="w-3.5 h-3.5 text-emerald-500" />
            MongoDB Connected
          </span>
          <span className="text-slate-400">8 Master Sectors Active</span>
        </div>
      </div>
    </div>
  );
}
