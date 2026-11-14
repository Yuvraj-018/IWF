import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import { formatKolkataTime } from "../../services/httpClient";
import {
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  Loader2,
  User,
  ExternalLink,
  MessageSquare,
  RefreshCw,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function AccessRequestsManager() {
  const { user } = useAuth();

  const isSuperAdmin =
    user?.roles?.includes("super_admin") ||
    user?.role === "superadmin" ||
    user?.permissions?.includes("*") ||
    user?.permissions?.includes("system.staff:edit");

  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [search, setSearch] = useState("");
  const [pendingCount, setPendingCount] = useState(0);

  // Action states
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const loadRequests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.listAccessRequests({
        status: statusFilter === "all" ? undefined : statusFilter,
      });
      if (res?.success && Array.isArray(res.data)) {
        setRequests(res.data);
        if (res.pendingCount !== undefined) {
          setPendingCount(res.pendingCount);
        }
      } else {
        toast.error(res?.message || "Failed to load access requests.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load access requests.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleApprove = async (id: string, requesterName: string, permission: string) => {
    if (!confirm(`Grant read-only access for "${permission}" to ${requesterName}?`)) return;

    setActionInProgress(id);
    try {
      const res = await api.approveAccessRequest(id, "Approved by Super Administrator");
      if (res.success) {
        toast.success(`Access granted to ${requesterName} for ${permission}.`);
        loadRequests();
      } else {
        toast.error(res.message || "Failed to approve access request.");
      }
    } catch (err: any) {
      toast.error(err.message || "Approval failed.");
    } finally {
      setActionInProgress(null);
    }
  };

  const handleRejectConfirm = async (id: string) => {
    if (!rejectReason.trim()) {
      toast.error("Please enter a reason for declining the access request.");
      return;
    }

    setActionInProgress(id);
    try {
      const res = await api.rejectAccessRequest(id, rejectReason.trim());
      if (res.success) {
        toast.success("Access request declined.");
        setRejectingId(null);
        setRejectReason("");
        loadRequests();
      } else {
        toast.error(res.message || "Failed to decline request.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to decline request.");
    } finally {
      setActionInProgress(null);
    }
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const q = search.toLowerCase().trim();
      if (!q) return true;
      return (
        r.requesterName?.toLowerCase().includes(q) ||
        r.requesterEmail?.toLowerCase().includes(q) ||
        r.requestedPermission?.toLowerCase().includes(q) ||
        r.moduleName?.toLowerCase().includes(q) ||
        r.reason?.toLowerCase().includes(q)
      );
    });
  }, [requests, search]);

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Access Requests &amp; Elevation Governance</span>
            <span className="w-2 h-2 rounded-full bg-orange-500" />
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {isSuperAdmin
              ? "Review, approve, or decline read-only page access requests submitted by foundation staff members."
              : "Track the review status of your requested page and module permissions."}
          </p>
        </div>

        <button
          onClick={loadRequests}
          disabled={loading}
          className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-orange-500 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Requests</span>
        </button>
      </div>

      {/* 2. Status & Metric Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Review</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-black text-orange-600">{pendingCount}</span>
            <span className="p-2 rounded-lg bg-orange-50 text-orange-600">
              <Clock className="w-4 h-4" />
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status Scope</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-bold text-slate-800 capitalize">{statusFilter} Requests</span>
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Filter className="w-4 h-4" />
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Admin Authority</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs font-bold text-slate-800">
              {isSuperAdmin ? "Super Admin (Full Approver)" : "Staff Viewer"}
            </span>
            <span className="p-2 rounded-lg bg-slate-100 text-slate-600">
              <ShieldCheck className="w-4 h-4 text-orange-500" />
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Current Records</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-black text-slate-900">{filteredRequests.length}</span>
            <span className="p-2 rounded-lg bg-slate-100 text-slate-600">
              <KeyRound className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>

      {/* 3. Search & Tabs Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by requester, permission key, module, or reason..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {(["pending", "all", "approved", "rejected"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? "bg-[#071527] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st === "pending" ? `Pending Review (${pendingCount})` : st}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Requests Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-2">
            <Loader2 className="w-7 h-7 animate-spin text-orange-500" />
            <p className="text-xs font-medium">Loading access requests...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <KeyRound className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-bold text-slate-700">No Access Requests Found</p>
            <p className="text-xs text-slate-400 mt-1">
              {statusFilter === "pending"
                ? "No pending access requests require your review."
                : "No records match the current filter."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Requester</th>
                  <th className="py-3 px-4">Target Resource &amp; Permission</th>
                  <th className="py-3 px-4">Access Level</th>
                  <th className="py-3 px-4">Business Justification</th>
                  <th className="py-3 px-4">Submitted At</th>
                  <th className="py-3 px-4">Status &amp; Review</th>
                  {isSuperAdmin && <th className="py-3 px-4 text-right">Approval Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-slate-50/60 transition">
                    {/* Requester */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center font-bold text-[11px]">
                          {req.requesterName?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{req.requesterName}</p>
                          <p className="text-[11px] text-slate-400">{req.requesterEmail}</p>
                          <span className="inline-block mt-0.5 text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                            {req.requesterRole}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Target Resource & Permission */}
                    <td className="py-3.5 px-4 align-top">
                      <p className="font-bold text-slate-800">{req.moduleName || "Protected Section"}</p>
                      <code className="inline-block mt-1 text-[11px] font-mono text-orange-700 bg-orange-50 border border-orange-200 px-1.5 py-0.5 rounded">
                        {req.requestedPermission}
                      </code>
                      {req.requestedResource && (
                        <p className="text-[10px] font-mono text-slate-400 mt-1">
                          {req.requestedResource}
                        </p>
                      )}
                    </td>

                    {/* Access Level */}
                    <td className="py-3.5 px-4 align-top">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          req.accessType === "read_only"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-purple-50 text-purple-700 border border-purple-200"
                        }`}
                      >
                        <ShieldCheck className="w-3 h-3" />
                        <span>{req.accessType === "read_only" ? "Read-Only" : "Full"}</span>
                      </span>
                    </td>

                    {/* Justification */}
                    <td className="py-3.5 px-4 align-top max-w-xs">
                      <p className="text-xs text-slate-700 break-words leading-relaxed">
                        {req.reason || "No explicit justification provided."}
                      </p>
                    </td>

                    {/* Submitted At */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap text-[11px] text-slate-500">
                      {formatKolkataTime(req.createdAt)}
                    </td>

                    {/* Status & Review Notes */}
                    <td className="py-3.5 px-4 align-top">
                      {req.status === "pending" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Pending Review</span>
                        </span>
                      ) : req.status === "approved" ? (
                        <div>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-orange-600" />
                            <span>Approved</span>
                          </span>
                          <p className="text-[10px] text-slate-400 mt-1">
                            By {req.reviewedByName || "Admin"} • {formatKolkataTime(req.reviewedAt)}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                            <XCircle className="w-3 h-3 text-red-600" />
                            <span>Declined</span>
                          </span>
                          {req.reviewNote && (
                            <p className="text-[10px] text-slate-400 mt-1 italic">
                              &ldquo;{req.reviewNote}&rdquo;
                            </p>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Super Admin Action Controls */}
                    {isSuperAdmin && (
                      <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                        {req.status === "pending" ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleApprove(req._id, req.requesterName, req.requestedPermission)}
                              disabled={actionInProgress === req._id}
                              className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-[11px] rounded-lg shadow-xs transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
                            >
                              {actionInProgress === req._id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Check className="w-3 h-3" />
                              )}
                              <span>Approve Read-Only</span>
                            </button>

                            <button
                              onClick={() => {
                                setRejectingId(req._id);
                                setRejectReason("");
                              }}
                              disabled={actionInProgress === req._id}
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 font-bold text-[11px] rounded-lg border border-slate-200 hover:border-red-200 transition flex items-center gap-1 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                              <span>Decline</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">Resolved</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Decline Reason Modal */}
      {rejectingId && (
        <div className="fixed inset-0 z-50 bg-[#071527]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Decline Access Request</h3>
              <button
                onClick={() => setRejectingId(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-xs text-slate-600">
                Please provide a brief reason or guidance for the requester:
              </p>
              <textarea
                rows={3}
                required
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Please obtain departmental manager sign-off before requesting financial ledger access..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none resize-none"
              />
            </div>

            <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setRejectingId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRejectConfirm(rejectingId)}
                disabled={actionInProgress === rejectingId}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-1.5"
              >
                {actionInProgress === rejectingId && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Confirm Decline</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

