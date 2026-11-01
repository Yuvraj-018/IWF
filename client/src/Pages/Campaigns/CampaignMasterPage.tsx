import { useState, useMemo } from "react";
import {
  Search,
  BookOpen,
  Stethoscope,
  Users,
  Scale,
  Trees,
  ArrowRight,
  Sparkles,
  Heart,
  Award,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Compass,
  Lightbulb,
  Home,
  ChevronRight,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import { ALL_CAMPAIGNS_LIST, type CampaignData } from "@/content/campaigns";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

const CATEGORY_FILTERS = [
  "All Campaigns",
  "Education & Learning",
  "Healthcare & Well-being",
  "Women & Youth Empowerment",
  "Social Justice & Livelihoods",
  "Future Skills & Sustainability",
];

export default function CampaignMasterPage() {
  const [activeCategory, setActiveCategory] = useState("All Campaigns");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  const filteredCampaigns = useMemo(() => {
    return ALL_CAMPAIGNS_LIST.filter((c) => {
      const matchesCategory =
        activeCategory === "All Campaigns" || c.category === activeCategory;
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.motto.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.intro.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased flex flex-col text-slate-800">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* ─── Hero Section with In-Hero Action Buttons ─────────────────── */}
      <SubpageHeroCarousel
        tag="OUR FLAGSHIP INITIATIVES"
        title="Five Pillars of Change"
        subtitle="Five Campaigns. Multiple Pathways. One Shared Purpose. 🌿"
        breadcrumbs={[
          { label: "Our Campaigns" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="/donate"
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
          >
            <span>Donate to a Campaign</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => setActiveModal("partner")}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer backdrop-blur-xs"
          >
            <Heart className="w-4 h-4 text-brand-orange" />
            <span>Partner With Us</span>
          </button>
        </div>
      </SubpageHeroCarousel>

      {/* ─── Search & Filter Toolbar ────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Pillar Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#071527] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:border-[#15803d] focus:ring-1 focus:ring-[#15803d]"
            />
          </div>
        </div>
      </section>

      {/* ─── Main Content: Campaign Cards ──────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
        {/* Campaign Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-5 bg-[#15803d] rounded-full" />
              <span>EXPLORE ALL CAMPAIGNS ({filteredCampaigns.length})</span>
            </h2>
            <span className="text-xs font-bold text-slate-500">
              Showing active ISLAH campaigns
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((c, i) => (
              <ScrollReveal key={c.id}>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 h-full">
                  {/* Card Header & Media */}
                  <div className="space-y-4">
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      <img
                        src={c.heroImage}
                        alt={c.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-slate-900/90 text-emerald-300 border border-white/20 text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                          {c.badge}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="w-8 h-8 rounded-full bg-white/20 text-white border border-white/30 flex items-center justify-center text-xs font-bold backdrop-blur-xs">
                          {c.num}
                        </span>
                      </div>

                      {/* Title over image bottom */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                            {c.name}
                          </h3>
                          {c.hindiName && (
                            <span className="text-xs font-bold text-slate-300">
                              {c.hindiName}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-bold text-emerald-300 mt-0.5">
                          {c.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Body Description & Continuum Preview */}
                    <div className="px-5 space-y-3">
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {c.intro}
                      </p>

                      {/* Continuum Pathway Pills */}
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                          PATHWAY TO CHANGE
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {c.continuumSteps.slice(0, 4).map((step, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center gap-1"
                            >
                              <span className="text-[8px] text-emerald-600">●</span>
                              {step.title}
                            </span>
                          ))}
                          {c.continuumSteps.length > 4 && (
                            <span className="text-[10px] text-slate-400 font-bold">
                              +{c.continuumSteps.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Actions */}
                  <div className="p-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-4 bg-slate-50/50">
                    <a
                      href={`/campaign/${c.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-[#15803d] transition group-hover:translate-x-0.5"
                    >
                      <span>Explore Campaign</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="/donate"
                      className="bg-[#15803d] hover:bg-[#166534] text-white font-bold text-[11px] px-3.5 py-1.5 rounded-lg shadow-xs transition uppercase tracking-wider"
                    >
                      Support Now
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ─── Interconnected Ecosystem Diagram ────────────────────────────── */}
        <ScrollReveal>
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                HOLISTIC ECOSYSTEM
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                How the Five Campaigns Work Together
              </h3>
              <p className="text-xs text-slate-600">
                The real strength of ISLAH is that these campaigns are not isolated silos. They form an interconnected continuum where progress in one multiplies impact in others.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs text-center flex flex-col justify-between hover:shadow-xs transition">
                <div>
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 inline-flex items-center justify-center text-[10px] font-bold mb-1.5">
                    01
                  </span>
                  <h5 className="font-bold text-xs text-slate-900">SHIKSHA NA RUKE</h5>
                  <p className="text-[10px] text-slate-600 mt-1 leading-snug">
                    Create lifelong opportunity through uninterrupted education.
                  </p>
                </div>
                <div className="pt-2 text-emerald-700 text-xs font-semibold">↓ Inspires</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs text-center flex flex-col justify-between hover:shadow-xs transition">
                <div>
                  <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-800 inline-flex items-center justify-center text-[10px] font-bold mb-1.5">
                    02
                  </span>
                  <h5 className="font-bold text-xs text-slate-900">PARI KI UDAAN</h5>
                  <p className="text-[10px] text-slate-600 mt-1 leading-snug">
                    Expand choices, confidence and leadership for girls and young women.
                  </p>
                </div>
                <div className="pt-2 text-pink-700 text-xs font-semibold">↓ Protects</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs text-center flex flex-col justify-between hover:shadow-xs transition">
                <div>
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 inline-flex items-center justify-center text-[10px] font-bold mb-1.5">
                    03
                  </span>
                  <h5 className="font-bold text-xs text-slate-900">HAR PAL ANMOL HAI</h5>
                  <p className="text-[10px] text-slate-600 mt-1 leading-snug">
                    Protect health and human well-being when every second counts.
                  </p>
                </div>
                <div className="pt-2 text-rose-700 text-xs font-semibold">↓ Upholds</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs text-center flex flex-col justify-between hover:shadow-xs transition">
                <div>
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 inline-flex items-center justify-center text-[10px] font-bold mb-1.5">
                    04
                  </span>
                  <h5 className="font-bold text-xs text-slate-900">SWABHIMAAN</h5>
                  <p className="text-[10px] text-slate-600 mt-1 leading-snug">
                    Advance dignity, rights awareness and economic self-reliance.
                  </p>
                </div>
                <div className="pt-2 text-amber-700 text-xs font-semibold">↓ Sustains</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-teal-200 shadow-2xs text-center flex flex-col justify-between hover:shadow-xs transition">
                <div>
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 inline-flex items-center justify-center text-[10px] font-bold mb-1.5">
                    05
                  </span>
                  <h5 className="font-bold text-xs text-slate-900">TAIYYARI KAL KI</h5>
                  <p className="text-[10px] text-slate-600 mt-1 leading-snug">
                    Equip people and rural communities for future resilience and growth.
                  </p>
                </div>
                <div className="pt-2 text-teal-700 text-xs font-semibold">🌿 Ecosystem</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Bottom CTA Banner (Warm Light Callout matching About Us Overview) ─── */}
        <ScrollReveal>
          <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 fill-brand-orange text-brand-orange" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-[#0b1f3b]">
                  Join a Campaign. Champion a Life.
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Partner with ISLAH or sponsor a specific campaign initiative.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="/donate"
                className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider"
              >
                DONATE TO CAMPAIGN →
              </a>
              <button
                onClick={() => setActiveModal("partner")}
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider cursor-pointer"
              >
                PARTNER WITH US →
              </button>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
