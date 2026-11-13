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
  FileCheck2,
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

  const openEditModal = (pub: any) => {
    setEditingId(pub._id);
    setFormData({
      title: pub.title,
      type: pub.type || "Research Papers",
      authors: pub.authors || "Islah Welfare Foundation Research Team",
      date: pub.date || "",
      summary: pub.summary || "",
      coverUrl: pub.coverUrl || "",
      downloadUrl: pub.downloadUrl || "",
      fileSize: pub.fileSize || "PDF",
      pages: pub.pages || "Document",
      featured: pub.featured || false,
      order: pub.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleUploadPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF document.");
      return;
    }

    setUploadingPdf(true);
    try {
      const res = await api.uploadSingleFile(file);
      if (res.success && res.file?.url) {
        const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
        setFormData((prev) => ({
          ...prev,
          downloadUrl: res.file!.url,
          fileSize: sizeStr,
        }));
        toast.success("PDF document uploaded successfully");
      } else {
        toast.error(res.message || "Upload failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file for the cover");
      return;
    }

    setUploadingCover(true);
    try {
      const res = await api.uploadSingleFile(file);
      if (res.success && res.file?.url) {
        setFormData((prev) => ({
          ...prev,
          coverUrl: res.file!.url,
        }));
        toast.success("Cover image uploaded");
      } else {
        toast.error(res.message || "Upload failed");
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
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      {/* ── TOP HEADER (CLEAN WHITE WITH NAVY BLUE AND BRAND ORANGE) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#f97316]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black text-[#071527] tracking-tight">
                Publications &amp; Research Repository
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Official documents, annual activity reports, newsletters, and policy dossiers ({totalCount} total)
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => loadPublications(page, true)}
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
            <span>Upload Publication</span>
          </button>
        </div>
      </div>

      {/* ── FILTERS & SEARCH (CLEAN WHITE WITH NAVY TABS) ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {["All", "Newsletters", "Research Papers", "Policy Briefs", "Annual Reports", "Other"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setSelectedType(t);
                setPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedType === t
                  ? "bg-[#071527] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#071527]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search publications..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-[#f97316] transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </form>
      </div>

      {/* ── PUBLICATIONS LIST (CLEAN WHITE CARDS WITH OFFICIAL PALETTE) ── */}
      {loading ? (
        <div className="p-16 flex flex-col items-center justify-center text-slate-500 gap-2 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="w-7 h-7 animate-spin text-[#f97316]" />
          <p className="text-xs font-semibold text-slate-600">Loading publications repository...</p>
        </div>
      ) : publications.length === 0 ? (
        <div className="p-16 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-xs shadow-xs">
          No publications found. Click "Upload Publication" to add reports, papers or newsletters.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {publications.map((pub) => (
              <div
                key={pub._id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#f97316]/50 transition flex flex-col justify-between gap-4 group shadow-xs"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-50 text-[#ea580c] border border-orange-200">
                      {pub.type}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{pub.date}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#071527] group-hover:text-[#f97316] transition">
                    {pub.title}
                  </h3>

                  <div className="text-xs text-slate-500 font-medium">
                    By {pub.authors}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {pub.summary}
                  </p>

                  <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400 font-mono">
                    <span className="font-semibold text-slate-600">{pub.fileSize || "PDF"}</span>
                    <span>•</span>
                    <span>{pub.pages || "Document"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                  <a
                    href={pub.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#071527] hover:bg-[#0c2444] text-white text-xs font-bold transition shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-[#f97316]" />
                    <span>Download PDF</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(pub)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(pub._id)}
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
                <BookOpen className="w-5 h-5 text-[#f97316]" />
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
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#f97316]"
                    placeholder="e.g. Annual Governance &amp; Program Report 2024-25"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Type *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#f97316]"
                    >
                      <option value="Research Papers">Research Papers</option>
                      <option value="Newsletters">Newsletters</option>
                      <option value="Policy Briefs">Policy Briefs</option>
                      <option value="Annual Reports">Annual Reports</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Publishing Date *</label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#f97316]"
                      placeholder="e.g. March 2024"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Author / Research Group</label>
                  <input
                    type="text"
                    value={formData.authors}
                    onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#f97316]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Summary / Abstract</label>
                  <textarea
                    rows={3}
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-[#f97316]"
                    placeholder="Brief description of the document or research methodology..."
                  />
                </div>

                {/* PDF File Upload */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-[#f97316]" />
                      <span>PDF Document File *</span>
                    </span>
                    {uploadingPdf && <span className="text-[11px] text-[#f97316] font-semibold">Uploading...</span>}
                  </div>

                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleUploadPdf}
                    className="w-full text-xs text-slate-600 cursor-pointer"
                  />

                  {formData.downloadUrl && (
                    <div className="text-[11px] text-emerald-700 font-mono flex items-center gap-1 truncate mt-1">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                      <span className="truncate">{formData.downloadUrl}</span>
                    </div>
                  )}
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
                  disabled={uploadingPdf || uploadingCover}
                  className="px-5 py-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white font-bold transition shadow-xs cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingId ? "Save Changes" : "Publish Document"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
