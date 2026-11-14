import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { formatKolkataTime } from "../../services/httpClient";
import {
  Users,
  Search,
  Mail,
  MapPin,
  Briefcase,
  Smartphone,
  CheckCircle2,
  XCircle,
  Loader2,
  RotateCcw,
  Shield,
  Layers,
} from "lucide-react";
import { toast } from "sonner";

export default function StaffDirectoryManager() {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const loadDirectory = async () => {
    setLoading(true);
    try {
      const res = await api.listStaff({
        limit: 100,
        search: search.trim() || undefined,
        role: roleFilter !== "all" ? roleFilter : undefined,
      });

      if (res.success && Array.isArray(res.data)) {
        setStaffList(res.data);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load staff directory.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDirectory();
  }, [roleFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadDirectory();
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Staff Directory</span>
            <span className="w-2 h-2 rounded-full bg-orange-500" />
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational personnel and administrative leadership profiles across the foundation.
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <form onSubmit={handleSearch} className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search staff by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </form>

        <div className="flex items-center gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none"
          >
            <option value="all">All Role Assignments</option>
            <option value="super_admin">Super Admins</option>
            <option value="programme_manager">Programme Managers</option>
            <option value="finance_entry">Finance Officers</option>
            <option value="finance_approver">Finance Approvers</option>
            <option value="content_editor">Content Editors</option>
            <option value="community_admin">Community Admins</option>
          </select>

          <button
            onClick={loadDirectory}
            className="p-2 text-slate-500 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition cursor-pointer"
            title="Refresh Directory"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of Staff Directory Cards */}
      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center text-slate-400 gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          <p className="text-xs font-mono">Loading staff directory...</p>
        </div>
      ) : staffList.length === 0 ? (
        <div className="py-20 text-center text-slate-400 bg-white rounded-xl border border-slate-200">
          <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="font-bold text-slate-700">No staff members found</p>
          <p className="text-xs text-slate-400 mt-1">Try searching by a different name or role.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staffList.map((member) => (
            <div
              key={member._id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#071527] text-white flex items-center justify-center font-bold text-sm shrink-0 border border-[#16365f]">
                      {member.name ? member.name.slice(0, 2).toUpperCase() : "ST"}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{member.name}</h3>
                      <p className="text-xs text-slate-500 font-mono truncate">{member.email}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      member.isActive
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}
                  >
                    {member.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Roles */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Assigned Roles
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {member.roles?.map((r: string) => (
                      <span
                        key={r}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {r.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Operational Scope */}
                <div className="mt-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Work Areas
                  </span>
                  {member.scope?.workAreas && member.scope.workAreas.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {member.scope.workAreas.map((w: string) => (
                        <span key={w} className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200">
                          {w}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      {member.roles?.includes("super_admin") ? "Unrestricted All Areas" : "None"}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer info */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 font-mono">
                  <Smartphone className="w-3 h-3 text-slate-400" />
                  <span>2FA: {member.twoFactorEnabled ? "Active" : "Disabled"}</span>
                </span>
                <span>Active since {member.createdAt ? new Date(member.createdAt).getFullYear() : "2025"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
