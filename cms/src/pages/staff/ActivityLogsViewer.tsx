import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import { formatKolkataTime } from "../../services/httpClient";
import {
  FileText,
  Search,
  Filter,
  Download,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Loader2,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

export default function ActivityLogsViewer() {
  const { can } = useAuth();

  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(25);

  // Filters
  const [actorSearch, setActorSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [outcomeFilter, setOutcomeFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Expanded row id for before/after view
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const canExport = can("system.audit:export");

  const loadLogs = async () => {
    setLoading(true);
    try {
      const res = await api.listAuditLogs({
        page,
        limit,
        actor: actorSearch.trim() || undefined,
        action: actionFilter !== "all" ? actionFilter : undefined,
        outcome: outcomeFilter !== "all" ? outcomeFilter : undefined,
        severity: severityFilter !== "all" ? severityFilter : undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      });

      if (res.success && Array.isArray(res.data)) {
        setLogs(res.data);
        setTotal(res.pagination?.total || res.data.length);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load audit logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, [page, actionFilter, outcomeFilter, severityFilter]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadLogs();
  };

  const handleExportCsv = () => {
    if (!canExport) {
      toast.error("You do not hold permission to export audit records.");
      return;
    }

    const exportUrl = api.getAuditExportUrl({
      actor: actorSearch.trim() || undefined,
      action: actionFilter !== "all" ? actionFilter : undefined,
      outcome: outcomeFilter !== "all" ? outcomeFilter : undefined,
      severity: severityFilter !== "all" ? severityFilter : undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });

    const token = localStorage.getItem("islah_admin_token");
    // Trigger download with auth token header using fetch or window
    fetch(exportUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `islah-audit-trail-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast.success("Audit records exported successfully.");
      })
      .catch((err) => {
        toast.error("Failed to export audit logs: " + err.message);
      });
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case "critical":
        return "bg-rose-100 text-rose-800 border-rose-300";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "warning":
        return "bg-amber-100 text-amber-800 border-amber-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome?.toLowerCase()) {
      case "success":
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case "denied":
        return <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />;
      case "failure":
        return <XCircle className="w-3.5 h-3.5 text-rose-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Activity Logs &amp; Audit Trail</span>
            <span className="w-2 h-2 rounded-full bg-orange-500" />
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable, append-only security logs recording access events, permission evaluations, and record mutations.
          </p>
        </div>

        {canExport && (
          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 bg-[#071527] hover:bg-[#0c2444] text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-4 h-4 text-orange-400" />
            <span>Export CSV Audit Trail</span>
          </button>
        )}
      </div>

      {/* Filter Toolbar */}
      <form onSubmit={handleFilterSubmit} className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Actor search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by actor name / email..."
              value={actorSearch}
              onChange={(e) => setActorSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* Outcome Filter */}
          <select
            value={outcomeFilter}
            onChange={(e) => {
              setOutcomeFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none"
          >
            <option value="all">All Outcomes</option>
            <option value="success">Success</option>
            <option value="denied">Denied (RBAC)</option>
            <option value="failure">Failure / Error</option>
          </select>

          {/* Severity Filter */}
          <select
            value={severityFilter}
            onChange={(e) => {
              setSeverityFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none"
          >
            <option value="all">All Severities</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          {/* Date range inputs */}
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-1/2 px-2 py-1 text-xs border border-slate-200 rounded-lg text-slate-700"
            />
            <span className="text-slate-400 text-xs">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-1/2 px-2 py-1 text-xs border border-slate-200 rounded-lg text-slate-700"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-1 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              setActorSearch("");
              setActionFilter("all");
              setOutcomeFilter("all");
              setSeverityFilter("all");
              setStartDate("");
              setEndDate("");
              setPage(1);
              loadLogs();
            }}
            className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 transition"
          >
            Reset Filters
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg shadow-xs transition"
          >
            Apply Filters
          </button>
        </div>
      </form>

      {/* Logs Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-slate-400 gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <p className="text-xs font-mono">Retrieving immutable audit trail...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="py-20 text-center text-slate-400 bg-white">
            <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-bold text-slate-700">No audit records found</p>
            <p className="text-xs text-slate-400 mt-1">Try clearing your filters to view full log stream.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Timestamp (IST)</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Action / Event</th>
                  <th className="py-3 px-4">Resource Target</th>
                  <th className="py-3 px-4">Outcome</th>
                  <th className="py-3 px-4">Severity</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {logs.map((log) => {
                  const isExpanded = expandedId === log._id;

                  return (
                    <>
                      <tr key={log._id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                          {formatKolkataTime(log.createdAt)}
                        </td>

                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900">{log.actorName || "System"}</p>
                          <p className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">
                            {log.actorEmail || "automated"}
                          </p>
                        </td>

                        <td className="py-3 px-4 font-mono text-[11px] font-semibold text-slate-900">
                          {log.action}
                        </td>

                        <td className="py-3 px-4 text-[11px]">
                          <span className="font-bold text-slate-800">{log.resourceType}</span>
                          {log.resourceId && (
                            <span className="text-slate-400 font-mono ml-1">
                              ({String(log.resourceId).slice(-6)})
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5 font-bold capitalize">
                            {getOutcomeIcon(log.outcome)}
                            <span>{log.outcome}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getSeverityBadge(
                              log.severity
                            )}`}
                          >
                            {log.severity || "info"}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : log._id)}
                            className="p-1 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100 transition cursor-pointer"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </td>
                      </tr>

                      {/* Expandable JSON Diff Row */}
                      {isExpanded && (
                        <tr className="bg-slate-50/90 border-b border-slate-200">
                          <td colSpan={7} className="p-4 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                              <div>
                                <span className="font-bold text-slate-700 block">IP Address:</span>
                                <span className="font-mono text-slate-600">{log.ipAddress || "Internal Server"}</span>
                              </div>
                              <div>
                                <span className="font-bold text-slate-700 block">HTTP Route:</span>
                                <span className="font-mono text-slate-600">
                                  {log.method ? `${log.method} ${log.endpoint}` : "Direct Dispatch"}
                                </span>
                              </div>
                              <div>
                                <span className="font-bold text-slate-700 block">Context Reason:</span>
                                <span className="text-slate-600">{log.reason || "Operational audit record"}</span>
                              </div>
                            </div>

                            {(log.before || log.after) && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                {log.before && (
                                  <div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                                      Before State
                                    </span>
                                    <pre className="p-2.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-[10px] overflow-x-auto max-h-40">
                                      {JSON.stringify(log.before, null, 2)}
                                    </pre>
                                  </div>
                                )}
                                {log.after && (
                                  <div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                                      After State
                                    </span>
                                    <pre className="p-2.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-[10px] overflow-x-auto max-h-40">
                                      {JSON.stringify(log.after, null, 2)}
                                    </pre>
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {total > limit && (
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span>
              Showing {Math.min(total, (page - 1) * limit + 1)} - {Math.min(total, page * limit)} of {total} events
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={page * limit >= total}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
