import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Shield, Lock, CheckCircle2, XCircle, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function AcceptInvitePage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const navigate = useNavigate();
  const { acceptInvite } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Password rules
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const validScore = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSymbol].filter(Boolean).length;
  const isStrongEnough = hasMinLength && validScore >= 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!token) {
      setErrorMessage("No invitation token was found in the link. Please click the full link in your email.");
      return;
    }

    if (!isStrongEnough) {
      toast.error("Please choose a stronger password meeting the requirements.");
      return;
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    const res = await acceptInvite(token, password);
    setSubmitting(false);

    if (res.success) {
      toast.success("Invitation accepted! Welcome to the ISLAH Control Center.");
      navigate("/dashboard", { replace: true });
    } else {
      setErrorMessage(res.message || "Invalid or expired invitation link.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#071527] relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#0b1f3b] border border-[#16365f] rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center mb-4 text-orange-400">
            <Shield className="w-7 h-7 text-orange-500" />
          </div>
          <h1 className="text-xl font-black text-white tracking-tight">Accept Staff Invitation</h1>
          <p className="text-xs text-slate-300 mt-1">
            Configure your permanent password to activate your staff portal account.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 flex items-start gap-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">{errorMessage}</p>
              <p className="text-[11px] text-slate-400">
                Invitation links expire after 48 hours. Please request a new invite from your Super Admin.
              </p>
            </div>
          </div>
        )}

        {!token ? (
          <div className="text-center py-4">
            <p className="text-xs text-slate-400 mb-4">No valid invitation token detected in the link.</p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-4 py-2 bg-[#071527] hover:bg-[#16365f] border border-[#1c4070] text-xs font-bold text-slate-200 rounded-xl"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter strong password"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#071527] border border-[#1c4070] rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#071527] border border-[#1c4070] rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                />
              </div>
            </div>

            {/* Strength Meter */}
            <div className="p-3 bg-[#071527] rounded-xl border border-[#1c4070] space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <span>Password Requirements</span>
                <span className={validScore <= 2 ? "text-rose-400" : validScore <= 4 ? "text-amber-400" : "text-emerald-400"}>
                  {validScore <= 2 ? "Weak" : validScore <= 4 ? "Medium" : "Strong"}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 h-1.5">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`rounded-full transition-all duration-300 ${
                      validScore >= level
                        ? validScore <= 2
                          ? "bg-rose-500"
                          : validScore <= 4
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                        : "bg-slate-800"
                    }`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                <div className={`flex items-center gap-1.5 ${hasMinLength ? "text-emerald-400" : "text-slate-500"}`}>
                  {hasMinLength ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  <span>8+ Characters</span>
                </div>
                <div className={`flex items-center gap-1.5 ${hasNumber ? "text-emerald-400" : "text-slate-500"}`}>
                  {hasNumber ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  <span>Contains Number</span>
                </div>
                <div className={`flex items-center gap-1.5 ${hasUpperCase ? "text-emerald-400" : "text-slate-500"}`}>
                  {hasUpperCase ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  <span>Uppercase Letter</span>
                </div>
                <div className={`flex items-center gap-1.5 ${hasSymbol ? "text-emerald-400" : "text-slate-500"}`}>
                  {hasSymbol ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  <span>Special Symbol</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || !isStrongEnough || !passwordsMatch}
              className="w-full mt-2 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Activating Account...</span>
                </>
              ) : (
                <>
                  <span>Activate Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
