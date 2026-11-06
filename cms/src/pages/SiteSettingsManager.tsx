import { useState, useEffect } from "react";
import { api } from "../services/api";
import {
  Activity,
  PhoneCall,
  Save,
  Loader2,
  RefreshCw,
  Sparkles,
  MapPin,
  Mail,
  Building,
  Info,
  Users2,
  PieChart,
  BookOpen,
  Heart,
  Sprout,
  TreePine,
  GraduationCap,
  Droplets,
  Flame,
  CheckCircle2,
  Share2,
  FileText,
  Download,
  Plus,
  Trash2,
  ExternalLink,
  Upload,
  FileCheck,
} from "lucide-react";
import { toast } from "sonner";

export default function SiteSettingsManager() {
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  // 1. Homepage & Hero Live Counters
  const [homepageStats, setHomepageStats] = useState({
    livesTouched: "5,000+",
    healthCamps: "100+",
    studentsSupported: "2,000+",
    villagesReached: "50+",
    activePrograms: "12",
    yearsOfService: "8",
    heroBeneficiaries: "10,000+",
  });

  // 2. Global Impact Ribbon (Outcomes, Annual Reports, Global)
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

  // 3. Get Involved Community Mini-Counters
  const [getInvolvedStats, setGetInvolvedStats] = useState({
    lives: "25,000+",
    villages: "120+",
    students: "18,500+",
    volunteers: "5,800+",
  });

  // 4. Featured Causes Raised & Progress Percentages
  const [featuredCausesStats, setFeaturedCausesStats] = useState({
    eduRaised: "1,65,240",
    eduGoalPct: "75",
    medRaised: "2,12,880",
    medGoalPct: "48",
    womenRaised: "1,48,720",
    womenGoalPct: "60",
  });

  // 5. Demographic Beneficiaries Breakdown
  const [demographics, setDemographics] = useState({
    childrenCount: "28,000+",
    womenCount: "21,000+",
    youthCount: "15,000+",
    seniorCitizensCount: "7,000+",
  });

  // 6. Sector-Specific Milestones (All 7 Pillars)
  const [sectorStats, setSectorStats] = useState({
    educationChildren: "8,000+",
    educationSchools: "120+",
    enrollmentRate: "95%",
    healthPeople: "6,000+",
    healthCamps: "85+",
    womenEmpowered: "4,000+",
    selfHelpGroups: "200+",
    youthTrained: "3,500+",
    youthPlacedRate: "70%",
    treesPlanted: "15,000+",
    farmersSupported: "2,500+",
    waterProjects: "50+",
    reliefFamilies: "12,000+",
    reliefDrives: "30+",
    foodRationKits: "45,000+",
    cleanWaterPoints: "80+",
    householdToilets: "250+",
    cleanWaterPeople: "15,000+",
  });

  // 7. Contact, Helplines & Headquarters
  const [contactInfo, setContactInfo] = useState({
    primaryPhone: "+91 94314 00000",
    helplinePhone: "+91 94314 11111",
    whatsappNumber: "+91 94314 00000",
    primaryEmail: "info@iwfindia.org",
    emergencyEmail: "emergency@iwfindia.org",
    darbhangaOffice: "Islah Welfare Foundation, Near Tower Chowk, Darbhanga, Bihar - 846004",
    delhiOffice: "New Delhi Liaison Office, India",
  });

  // 8. Official Social Media Channels & WhatsApp Direct
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://www.facebook.com/islahindia/",
    twitter: "https://x.com/islahindia/",
    instagram: "https://www.instagram.com/islahindia/",
    linkedin: "https://www.linkedin.com/in/islahindia/",
    youtube: "https://www.youtube.com/channel/UC5sty9L25QQwC89JwGmEIVw/",
    whatsapp: "https://wa.me/919811861633",
  });

  // 9. Statutory Reports & Compliance Documents
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
    { id: "rep-1", title: "Annual Report", year: "2023-24", status: "Available", fileUrl: "/policies", fileSize: "2.4 MB" },
    { id: "rep-2", title: "Audited Financial Statements", year: "2023-24", status: "Available", fileUrl: "/policies", fileSize: "1.8 MB" },
    { id: "rep-3", title: "Income & Expenditure Statement", year: "2023-24", status: "Available", fileUrl: "/policies", fileSize: "950 KB" },
    { id: "rep-4", title: "Balance Sheet", year: "2023-24", status: "Available", fileUrl: "/policies", fileSize: "1.2 MB" },
    { id: "rep-5", title: "Audit Report", year: "2023-24", status: "Available", fileUrl: "/policies", fileSize: "3.1 MB" },
    { id: "rep-6", title: "12A/80G Order", year: "2021-22", status: "Available", fileUrl: "/policies", fileSize: "680 KB" },
  ]);

  const [uploadingReportId, setUploadingReportId] = useState<string | null>(null);
  const [showAddReport, setShowAddReport] = useState(false);
  const [newReport, setNewReport] = useState({
    title: "",
    year: "2023-24",
    status: "Available",
    fileUrl: "",
    fileSize: "",
  });

  // 10. Media Hub Reach Metrics (/media page)
  const [mediaHubStats, setMediaHubStats] = useState({
    fieldEvents: "120+",
    newsBulletins: "250+",
    livesReached: "50,000+",
    publications: "18+",
    visualStories: "500+",
  });

  // 11. Visual Archive & Gallery Ribbon Stats (/media/gallery page)
  const [galleryStats, setGalleryStats] = useState({
    fieldPhotos: "500+",
    videoStories: "35+",
    districtsCovered: "15+",
    realImpact: "100%",
  });

  // 12. Annual Reports & Document Archive (/media/annual-reports page)
  const [annualReportsData, setAnnualReportsData] = useState({
    statsRibbon: {
      livesImpacted: "50,000+",
      villagesCovered: "300+",
      ongoingPrograms: "25+",
      partnersSupporters: "100+",
      yearsOfImpact: "10+",
    },
    aboutText:
      "Our Annual Reports provide a comprehensive overview of our programs, achievements, challenges, and financial performance. They reflect our commitment to transparency, good governance, and accountability to our donors, partners, and communities.",
    reports: [
      { id: "ar-2023-24", year: "2023-24", title: "Annual Report 2023-24", summary: "A year of growth, impact, and community transformation.", fileSize: "6.5 MB", pdfUrl: "/docs/islah_report.pdf", cover: "" },
      { id: "ar-2022-23", year: "2022-23", title: "Annual Report 2022-23", summary: "Strengthening communities and creating sustainable opportunities.", fileSize: "5.8 MB", pdfUrl: "/docs/islah_report.pdf", cover: "" },
      { id: "ar-2021-22", year: "2021-22", title: "Annual Report 2021-22", summary: "Empowering lives through inclusive and sustainable development.", fileSize: "5.2 MB", pdfUrl: "/docs/islah_report.pdf", cover: "" },
      { id: "ar-2020-21", year: "2020-21", title: "Annual Report 2020-21", summary: "Working together for stronger, healthier, and self-reliant communities.", fileSize: "4.9 MB", pdfUrl: "/docs/islah_report.pdf", cover: "" },
      { id: "ar-2019-20", year: "2019-20", title: "Annual Report 2019-20", summary: "Expanding reach. Enriching lives. Building a better tomorrow.", fileSize: "4.4 MB", pdfUrl: "/docs/islah_report.pdf", cover: "" },
      { id: "ar-2018-19", year: "2018-19", title: "Annual Report 2018-19", summary: "Promoting health, education, and livelihoods in rural communities.", fileSize: "4.1 MB", pdfUrl: "/docs/islah_report.pdf", cover: "" },
      { id: "ar-2017-18", year: "2017-18", title: "Annual Report 2017-18", summary: "Small steps, big impact towards sustainable development.", fileSize: "3.7 MB", pdfUrl: "/docs/islah_report.pdf", cover: "" },
      { id: "ar-2016-17", year: "2016-17", title: "Annual Report 2016-17", summary: "Laying the foundation for empowered and resilient communities.", fileSize: "3.2 MB", pdfUrl: "/docs/islah_report.pdf", cover: "" },
    ],
  });

  // 11. Outcomes & Impact Deep Analytics (/media/outcomes page)
  const [outcomesSettings, setOutcomesSettings] = useState({
    totalCumulativeImpact: "71,000+",
    growthNote: "Consistent growth, deeper reach, greater impact. Every year, we reach more lives and build stronger communities.",
    beneficiaryQuote: "These numbers are not just statistics; they represent real people, real stories, and real change. Together, we can create an even greater impact in the years to come.",
    quoteText: "The change we see today is the result of collective effort, commitment, and compassion. Together, we are creating stronger, healthier, and self-reliant communities.",
    quoteAuthor: "Islah Welfare Foundation",
    reachVillages: "300+",
    reachDistricts: "15+",
    reachStates: "5 States",
    reachStateList: "Bihar (Darbhanga, Madhubani, Samastipur), Delhi NCR, Uttar Pradesh, Jharkhand, West Bengal",
    growthHistory: [
      { year: "2016-17", value: "8K", heightPct: 18 },
      { year: "2017-18", value: "12K", heightPct: 26 },
      { year: "2018-19", value: "16K", heightPct: 34 },
      { year: "2019-20", value: "26K", heightPct: 48 },
      { year: "2020-21", value: "34K", heightPct: 60 },
      { year: "2021-22", value: "42K", heightPct: 70 },
      { year: "2022-23", value: "55K", heightPct: 84 },
      { year: "2023-24", value: "71K", heightPct: 100 },
    ],
    themes: [
      { name: "Education & Child Development", count: "8,000+", percentage: 16, color: "#2563eb" },
      { name: "Healthcare & Wellness", count: "6,000+", percentage: 12, color: "#059669" },
      { name: "Livelihood & Skill Development", count: "5,500+", percentage: 11, color: "#d97706" },
      { name: "Women Empowerment", count: "4,000+", percentage: 8, color: "#db2777" },
      { name: "Agriculture & Livelihood", count: "2,500+", percentage: 5, color: "#16a34a" },
      { name: "Environment & Sustainability", count: "15,000+", percentage: 30, color: "#0d9488" },
      { name: "Community Development", count: "35,000+", percentage: 18, color: "#7c3aed" },
    ],
  });

  const loadSettings = (force = false) => {
    setLoading(true);
    api.getSettings({ force }).then((res) => {
      if (res.success && res.data) {
        if (res.data.homepage_stats) {
          setHomepageStats((prev) => ({ ...prev, ...res.data.homepage_stats }));
        }
        if (res.data.impact_stats) {
          setImpactStats((prev) => ({ ...prev, ...res.data.impact_stats }));
        }
        if (res.data.getinvolved_stats) {
          setGetInvolvedStats((prev) => ({ ...prev, ...res.data.getinvolved_stats }));
        }
        if (res.data.featured_causes_stats) {
          setFeaturedCausesStats((prev) => ({ ...prev, ...res.data.featured_causes_stats }));
        }
        if (res.data.demographic_stats) {
          setDemographics((prev) => ({ ...prev, ...res.data.demographic_stats }));
        }
        if (res.data.sector_stats) {
          setSectorStats((prev) => ({ ...prev, ...res.data.sector_stats }));
        }
        if (res.data.contact_info) {
          setContactInfo((prev) => ({ ...prev, ...res.data.contact_info }));
        }
        if (res.data.social_links) {
          setSocialLinks((prev) => ({ ...prev, ...res.data.social_links }));
        }
        if (res.data.statutory_reports?.reports) {
          setStatutoryReports(res.data.statutory_reports.reports);
        }
        if (res.data.media_hub_stats) {
          setMediaHubStats((prev) => ({ ...prev, ...res.data.media_hub_stats }));
        }
        if (res.data.gallery_stats) {
          setGalleryStats((prev) => ({ ...prev, ...res.data.gallery_stats }));
        }
        if (res.data.annual_reports_data) {
          const ar = res.data.annual_reports_data;
          setAnnualReportsData((prev) => ({
            ...prev,
            ...ar,
            statsRibbon: {
              ...prev.statsRibbon,
              ...(ar.statsRibbon || {}),
            },
            aboutText: ar.sidebar?.aboutText || ar.aboutText || prev.aboutText,
            reports: ar.reports || prev.reports,
          }));
        }
        if (res.data.outcomes_settings) {
          const os = res.data.outcomes_settings;
          setOutcomesSettings((prev) => ({
            ...prev,
            totalCumulativeImpact: os.totalCumulativeImpact || prev.totalCumulativeImpact,
            growthNote: os.growthNote || prev.growthNote,
            beneficiaryQuote: os.beneficiaryQuote || prev.beneficiaryQuote,
            quoteText: os.quoteText || prev.quoteText,
            quoteAuthor: os.quoteAuthor || prev.quoteAuthor,
            reachVillages: os.reach?.villages || prev.reachVillages,
            reachDistricts: os.reach?.districts || prev.reachDistricts,
            reachStates: os.reach?.states || prev.reachStates,
            reachStateList: os.reach?.stateList ? os.reach.stateList.join(", ") : prev.reachStateList,
            growthHistory: os.growthHistory || prev.growthHistory,
            themes: os.themes || prev.themes,
          }));
        }
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadSettings(false);
  }, []);

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

  const handleUploadReportFile = async (file: File, reportIndex?: number) => {
    setUploadingReportId(reportIndex !== undefined ? String(reportIndex) : "new");
    try {
      const res = await api.uploadSingleFile(file);
      if (res.success && res.file?.url) {
        const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
        if (reportIndex !== undefined) {
          const updated = [...statutoryReports];
          updated[reportIndex].fileUrl = res.file.url;
          updated[reportIndex].fileSize = sizeStr;
          setStatutoryReports(updated);
          handleSaveSection("statutory_reports", { reports: updated }, "Report file uploaded and updated!");
        } else {
          setNewReport((prev) => ({ ...prev, fileUrl: res.file!.url, fileSize: sizeStr }));
          toast.success("Document uploaded successfully!");
        }
      } else {
        toast.error(res.message || "Failed to upload document.");
      }
    } catch (e: any) {
      toast.error(e.message || "Upload error");
    } finally {
      setUploadingReportId(null);
    }
  };

  const handleDeleteReport = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this compliance report?")) return;
    const updated = statutoryReports.filter((r) => r.id !== id);
    setStatutoryReports(updated);
    handleSaveSection("statutory_reports", { reports: updated }, "Statutory report deleted.");
  };

  const handleAddReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.title.trim()) {
      toast.error("Document title is required.");
      return;
    }
    const item = {
      id: `rep-${Date.now()}`,
      title: newReport.title.trim(),
      year: newReport.year.trim() || "2023-24",
      status: newReport.status || "Available",
      fileUrl: newReport.fileUrl.trim() || "/policies",
      fileSize: newReport.fileSize.trim() || "PDF",
    };
    const updated = [...statutoryReports, item];
    setStatutoryReports(updated);
    handleSaveSection("statutory_reports", { reports: updated }, "New statutory report added!");
    setNewReport({ title: "", year: "2023-24", status: "Available", fileUrl: "", fileSize: "" });
    setShowAddReport(false);
  };

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>Site Impact Numbers &amp; Global Stats Engine</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              Live Global Synchronization
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Centrally control every impact metric, milestone counter, sector achievement, campaign goal, and official contact phone across the entire website.
          </p>
        </div>
        <button
          onClick={() => loadSettings(true)}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition cursor-pointer disabled:opacity-50 self-start sm:self-auto"
          title="Bypass cache and sync live with MongoDB"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-emerald-400" : ""}`} />
          <span>Sync from Database</span>
        </button>
      </div>

      {/* Info Notice */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs flex items-start gap-3">
        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mt-0.5 shrink-0">
          <Info className="w-4 h-4" />
        </div>
        <div className="text-slate-400">
          <h4 className="font-bold text-white mb-0.5">Centralized Single-Point-of-Truth</h4>
          <p>
            Whenever you change any metric below and click Save, the changes are written directly to MongoDB. The frontend consumes these values in real-time via the <code className="text-emerald-400 bg-slate-950 px-1 py-0.5 rounded">useSiteSettings()</code> hook.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-16 text-slate-400 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
          <p className="text-xs">Fetching current site settings from database...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* ── 1. Homepage Hero & Animated Live Counters ── */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveSection("homepage_stats", homepageStats, "Homepage live counters updated successfully!");
            }}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">1. Homepage Hero &amp; Animated Live Counters</h3>
                  <p className="text-[11px] text-slate-400">Controls the interactive animated counters on the Homepage and Hero banner</p>
                </div>
              </div>
              <button
                type="submit"
                disabled={savingKey === "homepage_stats"}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
              >
                {savingKey === "homepage_stats" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save Homepage Stats</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Lives Touched</label>
                <input
                  type="text"
                  value={homepageStats.livesTouched}
                  onChange={(e) => setHomepageStats({ ...homepageStats, livesTouched: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500">e.g. 5,000+</span>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Health Camps</label>
                <input
                  type="text"
                  value={homepageStats.healthCamps}
                  onChange={(e) => setHomepageStats({ ...homepageStats, healthCamps: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500">e.g. 100+</span>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Students Supported</label>
                <input
                  type="text"
                  value={homepageStats.studentsSupported}
                  onChange={(e) => setHomepageStats({ ...homepageStats, studentsSupported: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500">e.g. 2,000+</span>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Villages Reached</label>
                <input
                  type="text"
                  value={homepageStats.villagesReached}
                  onChange={(e) => setHomepageStats({ ...homepageStats, villagesReached: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500">e.g. 50+</span>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Active Programs</label>
                <input
                  type="text"
                  value={homepageStats.activePrograms}
                  onChange={(e) => setHomepageStats({ ...homepageStats, activePrograms: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500">e.g. 12</span>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Years of Service</label>
                <input
                  type="text"
                  value={homepageStats.yearsOfService}
                  onChange={(e) => setHomepageStats({ ...homepageStats, yearsOfService: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500">e.g. 8</span>
              </div>
              <div className="col-span-2">
                <label className="block text-slate-300 font-bold mb-1">Hero Beneficiaries Ribbon Metric</label>
                <input
                  type="text"
                  value={homepageStats.heroBeneficiaries}
                  onChange={(e) => setHomepageStats({ ...homepageStats, heroBeneficiaries: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500">e.g. 10,000+ (Hero bar rightmost column)</span>
              </div>
            </div>
          </form>

          {/* ── 2. Core Milestones (Outcomes Ribbon & Global) ── */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveSection("impact_stats", impactStats, "Core impact milestones updated successfully!");
            }}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">2. Global Impact Ribbon (Outcomes &amp; Annual Reports)</h3>
                  <p className="text-[11px] text-slate-400">Used across Outcomes &amp; Impact, Annual Reports, and institutional summaries</p>
                </div>
              </div>
              <button
                type="submit"
                disabled={savingKey === "impact_stats"}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
              >
                {savingKey === "impact_stats" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save Ribbon Numbers</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Lives Touched</label>
                <input
                  type="text"
                  value={impactStats.livesTouched}
                  onChange={(e) => setImpactStats({ ...impactStats, livesTouched: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Villages Reached</label>
                <input
                  type="text"
                  value={impactStats.villagesReached}
                  onChange={(e) => setImpactStats({ ...impactStats, villagesReached: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Districts Covered</label>
                <input
                  type="text"
                  value={impactStats.districtsCovered}
                  onChange={(e) => setImpactStats({ ...impactStats, districtsCovered: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Ongoing Programs</label>
                <input
                  type="text"
                  value={impactStats.ongoingPrograms}
                  onChange={(e) => setImpactStats({ ...impactStats, ongoingPrograms: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Community Volunteers</label>
                <input
                  type="text"
                  value={impactStats.volunteersCount}
                  onChange={(e) => setImpactStats({ ...impactStats, volunteersCount: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Partners &amp; Supporters</label>
                <input
                  type="text"
                  value={impactStats.partnersCount}
                  onChange={(e) => setImpactStats({ ...impactStats, partnersCount: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Years of Impact</label>
                <input
                  type="text"
                  value={impactStats.yearsOfImpact}
                  onChange={(e) => setImpactStats({ ...impactStats, yearsOfImpact: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Total Cumulative Impact</label>
                <input
                  type="text"
                  value={impactStats.totalCumulativeImpact}
                  onChange={(e) => setImpactStats({ ...impactStats, totalCumulativeImpact: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </form>

          {/* ── 3. Get Involved & Featured Causes Counters ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Get Involved Mini-Counters */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveSection("getinvolved_stats", getInvolvedStats, "Get Involved counters updated!");
              }}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-5"
            >
              <div>
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800 mb-4">
                  <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <Users2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">3. 'Get Involved' Mini-Counters</h3>
                    <p className="text-[11px] text-slate-400">Displayed in the volunteer enrollment &amp; role card section</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Lives</label>
                    <input
                      type="text"
                      value={getInvolvedStats.lives}
                      onChange={(e) => setGetInvolvedStats({ ...getInvolvedStats, lives: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Villages</label>
                    <input
                      type="text"
                      value={getInvolvedStats.villages}
                      onChange={(e) => setGetInvolvedStats({ ...getInvolvedStats, villages: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Students</label>
                    <input
                      type="text"
                      value={getInvolvedStats.students}
                      onChange={(e) => setGetInvolvedStats({ ...getInvolvedStats, students: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Volunteers</label>
                    <input
                      type="text"
                      value={getInvolvedStats.volunteers}
                      onChange={(e) => setGetInvolvedStats({ ...getInvolvedStats, volunteers: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  disabled={savingKey === "getinvolved_stats"}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
                >
                  {savingKey === "getinvolved_stats" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Get Involved Stats</span>
                </button>
              </div>
            </form>

            {/* Featured Causes Progress */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveSection("featured_causes_stats", featuredCausesStats, "Featured causes progress updated!");
              }}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-5"
            >
              <div>
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800 mb-4">
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">4. Featured Causes Progress &amp; Amounts</h3>
                    <p className="text-[11px] text-slate-400">Controls amounts raised and percent progress bars on Homepage</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Child Edu Raised (₹)</label>
                    <input
                      type="text"
                      value={featuredCausesStats.eduRaised}
                      onChange={(e) => setFeaturedCausesStats({ ...featuredCausesStats, eduRaised: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Child Edu Goal %</label>
                    <input
                      type="text"
                      value={featuredCausesStats.eduGoalPct}
                      onChange={(e) => setFeaturedCausesStats({ ...featuredCausesStats, eduGoalPct: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Medical Raised (₹)</label>
                    <input
                      type="text"
                      value={featuredCausesStats.medRaised}
                      onChange={(e) => setFeaturedCausesStats({ ...featuredCausesStats, medRaised: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Medical Goal %</label>
                    <input
                      type="text"
                      value={featuredCausesStats.medGoalPct}
                      onChange={(e) => setFeaturedCausesStats({ ...featuredCausesStats, medGoalPct: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Women Emp Raised (₹)</label>
                    <input
                      type="text"
                      value={featuredCausesStats.womenRaised}
                      onChange={(e) => setFeaturedCausesStats({ ...featuredCausesStats, womenRaised: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Women Goal %</label>
                    <input
                      type="text"
                      value={featuredCausesStats.womenGoalPct}
                      onChange={(e) => setFeaturedCausesStats({ ...featuredCausesStats, womenGoalPct: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  disabled={savingKey === "featured_causes_stats"}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
                >
                  {savingKey === "featured_causes_stats" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Causes Progress</span>
                </button>
              </div>
            </form>
          </div>

          {/* ── 5. Demographic Breakdown & 7 Sector Pillars ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Demographics Card */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveSection("demographic_stats", demographics, "Demographic beneficiaries updated!");
              }}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-5 lg:col-span-1"
            >
              <div>
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800 mb-4">
                  <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                    <PieChart className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">5. Demographic Breakdown</h3>
                    <p className="text-[11px] text-slate-400">Beneficiary distribution on Outcomes page</p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Children (0-18 yrs)</label>
                    <input
                      type="text"
                      value={demographics.childrenCount}
                      onChange={(e) => setDemographics({ ...demographics, childrenCount: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Women &amp; Adolescent Girls</label>
                    <input
                      type="text"
                      value={demographics.womenCount}
                      onChange={(e) => setDemographics({ ...demographics, womenCount: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Youth &amp; Young Adults</label>
                    <input
                      type="text"
                      value={demographics.youthCount}
                      onChange={(e) => setDemographics({ ...demographics, youthCount: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Senior Citizens &amp; Elders</label>
                    <input
                      type="text"
                      value={demographics.seniorCitizensCount}
                      onChange={(e) => setDemographics({ ...demographics, seniorCitizensCount: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  disabled={savingKey === "demographic_stats"}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
                >
                  {savingKey === "demographic_stats" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Demographics</span>
                </button>
              </div>
            </form>

            {/* 7 Key Sector Focus Pillars */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveSection("sector_stats", sectorStats, "All 7 sector focus metrics updated live!");
              }}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-5 lg:col-span-2"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">6. Sector Achievements (All 7 Pillars)</h3>
                      <p className="text-[11px] text-slate-400">Education, Health, Women SHGs, Skilling, Trees, Relief &amp; Water</p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={savingKey === "sector_stats"}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
                  >
                    {savingKey === "sector_stats" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    <span>Save Sector Stats</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Education: Children</label>
                    <input
                      type="text"
                      value={sectorStats.educationChildren}
                      onChange={(e) => setSectorStats({ ...sectorStats, educationChildren: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Education: Schools</label>
                    <input
                      type="text"
                      value={sectorStats.educationSchools}
                      onChange={(e) => setSectorStats({ ...sectorStats, educationSchools: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Enrollment Rate</label>
                    <input
                      type="text"
                      value={sectorStats.enrollmentRate}
                      onChange={(e) => setSectorStats({ ...sectorStats, enrollmentRate: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Health: People Helped</label>
                    <input
                      type="text"
                      value={sectorStats.healthPeople}
                      onChange={(e) => setSectorStats({ ...sectorStats, healthPeople: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Health: Camps Held</label>
                    <input
                      type="text"
                      value={sectorStats.healthCamps}
                      onChange={(e) => setSectorStats({ ...sectorStats, healthCamps: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Women Empowered</label>
                    <input
                      type="text"
                      value={sectorStats.womenEmpowered}
                      onChange={(e) => setSectorStats({ ...sectorStats, womenEmpowered: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Self-Help Groups (SHGs)</label>
                    <input
                      type="text"
                      value={sectorStats.selfHelpGroups}
                      onChange={(e) => setSectorStats({ ...sectorStats, selfHelpGroups: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Youth Trained</label>
                    <input
                      type="text"
                      value={sectorStats.youthTrained}
                      onChange={(e) => setSectorStats({ ...sectorStats, youthTrained: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Placement Rate</label>
                    <input
                      type="text"
                      value={sectorStats.youthPlacedRate}
                      onChange={(e) => setSectorStats({ ...sectorStats, youthPlacedRate: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Trees Planted</label>
                    <input
                      type="text"
                      value={sectorStats.treesPlanted}
                      onChange={(e) => setSectorStats({ ...sectorStats, treesPlanted: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Farmers Supported</label>
                    <input
                      type="text"
                      value={sectorStats.farmersSupported}
                      onChange={(e) => setSectorStats({ ...sectorStats, farmersSupported: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Solar/Water Projects</label>
                    <input
                      type="text"
                      value={sectorStats.waterProjects}
                      onChange={(e) => setSectorStats({ ...sectorStats, waterProjects: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Relief & WASH extensions */}
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Relief Families Helped</label>
                    <input
                      type="text"
                      value={sectorStats.reliefFamilies || "12,000+"}
                      onChange={(e) => setSectorStats({ ...sectorStats, reliefFamilies: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Food / Ration Kits</label>
                    <input
                      type="text"
                      value={sectorStats.foodRationKits || "45,000+"}
                      onChange={(e) => setSectorStats({ ...sectorStats, foodRationKits: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">WASH: Water Points</label>
                    <input
                      type="text"
                      value={sectorStats.cleanWaterPoints || "80+"}
                      onChange={(e) => setSectorStats({ ...sectorStats, cleanWaterPoints: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* ── 7. Helpline & Contact Numbers ── */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveSection("contact_info", contactInfo, "Helplines and physical addresses updated live!");
            }}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-5"
          >
            <div>
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800 mb-5">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">7. Official Helplines &amp; Headquarters Addresses</h3>
                  <p className="text-[11px] text-slate-400">Emergency lines, WhatsApp desks, official email &amp; HQ address across footers and modals</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Primary Office Phone</label>
                    <input
                      type="text"
                      value={contactInfo.primaryPhone}
                      onChange={(e) => setContactInfo({ ...contactInfo, primaryPhone: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Emergency Medical Helpline</label>
                    <input
                      type="text"
                      value={contactInfo.helplinePhone}
                      onChange={(e) => setContactInfo({ ...contactInfo, helplinePhone: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">WhatsApp Support Number</label>
                    <input
                      type="text"
                      value={contactInfo.whatsappNumber}
                      onChange={(e) => setContactInfo({ ...contactInfo, whatsappNumber: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">General Inquiries Email</label>
                    <input
                      type="email"
                      value={contactInfo.primaryEmail}
                      onChange={(e) => setContactInfo({ ...contactInfo, primaryEmail: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Darbhanga Headquarters Address</label>
                  <input
                    type="text"
                    value={contactInfo.darbhangaOffice}
                    onChange={(e) => setContactInfo({ ...contactInfo, darbhangaOffice: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">New Delhi Liaison Office</label>
                  <input
                    type="text"
                    value={contactInfo.delhiOffice}
                    onChange={(e) => setContactInfo({ ...contactInfo, delhiOffice: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                disabled={savingKey === "contact_info"}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
              >
                {savingKey === "contact_info" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Contacts &amp; Helplines</span>
              </button>
            </div>
          </form>

          {/* ── 8. Official Social Media Channels & WhatsApp Direct ── */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveSection("social_links", socialLinks, "Social channels updated live across the entire website!");
            }}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">8. Official Social Media Channels &amp; WhatsApp Direct</h3>
                  <p className="text-[11px] text-slate-400">
                    Controls links across the floating sidebar, footer badges, and contact touchpoints
                  </p>
                </div>
              </div>
              <button
                type="submit"
                disabled={savingKey === "social_links"}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
              >
                {savingKey === "social_links" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save Social Links</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1 flex items-center justify-between">
                  <span>Facebook Page</span>
                  {socialLinks.facebook && (
                    <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="text-[10px] text-blue-400 hover:underline inline-flex items-center gap-0.5">
                      Test <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </label>
                <input
                  type="url"
                  value={socialLinks.facebook}
                  onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                  placeholder="https://facebook.com/..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 flex items-center justify-between">
                  <span>Twitter / X Profile</span>
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="text-[10px] text-sky-400 hover:underline inline-flex items-center gap-0.5">
                      Test <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </label>
                <input
                  type="url"
                  value={socialLinks.twitter}
                  onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                  placeholder="https://x.com/..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 flex items-center justify-between">
                  <span>Instagram Profile</span>
                  {socialLinks.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="text-[10px] text-pink-400 hover:underline inline-flex items-center gap-0.5">
                      Test <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </label>
                <input
                  type="url"
                  value={socialLinks.instagram}
                  onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                  placeholder="https://instagram.com/..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 flex items-center justify-between">
                  <span>LinkedIn Profile / Page</span>
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-[10px] text-blue-400 hover:underline inline-flex items-center gap-0.5">
                      Test <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </label>
                <input
                  type="url"
                  value={socialLinks.linkedin}
                  onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 flex items-center justify-between">
                  <span>YouTube Channel</span>
                  {socialLinks.youtube && (
                    <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="text-[10px] text-red-400 hover:underline inline-flex items-center gap-0.5">
                      Test <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </label>
                <input
                  type="url"
                  value={socialLinks.youtube}
                  onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                  placeholder="https://youtube.com/..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 flex items-center justify-between">
                  <span>WhatsApp Direct Chat Link</span>
                  {socialLinks.whatsapp && (
                    <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="text-[10px] text-emerald-400 hover:underline inline-flex items-center gap-0.5">
                      Test <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </label>
                <input
                  type="text"
                  value={socialLinks.whatsapp}
                  onChange={(e) => setSocialLinks({ ...socialLinks, whatsapp: e.target.value })}
                  placeholder="https://wa.me/91..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </form>

          {/* ── 9. Statutory Reports & Public Compliance Documents ── */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">9. Statutory Reports &amp; Public Compliance Documents</h3>
                  <p className="text-[11px] text-slate-400">
                    PDF disclosures shown publicly on{" "}
                    <a href="https://iwf-delta.vercel.app/about/legal-status" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">
                      /about/legal-status <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddReport(!showAddReport)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showAddReport ? "Close Form" : "Add New Document"}</span>
                </button>
              </div>
            </div>

            {/* Inline Add Document Form */}
            {showAddReport && (
              <form onSubmit={handleAddReport} className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-3 animate-in fade-in duration-150">
                <div className="text-xs font-bold text-purple-400 uppercase tracking-wide">
                  Add New Compliance Document
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Document Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Annual Report 2024-25"
                      value={newReport.title}
                      onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Financial Year</label>
                    <input
                      type="text"
                      placeholder="e.g. 2024-25"
                      value={newReport.year}
                      onChange={(e) => setNewReport({ ...newReport, year: e.target.value })}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Status</label>
                    <select
                      value={newReport.status}
                      onChange={(e) => setNewReport({ ...newReport, status: e.target.value })}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-purple-500"
                    >
                      <option value="Available">Available</option>
                      <option value="Under Audit">Under Audit</option>
                      <option value="Upon Request">Upon Request</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">PDF File URL or Upload</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="https://... or upload PDF below"
                        value={newReport.fileUrl}
                        onChange={(e) => setNewReport({ ...newReport, fileUrl: e.target.value })}
                        className="flex-1 p-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-purple-500"
                      />
                      <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer border border-slate-700 flex items-center gap-1.5 shrink-0">
                        {uploadingReportId === "new" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                        <span>Upload PDF</span>
                        <input
                          type="file"
                          accept=".pdf,application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUploadReportFile(file);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">File Size Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. 2.4 MB"
                      value={newReport.fileSize}
                      onChange={(e) => setNewReport({ ...newReport, fileSize: e.target.value })}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddReport(false)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Add Document
                  </button>
                </div>
              </form>
            )}

            {/* Reports List Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <th className="p-3">Document Title</th>
                    <th className="p-3 w-32">Year</th>
                    <th className="p-3 w-32">Status</th>
                    <th className="p-3 w-36">Size</th>
                    <th className="p-3 text-right w-44">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {statutoryReports.map((report, idx) => (
                    <tr key={report.id || idx} className="hover:bg-slate-800/30 transition">
                      <td className="p-3 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                          <span>{report.title}</span>
                        </div>
                      </td>
                      <td className="p-3 font-mono text-slate-400">{report.year}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 font-bold text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          {report.status}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-slate-400">
                        {report.fileSize || "PDF"}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {report.fileUrl && (
                            <a
                              href={report.fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                              title="View Document"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <label
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-400 hover:text-purple-300 transition cursor-pointer"
                            title="Replace / Upload PDF"
                          >
                            {uploadingReportId === String(idx) ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Upload className="w-3.5 h-3.5" />
                            )}
                            <input
                              type="file"
                              accept=".pdf,application/pdf"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleUploadReportFile(file, idx);
                              }}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => handleDeleteReport(report.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition cursor-pointer"
                            title="Delete Report"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 10. Media Hub Reach Metrics (/media page) ── */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveSection("media_hub_stats", mediaHubStats, "Media Hub reach numbers updated successfully!");
            }}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">10. Media Hub Reach Metrics (/media page)</h3>
                  <p className="text-[11px] text-slate-400">
                    Controls the 5 key reach badges displayed at the top of{" "}
                    <a href="https://iwf-delta.vercel.app/media" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">
                      /media <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>
              </div>
              <button
                type="submit"
                disabled={savingKey === "media_hub_stats"}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
              >
                {savingKey === "media_hub_stats" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save Media Hub Stats</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Field Events</label>
                <input
                  type="text"
                  value={mediaHubStats.fieldEvents}
                  onChange={(e) => setMediaHubStats({ ...mediaHubStats, fieldEvents: e.target.value })}
                  placeholder="120+"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500">Across 15+ rural districts</span>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">News &amp; Bulletins</label>
                <input
                  type="text"
                  value={mediaHubStats.newsBulletins}
                  onChange={(e) => setMediaHubStats({ ...mediaHubStats, newsBulletins: e.target.value })}
                  placeholder="250+"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500">Dispatches & coverage</span>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Lives Reached</label>
                <input
                  type="text"
                  value={mediaHubStats.livesReached}
                  onChange={(e) => setMediaHubStats({ ...mediaHubStats, livesReached: e.target.value })}
                  placeholder="50,000+"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500">Direct beneficiary impact</span>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Publications</label>
                <input
                  type="text"
                  value={mediaHubStats.publications}
                  onChange={(e) => setMediaHubStats({ ...mediaHubStats, publications: e.target.value })}
                  placeholder="18+"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500">Research & whitepapers</span>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Visual Stories</label>
                <input
                  type="text"
                  value={mediaHubStats.visualStories}
                  onChange={(e) => setMediaHubStats({ ...mediaHubStats, visualStories: e.target.value })}
                  placeholder="500+"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500">Archived field documentation</span>
              </div>
            </div>
          </form>

          {/* ── 11. Outcomes & Impact Deep Analytics (/media/outcomes page) ── */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const payload = {
                totalCumulativeImpact: outcomesSettings.totalCumulativeImpact,
                growthNote: outcomesSettings.growthNote,
                beneficiaryQuote: outcomesSettings.beneficiaryQuote,
                quoteText: outcomesSettings.quoteText,
                quoteAuthor: outcomesSettings.quoteAuthor,
                reach: {
                  villages: outcomesSettings.reachVillages,
                  districts: outcomesSettings.reachDistricts,
                  states: outcomesSettings.reachStates,
                  stateList: outcomesSettings.reachStateList
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                },
                growthHistory: outcomesSettings.growthHistory,
                themes: outcomesSettings.themes,
              };
              handleSaveSection("outcomes_settings", payload, "Outcomes & Impact page metrics updated successfully!");
            }}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <PieChart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">11. Outcomes &amp; Impact Analytics (/media/outcomes page)</h3>
                  <p className="text-[11px] text-slate-400">
                    Controls total cumulative impact, geographic reach footprint, year-on-year growth chart, themes, and key quotes on{" "}
                    <a href="https://iwf-delta.vercel.app/media/outcomes" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">
                      /media/outcomes <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>
              </div>
              <button
                type="submit"
                disabled={savingKey === "outcomes_settings"}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
              >
                {savingKey === "outcomes_settings" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save Outcomes Analytics</span>
              </button>
            </div>

            {/* Geographic Reach & Total Impact */}
            <div>
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">Geographic Reach &amp; Cumulative Figures</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Total Cumulative Impact</label>
                  <input
                    type="text"
                    value={outcomesSettings.totalCumulativeImpact}
                    onChange={(e) => setOutcomesSettings({ ...outcomesSettings, totalCumulativeImpact: e.target.value })}
                    placeholder="71,000+"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-slate-500">Theme bar header badge</span>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Reach - Villages</label>
                  <input
                    type="text"
                    value={outcomesSettings.reachVillages}
                    onChange={(e) => setOutcomesSettings({ ...outcomesSettings, reachVillages: e.target.value })}
                    placeholder="300+"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-slate-500">Geographic card #1</span>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Reach - Districts</label>
                  <input
                    type="text"
                    value={outcomesSettings.reachDistricts}
                    onChange={(e) => setOutcomesSettings({ ...outcomesSettings, reachDistricts: e.target.value })}
                    placeholder="15+"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-slate-500">Geographic card #2</span>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Reach - Focus States</label>
                  <input
                    type="text"
                    value={outcomesSettings.reachStates}
                    onChange={(e) => setOutcomesSettings({ ...outcomesSettings, reachStates: e.target.value })}
                    placeholder="5 States"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-slate-500">Geographic card #3</span>
                </div>
                <div className="col-span-2 sm:col-span-4">
                  <label className="block text-slate-300 font-bold mb-1">Core Operation Hubs (Comma-separated)</label>
                  <input
                    type="text"
                    value={outcomesSettings.reachStateList}
                    onChange={(e) => setOutcomesSettings({ ...outcomesSettings, reachStateList: e.target.value })}
                    placeholder="Bihar (Darbhanga, Madhubani), Delhi NCR, Uttar Pradesh, Jharkhand, West Bengal"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Inspiring Quotes & Notes */}
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">Key Statements &amp; Quotes</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Growth Trend Note</label>
                  <textarea
                    rows={2}
                    value={outcomesSettings.growthNote}
                    onChange={(e) => setOutcomesSettings({ ...outcomesSettings, growthNote: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Beneficiary Quote</label>
                  <textarea
                    rows={2}
                    value={outcomesSettings.beneficiaryQuote}
                    onChange={(e) => setOutcomesSettings({ ...outcomesSettings, beneficiaryQuote: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Collective Effort Quote</label>
                  <textarea
                    rows={2}
                    value={outcomesSettings.quoteText}
                    onChange={(e) => setOutcomesSettings({ ...outcomesSettings, quoteText: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Quote Attribution / Author</label>
                  <input
                    type="text"
                    value={outcomesSettings.quoteAuthor}
                    onChange={(e) => setOutcomesSettings({ ...outcomesSettings, quoteAuthor: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Year on Year Growth Bar Values */}
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">Year-on-Year Growth Bar Chart Values</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 text-xs">
                {outcomesSettings.growthHistory.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="block text-[11px] font-bold text-slate-400 mb-1">{item.year}</span>
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => {
                        const updated = [...outcomesSettings.growthHistory];
                        updated[idx] = { ...updated[idx], value: e.target.value };
                        setOutcomesSettings({ ...outcomesSettings, growthHistory: updated });
                      }}
                      className="w-full p-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-center text-xs outline-none focus:border-emerald-500 mb-1"
                    />
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <span>Bar%:</span>
                      <input
                        type="number"
                        min="5"
                        max="100"
                        value={item.heightPct}
                        onChange={(e) => {
                          const updated = [...outcomesSettings.growthHistory];
                          updated[idx] = { ...updated[idx], heightPct: Number(e.target.value) || 20 };
                          setOutcomesSettings({ ...outcomesSettings, growthHistory: updated });
                        }}
                        className="w-full p-1 bg-slate-900 border border-slate-700 rounded text-white font-mono text-center text-[10px] outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Themes */}
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">Impact by Theme Breakdown</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                {outcomesSettings.themes.map((theme, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="font-bold text-white text-[11px] truncate" title={theme.name}>{theme.name}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <label className="text-[10px] text-slate-400 block">Count</label>
                        <input
                          type="text"
                          value={theme.count}
                          onChange={(e) => {
                            const updated = [...outcomesSettings.themes];
                            updated[idx] = { ...updated[idx], count: e.target.value };
                            setOutcomesSettings({ ...outcomesSettings, themes: updated });
                          }}
                          className="w-full p-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div className="w-16">
                        <label className="text-[10px] text-slate-400 block">%</label>
                        <input
                          type="number"
                          value={theme.percentage}
                          onChange={(e) => {
                            const updated = [...outcomesSettings.themes];
                            updated[idx] = { ...updated[idx], percentage: Number(e.target.value) || 0 };
                            setOutcomesSettings({ ...outcomesSettings, themes: updated });
                          }}
                          className="w-full p-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>

          {/* ── 12. Visual Archive & Gallery Ribbon Stats (/media/gallery page) ── */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveSection("gallery_stats", galleryStats, "Gallery archive metrics updated successfully!");
            }}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">12. Visual Archive Top Ribbon (/media/gallery page)</h3>
                  <p className="text-[11px] text-slate-400">
                    Controls the 4 metric cards at the top of{" "}
                    <a href="https://iwf-delta.vercel.app/media/gallery" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">
                      /media/gallery <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>
              </div>
              <button
                type="submit"
                disabled={savingKey === "gallery_stats"}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
              >
                {savingKey === "gallery_stats" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save Gallery Ribbon</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Field Photos</label>
                <input
                  type="text"
                  value={galleryStats.fieldPhotos}
                  onChange={(e) => setGalleryStats({ ...galleryStats, fieldPhotos: e.target.value })}
                  placeholder="500+"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500">Verifiable project documentation</span>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Video Stories</label>
                <input
                  type="text"
                  value={galleryStats.videoStories}
                  onChange={(e) => setGalleryStats({ ...galleryStats, videoStories: e.target.value })}
                  placeholder="35+"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500">Grassroots testimonials &amp; documentaries</span>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Districts Covered</label>
                <input
                  type="text"
                  value={galleryStats.districtsCovered}
                  onChange={(e) => setGalleryStats({ ...galleryStats, districtsCovered: e.target.value })}
                  placeholder="15+"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500">Field programs across Bihar &amp; UP</span>
              </div>
              <div>
                <label className="block text-slate-300 font-bold mb-1">Real Impact</label>
                <input
                  type="text"
                  value={galleryStats.realImpact}
                  onChange={(e) => setGalleryStats({ ...galleryStats, realImpact: e.target.value })}
                  placeholder="100%"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500">Authentic on-site community moments</span>
              </div>
            </div>
          </form>

          {/* ── 13. Annual Reports & Document Archive (/media/annual-reports page) ── */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveSection("annual_reports_data", annualReportsData, "Annual Reports data updated successfully!");
            }}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">13. Published Annual Reports &amp; Archive (/media/annual-reports)</h3>
                  <p className="text-[11px] text-slate-400">
                    Controls the 5 top metrics ribbon, about text, and all downloadable annual report PDFs on{" "}
                    <a href="https://iwf-delta.vercel.app/media/annual-reports" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">
                      /media/annual-reports <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>
              </div>
              <button
                type="submit"
                disabled={savingKey === "annual_reports_data"}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
              >
                {savingKey === "annual_reports_data" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save Annual Reports</span>
              </button>
            </div>

            {/* Top 5 Metrics Ribbon */}
            <div>
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">Top Accountability Metrics Ribbon</h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Lives Impacted</label>
                  <input
                    type="text"
                    value={annualReportsData.statsRibbon.livesImpacted}
                    onChange={(e) =>
                      setAnnualReportsData({
                        ...annualReportsData,
                        statsRibbon: { ...annualReportsData.statsRibbon, livesImpacted: e.target.value },
                      })
                    }
                    placeholder="50,000+"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-slate-500">Community initiatives</span>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Villages Covered</label>
                  <input
                    type="text"
                    value={annualReportsData.statsRibbon.villagesCovered}
                    onChange={(e) =>
                      setAnnualReportsData({
                        ...annualReportsData,
                        statsRibbon: { ...annualReportsData.statsRibbon, villagesCovered: e.target.value },
                      })
                    }
                    placeholder="300+"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-slate-500">Rural &amp; underserved</span>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Ongoing Programs</label>
                  <input
                    type="text"
                    value={annualReportsData.statsRibbon.ongoingPrograms}
                    onChange={(e) =>
                      setAnnualReportsData({
                        ...annualReportsData,
                        statsRibbon: { ...annualReportsData.statsRibbon, ongoingPrograms: e.target.value },
                      })
                    }
                    placeholder="25+"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-slate-500">Key focus pillars</span>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Partners &amp; Supporters</label>
                  <input
                    type="text"
                    value={annualReportsData.statsRibbon.partnersSupporters}
                    onChange={(e) =>
                      setAnnualReportsData({
                        ...annualReportsData,
                        statsRibbon: { ...annualReportsData.statsRibbon, partnersSupporters: e.target.value },
                      })
                    }
                    placeholder="100+"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-slate-500">Institutions &amp; CSR</span>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Years of Impact</label>
                  <input
                    type="text"
                    value={annualReportsData.statsRibbon.yearsOfImpact}
                    onChange={(e) =>
                      setAnnualReportsData({
                        ...annualReportsData,
                        statsRibbon: { ...annualReportsData.statsRibbon, yearsOfImpact: e.target.value },
                      })
                    }
                    placeholder="10+"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-slate-500">Track record</span>
                </div>
              </div>
            </div>

            {/* About Our Reports Sidebar Text */}
            <div className="pt-4 border-t border-slate-800">
              <label className="block text-slate-300 font-bold mb-1 text-xs">About Our Reports (Sidebar Overview)</label>
              <textarea
                rows={2}
                value={annualReportsData.aboutText}
                onChange={(e) => setAnnualReportsData({ ...annualReportsData, aboutText: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            {/* Published Annual Reports Table */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Published Annual Reports ({annualReportsData.reports.length})
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    const newId = `ar-${Date.now()}`;
                    setAnnualReportsData({
                      ...annualReportsData,
                      reports: [
                        {
                          id: newId,
                          year: "2024-25",
                          title: "Annual Report 2024-25",
                          summary: "A year of grassroots impact and scalable community transformation.",
                          fileSize: "6.0 MB",
                          pdfUrl: "/docs/islah_report.pdf",
                          cover: "",
                        },
                        ...annualReportsData.reports,
                      ],
                    });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white text-[11px] font-bold transition border border-emerald-500/30 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Report</span>
                </button>
              </div>

              <div className="space-y-3">
                {annualReportsData.reports.map((report, idx) => (
                  <div
                    key={report.id || idx}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">Financial Year</label>
                        <input
                          type="text"
                          value={report.year}
                          onChange={(e) => {
                            const updated = [...annualReportsData.reports];
                            updated[idx] = { ...updated[idx], year: e.target.value };
                            setAnnualReportsData({ ...annualReportsData, reports: updated });
                          }}
                          className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-xs outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-slate-400 block mb-0.5">Report Title</label>
                        <input
                          type="text"
                          value={report.title}
                          onChange={(e) => {
                            const updated = [...annualReportsData.reports];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setAnnualReportsData({ ...annualReportsData, reports: updated });
                          }}
                          className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">File Size</label>
                        <input
                          type="text"
                          value={report.fileSize}
                          onChange={(e) => {
                            const updated = [...annualReportsData.reports];
                            updated[idx] = { ...updated[idx], fileSize: e.target.value };
                            setAnnualReportsData({ ...annualReportsData, reports: updated });
                          }}
                          placeholder="6.5 MB"
                          className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="text-[10px] text-slate-400 block mb-0.5">Summary / Highlight</label>
                        <input
                          type="text"
                          value={report.summary}
                          onChange={(e) => {
                            const updated = [...annualReportsData.reports];
                            updated[idx] = { ...updated[idx], summary: e.target.value };
                            setAnnualReportsData({ ...annualReportsData, reports: updated });
                          }}
                          className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">PDF Link / Document</label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={report.pdfUrl}
                            onChange={(e) => {
                              const updated = [...annualReportsData.reports];
                              updated[idx] = { ...updated[idx], pdfUrl: e.target.value };
                              setAnnualReportsData({ ...annualReportsData, reports: updated });
                            }}
                            className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-[11px] font-mono outline-none focus:border-emerald-500"
                          />
                          <label className="p-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white transition cursor-pointer shrink-0 border border-emerald-500/30">
                            <Upload className="w-3.5 h-3.5" />
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                try {
                                  toast.info(`Uploading ${file.name}...`);
                                  const uploadRes = await api.uploadSingleFile(file);
                                  if (uploadRes.success && uploadRes.file?.url) {
                                    const updated = [...annualReportsData.reports];
                                    const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
                                    updated[idx] = { ...updated[idx], pdfUrl: uploadRes.file.url, fileSize: sizeStr };
                                    setAnnualReportsData({ ...annualReportsData, reports: updated });
                                    toast.success("PDF uploaded successfully!");
                                  } else {
                                    toast.error(uploadRes.message || "Upload failed");
                                  }
                                } catch (err: any) {
                                  toast.error(err.message || "Upload error");
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-900">
                      <a
                        href={report.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition"
                        title="Preview PDF"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = annualReportsData.reports.filter((_, i) => i !== idx);
                          setAnnualReportsData({ ...annualReportsData, reports: updated });
                          toast.info("Report removed (click Save Annual Reports to commit)");
                        }}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition"
                        title="Delete Report"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
