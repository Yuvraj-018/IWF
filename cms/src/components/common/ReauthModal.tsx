import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ShieldCheck, Lock, X, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export function ReauthModal() {
  const { isReauthModalOpen, closeReauthModal, reauthenticate } = useAuth();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isReauthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password) {
      setError("Please enter your current password.");
      return;
    }

    setLoading(true);
    const res = await reauthenticate(password, undefined);
    setLoading(false);

    if (res.success) {
      toast.success("Identity re-authenticated successfully. Resuming operation...");
      setPassword("");
      closeReauthModal();
    } else {
      setError(res.message || "Authentication failed. Incorrect password.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 font-sans animate-in fade-in duration-150">
      <div className="bg-[#0b1f3b] border border-[#16365f] rounded-2xl w-full max-w-sm p-6 shadow-2xl relative text-white">
        <button
          onClick={closeReauthModal}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#16365f] transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-500 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Security Verification Required</h3>
            <p className="text-[11px] text-slate-400">Re-authenticate to confirm this operation</p>
          </div>
        </div>

        <div className="p-3 bg-[#071527] border border-[#1c4070] rounded-xl text-xs text-slate-300 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            This high-risk action requires a fresh password authentication within the last 15 minutes.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Current Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                autoFocus
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your account password"
                className="w-full pl-10 pr-4 py-2 bg-[#071527] border border-[#1c4070] rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-rose-400 font-semibold bg-rose-950/40 p-2 rounded-lg border border-rose-800/40">
              {error}
            </p>
          )}

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={closeReauthModal}
              className="flex-1 py-2 px-3 rounded-xl bg-[#071527] hover:bg-[#16365f] text-slate-300 text-xs font-semibold border border-[#1c4070] transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 cursor-pointer disabled:opacity-50"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Verify &amp; Proceed</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
