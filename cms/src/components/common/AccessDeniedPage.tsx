import { useState, useEffect, useCallback } from "react";
import {
  ShieldAlert,
  ArrowLeft,
  Home,
  KeyRound,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Send,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import { AccessRequestModal } from "./AccessRequestModal";
import { formatKolkataTime } from "../../services/httpClient";
import { toast } from "sonner";

interface AccessDeniedPageProps {
  requiredPermission?: string;
  moduleName?: string;
}

export function AccessDeniedPage({ requiredPermission, moduleName }: AccessDeniedPageProps) {
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();

  const [loadingRequests, setLoadingRequests] = useState(false);
  const [existingRequest, setExistingRequest] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshingAuth, setRefreshingAuth] = useState(false);

  const checkExistingRequest = useCallback(async () => {
    if (!requiredPermission) return;
    setLoadingRequests(true);
    try {
      const res = await api.listAccessRequests();
      if (res?.success && Array.isArray(res.data)) {
        // Find latest request for this permission
        const matched = res.data.find(
          (r: any) => r.requestedPermission === requiredPermission
        );
        if (matched) {
          setExistingRequest(matched);
        }
      }
    } catch (err) {
      console.error("Failed to check existing access requests:", err);
    } finally {
      setLoadingRequests(false);
    }
  }, [requiredPermission]);

  useEffect(() => {
    checkExistingRequest();
  }, [checkExistingRequest]);

  const handleRefreshAndCheck = async () => {
    setRefreshingAuth(true);
    try {
      await refreshProfile();
      await checkExistingRequest();
      if (existingRequest?.status === "approved") {
        toast.success("Permission active! Reloading page...");
        window.location.reload();
      } else {
        toast.info("Status refreshed.");
      }
    } catch {
      toast.error("Failed to refresh status.");
    } finally {
      setRefreshingAuth(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-[#0b1f3b] border border-[#16365f] rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center mx-auto mb-5 text-orange-400 shadow-lg shadow-orange-500/10">
            <ShieldAlert className="w-8 h-8 text-orange-500" />
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight">Access Restricted</h1>
          <p className="text-xs text-slate-300 mt-2">
            You do not hold the required authorization to view or manage {moduleName || "this section"}.
          </p>

          {requiredPermission && (
            <div className="my-4 p-3 bg-[#071527] border border-[#1c4070] rounded-xl text-left">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
                <KeyRound className="w-3.5 h-3.5 text-orange-400" />
                <span>Required System Permission</span>
              </div>
              <code className="text-xs font-mono text-orange-300 bg-orange-950/40 px-2 py-0.5 rounded border border-orange-800/40 break-all">
                {requiredPermission}
              </code>
            </div>
          )}

          {/* User identity & roles */}
          <div className="p-3 bg-[#071527]/60 border border-[#16365f] rounded-xl text-xs text-slate-400 text-left mb-5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-400">Signed in as:</span>
              <span className="text-white font-medium">{user?.name} ({user?.email})</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Assigned Roles:</span>
              <span className="text-orange-400 font-semibold">{user?.roles?.join(", ") || "None"}</span>
            </div>
          </div>

          {/* Access Request Status Banner */}
          {loadingRequests ? (
            <div className="p-4 bg-[#071527] border border-[#1c4070] rounded-xl mb-5 flex items-center justify-center gap-2 text-xs text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
              <span>Checking access request status...</span>
            </div>
          ) : existingRequest?.status === "pending" ? (
            <div className="p-4 bg-orange-950/30 border border-orange-800/40 rounded-xl mb-5 text-left">
              <div className="flex items-center gap-2 text-orange-400 font-bold text-xs mb-1.5">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Access Request Awaiting Super Admin Review</span>
              </div>
              <p className="text-[11px] text-slate-300">
                You requested <span className="font-semibold text-white">{existingRequest.accessType === "read_only" ? "Read-Only" : "Full"}</span> access on {formatKolkataTime(existingRequest.createdAt)}. A Super Administrator will review your request shortly.
              </p>
              {existingRequest.reason && (
                <p className="text-[11px] text-slate-400 mt-1 italic">
                  &ldquo;{existingRequest.reason}&rdquo;
                </p>
              )}
              <div className="mt-3 flex items-center justify-end">
                <button
                  onClick={handleRefreshAndCheck}
                  disabled={refreshingAuth}
                  className="px-3 py-1.5 bg-[#071527] hover:bg-[#0c2444] border border-[#1c4070] text-slate-200 text-[11px] font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-orange-400 ${refreshingAuth ? "animate-spin" : ""}`} />
                  <span>Refresh Status</span>
                </button>
              </div>
            </div>
          ) : existingRequest?.status === "approved" ? (
            <div className="p-4 bg-blue-950/40 border border-blue-700/50 rounded-xl mb-5 text-left">
              <div className="flex items-center gap-2 text-blue-300 font-bold text-xs mb-1">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Access Approved!</span>
              </div>
              <p className="text-[11px] text-slate-200">
                Your request for access has been approved by {existingRequest.reviewedByName || "Super Admin"}.
              </p>
              <div className="mt-3 flex items-center justify-end">
                <button
                  onClick={() => {
                    refreshProfile().then(() => window.location.reload());
                  }}
                  className="px-4 py-1.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-[11px] font-bold rounded-lg transition shadow-md cursor-pointer"
                >
                  Enter Section Now
                </button>
              </div>
            </div>
          ) : existingRequest?.status === "rejected" ? (
            <div className="p-4 bg-red-950/30 border border-red-800/40 rounded-xl mb-5 text-left">
              <div className="flex items-center justify-between gap-2 text-red-400 font-bold text-xs mb-1">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Request Declined</span>
                </div>
                <span className="text-[10px] text-slate-400">{formatKolkataTime(existingRequest.reviewedAt)}</span>
              </div>
              <p className="text-[11px] text-slate-300">
                {existingRequest.reviewNote || "Your request was declined by the Super Administrator."}
              </p>
              <div className="mt-3 flex items-center justify-end">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-3 py-1.5 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 text-[11px] font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit New Justification</span>
                </button>
              </div>
            </div>
          ) : (
            /* No request yet — Offer Request Access Action */
            <div className="p-4 bg-[#071527] border border-[#1c4070] rounded-xl mb-5 text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">Need to observe or review this page?</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  Read-Only Workflow
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                You can request read-only access from the Super Administrator. Once approved, you will be able to inspect these records without modifying data.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>Request Read-Only Access from Super Admin</span>
              </button>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#071527] hover:bg-[#0c2444] border border-[#1c4070] text-slate-200 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-5 py-2.5 bg-[#0c2444] hover:bg-[#133560] border border-[#1c4070] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Access Request Submission Modal */}
      {requiredPermission && (
        <AccessRequestModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          requestedPermission={requiredPermission}
          moduleName={moduleName || "Restricted Page"}
          onSuccess={(newReq) => {
            setExistingRequest(newReq);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
