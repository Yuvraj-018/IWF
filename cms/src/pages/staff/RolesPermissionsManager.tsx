import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import {
  Shield,
  Plus,
  Edit2,
  Copy,
  Trash2,
  Check,
  Search,
  Filter,
  Lock,
  Smartphone,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  X,
  Loader2,
  KeyRound,
  Layers,
} from "lucide-react";
import { toast } from "sonner";

interface RoleItem {
  _id?: string;
  key: string;
  name: string;
  description?: string;
  permissions: string[];
  isSystem: boolean;
  requires2FA: boolean;
  assignmentCount?: number;
}

export default function RolesPermissionsManager() {
  const { user: currentUser, can, openReauthModal } = useAuth();

  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [registry, setRegistry] = useState<any[]>([]);
  const [groupedRegistry, setGroupedRegistry] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  // Selected role for viewing / editing in matrix
  const [selectedRole, setSelectedRole] = useState<RoleItem | null>(null);
  const [editingPermissions, setEditingPermissions] = useState<Set<string>>(new Set());
  const [editRequires2FA, setEditRequires2FA] = useState(false);
  const [editRoleName, setEditRoleName] = useState("");
  const [editRoleDesc, setEditRoleDesc] = useState("");
  const [matrixSearch, setMatrixSearch] = useState("");
  const [savingRole, setSavingRole] = useState(false);

  // Create custom role modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoleKey, setNewRoleKey] = useState("");
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");
  const [newRoleRequires2FA, setNewRoleRequires2FA] = useState(false);
  const [creating, setCreating] = useState(false);

  // Diff summary modal before saving
  const [showDiffModal, setShowDiffModal] = useState(false);

  const canEditRoles = can("system.role:edit");
  const canCreateRoles = can("system.role:create");
  const canDeleteRoles = can("system.role:delete");

  const RISKY_PERMISSIONS = new Set([
    "finance.expense:approve",
    "finance.expense:pay",
    "finance.expense:reverse",
    "finance.refund:process",
    "system.role:edit",
    "system.role:delete",
    "system.staff:edit",
    "system.staff:create",
    "*",
  ]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [rolesRes, regRes] = await Promise.all([
        api.listRoles(),
        api.getPermissionsRegistry(),
      ]);

      if (rolesRes.success && Array.isArray(rolesRes.data)) {
        setRoles(rolesRes.data);
        if (!selectedRole && rolesRes.data.length > 0) {
          selectRoleForEditing(rolesRes.data[0]);
        }
      }

      if (regRes.success && regRes.data) {
        setRegistry(regRes.data.permissions || []);
        setGroupedRegistry(regRes.data.groupedByModule || {});
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load roles and permission registry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const selectRoleForEditing = (role: RoleItem) => {
    setSelectedRole(role);
    setEditingPermissions(new Set(role.permissions || []));
    setEditRequires2FA(role.requires2FA);
    setEditRoleName(role.name);
    setEditRoleDesc(role.description || "");
  };

  const togglePermission = (key: string) => {
    if (!canEditRoles || selectedRole?.isSystem) return;
    setEditingPermissions((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const toggleAllInModule = (moduleKey: string) => {
    if (!canEditRoles || selectedRole?.isSystem) return;
    const modulePerms = (groupedRegistry[moduleKey] || []).map((p: any) => p.key);
    const allActive = modulePerms.every((k: string) => editingPermissions.has(k));

    setEditingPermissions((prev) => {
      const next = new Set(prev);
      if (allActive) {
        modulePerms.forEach((k: string) => next.delete(k));
      } else {
        modulePerms.forEach((k: string) => next.add(k));
      }
      return next;
    });
  };

  // Compute diffs
  const diffSummary = useMemo(() => {
    if (!selectedRole) return { added: [], removed: [] };
    const original = new Set(selectedRole.permissions || []);
    const added: string[] = [];
    const removed: string[] = [];

    editingPermissions.forEach((p) => {
      if (!original.has(p)) added.push(p);
    });

    original.forEach((p) => {
      if (!editingPermissions.has(p)) removed.push(p);
    });

    return { added, removed };
  }, [selectedRole, editingPermissions]);

  const handleInitiateSave = () => {
    if (diffSummary.added.length > 0 || diffSummary.removed.length > 0) {
      setShowDiffModal(true);
    } else {
      performSave();
    }
  };

  const performSave = async () => {
    if (!selectedRole) return;
    setSavingRole(true);

    try {
      const res = await api.updateRole(selectedRole.key, {
        name: editRoleName,
        description: editRoleDesc,
        permissions: Array.from(editingPermissions),
        requires2FA: editRequires2FA,
      });

      if (res.success) {
        toast.success(`Role "${selectedRole.name}" updated successfully.`);
        setShowDiffModal(false);
        loadData();
      } else {
        toast.error(res.message || "Failed to update role permissions.");
      }
    } catch (err: any) {
      toast.error(err.message || "Error updating role.");
    } finally {
      setSavingRole(false);
    }
  };

  const handleCreateRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleKey || !newRoleName) {
      toast.error("Please provide role key and display name.");
      return;
    }

    setCreating(true);
    try {
      const cleanKey = newRoleKey.trim().toLowerCase().replace(/[^a-z0-9_]/g, "_");
      const res = await api.createRole({
        key: cleanKey,
        name: newRoleName,
        description: newRoleDesc,
        requires2FA: newRoleRequires2FA,
        permissions: ["cms.dashboard:view"],
      });

      if (res.success) {
        toast.success(`Custom role "${newRoleName}" created.`);
        setShowCreateModal(false);
        setNewRoleKey("");
        setNewRoleName("");
        setNewRoleDesc("");
        setNewRoleRequires2FA(false);
        await loadData();
        if (res.data) selectRoleForEditing(res.data);
      } else {
        toast.error(res.message || "Failed to create custom role.");
      }
    } catch (err: any) {
      toast.error(err.message || "Error creating role.");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteRole = async (role: RoleItem) => {
    if (role.isSystem) {
      toast.error("System predefined roles cannot be deleted.");
      return;
    }
    if ((role.assignmentCount || 0) > 0) {
      toast.error(`Cannot delete role: Assigned to ${role.assignmentCount} staff members. Reassign them first.`);
      return;
    }
    if (!confirm(`Delete custom role "${role.name}" permanently?`)) return;

    try {
      const res = await api.deleteRole(role.key);
      if (res.success) {
        toast.success("Role deleted.");
        loadData();
      } else {
        toast.error(res.message || "Failed to delete role.");
      }
    } catch (err: any) {
      toast.error(err.message || "Error deleting role.");
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Roles &amp; Permission Matrix</span>
            <span className="w-2 h-2 rounded-full bg-orange-500" />
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            145 granular system permissions across 10 functional modules. Configure custom roles and enforce separation of duties.
          </p>
        </div>

        {canCreateRoles && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Custom Role</span>
          </button>
        )}
      </div>

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center text-slate-400 gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          <p className="text-xs font-mono">Synchronizing live permission registry...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column: Roles List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Registered Roles ({roles.length})
            </h3>

            <div className="space-y-2">
              {roles.map((role) => {
                const isSelected = selectedRole?.key === role.key;

                return (
                  <div
                    key={role.key}
                    onClick={() => selectRoleForEditing(role)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer text-left ${
                      isSelected
                        ? "bg-[#071527] text-white border-[#071527] shadow-md"
                        : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`text-xs font-bold ${isSelected ? "text-white" : "text-slate-900"}`}>
                          {role.name}
                        </p>
                        <p className={`text-[10px] font-mono mt-0.5 ${isSelected ? "text-orange-400" : "text-slate-400"}`}>
                          {role.key}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        {role.isSystem && (
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                              isSelected ? "bg-[#16365f] text-slate-300" : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            System
                          </span>
                        )}
                        {role.requires2FA && (
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9px] font-bold flex items-center gap-0.5 ${
                              isSelected ? "bg-emerald-950 text-emerald-300" : "bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            <Smartphone className="w-2.5 h-2.5" />
                            <span>2FA</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <p className={`text-[11px] line-clamp-1 mt-1.5 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                      {role.description || "No description"}
                    </p>

                    <div className="mt-3 pt-2 border-t border-slate-200/20 flex items-center justify-between text-[11px]">
                      <span className={isSelected ? "text-slate-400" : "text-slate-500"}>
                        {role.permissions.includes("*") ? "All (145)" : `${role.permissions.length} perms`}
                      </span>
                      <span className={isSelected ? "text-slate-400" : "text-slate-500"}>
                        {role.assignmentCount || 0} assigned
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 3 Columns: Permission Matrix */}
          <div className="lg:col-span-3 space-y-4">
            {selectedRole ? (
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                {/* Role Header */}
                <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-slate-900">{selectedRole.name}</h2>
                      {selectedRole.isSystem ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">
                          System Role (Read-Only Matrix)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-800">
                          Custom Editable Role
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{selectedRole.description}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {!selectedRole.isSystem && canEditRoles && (
                      <button
                        onClick={handleInitiateSave}
                        disabled={savingRole}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        {savingRole ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                        <span>Save Permissions</span>
                      </button>
                    )}

                    {!selectedRole.isSystem && canDeleteRoles && (
                      <button
                        onClick={() => handleDeleteRole(selectedRole)}
                        className="p-2 text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-lg transition cursor-pointer"
                        title="Delete Role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Matrix Search & Group Toggles */}
                <div className="p-3 border-b border-slate-200 bg-white flex items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-xs">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filter permissions..."
                      value={matrixSearch}
                      onChange={(e) => setMatrixSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div className="text-xs text-slate-500 font-medium">
                    Active: <strong className="text-slate-900">{editingPermissions.has("*") ? "All (*)" : editingPermissions.size}</strong> / {registry.length} permissions
                  </div>
                </div>

                {/* Modules Accordion / Matrix */}
                <div className="p-4 space-y-6 max-h-[650px] overflow-y-auto">
                  {Object.entries(groupedRegistry).map(([moduleKey, perms]) => {
                    const filteredPerms = perms.filter(
                      (p: any) =>
                        p.name.toLowerCase().includes(matrixSearch.toLowerCase()) ||
                        p.key.toLowerCase().includes(matrixSearch.toLowerCase()) ||
                        p.description.toLowerCase().includes(matrixSearch.toLowerCase())
                    );

                    if (filteredPerms.length === 0) return null;

                    const allModuleActive = filteredPerms.every((p: any) => editingPermissions.has(p.key) || editingPermissions.has("*"));

                    return (
                      <div key={moduleKey} className="border border-slate-200 rounded-xl overflow-hidden">
                        <div className="bg-slate-50 px-4 py-2.5 flex items-center justify-between border-b border-slate-200">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-xs uppercase tracking-wider text-slate-800">
                              {moduleKey} Module
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              ({filteredPerms.length} rules)
                            </span>
                          </div>

                          {!selectedRole.isSystem && canEditRoles && (
                            <button
                              type="button"
                              onClick={() => toggleAllInModule(moduleKey)}
                              className="text-[11px] font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
                            >
                              {allModuleActive ? "Deselect All" : "Select All"}
                            </button>
                          )}
                        </div>

                        <div className="divide-y divide-slate-100 p-2">
                          {filteredPerms.map((perm: any) => {
                            const isAssigned = editingPermissions.has(perm.key) || editingPermissions.has("*");
                            const isRisky = RISKY_PERMISSIONS.has(perm.key);

                            return (
                              <div
                                key={perm.key}
                                onClick={() => togglePermission(perm.key)}
                                className={`p-2.5 rounded-lg flex items-center justify-between gap-3 transition ${
                                  !selectedRole.isSystem && canEditRoles ? "cursor-pointer hover:bg-slate-50" : ""
                                } ${isAssigned ? "bg-orange-50/20" : ""}`}
                              >
                                <div className="flex items-start gap-3 min-w-0">
                                  <div
                                    className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center transition shrink-0 ${
                                      isAssigned
                                        ? "bg-orange-500 border-orange-500 text-white"
                                        : "border-slate-300 bg-white"
                                    }`}
                                  >
                                    {isAssigned && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>

                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                      <p className="text-xs font-bold text-slate-900 truncate">
                                        {perm.name}
                                      </p>
                                      {isRisky && (
                                        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                          <AlertTriangle className="w-2.5 h-2.5" />
                                          <span>High Risk</span>
                                        </span>
                                      )}
                                      {perm.isPii && (
                                        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                          <Lock className="w-2.5 h-2.5" />
                                          <span>PII</span>
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                                      {perm.description}
                                    </p>
                                  </div>
                                </div>

                                <code className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                                  {perm.key}
                                </code>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400 bg-white rounded-xl border border-slate-200">
                Select a role from the left list to review or modify permissions.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Custom Role Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 text-slate-800">
            <h3 className="text-base font-bold text-slate-900 mb-1">Create Custom Role</h3>
            <p className="text-xs text-slate-500 mb-4">
              Define a tailored system role. You will configure its granular permissions in the matrix after creation.
            </p>

            <form onSubmit={handleCreateRoleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Role Key (Identifier)
                </label>
                <input
                  type="text"
                  required
                  value={newRoleKey}
                  onChange={(e) => setNewRoleKey(e.target.value)}
                  placeholder="e.g. audit_assistant"
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="e.g. Senior Audit Assistant"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                  placeholder="Operational responsibilities for this role..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newRoleRequires2FA}
                  onChange={(e) => setNewRoleRequires2FA(e.target.checked)}
                  className="accent-orange-500"
                />
                <span className="text-xs font-medium text-slate-700">
                  Mandate Two-Factor Authentication (2FA) for this role
                </span>
              </label>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  {creating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Create Role</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Diff Summary Modal Before Saving High-Risk Changes */}
      {showDiffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 text-slate-800 max-h-[85vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 mb-1">Review Permission Changes</h3>
            <p className="text-xs text-slate-500 mb-4">
              Updating role permissions affects all staff accounts assigned to <strong>{selectedRole?.name}</strong>.
            </p>

            <div className="space-y-4">
              {diffSummary.added.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                    Added Permissions (+{diffSummary.added.length})
                  </span>
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 max-h-36 overflow-y-auto font-mono text-[11px] text-emerald-800 space-y-1">
                    {diffSummary.added.map((p) => (
                      <div key={p}>+ {p}</div>
                    ))}
                  </div>
                </div>
              )}

              {diffSummary.removed.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block mb-1">
                    Revoked Permissions (-{diffSummary.removed.length})
                  </span>
                  <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200 max-h-36 overflow-y-auto font-mono text-[11px] text-rose-800 space-y-1">
                    {diffSummary.removed.map((p) => (
                      <div key={p}>- {p}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2.5 pt-4 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowDiffModal(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-50"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={performSave}
                disabled={savingRole}
                className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5 disabled:opacity-50"
              >
                {savingRole && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Confirm &amp; Apply Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

