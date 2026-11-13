import { useState, useEffect } from "react";
import { api } from "../services/api";
import {
  Briefcase,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  MapPin,
  Clock,
  RefreshCw,
  Loader2,
  X,
  Save,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function CareersManager() {
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    department: "Programmes",
    location: "Darbhanga, Bihar",
    type: "Full-Time",
    experience: "2–5 Years",
    experienceBand: "2–5 Years",
    lastDate: "",
    reportsTo: "Programme Manager",
    icon: "programme",
    summary: "",
    responsibilities: "",
    eligibility: "",
    status: "Active",
  });

  const loadCareers = async (p = 1, force = false) => {
    setLoading(true);
    try {
      const res = await api.listCareers({ page: p, limit: 6, all: true }, { force });
      if (res.success && res.data) {
        setCareers(res.data);
        setPage(res.pagination?.page || 1);
        setTotalPages(res.pagination?.pages || 1);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load careers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCareers(page);
  }, [page]);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      department: "Programmes",
      location: "Darbhanga, Bihar",
      type: "Full-Time",
      experience: "2–5 Years",
      experienceBand: "2–5 Years",
      lastDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      reportsTo: "Programme Manager",
      icon: "programme",
      summary: "",
      responsibilities: "",
      eligibility: "",
      status: "Active",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.openingId || item._id);
    setFormData({
      title: item.title,
      department: item.department,
      location: item.location,
      type: item.type,
      experience: item.experience,
      experienceBand: item.experienceBand,
      lastDate: item.lastDate,
      reportsTo: item.reportsTo || "Programme Manager",
      icon: item.icon || "programme",
      summary: item.summary,
      responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities.join("\n") : "",
      eligibility: Array.isArray(item.eligibility) ? item.eligibility.join("\n") : "",
      status: item.status || "Active",
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.summary) {
      toast.error("Role title and summary are required");
      return;
    }

    const payload = {
      ...formData,
      responsibilities: formData.responsibilities
        ? formData.responsibilities.split("\n").filter((l) => l.trim())
        : [],
      eligibility: formData.eligibility
        ? formData.eligibility.split("\n").filter((l) => l.trim())
        : [],
    };

    try {
      if (editingId) {
        const res = await api.updateCareer(editingId, payload);
        if (res.success) {
          toast.success("Career opening updated successfully");
          setIsModalOpen(false);
          loadCareers(page, true);
        } else {
          toast.error(res.message || "Failed to update");
        }
      } else {
        const res = await api.createCareer(payload);
        if (res.success) {
          toast.success("Career opening created successfully");
          setIsModalOpen(false);
          loadCareers(1, true);
        } else {
          toast.error(res.message || "Failed to create");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Action failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this career opening?")) return;
    try {
      const res = await api.deleteCareer(id);
      if (res.success) {
        toast.success("Career opening deleted");
        loadCareers(page, true);
      } else {
        toast.error(res.message || "Failed to delete");
      }
    } catch (err: any) {
      toast.error(err.message || "Deletion failed");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      {/* ── TOP HEADER (CLEAN WHITE WITH NAVY BLUE AND BRAND ORANGE) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#f97316]">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black text-[#071527] tracking-tight">
                Careers &amp; Job Openings
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage positions and openings published on the public careers portal
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => loadCareers(page, true)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 transition cursor-pointer shadow-xs disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#f97316]" : "text-slate-500"}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Role</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-16 flex flex-col items-center justify-center text-slate-500 gap-2 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="w-7 h-7 animate-spin text-[#f97316]" />
          <p className="text-xs font-semibold text-slate-600">Loading career listings...</p>
        </div>
      ) : careers.length === 0 ? (
        <div className="p-16 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-xs shadow-xs">
          No career openings found. Click "Post New Role" to create one.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careers.map((c) => (
              <div
                key={c._id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#f97316]/50 transition flex flex-col justify-between gap-4 group shadow-xs"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-50 text-[#ea580c] border border-orange-200">
                      {c.department}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        c.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#071527] group-hover:text-[#f97316] transition">
                    {c.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {c.summary}
                  </p>

                  <div className="flex items-center gap-4 pt-1 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{c.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{c.type}</span>
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <span>Exp: {c.experience}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Last Date: {c.lastDate || "Open until filled"}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(c)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.openingId || c._id)}
                      className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer shadow-xs"
              >
                Previous
              </button>
              <span className="text-xs text-slate-600 px-2 font-mono font-semibold">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer shadow-xs"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── ADD / EDIT MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full shadow-2xl my-auto max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-slate-200 shrink-0">
              <h3 className="text-base font-extrabold text-[#071527] flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#f97316]" />
                <span>{editingId ? "Edit Career Opportunity" : "Post New Role"}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden min-h-0">
              <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs overscroll-contain">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#f97316]"
                    placeholder="e.g. Senior Programme Coordinator (Healthcare)"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Department *</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#f97316]"
                    >
                      <option value="Programmes">Programmes</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Finance">Finance</option>
                      <option value="Administration">Administration</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Location *</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#f97316]"
                      placeholder="e.g. Darbhanga, Bihar"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Job Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#f97316]"
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Experience Required</label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#f97316]"
                      placeholder="e.g. 2–5 Years"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Application Deadline</label>
                    <input
                      type="date"
                      value={formData.lastDate}
                      onChange={(e) => setFormData({ ...formData, lastDate: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#f97316]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Role Summary *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#f97316]"
                    placeholder="Brief overview of key responsibilities and mission alignment..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 p-5 sm:p-6 pt-3 border-t border-slate-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white font-bold transition shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingId ? "Save Changes" : "Post Opportunity"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
