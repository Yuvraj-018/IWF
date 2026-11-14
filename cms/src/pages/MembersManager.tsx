import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
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
  CreditCard,
  Layers,
  CalendarClock,
  Sparkles,
  AlertCircle,
  FileCheck2,
  Phone,
  Mail,
  MapPin,
  Calendar,
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

export type ManagerTab = "ledger" | "categories" | "cards" | "renewals" | "directory";

export default function MembersManager() {
  const location = useLocation();
  const [managerTab, setManagerTab] = useState<ManagerTab>("ledger");

  // ── Directory State (Loaded live from DB community_directory) ──
  const [spotlight, setSpotlight] = useState<DirectoryItem[]>([]);
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

  // ── Ledger State (Loaded live from DB Member collection) ──
  const [members, setMembers] = useState<any[]>([]);
  const [ledgerLoading, setLedgerLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  // Dynamic categories aggregated strictly from real MongoDB member records - ZERO mock data
  const dynamicCategories = useMemo(() => {
    const map = new Map<
      string,
      { id: string; name: string; count: number; totalFee: number; active: number }
    >();
    members.forEach((m) => {
      const cat = m.category || "General Member";
      const existing = map.get(cat) || {
        id: cat,
        name: cat,
        count: 0,
        totalFee: 0,
        active: 0,
      };
      existing.count += 1;
      existing.totalFee += Number(m.annualFee) || 0;
      if (m.status === "Active") existing.active += 1;
      map.set(cat, existing);
    });
    return Array.from(map.values());
  }, [members]);

  // Sync tab with URL route
  useEffect(() => {
    if (location.pathname.includes("/membership/categories")) {
      setManagerTab("categories");
    } else if (location.pathname.includes("/membership/cards")) {
      setManagerTab("cards");
    } else if (location.pathname.includes("/membership/renewals")) {
      setManagerTab("renewals");
    } else if (location.pathname.includes("/membership/records") || location.pathname === "/membership") {
      setManagerTab("ledger");
    } else if (location.pathname.includes("/community/directory")) {
      setManagerTab("directory");
    }
  }, [location.pathname]);

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
    api
      .listMembers({ category: category || undefined, status: status || undefined, search }, { force })
      .then((res) => {
        if (res.success && res.data) {
          setMembers(res.data);
        }
        setLedgerLoading(false);
      })
      .catch(() => {
        setLedgerLoading(false);
      });
  };

  useEffect(() => {
    loadDirectory();
  }, []);

  useEffect(() => {
    if (managerTab !== "directory") {
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

  const handleToggleLedgerConsent = async (memberId: string) => {
    try {
      const res = await api.toggleMemberVisibility(memberId);
      if (res.success) {
        toast.success(res.message || "Member visibility updated live");
        setMembers((prev) =>
          prev.map((m) =>
            m.memberNo === memberId || m.id === memberId || m._id === memberId
              ? { ...m, isPublicConsent: res.isPublicConsent }
              : m
          )
        );
        loadDirectory(true);
      } else {
        toast.error(res.message || "Failed to update visibility");
      }
    } catch (err: any) {
      toast.error(err.message || "Update failed");
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
      toast.error("Please fill in all required fields.");
      return;
    }

    let updated: DirectoryItem[];
    if (modalMode === "add") {
      updated = [modalFormData, ...spotlight];
    } else {
      updated = spotlight.map((item) => (item.id === modalFormData.id ? modalFormData : item));
    }

    persistDirectory(updated);
    setIsModalOpen(false);
  };

  const handleUploadAvatar = async (file: File) => {
    setUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.uploadMedia(formData);
      if (res.success && res.data?.url) {
        setModalFormData((prev) => ({ ...prev, avatar: res.data.url }));
        setAvatarPreview(res.data.url);
        toast.success("Profile photo uploaded successfully!");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (err) {
      toast.error("Upload error");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const exportCSV = () => {
    if (!members.length) {
      toast.error("No member records to export.");
      return;
    }
    const headers = ["Member ID", "Name", "Category", "Status", "Annual Fee", "District", "State", "Phone", "Email", "Valid Till", "Receipt No", "Cert No"];
    const rows = members.map((m) => [
      m.memberNo || m.id || "",
      `"${m.name || m.fullName || ""}"`,
      m.category || "",
      m.status || "Active",
      m.annualFee || 0,
      `"${m.district || ""}"`,
      `"${m.state || ""}"`,
      m.phone || m.mobile || "",
      m.email || "",
      m.validTill ? new Date(m.validTill).toLocaleDateString() : "",
      m.receiptNo || "",
      m.certificateNo || "",
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
    if (cat === "Orange") return "bg-orange-50 text-orange-700 border-orange-200";
    if (cat === "Community") return "bg-blue-50 text-blue-700 border-blue-200";
    if (cat === "Contributing") return "bg-purple-50 text-purple-700 border-purple-200";
    if (cat === "Patron") return "bg-amber-50 text-amber-700 border-amber-200";
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

  const expiringOrExpiredMembers = members.filter((m) => {
    if (m.status === "Expired") return true;
    if (m.validTill) {
      const diffDays = (new Date(m.validTill).getTime() - Date.now()) / (1000 * 3600 * 24);
      return diffDays <= 45;
    }
    return false;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#071527] flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-500" />
            Membership &amp; Directory Operations
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Official cardholders, tier categories, digital ID credentials, and public cards on{" "}
            <a
              href="https://iwf-delta.vercel.app/community"
              target="_blank"
              rel="noreferrer"
              className="text-orange-600 font-bold hover:underline inline-flex items-center gap-1"
            >
              /community <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>

        {/* Manager Mode Tabs */}
        <div className="flex flex-wrap items-center bg-white border border-slate-200 p-1 rounded-xl shadow-2xs gap-1">
          <button
            onClick={() => setManagerTab("ledger")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              managerTab === "ledger" ? "bg-orange-500 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Member Records ({members.length})</span>
          </button>
          <button
            onClick={() => setManagerTab("categories")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              managerTab === "categories" ? "bg-orange-500 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Categories ({dynamicCategories.length})</span>
          </button>
          <button
            onClick={() => setManagerTab("cards")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              managerTab === "cards" ? "bg-orange-500 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Digital ID Cards</span>
          </button>
          <button
            onClick={() => setManagerTab("renewals")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              managerTab === "renewals" ? "bg-orange-500 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <CalendarClock className="w-3.5 h-3.5" />
            <span>Renewals &amp; Expiry</span>
          </button>
          <button
            onClick={() => setManagerTab("directory")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              managerTab === "directory" ? "bg-orange-500 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Public Directory ({spotlight.length})</span>
          </button>
        </div>
      </div>

      {/* ═══════════ TAB 1: CATEGORIES VIEW ═══════════ */}
      {managerTab === "categories" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-[#071527]">Membership Categories &amp; Tiers</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Aggregated in real-time from active member registrations in the database.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                {members.length} Enrolled Cardholders
              </span>
            </div>
          </div>

          {ledgerLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="w-28 h-5 bg-slate-100 rounded"></div>
                    <div className="w-16 h-5 bg-slate-100 rounded"></div>
                  </div>
                  <div className="w-3/4 h-3 bg-slate-100 rounded"></div>
                  <div className="w-full h-12 bg-slate-50 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : dynamicCategories.length === 0 ? (
            <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl text-slate-500 text-xs shadow-2xs">
              No registered member records found in database to extract categories.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dynamicCategories.map((tier) => (
                <div
                  key={tier.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between hover:border-orange-300 hover:shadow-md transition shadow-2xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${getBadgeCls(tier.name)}`}>
                          {tier.name}
                        </span>
                        <h4 className="text-base font-black text-[#071527] mt-1.5">{tier.name}</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-black text-orange-600 font-mono">
                          ₹{tier.totalFee.toLocaleString("en-IN")}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">total collected</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 grid grid-cols-2 gap-2 text-xs font-mono mt-3">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-sans">Active Status</span>
                        <span className="font-bold text-emerald-600 font-mono">
                          {tier.active} Active
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-sans">Total Cardholders</span>
                        <span className="font-bold text-slate-800 font-mono">
                          {tier.count} Enrolled
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Avg Fee / Member</span>
                      <span className="text-xs font-black text-[#071527] font-mono">
                        {tier.count > 0 ? `₹${Math.round(tier.totalFee / tier.count).toLocaleString("en-IN")}` : "–"}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setCategory(tier.id);
                        setManagerTab("ledger");
                      }}
                      className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-500 text-orange-700 hover:text-white text-xs font-bold border border-orange-200 transition cursor-pointer"
                    >
                      Filter Registry →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══════════ TAB 2: DIGITAL ID CARDS VIEW ═══════════ */}
      {managerTab === "cards" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-[#071527]">Digital Member Identification Cards</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Dynamic credential cards generated for verified active members in the database.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print All Cards</span>
              </button>
            </div>
          </div>

          {ledgerLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 animate-pulse h-52">
                  <div className="w-32 h-4 bg-slate-100 rounded"></div>
                  <div className="w-48 h-5 bg-slate-100 rounded"></div>
                  <div className="w-24 h-3 bg-slate-100 rounded"></div>
                </div>
              ))}
            </div>
          ) : members.length === 0 ? (
            <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl text-slate-500 text-xs shadow-2xs">
              No registered members found to generate ID cards. Once members are enrolled, digital cards appear automatically.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((m) => (
                <div
                  key={m.memberNo || m.id || m._id}
                  className="bg-white border-2 border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs hover:border-orange-300 transition group flex flex-col justify-between"
                >
                  {/* Card Top Brand Band */}
                  <div className="bg-[#071527] text-white p-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-orange-400">
                        ISLAH WELFARE FOUNDATION
                      </div>
                      <div className="text-[11px] font-semibold text-slate-300">Official Membership Credential</div>
                    </div>
                    <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded text-white font-mono">
                      {m.memberNo || m.id}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-black text-[#071527] group-hover:text-orange-600 transition-colors">
                          {m.name || m.fullName}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {m.district || "Darbhanga"}, {m.state || "Bihar"}
                        </p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold shrink-0 ${getBadgeCls(m.category)}`}>
                        {m.category || "Community"}
                      </span>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 grid grid-cols-2 gap-2 text-[10px] font-mono">
                      <div>
                        <span className="text-slate-400 block font-sans">Status</span>
                        <span className={`font-bold ${m.status === "Active" ? "text-emerald-600" : "text-slate-600"}`}>
                          ● {m.status || "Active"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-sans">Valid Till</span>
                        <span className="text-slate-700 font-bold">
                          {m.validTill ? new Date(m.validTill).toLocaleDateString() : "Active"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-sans">Receipt Ref</span>
                        <span className="text-slate-700 font-bold truncate block">{m.receiptNo || "–"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-sans">Certificate</span>
                        <span className="text-slate-700 font-bold truncate block">
                          {m.certificateNo || `CERT-${m.memberNo || m.id}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-4 py-2.5 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 font-medium">Secured • Registered NGO</span>
                    <button
                      onClick={() => {
                        toast.success(`Printing card for ${m.name || m.fullName}`);
                        window.print();
                      }}
                      className="text-orange-600 font-bold hover:underline cursor-pointer"
                    >
                      Print Card
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══════════ TAB 3: RENEWALS & EXPIRY VIEW ═══════════ */}
      {managerTab === "renewals" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-[#071527]">Membership Expiry &amp; Renewal Tracker</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Audit accounts due for annual renewal or in grace period across all 7 membership tiers.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                {expiringOrExpiredMembers.length} Accounts Requiring Action
              </span>
            </div>
          </div>

          {ledgerLoading ? (
            <div className="p-4 space-y-2.5 bg-white border border-slate-200 rounded-2xl">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-slate-50 rounded-xl animate-pulse flex items-center px-4 justify-between">
                  <div className="w-24 h-3.5 bg-slate-200 rounded"></div>
                  <div className="w-36 h-3.5 bg-slate-200 rounded"></div>
                  <div className="w-20 h-3.5 bg-slate-200 rounded"></div>
                  <div className="w-24 h-3.5 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : expiringOrExpiredMembers.length === 0 ? (
            <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#071527]">All Memberships Up to Date</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No memberships are currently expired or due for renewal within the next 45 days. All cardholders are active and in good standing.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider font-extrabold">
                    <tr>
                      <th className="p-3.5 pl-5">Member ID</th>
                      <th className="p-3.5">Name</th>
                      <th className="p-3.5">Tier</th>
                      <th className="p-3.5">Valid Till</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Contact</th>
                      <th className="p-3.5 pr-5">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {expiringOrExpiredMembers.map((m) => (
                      <tr key={m.memberNo || m.id || m._id} className="hover:bg-slate-50/80 transition">
                        <td className="p-3.5 pl-5 font-mono text-orange-600 font-bold">{m.memberNo || m.id}</td>
                        <td className="p-3.5">
                          <div className="font-bold text-[#071527]">{m.name || m.fullName}</div>
                          <div className="text-[10px] text-slate-400">
                            {m.district}, {m.state}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${getBadgeCls(m.category)}`}>
                            {m.category}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono text-slate-700">
                          {m.validTill ? new Date(m.validTill).toLocaleDateString() : "–"}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              m.status === "Expired"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {m.status === "Expired" ? "Expired" : "Renewal Due"}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-500 font-mono text-[11px]">{m.phone || m.email || "–"}</td>
                        <td className="p-3.5 pr-5">
                          <button
                            onClick={() => toast.success(`Renewal reminder queued for ${m.name || m.fullName}`)}
                            className="px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-500 text-orange-700 hover:text-white text-[11px] font-bold border border-orange-200 transition cursor-pointer"
                          >
                            Send Notice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════ TAB 4: COMMUNITY DIRECTORY SPOTLIGHT ═══════════ */}
      {managerTab === "directory" && (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 animate-pulse">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100"></div>
                    <div className="w-16 h-4 bg-slate-100 rounded"></div>
                  </div>
                  <div className="w-3/4 h-4 bg-slate-100 rounded"></div>
                  <div className="w-1/2 h-3 bg-slate-100 rounded"></div>
                  <div className="w-full h-8 bg-slate-50 rounded"></div>
                </div>
              ))}
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
      )}

      {/* ═══════════ TAB 5: REGISTERED MEMBERS LEDGER ═══════════ */}
      {managerTab === "ledger" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 bg-white border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-orange-500 font-medium"
              >
                <option value="">All Categories ({members.length})</option>
                {dynamicCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.count})
                  </option>
                ))}
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-2 bg-white border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-orange-500 font-medium"
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
              <div className="p-4 space-y-2.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-12 bg-slate-50 rounded-xl animate-pulse flex items-center px-4 justify-between border border-slate-100"
                  >
                    <div className="w-20 h-3.5 bg-slate-200 rounded"></div>
                    <div className="w-32 h-3.5 bg-slate-200 rounded"></div>
                    <div className="w-16 h-3.5 bg-slate-200 rounded"></div>
                    <div className="w-16 h-3.5 bg-slate-200 rounded"></div>
                    <div className="w-24 h-3.5 bg-slate-200 rounded"></div>
                    <div className="w-20 h-3.5 bg-slate-200 rounded"></div>
                  </div>
                ))}
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
                      <th className="p-3.5">Directory Visibility</th>
                      <th className="p-3.5">Location</th>
                      <th className="p-3.5">Receipt &amp; Cert</th>
                      <th className="p-3.5">Contact</th>
                      <th className="p-3.5 pr-5">Valid Till</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {members.map((m) => (
                      <tr key={m.memberNo || m.id || m._id} className="hover:bg-slate-50/80 transition">
                        <td className="p-3.5 pl-5 font-mono text-orange-600 font-bold">{m.memberNo || m.id}</td>
                        <td className="p-3.5">
                          <div className="font-bold text-[#071527]">{m.name || m.fullName}</div>
                          {m.consentDisplay && (
                            <span className="text-[10px] text-slate-400 font-mono">
                              Pref: {m.consentDisplay}
                            </span>
                          )}
                        </td>
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
                        <td className="p-3.5">
                          <button
                            onClick={() => handleToggleLedgerConsent(m.memberNo || m.id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition cursor-pointer ${
                              m.isPublicConsent !== false
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                            }`}
                            title="Click to toggle live website visibility"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${m.isPublicConsent !== false ? "bg-emerald-500" : "bg-slate-400"}`}></span>
                            <span>{m.isPublicConsent !== false ? "Public on Web" : "Hidden"}</span>
                          </button>
                        </td>
                        <td className="p-3.5 text-slate-700">
                          {m.district}, {m.state}
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-slate-600">
                          <div>{m.receiptNo || "–"}</div>
                          <div className="text-[10px] text-slate-400 font-medium">
                            {m.certificateNo || `CERT-${m.memberNo || m.id}`}
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-500 font-mono">{m.phone || m.mobile || "Private"}</td>
                        <td className="p-3.5 pr-5 text-slate-500 font-mono">
                          {m.validTill ? new Date(m.validTill).toLocaleDateString() : "–"}
                        </td>
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
                              <p className="text-[10px] text-slate-500">Click or drag a new image to replace</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalFormData({ ...modalFormData, avatar: "" });
                              setAvatarPreview(null);
                            }}
                            className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <div className="w-9 h-9 mx-auto rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                            <Upload className="w-4 h-4" />
                          </div>
                          <div className="text-xs text-slate-700 font-bold">
                            {uploadingAvatar ? "Uploading to Cloudinary..." : "Click or drag & drop photo"}
                          </div>
                          <p className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 5MB</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        placeholder="https://... or upload photo"
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
