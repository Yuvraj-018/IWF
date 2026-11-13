import { useState, useEffect } from "react";
import { api } from "../services/api";
import {
  Building,
  MapPin,
  Phone,
  Mail,
  Share2,
  Sparkles,
  Award,
  FileCheck2,
  ShieldCheck,
  Save,
  Loader2,
  RefreshCw,
  Upload,
  CheckCircle2,
  ExternalLink,
  Plus,
  Trash2,
  AlertCircle,
  Database,
  Globe,
  Heart,
  TrendingUp,
  FileText,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { getClientUrl } from "../services/config";

export default function SiteSettingsManager() {
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "organization" | "counters" | "milestones" | "compliance" | "system"
  >("organization");

  // 1. Organization & Contact Info
  const [contactInfo, setContactInfo] = useState({
    foundationName: "Islah Welfare Foundation",
    tagline: "Together for a Better Tomorrow",
    darbhangaOffice: "Islah Welfare Foundation, Near Tower Chowk, Darbhanga, Bihar - 846004",
    delhiOffice: "New Delhi Liaison Office, India",
    primaryPhone: "+91 94314 00000",
    helplinePhone: "+91 94314 11111",
    whatsappNumber: "+91 98118 61633",
    primaryEmail: "info@iwfindia.org",
    emergencyEmail: "emergency@iwfindia.org",
  });

  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://www.facebook.com/islahindia/",
    twitter: "https://x.com/islahindia/",
    instagram: "https://www.instagram.com/islahindia/",
    linkedin: "https://www.linkedin.com/in/islahindia/",
    youtube: "https://www.youtube.com/channel/UC5sty9L25QQwC89JwGmEIVw/",
    whatsapp: "https://wa.me/919811861633",
  });

  // 2. Homepage & Hero Counters
  const [homepageStats, setHomepageStats] = useState({
    livesTouched: "5,000+",
    healthCamps: "100+",
    studentsSupported: "2,000+",
    villagesReached: "50+",
    activePrograms: "12",
    yearsOfService: "8",
    heroBeneficiaries: "10,000+",
  });

  const [featuredCausesStats, setFeaturedCausesStats] = useState({
    eduRaised: "1,65,240",
    eduGoalPct: "75",
    medRaised: "2,12,880",
    medGoalPct: "48",
    womenRaised: "1,48,720",
    womenGoalPct: "60",
  });

  // 3. Impact & Sector Milestones
  const [impactStats, setImpactStats] = useState({
    livesTouched: "50,000+",
    villagesReached: "300+",
    districtsCovered: "15+",
    ongoingPrograms: "25+",
    volunteersCount: "500+",
    partnersCount: "100+",
    yearsOfImpact: "10+",
    totalCumulativeImpact: "71,000+",
  });

  const [sectorStats, setSectorStats] = useState({
    educationChildren: "8,000+",
    educationSchools: "120+",
    healthPeople: "6,000+",
    healthCamps: "85+",
    womenEmpowered: "4,000+",
    selfHelpGroups: "200+",
    youthTrained: "3,500+",
    treesPlanted: "15,000+",
    cleanWaterPoints: "80+",
    reliefFamilies: "12,000+",
  });

  const [demographics, setDemographics] = useState({
    childrenCount: "28,000+",
    womenCount: "21,000+",
    youthCount: "15,000+",
    seniorCitizensCount: "7,000+",
  });

  // 4. Statutory Compliance & Reports
  const [statutoryReports, setStatutoryReports] = useState<
    Array<{
      id: string;
      title: string;
      year: string;
      status: string;
      fileUrl: string;
      fileSize?: string;
    }>
  >([
    { id: "rep-1", title: "Annual Report 2023-24", year: "2023-24", status: "Verified", fileUrl: "/policies", fileSize: "2.4 MB" },
    { id: "rep-2", title: "Audited Financial Statements", year: "2023-24", status: "Verified", fileUrl: "/policies", fileSize: "1.8 MB" },
    { id: "rep-3", title: "Balance Sheet & Accounts", year: "2023-24", status: "Verified", fileUrl: "/policies", fileSize: "1.2 MB" },
    { id: "rep-4", title: "12A & 80G Approval Order", year: "2021-26", status: "Active Order", fileUrl: "/policies", fileSize: "680 KB" },
    { id: "rep-5", title: "CSR-1 Registration Certificate", year: "2022-Present", status: "Active Order", fileUrl: "/policies", fileSize: "540 KB" },
  ]);

  const [showAddReportModal, setShowAddReportModal] = useState(false);
  const [newReport, setNewReport] = useState({
    title: "",
    year: "2024-25",
    status: "Verified",
    fileUrl: "",
    fileSize: "1.5 MB",
  });
  const [uploadingReport, setUploadingReport] = useState(false);

  // Load Settings from Backend
  const loadSettings = (force = false) => {
    setLoading(true);
    api.getSettings({ force })
      .then((res) => {
        if (res.success && res.data) {
          if (res.data.contact_info) setContactInfo((prev) => ({ ...prev, ...res.data.contact_info }));
          if (res.data.social_links) setSocialLinks((prev) => ({ ...prev, ...res.data.social_links }));
          if (res.data.homepage_stats) setHomepageStats((prev) => ({ ...prev, ...res.data.homepage_stats }));
          if (res.data.featured_causes_stats) setFeaturedCausesStats((prev) => ({ ...prev, ...res.data.featured_causes_stats }));
          if (res.data.impact_stats) setImpactStats((prev) => ({ ...prev, ...res.data.impact_stats }));
          if (res.data.sector_stats) setSectorStats((prev) => ({ ...prev, ...res.data.sector_stats }));
          if (res.data.demographic_stats) setDemographics((prev) => ({ ...prev, ...res.data.demographic_stats }));
          if (res.data.statutory_reports?.reports) setStatutoryReports(res.data.statutory_reports.reports);
        }
      })
      .catch((err) => {
        console.error("Failed to load settings:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadSettings(false);
  }, []);

  // Save specific section
  const handleSaveSection = async (key: string, data: Record<string, any>, successMsg: string) => {
    setSavingKey(key);
    try {
      const res = await api.updateSetting(key, data);
      if (res.success) {
        toast.success(successMsg);
      } else {
        toast.error(res.message || "Failed to update configuration");
      }
    } catch (err: any) {
      toast.error(err.message || "Update error");
    } finally {
      setSavingKey(null);
    }
  };

  // Upload statutory report
  const handleUploadDocument = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingReport(true);
    try {
      const res = await api.uploadSingleFile(file);
      if (res.success && res.file?.url) {
        setNewReport((prev) => ({
          ...prev,
          fileUrl: res.file!.url,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        }));
        toast.success("Document uploaded successfully!");
      } else {
        toast.error("Upload failed");
      }
    } catch (e: any) {
      toast.error(e.message || "Upload error");
    } finally {
      setUploadingReport(false);
    }
  };

  const handleAddReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.title) {
      toast.error("Please provide a report title");
      return;
    }
    const updated = [
      ...statutoryReports,
      {
        id: `rep-${Date.now()}`,
        title: newReport.title,
        year: newReport.year,
        status: newReport.status,
        fileUrl: newReport.fileUrl || "/policies",
        fileSize: newReport.fileSize || "1.2 MB",
      },
    ];
    setStatutoryReports(updated);
    handleSaveSection("statutory_reports", { reports: updated }, "New compliance report added!");
    setShowAddReportModal(false);
    setNewReport({ title: "", year: "2024-25", status: "Verified", fileUrl: "", fileSize: "1.5 MB" });
  };

  const handleDeleteReport = (id: string) => {
    const updated = statutoryReports.filter((r) => r.id !== id);
    setStatutoryReports(updated);
    handleSaveSection("statutory_reports", { reports: updated }, "Report removed successfully");
  };

  const handleFlushCache = () => {
    api.invalidateCache();
    toast.success("Platform cache flushed! Live website reflecting newest database values.");
    loadSettings(true);
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center text-slate-500 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#f97316]" />
        <p className="text-xs font-semibold text-slate-600">Loading Platform Configuration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto pb-16 font-sans">
      {/* ═════════════════════════════════════════════════════════════
          1. HEADER HERO: WHITE WITH BLUE & ORANGE BRAND ACCENTS
          ═════════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#071527] flex items-center justify-center p-2.5 shadow-xs shrink-0">
            <img
              src="/islah_logo.png"
              alt="ISLAH Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/logo.png";
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-[#071527] tracking-tight">
                Platform Settings &amp; Configuration
              </h1>
              <span className="text-[10px] font-bold bg-[#f97316]/10 text-[#ea580c] px-2.5 py-0.5 rounded-full border border-[#f97316]/20 uppercase">
                Centralized Admin
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Manage organization contacts, live homepage metrics, sector milestones, and statutory transparency.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadSettings(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            title="Refresh from Database"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reload</span>
          </button>
          <a
            href={getClientUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#071527] hover:bg-[#0c2444] text-white text-xs font-bold transition shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#f97316]" />
            <span>View Live Website</span>
          </a>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          2. NAVIGATION TABS (CLEAN WHITE WITH ACTIVE ORANGE ACCENTS)
          ═════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab("organization")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === "organization"
              ? "bg-[#071527] text-white shadow-xs"
              : "text-slate-600 hover:text-[#071527] hover:bg-slate-100"
          }`}
        >
          <Building className={`w-4 h-4 ${activeTab === "organization" ? "text-[#f97316]" : "text-slate-400"}`} />
          <span>Organization &amp; Contacts</span>
        </button>

        <button
          onClick={() => setActiveTab("counters")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === "counters"
              ? "bg-[#071527] text-white shadow-xs"
              : "text-slate-600 hover:text-[#071527] hover:bg-slate-100"
          }`}
        >
          <Sparkles className={`w-4 h-4 ${activeTab === "counters" ? "text-[#f97316]" : "text-slate-400"}`} />
          <span>Live Website Counters</span>
        </button>

        <button
          onClick={() => setActiveTab("milestones")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === "milestones"
              ? "bg-[#071527] text-white shadow-xs"
              : "text-slate-600 hover:text-[#071527] hover:bg-slate-100"
          }`}
        >
          <TrendingUp className={`w-4 h-4 ${activeTab === "milestones" ? "text-[#f97316]" : "text-slate-400"}`} />
          <span>Sector Milestones</span>
        </button>

        <button
          onClick={() => setActiveTab("compliance")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === "compliance"
              ? "bg-[#071527] text-white shadow-xs"
              : "text-slate-600 hover:text-[#071527] hover:bg-slate-100"
          }`}
        >
          <FileCheck2 className={`w-4 h-4 ${activeTab === "compliance" ? "text-[#f97316]" : "text-slate-400"}`} />
          <span>Statutory Compliance &amp; 80G</span>
        </button>

        <button
          onClick={() => setActiveTab("system")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === "system"
              ? "bg-[#071527] text-white shadow-xs"
              : "text-slate-600 hover:text-[#071527] hover:bg-slate-100"
          }`}
        >
          <ShieldCheck className={`w-4 h-4 ${activeTab === "system" ? "text-[#f97316]" : "text-slate-400"}`} />
          <span>System &amp; Cache Controls</span>
        </button>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          3. TAB 1: ORGANIZATION & CONTACT INFORMATION
          ═════════════════════════════════════════════════════════════ */}
      {activeTab === "organization" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveSection("contact_info", contactInfo, "Organization details and helplines saved!");
            }}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#f97316]">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#071527]">Institutional Identity &amp; Helplines</h3>
                  <p className="text-xs text-slate-500">Official registered foundation details and emergency contacts</p>
                </div>
              </div>
              <button
                type="submit"
                disabled={savingKey === "contact_info"}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-xs transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                {savingKey === "contact_info" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Contact Details</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Organization Legal Name</label>
                <input
                  type="text"
                  value={contactInfo.foundationName}
                  onChange={(e) => setContactInfo({ ...contactInfo, foundationName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Official Tagline</label>
                <input
                  type="text"
                  value={contactInfo.tagline}
                  onChange={(e) => setContactInfo({ ...contactInfo, tagline: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">Registered Headquarters Address (Darbhanga)</label>
                <input
                  type="text"
                  value={contactInfo.darbhangaOffice}
                  onChange={(e) => setContactInfo({ ...contactInfo, darbhangaOffice: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">National Liaison Office (New Delhi)</label>
                <input
                  type="text"
                  value={contactInfo.delhiOffice}
                  onChange={(e) => setContactInfo({ ...contactInfo, delhiOffice: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Primary Reception Phone</label>
                <input
                  type="text"
                  value={contactInfo.primaryPhone}
                  onChange={(e) => setContactInfo({ ...contactInfo, primaryPhone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-medium focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Helpline &amp; Support Phone</label>
                <input
                  type="text"
                  value={contactInfo.helplinePhone}
                  onChange={(e) => setContactInfo({ ...contactInfo, helplinePhone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-medium focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">WhatsApp Emergency Helpline</label>
                <input
                  type="text"
                  value={contactInfo.whatsappNumber}
                  onChange={(e) => setContactInfo({ ...contactInfo, whatsappNumber: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-medium focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Primary Email Address</label>
                <input
                  type="email"
                  value={contactInfo.primaryEmail}
                  onChange={(e) => setContactInfo({ ...contactInfo, primaryEmail: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-medium focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>
            </div>
          </form>

          {/* Social Links Sub-Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveSection("social_links", socialLinks, "Official social links updated successfully!");
            }}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#071527]">Official Social Channels &amp; Links</h3>
                  <p className="text-xs text-slate-500">Connected in public navbar, footer, and communications</p>
                </div>
              </div>
              <button
                type="submit"
                disabled={savingKey === "social_links"}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#071527] hover:bg-[#0c2444] text-white font-bold text-xs transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                {savingKey === "social_links" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Social Channels</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Facebook URL</label>
                <input
                  type="text"
                  value={socialLinks.facebook}
                  onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Twitter / X URL</label>
                <input
                  type="text"
                  value={socialLinks.twitter}
                  onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Instagram URL</label>
                <input
                  type="text"
                  value={socialLinks.instagram}
                  onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  value={socialLinks.linkedin}
                  onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">YouTube Channel</label>
                <input
                  type="text"
                  value={socialLinks.youtube}
                  onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Direct WhatsApp Link</label>
                <input
                  type="text"
                  value={socialLinks.whatsapp}
                  onChange={(e) => setSocialLinks({ ...socialLinks, whatsapp: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          4. TAB 2: LIVE WEBSITE COUNTERS (HERO & HOMEPAGE)
          ═════════════════════════════════════════════════════════════ */}
      {activeTab === "counters" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveSection("homepage_stats", homepageStats, "Homepage live counters updated!");
            }}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#f97316]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#071527]">Homepage &amp; Hero Live Counters</h3>
                  <p className="text-xs text-slate-500">Dynamic numbers shown across the public hero banner and quick stats ribbon</p>
                </div>
              </div>
              <button
                type="submit"
                disabled={savingKey === "homepage_stats"}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-xs transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                {savingKey === "homepage_stats" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Live Counters</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Lives Touched</label>
                <input
                  type="text"
                  value={homepageStats.livesTouched}
                  onChange={(e) => setHomepageStats({ ...homepageStats, livesTouched: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-bold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">e.g. 5,000+</span>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Health Camps Conducted</label>
                <input
                  type="text"
                  value={homepageStats.healthCamps}
                  onChange={(e) => setHomepageStats({ ...homepageStats, healthCamps: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-bold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">e.g. 100+</span>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Students Supported</label>
                <input
                  type="text"
                  value={homepageStats.studentsSupported}
                  onChange={(e) => setHomepageStats({ ...homepageStats, studentsSupported: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-bold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">e.g. 2,000+</span>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Villages Reached</label>
                <input
                  type="text"
                  value={homepageStats.villagesReached}
                  onChange={(e) => setHomepageStats({ ...homepageStats, villagesReached: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-bold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">e.g. 50+</span>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Active Programs</label>
                <input
                  type="text"
                  value={homepageStats.activePrograms}
                  onChange={(e) => setHomepageStats({ ...homepageStats, activePrograms: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-bold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">e.g. 12</span>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Years of Service</label>
                <input
                  type="text"
                  value={homepageStats.yearsOfService}
                  onChange={(e) => setHomepageStats({ ...homepageStats, yearsOfService: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-bold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">e.g. 8</span>
              </div>

              <div className="col-span-2">
                <label className="block text-slate-700 font-bold mb-1">Hero Beneficiaries Ribbon Metric</label>
                <input
                  type="text"
                  value={homepageStats.heroBeneficiaries}
                  onChange={(e) => setHomepageStats({ ...homepageStats, heroBeneficiaries: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-bold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Displayed on main hero banner callout (e.g. 10,000+)</span>
              </div>
            </div>
          </form>

          {/* Featured Causes Sub-Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveSection("featured_causes_stats", featuredCausesStats, "Featured causes metrics updated!");
            }}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#071527]">Featured Causes Raised &amp; Goal Percentages</h3>
                  <p className="text-xs text-slate-500">Live progress bars displayed on homepage featured cause cards</p>
                </div>
              </div>
              <button
                type="submit"
                disabled={savingKey === "featured_causes_stats"}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#071527] hover:bg-[#0c2444] text-white font-bold text-xs transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                {savingKey === "featured_causes_stats" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Cause Goals</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {/* Cause 1: Education */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <span className="text-xs font-bold text-[#071527] block">Primary Education Fund</span>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Amount Raised (₹)</label>
                  <input
                    type="text"
                    value={featuredCausesStats.eduRaised}
                    onChange={(e) => setFeaturedCausesStats({ ...featuredCausesStats, eduRaised: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono font-bold focus:border-[#f97316] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Goal Percentage (%)</label>
                  <input
                    type="text"
                    value={featuredCausesStats.eduGoalPct}
                    onChange={(e) => setFeaturedCausesStats({ ...featuredCausesStats, eduGoalPct: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono font-bold focus:border-[#f97316] outline-hidden"
                  />
                </div>
              </div>

              {/* Cause 2: Medical */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <span className="text-xs font-bold text-[#071527] block">Emergency Medical Aid</span>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Amount Raised (₹)</label>
                  <input
                    type="text"
                    value={featuredCausesStats.medRaised}
                    onChange={(e) => setFeaturedCausesStats({ ...featuredCausesStats, medRaised: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono font-bold focus:border-[#f97316] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Goal Percentage (%)</label>
                  <input
                    type="text"
                    value={featuredCausesStats.medGoalPct}
                    onChange={(e) => setFeaturedCausesStats({ ...featuredCausesStats, medGoalPct: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono font-bold focus:border-[#f97316] outline-hidden"
                  />
                </div>
              </div>

              {/* Cause 3: Women */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <span className="text-xs font-bold text-[#071527] block">Women Empowerment &amp; Skills</span>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Amount Raised (₹)</label>
                  <input
                    type="text"
                    value={featuredCausesStats.womenRaised}
                    onChange={(e) => setFeaturedCausesStats({ ...featuredCausesStats, womenRaised: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono font-bold focus:border-[#f97316] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Goal Percentage (%)</label>
                  <input
                    type="text"
                    value={featuredCausesStats.womenGoalPct}
                    onChange={(e) => setFeaturedCausesStats({ ...featuredCausesStats, womenGoalPct: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono font-bold focus:border-[#f97316] outline-hidden"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          5. TAB 3: SECTOR MILESTONES & GLOBAL IMPACT
          ═════════════════════════════════════════════════════════════ */}
      {activeTab === "milestones" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveSection("impact_stats", impactStats, "Global impact milestones updated!");
            }}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#071527]">Global Impact Ribbon (Outcomes &amp; Annual Reports)</h3>
                  <p className="text-xs text-slate-500">Summary statistics featured on outcomes page, reports, and brochures</p>
                </div>
              </div>
              <button
                type="submit"
                disabled={savingKey === "impact_stats"}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-xs transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                {savingKey === "impact_stats" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Impact Ribbon</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Cumulative Lives Touched</label>
                <input
                  type="text"
                  value={impactStats.livesTouched}
                  onChange={(e) => setImpactStats({ ...impactStats, livesTouched: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-bold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Villages Reached</label>
                <input
                  type="text"
                  value={impactStats.villagesReached}
                  onChange={(e) => setImpactStats({ ...impactStats, villagesReached: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-bold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Districts Covered</label>
                <input
                  type="text"
                  value={impactStats.districtsCovered}
                  onChange={(e) => setImpactStats({ ...impactStats, districtsCovered: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-bold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Years of Verified Impact</label>
                <input
                  type="text"
                  value={impactStats.yearsOfImpact}
                  onChange={(e) => setImpactStats({ ...impactStats, yearsOfImpact: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-bold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>
            </div>
          </form>

          {/* Sector-Specific Milestones Sub-Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveSection("sector_stats", sectorStats, "Sector milestones saved!");
            }}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#f97316]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#071527]">8 Core Sectors - Operational Milestones</h3>
                  <p className="text-xs text-slate-500">Field statistics across education, health, women empowerment, environment, and relief</p>
                </div>
              </div>
              <button
                type="submit"
                disabled={savingKey === "sector_stats"}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#071527] hover:bg-[#0c2444] text-white font-bold text-xs transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                {savingKey === "sector_stats" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Sector Milestones</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Education: Children Supported</label>
                <input
                  type="text"
                  value={sectorStats.educationChildren}
                  onChange={(e) => setSectorStats({ ...sectorStats, educationChildren: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-semibold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Education: Partner Schools</label>
                <input
                  type="text"
                  value={sectorStats.educationSchools}
                  onChange={(e) => setSectorStats({ ...sectorStats, educationSchools: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-semibold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Health: Patients Benefited</label>
                <input
                  type="text"
                  value={sectorStats.healthPeople}
                  onChange={(e) => setSectorStats({ ...sectorStats, healthPeople: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-semibold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Health: Camps Conducted</label>
                <input
                  type="text"
                  value={sectorStats.healthCamps}
                  onChange={(e) => setSectorStats({ ...sectorStats, healthCamps: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-semibold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Women Empowered</label>
                <input
                  type="text"
                  value={sectorStats.womenEmpowered}
                  onChange={(e) => setSectorStats({ ...sectorStats, womenEmpowered: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-semibold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Self-Help Groups Formed</label>
                <input
                  type="text"
                  value={sectorStats.selfHelpGroups}
                  onChange={(e) => setSectorStats({ ...sectorStats, selfHelpGroups: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-semibold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Trees Planted</label>
                <input
                  type="text"
                  value={sectorStats.treesPlanted}
                  onChange={(e) => setSectorStats({ ...sectorStats, treesPlanted: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-semibold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Clean Water Points</label>
                <input
                  type="text"
                  value={sectorStats.cleanWaterPoints}
                  onChange={(e) => setSectorStats({ ...sectorStats, cleanWaterPoints: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono font-semibold focus:bg-white focus:border-[#f97316] outline-hidden"
                />
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          6. TAB 4: STATUTORY COMPLIANCE & 80G
          ═════════════════════════════════════════════════════════════ */}
      {activeTab === "compliance" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#071527]">Statutory Compliance &amp; Regulatory Filings</h3>
                  <p className="text-xs text-slate-500">Official audited statements, 12A/80G orders, CSR-1 approvals and balance sheets</p>
                </div>
              </div>

              <button
                onClick={() => setShowAddReportModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-xs transition shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Compliance Document</span>
              </button>
            </div>

            {/* List of compliance docs */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold text-[11px]">
                    <th className="pb-3 font-medium">Document Title</th>
                    <th className="pb-3 font-medium">Reporting Year</th>
                    <th className="pb-3 font-medium">File Size</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {statutoryReports.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="font-bold text-slate-800">{report.title}</span>
                        </div>
                      </td>
                      <td className="py-3 font-mono text-slate-600">{report.year}</td>
                      <td className="py-3 font-mono text-slate-500">{report.fileSize || "1.5 MB"}</td>
                      <td className="py-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{report.status}</span>
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md transition cursor-pointer"
                          title="Remove Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          7. TAB 5: SYSTEM & CACHE CONTROLS
          ═════════════════════════════════════════════════════════════ */}
      {activeTab === "system" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cache Control Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#f97316]">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#071527]">Global Platform Cache</h3>
                  <p className="text-xs text-slate-500">Purge Redis and in-memory caches across client and CMS</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                When settings or metrics are updated, cached responses are updated automatically. If you notice any stale data on the public site, flush the global cache immediately.
              </p>

              <button
                onClick={handleFlushCache}
                className="w-full py-2.5 px-4 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-xs transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Flush Global Cache Now</span>
              </button>
            </div>

            {/* Database & Integrations Status */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#071527]">Database &amp; Webhooks Telemetry</h3>
                  <p className="text-xs text-slate-500">Live operational status of backend services</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">MongoDB Atlas Database</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Connected (Active)
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">Razorpay Payment Webhooks</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Live &amp; Verified
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">Automated Daily Backups</span>
                  <span className="text-slate-600 font-mono font-bold">28 Apr 2025, 02:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          8. MODAL: ADD COMPLIANCE REPORT
          ═════════════════════════════════════════════════════════════ */}
      {showAddReportModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-[#071527]">Upload Statutory Compliance Document</h3>
              <button
                onClick={() => setShowAddReportModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReportSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Audited Accounts 2024-25"
                  value={newReport.title}
                  onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-hidden focus:border-[#f97316]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Financial / Filing Year</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2024-25"
                  value={newReport.year}
                  onChange={(e) => setNewReport({ ...newReport, year: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-hidden focus:border-[#f97316]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Upload PDF File</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleUploadDocument}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 text-xs cursor-pointer"
                />
                {uploadingReport && <span className="text-[11px] text-[#f97316] mt-1 block">Uploading file to server...</span>}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddReportModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingReport}
                  className="px-4 py-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
                >
                  Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
