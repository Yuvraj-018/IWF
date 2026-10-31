import { useState, useEffect } from "react";
import { api } from "../services/api";
import { Plus, Trash2, Image as ImageIcon, Loader2, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function MediaManager() {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    key: "",
    title: "",
    category: "hero",
    url: "",
    altText: "",
  });

  const loadMedia = () => {
    setLoading(true);
    api.listMedia(selectedCategory === "all" ? undefined : selectedCategory).then((res) => {
      if (res.success && res.data) {
        setMediaList(res.data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadMedia();
  }, [selectedCategory]);

  const handleDelete = async (key: string) => {
    if (!confirm(`Are you sure you want to remove media asset "${key}"?`)) return;
    try {
      const res = await api.deleteMedia(key);
      if (res.success) {
        toast.success(`Media "${key}" removed.`);
        setMediaList(mediaList.filter((m) => m.key !== key));
      } else {
        toast.error(res.message || "Failed to delete");
      }
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.key || !formData.title || !formData.url) {
      toast.error("Please fill in key, title, and image URL.");
      return;
    }

    setSubmitting(true);
    try {
      // Create FormData payload for /api/media
      const fd = new FormData();
      fd.append("key", formData.key.trim().toLowerCase());
      fd.append("title", formData.title.trim());
      fd.append("category", formData.category);
      fd.append("url", formData.url.trim());
      if (formData.altText) fd.append("altText", formData.altText.trim());

      const res = await api.uploadMedia(fd);
      if (res.success) {
        toast.success(`Media "${formData.key}" saved! Public site updated.`);
        setModalOpen(false);
        setFormData({ key: "", title: "", category: "hero", url: "", altText: "" });
        loadMedia();
      } else {
        toast.error(res.message || "Failed to save media");
      }
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  const PRESET_KEYS = [
    { key: "hero-slide-1", cat: "hero", label: "Homepage Hero Slide 1" },
    { key: "hero-slide-2", cat: "hero", label: "Homepage Hero Slide 2" },
    { key: "hero-slide-3", cat: "hero", label: "Homepage Hero Slide 3" },
    { key: "hero-slide-4", cat: "hero", label: "Homepage Hero Slide 4" },
    { key: "cause-education", cat: "causes", label: "Pillar: Education" },
    { key: "cause-medical", cat: "causes", label: "Pillar: Emergency Health" },
    { key: "cause-women", cat: "causes", label: "Pillar: Women Empowerment" },
    { key: "cause-agriculture", cat: "causes", label: "Pillar: Agriculture" },
    { key: "cause-relief", cat: "causes", label: "Pillar: Disaster Relief" },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Dynamic Media &amp; Banners</h2>
          <p className="text-xs text-slate-400 mt-1">Live image replacement for homepage carousel, thematic pillars, and gallery</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-900/30 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add / Replace Asset</span>
        </button>
      </div>

      {/* Category filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {["all", "hero", "causes", "gallery", "patients", "partners"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition cursor-pointer ${
              selectedCategory === cat
                ? "bg-emerald-600 text-white"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Media Assets */}
      {loading ? (
        <div className="p-16 flex flex-col items-center justify-center text-slate-500 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <p className="text-xs">Loading media assets...</p>
        </div>
      ) : mediaList.length === 0 ? (
        <div className="p-16 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs">
          No media records found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mediaList.map((item) => (
            <div
              key={item.key}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                  <img src={item.url} alt={item.altText || item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold mb-2">
                    {item.key}
                  </span>
                  <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-400 truncate">{item.altText || "No caption"}</p>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Image</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => handleDelete(item.key)}
                  title="Remove from CMS"
                  className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Replace Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-emerald-400" />
                <span>Assign / Replace Dynamic Asset</span>
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Asset Key (Used by frontend) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. hero-slide-1 or cause-education"
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono focus:border-emerald-500 outline-none"
                />
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="text-[10px] text-slate-500 mr-1 self-center">Presets:</span>
                  {PRESET_KEYS.map((p) => (
                    <button
                      type="button"
                      key={p.key}
                      onClick={() => setFormData({ ...formData, key: p.key, category: p.cat, title: p.label })}
                      className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-mono cursor-pointer"
                    >
                      {p.key}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Education for Every Child"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:border-emerald-500 outline-none"
                >
                  {["hero", "causes", "gallery", "patients", "partners"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">High-Res Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/... or Cloudinary URL"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Alt Text (Accessibility &amp; SEO)</label>
                <input
                  type="text"
                  placeholder="Describe image content..."
                  value={formData.altText}
                  onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>Save Media</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

