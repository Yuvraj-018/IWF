import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Shield,
  Lock,
  Mail,
  ArrowRight,
  Loader2,
  Smartphone,
  KeyRound,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { Turnstile } from "../components/common/Turnstile";
import { formatKolkataTime } from "../services/httpClient";

type LoginStep = "CREDENTIALS" | "2FA_CHALLENGE";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, validate2FALogin, isAuthenticated, user } = useAuth();

  const [step, setStep] = useState<LoginStep>("CREDENTIALS");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 2FA Challenge State
  const [twoFactorToken, setTwoFactorToken] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [isRecoveryCode, setIsRecoveryCode] = useState(false);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);
  const [lockoutMessage, setLockoutMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.mustChangePassword) {
        navigate("/change-password", { replace: true });
      } else if (user.mustEnroll2FA) {
        navigate("/2fa-enroll", { replace: true });
      } else {
        const from = (location.state as any)?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, location]);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLockoutMessage(null);

    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    setSubmitting(true);
    const res = await login(email, password, turnstileToken);
    setSubmitting(false);

    if (res.requires2FA && res.twoFactorToken) {
      setTwoFactorToken(res.twoFactorToken);
      setStep("2FA_CHALLENGE");
      toast.info("Two-Factor Authentication required. Please enter your code.");
      return;
    }

    if (res.success) {
      toast.success("Welcome back! Control session initialized.");
      if (res.mustChangePassword) {
        navigate("/change-password", { replace: true });
      } else if (res.mustEnroll2FA) {
        navigate("/2fa-enroll", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } else {
      if (res.lockoutUntil) {
        const timeStr = formatKolkataTime(res.lockoutUntil);
        setLockoutMessage(`Account locked until ${timeStr} (IST) due to repeated failed attempts.`);
      } else if (res.attemptsRemaining !== undefined) {
        setAttemptsRemaining(res.attemptsRemaining);
      }
      toast.error(res.message || "Invalid credentials.");
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!totpCode.trim()) {
      toast.error(isRecoveryCode ? "Please enter a recovery code." : "Please enter the 6-digit verification code.");
      return;
    }

    setSubmitting(true);
    const res = await validate2FALogin(twoFactorToken, totpCode.trim(), isRecoveryCode);
    setSubmitting(false);

    if (res.success) {
      toast.success("Identity verified successfully!");
      if (res.mustChangePassword) {
        navigate("/change-password", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } else {
      toast.error(res.message || "2FA verification failed.");
      if (res.message?.includes("expired")) {
        setStep("CREDENTIALS");
        setTwoFactorToken("");
        setTotpCode("");
      }
    }
  };

  const handleBackToLogin = () => {
    setStep("CREDENTIALS");
    setTwoFactorToken("");
    setTotpCode("");
    setIsRecoveryCode(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#071527] relative overflow-hidden font-sans">
      {/* Background warm orange radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#0b1f3b]/95 border border-[#16365f] rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center mb-4 text-orange-400 shadow-md shadow-orange-500/10">
            {step === "CREDENTIALS" ? (
              <Shield className="w-7 h-7 text-orange-500" />
            ) : (
              <Smartphone className="w-7 h-7 text-orange-500" />
            )}
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-1.5">
            <span>{step === "CREDENTIALS" ? "ISLAH Control Center" : "Two-Factor Verification"}</span>
            <span className="w-2 h-2 rounded-full bg-orange-500" />
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            {step === "CREDENTIALS"
              ? "Authorized foundation staff & administrators only"
              : `Enter the ${isRecoveryCode ? "8-character recovery code" : "6-digit authenticator passcode"} for ${email}`}
          </p>
        </div>

        {/* Lockout Warning */}
        {lockoutMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 flex items-start gap-2.5 text-xs text-rose-300">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{lockoutMessage}</span>
          </div>
        )}

        {/* Remaining attempts indicator */}
        {attemptsRemaining !== null && attemptsRemaining > 0 && attemptsRemaining < 5 && (
          <div className="mb-4 p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/40 text-xs text-amber-300 text-center font-medium">
            Warning: {attemptsRemaining} login {attemptsRemaining === 1 ? "attempt" : "attempts"} remaining before account lockout.
          </div>
        )}

        {step === "CREDENTIALS" ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@iwfindia.org"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#071527] border border-[#1c4070] rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#071527] border border-[#1c4070] rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                />
              </div>
            </div>

            {/* Cloudflare Turnstile Verification */}
            <div className="pt-1">
              <Turnstile
                action="cms_login"
                theme="dark"
                onSuccess={(tok) => setTurnstileToken(tok)}
                onError={() => setTurnstileToken("")}
                onExpire={() => setTurnstileToken("")}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Enter Control Center</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Step 2: 2FA Challenge */
          <form onSubmit={handle2FASubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {isRecoveryCode ? "Recovery Code" : "Authenticator Passcode"}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsRecoveryCode(!isRecoveryCode);
                    setTotpCode("");
                  }}
                  className="text-[11px] text-orange-400 hover:text-orange-300 font-semibold transition cursor-pointer"
                >
                  {isRecoveryCode ? "Use Authenticator App" : "Use a Recovery Code"}
                </button>
              </div>

              <div className="relative">
                {isRecoveryCode ? (
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                ) : (
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                )}
                <input
                  type="text"
                  autoFocus
                  required
                  maxLength={isRecoveryCode ? 10 : 6}
                  value={totpCode}
                  onChange={(e) =>
                    setTotpCode(isRecoveryCode ? e.target.value.toLowerCase() : e.target.value.replace(/\D/g, ""))
                  }
                  placeholder={isRecoveryCode ? "xxxx-xxxx" : "000000"}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#071527] border border-[#1c4070] rounded-xl text-center text-lg font-mono tracking-widest text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <span>Verify &amp; Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBackToLogin}
              className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-[#16365f] text-center">
          <p className="text-[11px] text-slate-400">
            Protected by multi-tier rate limiting &amp; encrypted token session.
          </p>
        </div>
      </div>
    </div>
  );
}
