import { useState, useEffect } from "react";
import { api } from "../services/api";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Loader2,
  X,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Info,
  Layers,
  Play,
  FileText,
  Video,
  Camera,
  MapPin,
  Calendar,
  Eye,
  Tag,
  Upload,
  Link as LinkIcon,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export type MediaVariant = "photo" | "video" | "document";

// Complete System Slot Registry mapping all website dynamic media
export interface SystemSlot {
  key: string;
  section: "hero" | "causes" | "gallery" | "reports" | "people" | "videos";
  sectionTitle: string;
  slotLabel: string;
  mediaType: MediaVariant;
  defaultDescription: string;
  suggestedDimensions: string;
  defaultTags: string[];
}

export const SYSTEM_SLOTS: SystemSlot[] = [
  // ── 1. Homepage Hero Carousel (High-Resolution Banners) ──
  {
    key: "hero-slide-1",
    section: "hero",
    sectionTitle: "Homepage Hero Carousel",
    slotLabel: "Hero Slide 1",
    mediaType: "photo",
    defaultDescription: "Slide 1: Education for Every Child",
    suggestedDimensions: "1920x1080 (16:9 Landscape)",
    defaultTags: ["Education", "Hero Banner"],
  },
  {
    key: "hero-slide-2",
    section: "hero",
    sectionTitle: "Homepage Hero Carousel",
    slotLabel: "Hero Slide 2",
    mediaType: "photo",
    defaultDescription: "Slide 2: Building a Better India – Vision 2047",
    suggestedDimensions: "1920x1080 (16:9 Landscape)",
    defaultTags: ["Vision 2047", "Hero Banner"],
  },
  {
    key: "hero-slide-3",
    section: "hero",
    sectionTitle: "Homepage Hero Carousel",
    slotLabel: "Hero Slide 3",
    mediaType: "photo",
    defaultDescription: "Slide 3: Healthcare That Reaches the Last Mile",
    suggestedDimensions: "1920x1080 (16:9 Landscape)",
    defaultTags: ["Healthcare", "Hero Banner"],
  },
  {
    key: "hero-slide-4",
    section: "hero",
    sectionTitle: "Homepage Hero Carousel",
    slotLabel: "Hero Slide 4",
    mediaType: "photo",
    defaultDescription: "Slide 4: Skills Today, Success Tomorrow",
    suggestedDimensions: "1920x1080 (16:9 Landscape)",
    defaultTags: ["Livelihood", "Hero Banner"],
  },

  // ── 2. Thematic Program Pillars (Causes Cards on Homepage) ──
  {
    key: "cause-education",
    section: "causes",
    sectionTitle: "Program Pillars",
    slotLabel: "Pillar: Education",
    mediaType: "photo",
    defaultDescription: "Homepage card for Remedial Centers & Scholarships",
    suggestedDimensions: "800x600 (4:3)",
    defaultTags: ["Education", "Pillar"],
  },
  {
    key: "cause-medical",
    section: "causes",
    sectionTitle: "Program Pillars",
    slotLabel: "Pillar: Healthcare",
    mediaType: "photo",
    defaultDescription: "Homepage card for Health Camps & Emergency ICU Aid",
    suggestedDimensions: "800x600 (4:3)",
    defaultTags: ["Healthcare", "Pillar"],
  },
  {
    key: "cause-women",
    section: "causes",
    sectionTitle: "Program Pillars",
    slotLabel: "Pillar: Women Empowerment",
    mediaType: "photo",
    defaultDescription: "Homepage card for Stitching Centers & Micro-Livelihoods",
    suggestedDimensions: "800x600 (4:3)",
    defaultTags: ["Women Empowerment", "Pillar"],
  },
  {
    key: "cause-agriculture",
    section: "causes",
    sectionTitle: "Program Pillars",
    slotLabel: "Pillar: Rural Livelihoods",
    mediaType: "photo",
    defaultDescription: "Homepage card for Clean Water, Sanitation & Farming",
    suggestedDimensions: "800x600 (4:3)",
    defaultTags: ["Livelihood", "Pillar"],
  },
  {
    key: "cause-relief",
    section: "causes",
    sectionTitle: "Program Pillars",
    slotLabel: "Pillar: Disaster Relief",
    mediaType: "photo",
    defaultDescription: "Homepage card for Floods & Crisis Assistance",
    suggestedDimensions: "800x600 (4:3)",
    defaultTags: ["Disaster Relief", "Pillar"],
  },

  // ── 3. Homepage Gallery Showcase (Photos & Featured Reels) ──
  {
    key: "gallery-1",
    section: "gallery",
    sectionTitle: "Homepage Gallery",
    slotLabel: "Gallery Item 1",
    mediaType: "video",
    defaultDescription: "VISION ACADEMIC CITY (Video Reel / Campus Tour)",
    suggestedDimensions: "1920x1080 (Video + Poster)",
    defaultTags: ["Campus", "Video Tour"],
  },
  {
    key: "gallery-2",
    section: "gallery",
    sectionTitle: "Homepage Gallery",
    slotLabel: "Gallery Item 2",
    mediaType: "video",
    defaultDescription: "OPENING CEREMONY (Event Highlights Video)",
    suggestedDimensions: "1920x1080 (Video + Poster)",
    defaultTags: ["Ceremony", "Video"],
  },
  {
    key: "gallery-3",
    section: "gallery",
    sectionTitle: "Homepage Gallery",
    slotLabel: "Gallery Item 3",
    mediaType: "photo",
    defaultDescription: "HEALTH DIAGNOSTIC CAMP (Field Activity Photo)",
    suggestedDimensions: "1200x800",
    defaultTags: ["Healthcare", "Field Work"],
  },
  {
    key: "gallery-4",
    section: "gallery",
    sectionTitle: "Homepage Gallery",
    slotLabel: "Gallery Item 4",
    mediaType: "photo",
    defaultDescription: "ENVIRONMENT PLANTATION (Tree Plantation Drive)",
    suggestedDimensions: "1200x800",
    defaultTags: ["Environment", "Plantation"],
  },
  {
    key: "gallery-5",
    section: "gallery",
    sectionTitle: "Homepage Gallery",
    slotLabel: "Gallery Item 5",
    mediaType: "photo",
    defaultDescription: "SHIKSHA NA RUKE CAMPAIGN (Children Classroom Moments)",
    suggestedDimensions: "1200x800",
    defaultTags: ["Education", "Classroom"],
  },
  {
    key: "gallery-6",
    section: "gallery",
    sectionTitle: "Homepage Gallery",
    slotLabel: "Gallery Item 6",
    mediaType: "photo",
    defaultDescription: "VOCATIONAL TRAINING (Women Tailoring Center)",
    suggestedDimensions: "1200x800",
    defaultTags: ["Women Empowerment", "Vocational"],
  },

  // ── 4. Video Documentaries & Testimonials ──
  {
    key: "video-doc-1",
    section: "videos",
    sectionTitle: "Video Archive",
    slotLabel: "Education Impact Film",
    mediaType: "video",
    defaultDescription: "Empowering Rural Education — Full Ground Documentary",
    suggestedDimensions: "YouTube / MP4 Embed + Poster",
    defaultTags: ["Documentary", "Education", "Video"],
  },
  {
    key: "video-doc-2",
    section: "videos",
    sectionTitle: "Video Archive",
    slotLabel: "Livelihood Transformation Film",
    mediaType: "video",
    defaultDescription: "Transforming Rural Livelihoods — Beneficiary Stories",
    suggestedDimensions: "YouTube / MP4 Embed + Poster",
    defaultTags: ["Documentary", "Livelihood", "Video"],
  },

  // ── 5. Annual Reports & Official Publications (PDFs + Covers) ──
  {
    key: "report-2023-24",
    section: "reports",
    sectionTitle: "Reports & Publications",
    slotLabel: "Annual Report 2023-24",
    mediaType: "document",
    defaultDescription: "Annual Activity & Audited Financial Report 2023-2024",
    suggestedDimensions: "A4 Portrait Cover (PDF Document Link)",
    defaultTags: ["Annual Report", "Audited Financials", "PDF"],
  },
  {
    key: "report-2022-23",
    section: "reports",
    sectionTitle: "Reports & Publications",
    slotLabel: "Annual Report 2022-23",
    mediaType: "document",
    defaultDescription: "Annual Activity & Statutory Report 2022-2023",
    suggestedDimensions: "A4 Portrait Cover (PDF Document Link)",
    defaultTags: ["Annual Report", "PDF"],
  },
  {
    key: "publication-brochure",
    section: "reports",
    sectionTitle: "Reports & Publications",
    slotLabel: "Foundation Profile Brochure",
    mediaType: "document",
    defaultDescription: "Official Islah Welfare Foundation Institutional Brochure",
    suggestedDimensions: "PDF Document Link",
    defaultTags: ["Brochure", "Publication", "PDF"],
  },

  // ── 6. Leadership & People ──
  {
    key: "team-president",
    section: "people",
    sectionTitle: "Leadership & Team",
    slotLabel: "Founder & President",
    mediaType: "photo",
    defaultDescription: "Executive leadership portrait for Governance & About pages",
    suggestedDimensions: "1:1 Square or 3:4 Portrait",
    defaultTags: ["Leadership", "Founder"],
  },
  {
    key: "team-secretary",
    section: "people",
    sectionTitle: "Leadership & Team",
    slotLabel: "General Secretary",
    mediaType: "photo",
    defaultDescription: "Secretariat portrait for Governance & About pages",
    suggestedDimensions: "1:1 Square or 3:4 Portrait",
    defaultTags: ["Leadership", "Secretariat"],
  },
  {
    key: "donor-spotlight",
    section: "people",
    sectionTitle: "Leadership & Team",
    slotLabel: "Featured Benefactor",
    mediaType: "photo",
    defaultDescription: "Patron / Major Donors spotlight photo",
    suggestedDimensions: "1:1 Square or 3:4 Portrait",
    defaultTags: ["Donor", "Benefactor"],
  },
];

export default function MediaManager() {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "hero" | "causes" | "gallery" | "videos" | "reports" | "people" | "custom">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "photo" | "video" | "document">("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Upload file vs paste URL states
  const [inputMode, setInputMode] = useState<"file" | "url">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    key: "",
    title: "",
    category: "hero",
    mediaType: "photo" as MediaVariant,
    url: "",
    videoUrl: "",
    thumbnailUrl: "",
    altText: "",
    location: "Darbhanga, Bihar",
    date: "2026",
    tags: "" as string,
  });

  const loadMedia = (force = false) => {
    setLoading(true);
    api.listMedia(undefined, { force }).then((res) => {
      if (res.success && res.data) {
        setMediaList(res.data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadMedia(false);
  }, []);

  const mediaMap = mediaList.reduce<Record<string, any>>((acc, item) => {
    acc[item.key] = item;
    return acc;
  }, {});

  const openReplaceModal = (slot: SystemSlot) => {
    const existing = mediaMap[slot.key];
    setSelectedFile(null);
    setFilePreview(null);
    setInputMode(existing?.url ? "url" : "file");
    setFormData({
      key: slot.key,
      title: existing?.title || slot.defaultDescription,
      category: slot.section,
      mediaType: existing?.mediaType || slot.mediaType,
      url: existing?.url || "",
      videoUrl: existing?.videoUrl || "",
      thumbnailUrl: existing?.thumbnailUrl || "",
      altText: existing?.altText || slot.defaultDescription,
      location: existing?.location || "Darbhanga, Bihar",
      date: existing?.date || "2026",
      tags: existing?.tags ? existing.tags.join(", ") : slot.defaultTags.join(", "),
    });
    setModalOpen(true);
  };

  const openCustomModal = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setInputMode("file");
    setFormData({
      key: "",
      title: "",
      category: "general",
      mediaType: "photo",
      url: "",
      videoUrl: "",
      thumbnailUrl: "",
      altText: "",
      location: "Bihar, India",
      date: "2026",
      tags: "Field Work, General",
    });
    setModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleDelete = async (key: string) => {
    if (!confirm(`Are you sure you want to remove custom media for "${key}"? (Website will revert to bundled fallback)`)) return;
    try {
      const res = await api.deleteMedia(key);
      if (res.success) {
        toast.success(`Custom media for "${key}" removed. Default fallback restored.`);
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
    if (!formData.key.trim() || !formData.title.trim()) {
      toast.error("Please fill in placement key and title.");
      return;
    }

    if (formData.mediaType === "video" && !formData.videoUrl.trim() && !formData.url.trim() && !selectedFile) {
      toast.error("Please provide a Video URL or upload a video file.");
      return;
    }

    if (formData.mediaType !== "video" && !formData.url.trim() && !selectedFile) {
      toast.error("Please upload a file or provide an image/document URL.");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("key", formData.key.trim().toLowerCase());
      fd.append("title", formData.title.trim());
      fd.append("category", formData.category);
      fd.append("mediaType", formData.mediaType);

      // Attach file if selected, otherwise attach web URL
      if (selectedFile) {
        fd.append("file", selectedFile);
      } else if (formData.url.trim()) {
        fd.append("url", formData.url.trim());
      }

      if (formData.videoUrl) fd.append("videoUrl", formData.videoUrl.trim());
      if (formData.thumbnailUrl) fd.append("thumbnailUrl", formData.thumbnailUrl.trim());
      if (formData.altText) fd.append("altText", formData.altText.trim());
      if (formData.location) fd.append("location", formData.location.trim());
      if (formData.date) fd.append("date", formData.date.trim());
      if (formData.tags) fd.append("tags", formData.tags);

      const res = await api.uploadMedia(fd);
      if (res.success) {
        toast.success(`Target "${formData.key}" saved! Public website updated.`);
        setModalOpen(false);
        setSelectedFile(null);
        setFilePreview(null);
        loadMedia(true);
      } else {
        toast.error(res.message || "Failed to save media");
      }
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  // Filter slots based on active tab and type filter
  const displayedSlots = SYSTEM_SLOTS.filter((s) => {
    const matchesTab =
      activeTab === "all" ? true : activeTab === "custom" ? false : s.section === activeTab;
    const matchesType =
      typeFilter === "all" ? true : s.mediaType === typeFilter;
    return matchesTab && matchesType;
  });

  // Custom items that aren't in preset slots
  const customItems = mediaList.filter((m) => {
    const isCustom = !SYSTEM_SLOTS.some((s) => s.key === m.key);
    const matchesType = typeFilter === "all" ? true : m.mediaType === typeFilter;
    return isCustom && matchesType;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>Multi-Format Media Control Center</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              Direct File Upload &amp; Cloud Auto-Config
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Upload images, documents, and videos directly from your device or link web assets to live website slots.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => loadMedia(true)}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition cursor-pointer disabled:opacity-50"
            title="Bypass cache and sync live with MongoDB"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-emerald-400" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={openCustomModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-900/30 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Asset</span>
          </button>
        </div>
      </div>

      {/* Guide Card */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-0.5">Hands-Free Direct Upload System:</h4>
            <div className="text-slate-400 space-y-1">
              <p>• <strong className="text-slate-200">Drag &amp; Drop Upload:</strong> You don't need external links. Simply drop images, posters, or PDFs — the system stores and sets the URLs automatically.</p>
              <p>• <strong className="text-slate-200">Patient Photos:</strong> Uploaded directly under the <strong className="text-rose-400">"Patients"</strong> tab when creating or editing a medical aid case.</p>
              <p>• <strong className="text-slate-200">News &amp; Event Photos:</strong> Uploaded under the <strong className="text-emerald-400">"News &amp; Events"</strong> tab with each article.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Format & Section Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Section Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "all", label: "All Visual Slots", count: SYSTEM_SLOTS.length },
            { id: "hero", label: "Hero Banners", count: 4 },
            { id: "causes", label: "Program Pillars", count: 5 },
            { id: "gallery", label: "Homepage Gallery", count: 6 },
            { id: "videos", label: "Documentaries", count: 2 },
            { id: "reports", label: "Annual Reports & Pubs", count: 3 },
            { id: "people", label: "Leadership & Team", count: 3 },
            { id: "custom", label: "Custom Overrides", count: customItems.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-950"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Media Type Sub-Filter */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0 self-start sm:self-auto">
          {[
            { id: "all", label: "All Formats" },
            { id: "photo", label: "Photos", icon: Camera },
            { id: "video", label: "Videos", icon: Video },
            { id: "document", label: "PDFs", icon: FileText },
          ].map((type) => {
            const Icon = (type as any).icon;
            return (
              <button
                key={type.id}
                onClick={() => setTypeFilter(type.id as any)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  typeFilter === type.id
                    ? "bg-slate-800 text-white border border-slate-700"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {Icon && <Icon className="w-3 h-3" />}
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Slots Grid */}
      {loading ? (
        <div className="p-16 flex flex-col items-center justify-center text-slate-500 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <p className="text-xs">Loading media registry...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {displayedSlots.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedSlots.map((slot) => {
                const live = mediaMap[slot.key];
                const isVideo = slot.mediaType === "video" || live?.mediaType === "video";
                const isDoc = slot.mediaType === "document" || live?.mediaType === "document";

                return (
                  <div
                    key={slot.key}
                    className={`rounded-2xl border overflow-hidden flex flex-col justify-between group transition duration-300 ${
                      live
                        ? "bg-slate-900 border-slate-800 hover:border-emerald-500/50"
                        : "bg-slate-900/60 border-slate-800/80 border-dashed hover:border-slate-700"
                    }`}
                  >
                    <div>
                      {/* Media Preview Box */}
                      <div className="relative h-44 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                        {live?.url || live?.thumbnailUrl ? (
                          <>
                            <img
                              src={live.thumbnailUrl || live.url}
                              alt={live.altText || slot.defaultDescription}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />

                            {/* Video Play Overlay */}
                            {isVideo && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="w-11 h-11 rounded-full bg-orange-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                                  <Play className="w-5 h-5 fill-white ml-0.5" />
                                </div>
                              </div>
                            )}

                            {/* Document Overlay */}
                            {isDoc && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="px-3 py-1.5 rounded-xl bg-red-600/90 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg">
                                  <FileText className="w-4 h-4" />
                                  <span>Official PDF Document</span>
                                </div>
                              </div>
                            )}

                            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-sm flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" />
                                <span>Live Cloud Override</span>
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="p-6 text-center flex flex-col items-center justify-center text-slate-500">
                            {isVideo ? (
                              <Video className="w-8 h-8 mb-2 text-orange-400" />
                            ) : isDoc ? (
                              <FileText className="w-8 h-8 mb-2 text-red-400" />
                            ) : (
                              <ImageIcon className="w-8 h-8 mb-2 text-slate-600" />
                            )}
                            <p className="text-[11px] font-medium text-slate-400">Bundled Fallback Active</p>
                            <p className="text-[10px] text-slate-600 mt-0.5">{slot.suggestedDimensions}</p>
                          </div>
                        )}

                        {/* Format Badge */}
                        <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 backdrop-blur-sm">
                          {isVideo ? (
                            <>
                              <Video className="w-3 h-3 text-orange-400" />
                              <span>Video</span>
                            </>
                          ) : isDoc ? (
                            <>
                              <FileText className="w-3 h-3 text-red-400" />
                              <span>PDF Doc</span>
                            </>
                          ) : (
                            <>
                              <Camera className="w-3 h-3 text-emerald-400" />
                              <span>Photo</span>
                            </>
                          )}
                        </span>

                        <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 text-slate-300 text-[10px] font-mono backdrop-blur-sm">
                          {slot.key}
                        </span>
                      </div>

                      {/* Content Metadata */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                            {slot.sectionTitle}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white mb-1">{slot.slotLabel}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          {live?.title || slot.defaultDescription}
                        </p>

                        {/* Tags Preview */}
                        <div className="mt-3 flex flex-wrap gap-1">
                          {(live?.tags || slot.defaultTags).map((t: string) => (
                            <span
                              key={t}
                              className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-medium"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="p-4 pt-2 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => openReplaceModal(slot)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/20 text-xs font-bold transition cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{live ? "Replace Asset" : "Assign Live Asset"}</span>
                      </button>

                      <div className="flex items-center gap-1">
                        {live?.url && (
                          <>
                            <a
                              href={live.videoUrl || live.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
                              title={isVideo ? "Watch Video" : isDoc ? "View PDF" : "View Image"}
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => handleDelete(slot.key)}
                              title="Revert to bundled default image"
                              className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg transition cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Custom Uploaded Items */}
          {(activeTab === "all" || activeTab === "custom") && customItems.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-800">
              <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Custom Uploaded Assets ({customItems.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {customItems.map((item) => (
                  <div
                    key={item.key}
                    className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition"
                  >
                    <div>
                      <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                        <img
                          src={item.thumbnailUrl || item.url}
                          alt={item.altText || item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white backdrop-blur-sm">
                          {item.mediaType || "photo"}
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
                        href={item.videoUrl || item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <span>Open Asset</span>
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
            </div>
          )}
        </div>
      )}

      {/* Target Asset Assignment / Replacement Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
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
              {/* Media Type Selector */}
              <div>
                <label className="block text-slate-300 font-bold mb-1.5">Asset Format Type *</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "photo", label: "Photo / Banner", icon: Camera },
                    { id: "video", label: "Video Reel / Stream", icon: Video },
                    { id: "document", label: "PDF / Publication", icon: FileText },
                  ].map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setFormData({ ...formData, mediaType: t.id as any })}
                        className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                          formData.mediaType === t.id
                            ? "bg-emerald-600/20 border-emerald-500 text-emerald-400 font-bold"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px]">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Placement Slot Selector */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Website Target Placement Slot *
                </label>
                <select
                  value={formData.key}
                  onChange={(e) => {
                    const selectedSlot = SYSTEM_SLOTS.find((s) => s.key === e.target.value);
                    if (selectedSlot) {
                      setFormData({
                        ...formData,
                        key: selectedSlot.key,
                        category: selectedSlot.section,
                        mediaType: selectedSlot.mediaType,
                        title: selectedSlot.defaultDescription,
                        altText: selectedSlot.defaultDescription,
                        tags: selectedSlot.defaultTags.join(", "),
                      });
                    } else {
                      setFormData({ ...formData, key: e.target.value });
                    }
                  }}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono focus:border-emerald-500 outline-none"
                >
                  <option value="">-- Choose Target Website Slot --</option>
                  <optgroup label="🌟 Homepage Hero Carousel">
                    {SYSTEM_SLOTS.filter((s) => s.section === "hero").map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.slotLabel} ({s.key})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🏛️ Core Program Pillars (Causes)">
                    {SYSTEM_SLOTS.filter((s) => s.section === "causes").map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.slotLabel} ({s.key})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="📸 Homepage Gallery Showcase">
                    {SYSTEM_SLOTS.filter((s) => s.section === "gallery").map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.slotLabel} ({s.key})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🎥 Video Documentaries &amp; Reels">
                    {SYSTEM_SLOTS.filter((s) => s.section === "videos").map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.slotLabel} ({s.key})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="📄 Annual Reports &amp; Publications">
                    {SYSTEM_SLOTS.filter((s) => s.section === "reports").map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.slotLabel} ({s.key})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="👥 Leadership &amp; Team">
                    {SYSTEM_SLOTS.filter((s) => s.section === "people").map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.slotLabel} ({s.key})
                      </option>
                    ))}
                  </optgroup>
                  <option value="custom">✍️ Other / Custom Key</option>
                </select>
              </div>

              {/* Custom Key Input */}
              {(formData.key === "custom" || !SYSTEM_SLOTS.some((s) => s.key === formData.key)) && (
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Custom Identifier Key *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. partner-logo-1 or newsletter-2026-q1"
                    value={formData.key === "custom" ? "" : formData.key}
                    onChange={(e) => setFormData({ ...formData, key: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono focus:border-emerald-500 outline-none"
                  />
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">Title / Caption *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Primary School Digital Learning Center"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:border-emerald-500 outline-none"
                />
              </div>

              {/* Video URL (if video selected) */}
              {formData.mediaType === "video" && (
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Video Stream / Embed URL (YouTube or MP4) *</label>
                  <input
                    type="url"
                    required={!selectedFile}
                    placeholder="https://www.youtube.com/watch?v=... or https://.../video.mp4"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:border-emerald-500 outline-none"
                  />
                </div>
              )}

              {/* Dual Input Mode: Direct File Upload vs Paste Link */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-slate-300 font-bold">
                    {formData.mediaType === "video"
                      ? "Video Thumbnail Poster Image"
                      : formData.mediaType === "document"
                      ? "PDF / Document File *"
                      : "Image Asset *"}
                  </label>
                  <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setInputMode("file")}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition ${
                        inputMode === "file" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload File</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputMode("url")}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition ${
                        inputMode === "url" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <LinkIcon className="w-3 h-3" />
                      <span>Paste URL</span>
                    </button>
                  </div>
                </div>

                {inputMode === "file" ? (
                  <div className="relative border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl p-4 bg-slate-950 text-center transition group cursor-pointer">
                    <input
                      type="file"
                      accept={
                        formData.mediaType === "document"
                          ? ".pdf,.doc,.docx"
                          : formData.mediaType === "video"
                          ? "video/*,image/*"
                          : "image/*"
                      }
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    />

                    {selectedFile ? (
                      <div className="flex items-center justify-between gap-3 text-left">
                        <div className="flex items-center gap-3">
                          {filePreview ? (
                            <img src={filePreview} alt="Preview" className="w-14 h-14 object-cover rounded-xl border border-slate-800" />
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400">
                              <CheckCircle2 className="w-6 h-6" />
                            </div>
                          )}
                          <div>
                            <p className="text-white font-bold text-xs truncate max-w-[220px]">{selectedFile.name}</p>
                            <p className="text-[10px] text-slate-400">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to auto-configure</p>
                            <span className="text-[10px] text-emerald-400 font-semibold">Click to change file</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                            setFilePreview(null);
                          }}
                          className="p-1 text-slate-400 hover:text-red-400 rounded-lg z-20 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="py-3 flex flex-col items-center justify-center gap-1.5">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 group-hover:scale-110 transition">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-200">
                            Choose or drag &amp; drop file from device
                          </p>
                          <p className="text-[10px] text-slate-500">
                            System auto-uploads and binds the live URL automatically
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      placeholder={
                        formData.mediaType === "document"
                          ? "https://.../annual_report_2024.pdf"
                          : "https://images.unsplash.com/... or Cloudinary URL"
                      }
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:border-emerald-500 outline-none"
                    />

                    {formData.url && formData.mediaType !== "document" && (
                      <div className="mt-2.5 p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                        <img
                          src={formData.url}
                          alt="Preview"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=400&q=80";
                          }}
                          className="w-16 h-12 object-cover rounded-lg border border-slate-800"
                        />
                        <div className="text-[11px] text-slate-400">
                          <p className="text-white font-bold flex items-center gap-1">
                            <Eye className="w-3 h-3 text-emerald-400" />
                            <span>Live Web Preview</span>
                          </p>
                          <p className="text-[10px] text-slate-500">Asset will bind to "{formData.key}" on the live website</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Location & Year */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Field Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Darbhanga, Bihar"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:border-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Year / Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Oct 2026"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">Category Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Education, Field Work, Healthcare, Video"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:border-emerald-500 outline-none"
                />
              </div>

              {/* Submit Buttons */}
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
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>Save &amp; Update Live Site</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
