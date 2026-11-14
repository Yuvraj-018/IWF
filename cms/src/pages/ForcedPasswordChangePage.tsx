import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { KeyRound, Lock, CheckCircle2, XCircle, ArrowRight, Loader2, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export default function ForcedPasswordChangePage() {
  const navigate = useNavigate();
  const { user, changePassword } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Password rules
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSymbol = /[^A-Za-z0-9]/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const validScore = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSymbol].filter(Boolean).length;
  const isStrongEnough = hasMinLength && validScore >= 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStrongEnough) {
      toast.error("Please choose a stronger password meeting all requirements.");
      return;
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    const res = await changePassword(newPassword);
    setSubmitting(false);

    if (res.success) {
      toast.success("Password configured successfully.");
      if (user?.mustEnroll2FA) {
        navigate("/2fa-enroll", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } else {
      toast.error(res.message || "Failed to update password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#071527] relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#0b1f3b] border border-[#16365f] rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center mb-4 text-orange-400">
            <KeyRound className="w-7 h-7 text-orange-500" />
          </div>
          <h1 className="text-xl font-black text-white tracking-tight">Configure Permanent Password</h1>
          <p className="text-xs text-slate-300 mt-1">
            You signed in using temporary credentials. Security policy requires you to set a permanent password before continuing.
          </p>
        </div>

        <div className="mb-5 p-3 rounded-xl bg-[#071527] border border-[#1c4070] text-xs text-slate-300 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
          <span>Setting a new password will terminate all other active login sessions.</span>
        </div>

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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter strong password"
                className="w-full pl-10 pr-4 py-2.5 bg-[#071527] border border-[#1c4070] rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full pl-10 pr-4 py-2.5 bg-[#071527] border border-[#1c4070] rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
              />
            </div>
          </div>

          {/* Strength Meter */}
          <div className="p-3 bg-[#071527] rounded-xl border border-[#1c4070] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
              <span>Password Strength</span>
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
                <span>Updating Password...</span>
              </>
            ) : (
              <>
                <span>Save Password &amp; Continue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

