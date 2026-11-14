import { useState, useEffect } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
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

export const isDocumentAsset = (item: any) => {
  if (!item) return false;
  const type = String(item.mediaType || "").toLowerCase();
  const url = String(item.url || item.thumbnailUrl || "").toLowerCase();
  const key = String(item.key || "").toLowerCase();
  const title = String(item.title || "").toLowerCase();
  const alt = String(item.altText || "").toLowerCase();
  return (
    type === "document" ||
    type === "pdf" ||
    url.endsWith(".pdf") ||
    url.includes(".pdf?") ||
    url.endsWith(".doc") ||
    url.endsWith(".docx") ||
    url.includes(".doc?") ||
    key.includes("brochure") ||
    key.includes("report") ||
    key.includes("policy") ||
    key.includes("dossier") ||
    key.includes("pdf") ||
    title.includes("brochure") ||
    title.includes("pdf") ||
    title.includes("document") ||
    alt.includes("pdf") ||
    alt.includes("brochure") ||
    alt.includes("document")
  );
};

export function DocumentPreviewBadge({ title, url }: { title?: string; url?: string }) {
  const fileName = url ? url.split("/").pop()?.split("?")[0] : "";
  const isPdf = !url || url.toLowerCase().includes(".pdf") || (title && title.toLowerCase().includes("pdf"));
  return (
    <div className="flex flex-col items-center justify-center p-5 w-full h-full text-center bg-gradient-to-br from-red-50 via-slate-50 to-orange-50 select-none group-hover:scale-105 transition duration-500">
      <div className="w-16 h-16 rounded-2xl bg-red-100/90 border border-red-200 text-red-600 flex items-center justify-center shadow-xs">
        <FileText className="w-8 h-8 text-red-600" />
      </div>
      <span className="mt-3 text-xs font-black text-slate-800 tracking-tight flex items-center gap-1.5">
        <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-mono text-[9px] font-black uppercase tracking-wider">
          {isPdf ? "PDF" : "DOC"}
        </span>
        <span className="truncate max-w-[180px]">{title || "Official Document"}</span>
      </span>
      {fileName && (
        <span className="text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-[200px]" title={fileName}>
          {fileName}
        </span>
      )}
    </div>
  );
}

// Complete System Slot Registry mapping all website dynamic media
export interface SystemSlot {
  key: string;
  section: "hero" | "causes" | "gallery" | "reports" | "people" | "videos" | "media";
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

  // ── 7. Media Hub Section Cards (/media page) ──
  {
    key: "media-section-outcomes",
    section: "media",
    sectionTitle: "Media Hub Section Cards",
    slotLabel: "Outcomes & Impact Card",
    mediaType: "photo",
    defaultDescription: "Cover image for Outcomes & Impact on /media",
    suggestedDimensions: "800x600 (4:3)",
    defaultTags: ["Media Hub", "Outcomes"],
  },
  {
    key: "media-section-stories",
    section: "media",
    sectionTitle: "Media Hub Section Cards",
    slotLabel: "Success Stories Card",
    mediaType: "photo",
    defaultDescription: "Cover image for Success Stories on /media",
    suggestedDimensions: "800x600 (4:3)",
    defaultTags: ["Media Hub", "Success Stories"],
  },
  {
    key: "media-section-news",
    section: "media",
    sectionTitle: "Media Hub Section Cards",
    slotLabel: "News & Events Card",
    mediaType: "photo",
    defaultDescription: "Cover image for News & Events on /media",
    suggestedDimensions: "800x600 (4:3)",
    defaultTags: ["Media Hub", "News"],
  },
  {
    key: "media-section-reports",
    section: "media",
    sectionTitle: "Media Hub Section Cards",
    slotLabel: "Annual Reports Card",
    mediaType: "photo",
    defaultDescription: "Cover image for Annual Reports on /media",
    suggestedDimensions: "800x600 (4:3)",
    defaultTags: ["Media Hub", "Annual Reports"],
  },
  {
    key: "media-section-publications",
    section: "media",
    sectionTitle: "Media Hub Section Cards",
    slotLabel: "Publications & Research Card",
    mediaType: "photo",
    defaultDescription: "Cover image for Publications & Research on /media",
    suggestedDimensions: "800x600 (4:3)",
    defaultTags: ["Media Hub", "Publications"],
  },
  {
    key: "media-section-gallery",
    section: "media",
    sectionTitle: "Media Hub Section Cards",
    slotLabel: "Photo & Video Gallery Card",
    mediaType: "photo",
    defaultDescription: "Cover image for Gallery on /media",
    suggestedDimensions: "800x600 (4:3)",
    defaultTags: ["Media Hub", "Gallery"],
  },

  // ── 8. Outcomes & Impact Focus Area Cards (/media/outcomes) ──
  {
    key: "media-outcomes-hero",
    section: "media",
    sectionTitle: "Outcomes & Impact (/media/outcomes)",
    slotLabel: "Outcomes Hero Banner",
    mediaType: "photo",
    defaultDescription: "Hero background banner on /media/outcomes",
    suggestedDimensions: "1920x600 (16:5)",
    defaultTags: ["Outcomes", "Hero"],
  },
  {
    key: "media-outcome-edu",
    section: "media",
    sectionTitle: "Outcomes & Impact (/media/outcomes)",
    slotLabel: "Education & Child Development Card",
    mediaType: "photo",
    defaultDescription: "Cover for Education focus pillar on /media/outcomes",
    suggestedDimensions: "600x400 (3:2)",
    defaultTags: ["Outcomes", "Education"],
  },
  {
    key: "media-outcome-health",
    section: "media",
    sectionTitle: "Outcomes & Impact (/media/outcomes)",
    slotLabel: "Healthcare & Wellness Card",
    mediaType: "photo",
    defaultDescription: "Cover for Healthcare focus pillar on /media/outcomes",
    suggestedDimensions: "600x400 (3:2)",
    defaultTags: ["Outcomes", "Healthcare"],
  },
  {
    key: "media-outcome-women",
    section: "media",
    sectionTitle: "Outcomes & Impact (/media/outcomes)",
    slotLabel: "Women Empowerment Card",
    mediaType: "photo",
    defaultDescription: "Cover for Women Empowerment pillar on /media/outcomes",
    suggestedDimensions: "600x400 (3:2)",
    defaultTags: ["Outcomes", "Women"],
  },
  {
    key: "media-outcome-skills",
    section: "media",
    sectionTitle: "Outcomes & Impact (/media/outcomes)",
    slotLabel: "Skill Development & Livelihood Card",
    mediaType: "photo",
    defaultDescription: "Cover for Skills & Livelihood pillar on /media/outcomes",
    suggestedDimensions: "600x400 (3:2)",
    defaultTags: ["Outcomes", "Skills"],
  },
  {
    key: "media-outcome-agri",
    section: "media",
    sectionTitle: "Outcomes & Impact (/media/outcomes)",
    slotLabel: "Agriculture & Livelihood Card",
    mediaType: "photo",
    defaultDescription: "Cover for Agriculture focus pillar on /media/outcomes",
    suggestedDimensions: "600x400 (3:2)",
    defaultTags: ["Outcomes", "Agriculture"],
  },
  {
    key: "media-outcome-env",
    section: "media",
    sectionTitle: "Outcomes & Impact (/media/outcomes)",
    slotLabel: "Environment Conservation Card",
    mediaType: "photo",
    defaultDescription: "Cover for Environment Conservation pillar on /media/outcomes",
    suggestedDimensions: "600x400 (3:2)",
    defaultTags: ["Outcomes", "Environment"],
  },
  {
    key: "media-outcome-comm",
    section: "media",
    sectionTitle: "Outcomes & Impact (/media/outcomes)",
    slotLabel: "Community Development Card",
    mediaType: "photo",
    defaultDescription: "Cover for Community Development pillar on /media/outcomes",
    suggestedDimensions: "600x400 (3:2)",
    defaultTags: ["Outcomes", "Community"],
  },
];

export default function MediaManager() {
  const { can } = useAuth();
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "hero" | "causes" | "gallery" | "videos" | "reports" | "people" | "media" | "custom">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "photo" | "video" | "document">("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Upload file vs paste URL states
  const [inputMode, setInputMode] = useState<"file" | "url">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const [albums, setAlbums] = useState<any[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<any | null>(null);
  const [albumManageModalOpen, setAlbumManageModalOpen] = useState(false);
  const [newAlbumModalOpen, setNewAlbumModalOpen] = useState(false);
  const [newAlbumData, setNewAlbumData] = useState({
    title: "",
    category: "gallery",
    location: "Darbhanga, Bihar",
    date: "2026",
  });
  const [newAlbumCoverFile, setNewAlbumCoverFile] = useState<File | null>(null);
  const [newAlbumCoverUrl, setNewAlbumCoverUrl] = useState("");

  const [albumItemFile, setAlbumItemFile] = useState<File | null>(null);
  const [albumItemData, setAlbumItemData] = useState({
    title: "",
    caption: "",
    url: "",
    videoUrl: "",
    mediaType: "photo" as MediaVariant,
    isCover: false,
  });

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
    order: 0,
    subHeading: "",
    ctaLink: "",
  });

  const loadMedia = (force = false) => {
    setLoading(true);
    Promise.all([
      api.listMedia(undefined, { force }),
      api.listAlbums({ force }),
    ]).then(([mediaRes, albumRes]) => {
      if (mediaRes.success && mediaRes.data) {
        setMediaList(mediaRes.data);
      }
      if (albumRes.success && albumRes.data) {
        setAlbums(albumRes.data);
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
      order: existing?.order || 0,
      subHeading: existing?.subHeading || "",
      ctaLink: existing?.ctaLink || "",
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
      order: 0,
      subHeading: "",
      ctaLink: "",
    });
    setModalOpen(true);
  };

  const openNewItemModal = (section: string) => {
    setSelectedFile(null);
    setFilePreview(null);
    setInputMode("file");
    const prefix =
      section === "hero"
        ? "hero-slide"
        : section === "gallery"
        ? "gallery"
        : section === "causes"
        ? "cause"
        : section === "videos"
        ? "video"
        : section === "reports"
        ? "report"
        : section === "people"
        ? "person"
        : "asset";
    const uniqueKey = `${prefix}-${Date.now()}`;
    const count = mediaList.filter((m) => m.category === section).length;
    const mediaType =
      section === "videos" ? "video" : section === "reports" ? "document" : "photo";

    setFormData({
      key: uniqueKey,
      category: section as any,
      mediaType,
      title: section === "hero" ? `Hero Slide #${count + 1}` : "",
      subHeading: "",
      ctaLink: section === "hero" ? "/donate" : "",
      url: "",
      videoUrl: "",
      thumbnailUrl: "",
      altText: "",
      location: "Darbhanga, Bihar",
      date: "2026",
      tags: section === "hero" ? "Hero Banner" : section,
      order: count + 1,
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
      if (formData.order !== undefined) fd.append("order", String(formData.order));
      if (formData.subHeading) fd.append("subHeading", formData.subHeading.trim());
      if (formData.ctaLink) fd.append("ctaLink", formData.ctaLink.trim());

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

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbumData.title.trim()) {
      toast.error("Please enter an Album / Section title.");
      return;
    }
    if (!newAlbumCoverFile && !newAlbumCoverUrl.trim()) {
      toast.error("Please upload or enter a cover image URL for this album.");
      return;
    }

    setSubmitting(true);
    try {
      const albumId = newAlbumData.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const fd = new FormData();
      fd.append("key", `gallery-${albumId}-cover`);
      fd.append("title", newAlbumData.title.trim());
      fd.append("category", "gallery");
      fd.append("albumId", albumId);
      fd.append("albumTitle", newAlbumData.title.trim());
      fd.append("mediaType", "photo");
      fd.append("isCover", "true");
      fd.append("location", newAlbumData.location.trim());
      fd.append("date", newAlbumData.date.trim());

      if (newAlbumCoverFile) {
        fd.append("file", newAlbumCoverFile);
      } else {
        fd.append("url", newAlbumCoverUrl.trim());
      }

      const res = await api.uploadMedia(fd);
      if (res.success) {
        toast.success(`Album "${newAlbumData.title}" created successfully!`);
        setNewAlbumModalOpen(false);
        setNewAlbumCoverFile(null);
        setNewAlbumCoverUrl("");
        setNewAlbumData({ title: "", category: "gallery", location: "Darbhanga, Bihar", date: "2026" });
        loadMedia(true);
      } else {
        toast.error(res.message || "Failed to create album");
      }
    } catch (err: any) {
      toast.error(err.message || "Album creation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUploadToAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlbum) return;

    if (albumItemData.mediaType === "video" && !albumItemData.videoUrl.trim() && !albumItemData.url.trim()) {
      toast.error("Please provide a Video URL.");
      return;
    }
    if (albumItemData.mediaType === "photo" && !albumItemFile && !albumItemData.url.trim()) {
      toast.error("Please upload an image file or provide an image URL.");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      const uniqueKey = `gallery-${selectedAlbum.albumId}-${Date.now().toString().slice(-6)}`;
      fd.append("key", uniqueKey);
      fd.append("title", albumItemData.title.trim() || selectedAlbum.albumTitle);
      fd.append("category", "gallery");
      fd.append("albumId", selectedAlbum.albumId);
      fd.append("albumTitle", selectedAlbum.albumTitle);
      fd.append("mediaType", albumItemData.mediaType);
      if (albumItemData.caption.trim()) fd.append("caption", albumItemData.caption.trim());
      if (albumItemData.isCover) fd.append("isCover", "true");

      if (albumItemFile) {
        fd.append("file", albumItemFile);
      } else if (albumItemData.url.trim()) {
        fd.append("url", albumItemData.url.trim());
      }
      if (albumItemData.videoUrl.trim()) fd.append("videoUrl", albumItemData.videoUrl.trim());

      const res = await api.uploadMedia(fd);
      if (res.success) {
        toast.success("Media added to album!");
        setAlbumItemFile(null);
        setAlbumItemData({ title: "", caption: "", url: "", videoUrl: "", mediaType: "photo", isCover: false });
        loadMedia(true);
      } else {
        toast.error(res.message || "Failed to add media");
      }
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAlbumItem = async (key: string) => {
    if (!confirm("Are you sure you want to remove this media item from the album?")) return;
    try {
      const res = await api.deleteMedia(key);
      if (res.success) {
        toast.success("Media item removed from album");
        loadMedia(true);
      } else {
        toast.error(res.message || "Failed to delete");
      }
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
    }
  };

  const handleDeleteAlbum = async (albumId: string) => {
    if (!confirm(`Are you sure you want to delete the entire event album "${albumId}" and all its photos?`)) return;
    try {
      const res = await api.deleteAlbum(albumId);
      if (res.success) {
        toast.success(`Event album "${albumId}" deleted successfully`);
        loadMedia(true);
      } else {
        toast.error(res.message || "Failed to delete album");
      }
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
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
          <h2 className="text-xl font-black text-[#071527] flex items-center gap-2">
            <span>Multi-Format Media Control Center</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-orange-50 border border-orange-200 text-orange-600">
              Direct File Upload &amp; Cloud Auto-Config
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Upload images, documents, and videos directly from your device or link web assets to live website slots.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => loadMedia(true)}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 transition cursor-pointer disabled:opacity-50 shadow-2xs"
            title="Bypass cache and sync live with MongoDB"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-orange-500" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={openCustomModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition shadow-md shadow-orange-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Asset</span>
          </button>
        </div>
      </div>

      {/* Guide Card */}
      <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200/80 text-xs flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-orange-100 border border-orange-200 text-orange-600 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-[#071527] mb-0.5 text-sm">Hands-Free Direct Upload System:</h4>
            <div className="text-slate-600 space-y-1">
              <p>• <strong className="text-slate-900 font-bold">Drag &amp; Drop Upload:</strong> You don't need external links. Simply drop images, posters, or PDFs — the system stores and sets the URLs automatically.</p>
              <p>• <strong className="text-slate-900 font-bold">Patient Photos:</strong> Uploaded directly under the <strong className="text-rose-600 font-bold">"Patients"</strong> tab when creating or editing a medical aid case.</p>
              <p>• <strong className="text-slate-900 font-bold">News &amp; Event Photos:</strong> Uploaded under the <strong className="text-orange-600 font-bold">"News &amp; Events"</strong> tab with each article.</p>
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
            { id: "hero", label: "Hero Banners", count: mediaList.filter((m) => m.category === "hero").length || 4 },
            { id: "gallery", label: "Gallery Albums & Sections", count: albums.length || 6 },
            { id: "causes", label: "Program Pillars", count: 5 },
            { id: "videos", label: "Documentaries", count: 2 },
            { id: "reports", label: "Annual Reports & Pubs", count: 3 },
            { id: "people", label: "Leadership & Team", count: 3 },
            { id: "media", label: "Media Hub Cards", count: 6 },
            { id: "custom", label: "Custom Overrides", count: customItems.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Media Type Sub-Filter */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shrink-0 self-start sm:self-auto shadow-2xs">
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
                    ? "bg-orange-50 text-orange-600 border border-orange-200"
                    : "text-slate-600 hover:text-slate-900"
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
      ) : activeTab === "hero" ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div>
              <h3 className="text-base font-bold text-[#071527] flex items-center gap-2">
                <span>Dynamic Hero Carousel Banners</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-orange-50 border border-orange-200 text-orange-600">
                  {mediaList.filter((m) => m.category === "hero").length} Live Slides
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                You can add as many banners as you like! The public website will automatically loop through all active slides.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedFile(null);
                setFilePreview(null);
                setInputMode("file");
                setFormData({
                  key: `hero-slide-${Date.now()}`,
                  title: "",
                  category: "hero",
                  mediaType: "photo",
                  url: "",
                  videoUrl: "",
                  thumbnailUrl: "",
                  altText: "",
                  location: "Darbhanga, Bihar",
                  date: "2026",
                  tags: "Hero Banner",
                  order: (mediaList.filter((m) => m.category === "hero").length || 0) + 1,
                  subHeading: "",
                  ctaLink: "/donate",
                });
                setModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition shadow-md shadow-orange-500/20 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Hero Slide</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mediaList
              .filter((m) => m.category === "hero")
              .map((heroItem, hIdx) => (
                <div
                  key={heroItem.key || hIdx}
                  className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs overflow-hidden flex flex-col justify-between group hover:border-orange-300 hover:shadow-md transition duration-300"
                >
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={heroItem.url}
                      alt={heroItem.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black text-white border border-white/10">
                      Slide #{heroItem.order || hIdx + 1}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-[#071527] text-sm truncate">{heroItem.title || "Untitled Banner"}</h4>
                    {heroItem.subHeading && (
                      <p className="text-xs text-slate-500 line-clamp-2">{heroItem.subHeading}</p>
                    )}
                    {heroItem.ctaLink && (
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-orange-50 text-orange-700 border border-orange-200">
                        CTA: {heroItem.ctaLink}
                      </span>
                    )}
                    <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                      <span className="text-[11px] font-mono text-slate-400">{heroItem.key}</span>
                      {can("cms.media:delete") && (
                        <button
                          onClick={() => handleDelete(heroItem.key)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Delete this hero slide"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : activeTab === "gallery" ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div>
              <h3 className="text-base font-bold text-[#071527] flex items-center gap-2">
                <span>Dynamic Gallery Event Sections &amp; Albums</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-orange-50 border border-orange-200 text-orange-600">
                  {albums.length} Albums
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Create event albums and upload photos. When visitors click a thumbnail on the homepage, all photos of that album open in a rich lightbox.
              </p>
            </div>
            <button
              onClick={() => setNewAlbumModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition shadow-md shadow-orange-500/20 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Album / Section</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {albums.map((album) => (
              <div
                key={album.albumId}
                className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs overflow-hidden flex flex-col justify-between group hover:border-orange-300 hover:shadow-md transition duration-300"
              >
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={album.coverUrl}
                    alt={album.albumTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black text-white flex items-center gap-1.5 border border-white/10">
                    <ImageIcon className="w-3 h-3 text-orange-400" />
                    <span>{album.count} Media</span>
                  </div>
                  {album.mediaType === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/35 pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-[#071527] text-sm">{album.albumTitle}</h4>
                      {album.location && (
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span>{album.location} {album.date ? `• ${album.date}` : ""}</span>
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteAlbum(album.albumId)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
                      title="Delete this entire album"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedAlbum(album);
                      setAlbumManageModalOpen(true);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-orange-50 hover:bg-orange-500 text-orange-700 hover:text-white border border-orange-200 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Manage Photos &amp; Sub-Media ({album.count})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {activeTab !== "all" && activeTab !== "custom" && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div>
                <h3 className="text-base font-bold text-[#071527] flex items-center gap-2">
                  <span>
                    {activeTab === "causes"
                      ? "Program Pillars & Causes"
                      : activeTab === "videos"
                      ? "Video Documentaries & Streams"
                      : activeTab === "reports"
                      ? "Annual Reports & Publications"
                      : activeTab === "people"
                      ? "Leadership & Team Profiles"
                      : "Visual Media Assets"}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-orange-50 border border-orange-200 text-orange-600">
                    {mediaList.filter((m) => m.category === activeTab).length} Live Assets
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Update any existing slot or add new dynamic assets to this section anytime.
                </p>
              </div>
              {can("cms.media:create") && (
                <button
                  onClick={() => openNewItemModal(activeTab)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition shadow-md shadow-orange-500/20 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>
                    Add New{" "}
                    {activeTab === "causes"
                      ? "Pillar"
                      : activeTab === "videos"
                      ? "Video"
                      : activeTab === "reports"
                      ? "Publication / PDF"
                      : activeTab === "people"
                      ? "Team Member"
                      : "Asset"}
                  </span>
                </button>
              )}
            </div>
          )}
          {displayedSlots.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedSlots.map((slot) => {
                const live = mediaMap[slot.key];
                const isVideo = slot.mediaType === "video" || live?.mediaType === "video";
                const isDoc = slot.mediaType === "document" || live?.mediaType === "document";

                return (
                  <div
                    key={slot.key}
                    className={`rounded-2xl border overflow-hidden flex flex-col justify-between group transition duration-300 shadow-2xs ${
                      live
                        ? "bg-white border-slate-200/90 hover:border-orange-300 hover:shadow-md"
                        : "bg-white/80 border-slate-200 border-dashed hover:border-slate-300"
                    }`}
                  >
                    <div>
                      {/* Media Preview Box */}
                      <div className="relative h-44 w-full bg-slate-100 border-b border-slate-200/80 overflow-hidden flex items-center justify-center">
                        {live?.url || live?.thumbnailUrl ? (
                          <>
                            {isDocumentAsset(live) || isDoc ? (
                              <DocumentPreviewBadge title={live.title || slot.slotLabel} url={live.url} />
                            ) : (
                              <img
                                src={live.thumbnailUrl || live.url}
                                alt={live.altText || slot.defaultDescription}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src = "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/branding/logo.png";
                                }}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                              />
                            )}

                            {/* Video Play Overlay */}
                            {isVideo && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="w-11 h-11 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                                  <Play className="w-5 h-5 fill-white ml-0.5" />
                                </div>
                              </div>
                            )}

                            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-orange-600 text-white shadow-sm flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" />
                                <span>Live Cloud Override</span>
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="p-6 text-center flex flex-col items-center justify-center text-slate-500">
                            {isVideo ? (
                              <Video className="w-8 h-8 mb-2 text-orange-500" />
                            ) : isDoc ? (
                              <FileText className="w-8 h-8 mb-2 text-red-500" />
                            ) : (
                              <ImageIcon className="w-8 h-8 mb-2 text-slate-400" />
                            )}
                            <p className="text-[11px] font-bold text-slate-600">Bundled Fallback Active</p>
                            <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{slot.suggestedDimensions}</p>
                          </div>
                        )}

                        {/* Format Badge */}
                        <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#071527] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                          {isVideo ? (
                            <>
                              <Video className="w-3 h-3 text-orange-400" />
                              <span className="text-white font-bold">Video</span>
                            </>
                          ) : isDoc ? (
                            <>
                              <FileText className="w-3 h-3 text-red-400" />
                              <span className="text-white font-bold">PDF Doc</span>
                            </>
                          ) : (
                            <>
                              <Camera className="w-3 h-3 text-orange-400" />
                              <span className="text-white font-bold">Photo</span>
                            </>
                          )}
                        </span>

                        <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-[#071527] text-slate-100 text-[10px] font-mono shadow-sm font-semibold">
                          {slot.key}
                        </span>
                      </div>

                      {/* Content Metadata */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                            {slot.sectionTitle}
                          </span>
                        </div>
                        <h3 className="text-sm font-extrabold text-[#071527] mb-1">{slot.slotLabel}</h3>
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {live?.title || slot.defaultDescription}
                        </p>

                        {/* Tags Preview */}
                        <div className="mt-3 flex flex-wrap gap-1">
                          {(live?.tags || slot.defaultTags).map((t: string) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/80 text-[10px] text-slate-700 font-semibold"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="p-4 pt-2.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <button
                        onClick={() => openReplaceModal(slot)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-500 text-orange-700 hover:text-white border border-orange-200 text-xs font-bold transition cursor-pointer"
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
                              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg transition"
                              title={isVideo ? "Watch Video" : isDoc ? "View PDF" : "View Image"}
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            {can("cms.media:delete") && (
                              <button
                                onClick={() => handleDelete(slot.key)}
                                title="Revert to bundled default image"
                                className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Additional Dynamic Uploaded Items for this section */}
          {(() => {
            const extraItems = mediaList.filter((m) => {
              const isCustom = !SYSTEM_SLOTS.some((s) => s.key === m.key);
              if (!isCustom) return false;
              if (activeTab === "all" || activeTab === "custom") return true;
              return m.category === activeTab;
            });

            if (extraItems.length === 0) return null;

            return (
              <div className="space-y-4 pt-6 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange-500" />
                  <span>
                    Additional Dynamic {activeTab.toUpperCase()} Assets ({extraItems.length})
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {extraItems.map((item) => (
                    <div
                      key={item.key}
                      className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between group hover:border-orange-300 hover:shadow-md transition"
                    >
                      <div>
                        <div className="relative h-44 w-full bg-slate-100 overflow-hidden flex items-center justify-center">
                          {isDocumentAsset(item) ? (
                            <DocumentPreviewBadge title={item.title} url={item.url} />
                          ) : (
                            <img
                              src={item.thumbnailUrl || item.url}
                              alt={item.altText || item.title}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/branding/logo.png";
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                          )}
                          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#071527] text-white shadow-sm flex items-center gap-1 z-10">
                            {isDocumentAsset(item) ? (
                              <>
                                <FileText className="w-3 h-3 text-red-400" />
                                <span>DOCUMENT</span>
                              </>
                            ) : item.mediaType === "video" ? (
                              <>
                                <Video className="w-3 h-3 text-orange-400" />
                                <span>VIDEO</span>
                              </>
                            ) : (
                              <>
                                <Camera className="w-3 h-3 text-slate-300" />
                                <span>PHOTO</span>
                              </>
                            )}
                          </span>
                        </div>
                        <div className="p-4">
                          <span className="inline-block px-2 py-0.5 rounded bg-orange-50 border border-orange-200 text-orange-700 font-mono text-[11px] font-bold mb-2">
                            {item.key}
                          </span>
                          <h3 className="text-sm font-extrabold text-[#071527] mb-1">{item.title}</h3>
                          <p className="text-xs text-slate-600 truncate">{item.altText || item.subHeading || "No caption"}</p>
                        </div>
                      </div>

                      <div className="p-4 pt-2.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <button
                          onClick={() => {
                            setSelectedFile(null);
                            setFilePreview(item.thumbnailUrl || item.url || null);
                            setFormData({
                              key: item.key,
                              category: item.category || "general",
                              mediaType: item.mediaType || "photo",
                              title: item.title || "",
                              subHeading: item.subHeading || "",
                              ctaLink: item.ctaLink || "",
                              altText: item.altText || "",
                              location: item.location || "Darbhanga, Bihar",
                              date: item.date || "2026",
                              tags: item.tags ? item.tags.join(", ") : "",
                              order: item.order || 0,
                              url: item.url || "",
                              videoUrl: item.videoUrl || "",
                              thumbnailUrl: item.thumbnailUrl || "",
                            });
                            setModalOpen(true);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-500 text-orange-700 hover:text-white border border-orange-200 text-xs font-bold transition cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Edit / Replace</span>
                        </button>

                        <div className="flex items-center gap-1">
                          <a
                            href={item.videoUrl || item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg transition"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          {can("cms.media:delete") && (
                            <button
                              onClick={() => handleDelete(item.key)}
                              title="Delete this asset"
                              className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Target Asset Assignment / Replacement Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full shadow-2xl my-auto max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Sticky Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-slate-200 shrink-0">
              <h3 className="text-base font-extrabold text-[#071527] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                <span>Assign / Replace Dynamic Asset</span>
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
                {/* Media Type Selector */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Asset Format Type *</label>
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
                              ? "bg-orange-50 border-orange-400 text-orange-700 font-bold shadow-xs"
                              : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600"
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
                  <label className="block text-slate-700 font-bold mb-1">
                    Website Target Placement Slot *
                  </label>
                  <select
                    value={formData.key}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (!val) return;

                      // Handle Event Album selection
                      if (val === "__new_album") {
                        setModalOpen(false);
                        setNewAlbumModalOpen(true);
                        return;
                      }

                      if (val.startsWith("__album_")) {
                        const targetAlbumId = val.replace("__album_", "");
                        const albumObj = albums.find((a) => a.albumId === targetAlbumId);
                        const uniqueKey = `gallery-${targetAlbumId}-${Date.now().toString().slice(-6)}`;

                        setSelectedFile(null);
                        setFilePreview(null);
                        setFormData({
                          key: uniqueKey,
                          category: "gallery",
                          mediaType: "photo",
                          title: albumObj?.albumTitle ? `${albumObj.albumTitle} - Photo` : "",
                          subHeading: "",
                          ctaLink: "",
                          url: "",
                          videoUrl: "",
                          thumbnailUrl: "",
                          altText: albumObj?.albumTitle || "",
                          location: albumObj?.location || "Darbhanga, Bihar",
                          date: albumObj?.date || "2026",
                          tags: `gallery, ${targetAlbumId}`,
                          order: (albumObj?.count || 0) + 1,
                        });
                        return;
                      }

                      // 1. Adding a new item to any category
                      if (val.startsWith("__new_")) {
                        const section = val.replace("__new_", "") as any;
                        const prefix =
                          section === "hero"
                            ? "hero-slide"
                            : section === "gallery"
                            ? "gallery"
                            : section === "causes"
                            ? "cause"
                            : section === "videos"
                            ? "video"
                            : section === "reports"
                            ? "report"
                            : section === "people"
                            ? "person"
                            : section;
                        const uniqueKey = `${prefix}-${Date.now()}`;
                        const count = mediaList.filter((m) => m.category === section).length;
                        const mediaType =
                          section === "videos"
                            ? "video"
                            : section === "reports"
                            ? "document"
                            : "photo";

                        setSelectedFile(null);
                        setFilePreview(null);
                        setFormData({
                          key: uniqueKey,
                          category: section,
                          mediaType,
                          title: section === "hero" ? `Hero Slide #${count + 1}` : "",
                          subHeading: "",
                          ctaLink: section === "hero" ? "/donate" : "",
                          url: "",
                          videoUrl: "",
                          thumbnailUrl: "",
                          altText: "",
                          location: "Darbhanga, Bihar",
                          date: "2026",
                          tags: section === "hero" ? "Hero Banner" : section,
                          order: count + 1,
                        });
                        return;
                      }

                      // 2. Custom Key
                      if (val === "custom") {
                        setFormData({
                          ...formData,
                          key: "custom",
                          category: "general",
                          title: "",
                          altText: "",
                        });
                        return;
                      }

                      // 3. Existing item in DB or standard slot
                      const existingMedia = mediaList.find((m) => m.key === val);
                      const selectedSlot = SYSTEM_SLOTS.find((s) => s.key === val);

                      if (existingMedia) {
                        setSelectedFile(null);
                        setFilePreview(existingMedia.thumbnailUrl || existingMedia.url || null);
                        setFormData({
                          key: existingMedia.key,
                          category: existingMedia.category || selectedSlot?.section || "general",
                          mediaType: existingMedia.mediaType || selectedSlot?.mediaType || "photo",
                          title: existingMedia.title || selectedSlot?.defaultDescription || "",
                          subHeading: existingMedia.subHeading || "",
                          ctaLink: existingMedia.ctaLink || "",
                          altText: existingMedia.altText || "",
                          location: existingMedia.location || "Darbhanga, Bihar",
                          date: existingMedia.date || "2026",
                          tags: existingMedia.tags
                            ? existingMedia.tags.join(", ")
                            : selectedSlot?.defaultTags.join(", ") || "",
                          order: existingMedia.order || 0,
                          url: existingMedia.url || "",
                          videoUrl: existingMedia.videoUrl || "",
                          thumbnailUrl: existingMedia.thumbnailUrl || "",
                        });
                      } else if (selectedSlot) {
                        setSelectedFile(null);
                        setFilePreview(null);
                        setFormData({
                          key: selectedSlot.key,
                          category: selectedSlot.section,
                          mediaType: selectedSlot.mediaType,
                          title: selectedSlot.defaultDescription,
                          altText: selectedSlot.defaultDescription,
                          tags: selectedSlot.defaultTags.join(", "),
                          order: 0,
                          subHeading: "",
                          ctaLink: "",
                          url: "",
                          videoUrl: "",
                          thumbnailUrl: "",
                          location: "Darbhanga, Bihar",
                          date: "2026",
                        });
                      } else {
                        setFormData({ ...formData, key: val });
                      }
                    }}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs font-mono focus:border-orange-500 outline-none"
                  >
                    <option value="">-- Choose Target Website Slot --</option>
                    
                    <optgroup label="🌟 Homepage Hero Carousel">
                      <option value="__new_hero" className="font-bold text-orange-600">
                        ➕ [Add New Slide] Create New Hero Carousel Slide
                      </option>
                      {SYSTEM_SLOTS.filter((s) => s.section === "hero").map((s) => (
                        <option key={s.key} value={s.key}>
                          Update: {s.slotLabel} ({s.key})
                        </option>
                      ))}
                      {mediaList
                        .filter((m) => m.category === "hero" && !SYSTEM_SLOTS.some((s) => s.key === m.key))
                        .map((m) => (
                          <option key={m.key} value={m.key}>
                            Update: {m.title || m.key} ({m.key})
                          </option>
                        ))}
                    </optgroup>

                    <optgroup label="🏛️ Core Program Pillars (Causes)">
                      <option value="__new_causes" className="font-bold text-orange-600">
                        ➕ [Add New Pillar] Create New Program Pillar
                      </option>
                      {SYSTEM_SLOTS.filter((s) => s.section === "causes").map((s) => (
                        <option key={s.key} value={s.key}>
                          Update: {s.slotLabel} ({s.key})
                        </option>
                      ))}
                      {mediaList
                        .filter((m) => m.category === "causes" && !SYSTEM_SLOTS.some((s) => s.key === m.key))
                        .map((m) => (
                          <option key={m.key} value={m.key}>
                            Update: {m.title || m.key} ({m.key})
                          </option>
                        ))}
                    </optgroup>

                    <optgroup label="📸 Homepage Gallery Showcase (Event Albums & Sub-Media)">
                      <option value="__new_album" className="font-bold text-orange-600">
                        ➕ [Create New Event Album] (Add New Event with Cover & Details)
                      </option>
                      {albums.map((a) => (
                        <option key={a.albumId} value={`__album_${a.albumId}`}>
                          📁 Add Sub-Media to: {a.albumTitle} ({a.count} photos)
                        </option>
                      ))}
                      {mediaList
                        .filter((m) => m.category === "gallery")
                        .map((m) => (
                          <option key={m.key} value={m.key}>
                            Update Photo: {m.title || m.key} ({m.key})
                          </option>
                        ))}
                    </optgroup>

                    <optgroup label="🎥 Video Documentaries &amp; Reels">
                      <option value="__new_videos" className="font-bold text-orange-600">
                        ➕ [Add New Video] Add New Documentary / Reel
                      </option>
                      {SYSTEM_SLOTS.filter((s) => s.section === "videos").map((s) => (
                        <option key={s.key} value={s.key}>
                          Update: {s.slotLabel} ({s.key})
                        </option>
                      ))}
                      {mediaList
                        .filter((m) => m.category === "videos" && !SYSTEM_SLOTS.some((s) => s.key === m.key))
                        .map((m) => (
                          <option key={m.key} value={m.key}>
                            Update: {m.title || m.key} ({m.key})
                          </option>
                        ))}
                    </optgroup>

                    <optgroup label="📄 Annual Reports &amp; Publications">
                      <option value="__new_reports" className="font-bold text-orange-600">
                        ➕ [Add New Report] Add Annual Report / PDF
                      </option>
                      {SYSTEM_SLOTS.filter((s) => s.section === "reports").map((s) => (
                        <option key={s.key} value={s.key}>
                          Update: {s.slotLabel} ({s.key})
                        </option>
                      ))}
                      {mediaList
                        .filter((m) => m.category === "reports" && !SYSTEM_SLOTS.some((s) => s.key === m.key))
                        .map((m) => (
                          <option key={m.key} value={m.key}>
                            Update: {m.title || m.key} ({m.key})
                          </option>
                        ))}
                    </optgroup>

                    <optgroup label="👥 Leadership &amp; Team">
                      <option value="__new_people" className="font-bold text-orange-600">
                        ➕ [Add New Member] Add Leadership / Team Profile
                      </option>
                      {SYSTEM_SLOTS.filter((s) => s.section === "people").map((s) => (
                        <option key={s.key} value={s.key}>
                          Update: {s.slotLabel} ({s.key})
                        </option>
                      ))}
                      {mediaList
                        .filter((m) => m.category === "people" && !SYSTEM_SLOTS.some((s) => s.key === m.key))
                        .map((m) => (
                          <option key={m.key} value={m.key}>
                            Update: {m.title || m.key} ({m.key})
                          </option>
                        ))}
                    </optgroup>

                    <option value="custom">✍️ Custom Slot / Key</option>
                  </select>
                </div>

                {/* Target Slot Key Identifier Display & Edit */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Slot Key Identifier *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. hero-slide-5 or partner-logo-1"
                    value={formData.key === "custom" ? "" : formData.key}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        key: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-mono focus:border-orange-500 outline-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Auto-assigned for new items. You can also customize this identifier key if needed.
                  </p>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Title / Caption *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Primary School Digital Learning Center"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-orange-500 outline-none"
                  />
                </div>

                {/* Video URL (if video selected) */}
                {formData.mediaType === "video" && (
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Video Stream / Embed URL (YouTube or MP4) *</label>
                    <input
                      type="url"
                      required={!selectedFile}
                      placeholder="https://www.youtube.com/watch?v=... or https://.../video.mp4"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-orange-500 outline-none"
                    />
                  </div>
                )}

                {/* Dual Input Mode: Direct File Upload vs Paste Link */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-slate-700 font-bold">
                      {formData.mediaType === "video"
                        ? "Video Thumbnail Poster Image"
                        : formData.mediaType === "document"
                        ? "PDF / Document File *"
                        : "Image Asset *"}
                    </label>
                    <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setInputMode("file")}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition ${
                          inputMode === "file" ? "bg-orange-500 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload File</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setInputMode("url")}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition ${
                          inputMode === "url" ? "bg-orange-500 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <LinkIcon className="w-3 h-3" />
                        <span>Paste URL</span>
                      </button>
                    </div>
                  </div>

                  {inputMode === "file" ? (
                    <div className="relative border-2 border-dashed border-slate-300 hover:border-orange-500 rounded-2xl p-4 bg-slate-50/70 hover:bg-orange-50/20 text-center transition group cursor-pointer">
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
                            {selectedFile.type.includes("pdf") || selectedFile.name.endsWith(".pdf") || selectedFile.name.endsWith(".doc") || selectedFile.name.endsWith(".docx") ? (
                              <div className="w-14 h-14 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
                                <FileText className="w-7 h-7 text-red-600" />
                              </div>
                            ) : filePreview ? (
                              <img src={filePreview} alt="Preview" className="w-14 h-14 object-cover rounded-xl border border-slate-200" />
                            ) : (
                              <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                                <CheckCircle2 className="w-6 h-6" />
                              </div>
                            )}
                            <div>
                              <p className="text-slate-900 font-bold text-xs truncate max-w-[220px]">{selectedFile.name}</p>
                              <p className="text-[10px] text-slate-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to auto-configure</p>
                              <span className="text-[10px] text-orange-600 font-semibold">Click to change file</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFile(null);
                              setFilePreview(null);
                            }}
                            className="p-1 text-slate-400 hover:text-red-500 rounded-lg z-20 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="py-3 flex flex-col items-center justify-center gap-1.5">
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-400 group-hover:text-orange-500 group-hover:scale-110 transition">
                            <Upload className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">
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
                            : "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/... or R2 CDN URL"
                        }
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-orange-500 outline-none"
                      />

                      {formData.url && isDocumentAsset(formData) ? (
                        <div className="mt-2.5 p-3 rounded-xl bg-red-50/70 border border-red-200 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-100 border border-red-200 text-red-600 flex items-center justify-center shrink-0">
                              <FileText className="w-5 h-5 text-red-600" />
                            </div>
                            <div className="text-[11px] text-slate-700 min-w-0">
                              <p className="font-bold text-slate-900 flex items-center gap-1.5">
                                <span className="px-1.5 py-0.2 rounded bg-red-600 text-white font-mono text-[9px] font-black uppercase">PDF</span>
                                <span>Official Document Linked</span>
                              </p>
                              <p className="text-[10px] text-slate-500 font-mono truncate max-w-[260px]">{formData.url}</p>
                            </div>
                          </div>
                          <a
                            href={formData.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-bold text-slate-700 transition shrink-0"
                          >
                            <ExternalLink className="w-3 h-3 text-slate-500" />
                            <span>Open</span>
                          </a>
                        </div>
                      ) : formData.url && (
                        <div className="mt-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                          <img
                            src={formData.url}
                            alt="Preview"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/branding/logo.png";
                            }}
                            className="w-16 h-12 object-cover rounded-lg border border-slate-200"
                          />
                          <div className="text-[11px] text-slate-600">
                            <p className="text-slate-900 font-bold flex items-center gap-1">
                              <Eye className="w-3 h-3 text-orange-600" />
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
                    <label className="block text-slate-700 font-bold mb-1">Field Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Darbhanga, Bihar"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Year / Date</label>
                    <input
                      type="text"
                      placeholder="e.g. Oct 2026"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category Tags (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Education, Field Work, Healthcare, Video"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-orange-500 outline-none"
                  />
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
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>Save &amp; Update Live Site</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Create New Gallery Album Modal ── */}
      {newAlbumModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full shadow-2xl my-auto max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-5 pb-4 border-b border-slate-200 shrink-0">
              <h3 className="text-base font-extrabold text-[#071527] flex items-center gap-2">
                <Layers className="w-5 h-5 text-orange-500" />
                <span>Create New Gallery Album / Section</span>
              </h3>
              <button
                onClick={() => setNewAlbumModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAlbum} className="flex flex-col flex-1 overflow-hidden min-h-0">
              <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs overscroll-contain">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Album / Event Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Free Eye Care Camp or Flood Relief 2026"
                    value={newAlbumData.title}
                    onChange={(e) => setNewAlbumData({ ...newAlbumData, title: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-orange-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Bathiya Village"
                      value={newAlbumData.location}
                      onChange={(e) => setNewAlbumData({ ...newAlbumData, location: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Date / Year</label>
                    <input
                      type="text"
                      placeholder="e.g. Nov 2026"
                      value={newAlbumData.date}
                      onChange={(e) => setNewAlbumData({ ...newAlbumData, date: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Album Cover Photo *</label>
                  <div className="border-2 border-dashed border-slate-300 hover:border-orange-500 rounded-2xl p-4 bg-slate-50/70 text-center transition cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) setNewAlbumCoverFile(e.target.files[0]);
                      }}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer"
                    />
                    <p className="text-[11px] text-slate-400 mt-2">Or paste an image web URL below:</p>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newAlbumCoverUrl}
                      onChange={(e) => setNewAlbumCoverUrl(e.target.value)}
                      className="w-full mt-2 p-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setNewAlbumModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  <span>Create Album</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Manage Album Photos & Videos Modal ── */}
      {albumManageModalOpen && selectedAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full p-6 shadow-2xl my-auto max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 block">Album Photo Manager</span>
                <h3 className="text-lg font-black text-[#071527]">{selectedAlbum.albumTitle}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedAlbum.items?.length || selectedAlbum.count || 0} items in this event section
                </p>
              </div>
              <button
                onClick={() => setAlbumManageModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto space-y-6 py-4 flex-1 pr-1 overscroll-contain">
              {/* Upload to Album Card */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-2xs">
                <h4 className="font-bold text-[#071527] text-xs mb-3 flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-orange-500" />
                  <span>Add New Photo or Video to this Album</span>
                </h4>
                <form onSubmit={handleUploadToAlbum} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Format</label>
                      <select
                        value={albumItemData.mediaType}
                        onChange={(e) => setAlbumItemData({ ...albumItemData, mediaType: e.target.value as any })}
                        className="w-full p-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs outline-none focus:border-orange-500"
                      >
                        <option value="photo">Photo / Image</option>
                        <option value="video">Video (YouTube / Embed)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Title / Caption</label>
                      <input
                        type="text"
                        placeholder="e.g. Youth Volunteers Distributing Kits"
                        value={albumItemData.caption}
                        onChange={(e) => setAlbumItemData({ ...albumItemData, caption: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {albumItemData.mediaType === "photo" ? (
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Upload Photo File or Paste URL</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) setAlbumItemFile(e.target.files[0]);
                        }}
                        className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">YouTube / Video URL</label>
                      <input
                        type="url"
                        placeholder="https://www.youtube.com/embed/..."
                        value={albumItemData.videoUrl}
                        onChange={(e) => setAlbumItemData({ ...albumItemData, videoUrl: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs outline-none focus:border-orange-500"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                      <input
                        type="checkbox"
                        checked={albumItemData.isCover}
                        onChange={(e) => setAlbumItemData({ ...albumItemData, isCover: e.target.checked })}
                        className="rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                      />
                      <span>Set as Album Cover Photo</span>
                    </label>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
                    >
                      {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                      <span>Upload &amp; Add</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Photos Grid inside Album */}
              <div>
                <h4 className="font-bold text-[#071527] text-xs mb-3">All Photos &amp; Videos in this Album:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {(selectedAlbum.items || []).map((item: any, idx: number) => (
                    <div key={item.key || idx} className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group aspect-square">
                      <img src={item.thumbnailUrl || item.url} alt={item.title} className="w-full h-full object-cover" />
                      {item.isCover && (
                        <div className="absolute top-1 left-1 bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                          Cover
                        </div>
                      )}
                      <button
                        onClick={() => handleDeleteAlbumItem(item.key)}
                        className="absolute bottom-1 right-1 p-1.5 rounded-lg bg-black/70 hover:bg-rose-600 text-white transition cursor-pointer opacity-0 group-hover:opacity-100"
                        title="Delete this photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-200 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setAlbumManageModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer border border-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
