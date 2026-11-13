import React, { useState, useEffect } from "react";
import {
  RotateCcw,
  ShieldAlert,
  History,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  ExternalLink,
  Receipt,
  User,
  ArrowRight,
  X,
  FileText,
  DollarSign,
  Info,
} from "lucide-react";
import { financeApi } from "../../services/financeApi";

export default function RefundsManager() {
  const [refunds, setRefunds] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>({
    totalRefundedRupees: 0,
    refundCount: 0,
    processedCount: 0,
    requestedCount: 0,
  });

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Detail Modal / Drawer
  const [selectedRefund, setSelectedRefund] = useState<any | null>(null);

  // Process Refund Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationSearch, setDonationSearch] = useState("");
  const [donationSearchResults, setDonationSearchResults] = useState<any[]>([]);
  const [searchingDonations, setSearchingDonations] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<any | null>(null);

  const [refundType, setRefundType] = useState<"full" | "partial">("full");
  const [refundAmountRupees, setRefundAmountRupees] = useState<string>("");
  const [refundReason, setRefundReason] = useState("Donor requested cancellation within cooling-off period");
  const [refundNotes, setRefundNotes] = useState("");
  const [processing, setProcessing] = useState(false);

  // Toast notification
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showNotification = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    loadRefunds();
  }, [statusFilter, searchQuery, currentPage]);

  const loadRefunds = async () => {
    try {
      setLoading(true);
      const res = await financeApi.getRefunds({
        status: statusFilter === "all" ? undefined : statusFilter,
        search: searchQuery || undefined,
        page: currentPage,
        limit: 20,
      });

      if (res.success) {
        setRefunds(res.data || []);
        if (res.summary) setSummary(res.summary);
        if (res.pagination) {
          setTotalPages(res.pagination.pages || 1);
        }
      }
    } catch (err: any) {
      console.warn("Failed to load refunds:", err);
    } finally {
      setLoading(false);
    }
  };

  // Search Donations for Refund
  useEffect(() => {
    if (!donationSearch.trim() || donationSearch.trim().length < 2) {
      setDonationSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearchingDonations(true);
        const res = await financeApi.getDonations({
          search: donationSearch.trim(),
          limit: 6,
        });
        if (res.success) {
          // Exclude already fully refunded or failed
          const eligible = (res.data || []).filter(
            (d: any) => d.paymentStatus !== "Failed" && d.paymentStatus !== "Refunded"
          );
          setDonationSearchResults(eligible);
        }
      } catch (err) {
        console.warn("Donation search failed:", err);
      } finally {
        setSearchingDonations(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [donationSearch]);

  const handleSelectDonation = (donation: any) => {
    setSelectedDonation(donation);
    const amount = donation.amount || (donation.amountPaise ? donation.amountPaise / 100 : 0);
    setRefundAmountRupees(String(amount));
    setRefundType("full");
  };

  const handleProcessRefundSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDonation) {
      alert("Please select an original donation to refund");
      return;
    }

    const amountNum = parseFloat(refundAmountRupees);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert("Please enter a valid refund amount");
      return;
    }

    try {
      setProcessing(true);
      const res = await financeApi.processRefund({
        donationId: selectedDonation._id,
        amount: amountNum,
        reason: refundReason + (refundNotes ? ` - Notes: ${refundNotes}` : ""),
      });

      showNotification("success", res.message || "Refund successfully recorded and ledger debited!");
      setIsModalOpen(false);
      setSelectedDonation(null);
      setDonationSearch("");
      setRefundAmountRupees("");
      setRefundNotes("");
      await loadRefunds();
    } catch (err: any) {
      showNotification("error", err.message || "Failed to process refund");
    } finally {
      setProcessing(false);
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
            <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider">
              <RotateCcw className="w-4 h-4 text-rose-600" />
              <span>Refunds & Ledger Reversal Engine</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Refunds & Cancellations</h1>
            <p className="text-slate-500 text-sm max-w-2xl font-medium">
              Process authorized donor refunds, maintain dual-entry ledger debit trails, and revoke 80G tax certificates in full compliance with Indian charity regulations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedDonation(null);
                setDonationSearch("");
                setRefundAmountRupees("");
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white rounded-xl text-sm font-bold shadow-md transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Process New Refund</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
            <span className="text-xs text-slate-500 font-medium">Total Refunded Volume</span>
            <div className="text-lg font-black text-rose-600 mt-0.5">
              ₹ {Number(summary.totalRefundedRupees || 0).toLocaleString("en-IN")}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Dual-entry reversed debits</div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
            <span className="text-xs text-slate-500 font-medium">Total Refunds Processed</span>
            <div className="text-lg font-black text-slate-900 mt-0.5">{summary.refundCount || 0}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">All time cancellations</div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
            <span className="text-xs text-slate-500 font-medium">Completed Payouts</span>
            <div className="text-lg font-black text-emerald-700 mt-0.5">{summary.processedCount || 0}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Returned to donor source</div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
            <span className="text-xs text-slate-500 font-medium">Pending Requests</span>
            <div className="text-lg font-black text-amber-700 mt-0.5">{summary.requestedCount || 0}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Awaiting supervisor approval</div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Status Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200">
              {(
                [
                  { id: "all", label: "All Refunds" },
                  { id: "processed", label: "Processed" },
                  { id: "requested", label: "Requested" },
                  { id: "approved", label: "Approved" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    statusFilter === tab.id
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search refund #, receipt #, donor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-rose-500 placeholder-slate-400 shadow-2xs"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-700 uppercase tracking-wider bg-slate-50">
                <th className="py-3 px-4">Refund No</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Original Receipt</th>
                <th className="py-3 px-4">Donor Name</th>
                <th className="py-3 px-4 text-right">Amount (₹)</th>
                <th className="py-3 px-4">Justification Reason</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Authorized By</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {refunds.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <History className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-700">No refund records found.</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Click "Process New Refund" to issue a refund against an eligible donation.
                    </p>
                  </td>
                </tr>
              ) : (
                refunds.map((refund) => {
                  const don = refund.donationId || {};
                  const amountRupees = (refund.amountPaise || 0) / 100;

                  return (
                    <tr
                      key={refund._id}
                      className="hover:bg-slate-50/80 transition cursor-pointer"
                      onClick={() => setSelectedRefund(refund)}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-rose-700">{refund.refundNo}</td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {new Date(refund.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-emerald-700 font-bold">
                          {don.receiptNo || "N/A"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-900 font-bold">{don.donorName || "Anonymous"}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-black text-rose-700">
                        ₹ {amountRupees.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate" title={refund.reason}>
                        {refund.reason}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            refund.status === "processed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : refund.status === "requested"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {refund.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">{refund.approvedBy || refund.requestedBy || "Admin"}</td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRefund(refund);
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer"
                        >
                          Audit
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Process Refund Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-5 h-5 text-rose-600" />
                <h3 className="text-lg font-bold text-slate-900">Process Donation Refund</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProcessRefundSubmit} className="space-y-4">
              {/* Step 1: Select Original Donation */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  1. Search Original Donation (Receipt # or Donor Name) *
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search e.g. REC-2025 or Ayesha..."
                    value={donationSearch}
                    onChange={(e) => setDonationSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500 placeholder-slate-400"
                  />
                  {searchingDonations && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 animate-pulse font-medium">
                      Searching...
                    </div>
                  )}
                </div>

                {/* Search Results Dropdown */}
                {donationSearchResults.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-xl max-h-48 overflow-y-auto divide-y divide-slate-100 shadow-lg">
                    {donationSearchResults.map((d) => (
                      <div
                        key={d._id}
                        onClick={() => {
                          handleSelectDonation(d);
                          setDonationSearchResults([]);
                        }}
                        className="p-2.5 hover:bg-slate-50 cursor-pointer flex justify-between items-center text-xs transition"
                      >
                        <div>
                          <div className="font-mono text-emerald-700 font-bold">{d.receiptNo}</div>
                          <div className="text-slate-900 font-bold">{d.donorName}</div>
                          <div className="text-[10px] text-slate-500">{d.financialType}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-slate-900">
                            ₹ {Number(d.amount).toLocaleString("en-IN")}
                          </div>
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-bold">
                            {d.paymentStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Selected Donation Pill */}
                {selectedDonation && (
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-700">{selectedDonation.receiptNo}</span>
                        <span className="text-slate-900 font-bold">• {selectedDonation.donorName}</span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        Mode: {selectedDonation.paymentMode} | Sector: {selectedDonation.workAreaId || "General"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-slate-900 font-mono">
                        ₹ {Number(selectedDonation.amount).toLocaleString("en-IN")}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-bold">Eligible for refund</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 2: Refund Details */}
              {selectedDonation && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Refund Type</label>
                      <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
                        <button
                          type="button"
                          onClick={() => {
                            setRefundType("full");
                            setRefundAmountRupees(String(selectedDonation.amount));
                          }}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                            refundType === "full" ? "bg-rose-600 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          Full Refund
                        </button>
                        <button
                          type="button"
                          onClick={() => setRefundType("partial")}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                            refundType === "partial" ? "bg-rose-600 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          Partial Refund
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Refund Amount (₹) *</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        disabled={refundType === "full"}
                        value={refundAmountRupees}
                        onChange={(e) => setRefundAmountRupees(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500 font-mono font-bold disabled:opacity-75"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mandatory Justification Reason *
                    </label>
                    <select
                      value={refundReason}
                      onChange={(e) => setRefundReason(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500 mb-2"
                    >
                      <option value="Donor requested cancellation within cooling-off period">
                        Donor requested cancellation within cooling-off period
                      </option>
                      <option value="Duplicate payment / duplicate transaction">Duplicate payment / duplicate transaction</option>
                      <option value="Erroneous amount entered by donor">Erroneous amount entered by donor</option>
                      <option value="Emergency medical case fulfilled / goal reached">Emergency medical case fulfilled / goal reached</option>
                      <option value="Bank chargeback or dispute resolution">Bank chargeback or dispute resolution</option>
                      <option value="Other administrative reversal">Other administrative reversal</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Additional notes / bank approval reference (optional)..."
                      value={refundNotes}
                      onChange={(e) => setRefundNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500 placeholder-slate-400"
                    />
                  </div>

                  {/* Statutory Alert */}
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-xs text-amber-900">
                    <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-900">Audit Compliance Notice:</span>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        Processing this refund creates a permanent debit reversal on the immutable ledger and marks 80G tax receipt #{selectedDonation.receiptNo} as Revoked on the public verification portal.
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing || !selectedDonation}
                  className="px-5 py-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold shadow-md transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {processing ? "Processing Refund..." : "Confirm & Execute Refund"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Audit Detail Modal */}
      {selectedRefund && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-rose-600" />
                <h3 className="text-lg font-bold text-slate-900">Refund Audit Trail</h3>
              </div>
              <button
                onClick={() => setSelectedRefund(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">Refund Reference</span>
                  <span className="text-sm font-mono font-bold text-rose-700">{selectedRefund.refundNo}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">Refund Amount</span>
                  <span className="text-base font-mono font-black text-rose-700">
                    ₹ {((selectedRefund.amountPaise || 0) / 100).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">Status</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {selectedRefund.status.toUpperCase()}
                  </span>
                </div>
                {selectedRefund.razorpayRefundId && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Gateway Refund ID</span>
                    <span className="font-mono text-slate-700 font-bold">{selectedRefund.razorpayRefundId}</span>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-slate-800">Original Donation Link</span>
                {selectedRefund.donationId ? (
                  <div className="text-xs space-y-1 text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Receipt No:</span>
                      <span className="font-mono text-emerald-700 font-bold">{selectedRefund.donationId.receiptNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Donor Name:</span>
                      <span className="text-slate-900 font-bold">{selectedRefund.donationId.donorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Payment Status:</span>
                      <span className="text-amber-700 font-bold">{selectedRefund.donationId.paymentStatus}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">Donation details archived</p>
                )}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
                <span className="text-xs font-bold text-slate-800">Justification & Notes</span>
                <p className="text-xs text-slate-700 italic">{selectedRefund.reason}</p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 flex justify-between font-medium">
                  <span>Authorized by: {selectedRefund.approvedBy || "Super Admin"}</span>
                  <span>{new Date(selectedRefund.createdAt).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedRefund(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Close Audit View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
