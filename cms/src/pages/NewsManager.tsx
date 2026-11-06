import { useState, useEffect } from "react";
import { api } from "../services/api";
import { getClientUrl } from "../services/config";
import {
  Plus,
  Trash2,
  Search,
  Calendar,
  Loader2,
  X,
  FileCheck,
  RefreshCw,
  Upload,
  Link as LinkIcon,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export default function NewsManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [photoMode, setPhotoMode] = useState<"file" | "url">("file");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "News & Updates",
    date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    image: "",
    excerpt: "",
    fullStory: "",
    location: "Darbhanga, Bihar",
    readTime: "3 min",
    author: "Media & Communications Desk",
    featured: false,
    isUpcoming: false,
  });

  const handleFileUpload = async (file: File) => {
    setUploadingPhoto(true);
    setPhotoPreview(URL.createObjectURL(file));
    try {
      const res = await api.uploadSingleFile(file);
      if (res.success && res.file?.url) {
        setFormData((prev) => ({ ...prev, image: res.file?.url || "" }));
        toast.success("Article cover image uploaded successfully!");
      } else {
        toast.error(res.message || "Failed to upload image");
      }
    } catch (err: any) {
      toast.error(err.message || "Upload error");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const loadData = (force = false) => {
    setLoading(true);
    api.listNews({ category: selectedCategory, search }, { force }).then((res) => {
      if (res.success && res.data) {
        setItems(res.data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData(false);
  }, [selectedCategory, search]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await api.deleteNews(id);
      if (res.success) {
        toast.success("News item deleted from database");
        setItems(items.filter((i) => i._id !== id));
      } else {
        toast.error(res.message || "Failed to delete item");
      }
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt || !formData.image) {
      toast.error("Please fill in title, image URL, and excerpt.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.createNews(formData);
      if (res.success) {
        toast.success("News story published successfully!");
        setModalOpen(false);
        setFormData({
          title: "",
          category: "News & Updates",
          date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          image: "",
          excerpt: "",
          fullStory: "",
          location: "Darbhanga, Bihar",
          readTime: "3 min",
          author: "Media & Communications Desk",
          featured: false,
          isUpcoming: false,
        });
        loadData();
      } else {
        toast.error(res.message || "Failed to create story");
      }
    } catch (err: any) {
      toast.error(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#071527]">News, Dispatches &amp; Events</h2>
          <p className="text-xs text-slate-500 mt-1">Manage public articles, press releases, and upcoming calendar items</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => loadData(true)}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 transition cursor-pointer disabled:opacity-50 shadow-2xs"
            title="Bypass cache and sync live with MongoDB"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-orange-500" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Story</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {["All", "News & Updates", "Events", "Press Releases", "Community Activities", "Programs", "Campaigns"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${selectedCategory === cat
                  ? "bg-orange-500 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/80"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search stories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Stories Table / Grid */}
      {loading ? (
        <div className="p-16 flex flex-col items-center justify-center text-slate-400 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
          <p className="text-xs">Loading records from MongoDB...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="p-16 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-xs shadow-2xs">
          No news stories found matching criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between group hover:border-orange-300 hover:shadow-md transition"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#071527] text-white shadow-sm">
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                    <span className="font-medium">{item.date}</span>
                    {item.featured && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700 font-bold text-[9px]">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-extrabold text-[#071527] line-clamp-2 mb-2 group-hover:text-orange-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-2.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                <a
                  href={`${getClientUrl()}/news/${item.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1 font-mono truncate max-w-[180px]"
                >
                  <span>/{item.slug}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
                <button
                  onClick={() => handleDelete(item._id, item.title)}
                  title="Delete from database"
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Publish Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full shadow-2xl my-auto max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Sticky Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-slate-200 shrink-0">
              <h3 className="text-base font-extrabold text-[#071527] flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-orange-500" />
                <span>Publish New Story or Event</span>
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Content */}
            <form onSubmit={handleCreate} className="flex flex-col flex-1 overflow-hidden min-h-0">
              <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs overscroll-contain">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Story Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Free Medical Camp at Bathiya — 200+ Patients Treated"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-orange-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-orange-500 outline-none"
                    >
                      {["News & Updates", "Events", "Press Releases", "Community Activities", "Programs", "Campaigns"].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Publish Date</label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>

                {/* Cover Image (Dual Mode: Direct File Upload or Paste URL) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-slate-700 font-bold">Cover Photo *</label>
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
                          if (file) handleFileUpload(file);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                      />

                      {formData.image || photoPreview ? (
                        <div className="flex items-center justify-between gap-3 text-left">
                          <div className="flex items-center gap-3">
                            <img
                              src={photoPreview || formData.image}
                              alt="Cover Preview"
                              className="w-14 h-14 object-cover rounded-xl border border-slate-200"
                            />
                            <div>
                              <p className="text-slate-900 font-bold text-xs truncate max-w-[220px]">
                                {uploadingPhoto ? "Uploading to Cloud..." : "Cover Photo Ready"}
                              </p>
                              <span className="text-[10px] text-orange-600 font-semibold">
                                {uploadingPhoto ? "Please wait..." : "Click to change photo"}
                              </span>
                            </div>
                          </div>
                          {uploadingPhoto ? (
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
                              Choose or drag &amp; drop cover image from device
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
                        type="url"
                        placeholder="https://images.unsplash.com/... or Cloudinary URL"
                        value={formData.image}
                        onChange={(e) => {
                          setFormData({ ...formData, image: e.target.value });
                          setPhotoPreview(e.target.value);
                        }}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-orange-500 outline-none"
                      />
                      {formData.image && (
                        <div className="mt-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-14 h-14 object-cover rounded-lg border border-slate-200"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=400&q=80";
                            }}
                          />
                          <div className="text-[11px] text-slate-600">
                            <p className="text-slate-900 font-bold">Image Preview</p>
                            <p className="text-[10px] text-slate-500 truncate max-w-[250px]">{formData.image}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Short Excerpt (Card summary) *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Brief 2-3 sentence overview..."
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Story Dispatch</label>
                  <textarea
                    rows={4}
                    placeholder="Full dispatch narrative and report..."
                    value={formData.fullStory}
                    onChange={(e) => setFormData({ ...formData, fullStory: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-orange-500 outline-none"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded accent-orange-500"
                    />
                    <span>Mark as Featured</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
                    <input
                      type="checkbox"
                      checked={formData.isUpcoming}
                      onChange={(e) => setFormData({ ...formData, isUpcoming: e.target.checked })}
                      className="rounded accent-orange-500"
                    />
                    <span>Display in Upcoming Events Widget</span>
                  </label>
                </div>
              </div>

              {/* Sticky Submit Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>Save to MongoDB</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

