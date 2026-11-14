import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ShieldCheck, Lock, Smartphone, X, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export function ReauthModal() {
  const { user, isReauthModalOpen, closeReauthModal, reauthenticate } = useAuth();
  const [authMethod, setAuthMethod] = useState<"password" | "totp">(
    user?.twoFactorEnabled ? "totp" : "password"
  );
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isReauthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (authMethod === "password" && !password) {
      setError("Please enter your current password.");
      return;
    }

    if (authMethod === "totp" && !totpCode) {
      setError("Please enter the 6-digit authenticator code.");
      return;
    }

    setLoading(true);
    const res = await reauthenticate(
      authMethod === "password" ? password : undefined,
      authMethod === "totp" ? totpCode : undefined
    );
    setLoading(false);

    if (res.success) {
      toast.success("Identity re-authenticated successfully. Resuming operation...");
      setPassword("");
      setTotpCode("");
    } else {
      setError(res.message || "Re-authentication failed. Incorrect credentials.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0b1f3b] border border-[#16365f] rounded-2xl shadow-2xl p-6 relative overflow-hidden text-slate-200">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Re-Authentication Required</h3>
              <p className="text-xs text-slate-400">Confirm identity for sensitive operation</p>
            </div>
          </div>
          <button
            onClick={closeReauthModal}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#16365f]/50 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 bg-[#071527] border border-[#1c4070] rounded-xl text-xs text-slate-300 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            This high-risk action requires a fresh authentication session within the last 15 minutes.
          </span>
        </div>

        {/* Auth method switcher if 2FA is active */}
        {user?.twoFactorEnabled && (
          <div className="flex rounded-xl bg-[#071527] p-1 border border-[#1c4070] mb-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setAuthMethod("totp")}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                authMethod === "totp" ? "bg-orange-500 text-white shadow-xs" : "text-slate-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Authenticator Code</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod("password")}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                authMethod === "password" ? "bg-orange-500 text-white shadow-xs" : "text-slate-400 hover:text-white"
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Password</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMethod === "password" ? (
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
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                6-Digit Authenticator Code
              </label>
              <div className="relative">
                <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  autoFocus
                  required
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="w-full pl-10 pr-4 py-2 bg-[#071527] border border-[#1c4070] rounded-xl text-center text-lg font-mono tracking-widest text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/40 p-2.5 rounded-xl">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={closeReauthModal}
              className="px-4 py-2 bg-[#071527] hover:bg-[#16365f] border border-[#1c4070] text-xs font-semibold text-slate-300 hover:text-white rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-xs font-bold text-white rounded-xl shadow-md shadow-orange-500/20 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Confirm &amp; Continue</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

