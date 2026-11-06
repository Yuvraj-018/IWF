import { useState, useEffect } from "react";
import { api } from "../services/api";
import {
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  Download,
  Calendar,
  Search,
  RefreshCw,
  Loader2,
  X,
  Save,
  FileText,
  UploadCloud,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function PublicationsManager() {
  const [publications, setPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    type: "Research Papers",
    authors: "Islah Welfare Foundation Research Team",
    date: new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
    summary: "",
    coverUrl: "",
    downloadUrl: "",
    fileSize: "PDF",
    pages: "Document",
    featured: false,
    order: 0,
  });

  const loadPublications = async (p = 1, force = false) => {
    setLoading(true);
    try {
      const res = await api.listPublications(
        {
          page: p,
          limit: 10,
          type: selectedType === "All" ? undefined : selectedType,
          search: searchQuery || undefined,
        },
        { force }
      );
      if (res.success && res.data) {
        setPublications(res.data);
        setPage(res.pagination?.page || 1);
        setTotalPages(res.pagination?.pages || 1);
        setTotalCount(res.pagination?.total || 0);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load publications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPublications(page);
  }, [page, selectedType]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadPublications(1, true);
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      type: "Research Papers",
      authors: "Islah Welfare Foundation Research Team",
      date: new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
      summary: "",
      coverUrl: "",
      downloadUrl: "",
      fileSize: "PDF",
      pages: "Document",
      featured: false,
      order: 0,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      type: item.type,
      authors: item.authors || "",
      date: item.date || "",
      summary: item.summary || "",
      coverUrl: item.coverUrl || "",
      downloadUrl: item.downloadUrl || "",
      fileSize: item.fileSize || "PDF",
      pages: item.pages || "Document",
      featured: Boolean(item.featured),
      order: item.order || 0,
    });
    setIsModalOpen(true);
  };

  // Upload PDF Document to Cloudflare R2
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPdf(true);
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const token = localStorage.getItem("islah_admin_token");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "islah/publications");

    try {
      const res = await fetch(`${API_BASE_URL}/upload/single`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (data.success && data.file?.url) {
        setFormData((prev) => ({
          ...prev,
          downloadUrl: data.file.url,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        }));
        toast.success("Publication document uploaded to Cloudflare R2");
      } else {
        toast.error(data.message || "Failed to upload document");
      }
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploadingPdf(false);
    }
  };

  // Upload Cover Image
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const token = localStorage.getItem("islah_admin_token");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "islah/publications");

    try {
      const res = await fetch(`${API_BASE_URL}/upload/single`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (data.success && data.file?.url) {
        setFormData((prev) => ({ ...prev, coverUrl: data.file.url }));
        toast.success("Cover image uploaded");
      } else {
        toast.error(data.message || "Failed to upload cover image");
      }
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.downloadUrl) {
      toast.error("Title and document download URL are required");
      return;
    }

    try {
      if (editingId) {
        const res = await api.updatePublication(editingId, formData);
        if (res.success) {
          toast.success("Publication updated successfully");
          setIsModalOpen(false);
          loadPublications(page, true);
        } else {
          toast.error(res.message || "Failed to update publication");
        }
      } else {
        const res = await api.createPublication(formData);
        if (res.success) {
          toast.success("Publication published successfully");
          setIsModalOpen(false);
          loadPublications(1, true);
        } else {
          toast.error(res.message || "Failed to publish");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Action failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this publication?")) return;
    try {
      const res = await api.deletePublication(id);
      if (res.success) {
        toast.success("Publication deleted");
        loadPublications(page, true);
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
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>Publications &amp; Research Repository</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Unlimited uploads with Cloudflare R2 storage and live pagination ({totalCount} total)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadPublications(page, true)}
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
            <span>Upload Publication</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {["All", "Newsletters", "Research Papers", "Policy Briefs", "Annual Reports", "Other"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setSelectedType(t);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedType === t
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search publications..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </form>
      </div>

      {/* List */}
      {loading ? (
        <div className="p-16 flex flex-col items-center justify-center text-slate-500 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <p className="text-xs">Loading publications repository...</p>
        </div>
      ) : publications.length === 0 ? (
        <div className="p-16 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs">
          No publications found. Click "Upload Publication" to add reports, papers or newsletters.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {publications.map((pub) => (
              <div
                key={pub._id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {pub.type}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{pub.date}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                    {pub.title}
                  </h3>

                  <div className="text-xs text-slate-400 font-medium">
                    By {pub.authors}
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                    {pub.summary}
                  </p>

                  <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-400 font-mono">
                    <span>{pub.fileSize || "PDF"}</span>
                    <span>•</span>
                    <span>{pub.pages || "Document"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800">
                  <a
                    href={pub.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(pub)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(pub._id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full shadow-2xl my-auto max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-slate-200 shrink-0">
              <h3 className="text-base font-extrabold text-[#071527] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-500" />
                <span>{editingId ? "Edit Publication Details" : "Upload New Publication"}</span>
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
                  <label className="block text-slate-700 font-bold mb-1">Publication Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-orange-500"
                    placeholder="e.g. Annual Governance & Program Report 2024-25"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Type *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-orange-500"
                    >
                      <option value="Research Papers">Research Papers</option>
                      <option value="Newsletters">Newsletters</option>
                      <option value="Policy Briefs">Policy Briefs</option>
                      <option value="Annual Reports">Annual Reports</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Publication Date *</label>
                    <input
                      type="text"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-orange-500"
                      placeholder="e.g. October 2024 or October 15, 2024"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Authors / Directorate</label>
                    <input
                      type="text"
                      value={formData.authors}
                      onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-orange-500"
                      placeholder="Research & Monitoring Directorate"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Page Count / Size Label</label>
                    <input
                      type="text"
                      value={formData.pages}
                      onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-orange-500"
                      placeholder="e.g. 24 Pages"
                    />
                  </div>
                </div>

                {/* PDF Document Upload to Cloudflare R2 */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="block text-slate-800 font-bold">
                    PDF / Document File * (Stored in Cloudflare R2)
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <input
                      type="text"
                      required
                      value={formData.downloadUrl}
                      onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none font-mono text-[11px]"
                      placeholder="https://pub-...r2.dev/islah/publications/doc.pdf"
                    />
                    <label className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold cursor-pointer transition shadow-sm">
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>{uploadingPdf ? "Uploading..." : "Upload PDF"}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handlePdfUpload}
                        disabled={uploadingPdf}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Cover Image */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="block text-slate-800 font-bold">
                    Cover Image URL (Optional)
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <input
                      type="text"
                      value={formData.coverUrl}
                      onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none font-mono text-[11px]"
                      placeholder="https://pub-...r2.dev/islah/publications/cover.jpg"
                    />
                    <label className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold cursor-pointer transition shadow-sm">
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>{uploadingCover ? "Uploading..." : "Upload Cover"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        disabled={uploadingCover}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Executive Summary / Abstract *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-orange-500"
                    placeholder="Summary of research methodology, cluster findings, and key recommendations..."
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="featured-pub"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-orange-500 border-slate-300 focus:ring-orange-500"
                  />
                  <label htmlFor="featured-pub" className="text-slate-700 font-medium cursor-pointer">
                    Feature this publication on homepage / media hero
                  </label>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingPdf || uploadingCover}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold cursor-pointer shadow-md shadow-orange-500/25 transition disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Publication</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

