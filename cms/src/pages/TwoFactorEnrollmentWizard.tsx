import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { QRCodeSVG } from "qrcode.react";
import {
  Smartphone,
  ShieldCheck,
  Copy,
  Download,
  Check,
  ArrowRight,
  Loader2,
  AlertTriangle,
  KeyRound,
} from "lucide-react";
import { toast } from "sonner";

type WizardStep = 1 | 2 | 3;

export default function TwoFactorEnrollmentWizard() {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();

  const [step, setStep] = useState<WizardStep>(1);
  const [loading, setLoading] = useState(true);
  const [secret, setSecret] = useState("");
  const [otpAuthUri, setOtpAuthUri] = useState("");
  const [copiedSecret, setCopiedSecret] = useState(false);

  // Verification step
  const [verifyCode, setVerifyCode] = useState("");
  const [verifying, setVerifying] = useState(false);

  // Recovery codes step
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [copiedCodes, setCopiedCodes] = useState(false);
  const [hasConfirmedSaved, setHasConfirmedSaved] = useState(false);

  // Initialize setup on load
  useEffect(() => {
    async function init2FA() {
      try {
        setLoading(true);
        const res = await api.setup2FA();
        if (res.success && res.secret && res.otpAuthUri) {
          setSecret(res.secret);
          setOtpAuthUri(res.otpAuthUri);
        } else {
          toast.error(res.message || "Failed to initialize 2FA configuration.");
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to connect to authentication server.");
      } finally {
        setLoading(false);
      }
    }
    init2FA();
  }, []);

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secret);
    setCopiedSecret(true);
    toast.success("Secret key copied to clipboard.");
    setTimeout(() => setCopiedSecret(false), 2000);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyCode || verifyCode.length !== 6) {
      toast.error("Please enter a valid 6-digit passcode.");
      return;
    }

    setVerifying(true);
    try {
      const res = await api.verify2FA(verifyCode);
      if (res.success && Array.isArray(res.recoveryCodes)) {
        setRecoveryCodes(res.recoveryCodes);
        setStep(3);
        toast.success("Two-Factor Authentication activated successfully!");
      } else {
        toast.error(res.message || "Invalid verification code. Please check your app.");
      }
    } catch (err: any) {
      toast.error(err.message || "Verification failed.");
    } finally {
      setVerifying(false);
    }
  };

  const handleCopyCodes = () => {
    navigator.clipboard.writeText(recoveryCodes.join("\n"));
    setCopiedCodes(true);
    toast.success("All 8 recovery codes copied to clipboard.");
    setTimeout(() => setCopiedCodes(false), 2000);
  };

  const handleDownloadCodes = () => {
    const content = `ISLAH WELFARE FOUNDATION - 2FA EMERGENCY BACKUP CODES\nGenerated: ${new Date().toISOString()}\n\nEach code can only be used once.\n\n${recoveryCodes.map((c, i) => `${i + 1}. ${c}`).join("\n")}\n\nKeep these codes strictly private and secure.`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "islah-2fa-recovery-codes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Recovery codes downloaded.");
  };

  const handleFinish = async () => {
    await refreshProfile();
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#071527] relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg bg-[#0b1f3b] border border-[#16365f] rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition ${
                step === num
                  ? "bg-orange-500 text-white"
                  : step > num
                  ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
                  : "bg-[#071527] text-slate-400 border border-[#1c4070]"
              }`}
            >
              <span>{num}</span>
              <span className="hidden sm:inline">
                {num === 1 ? "Scan QR" : num === 2 ? "Verify" : "Backup"}
              </span>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <p className="text-xs font-mono">Generating secure cryptographic key...</p>
          </div>
        ) : step === 1 ? (
          /* Step 1: Scan QR Code */
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-black text-white">Enroll in Two-Factor Auth</h2>
              <p className="text-xs text-slate-300 mt-1">
                Scan the QR code using Google Authenticator, 1Password, or Microsoft Authenticator.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl mx-auto w-fit shadow-xl">
              {otpAuthUri && (
                <QRCodeSVG
                  value={otpAuthUri}
                  size={190}
                  level="M"
                  includeMargin={false}
                />
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 text-center">
                Can't scan? Enter this secret manually
              </label>
              <div className="flex items-center gap-2 p-2.5 bg-[#071527] border border-[#1c4070] rounded-xl font-mono text-xs text-orange-300 justify-between">
                <span className="truncate tracking-wider select-all px-1">{secret}</span>
                <button
                  type="button"
                  onClick={handleCopySecret}
                  className="px-2.5 py-1 bg-[#0b1f3b] hover:bg-[#16365f] text-slate-300 hover:text-white rounded-lg border border-[#1c4070] flex items-center gap-1 shrink-0 transition cursor-pointer"
                >
                  {copiedSecret ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSecret ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Next: Enter 6-Digit Code</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : step === 2 ? (
          /* Step 2: Verify code */
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center mx-auto mb-3 text-orange-400">
                <Smartphone className="w-6 h-6 text-orange-500" />
              </div>
              <h2 className="text-xl font-black text-white">Verify Authenticator Code</h2>
              <p className="text-xs text-slate-300 mt-1">
                Enter the 6-digit temporary passcode generated by your authenticator app to complete pairing.
              </p>
            </div>

            <div>
              <input
                type="text"
                autoFocus
                required
                maxLength={6}
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="w-full py-3 bg-[#071527] border border-[#1c4070] rounded-xl text-center text-2xl font-mono tracking-widest text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 bg-[#071527] hover:bg-[#16365f] border border-[#1c4070] text-slate-300 font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                Back to QR
              </button>
              <button
                type="submit"
                disabled={verifying || verifyCode.length !== 6}
                className="w-2/3 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {verifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify &amp; Activate</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Step 3: Emergency Backup Recovery Codes */
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <h2 className="text-xl font-black text-white">Save Your Recovery Codes</h2>
              <p className="text-xs text-slate-300 mt-1">
                If you ever lose access to your phone or authenticator app, these codes are the only way to regain access to your account.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-start gap-2.5 text-xs text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                These codes will <strong>never be shown again</strong>. Each code can be used once as an emergency one-time passcode.
              </span>
            </div>

            {/* 8 Recovery codes in 2-column grid */}
            <div className="grid grid-cols-2 gap-2.5 p-3.5 bg-[#071527] border border-[#1c4070] rounded-xl font-mono text-xs text-white">
              {recoveryCodes.map((code, index) => (
                <div key={index} className="flex items-center gap-2 bg-[#0b1f3b] p-2 rounded-lg border border-[#16365f]">
                  <span className="text-slate-400 text-[11px] font-sans w-4">{index + 1}.</span>
                  <span className="font-semibold text-orange-300 tracking-wider">{code}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={handleCopyCodes}
                className="flex-1 py-2 bg-[#071527] hover:bg-[#16365f] border border-[#1c4070] text-xs font-semibold text-slate-200 hover:text-white rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedCodes ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCodes ? "Copied All" : "Copy Codes"}</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadCodes}
                className="flex-1 py-2 bg-[#071527] hover:bg-[#16365f] border border-[#1c4070] text-xs font-semibold text-slate-200 hover:text-white rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .txt</span>
              </button>
            </div>

            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-[#071527]/60 border border-[#16365f] cursor-pointer">
              <input
                type="checkbox"
                checked={hasConfirmedSaved}
                onChange={(e) => setHasConfirmedSaved(e.target.checked)}
                className="mt-0.5 accent-orange-500 rounded cursor-pointer"
              />
              <span className="text-xs text-slate-300">
                I have securely saved and stored all 8 recovery codes in a password manager or safe offline location.
              </span>
            </label>

            <button
              type="button"
              disabled={!hasConfirmedSaved}
              onClick={handleFinish}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>Finish &amp; Enter Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
