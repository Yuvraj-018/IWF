import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import { formatKolkataTime } from "../../services/httpClient";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Shield,
  Smartphone,
  RotateCcw,
  KeyRound,
  UserX,
  UserCheck,
  LogOut,
  AlertTriangle,
  Loader2,
  Check,
  Copy,
  Edit2,
  X,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function UserAccountsManager() {
  const { user: currentUser, can, openReauthModal } = useAuth();

  const [staffList, setStaffList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // All roles for filter/assign
  const [availableRoles, setAvailableRoles] = useState<any[]>([]);

  // Modals
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any | null>(null);

  // One-time credential modal
  const [showCredsModal, setShowCredsModal] = useState(false);
  const [oneTimeCreds, setOneTimeCreds] = useState<{ email: string; tempPass: string } | null>(null);
  const [copiedCreds, setCopiedCreds] = useState(false);

  // Invite form state
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRoles, setInviteRoles] = useState<string[]>(["content_editor"]);
  const [inviteAreas, setInviteAreas] = useState<string[]>([]);
  const [inviting, setInviting] = useState(false);
  const [inviteWarning, setInviteWarning] = useState<string[]>([]);

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editRoles, setEditRoles] = useState<string[]>([]);
  const [editAreas, setEditAreas] = useState<string[]>([]);
  const [savingEdit, setSavingEdit] = useState(false);

  const canEditStaff = can("system.staff:edit");
  const canCreateStaff = can("system.staff:create");

  const WORK_AREAS = [
    { code: "EDU", name: "Education & Learning" },
    { code: "HLT", name: "Healthcare & Well-being" },
    { code: "WYE", name: "Women & Youth Empowerment" },
    { code: "SLE", name: "Livelihoods & Enterprise" },
    { code: "SJL", name: "Social Justice & Legal" },
    { code: "AGR", name: "Sustainable Agriculture" },
    { code: "ENV", name: "Environment & Climate" },
    { code: "HRR", name: "Humanitarian Relief" },
  ];

  const loadStaff = async () => {
    setLoading(true);
    try {
      const [res, rolesRes] = await Promise.all([
        api.listStaff({
          page,
          limit: 15,
          search: search.trim() || undefined,
          role: roleFilter !== "all" ? roleFilter : undefined,
          status: statusFilter !== "all" ? statusFilter : undefined,
        }),
        api.listRoles().catch(() => ({ data: [] })),
      ]);

      if (res.success && Array.isArray(res.data)) {
        setStaffList(res.data);
        setTotal(res.pagination?.total || res.data.length);
      }
      if (rolesRes.success && Array.isArray(rolesRes.data)) {
        setAvailableRoles(rolesRes.data);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load staff accounts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, [page, roleFilter, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadStaff();
  };

  // Invite action
  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) {
      toast.error("Please fill in staff name and email.");
      return;
    }

    setInviting(true);
    try {
      const res = await api.inviteStaff({
        name: inviteName,
        email: inviteEmail,
        roles: inviteRoles,
        scope: { workAreas: inviteAreas },
      });

      if (res.success) {
        toast.success(`Invitation generated for ${inviteName}`);
        setShowInviteModal(false);
        setInviteName("");
        setInviteEmail("");
        setInviteRoles(["content_editor"]);
        setInviteAreas([]);

        if (res.data?.temporaryPassword) {
          setOneTimeCreds({
            email: res.data.email,
            tempPass: res.data.temporaryPassword,
          });
          setShowCredsModal(true);
        }
        loadStaff();
      } else {
        toast.error(res.message || "Failed to invite staff member.");
        if (res.warnings) setInviteWarning(res.warnings);
      }
    } catch (err: any) {
      toast.error(err.message || "Error issuing invitation.");
    } finally {
      setInviting(false);
    }
  };

  // Edit roles & scope
  const openEditModal = (staff: any) => {
    setSelectedStaff(staff);
    setEditName(staff.name);
    setEditRoles(staff.roles || []);
    setEditAreas(staff.scope?.workAreas || []);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaff) return;

    setSavingEdit(true);
    try {
      const res = await api.updateStaff(selectedStaff._id, {
        name: editName,
        roles: editRoles,
        scope: { workAreas: editAreas },
      });

      if (res.success) {
        toast.success("Staff member updated. Active sessions refreshed.");
        setShowEditModal(false);
        setSelectedStaff(null);
        loadStaff();
      } else {
        toast.error(res.message || "Failed to update staff member.");
      }
    } catch (err: any) {
      toast.error(err.message || "Error updating staff member.");
    } finally {
      setSavingEdit(false);
    }
  };

  // Reset Credentials
  const handleResetPassword = async (staff: any) => {
    if (!confirm(`Reset credentials for ${staff.name}? This will generate a temporary one-time password.`)) {
      return;
    }

    try {
      const res = await api.resetStaffCredentials(staff._id);
      if (res.success && res.temporaryPassword) {
        setOneTimeCreds({
          email: staff.email,
          tempPass: res.temporaryPassword,
        });
        setShowCredsModal(true);
        loadStaff();
      } else {
        toast.error(res.message || "Failed to reset credentials.");
      }
    } catch (err: any) {
      toast.error(err.message || "Error resetting credentials.");
    }
  };

  // Reset 2FA
  const handleReset2FA = async (staff: any) => {
    if (!confirm(`Emergency Reset 2FA for ${staff.name}? They will be forced to log in and re-enroll.`)) {
      return;
    }

    try {
      const res = await api.resetStaff2FA(staff._id);
      if (res.success) {
        toast.success(`2FA reset for ${staff.name}.`);
        loadStaff();
      } else {
        toast.error(res.message || "Failed to reset 2FA.");
      }
    } catch (err: any) {
      toast.error(err.message || "Error resetting 2FA.");
    }
  };

  // Deactivate / Reactivate
  const handleToggleActive = async (staff: any) => {
    const action = staff.isActive ? "deactivate" : "reactivate";
    if (!confirm(`Are you sure you want to ${action} ${staff.name}?`)) return;

    try {
      const res = staff.isActive
        ? await api.deactivateStaff(staff._id)
        : await api.reactivateStaff(staff._id);

      if (res.success) {
        toast.success(`Staff account ${action}d successfully.`);
        loadStaff();
      } else {
        toast.error(res.message || `Failed to ${action} staff account.`);
      }
    } catch (err: any) {
      toast.error(err.message || `Error toggling status.`);
    }
  };

  // Force Signout
  const handleForceSignout = async (staff: any) => {
    if (!confirm(`Force sign-out all sessions for ${staff.name}?`)) return;

    try {
      const res = await api.forceSignoutStaff(staff._id);
      if (res.success) {
        toast.success(`All sessions terminated for ${staff.name}.`);
        loadStaff();
      } else {
        toast.error(res.message || "Failed to terminate sessions.");
      }
    } catch (err: any) {
      toast.error(err.message || "Error terminating sessions.");
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>User Accounts &amp; Access Governance</span>
            <span className="w-2 h-2 rounded-full bg-orange-500" />
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage administrative staff, credentials, 2FA states, and role allocations across the foundation.
          </p>
        </div>

        {canCreateStaff && (
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite New Staff Member</span>
          </button>
        )}
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search staff by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </form>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none"
          >
            <option value="all">All Roles</option>
            {availableRoles.map((r) => (
              <option key={r.key} value={r.key}>
                {r.name}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Deactivated Only</option>
          </select>

          <button
            onClick={loadStaff}
            className="p-2 text-slate-500 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition cursor-pointer"
            title="Refresh Table"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-2">
            <Loader2 className="w-7 h-7 animate-spin text-orange-500" />
            <p className="text-xs font-mono">Loading staff directory...</p>
          </div>
        ) : staffList.length === 0 ? (
          <div className="py-20 text-center text-slate-400 text-xs">
            <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-bold text-slate-700">No staff members found</p>
            <p className="text-slate-400 mt-1">Try modifying your search or filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Assigned Roles</th>
                  <th className="py-3 px-4">Operational Scope</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Last Login</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {staffList.map((staff) => {
                  const isSelf = currentUser?.id === staff._id;
                  const isSuperAdmin = staff.roles?.includes("super_admin");

                  return (
                    <tr key={staff._id} className="hover:bg-slate-50/70 transition">
                      {/* Name & Email */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#071527] text-white flex items-center justify-center font-bold text-xs shrink-0">
                            {staff.name ? staff.name.slice(0, 2).toUpperCase() : "ST"}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{staff.name}</span>
                              {isSelf && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] bg-blue-100 text-blue-800 font-semibold">
                                  You
                                </span>
                              )}
                            </p>
                            <p className="text-[11px] text-slate-500 font-mono">{staff.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Roles */}
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {staff.roles?.map((r: string) => (
                            <span
                              key={r}
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                                r === "super_admin"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : "bg-slate-100 text-slate-700 border-slate-200"
                              }`}
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Scope */}
                      <td className="py-3 px-4">
                        {staff.scope?.workAreas && staff.scope.workAreas.length > 0 ? (
                          <div className="flex flex-wrap gap-1 max-w-[180px]">
                            {staff.scope.workAreas.map((w: string) => (
                              <span key={w} className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200">
                                {w}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">
                            {isSuperAdmin ? "Unrestricted (Super Admin)" : "None assigned"}
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        {staff.isActive ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            Deactivated
                          </span>
                        )}
                      </td>

                      {/* Last Login */}
                      <td className="py-3 px-4 text-[11px] text-slate-500 font-mono">
                        {formatKolkataTime(staff.lastLogin) || "Never"}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* Edit Roles & Scope */}
                          <button
                            onClick={() => openEditModal(staff)}
                            disabled={!canEditStaff || isSelf}
                            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
                            title={isSelf ? "You cannot modify your own roles" : "Edit Roles & Scope"}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Reset Password */}
                          <button
                            onClick={() => handleResetPassword(staff)}
                            disabled={!canEditStaff}
                            className="p-1.5 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Generate One-Time Password"
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                          </button>

                          {/* Force Signout */}
                          <button
                            onClick={() => handleForceSignout(staff)}
                            disabled={!canEditStaff}
                            className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Force Signout All Sessions"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                          </button>

                          {/* Deactivate / Reactivate */}
                          {!isSelf && (
                            <button
                              onClick={() => handleToggleActive(staff)}
                              disabled={!canEditStaff}
                              className={`p-1.5 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed ${
                                staff.isActive
                                  ? "text-slate-600 hover:text-rose-600 hover:bg-rose-50"
                                  : "text-emerald-600 hover:bg-emerald-50"
                              }`}
                              title={staff.isActive ? "Deactivate Account" : "Reactivate Account"}
                            >
                              {staff.isActive ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invite Staff Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 text-slate-800 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Invite New Staff Member</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Dr. Salman Khan"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="salman@iwfindia.org"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Assign System Roles
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded-lg">
                  {availableRoles.map((r) => {
                    const isChecked = inviteRoles.includes(r.key);
                    return (
                      <label key={r.key} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setInviteRoles([...inviteRoles, r.key]);
                            } else {
                              setInviteRoles(inviteRoles.filter((k) => k !== r.key));
                            }
                          }}
                          className="accent-orange-500"
                        />
                        <span className="truncate">{r.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Work Area Scope Restriction
                </label>
                <p className="text-[11px] text-slate-500 mb-1.5">
                  Leave unchecked to allow viewing all work areas (or if user holds Super Admin role).
                </p>
                <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  {WORK_AREAS.map((wa) => {
                    const isChecked = inviteAreas.includes(wa.code);
                    return (
                      <label key={wa.code} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setInviteAreas([...inviteAreas, wa.code]);
                            } else {
                              setInviteAreas(inviteAreas.filter((c) => c !== wa.code));
                            }
                          }}
                          className="accent-orange-500"
                        />
                        <span className="truncate">{wa.name} ({wa.code})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={inviting}
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  {inviting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Generate Invitation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Staff Roles & Scope Modal */}
      {showEditModal && selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 text-slate-800 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Edit Roles &amp; Scope: {selectedStaff.name}</h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Assigned Roles
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded-lg">
                  {availableRoles.map((r) => {
                    const isChecked = editRoles.includes(r.key);
                    return (
                      <label key={r.key} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEditRoles([...editRoles, r.key]);
                            } else {
                              setEditRoles(editRoles.filter((k) => k !== r.key));
                            }
                          }}
                          className="accent-orange-500"
                        />
                        <span className="truncate">{r.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Work Area Scope
                </label>
                <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  {WORK_AREAS.map((wa) => {
                    const isChecked = editAreas.includes(wa.code);
                    return (
                      <label key={wa.code} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEditAreas([...editAreas, wa.code]);
                            } else {
                              setEditAreas(editAreas.filter((c) => c !== wa.code));
                            }
                          }}
                          className="accent-orange-500"
                        />
                        <span className="truncate">{wa.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  {savingEdit && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* One-Time Temporary Credentials Modal */}
      {showCredsModal && oneTimeCreds && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 text-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <KeyRound className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900">Temporary Account Credentials</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Copy and provide these temporary credentials securely to the staff member. They will be forced to configure a new password upon first sign-in.
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs space-y-2 mb-4">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans">Email</span>
                <span className="font-bold text-slate-900">{oneTimeCreds.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans">Temporary Password</span>
                <span className="font-bold text-orange-600 text-sm">{oneTimeCreds.tempPass}</span>
              </div>
            </div>

            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 mb-5">
              Warning: This temporary password will <strong>never be shown again</strong>.
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`Email: ${oneTimeCreds.email}\nPassword: ${oneTimeCreds.tempPass}`);
                  setCopiedCreds(true);
                  toast.success("Credentials copied to clipboard.");
                  setTimeout(() => setCopiedCreds(false), 2000);
                }}
                className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                {copiedCreds ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCreds ? "Copied" : "Copy Credentials"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowCredsModal(false);
                  setOneTimeCreds(null);
                }}
                className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

