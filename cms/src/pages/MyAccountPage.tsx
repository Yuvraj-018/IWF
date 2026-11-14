import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { formatKolkataTime } from "../services/httpClient";
import {
  User,
  Shield,
  Lock,
  Smartphone,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  LogOut,
  MapPin,
  Briefcase,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function MyAccountPage() {
  const { user, changePassword, refreshProfile } = useAuth();

  // Change Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submittingPassword, setSubmittingPassword] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setSubmittingPassword(true);
    const res = await changePassword(newPassword, currentPassword);
    setSubmittingPassword(false);

    if (res.success) {
      toast.success("Password changed successfully. All other devices have been signed out.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error(res.message || "Failed to update password.");
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <span>Security &amp; Account Settings</span>
          <span className="w-2 h-2 rounded-full bg-orange-500" />
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your credentials, two-factor authentication, and review organizational permissions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Account Profile & Scope */}
        <div className="space-y-6">
          <div className="bg-[#0b1f3b] border border-[#16365f] rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4">
              <User className="w-6 h-6 text-orange-500" />
            </div>

            <h2 className="text-lg font-bold text-white">{user?.name}</h2>
            <p className="text-xs text-slate-400">{user?.email}</p>

            <div className="mt-5 pt-5 border-t border-[#16365f] space-y-3">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Assigned Roles
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {user?.roles?.map((r) => (
                    <span
                      key={r}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#071527] border border-[#1c4070] text-orange-300"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Operational Scope (Work Areas)
                </span>
                {user?.scope?.workAreas && user.scope.workAreas.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {user.scope.workAreas.map((area) => (
                      <span
                        key={area}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-950/60 border border-blue-800/40 text-blue-300"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    {user?.roles?.includes("super_admin") ? "All Work Areas (Unrestricted Super Admin)" : "No sectors assigned"}
                  </span>
                )}
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Offices &amp; Branches
                </span>
                {user?.scope?.offices && user.scope.offices.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {user.scope.offices.map((off) => (
                      <span
                        key={off}
                        className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300"
                      >
                        {off}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 italic">All Foundation Offices</span>
                )}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#16365f] space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Last Login:</span>
                <span className="text-slate-300 font-medium">{formatKolkataTime(user?.lastLogin) || "Current"}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Re-Auth:</span>
                <span className="text-slate-300 font-medium">{formatKolkataTime(user?.lastReauthAt) || "Active"}</span>
              </div>
              <div className="flex justify-between">
                <span>Token Version:</span>
                <span className="text-slate-300 font-mono">v{user?.tokenVersion || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Password Management */}
        <div className="lg:col-span-2 space-y-6">
          {/* Change Password Card */}
          <div className="bg-[#0b1f3b] border border-[#16365f] rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Lock className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Change Account Password</h3>
                <p className="text-xs text-slate-400">
                  Changing your password invalidates all existing sessions across other devices.
                </p>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-3.5 py-2.5 bg-[#071527] border border-[#1c4070] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full px-3.5 py-2.5 bg-[#071527] border border-[#1c4070] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full px-3.5 py-2.5 bg-[#071527] border border-[#1c4070] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={submittingPassword}
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-500/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submittingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <span>Update Password &amp; Revoke Other Sessions</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

