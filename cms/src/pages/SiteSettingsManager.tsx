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
        </div>
      )}
    </div>
  );
}
