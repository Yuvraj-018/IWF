import { useState } from "react";
import { X, ShieldCheck, KeyRound, Lock, Send, Loader2, Info } from "lucide-react";
import { api } from "../../services/api";
import { toast } from "sonner";

interface AccessRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestedPermission: string;
  resourcePath?: string;
  moduleName?: string;
  onSuccess?: (request: any) => void;
}

export function AccessRequestModal({
  isOpen,
  onClose,
  requestedPermission,
  resourcePath = window.location.pathname,
  moduleName = "Protected Resource",
  onSuccess,
}: AccessRequestModalProps) {
  const [reason, setReason] = useState("");
  const [accessType, setAccessType] = useState<"read_only" | "full">("read_only");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      toast.error("Please enter a brief reason or justification for this access request.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.createAccessRequest({
        requestedResource: resourcePath,
        requestedPermission,
        moduleName,
        reason: reason.trim(),
        accessType,
      });

      if (res.success) {
        toast.success("Access request submitted. A Super Admin has been notified.");
        if (onSuccess) onSuccess(res.data);
        onClose();
      } else {
        toast.error(res.message || "Failed to submit access request.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to submit access request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#071527]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0b1f3b] border border-[#16365f] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#16365f] bg-[#071527]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <KeyRound className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Request Page Access</h2>
              <p className="text-xs text-slate-400">Submit a formal request to Super Administrators</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#16365f] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Target Resource Summary */}
          <div className="p-3.5 bg-[#071527] border border-[#1c4070] rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Target Section:</span>
              <span className="text-white font-semibold">{moduleName}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Path:</span>
              <code className="text-[11px] font-mono text-slate-300 bg-slate-900/60 px-2 py-0.5 rounded">
                {resourcePath}
              </code>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-[#16365f]">
              <span className="text-slate-400 font-medium">Required Permission:</span>
              <code className="text-[11px] font-mono text-orange-300 bg-orange-950/40 px-2 py-0.5 rounded border border-orange-800/40">
                {requestedPermission}
              </code>
            </div>
          </div>

          {/* Access Type Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-2">Requested Access Level</label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setAccessType("read_only")}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  accessType === "read_only"
                    ? "bg-orange-500/15 border-orange-500/50 text-white"
                    : "bg-[#071527]/60 border-[#16365f] text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className={`w-4 h-4 ${accessType === "read_only" ? "text-orange-400" : "text-slate-400"}`} />
                  <span className="text-xs font-bold text-white">Read-Only</span>
                </div>
                <p className="text-[11px] text-slate-400">View and observe records without modification rights.</p>
              </button>

              <button
                type="button"
                onClick={() => setAccessType("full")}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  accessType === "full"
                    ? "bg-orange-500/15 border-orange-500/50 text-white"
                    : "bg-[#071527]/60 border-[#16365f] text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Lock className={`w-4 h-4 ${accessType === "full" ? "text-orange-400" : "text-slate-400"}`} />
                  <span className="text-xs font-bold text-white">Full Privileges</span>
                </div>
                <p className="text-[11px] text-slate-400">Create, edit, and operational privileges if authorized.</p>
              </button>
            </div>
          </div>

          {/* Justification / Reason */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5">
              Business Justification <span className="text-orange-400">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain why you require access to this section (e.g., 'Need read-only access to audit donation vouchers for quarterly reconciliation')..."
              className="w-full px-3.5 py-2.5 bg-[#071527] border border-[#1c4070] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition resize-none"
            />
          </div>

          {/* Info notice */}
          <div className="flex items-start gap-2.5 p-3 bg-blue-950/40 border border-blue-900/40 rounded-xl text-[11px] text-blue-200">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>
              Once approved by a Super Administrator, your account permissions will be granted immediately without requiring you to log in again.
            </span>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#16365f]">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 bg-[#071527] hover:bg-[#0c2444] border border-[#1c4070] text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-500/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
