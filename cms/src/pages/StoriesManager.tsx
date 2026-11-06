import { useState, useEffect } from "react";
import { api } from "../services/api";
import {
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  Search,
  RefreshCw,
  Loader2,
  X,
  Save,
  UploadCloud,
  MapPin,
  Tag,
  Play,
} from "lucide-react";
import { toast } from "sonner";

export default function StoriesManager() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All Stories");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Education",
    personName: "",
    village: "",
    state: "Bihar",
    excerpt: "",
    fullStory: "",
    image: "",
    videoUrl: "",
    impactMetrics: "",
    featured: false,
    order: 0,
  });

  const loadStories = async (p = 1, force = false) => {
    setLoading(true);
    try {
      const res = await api.listStories(
        {
          page: p,
          limit: 10,
          category: selectedCategory === "All Stories" ? undefined : selectedCategory,
          search: searchQuery || undefined,
        },
        { force }
      );
      if (res.success && res.data) {
        setStories(res.data);
        setPage(res.pagination?.page || 1);
        setTotalPages(res.pagination?.pages || 1);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load success stories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories(page);
  }, [page, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadStories(1, true);
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: "Education",
      personName: "",
      village: "",
      state: "Bihar",
      excerpt: "",
      fullStory: "",
      image: "",
      videoUrl: "",
      impactMetrics: "Verified Community Impact\nDirect Beneficiary Support",
      featured: false,
      order: 0,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      category: item.category,
      personName: item.personName,
      village: item.village || "",
      state: item.state || "Bihar",
      excerpt: item.excerpt,
      fullStory: item.fullStory,
      image: item.image || "",
      videoUrl: item.videoUrl || "",
      impactMetrics: Array.isArray(item.impactMetrics)
        ? item.impactMetrics.join("\n")
        : item.impactMetrics || "",
      featured: Boolean(item.featured),
      order: item.order || 0,
    });
    setIsModalOpen(true);
  };

  // Upload image to Cloudflare R2
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const token = localStorage.getItem("islah_admin_token");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "islah/stories");

    try {
      const res = await fetch(`${API_BASE_URL}/upload/single`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (data.success && data.file?.url) {
        setFormData((prev) => ({ ...prev, image: data.file.url }));
        toast.success("Story photo uploaded to Cloudflare R2");
      } else {
        toast.error(data.message || "Failed to upload photo");
      }
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.personName || !formData.excerpt || !formData.fullStory) {
      toast.error("Please fill in all required fields");
      return;
    }

    const payload = {
      ...formData,
      impactMetrics: formData.impactMetrics.split("\n").map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        const res = await api.updateStory(editingId, payload);
        if (res.success) {
          toast.success("Success story updated successfully");
          setIsModalOpen(false);
          loadStories(page, true);
        } else {
          toast.error(res.message || "Failed to update story");
        }
      } else {
        const res = await api.createStory(payload);
        if (res.success) {
          toast.success("Success story published successfully");
          setIsModalOpen(false);
          loadStories(1, true);
        } else {
          toast.error(res.message || "Failed to publish");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Action failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this success story?")) return;
    try {
      const res = await api.deleteStory(id);
      if (res.success) {
        toast.success("Success story deleted");
        loadStories(page, true);
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
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>Success Stories Manager</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage beneficiary narratives displayed on /media/success-stories
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadStories(page, true)}
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
            <span>Add Success Story</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {["All Stories", "Education", "Healthcare", "Women Empowerment", "Livelihood", "Agriculture"].map((c) => (
            <button
              key={c}
              onClick={() => {
                setSelectedCategory(c);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedCategory === c
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stories..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </form>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="p-16 flex flex-col items-center justify-center text-slate-500 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <p className="text-xs">Loading success stories...</p>
        </div>
      ) : stories.length === 0 ? (
        <div className="p-16 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs">
          No success stories found. Click "Add Success Story" to publish one.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stories.map((item) => (
              <div
                key={item._id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{item.village ? `${item.village}, ${item.state}` : item.state}</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.personName}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-800"
                      />
                    )}
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                        {item.title}
                      </h3>
                      <div className="text-xs text-emerald-400 font-semibold mt-0.5">
                        Beneficiary: {item.personName}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2">
                    "{item.excerpt}"
                  </p>

                  {Array.isArray(item.impactMetrics) && item.impactMetrics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.impactMetrics.map((m: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-medium text-slate-300"
                        >
                          ✓ {m}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                    title="Edit Story"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition cursor-pointer"
                    title="Delete Story"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
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
                <Sparkles className="w-5 h-5 text-orange-500" />
                <span>{editingId ? "Edit Success Story" : "Publish New Success Story"}</span>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Story Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-orange-500"
                      placeholder="e.g. From a Dream to a Bright Future"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-orange-500"
                    >
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Women Empowerment">Women Empowerment</option>
                      <option value="Livelihood">Livelihood</option>
                      <option value="Agriculture">Agriculture</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Beneficiary Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.personName}
                      onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-orange-500"
                      placeholder="e.g. Anjali Kumari"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Village / District</label>
                    <input
                      type="text"
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-orange-500"
                      placeholder="Bathiya, Darbhanga"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-orange-500"
                      placeholder="Bihar"
                    />
                  </div>
                </div>

                {/* Story Photo */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="block text-slate-800 font-bold">
                    Beneficiary Photo (Stored in Cloudflare R2)
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none font-mono text-[11px]"
                      placeholder="https://pub-...r2.dev/islah/stories/photo.jpg"
                    />
                    <label className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold cursor-pointer transition shadow-sm">
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? "Uploading..." : "Upload Photo"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Short Excerpt (Card Summary) *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-orange-500"
                    placeholder="1-2 sentences summarizing the change in their life"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Detailed Story *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.fullStory}
                    onChange={(e) => setFormData({ ...formData, fullStory: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-orange-500"
                    placeholder="Complete narrative showing the background, intervention by IWF, and sustainable outcome..."
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Impact Metrics (one per line)</label>
                  <textarea
                    rows={2}
                    value={formData.impactMetrics}
                    onChange={(e) => setFormData({ ...formData, impactMetrics: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 outline-none focus:border-orange-500"
                    placeholder="Grade 10 Class Topper&#10;Full Merit Scholarship&#10;Aspiring Engineer"
                  />
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
                  disabled={uploadingImage}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold cursor-pointer shadow-md shadow-orange-500/25 transition disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Story</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

