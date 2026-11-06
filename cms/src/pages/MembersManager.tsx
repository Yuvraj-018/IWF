import { useState, useEffect } from "react";
import { api } from "../services/api";
import {
  Search,
  Download,
  Loader2,
  RefreshCw,
  Users,
  Heart,
  Building2,
  GraduationCap,
  Plus,
  Trash2,
  Edit2,
  Save,
  Upload,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  Link as LinkIcon,
  X,
} from "lucide-react";
import { toast } from "sonner";

export interface DirectoryItem {
  id: string;
  name: string;
  role: string;
  type: "member" | "donor" | "partner" | "volunteer" | "mentor";
  location: string;
  category?: string;
  bio?: string;
  organization?: string;
  avatar?: string;
  isPublicConsent: boolean;
}

const DEFAULT_SPOTLIGHT: DirectoryItem[] = [
  { id: "dir-1", name: "Ayesha Khan", role: "Individual Member", type: "member", location: "Darbhanga, Bihar", category: "Blue", bio: "Educator & Social Worker", isPublicConsent: true },
  { id: "dir-2", name: "Rahul Sharma", role: "Individual Donor", type: "donor", location: "New Delhi, Delhi", category: "Gold", bio: "Healthcare & Rural Development", isPublicConsent: true },
  { id: "dir-3", name: "Tata Consultancy Services", role: "Corporate Partner", type: "partner", location: "Pan India", category: "Corporate Partner", bio: "Technology & Digital Skills", isPublicConsent: true },
  { id: "dir-4", name: "Neha Verma", role: "Education Volunteer", type: "volunteer", location: "Lucknow, Uttar Pradesh", category: "Youth Volunteer", bio: "Digital Literacy & Tech", isPublicConsent: true },
  { id: "dir-5", name: "Dr. Tariq Anwar", role: "Executive Member", type: "member", location: "Darbhanga, Bihar", category: "Yellow", bio: "Medical Consultant", isPublicConsent: true },
  { id: "dir-6", name: "Reliance Foundation", role: "Development Partner", type: "partner", location: "Maharashtra / Bihar", category: "Development Partner", bio: "Healthcare & Rural Development", isPublicConsent: true },
  { id: "dir-7", name: "Azim Premji Philanthropy", role: "Platinum Foundation Donor", type: "donor", location: "Pan India", category: "Platinum", bio: "Primary Education & Grassroots Health", isPublicConsent: true },
  { id: "dir-8", name: "Dr. Ayesha Rahman", role: "Education Mentor", type: "mentor", location: "Delhi NCR", category: "Mentor", bio: "Education & Career Guidance", isPublicConsent: true },
];

export default function MembersManager() {
  const [managerTab, setManagerTab] = useState<"directory" | "ledger">("directory");

  // ── Directory State ──
  const [spotlight, setSpotlight] = useState<DirectoryItem[]>(DEFAULT_SPOTLIGHT);
  const [directoryLoading, setDirectoryLoading] = useState(true);
  const [directorySaving, setDirectorySaving] = useState(false);
  const [directoryFilter, setDirectoryFilter] = useState<"all" | "member" | "donor" | "partner" | "volunteer">("all");
  const [directorySearch, setDirectorySearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [modalFormData, setModalFormData] = useState<DirectoryItem>({
    id: "",
    name: "",
    role: "",
    type: "member",
    location: "",
    category: "",
    bio: "",
    avatar: "",
    isPublicConsent: true,
  });
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarMode, setAvatarMode] = useState<"file" | "url">("file");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // ── Ledger State ──
  const [members, setMembers] = useState<any[]>([]);
  const [ledgerLoading, setLedgerLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const loadDirectory = async (force = false) => {
    setDirectoryLoading(true);
    try {
      const res = await api.getSettings({ force });
      if (res.success && res.data?.community_directory?.spotlight) {
        setSpotlight(res.data.community_directory.spotlight);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDirectoryLoading(false);
    }
  };

  const loadMembers = (force = false) => {
    setLedgerLoading(true);
    api.listMembers({ category: category || undefined, status: status || undefined, search }, { force }).then((res) => {
      if (res.success && res.data) {
        setMembers(res.data);
      }
      setLedgerLoading(false);
    });
  };

  useEffect(() => {
    loadDirectory();
  }, []);

  useEffect(() => {
    if (managerTab === "ledger") {
      loadMembers(false);
    }
  }, [managerTab, category, status, search]);

  const persistDirectory = async (updated: DirectoryItem[]) => {
    setDirectorySaving(true);
    try {
      const res = await api.updateSetting("community_directory", { spotlight: updated });
      if (res.success) {
        setSpotlight(updated);
        toast.success("Community directory updated live on /community!");
      } else {
        toast.error("Failed to update directory.");
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to save directory.");
    } finally {
      setDirectorySaving(false);
    }
  };

  const handleOpenAddDirectory = () => {
    setModalMode("add");
    setModalFormData({
      id: `dir-${Date.now()}`,
      name: "",
      role: "",
      type: directoryFilter === "all" ? "member" : (directoryFilter as any),
      location: "",
      category: "",
      bio: "",
      avatar: "",
      isPublicConsent: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditDirectory = (item: DirectoryItem) => {
    setModalMode("edit");
    setModalFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDeleteDirectory = (id: string) => {
    if (!window.confirm("Delete this directory profile?")) return;
    const updated = spotlight.filter((item) => item.id !== id);
    persistDirectory(updated);
  };

  const handleToggleConsent = (id: string) => {
    const updated = spotlight.map((item) =>
      item.id === id ? { ...item, isPublicConsent: !item.isPublicConsent } : item
    );
    persistDirectory(updated);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalFormData.name.trim() || !modalFormData.role.trim()) {
      toast.error("Name and Role are required.");
      return;
    }

    let updated: DirectoryItem[];
    if (modalMode === "add") {
      updated = [...spotlight, modalFormData];
    } else {
      updated = spotlight.map((item) => (item.id === modalFormData.id ? modalFormData : item));
    }
    persistDirectory(updated);
    setIsModalOpen(false);
  };

  const handleUploadAvatar = async (file: File) => {
    setUploadingAvatar(true);
    setAvatarPreview(URL.createObjectURL(file));
    try {
      const res = await api.uploadSingleFile(file);
      if (res.success && res.file?.url) {
        setModalFormData((prev) => ({ ...prev, avatar: res.file?.url }));
        toast.success("Photo uploaded successfully!");
      } else {
        toast.error(res.message || "Upload failed.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload avatar.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const exportCSV = () => {
    if (members.length === 0) {
      toast.error("No member data to export.");
      return;
    }

    const headers = ["Member ID", "Full Name", "Category", "Status", "Mobile", "District", "State", "Valid Till"];
    const rows = members.map((m) => [
      m.memberNo || m.id,
      `"${m.name || m.fullName}"`,
      m.category,
      m.status,
      m.phone || m.mobile,
      `"${m.district}"`,
      `"${m.state}"`,
      m.validTill,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `islah_members_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Member registry exported to CSV!");
  };

  const getBadgeCls = (cat: string) => {
    if (cat === "Blue") return "bg-blue-50 text-blue-700 border-blue-200";
    if (cat === "Yellow") return "bg-amber-50 text-amber-700 border-amber-200";
    if (cat === "Green") return "bg-emerald-50 text-emerald-700 border-emerald-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  const filteredSpotlight = spotlight.filter((item) => {
    const matchesFilter =
      directoryFilter === "all"
        ? true
        : directoryFilter === "volunteer"
        ? item.type === "volunteer" || item.type === "mentor"
        : item.type === directoryFilter;
    const matchesSearch =
      !directorySearch ||
      item.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
      item.role.toLowerCase().includes(directorySearch.toLowerCase()) ||
      (item.bio && item.bio.toLowerCase().includes(directorySearch.toLowerCase())) ||
      (item.location && item.location.toLowerCase().includes(directorySearch.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#071527] flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-500" />
            Community Directory &amp; Member Registry
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage public directory cards on{" "}
            <a href="https://iwf-delta.vercel.app/community" target="_blank" rel="noreferrer" className="text-orange-600 font-bold hover:underline inline-flex items-center gap-1">
              /community <ExternalLink className="w-3 h-3" />
            </a>{" "}
            and audit official member records
          </p>
        </div>

        {/* Manager Mode Tabs */}
        <div className="flex items-center bg-white border border-slate-200 p-1 rounded-xl shadow-2xs">
          <button
            onClick={() => setManagerTab("directory")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              managerTab === "directory" ? "bg-orange-500 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Directory Profiles ({spotlight.length})
          </button>
          <button
            onClick={() => setManagerTab("ledger")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              managerTab === "ledger" ? "bg-orange-500 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Registered Cardholders
          </button>
        </div>
      </div>

      {managerTab === "directory" ? (
        /* ═══════════ TAB 1: COMMUNITY DIRECTORY SPOTLIGHT ═══════════ */
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white border border-slate-200/90 p-3 rounded-2xl shadow-2xs">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {(
                [
                  { id: "all", label: "All Profiles" },
                  { id: "member", label: "Members" },
                  { id: "donor", label: "Donors" },
                  { id: "partner", label: "Partners & Sponsors" },
                  { id: "volunteer", label: "Volunteers & Mentors" },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setDirectoryFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    directoryFilter === f.id
                      ? "bg-orange-50 text-orange-700 border border-orange-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative shrink-0 w-full sm:w-56">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search name, location..."
                  value={directorySearch}
                  onChange={(e) => setDirectorySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 transition"
                />
              </div>
              <button
                onClick={handleOpenAddDirectory}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition shrink-0 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Profile</span>
              </button>
            </div>
          </div>

          {directoryLoading ? (
            <div className="p-16 flex flex-col items-center justify-center text-slate-500 gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
              <p className="text-xs">Loading community directory...</p>
            </div>
          ) : filteredSpotlight.length === 0 ? (
            <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl text-slate-500 text-xs shadow-2xs">
              No directory profiles found. Click "Add Profile" to feature a member, donor, partner, or volunteer!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {filteredSpotlight.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between hover:border-orange-300 hover:shadow-md transition group shadow-2xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        {item.avatar ? (
                          <img
                            src={item.avatar}
                            alt={item.name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-orange-600 font-bold text-xs shrink-0">
                            {item.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {item.type}
                        </span>
                      </div>

                      <button
                        onClick={() => handleToggleConsent(item.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition cursor-pointer ${
                          item.isPublicConsent
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}
                        title="Toggle public visibility"
                      >
                        {item.isPublicConsent ? "Public" : "Hidden"}
                      </button>
                    </div>

                    <h4 className="text-sm font-extrabold text-[#071527] group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </h4>
                    <div className="text-[11px] font-semibold text-slate-500 mt-0.5">{item.role}</div>

                    <div className="text-xs text-slate-600 mt-2 font-normal line-clamp-2">
                      {item.bio || "Active community contributor"}
                    </div>

                    <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                      <span>📍</span>
                      <span className="truncate">{item.location || "India"}</span>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.category || item.type}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditDirectory(item)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition cursor-pointer"
                        title="Edit Profile"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteDirectory(item.id)}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition cursor-pointer"
                        title="Delete Profile"
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
      ) : (
        /* ═══════════ TAB 2: REGISTERED MEMBERS LEDGER ═══════════ */
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 bg-white border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-orange-500"
              >
                <option value="">All Categories</option>
                <option value="Blue">Blue Card (₹500)</option>
                <option value="Yellow">Yellow Card (₹1,000)</option>
                <option value="Green">Green Card (₹2,500)</option>
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-2 bg-white border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-orange-500"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Member ID, name, phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                onClick={() => loadMembers(true)}
                disabled={ledgerLoading}
                className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 transition cursor-pointer shadow-2xs"
                title="Refresh from MongoDB"
              >
                <RefreshCw className={`w-4 h-4 ${ledgerLoading ? "animate-spin text-orange-500" : ""}`} />
              </button>

              <button
                onClick={exportCSV}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-orange-50 hover:bg-orange-500 text-orange-700 hover:text-white text-xs font-bold border border-orange-200 transition cursor-pointer shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
            {ledgerLoading ? (
              <div className="p-16 flex flex-col items-center justify-center text-slate-400 gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                <p className="text-xs">Loading member database...</p>
              </div>
            ) : members.length === 0 ? (
              <div className="p-16 text-center text-slate-500 text-xs">
                No member records found matching criteria.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider font-extrabold">
                    <tr>
                      <th className="p-3.5 pl-5">Member ID</th>
                      <th className="p-3.5">Name</th>
                      <th className="p-3.5">Card Tier</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Location</th>
                      <th className="p-3.5">Contact</th>
                      <th className="p-3.5 pr-5">Valid Till</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {members.map((m) => (
                      <tr key={m.memberNo || m.id || m._id} className="hover:bg-slate-50/80 transition">
                        <td className="p-3.5 pl-5 font-mono text-orange-600 font-bold">{m.memberNo || m.id}</td>
                        <td className="p-3.5 font-bold text-[#071527]">{m.name || m.fullName}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${getBadgeCls(m.category)}`}>
                            {m.category}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              m.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}
                          >
                            {m.status || "Active"}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-700">
                          {m.district}, {m.state}
                        </td>
                        <td className="p-3.5 text-slate-500 font-mono">{m.phone || m.mobile || "Private"}</td>
                        <td className="p-3.5 pr-5 text-slate-500 font-mono">{m.validTill || "2027-01-01"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Directory Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md shadow-2xl my-auto max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Sticky Header */}
            <div className="p-5 pb-4 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-sm font-extrabold text-[#071527] flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-500" />
                <span>{modalMode === "add" ? "Add Directory Profile" : "Edit Directory Profile"}</span>
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
              <div className="p-5 overflow-y-auto flex-1 space-y-3.5 text-xs overscroll-contain">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Profile Type *
                    </label>
                    <select
                      value={modalFormData.type}
                      onChange={(e) => setModalFormData({ ...modalFormData, type: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                    >
                      <option value="member">Member</option>
                      <option value="donor">Donor</option>
                      <option value="partner">Partner &amp; Sponsor</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="mentor">Mentor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Category / Tier
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Corporate Partner, Gold"
                      value={modalFormData.category || ""}
                      onChange={(e) => setModalFormData({ ...modalFormData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tata Consultancy Services, Dr. Tariq Anwar"
                    value={modalFormData.name}
                    onChange={(e) => setModalFormData({ ...modalFormData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Role / Subtitle *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Corporate Partner, Individual Member"
                      value={modalFormData.role}
                      onChange={(e) => setModalFormData({ ...modalFormData, role: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pan India, Darbhanga"
                      value={modalFormData.location}
                      onChange={(e) => setModalFormData({ ...modalFormData, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Bio / Focus Area / Profession
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Technology & Digital Skills, Healthcare Consultant"
                    value={modalFormData.bio || ""}
                    onChange={(e) => setModalFormData({ ...modalFormData, bio: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* Photo or Logo (Dual Mode: Direct File Upload or Paste URL) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Photo or Organization Logo
                    </label>
                    <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setAvatarMode("file")}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition ${
                          avatarMode === "file" ? "bg-orange-500 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload File</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAvatarMode("url")}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition ${
                          avatarMode === "url" ? "bg-orange-500 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <LinkIcon className="w-3 h-3" />
                        <span>Paste URL</span>
                      </button>
                    </div>
                  </div>

                  {avatarMode === "file" ? (
                    <div className="relative border-2 border-dashed border-slate-300 hover:border-orange-500 rounded-2xl p-4 bg-slate-50/70 hover:bg-orange-50/20 text-center transition group cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUploadAvatar(file);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                      />

                      {modalFormData.avatar || avatarPreview ? (
                        <div className="flex items-center justify-between gap-3 text-left">
                          <div className="flex items-center gap-3">
                            <img
                              src={avatarPreview || modalFormData.avatar}
                              alt="Avatar Preview"
                              className="w-14 h-14 object-cover rounded-xl border border-slate-200"
                            />
                            <div>
                              <p className="text-slate-900 font-bold text-xs truncate max-w-[220px]">
                                {uploadingAvatar ? "Uploading to Cloud..." : "Profile Photo Ready"}
                              </p>
                              <span className="text-[10px] text-orange-600 font-semibold">
                                {uploadingAvatar ? "Please wait..." : "Click to change photo"}
                              </span>
                            </div>
                          </div>
                          {uploadingAvatar ? (
                            <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setModalFormData((prev) => ({ ...prev, avatar: "" }));
                                setAvatarPreview(null);
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
                              Choose or drag &amp; drop profile image/logo from device
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
                        placeholder="https://... or paste URL"
                        value={modalFormData.avatar || ""}
                        onChange={(e) => {
                          setModalFormData({ ...modalFormData, avatar: e.target.value });
                          setAvatarPreview(e.target.value);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500 transition"
                      />
                      {modalFormData.avatar && (
                        <div className="mt-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                          <img
                            src={modalFormData.avatar}
                            alt="Preview"
                            className="w-14 h-14 object-cover rounded-lg border border-slate-200"
                          />
                          <div className="text-[11px] text-slate-600">
                            <p className="text-slate-900 font-bold">Photo Preview</p>
                            <p className="text-[10px] text-slate-500 truncate max-w-[250px]">{modalFormData.avatar}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="consentCheckbox"
                    checked={modalFormData.isPublicConsent}
                    onChange={(e) => setModalFormData({ ...modalFormData, isPublicConsent: e.target.checked })}
                    className="w-4 h-4 rounded accent-orange-500"
                  />
                  <label htmlFor="consentCheckbox" className="text-xs text-slate-700 font-semibold cursor-pointer">
                    Public Display Consent Approved (Visible on website)
                  </label>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={directorySaving}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs"
                >
                  {directorySaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
