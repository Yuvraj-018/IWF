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
    if (!formData.title || !formData.lastDate || !formData.summary) {
      toast.error("Please fill in all required fields");
      return;
    }

    const payload = {
      ...formData,
      responsibilities: formData.responsibilities.split("\n").map((s) => s.trim()).filter(Boolean),
      eligibility: formData.eligibility.split("\n").map((s) => s.trim()).filter(Boolean),
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
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-400" />
            <span>Careers &amp; Job Openings</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage openings published on the public /careers page (paginated in lots of 6)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadCareers(page, true)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition cursor-pointer"
            title="Refresh"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-900/30 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Role</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-16 flex flex-col items-center justify-center text-slate-500 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <p className="text-xs">Loading career listings...</p>
        </div>
      ) : careers.length === 0 ? (
        <div className="p-16 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs">
          No career openings found. Click "Post New Role" to create one.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careers.map((c) => (
              <div
                key={c._id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {c.department}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        c.status === "Active"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                    {c.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {c.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {c.type} • {c.experience}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                    {c.summary}
                  </p>

                  <div className="pt-2 text-[11px] text-amber-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Apply before: {c.lastDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => openEditModal(c)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                    title="Edit Role"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.openingId || c._id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition cursor-pointer"
                    title="Delete Role"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>
              <span className="text-xs text-slate-400 px-2 font-mono">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl w-full max-w-2xl p-6 text-slate-100 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingId ? "Edit Career Opening" : "Post New Career Opening"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                    placeholder="e.g. Field Officer — Community Health"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Department *</label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                    placeholder="Programmes, Healthcare, M&E"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                    placeholder="Darbhanga, Bihar / Remote"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Employment Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Experience Band</label>
                  <select
                    value={formData.experienceBand}
                    onChange={(e) => setFormData({ ...formData, experienceBand: e.target.value, experience: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                  >
                    <option value="Fresher / Intern">Fresher / Intern</option>
                    <option value="1–2 Years">1–2 Years</option>
                    <option value="2–5 Years">2–5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Apply Before (Last Date) *</label>
                  <input
                    type="date"
                    required
                    value={formData.lastDate}
                    onChange={(e) => setFormData({ ...formData, lastDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Reports To</label>
                  <input
                    type="text"
                    value={formData.reportsTo}
                    onChange={(e) => setFormData({ ...formData, reportsTo: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Role Summary *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                  placeholder="Short 2-3 line overview of the role and key objective"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Key Responsibilities (one per line)</label>
                <textarea
                  rows={3}
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                  placeholder="Plan and coordinate education programmes&#10;Organise health camps"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Eligibility Criteria (one per line)</label>
                <textarea
                  rows={3}
                  value={formData.eligibility}
                  onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                  placeholder="Graduate in Social Work or related discipline&#10;Fluency in Hindi"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer shadow-lg shadow-emerald-900/30"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Role</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

