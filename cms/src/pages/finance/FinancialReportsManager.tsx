import React, { useState, useEffect } from "react";
import {
  FileText,
  Download,
  FileSpreadsheet,
  Globe,
  CheckCircle2,
  AlertCircle,
  Filter,
  Calendar,
  Layers,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  RefreshCw,
  ExternalLink,
  Eye,
  SlidersHorizontal,
  X,
  Sparkles,
} from "lucide-react";
import { financeApi } from "../../services/financeApi";

type ReportType =
  | "80g-register"
  | "income-source"
  | "expenditure-sector"
  | "income-vs-expenditure"
  | "budget-variance";

export default function FinancialReportsManager() {
  const [activeReport, setActiveReport] = useState<ReportType>("80g-register");
  const [selectedFy, setSelectedFy] = useState("2026-27");
  const [selectedSector, setSelectedSector] = useState("all");
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState<"csv" | "pdf" | null>(null);

  // Transparency Snapshots
  const [snapshots, setSnapshots] = useState<any[]>([]);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [snapshotFy, setSnapshotFy] = useState("2024-25");
  const [snapshotTitle, setSnapshotTitle] = useState("");
  const [snapshotNotes, setSnapshotNotes] = useState("");
  const [publishing, setPublishing] = useState(false);

  // Toast
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showNotification = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    loadActiveReport();
  }, [activeReport, selectedFy, selectedSector]);

  useEffect(() => {
    loadSnapshots();
  }, []);

  const loadActiveReport = async () => {
    try {
      setLoading(true);
      let res: any = null;

      switch (activeReport) {
        case "80g-register":
          res = await financeApi.getTax80GRegisterReport();
          break;
        case "income-source":
          res = await financeApi.getIncomeBySourceReport({ fy: selectedFy });
          break;
        case "expenditure-sector":
          res = await financeApi.getExpenditureBySectorReport({
            workAreaId: selectedSector === "all" ? undefined : selectedSector,
          });
          break;
        case "income-vs-expenditure":
          res = await financeApi.getIncomeVsExpenditureReport({ fy: selectedFy });
          break;
        case "budget-variance":
          res = await financeApi.getBudgetVarianceReport(selectedFy);
          break;
      }

      if (res && res.success) {
        setReportData(res.data);
      }
    } catch (err: any) {
      console.warn("Report loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadSnapshots = async () => {
    try {
      const res = await financeApi.getTransparencySnapshots();
      if (res.success) {
        setSnapshots(res.data || []);
      }
    } catch (err) {
      console.warn("Failed to load snapshots:", err);
    }
  };

  const handleExport = async (format: "csv" | "pdf") => {
    try {
      setExporting(format);
      const blob = await financeApi.exportReport({
        reportType: activeReport,
        format,
        fy: selectedFy,
        workAreaId: selectedSector === "all" ? undefined : selectedSector,
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${activeReport}-${selectedFy}-${Date.now()}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      showNotification("success", `Report successfully exported as ${format.toUpperCase()}`);
    } catch (err: any) {
      showNotification("error", err.message || `Failed to export ${format.toUpperCase()}`);
    } finally {
      setExporting(null);
    }
  };

  const handlePublishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setPublishing(true);
      const res = await financeApi.publishTransparencySnapshot({
        fy: snapshotFy,
        title: snapshotTitle || `FY ${snapshotFy} Audited Financial & Impact Summary`,
        notes: snapshotNotes,
      });

      showNotification("success", res.message || "Financial snapshot published to public website!");
      setIsPublishModalOpen(false);
      setSnapshotTitle("");
      setSnapshotNotes("");
      await loadSnapshots();
    } catch (err: any) {
      showNotification("error", err.message || "Failed to publish snapshot");
    } finally {
      setPublishing(false);
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      await financeApi.toggleSnapshotPublish(id);
      showNotification("success", "Snapshot visibility updated");
      await loadSnapshots();
    } catch (err: any) {
      showNotification("error", err.message || "Failed to toggle snapshot");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2 ${
            notification.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-200"
              : "bg-rose-950/90 border-rose-500/40 text-rose-200"
          }`}
        >
          {notification.type === "success" ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
          {notification.text}
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Statutory Accounting & Disclosure Suite</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Financial Reports & Public Transparency</h1>
            <p className="text-slate-500 text-sm max-w-2xl font-medium">
              Export certified 80G registers, budget variance statements, and publish audited financial snapshots to the public website without leaking confidential PII.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Export CSV */}
            <button
              onClick={() => handleExport("csv")}
              disabled={exporting !== null}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-sm font-bold shadow-2xs transition disabled:opacity-50 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>{exporting === "csv" ? "Exporting CSV..." : "Export Excel/CSV"}</span>
            </button>

            {/* Export PDF */}
            <button
              onClick={() => handleExport("pdf")}
              disabled={exporting !== null}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-sm font-bold shadow-2xs transition disabled:opacity-50 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-rose-600" />
              <span>{exporting === "pdf" ? "Rendering PDF..." : "Audited PDF"}</span>
            </button>

            {/* Publish Snapshot Button */}
            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white shadow-2xs rounded-xl text-sm font-bold shadow-md transition cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>Publish to Website</span>
            </button>
          </div>
        </div>

        {/* 5 Report Tab Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-100">
          {(
            [
              { id: "80g-register", label: "80G Tax Register", desc: "Statutory donor compliance" },
              { id: "income-source", label: "Income by Source", desc: "Online, offline & grants" },
              { id: "expenditure-sector", label: "Sector Spending", desc: "8 Work areas breakdown" },
              { id: "income-vs-expenditure", label: "Income vs Expense", desc: "Net surplus / deficit" },
              { id: "budget-variance", label: "Budget Variance", desc: "Allocated vs actual spend" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveReport(tab.id)}
              className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                activeReport === tab.id
                  ? "bg-emerald-50/70 border-emerald-300 text-emerald-950 shadow-2xs"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <div className="text-xs font-bold leading-tight flex items-center justify-between">
                <span className={activeReport === tab.id ? "text-emerald-900 font-bold" : "text-slate-800 font-semibold"}>{tab.label}</span>
                {activeReport === tab.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              </div>
              <p className={`text-[10px] mt-1 ${activeReport === tab.id ? "text-emerald-700 font-medium" : "text-slate-500"}`}>{tab.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Report Container */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-hidden">
        {/* Controls Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {reportData?.reportType || "Generating Report..."}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Financial Year Selector */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Fiscal Year:</span>
              <select
                value={selectedFy}
                onChange={(e) => setSelectedFy(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-medium focus:outline-none focus:border-emerald-500 shadow-2xs"
              >
                <option value="2026-27">FY 2026-27 (Current)</option>
                <option value="2025-26">FY 2025-26</option>
                <option value="2024-25">FY 2024-25</option>
                <option value="2023-24">FY 2023-24</option>
              </select>
            </div>

            {/* Sector Selector (only for Sector report) */}
            {activeReport === "expenditure-sector" && (
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-medium focus:outline-none focus:border-emerald-500 shadow-2xs"
              >
                <option value="all">All 8 Sectors</option>
                <option value="EDU">Education (EDU)</option>
                <option value="HLT">Healthcare (HLT)</option>
                <option value="WYE">Women & Youth (WYE)</option>
                <option value="SLE">Livelihoods (SLE)</option>
                <option value="SJL">Social Justice (SJL)</option>
                <option value="AGR">Agriculture (AGR)</option>
                <option value="ENV">Environment (ENV)</option>
                <option value="HRR">Emergency Relief (HRR)</option>
              </select>
            )}
          </div>
        </div>

        {/* Dynamic Report Content */}
        {loading ? (
          <div className="p-16 text-center text-slate-400">
            <RefreshCw className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-600">Computing ledger aggregations...</p>
          </div>
        ) : !reportData ? (
          <div className="p-16 text-center text-slate-400">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-600">No financial records found for this period.</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Top Summary KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reportData.totalIncomeRupees !== undefined && (
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500">Total Income</span>
                  <div className="text-xl font-black font-mono text-emerald-700 mt-1">
                    ₹ {Number(reportData.totalIncomeRupees).toLocaleString("en-IN")}
                  </div>
                </div>
              )}
              {reportData.totalExpenditureRupees !== undefined && (
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500">Total Expenditure</span>
                  <div className="text-xl font-black font-mono text-amber-700 mt-1">
                    ₹ {Number(reportData.totalExpenditureRupees).toLocaleString("en-IN")}
                  </div>
                </div>
              )}
              {reportData.netSurplusRupees !== undefined && (
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500">Net Reserve Surplus</span>
                  <div className="text-xl font-black font-mono text-teal-700 mt-1">
                    ₹ {Number(reportData.netSurplusRupees).toLocaleString("en-IN")}
                  </div>
                </div>
              )}
              {reportData.totalEligibleAmountRupees !== undefined && (
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500">80G Eligible Donations</span>
                  <div className="text-xl font-black font-mono text-emerald-700 mt-1">
                    ₹ {Number(reportData.totalEligibleAmountRupees).toLocaleString("en-IN")}
                  </div>
                </div>
              )}
            </div>

            {/* View 1: 80G Tax Exemption Register */}
            {activeReport === "80g-register" && reportData.records && (
              <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Receipt No</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Donor Name</th>
                      <th className="py-3 px-4">Donor PAN</th>
                      <th className="py-3 px-4 text-right">Amount (₹)</th>
                      <th className="py-3 px-4">Purpose</th>
                      <th className="py-3 px-4">Payment Mode</th>
                      <th className="py-3 px-4">Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reportData.records.map((r: any) => (
                      <tr key={r.receiptNo} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4 font-mono font-bold text-emerald-700">{r.receiptNo}</td>
                        <td className="py-3 px-4 text-slate-600 font-medium">
                          {new Date(r.date).toLocaleDateString("en-IN")}
                        </td>
                        <td className="py-3 px-4 text-slate-900 font-bold">{r.donorName}</td>
                        <td className="py-3 px-4 font-mono text-slate-600">{r.pan}</td>
                        <td className="py-3 px-4 text-right font-mono font-black text-slate-900">
                          ₹ {Number(r.amountRupees).toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-medium">{r.financialType}</td>
                        <td className="py-3 px-4 text-slate-500">{r.paymentMode}</td>
                        <td className="py-3 px-4 text-slate-500 truncate max-w-xs">{r.address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* View 2: Income by Source */}
            {activeReport === "income-source" && reportData.sources && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Source</th>
                        <th className="py-3 px-4">Count</th>
                        <th className="py-3 px-4 text-right">Volume (₹)</th>
                        <th className="py-3 px-4 text-right">Share %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {reportData.sources.map((s: any) => (
                        <tr key={s.source} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-4 text-slate-900 font-bold">{s.source}</td>
                          <td className="py-3 px-4 text-slate-600 font-mono font-medium">{s.count}</td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700">
                            ₹ {Number(s.amountRupees).toLocaleString("en-IN")}
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-slate-600 font-medium">{s.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Monthly Breakdown */}
                {reportData.monthlyTrend && (
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                    <span className="text-xs font-bold text-slate-800">Monthly Inflow Trend</span>
                    <div className="space-y-2">
                      {reportData.monthlyTrend.map((m: any) => (
                        <div key={m.month} className="flex justify-between items-center text-xs">
                          <span className="font-mono text-slate-600 font-medium">{m.month}</span>
                          <span className="font-mono font-bold text-emerald-700">
                            ₹ {Number(m.amountRupees).toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* View 3: Sector Expenditure */}
            {activeReport === "expenditure-sector" && reportData.sectors && (
              <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Sector Name</th>
                      <th className="py-3 px-4">Code</th>
                      <th className="py-3 px-4">Vouchers</th>
                      <th className="py-3 px-4 text-right">Incurred Spend (₹)</th>
                      <th className="py-3 px-4 text-right">Share %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reportData.sectors.map((sec: any) => (
                      <tr key={sec.code} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4 text-slate-900 font-bold">{sec.name}</td>
                        <td className="py-3 px-4 font-mono font-bold text-emerald-700">{sec.code}</td>
                        <td className="py-3 px-4 text-slate-600 font-mono font-medium">{sec.voucherCount}</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-amber-700">
                          ₹ {Number(sec.spentRupees).toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-slate-600 font-medium">{sec.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* View 4: Income vs Expenditure */}
            {activeReport === "income-vs-expenditure" && reportData.monthlyBreakdown && (
              <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Month</th>
                      <th className="py-3 px-4 text-right">Income (₹)</th>
                      <th className="py-3 px-4 text-right">Expenditure (₹)</th>
                      <th className="py-3 px-4 text-right">Net Surplus (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reportData.monthlyBreakdown.map((m: any) => (
                      <tr key={m.month} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">{m.month}</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700">
                          ₹ {Number(m.incomeRupees).toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-amber-700">
                          ₹ {Number(m.expenseRupees).toLocaleString("en-IN")}
                        </td>
                        <td
                          className={`py-3 px-4 text-right font-mono font-bold ${
                            m.netSurplusRupees >= 0 ? "text-teal-700" : "text-rose-600"
                          }`}
                        >
                          ₹ {Number(m.netSurplusRupees).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* View 5: Budget vs Actual Variance */}
            {activeReport === "budget-variance" && reportData.sectors && (
              <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Sector</th>
                      <th className="py-3 px-4 text-right">Allocated (₹)</th>
                      <th className="py-3 px-4 text-right">Spent (₹)</th>
                      <th className="py-3 px-4 text-right">Remaining (₹)</th>
                      <th className="py-3 px-4 text-right">Utilization %</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reportData.sectors.map((sec: any) => (
                      <tr key={sec.workAreaId} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4 text-slate-900 font-bold">
                          {sec.name} <span className="text-slate-500 text-[10px] font-medium">({sec.workAreaId})</span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-slate-600 font-medium">
                          ₹ {Number(sec.allocatedRupees).toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-amber-700">
                          ₹ {Number(sec.spentRupees).toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700">
                          ₹ {Number(sec.remainingRupees).toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                          {sec.utilizationPercentage}%
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              sec.status === "within_budget"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : sec.status === "near_limit"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                          >
                            {sec.status.replace("_", " ").toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Public Transparency Snapshots Registry */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider">
              <Globe className="w-4 h-4 text-teal-600" />
              <span>Public Website Transparency Disclosures</span>
            </div>
            <h3 className="text-base font-black text-slate-900">Published Financial Snapshots</h3>
          </div>
          <a
            href="http://localhost:3000/financial-transparency-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-700 hover:underline flex items-center gap-1 font-bold"
          >
            <span>View Public Website Transparency</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="divide-y divide-slate-100">
          {snapshots.length === 0 ? (
            <div className="py-8 text-center text-slate-400">
              <Globe className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-medium text-slate-600">No public snapshots created yet.</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Click "Publish to Website" to snapshot approved financials for public donors.
              </p>
            </div>
          ) : (
            snapshots.map((snap) => (
              <div key={snap._id} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-teal-700">{snap.snapshotNo}</span>
                    <span className="text-slate-900 font-bold">• {snap.title}</span>
                    <span className="text-slate-500 font-medium">({snap.fy})</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    Donations: ₹ {Number(snap.totalDonationsRupees).toLocaleString("en-IN")} | Spend: ₹ {Number(snap.totalExpenditureRupees).toLocaleString("en-IN")} | Published by: {snap.publishedBy}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      snap.isPublished
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {snap.isPublished ? "PUBLISHED" : "UNPUBLISHED"}
                  </span>

                  <button
                    onClick={() => handleTogglePublish(snap._id)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer"
                  >
                    {snap.isPublished ? "Unpublish" : "Publish"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Snapshot Publisher Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <Globe className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg font-bold text-slate-900">Publish Financial Disclosure</h3>
              </div>
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublishSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fiscal Year *</label>
                <select
                  value={snapshotFy}
                  onChange={(e) => setSnapshotFy(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                >
                  <option value="2026-27">FY 2026-27 (Current)</option>
                  <option value="2025-26">FY 2025-26 (Audited)</option>
                  <option value="2024-25">FY 2024-25</option>
                  <option value="2023-24">FY 2023-24</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Snapshot Title</label>
                <input
                  type="text"
                  placeholder={`e.g. FY ${snapshotFy} Audited Financial & Impact Summary`}
                  value={snapshotTitle}
                  onChange={(e) => setSnapshotTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Statutory Audit Notes</label>
                <textarea
                  rows={3}
                  placeholder="Audited by Chartered Accountants in accordance with Indian Trust Act & 80G provisions."
                  value={snapshotNotes}
                  onChange={(e) => setSnapshotNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500 placeholder-slate-400"
                />
              </div>

              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 space-y-1">
                <span className="font-bold text-teal-900">Zero PII Guarantee:</span>
                <p className="text-[11px] text-teal-700">
                  This publishing action only releases aggregate financial volume and sector breakdown percentages. Individual donor names, PANs, phone numbers, and patient medical files are strictly shielded.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={publishing}
                  className="px-5 py-2 bg-[#f97316] hover:bg-[#ea580c] text-white shadow-2xs rounded-xl text-xs font-bold shadow-md transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {publishing ? "Publishing Snapshot..." : "Publish Live to Website"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
