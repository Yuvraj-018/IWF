import React, { useState, useEffect } from "react";
import {
  RefreshCw,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Building2,
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Check,
  X,
  Sparkles,
  Link2,
  PlusCircle,
  HelpCircle,
  Filter,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import { financeApi } from "../../services/financeApi";

export default function ReconciliationManager() {
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [statements, setStatements] = useState<any[]>([]);
  const [selectedStatementId, setSelectedStatementId] = useState<string>("");

  const [activeTab, setActiveTab] = useState<"all" | "unmatched" | "suggested" | "matched" | "ignored">("unmatched");
  const [searchQuery, setSearchQuery] = useState("");
  const [lines, setLines] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>({
    counts: { all: 0, unmatched: 0, suggested: 0, matched: 0, ignored: 0 },
    totalCreditsRupees: 0,
    totalDebitsRupees: 0,
    reconciledRupees: 0,
    discrepancyRupees: 0,
  });

  const [selectedLine, setSelectedLine] = useState<any | null>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);
  const [loading, setLoading] = useState(true);
  const [autoMatching, setAutoMatching] = useState(false);

  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadCsvText, setUploadCsvText] = useState("");
  const [uploading, setUploading] = useState(false);

  const [isDirectIncomeOpen, setIsDirectIncomeOpen] = useState(false);
  const [directIncomeDonor, setDirectIncomeDonor] = useState({
    donorName: "",
    email: "donor@islahwelfare.org",
    phone: "9876543210",
    pan: "",
    workAreaId: "HLT",
    financialType: "Direct Bank Transfer Contribution",
    taxExemption: true,
  });
  const [savingDirectIncome, setSavingDirectIncome] = useState(false);

  // Notification message
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showNotification = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 4000);
  };

  // Initial Load: Bank Accounts & Statements
  useEffect(() => {
    loadAccountsAndStatements();
  }, []);

  const loadAccountsAndStatements = async () => {
    try {
      setLoading(true);
      const [accRes, stmtRes] = await Promise.all([
        financeApi.getBankAccounts().catch(() => ({ data: [] })),
        financeApi.getBankStatements().catch(() => ({ data: [] })),
      ]);

      const accs = accRes.data || [];
      setBankAccounts(accs);
      if (accs.length > 0) {
        const primary = accs.find((a: any) => a.isPrimary) || accs[0];
        setSelectedAccountId(primary._id);
      }

      const stmts = stmtRes.data || [];
      setStatements(stmts);
      if (stmts.length > 0) {
        setSelectedStatementId(stmts[0]._id);
      }
    } catch (err: any) {
      console.error("Initialization error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Lines when statement, tab, or search changes
  useEffect(() => {
    loadLines();
  }, [selectedStatementId, activeTab, searchQuery]);

  const loadLines = async () => {
    try {
      const res = await financeApi.getStatementLines({
        statementId: selectedStatementId || undefined,
        matchStatus: activeTab === "all" ? undefined : activeTab,
        search: searchQuery || undefined,
        limit: 100,
      });

      if (res.success) {
        setLines(res.data);
        if (res.summary) setSummary(res.summary);

        // Keep or update selected line
        if (selectedLine) {
          const updated = res.data.find((l: any) => l._id === selectedLine._id);
          setSelectedLine(updated || res.data[0] || null);
        } else if (res.data.length > 0) {
          setSelectedLine(res.data[0]);
        } else {
          setSelectedLine(null);
        }
      }
    } catch (err) {
      console.warn("Failed to load statement lines:", err);
    }
  };

  // Fetch Candidates when selected line changes
  useEffect(() => {
    if (selectedLine && selectedLine.matchStatus !== "matched") {
      loadCandidates(selectedLine._id);
    } else {
      setCandidates([]);
    }
  }, [selectedLine?._id, selectedLine?.matchStatus]);

  const loadCandidates = async (lineId: string) => {
    try {
      setLoadingCandidates(true);
      const res = await financeApi.getLineCandidates(lineId);
      if (res.success) {
        setCandidates(res.candidates || []);
      }
    } catch (err) {
      console.warn("Candidate lookup error:", err);
    } finally {
      setLoadingCandidates(false);
    }
  };

  // Actions
  const handleAutoMatch = async () => {
    try {
      setAutoMatching(true);
      const res = await financeApi.triggerAutoMatch(selectedStatementId || undefined);
      showNotification("success", res.message || "Auto-matching completed successfully!");
      await loadLines();
    } catch (err: any) {
      showNotification("error", err.message || "Auto-match failed");
    } finally {
      setAutoMatching(false);
    }
  };

  const handleConfirmMatch = async (ledgerEntryId: string) => {
    if (!selectedLine) return;
    try {
      await financeApi.confirmStatementMatch({
        lineId: selectedLine._id,
        ledgerEntryId,
      });
      showNotification("success", "Transaction line matched & reconciled with ledger!");
      await loadLines();
    } catch (err: any) {
      showNotification("error", err.message || "Failed to confirm match");
    }
  };

  const handleUnmatch = async () => {
    if (!selectedLine) return;
    try {
      await financeApi.unmatchStatementLine(selectedLine._id);
      showNotification("success", "Statement line reverted to unmatched state.");
      await loadLines();
    } catch (err: any) {
      showNotification("error", err.message || "Failed to unmatch line");
    }
  };

  const handleIgnoreLine = async () => {
    if (!selectedLine) return;
    const reason = prompt("Enter justification for ignoring line (e.g. Bank charge, contra adjustment):");
    if (!reason) return;
    try {
      await financeApi.ignoreStatementLine({
        lineId: selectedLine._id,
        reason,
      });
      showNotification("success", "Line marked as ignored.");
      await loadLines();
    } catch (err: any) {
      showNotification("error", err.message || "Failed to ignore line");
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadCsvText.trim()) {
      alert("Please provide CSV content");
      return;
    }
    try {
      setUploading(true);
      const res = await financeApi.uploadBankStatement({
        csvContent: uploadCsvText,
        bankAccountId: selectedAccountId || undefined,
      });
      showNotification("success", res.message || "Statement imported successfully!");
      setIsUploadOpen(false);
      setUploadCsvText("");
      await loadAccountsAndStatements();
      await loadLines();
    } catch (err: any) {
      showNotification("error", err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDirectIncomeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLine) return;
    try {
      setSavingDirectIncome(true);
      const res = await financeApi.recordDirectIncome({
        lineId: selectedLine._id,
        donorName: directIncomeDonor.donorName,
        email: directIncomeDonor.email,
        phone: directIncomeDonor.phone,
        pan: directIncomeDonor.pan || undefined,
        workAreaId: directIncomeDonor.workAreaId,
        financialType: directIncomeDonor.financialType,
        taxExemption: directIncomeDonor.taxExemption,
      });
      showNotification("success", res.message || "Direct bank deposit recorded and reconciled!");
      setIsDirectIncomeOpen(false);
      await loadLines();
    } catch (err: any) {
      showNotification("error", err.message || "Failed to record direct income");
    } finally {
      setSavingDirectIncome(false);
    }
  };

  // Helper sample CSV for quick testing in UI
  const fillSampleCsv = () => {
    const today = new Date().toISOString().split("T")[0];
    const sample = `Txn Date,Description,Ref No,Debit,Credit,Balance
${today},UPI/P2A/512948291039/Donation for Healthcare,UPI512948291039,,50000.00,1050000.00
${today},Razorpay Payout Settlement UTR789218201,UTR789218201,,3245200.00,4295200.00
${today},NEFT/VND/MED98210/Apollo Pharmacy Bulk Supplies,NEFTMED98210,12500.00,,4282700.00
${today},Direct Deposit Cash CDM Cash Deposit Branch,CDM90812,,25000.00,4307700.00
${today},Bank Maintenance & Consolidated SMS Alert Charges,CHG9921,118.00,,4307582.00`;
    setUploadCsvText(sample);
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
      <div className="bg-[#0b1b32] border border-[#163156] rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>Automated Bank Reconciliation Engine</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Bank & Settlement Reconciliation</h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Match official bank statement feeds with payment gateway settlements and manual donation receipts to guarantee zero discrepancy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Bank Account Selector */}
            <div className="relative">
              <select
                value={selectedAccountId}
                onChange={(e) => setSelectedAccountId(e.target.value)}
                className="bg-[#0e2444] border border-[#1f4273] rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-emerald-500 pr-8"
              >
                {bankAccounts.map((acc) => (
                  <option key={acc._id} value={acc._id}>
                    {acc.bankName} ({acc.accountNumberMasked}) {acc.isPrimary ? "• Primary" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Statement Filter */}
            {statements.length > 0 && (
              <select
                value={selectedStatementId}
                onChange={(e) => setSelectedStatementId(e.target.value)}
                className="bg-[#0e2444] border border-[#1f4273] rounded-xl px-3 py-2.5 text-xs text-slate-300 font-medium focus:outline-none focus:border-emerald-500"
              >
                <option value="">All Uploaded Statements</option>
                {statements.map((s) => (
                  <option key={s._id} value={s._id}>
                    Stmt: {new Date(s.periodFrom).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} -{" "}
                    {new Date(s.periodTo).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} ({s.lineCount} lines)
                  </option>
                ))}
              </select>
            )}

            {/* Auto Match Button */}
            <button
              onClick={handleAutoMatch}
              disabled={autoMatching}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-sm font-medium shadow-md transition disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${autoMatching ? "animate-spin" : ""}`} />
              <span>{autoMatching ? "Matching..." : "Auto-Match All"}</span>
            </button>

            {/* Upload Button */}
            <button
              onClick={() => setIsUploadOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14325a] hover:bg-[#1a3e6f] border border-[#234b80] text-slate-200 rounded-xl text-sm font-medium transition"
            >
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Upload CSV</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#163156]/80">
          <div className="bg-[#091628]/70 border border-[#132d52] rounded-xl p-3.5">
            <span className="text-xs text-slate-400 font-medium">Total Statement Credits</span>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">
              ₹ {Number(summary.totalCreditsRupees || 0).toLocaleString("en-IN")}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
              <ArrowDownLeft className="w-3 h-3 text-emerald-400" />
              Inflow from donors & settlements
            </div>
          </div>

          <div className="bg-[#091628]/70 border border-[#132d52] rounded-xl p-3.5">
            <span className="text-xs text-slate-400 font-medium">Total Statement Debits</span>
            <div className="text-lg font-bold text-amber-400 mt-0.5">
              ₹ {Number(summary.totalDebitsRupees || 0).toLocaleString("en-IN")}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3 text-amber-400" />
              Program expenses & bank fees
            </div>
          </div>

          <div className="bg-[#091628]/70 border border-[#132d52] rounded-xl p-3.5">
            <span className="text-xs text-slate-400 font-medium">Reconciled Volume</span>
            <div className="text-lg font-bold text-teal-300 mt-0.5">
              ₹ {Number(summary.reconciledRupees || 0).toLocaleString("en-IN")}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-teal-400" />
              {summary.counts?.matched || 0} transaction lines verified
            </div>
          </div>

          <div className="bg-[#091628]/70 border border-[#132d52] rounded-xl p-3.5">
            <span className="text-xs text-slate-400 font-medium">Unmatched Discrepancy</span>
            <div className={`text-lg font-bold mt-0.5 ${summary.discrepancyRupees > 0 ? "text-rose-400" : "text-slate-400"}`}>
              ₹ {Number(summary.discrepancyRupees || 0).toLocaleString("en-IN")}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-rose-400" />
              {summary.counts?.unmatched || 0} lines requiring action
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Two-Pane Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Pane: Statement Lines (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0b1b32] border border-[#163156] rounded-2xl shadow-xl overflow-hidden">
          {/* Filter Bar & Tabs */}
          <div className="p-4 border-b border-[#163156] bg-[#0d213d] flex flex-wrap items-center justify-between gap-3">
            {/* Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#081527] rounded-xl border border-[#19365c]">
              {(
                [
                  { id: "unmatched", label: "Unmatched", count: summary.counts?.unmatched },
                  { id: "suggested", label: "Suggested", count: summary.counts?.suggested },
                  { id: "matched", label: "Matched", count: summary.counts?.matched },
                  { id: "ignored", label: "Ignored", count: summary.counts?.ignored },
                  { id: "all", label: "All Lines", count: summary.counts?.all },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        activeTab === tab.id ? "bg-emerald-500/30 text-emerald-200" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search narration, ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#081527] border border-[#19365c] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-500"
              />
            </div>
          </div>

          {/* Statement Lines Table / List */}
          <div className="divide-y divide-[#163156]/60 max-h-[620px] overflow-y-auto">
            {lines.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <FileSpreadsheet className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-sm font-medium">No statement lines found in this view.</p>
                <p className="text-xs text-slate-500 mt-1">Upload a statement CSV to begin auto-reconciling.</p>
              </div>
            ) : (
              lines.map((line) => {
                const isSelected = selectedLine?._id === line._id;
                const isCredit = line.creditPaise > 0;
                const amount = (isCredit ? line.creditPaise : line.debitPaise) / 100;

                return (
                  <div
                    key={line._id}
                    onClick={() => setSelectedLine(line)}
                    className={`p-4 transition cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-emerald-950/30 border-l-4 border-l-emerald-400"
                        : "hover:bg-[#0e2444]/60"
                    }`}
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-400">
                          {new Date(line.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        {line.reference && (
                          <span className="text-[10px] bg-[#122846] text-slate-300 font-mono px-2 py-0.5 rounded border border-[#1c3c69]">
                            {line.reference}
                          </span>
                        )}
                        {/* Status Badge */}
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            line.matchStatus === "matched"
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              : line.matchStatus === "suggested"
                              ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                              : line.matchStatus === "ignored"
                              ? "bg-slate-700/50 text-slate-400 border border-slate-600/30"
                              : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {line.matchStatus.toUpperCase()}
                        </span>
                      </div>

                      <p className="text-sm text-slate-200 font-medium truncate" title={line.narration}>
                        {line.narration}
                      </p>

                      {line.notes && (
                        <p className="text-[11px] text-slate-400 italic truncate">{line.notes}</p>
                      )}
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div
                        className={`text-sm font-bold font-mono ${
                          isCredit ? "text-emerald-400" : "text-amber-400"
                        }`}
                      >
                        {isCredit ? "+" : "-"} ₹ {amount.toLocaleString("en-IN")}
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                        {isCredit ? "Credit (Deposit)" : "Debit (Disbursement)"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Match Inspector & Action Hub (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {selectedLine ? (
            <div className="bg-[#0b1b32] border border-[#163156] rounded-2xl p-6 shadow-xl space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#163156] pb-4">
                <div className="space-y-0.5">
                  <div className="text-xs text-slate-400 font-medium">Reconciliation Inspector</div>
                  <h3 className="text-base font-bold text-white">Line Details</h3>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    selectedLine.matchStatus === "matched"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  }`}
                >
                  {selectedLine.matchStatus.toUpperCase()}
                </span>
              </div>

              {/* Selected Line Card */}
              <div className="bg-[#071527] border border-[#142e50] rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] text-slate-400">Statement Date</span>
                    <div className="text-sm font-medium text-white">
                      {new Date(selectedLine.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400">Amount</span>
                    <div
                      className={`text-base font-bold font-mono ${
                        selectedLine.creditPaise > 0 ? "text-emerald-400" : "text-amber-400"
                      }`}
                    >
                      ₹ {((selectedLine.creditPaise || selectedLine.debitPaise) / 100).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400">Bank Narration</span>
                  <div className="text-xs text-slate-200 bg-[#0c203b] p-2.5 rounded-lg border border-[#18365e] font-mono break-all mt-1">
                    {selectedLine.narration}
                  </div>
                </div>

                {selectedLine.reference && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Reference / UTR:</span>
                    <span className="font-mono text-emerald-300 font-medium">{selectedLine.reference}</span>
                  </div>
                )}
              </div>

              {/* State 1: Line is Already Matched */}
              {selectedLine.matchStatus === "matched" ? (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Successfully Reconciled with Ledger</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      This statement line has been paired with an immutable ledger entry.
                    </p>
                    {selectedLine.matchedLedgerEntryId && (
                      <div className="text-xs font-mono text-slate-300 bg-[#071527] p-2 rounded border border-[#163156] mt-2">
                        Ledger ID: {typeof selectedLine.matchedLedgerEntryId === "object" ? selectedLine.matchedLedgerEntryId.entryNo || selectedLine.matchedLedgerEntryId._id : selectedLine.matchedLedgerEntryId}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleUnmatch}
                    className="w-full py-2.5 px-4 bg-[#142e50] hover:bg-rose-950/50 hover:text-rose-200 border border-[#204575] hover:border-rose-500/50 text-slate-300 rounded-xl text-xs font-medium transition flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Unlink / Revert Match</span>
                  </button>
                </div>
              ) : (
                /* State 2: Unmatched or Suggested */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Link2 className="w-3.5 h-3.5 text-emerald-400" />
                      Matching Ledger Candidates
                    </span>
                    {loadingCandidates && <span className="text-[11px] text-slate-400 animate-pulse">Searching...</span>}
                  </div>

                  {candidates.length === 0 ? (
                    <div className="p-6 bg-[#071527] border border-[#142e50] rounded-xl text-center space-y-2">
                      <HelpCircle className="w-8 h-8 text-slate-600 mx-auto" />
                      <p className="text-xs text-slate-300 font-medium">No matching ledger records found.</p>
                      <p className="text-[11px] text-slate-500">
                        This bank transaction does not match any existing donation or expense record.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-[260px] overflow-y-auto">
                      {candidates.map((cand) => (
                        <div
                          key={cand.ledgerEntryId}
                          className="p-3 bg-[#071527] border border-[#183a66] hover:border-emerald-500/50 rounded-xl space-y-2 transition"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-white">{cand.entryNo}</span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                cand.confidence === "high"
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                  : "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                              }`}
                            >
                              {cand.confidence.toUpperCase()} CONFIDENCE
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs text-slate-300">
                            <span>{cand.head}</span>
                            <span className="font-mono font-bold text-emerald-400">
                              ₹ {cand.amountRupees.toLocaleString("en-IN")}
                            </span>
                          </div>

                          <button
                            onClick={() => handleConfirmMatch(cand.ledgerEntryId)}
                            className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Confirm Match & Reconcile</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions for Unmatched Lines */}
                  <div className="pt-4 border-t border-[#163156] space-y-2">
                    {selectedLine.creditPaise > 0 && (
                      <button
                        onClick={() => {
                          setDirectIncomeDonor((prev) => ({
                            ...prev,
                            financialType: `Direct Bank Donation (${selectedLine.reference || "Transfer"})`,
                          }));
                          setIsDirectIncomeOpen(true);
                        }}
                        className="w-full py-2.5 px-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-xl text-xs font-medium shadow transition flex items-center justify-center gap-2"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>Record as Direct Income & Reconcile</span>
                      </button>
                    )}

                    <button
                      onClick={handleIgnoreLine}
                      className="w-full py-2 px-4 bg-[#081527] hover:bg-[#0f284a] border border-[#19365c] text-slate-400 hover:text-slate-200 rounded-xl text-xs font-medium transition"
                    >
                      Ignore / Bank Charge Adjustment
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#0b1b32] border border-[#163156] rounded-2xl p-12 text-center text-slate-400 shadow-xl">
              <Eye className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-medium">Select a statement line on the left</p>
              <p className="text-xs text-slate-500 mt-1">
                Inspect matched ledger entries or pair unmatched lines to maintain zero discrepancy.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Bank Statement Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1b32] border border-[#1c3e6b] rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#163156] pb-4">
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Upload Bank Statement CSV</h3>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Disbursing / Depository Bank Account</label>
                <select
                  value={selectedAccountId}
                  onChange={(e) => setSelectedAccountId(e.target.value)}
                  className="w-full bg-[#081527] border border-[#19365c] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {bankAccounts.map((a) => (
                    <option key={a._id} value={a._id}>
                      {a.bankName} ({a.accountNumberMasked}) {a.isPrimary ? "• Primary" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-slate-300">Paste Bank Statement CSV Text</label>
                  <button
                    type="button"
                    onClick={fillSampleCsv}
                    className="text-[11px] text-emerald-400 hover:underline font-medium"
                  >
                    + Paste Sample SBI / HDFC CSV
                  </button>
                </div>
                <textarea
                  rows={8}
                  value={uploadCsvText}
                  onChange={(e) => setUploadCsvText(e.target.value)}
                  placeholder="Txn Date,Description,Ref No,Debit,Credit,Balance&#10;01/04/2025,Donation via UPI,UPI123456,,25000.00,1025000.00"
                  className="w-full bg-[#081527] border border-[#19365c] rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-500 placeholder-slate-600"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Supports SBI, HDFC, ICICI, Axis, or standard columns: Date, Description, Ref, Debit, Credit, Balance.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#163156]">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 bg-[#122846] hover:bg-[#18365e] text-slate-300 rounded-xl text-xs font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-medium shadow-md transition disabled:opacity-50 flex items-center gap-2"
                >
                  {uploading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Parsing & Importing...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Import Statement</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Direct Income Entry Modal */}
      {isDirectIncomeOpen && selectedLine && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1b32] border border-[#1c3e6b] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#163156] pb-4">
              <div className="flex items-center gap-2.5">
                <PlusCircle className="w-5 h-5 text-teal-400" />
                <h3 className="text-lg font-bold text-white">Record Direct Bank Income</h3>
              </div>
              <button
                onClick={() => setIsDirectIncomeOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#071527] p-3 rounded-xl border border-[#142e50] flex justify-between items-center text-xs">
              <span className="text-slate-400">Statement Credit Amount:</span>
              <span className="text-emerald-400 font-bold font-mono text-sm">
                ₹ {(selectedLine.creditPaise / 100).toLocaleString("en-IN")}
              </span>
            </div>

            <form onSubmit={handleDirectIncomeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Donor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Khan or Corporate Partner"
                  value={directIncomeDonor.donorName}
                  onChange={(e) => setDirectIncomeDonor({ ...directIncomeDonor, donorName: e.target.value })}
                  className="w-full bg-[#081527] border border-[#19365c] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={directIncomeDonor.email}
                    onChange={(e) => setDirectIncomeDonor({ ...directIncomeDonor, email: e.target.value })}
                    className="w-full bg-[#081527] border border-[#19365c] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone</label>
                  <input
                    type="text"
                    value={directIncomeDonor.phone}
                    onChange={(e) => setDirectIncomeDonor({ ...directIncomeDonor, phone: e.target.value })}
                    className="w-full bg-[#081527] border border-[#19365c] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Work Area / Sector</label>
                  <select
                    value={directIncomeDonor.workAreaId}
                    onChange={(e) => setDirectIncomeDonor({ ...directIncomeDonor, workAreaId: e.target.value })}
                    className="w-full bg-[#081527] border border-[#19365c] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="EDU">Education & Learning (EDU)</option>
                    <option value="HLT">Healthcare & Well-being (HLT)</option>
                    <option value="WYE">Women & Youth (WYE)</option>
                    <option value="SLE">Livelihoods & Skilling (SLE)</option>
                    <option value="SJL">Social Justice & Legal (SJL)</option>
                    <option value="AGR">Agriculture & Food (AGR)</option>
                    <option value="ENV">Environment & Climate (ENV)</option>
                    <option value="HRR">Emergency Relief (HRR)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Donor PAN (Optional)</label>
                  <input
                    type="text"
                    placeholder="ABCDE1234F"
                    value={directIncomeDonor.pan}
                    onChange={(e) => setDirectIncomeDonor({ ...directIncomeDonor, pan: e.target.value.toUpperCase() })}
                    className="w-full bg-[#081527] border border-[#19365c] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#163156]">
                <button
                  type="button"
                  onClick={() => setIsDirectIncomeOpen(false)}
                  className="px-4 py-2 bg-[#122846] hover:bg-[#18365e] text-slate-300 rounded-xl text-xs font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingDirectIncome}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-medium shadow-md transition disabled:opacity-50"
                >
                  {savingDirectIncome ? "Recording & Reconciling..." : "Save & Reconcile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
