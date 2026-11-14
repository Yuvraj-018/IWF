import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../services/api";
import { formatKolkataTime } from "../services/httpClient";
import {
  Users,
  Award,
  Plus,
  Trash2,
  Edit2,
  Save,
  Loader2,
  Upload,
  Search,
  RotateCcw,
  Compass,
  GraduationCap,
  Briefcase,
  MapPin,
  ExternalLink,
  Link as LinkIcon,
  CheckCircle2,
  X,
  Shield,
  Key,
  Lock,
  UserCheck,
  Terminal,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

export type LeadershipCategory = "trustees" | "executive" | "advisory" | "field";

export interface LeaderItem {
  id: string;
  sno?: number;
  name: string;
  designation: string;
  portfolio?: string;
  expertise?: string;
  focus?: string;
  email?: string;
  gender?: "male" | "female";
  badgeColor?: string;
  image?: string;
}

export interface LeadershipData {
  trustees: LeaderItem[];
  executive: LeaderItem[];
  advisory: LeaderItem[];
  field: LeaderItem[];
}

const EMPTY_LEADERSHIP: LeadershipData = {
  trustees: [],
  executive: [],
  advisory: [],
  field: [],
};

export default function LeadershipManager() {
  const location = useLocation();
  const [viewMode, setViewMode] = useState<"directory" | "accounts">("directory");
  const [data, setData] = useState<LeadershipData>(EMPTY_LEADERSHIP);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<LeadershipCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [adminUser, setAdminUser] = useState<any>(null);
  const [recentAuditLogs, setRecentAuditLogs] = useState<any[]>([]);
  const [staffAccounts, setStaffAccounts] = useState<any[]>([]);

  useEffect(() => {
    if (
      location.pathname.includes("/accounts") ||
      location.pathname.includes("/roles") ||
      location.pathname.includes("/logs")
    ) {
      setViewMode("accounts");
    } else {
      setViewMode("directory");
    }
  }, [location.pathname]);

  useEffect(() => {
    api.getMe().then((res) => {
      if (res?.success && res.data) {
        setAdminUser(res.data);
      }
    });
    api.listAuditLogs({ limit: 3 }).then((res) => {
      if (res?.success && Array.isArray(res.data)) {
        setRecentAuditLogs(res.data);
      }
    }).catch((error) => {
      console.error("Could not fetch recent audit logs:", error);
    });
    api.listStaff({ limit: 100 }).then((res) => {
      if (res?.success && Array.isArray(res.data)) {
        setStaffAccounts(res.data);
      }
    }).catch((error) => {
      console.error("Could not fetch staff accounts:", error);
    });
  }, []);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [targetCategory, setTargetCategory] = useState<LeadershipCategory>("trustees");
  const [formData, setFormData] = useState<LeaderItem>({
    id: "",
    name: "",
    designation: "",
    portfolio: "",
    focus: "",
    email: "",
    gender: "male",
    image: "",
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [photoMode, setPhotoMode] = useState<"file" | "url">("file");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const loadData = async (force = false) => {
    setLoading(true);
    try {
      const res = await api.getSettings({ force });
      if (res.success && res.data?.leadership_data) {
        setData({
          trustees: res.data.leadership_data.trustees || [],
          executive: res.data.leadership_data.executive || [],
          advisory: res.data.leadership_data.advisory || [],
          field: res.data.leadership_data.field || [],
        });
      }
    } catch (e) {
      console.error(e);
      toast.error("Could not fetch leadership records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const persistData = async (updated: LeadershipData) => {
    setSaving(true);
    try {
      const res = await api.updateSetting("leadership_data", updated);
      if (res.success) {
        setData(updated);
        toast.success("Leadership roster updated live on the website!");
      } else {
        toast.error("Failed to save leadership roster.");
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to save leadership records.");
    } finally {
      setSaving(false);
    }
  };

  const handleOpenAdd = (cat?: LeadershipCategory) => {
    setModalMode("add");
    setTargetCategory(cat || (activeTab === "all" ? "trustees" : activeTab));
    setFormData({
      id: `lead-${Date.now()}`,
      name: "",
      designation: "",
      portfolio: "",
      focus: "",
      email: "",
      gender: "male",
      image: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: LeadershipCategory, item: LeaderItem) => {
    setModalMode("edit");
    setTargetCategory(cat);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = (cat: LeadershipCategory, id: string) => {
    if (!window.confirm("Are you sure you want to remove this leader from the website?")) return;
    const updatedList = data[cat].filter((m) => m.id !== id);
    const updated = { ...data, [cat]: updatedList };
    persistData(updated);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.designation.trim()) {
      toast.error("Name and Designation are required.");
      return;
    }

    const currentList = [...data[targetCategory]];
    let updatedList: LeaderItem[];

    const finalItem: LeaderItem = {
      ...formData,
      portfolio: formData.portfolio || formData.focus || "",
      focus: formData.focus || formData.portfolio || "",
      expertise: formData.designation,
    };

    if (modalMode === "add") {
      finalItem.sno = currentList.length + 1;
      updatedList = [...currentList, finalItem];
    } else {
      updatedList = currentList.map((m) => (m.id === finalItem.id ? finalItem : m));
    }

    const updated = { ...data, [targetCategory]: updatedList };
    persistData(updated);
    setIsModalOpen(false);
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    setPhotoPreview(URL.createObjectURL(file));
    try {
      const res = await api.uploadSingleFile(file);
      if (res.success && res.file?.url) {
        setFormData((prev) => ({ ...prev, image: res.file?.url || "" }));
        toast.success("Photo uploaded successfully!");
      } else {
        toast.error(res.message || "Upload failed.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reload leadership data from database?")) {
      loadData(true);
    }
  };

  // Compile combined list with category tag
  const allList = [
    ...data.trustees.map((item) => ({ ...item, category: "trustees" as LeadershipCategory, categoryLabel: "Board of Trustees" })),
    ...data.executive.map((item) => ({ ...item, category: "executive" as LeadershipCategory, categoryLabel: "Executive Body" })),
    ...data.advisory.map((item) => ({ ...item, category: "advisory" as LeadershipCategory, categoryLabel: "Advisory Body" })),
    ...data.field.map((item) => ({ ...item, category: "field" as LeadershipCategory, categoryLabel: "Field Operations" })),
  ];

  const filteredList = allList.filter((item) => {
    const matchesCategory = activeTab === "all" || item.category === activeTab;
    const matchesSearch =
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.designation.toLowerCase().includes(search.toLowerCase()) ||
      (item.portfolio && item.portfolio.toLowerCase().includes(search.toLowerCase())) ||
      (item.focus && item.focus.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Mode Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setViewMode("directory")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
            viewMode === "directory"
              ? "bg-[#071527] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Award className="w-4 h-4 text-[#f97316]" />
          <span>Foundation Leadership Roster</span>
        </button>
        <button
          onClick={() => setViewMode("accounts")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
            viewMode === "accounts"
              ? "bg-[#071527] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span>CMS Admin Accounts &amp; Roles</span>
        </button>
      </div>

      {viewMode === "accounts" ? (
        /* ═══════════ CMS ADMIN USER ACCOUNTS & RBAC ROLES ═══════════ */
        <div className="space-y-5">
          {/* Active Admin Session Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#071527] border border-[#0f3458] shadow-xs flex items-center justify-center p-2.5 shrink-0 text-white font-black text-lg">
                IS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-[#071527]">
                    {adminUser?.name || "ISLAH Superadmin"}
                  </h3>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Super Admin
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {adminUser?.email || "admin@iwfindia.org"}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Full administrative privileges • Financial approval authority • Database management
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-mono font-bold border border-slate-200">
                Session Active (JWT)
              </span>
            </div>
          </div>

          {/* Role Definitions & Permission Matrix */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#071527]">Role-Based Access Control (RBAC) Matrix</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Permissions assigned to foundation staff accounts across the 11 CMS navigation pillars.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-3">Staff Member</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Assigned Roles</th>
                    <th className="pb-3">Work Areas</th>
                    <th className="pb-3">Office Scope</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {staffAccounts.length > 0 ? staffAccounts.map((staff) => (
                    <tr key={staff._id} className="hover:bg-slate-50/70 transition">
                      <td className="py-4">
                        <span className="font-bold text-[#071527] block text-xs">{staff.name}</span>
                        <span className="text-[10px] text-slate-400">
                          {(staff.roles || [staff.role || "unassigned"]).join(", ")}
                        </span>
                      </td>
                      <td className="py-4 font-mono text-[11px] text-slate-700">{staff.email}</td>
                      <td className="py-4 text-slate-600">{(staff.roles || []).length} assigned role(s)</td>
                      <td className="py-4 text-slate-600">{staff.scope?.workAreas?.length || 0} work area(s)</td>
                      <td className="py-4 text-slate-600">{staff.scope?.offices?.length || 0} office scope(s)</td>
                      <td className="py-4 text-right">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${
                          staff.isActive
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}>
                          <CheckCircle2 className="w-3 h-3" />
                          {staff.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-xs text-slate-400">
                        No staff accounts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Logs & Audit Stream */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#071527] flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-500" />
                <span>Admin Session &amp; Mutation Audit Trail</span>
              </h4>
              <span className="text-[10px] font-mono text-slate-400">Database audit logs</span>
            </div>

            <div className="bg-slate-900 rounded-xl p-4 font-mono text-[11px] text-emerald-400 space-y-1.5 border border-slate-800">
              {recentAuditLogs.length > 0 ? recentAuditLogs.map((log) => (
                <p key={log._id} className="text-slate-300">
                  [{formatKolkataTime(log.createdAt)}] {log.action} - {log.actorName || "System"}
                </p>
              )) : (
                <p className="text-slate-400">No audit activity recorded yet.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#071527] flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Leadership, Trustees &amp; Governance
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Dynamic control for all 4 leadership tiers displayed live on{" "}
            <a href="https://iwf-delta.vercel.app/about/leadership" target="_blank" rel="noreferrer" className="text-orange-600 font-bold hover:underline inline-flex items-center gap-1">
              /about/leadership <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDefaults}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition border border-slate-200 shadow-2xs cursor-pointer"
            title="Reset to Foundation Charter Defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
          <button
            onClick={() => handleOpenAdd()}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Leader / Official
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200/90 shadow-2xs rounded-xl p-3 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-500">Board of Trustees</div>
            <div className="text-lg font-black text-orange-600">{data.trustees.length}</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 shadow-2xs rounded-xl p-3 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-500">Executive Body</div>
            <div className="text-lg font-black text-blue-600">{data.executive.length}</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Compass className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 shadow-2xs rounded-xl p-3 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-500">Advisory Body</div>
            <div className="text-lg font-black text-amber-600">{data.advisory.length}</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <GraduationCap className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 shadow-2xs rounded-xl p-3 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-500">Field Operations</div>
            <div className="text-lg font-black text-purple-600">{data.field.length}</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
            <MapPin className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white border border-slate-200/90 p-2.5 rounded-2xl shadow-2xs">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {(
            [
              { id: "all", label: `All Tiers (${allList.length})` },
              { id: "trustees", label: `Board of Trustees (${data.trustees.length})` },
              { id: "executive", label: `Executive Body (${data.executive.length})` },
              { id: "advisory", label: `Advisory Body (${data.advisory.length})` },
              { id: "field", label: `Field Team (${data.field.length})` },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === t.id
                  ? "bg-orange-500 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative shrink-0 sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search leader by name or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 transition"
          />
        </div>
      </div>

      {/* Grid of Leaders */}
      {loading ? (
        <div className="p-16 flex flex-col items-center justify-center text-slate-400 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
          <p className="text-xs">Loading leadership data...</p>
        </div>
      ) : filteredList.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl text-slate-500 text-xs shadow-2xs">
          No members found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between hover:border-orange-300 hover:shadow-md transition group shadow-2xs"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-orange-600 font-bold text-sm shrink-0">
                        {item.name
                          .replace(/(Prof\.\s*\(Dr\.\)|Prof\.|Dr\.|Adv\.|Er\.|CA\s+|CS\.\s+|Mr\.|Ms\.|Md\.)/gi, "")
                          .trim()
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-extrabold text-[#071527] group-hover:text-orange-600 transition-colors">
                        {item.name}
                      </h4>
                      <span className="inline-block text-[11px] font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded mt-0.5">
                        {item.designation}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded">
                    {item.categoryLabel}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-3">
                  {item.portfolio || item.focus || "Foundation Leadership & Community Stewardship"}
                </p>

                {item.email && (
                  <div className="mt-2 text-[11px] text-slate-500 font-mono truncate">
                    ✉ {item.email}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">
                  #{item.sno || item.id.slice(-4)}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(item.category, item)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition cursor-pointer"
                    title="Edit Member"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.category, item.id)}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition cursor-pointer"
                    title="Delete Member"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg shadow-2xl my-auto max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Sticky Header */}
            <div className="p-5 pb-4 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-sm font-extrabold text-[#071527] flex items-center gap-2">
                <Award className="w-4 h-4 text-orange-500" />
                <span>{modalMode === "add" ? "Add Leader / Official" : "Edit Leader Details"}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Content */}
            <form onSubmit={handleSaveModal} className="flex flex-col flex-1 overflow-hidden min-h-0">
              <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs overscroll-contain">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Leadership Category / Tier
                  </label>
                  <select
                    value={targetCategory}
                    onChange={(e) => setTargetCategory(e.target.value as LeadershipCategory)}
                    disabled={modalMode === "edit"}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500 transition"
                  >
                    <option value="trustees">Board of Trustees (Apex Governing Body)</option>
                    <option value="executive">Executive Body (Operational Management)</option>
                    <option value="advisory">Advisory Body (Strategic Counsel)</option>
                    <option value="field">Field Operations Team (Frontline Mobilization)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Er. Nasera Firdausi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Designation / Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Secretary, Academic Advisor"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Gender
                    </label>
                    <select
                      value={formData.gender || "male"}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as "male" | "female" })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500 transition"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Portfolio / Responsibilities / Key Focus
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe key responsibilities, oversight areas, or domain expertise..."
                    value={formData.portfolio || formData.focus || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, portfolio: e.target.value, focus: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Official Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. chairman@iwfindia.org"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500 transition"
                  />
                </div>

                {/* Profile Photo (Dual Mode: Direct File Upload or Paste URL) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Profile Photo
                    </label>
                    <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setPhotoMode("file")}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition ${
                          photoMode === "file" ? "bg-orange-500 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload File</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPhotoMode("url")}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition ${
                          photoMode === "url" ? "bg-orange-500 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <LinkIcon className="w-3 h-3" />
                        <span>Paste URL</span>
                      </button>
                    </div>
                  </div>

                  {photoMode === "file" ? (
                    <div className="relative border-2 border-dashed border-slate-300 hover:border-orange-500 rounded-2xl p-4 bg-slate-50/70 hover:bg-orange-50/20 text-center transition group cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                      />

                      {formData.image || photoPreview ? (
                        <div className="flex items-center justify-between gap-3 text-left">
                          <div className="flex items-center gap-3">
                            <img
                              src={photoPreview || formData.image}
                              alt="Leader Preview"
                              className="w-14 h-14 object-cover rounded-xl border border-slate-200"
                            />
                            <div>
                              <p className="text-slate-900 font-bold text-xs truncate max-w-[220px]">
                                {uploadingImage ? "Uploading to Cloud..." : "Profile Photo Ready"}
                              </p>
                              <span className="text-[10px] text-orange-600 font-semibold">
                                {uploadingImage ? "Please wait..." : "Click to change photo"}
                              </span>
                            </div>
                          </div>
                          {uploadingImage ? (
                            <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData((prev) => ({ ...prev, image: "" }));
                                setPhotoPreview(null);
                              }}
                              className="p-1 text-slate-400 hover:text-red-500 rounded-lg z-20 cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="py-3 flex flex-col items-center justify-center gap-1.5">
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-400 group-hover:text-orange-500 group-hover:scale-110 transition">
                            <Upload className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              Choose or drag &amp; drop profile picture from device
                            </p>
                            <p className="text-[10px] text-slate-500">
                              Uploads automatically to live cloud storage
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        placeholder="https://... or upload photo"
                        value={formData.image || ""}
                        onChange={(e) => {
                          setFormData({ ...formData, image: e.target.value });
                          setPhotoPreview(e.target.value);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500 transition"
                      />
                      {formData.image && (
                        <div className="mt-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-14 h-14 object-cover rounded-lg border border-slate-200"
                          />
                          <div className="text-[11px] text-slate-600">
                            <p className="text-slate-900 font-bold">Photo Preview</p>
                            <p className="text-[10px] text-slate-500 truncate max-w-[250px]">{formData.image}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
                >
                  {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

