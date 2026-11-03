import { useState } from "react";
import { Search, ShieldCheck, CheckCircle2, AlertCircle, X, Download, UserCheck, Calendar, MapPin } from "lucide-react";
import { MEMBERS_DATA, MemberItem } from "../communityData";

interface MemberVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMemberId?: string;
}

export function MemberVerificationModal({
  isOpen,
  onClose,
  defaultMemberId = "",
}: MemberVerificationModalProps) {
  const [query, setQuery] = useState(defaultMemberId);
  const [verifiedMember, setVerifiedMember] = useState<MemberItem | null>(null);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setSearched(true);

    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setErrorMsg("Please enter a valid Member ID (e.g. ISLAH-MB-0012) or Member Name");
      setVerifiedMember(null);
      return;
    }

    const found = MEMBERS_DATA.find(
      (m) =>
        m.id.toLowerCase() === trimmed ||
        m.name.toLowerCase().includes(trimmed)
    );

    if (found) {
      setVerifiedMember(found);
    } else {
      setVerifiedMember(null);
      setErrorMsg(`No verified member record found for "${query}". Please check your Member ID and try again.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#071527] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Member Verification & Portal
              </h3>
              <p className="text-xs text-slate-300">
                Official ISLAH Member Status Check
              </p>
            </div>
          </div>
        </div>

        {/* Search input form */}
        <div className="p-6 space-y-4">
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700">
              Enter Member ID or Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. ISLAH-MB-0012 or Ayesha Khan"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-orange focus:bg-white transition-all text-slate-800"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#071527] hover:bg-[#122e54] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-brand-orange" />
              <span>Verify Status</span>
            </button>
          </form>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p>{errorMsg}</p>
            </div>
          )}

          {/* Success / Verified Record */}
          {verifiedMember && (
            <div className="mt-3 p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified ISLAH Member</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {verifiedMember.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Name:</span>
                  <span className="font-bold text-slate-900">{verifiedMember.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Member ID:</span>
                  <span className="font-mono font-semibold text-slate-800">{verifiedMember.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tier / Category:</span>
                  <span className="font-semibold text-blue-700">{verifiedMember.category} Card</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span>{verifiedMember.district}, {verifiedMember.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Valid Till:</span>
                  <span className="font-semibold text-emerald-700">{verifiedMember.validTill}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 italic">
                  Digital Card Active
                </span>
                <button
                  type="button"
                  onClick={() => alert(`ID Verification Confirmed for ${verifiedMember.name} (${verifiedMember.id})`)}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Card</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Need help? Contact membership desk</span>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

