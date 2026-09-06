import { useState, useMemo } from "react";
import {
  Users,
  Search,
  CheckCircle2,
  Award,
  ArrowRight,
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Building2,
  Heart,
  Target,
  Sprout,
  Sparkles,
  GraduationCap,
  HeartPulse,
  Briefcase,
  Scale,
  Leaf,
  Megaphone,
  HandHeart,
  Layers,
  Check,
  CircleDollarSign,
  TrendingUp,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import type { RoleType } from "@/components/forms/RoleFormModal";
import plantingTreeImg from "@/assets/vision2047/planting-tree.webp";

interface MemberRecord {
  id: string;
  name: string;
  category: "Blue" | "Yellow" | "Green";
  categoryLabel: string;
  district: string;
  status: "Active" | "Inactive";
  validTill: string;
}

const MEMBERS_DATA: MemberRecord[] = [
  {
    id: "IWF-BL-2025-001",
    name: "Md. Aftab Alam",
    category: "Blue",
    categoryLabel: "Blue Member",
    district: "Darbhanga",
    status: "Active",
    validTill: "30 Apr 2026",
  },
  {
    id: "IWF-BL-2025-002",
    name: "Nazia Parveen",
    category: "Blue",
    categoryLabel: "Blue Member",
    district: "Madhubani",
    status: "Active",
    validTill: "14 Apr 2026",
  },
  {
    id: "IWF-YL-2025-001",
    name: "Shabana Khatoon",
    category: "Yellow",
    categoryLabel: "Yellow Member",
    district: "Darbhanga",
    status: "Active",
    validTill: "09 May 2026",
  },
  {
    id: "IWF-GR-2025-001",
    name: "Md. Irfan Alam",
    category: "Green",
    categoryLabel: "Green Member",
    district: "Samastipur",
    status: "Active",
    validTill: "19 Apr 2026",
  },
  {
    id: "IWF-GR-2025-002",
    name: "Hope Foundation",
    category: "Green",
    categoryLabel: "Green Member",
    district: "Patna",
    status: "Active",
    validTill: "21 May 2026",
  },
  {
    id: "IWF-BL-2025-003",
    name: "Javed Akhtar",
    category: "Blue",
    categoryLabel: "Blue Member",
    district: "Muzaffarpur",
    status: "Active",
    validTill: "11 Jun 2026",
  },
  {
    id: "IWF-YL-2025-002",
    name: "Dr. Amaan Siddiqui",
    category: "Yellow",
    categoryLabel: "Yellow Member",
    district: "Patna",
    status: "Active",
    validTill: "15 Jul 2026",
  },
  {
    id: "IWF-GR-2025-003",
    name: "Rehana Parveen",
    category: "Green",
    categoryLabel: "Green Member",
    district: "Saharsa",
    status: "Active",
    validTill: "01 Aug 2026",
  },
];

const PLATINUM_DONORS = [
  {
    name: "Md. Irfan Alam",
    amount: "₹1,20,000",
    district: "Darbhanga, Bihar",
    sector: "Education Support",
  },
  {
    name: "XYZ Foundation",
    amount: "₹1,00,000",
    district: "New Delhi, India",
    sector: "Healthcare Support",
  },
  {
    name: "Dr. Amaan Siddiqui",
    amount: "₹60,000",
    district: "Muzaffarpur, Bihar",
    sector: "Education Support",
  },
];

const GOLD_DONORS = [
  {
    name: "Shabana Khatoon",
    amount: "₹75,000",
    district: "Madhubani, Bihar",
    sector: "Women Empowerment",
  },
  {
    name: "Nazia Parveen",
    amount: "₹35,000",
    district: "Darbhanga, Bihar",
    sector: "Education Support",
  },
  {
    name: "Aftab Alam Foundation",
    amount: "₹25,000",
    district: "Purnia, Bihar",
    sector: "Community Welfare",
  },
];

const SILVER_DONORS = [
  { name: "Md. Aftab Alam", amount: "₹15,000", district: "Darbhanga, Bihar" },
  { name: "Rukhsana Begum", amount: "₹10,000", district: "Madhubani, Bihar" },
  { name: "Javed Akhtar", amount: "₹9,000", district: "Samastipur, Bihar" },
  { name: "Hope Foundation", amount: "₹8,000", district: "Patna, Bihar" },
];

export default function MembersDonorsPage() {
  const [activeCategoryTab, setActiveCategoryTab] = useState<"All" | "Blue" | "Yellow" | "Green">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  const filteredMembers = useMemo(() => {
    return MEMBERS_DATA.filter((m) => {
      const matchTab = activeCategoryTab === "All" || m.category === activeCategoryTab;
      const matchSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.district.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [activeCategoryTab, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-brand-orange/20 selection:text-[#0b1f3b]">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* ─── Hero Section (Split Banner) ────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[#0b1f3b] via-[#0f284e] to-[#0b1f3b] text-white py-12 md:py-16 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Col (Text & CTAs) */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#f97316] mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#f97316]" />
                  PEOPLE WHO MAKE THE MISSION POSSIBLE
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                  MEMBERS <span className="text-[#38bdf8]">&</span> DONORS
                </h1>
                <p className="text-sm md:text-base font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
                  <span>Different Ways to Contribute. One Shared Purpose.</span>
                  <span className="text-base">🌿</span>
                </p>
              </div>

              <div className="space-y-3 text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
                <p>
                  <strong className="text-white font-semibold">ISLAH</strong> is built on a simple belief: lasting social change is a collective responsibility.
                </p>
                <p>
                  Our members contribute through participation, time, knowledge, skills and engagement. Our donors provide financial support that helps turn ideas and programmes into practical opportunities for communities.
                </p>
                <p>
                  Together, they form an important part of the ISLAH ecosystem—helping us advance education, healthcare, empowerment, livelihoods, social justice, agriculture, environmental sustainability and humanitarian action.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="/membership"
                  className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white font-extrabold text-xs md:text-sm px-6 py-3 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 uppercase tracking-wider"
                >
                  <Users className="w-4 h-4" />
                  <span>BECOME A MEMBER</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/donate"
                  className="inline-flex items-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-extrabold text-xs md:text-sm px-6 py-3 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 uppercase tracking-wider"
                >
                  <Heart className="w-4 h-4" />
                  <span>DONATE NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Col (Visual & 4 Feature Pillars) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src={plantingTreeImg}
                  alt="Nurturing community growth"
                  className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f3b] via-[#0b1f3b]/50 to-transparent" />
                
                {/* 4 Feature Cards Overlaid */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-black/40 backdrop-blur-md p-2.5 rounded-xl border border-white/15">
                    <div className="text-center p-1.5">
                      <Users className="w-5 h-5 mx-auto text-[#38bdf8] mb-1" />
                      <div className="text-[11px] font-black text-white leading-tight">Stronger</div>
                      <div className="text-[9px] text-slate-300 font-medium">Together</div>
                    </div>
                    <div className="text-center p-1.5">
                      <Target className="w-5 h-5 mx-auto text-emerald-400 mb-1" />
                      <div className="text-[11px] font-black text-white leading-tight">Shared</div>
                      <div className="text-[9px] text-slate-300 font-medium">Purpose</div>
                    </div>
                    <div className="text-center p-1.5">
                      <Sprout className="w-5 h-5 mx-auto text-[#f97316] mb-1" />
                      <div className="text-[11px] font-black text-white leading-tight">Sustainable</div>
                      <div className="text-[9px] text-slate-300 font-medium">Impact</div>
                    </div>
                    <div className="text-center p-1.5">
                      <Award className="w-5 h-5 mx-auto text-amber-400 mb-1" />
                      <div className="text-[11px] font-black text-white leading-tight">Better Future</div>
                      <div className="text-[9px] text-slate-300 font-medium">for All</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="space-y-16 py-12 px-4 md:px-8 max-w-7xl mx-auto">
        {/* ─── Section: BECOME A MEMBER (Intro Callout) ────────────────────── */}
        <ScrollReveal>
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold shrink-0 shadow-xs">
                <Users className="w-6 h-6" />
              </div>
              <div className="space-y-2 flex-1">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#15803d]">
                    JOIN OUR COMMUNITY
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0b1f3b] tracking-tight">
                    BECOME A MEMBER
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-slate-500">
                    Membership Is More Than Association
                  </p>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  An ISLAH membership is an opportunity to become part of a community committed to empowering people, strengthening livelihoods and building resilient communities. Members may participate in appropriate programmes, campaigns, volunteering, mentoring, awareness activities and other organisational initiatives according to their interests, skills and membership category.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Section: MEMBERSHIP CATEGORIES (Supporting Tiers) ───────────── */}
        <section className="space-y-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <span className="text-xs font-black uppercase tracking-widest text-[#0284c7]">
                MEMBERSHIP CATEGORIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b1f3b] tracking-tight">
                Supporting Membership Tiers
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Choose a tier that matches your passion for participation, volunteering, and community impact.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Blue Card - Community Member */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-blue-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-blue-50 pb-4">
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-blue-600">
                        COMMUNITY MEMBER
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-[#0b1f3b]">
                        Blue Card Member
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-black text-xs shadow-xs">
                      BL
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-blue-700">
                      ₹2,500 <span className="text-xs font-normal text-slate-500">/ Year</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium">
                      Connect • Participate • Belong
                    </p>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>Recognition as Supporting Member of ISLAH</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>Participation in selected awareness programs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>Engagement in community volunteer drives</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <a
                    href="/membership"
                    className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-sm hover:shadow-md"
                  >
                    Apply Blue Card
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Yellow Card - Contributing Member */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-amber-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-50 pb-4">
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-amber-600">
                        CONTRIBUTING MEMBER
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-[#0b1f3b]">
                        Yellow Card Member
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-black text-xs shadow-xs">
                      YL
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-amber-700">
                      ₹4,000 <span className="text-xs font-normal text-slate-500">/ Year</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium">
                      Contribute • Collaborate • Create Impact
                    </p>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Recognition for active contribution & engagement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Participation in program-level activities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Collaboration opportunities in community initiatives</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <a
                    href="/membership"
                    className="block text-center w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-sm hover:shadow-md"
                  >
                    Apply Yellow Card
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Green Card - Patron Member */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-emerald-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-emerald-50 pb-4">
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
                        PATRON MEMBER
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-[#0b1f3b]">
                        Green Card Member
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-black text-xs shadow-xs">
                      GR
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-700">
                      ₹6,000 <span className="text-xs font-normal text-slate-500">/ Year</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium">
                      Support • Sustain • Strengthen
                    </p>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Special recognition as Key Supporter of ISLAH</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Invitation to major programs & special events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Opportunity to contribute ideas & support initiatives</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <a
                    href="/membership"
                    className="block text-center w-full bg-[#15803d] hover:bg-[#166534] text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-sm hover:shadow-md"
                  >
                    Apply Green Card
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── Section: MEMBER DIRECTORY (Table & Filters) ─────────────────── */}
        <section className="space-y-6">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#f97316]">
                  MEMBER DIRECTORY
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0b1f3b] tracking-tight">
                  Recent Joined Supporting Members
                </h2>
              </div>

              {/* Stats Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-black">
                <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 shadow-2xs">
                  Total: 127
                </span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-200 shadow-2xs">
                  Blue: 48
                </span>
                <span className="bg-amber-50 text-amber-800 px-3 py-1.5 rounded-lg border border-amber-200 shadow-2xs">
                  Yellow: 42
                </span>
                <span className="bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200 shadow-2xs">
                  Green: 37
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Filter Bar & Search */}
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-xs border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {(["All", "Blue", "Yellow", "Green"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCategoryTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategoryTab === tab
                      ? "bg-[#0b1f3b] text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {tab === "All" ? "All Members" : `${tab} Members`}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, ID or district..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-orange focus:bg-white transition"
              />
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] uppercase font-black text-slate-600 tracking-wider">
                    <th className="p-4">Member ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">District</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Valid Till</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-mono font-bold text-[#0b1f3b]">{m.id}</td>
                        <td className="p-4 font-bold text-slate-900">{m.name}</td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold ${
                              m.category === "Blue"
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : m.category === "Yellow"
                                ? "bg-amber-50 text-amber-800 border border-amber-200"
                                : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            }`}
                          >
                            {m.categoryLabel}
                          </span>
                        </td>
                        <td className="p-4 text-slate-600">{m.district}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            {m.status}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500 font-mono">{m.validTill}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500 text-xs">
                        No members found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Section: OUR DONORS (Intro Callout) ─────────────────────────── */}
        <ScrollReveal>
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold shrink-0 shadow-xs">
                <Heart className="w-6 h-6 text-brand-orange" />
              </div>
              <div className="space-y-2 flex-1">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#f97316]">
                    PHILANTHROPY & STEWARDSHIP
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0b1f3b] tracking-tight">
                    OUR DONORS
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-slate-500">
                    Those Who Turn Resources Into Possibilities
                  </p>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  A donation is more than a financial contribution. <strong className="text-slate-900">It is an expression of trust.</strong> Our donors help ISLAH mobilise resources for programmes and initiatives addressing real community needs—from education and healthcare to livelihoods, empowerment, social justice, environmental action and humanitarian support. We are committed to treating every contribution as a responsibility entrusted to us and to maintaining appropriate standards of transparency, accountability and responsible stewardship.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Section: JOIN US - Become a Donor (4 Tier Cards) ────────────── */}
        <section className="space-y-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <span className="text-xs font-black uppercase tracking-widest text-[#0b1f3b]">
                JOIN US
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b1f3b] tracking-tight">
                Become a Donor
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Join hands with us and make a difference in the lives of many.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Platinum Donor */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-6 border-2 border-slate-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-800">
                    <Award className="w-5 h-5 text-[#0b1f3b]" />
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-[#0b1f3b]">
                        PLATINUM DONOR
                      </h4>
                      <p className="text-[10px] text-slate-500 font-semibold">Substantial support</p>
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-[#0b1f3b]">
                    ₹50,000 & Above
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Platinum Donors provide substantial support towards ISLAH's mission and may help strengthen larger programmes, campaigns and community development initiatives.
                  </p>
                  <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 font-medium">
                    <strong className="text-slate-700">Recognition:</strong> Platinum-level donor recognition, subject to applicable policies and donor consent.
                  </p>
                </div>
                <div className="pt-4 mt-3">
                  <a
                    href="/donate"
                    className="block text-center w-full bg-[#0b1f3b] hover:bg-[#163a69] text-white font-extrabold text-xs py-2.5 rounded-xl transition shadow-sm"
                  >
                    Become a Platinum Donor →
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Gold Donor */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-6 border-2 border-amber-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-amber-700">
                        GOLD DONOR
                      </h4>
                      <p className="text-[10px] text-slate-500 font-semibold">Significant support</p>
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-amber-700">
                    ₹20,000 – ₹49,999
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Gold Donors make significant contributions that help ISLAH sustain and expand meaningful programme activities across target communities.
                  </p>
                  <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 font-medium">
                    <strong className="text-slate-700">Recognition:</strong> Gold-level donor recognition, subject to applicable policies and donor consent.
                  </p>
                </div>
                <div className="pt-4 mt-3">
                  <a
                    href="/donate"
                    className="block text-center w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs py-2.5 rounded-xl transition shadow-sm"
                  >
                    Become a Gold Donor →
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Silver Donor */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-blue-700">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-blue-700">
                        SILVER DONOR
                      </h4>
                      <p className="text-[10px] text-slate-500 font-semibold">Contributing Support</p>
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-blue-700">
                    ₹5,000 – ₹19,999
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Silver Donors contribute towards the resources required to implement community-focused programmes and grassroots welfare initiatives.
                  </p>
                  <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 font-medium">
                    <strong className="text-slate-700">Recognition:</strong> Silver-level donor recognition, subject to applicable policies and donor consent.
                  </p>
                </div>
                <div className="pt-4 mt-3">
                  <a
                    href="/donate"
                    className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-2.5 rounded-xl transition shadow-sm"
                  >
                    Become a Silver Donor →
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* General Donor */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-6 border-2 border-emerald-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <HandHeart className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-emerald-700">
                        GENERAL DONOR
                      </h4>
                      <p className="text-[10px] text-slate-500 font-semibold">Below ₹5,000</p>
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-700">
                    Below ₹5,000
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every contribution matters. General Donors represent the broad community of individuals who choose to support ISLAH according to their means.
                  </p>
                  <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 font-medium">
                    <strong className="text-slate-700">Recognition:</strong> General-level donor recognition, subject to applicable policies and consent.
                  </p>
                </div>
                <div className="pt-4 mt-3">
                  <a
                    href="/donate"
                    className="block text-center w-full bg-[#15803d] hover:bg-[#166534] text-white font-extrabold text-xs py-2.5 rounded-xl transition shadow-sm"
                  >
                    Donate Now →
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── Section: GENEROUS CONTRIBUTIONS (Top Featured Donors) ───────── */}
        <section className="space-y-6">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-[#f97316]">
                GENEROUS CONTRIBUTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b1f3b] tracking-tight">
                Top Featured Donors
              </h2>
            </div>
          </ScrollReveal>

          {/* Platinum Tier List */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Award className="w-4 h-4 text-slate-700" />
              <span>PLATINUM DONORS (₹50,000 & ABOVE)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PLATINUM_DONORS.map((d, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1 hover:border-slate-300 transition">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    Platinum
                  </span>
                  <h4 className="font-bold text-[#0b1f3b] text-base">{d.name}</h4>
                  <div className="text-lg font-black text-[#15803d]">{d.amount}</div>
                  <div className="text-xs text-slate-500">{d.district} • {d.sector}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gold Tier List */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-700 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>GOLD DONORS (₹20,000 – ₹49,999)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {GOLD_DONORS.map((d, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-xs space-y-1 hover:border-amber-300 transition">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800">
                    Gold
                  </span>
                  <h4 className="font-bold text-[#0b1f3b] text-base">{d.name}</h4>
                  <div className="text-lg font-black text-amber-700">{d.amount}</div>
                  <div className="text-xs text-slate-500">{d.district} • {d.sector}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Silver Tier List */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>SILVER DONORS (₹5,000 – ₹19,999)</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SILVER_DONORS.map((d, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    Silver
                  </span>
                  <h4 className="font-bold text-[#0b1f3b] text-sm">{d.name}</h4>
                  <div className="text-sm font-black text-slate-800">{d.amount}</div>
                  <div className="text-[11px] text-slate-500">{d.district}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section: WHERE YOUR SUPPORT CAN MAKE A DIFFERENCE & 5 CAMPAIGNS ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 8 Areas of Work */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#15803d]">
                <Layers className="w-3.5 h-3.5 text-[#15803d]" />
                IMPACT DIMENSIONS
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#0b1f3b] mt-1">
                WHERE YOUR SUPPORT CAN MAKE A DIFFERENCE
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your membership participation or donation may contribute, subject to applicable programme requirements, to:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: GraduationCap,
                  title: "Education & Learning",
                  desc: "Creating opportunities for children, students and young people.",
                  color: "text-blue-600 bg-blue-50 border-blue-200",
                },
                {
                  icon: HeartPulse,
                  title: "Healthcare & Well-being",
                  desc: "Supporting healthcare access, awareness and critical assistance.",
                  color: "text-rose-600 bg-rose-50 border-rose-200",
                },
                {
                  icon: Users,
                  title: "Women & Youth Empowerment",
                  desc: "Creating opportunities for confidence, skills and participation.",
                  color: "text-pink-600 bg-pink-50 border-pink-200",
                },
                {
                  icon: Briefcase,
                  title: "Skills, Livelihoods & Enterprise",
                  desc: "Supporting employability, entrepreneurship and sustainable income.",
                  color: "text-amber-600 bg-amber-50 border-amber-200",
                },
                {
                  icon: Scale,
                  title: "Social Justice & Legal Rights",
                  desc: "Promoting awareness of rights and facilitating appropriate access to legal support.",
                  color: "text-indigo-600 bg-indigo-50 border-indigo-200",
                },
                {
                  icon: Sprout,
                  title: "Agriculture & Rural Livelihoods",
                  desc: "Supporting farmers, soil health and resilient rural economies.",
                  color: "text-emerald-600 bg-emerald-50 border-emerald-200",
                },
                {
                  icon: Leaf,
                  title: "Environment & Sustainability",
                  desc: "Building environmentally responsible and resilient green communities.",
                  color: "text-teal-600 bg-teal-50 border-teal-200",
                },
                {
                  icon: Megaphone,
                  title: "Humanitarian Relief",
                  desc: "Supporting vulnerable people and communities during difficult circumstances.",
                  color: "text-orange-600 bg-orange-50 border-orange-200",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                    <div className={`w-8 h-8 rounded-lg border ${item.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Five Flagship Campaigns */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between h-full space-y-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#f97316]">
                <Target className="w-3.5 h-3.5 text-[#f97316]" />
                FLAGSHIP INITIATIVES
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#0b1f3b] mt-1">
                SUPPORT OUR FIVE CAMPAIGNS
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your contribution can directly power ISLAH's five core thematic campaigns:
              </p>
            </div>

            <div className="space-y-2.5 flex-1 flex flex-col justify-between">
              {[
                {
                  name: "Shiksha Na Ruke",
                  desc: "Keeping education continuous with school kits, fees & remedial learning.",
                  bg: "bg-emerald-50 text-emerald-900 border-emerald-200",
                  tag: "bg-emerald-600 text-white",
                  icon: "📚",
                },
                {
                  name: "Har Pal Anmol Hai",
                  desc: "Emergency healthcare support & medical aid when treatment cannot wait.",
                  bg: "bg-rose-50 text-rose-900 border-rose-200",
                  tag: "bg-rose-600 text-white",
                  icon: "❤️",
                },
                {
                  name: "Pari Ki Udaan",
                  desc: "Higher education, digital skills & opportunities for girls and women.",
                  bg: "bg-pink-50 text-pink-900 border-pink-200",
                  tag: "bg-pink-600 text-white",
                  icon: "✈️",
                },
                {
                  name: "Swabhimaan",
                  desc: "Dignity, self-reliance, micro-enterprises & livelihood toolkits.",
                  bg: "bg-amber-50 text-amber-900 border-amber-200",
                  tag: "bg-amber-600 text-white",
                  icon: "🤝",
                },
                {
                  name: "Taiyyari Kal Ki",
                  desc: "Youth career readiness, vocational training & future livelihood skills.",
                  bg: "bg-teal-50 text-teal-900 border-teal-200",
                  tag: "bg-teal-700 text-white",
                  icon: "🌱",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-2.5 border ${c.bg} flex items-center gap-3 transition-all hover:shadow-xs`}
                >
                  <span className="text-xl shrink-0">{c.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-extrabold text-xs text-[#0b1f3b]">{c.name}</h5>
                      <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${c.tag}`}>
                        Active
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug mt-0.5">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <a
                href="/programs"
                className="block text-center w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-extrabold text-xs py-3 rounded-xl transition shadow-sm uppercase tracking-wider"
              >
                Explore Our Campaigns →
              </a>
            </div>
          </div>

        </section>

        {/* ─── Section: FROM PEOPLE TO POSSIBILITY (Flow Banner) ───────────── */}
        <ScrollReveal>
          <div className="bg-gradient-to-r from-slate-900 via-[#0b1f3b] to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-white/10 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                TRANSFORMATION PIPELINE
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                FROM PEOPLE TO POSSIBILITY
              </h3>
              <p className="text-xs text-slate-300">
                Our model connects resources, action, and community ownership for lasting impact.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 text-center border border-white/15 flex flex-col items-center justify-between">
                <Users className="w-6 h-6 text-[#38bdf8] mb-1.5" />
                <div>
                  <h5 className="font-black text-xs text-white">Members</h5>
                  <p className="text-[10px] text-slate-300 mt-0.5">Time • Skills • Knowledge</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 text-center border border-white/15 flex flex-col items-center justify-between">
                <Heart className="w-6 h-6 text-rose-400 mb-1.5" />
                <div>
                  <h5 className="font-black text-xs text-white">Donors</h5>
                  <p className="text-[10px] text-slate-300 mt-0.5">Resources • Trust</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 text-center border border-white/15 flex flex-col items-center justify-between">
                <Building2 className="w-6 h-6 text-amber-400 mb-1.5" />
                <div>
                  <h5 className="font-black text-xs text-white">ISLAH</h5>
                  <p className="text-[10px] text-slate-300 mt-0.5">Programmes • Action</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 text-center border border-white/15 flex flex-col items-center justify-between">
                <Sprout className="w-6 h-6 text-emerald-400 mb-1.5" />
                <div>
                  <h5 className="font-black text-xs text-white">Communities</h5>
                  <p className="text-[10px] text-slate-300 mt-0.5">Education • Health</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 text-center border border-white/15 flex flex-col items-center justify-between">
                <Award className="w-6 h-6 text-yellow-300 mb-1.5" />
                <div>
                  <h5 className="font-black text-xs text-white">Capability</h5>
                  <p className="text-[10px] text-slate-300 mt-0.5">Dignity & Resilience</p>
                </div>
              </div>

              <div className="bg-emerald-600/30 backdrop-blur-md rounded-xl p-3.5 text-center border border-emerald-400/40 flex flex-col items-center justify-between">
                <Target className="w-6 h-6 text-emerald-300 mb-1.5" />
                <div>
                  <h5 className="font-black text-xs text-emerald-300">Lasting Impact</h5>
                  <p className="text-[10px] text-slate-200 mt-0.5">Sustainable Social Change</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Section: YOU CAN BE BOTH (Dual CTA Callout) ─────────────────── */}
        <ScrollReveal>
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl p-6 sm:p-8 border-2 border-emerald-200/80 shadow-xs">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="space-y-1.5 max-w-2xl">
                <span className="text-xs font-black uppercase tracking-widest text-[#15803d]">
                  COLLECTIVE EMPOWERMENT
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0b1f3b] tracking-tight">
                  YOU CAN BE BOTH
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  Membership and donation are not mutually exclusive. A member may also become a donor, and a donor may choose to become a member.
                </p>
                <div className="pt-1 text-xs font-bold text-[#15803d] flex items-center justify-center md:justify-start gap-1">
                  <span>Participation + Philanthropy = Stronger Collective Action</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <a
                  href="/membership"
                  className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-sm transition uppercase tracking-wider"
                >
                  <Users className="w-4 h-4" />
                  <span>BECOME A MEMBER</span>
                </a>
                <a
                  href="/donate"
                  className="inline-flex items-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-sm transition uppercase tracking-wider"
                >
                  <Heart className="w-4 h-4" />
                  <span>DONATE NOW</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}

