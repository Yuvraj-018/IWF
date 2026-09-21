import { useState, useMemo } from "react";
import {
  Search,
  BookOpen,
  Stethoscope,
  Wrench,
  Users,
  Lightbulb,
  Heart,
  Trees,
  Wheat,
  Scale,
  ArrowRight,
  Filter,
  CheckCircle2,
  Home,
  ChevronRight,
} from "lucide-react";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";

import causeEducationImg from "@/assets/cause-education.jpg";
import causeMedicalImg from "@/assets/cause-medical.png";
import causeWomenImg from "@/assets/cause-women.jpg";
import entrepreneurImg from "@/assets/thematic-entrepreneur.jpg";
import environmentImg from "@/assets/thematic-environment.jpg";
import agricultureImg from "@/assets/thematic-agriculture.jpg";
import programsHeroImg from "@/assets/programs-hero.jpg";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

interface ProgramInitiative {
  name: string;
  href: string;
}

interface ProgramItem {
  id: string;
  category: string;
  sectorNum: string;
  title: string;
  desc: string;
  image: string;
  stats: string;
  icon: any;
  href: string;
  initiatives: ProgramInitiative[];
}

const PROGRAM_LIST: ProgramItem[] = [
  {
    id: "edu-1",
    category: "Education & Learning",
    sectorNum: "01",
    title: "Education & Learning",
    desc: "Promoting quality primary & secondary schooling, school kit distribution, community learning centres, academic talent coaching, higher education scholarships, and technical vocational training.",
    image: causeEducationImg,
    stats: "8 Key Initiatives • 18,500+ Students",
    icon: BookOpen,
    href: "/programs/education",
    initiatives: [
      { name: "Primary School (EPS)", href: "/programs/education/primary-school" },
      { name: "School Kit & Learning Support (SKLS)", href: "/programs/education/school-kit-learning-support" },
      { name: "Community Learning Centre (CLC)", href: "/programs/education/community-learning-centre" },
      { name: "Academic Pathways & Talent (APTD)", href: "/programs/education/academic-pathways-talent-development" },
      { name: "Scholarships for Higher Education (SHE)", href: "/programs/education/scholarships" },
      { name: "Career Guidance & Mentorship (CGM)", href: "/programs/education/career-guidance" },
      { name: "Technical & Vocational Training (TVET)", href: "/programs/education/technical-vocational-training" },
      { name: "Knowledge, Research & Publication (KRP)", href: "/programs/education/knowledge-research-publication" },
    ],
  },
  {
    id: "health-1",
    category: "Healthcare & Well-being",
    sectorNum: "02",
    title: "Healthcare & Well-being",
    desc: "Providing accessible primary care, free medical checkup camps, critical emergency support, patient financial assistance, diabetes awareness, menstrual hygiene, cervical cancer screening, and rural clinics.",
    image: causeMedicalImg,
    stats: "8 Key Initiatives • 1,20,000+ Patients",
    icon: Stethoscope,
    href: "/programs/healthcare",
    initiatives: [
      { name: "Critical Life & Emergency Support (CLES)", href: "/programs/healthcare/critical-life-support" },
      { name: "Rural Ambulance & Response (RAER)", href: "/programs/healthcare/rural-ambulance" },
      { name: "Medical Assistance for Poor (MAP)", href: "/programs/healthcare/medical-aid" },
      { name: "Health Check-up Camps (CHC)", href: "/programs/healthcare/health-checkup-camps" },
      { name: "Diabetes Prevention Awareness (DPLA)", href: "/programs/healthcare/diabetes-prevention" },
      { name: "Menstrual Health & Hygiene (MHHS)", href: "/programs/healthcare/menstrual-hygiene" },
      { name: "Cervical Cancer Screening (CCPA)", href: "/programs/healthcare/cervical-cancer" },
      { name: "Rural Healthcare Centres (RHWC)", href: "/programs/healthcare/wellness-centres" },
    ],
  },
  {
    id: "women-1",
    category: "Women & Youth Empowerment",
    sectorNum: "03",
    title: "Women & Youth Empowerment",
    desc: "Unlocking capability, financial self-reliance, leadership, and equality for rural women and young people through vocational trades, Self-Help Groups (SHGs), rights awareness, and youth entrepreneurship.",
    image: causeWomenImg,
    stats: "4 Key Initiatives • 2,000+ Women",
    icon: Users,
    href: "/programs/women-empowerment",
    initiatives: [
      { name: "Women Skill & Livelihood Programme", href: "/programs/women-empowerment/women-skill-livelihood" },
      { name: "Self-Help Group Capacity Building", href: "/programs/women-empowerment/self-help-groups" },
      { name: "Women’s Rights & Equality Awareness", href: "/programs/women-empowerment/womens-rights" },
      { name: "Youth Career & Entrepreneurship", href: "/programs/women-empowerment/youth-career-entrepreneurship" },
    ],
  },
  {
    id: "skills-1",
    category: "Skills, Livelihoods & Entrepreneurship",
    sectorNum: "04",
    title: "Skills, Livelihoods & Entrepreneurship",
    desc: "Transforming raw potential into productive capability through market-relevant technical trades, livelihood market linkages, rural enterprise development, and micro-business self-employment mentoring.",
    image: entrepreneurImg,
    stats: "4 Key Initiatives • 1,200+ Trainees",
    icon: Wrench,
    href: "/programs/skills-development",
    initiatives: [
      { name: "Skills & Employability Programme (SEP)", href: "/programs/skills-development/skills-employability" },
      { name: "Livelihood Development Initiative (LDI)", href: "/programs/skills-development/livelihood-development" },
      { name: "Rural Entrepreneurship Initiative (REI)", href: "/programs/skills-development/rural-entrepreneurship" },
      { name: "Micro-Enterprise Support (MSES)", href: "/programs/skills-development/micro-enterprise-support" },
    ],
  },
  {
    id: "social-justice-1",
    category: "Social Justice & Legal Empowerment",
    sectorNum: "05",
    title: "Social Justice & Legal Empowerment",
    desc: "Safeguarding constitutional dignity, equal opportunity, and social inclusion through grassroots legal literacy camps, lawful judicial remedies, public interest litigation (PIL), and grievance accountability.",
    image: causeWomenImg,
    stats: "4 Key Initiatives • Constitutional Aid",
    icon: Scale,
    href: "/programs/social-justice",
    initiatives: [
      { name: "Legal Literacy & Rights Awareness (LRA)", href: "/programs/social-justice/legal-literacy-rights-awareness" },
      { name: "Social Justice Legal Action (SJLA)", href: "/programs/social-justice/social-justice-legal-action" },
      { name: "Public Interest Strategic Litigation (PISL)", href: "/programs/social-justice/public-interest-strategic-litigation" },
      { name: "Grievance & Accountability Initiative (GA)", href: "/programs/social-justice/grievance-accountability" },
    ],
  },
  {
    id: "agriculture-1",
    category: "Agriculture & Rural Livelihoods",
    sectorNum: "06",
    title: "Agriculture & Rural Livelihoods",
    desc: "Empowering smallholder farming households with sustainable agricultural methods, farmer training workshops, organic bio-farming, soil regeneration, and allied livelihood diversification.",
    image: agricultureImg,
    stats: "4 Key Initiatives • 2,500+ Farmers",
    icon: Wheat,
    href: "/programs/agriculture",
    initiatives: [
      { name: "Sustainable Agriculture Development (SAD)", href: "/programs/agriculture/sustainable-agriculture" },
      { name: "Farmer Awareness & Training (FAT)", href: "/programs/agriculture/farmer-training" },
      { name: "Organic Farming & Natural Agri (ONA)", href: "/programs/agriculture/organic-farming" },
      { name: "Farmer Livelihood & Income (FLI)", href: "/programs/agriculture/farmer-livelihood" },
    ],
  },
  {
    id: "environment-1",
    category: "Environment & Sustainable Development",
    sectorNum: "07",
    title: "Environment & Sustainable Development",
    desc: "Building long-term ecological resilience through grassroots environmental literacy, plastic reduction, village clean community drives, native tree plantations, and sustainable rural resource stewardship.",
    image: environmentImg,
    stats: "4 Key Initiatives • 15,000+ Trees",
    icon: Trees,
    href: "/programs/environment",
    initiatives: [
      { name: "Environmental Awareness Programme (EAP)", href: "/programs/environment/environmental-awareness" },
      { name: "Green Village & Clean Community (GCC)", href: "/programs/environment/green-village-clean-community" },
      { name: "Tree Plantation & Greening (TPCG)", href: "/programs/environment/tree-plantation-greening" },
      { name: "Sustainable Rural Development (SRD)", href: "/programs/environment/sustainable-rural-development" },
    ],
  },
  {
    id: "relief-1",
    category: "Humanitarian Relief & Rehabilitation",
    sectorNum: "08",
    title: "Humanitarian Relief & Rehabilitation",
    desc: "Standing with vulnerable families during crisis through emergency disaster response, dry ration kits, flood rescue, seasonal winter warmth, dignified shelter support, and productive livelihood rehabilitation.",
    image: causeMedicalImg,
    stats: "4 Key Initiatives • 8,750+ Families",
    icon: Heart,
    href: "/programs/relief-and-rehabilitation",
    initiatives: [
      { name: "Emergency Relief & Disaster Response (EDR)", href: "/programs/relief-and-rehabilitation/emergency-disaster-response" },
      { name: "Shelter, Clothing & Necessities (SCN)", href: "/programs/relief-and-rehabilitation/shelter-clothing-necessities" },
      { name: "Seasonal & Disaster Relief Support (SDSR)", href: "/programs/relief-and-rehabilitation/seasonal-disaster-relief" },
      { name: "Livelihood Recovery & Rehabilitation (LRR)", href: "/programs/relief-and-rehabilitation/livelihood-recovery-rehabilitation" },
    ],
  },
];

const CATEGORIES = [
  "All Programs",
  "Education & Learning",
  "Healthcare & Well-being",
  "Women & Youth Empowerment",
  "Skills, Livelihoods & Entrepreneurship",
  "Social Justice & Legal Empowerment",
  "Agriculture & Rural Livelihoods",
  "Environment & Sustainable Development",
  "Humanitarian Relief & Rehabilitation",
];

export default function ProgramsMasterPage() {
  const [activeCategory, setActiveCategory] = useState("All Programs");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  const filteredPrograms = useMemo(() => {
    return PROGRAM_LIST.filter((p) => {
      const matchesCategory =
        activeCategory === "All Programs" || p.category === activeCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* Hero Header */}
        <section className="bg-gradient-to-r from-[#071527] via-[#0b1f3b] to-[#15803d] text-white min-h-[480px] md:min-h-[520px] lg:min-h-[580px] flex items-center py-10 md:py-14 px-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto w-full">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-white/70 mb-4 font-medium flex-wrap" aria-label="Breadcrumb">
              <a href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-brand-orange" /> Home
              </a>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <span className="text-brand-orange font-bold">Our Programs</span>
            </nav>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-brand-orange mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                  WHAT WE DO • PROGRAM CATALOG
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  Our Programs &amp; Initiatives
                </h1>
                <p className="text-white/85 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
                  Empowering individuals and communities through sustainable, structured development initiatives across education, healthcare, skills, environment, and rural livelihoods.
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 text-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-orange block">36</span>
                  <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wider">Key Initiatives</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 text-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-400 block">1,25,000+</span>
                  <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wider">Beneficiaries</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 text-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-400 block">250+</span>
                  <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wider">Villages</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 text-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-orange block">8</span>
                  <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wider">Focus Sectors</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Master Catalog Section */}
        <section className="py-14 px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
            {/* Left Sidebar Filter Tabs */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                <h3 className="font-extrabold text-[#0b1f3b] text-base uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Filter className="w-4 h-4 text-brand-orange" /> Program Categories
                </h3>
                <div className="flex flex-col gap-1.5">
                  {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-left text-sm font-semibold px-4 py-2.5 rounded-lg transition-all flex items-center justify-between ${
                          isActive
                            ? "bg-brand-green text-white shadow-sm"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span>{cat}</span>
                        {isActive && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Need Assistance Card */}
              <div className="bg-gradient-to-br from-[#0b1f3b] to-[#15803d] text-white rounded-2xl p-6 shadow-md space-y-4">
                <h4 className="font-bold text-base">Can't find what you're looking for?</h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  Our team can guide you to the right program, partnership, or sponsorship initiative.
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-md shadow transition"
                >
                  Contact Our Team
                </a>
              </div>
            </div>

            {/* Right Programs Listing Grid */}
            <div className="lg:col-span-9 space-y-6">
              {/* Search & Counter Bar */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search programs by name..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-green"
                  />
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Showing {filteredPrograms.length} Programs
                </div>
              </div>

              {/* Programs Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredPrograms.map((prog) => {
                  const Icon = prog.icon;
                  return (
                    <ScrollReveal key={prog.id}>
                      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full group">
                        <div>
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={prog.image}
                              alt={prog.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute top-3 left-3 bg-brand-orange text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-md shadow">
                              {prog.category}
                            </div>
                          </div>
                          <div className="p-6 space-y-3">
                            <div className="flex items-center justify-between gap-2 text-brand-green font-bold text-xs uppercase tracking-wider">
                              <div className="flex items-center gap-1.5">
                                <Icon className="w-4 h-4" />
                                <span>{prog.stats}</span>
                              </div>
                              <span className="text-[11px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                Sector {prog.sectorNum}
                              </span>
                            </div>
                            <h3 className="text-xl font-extrabold text-[#0b1f3b] group-hover:text-brand-green transition-colors">
                              {prog.title}
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {prog.desc}
                            </p>

                            {/* Key Initiatives List */}
                            {prog.initiatives && prog.initiatives.length > 0 && (
                              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                  Key Initiatives ({prog.initiatives.length}):
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {prog.initiatives.map((init) => (
                                    <a
                                      key={init.name}
                                      href={init.href}
                                      className="inline-flex items-center text-[11px] font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 px-2 py-0.5 rounded transition-colors"
                                    >
                                      {init.name}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="p-6 pt-0">
                          <a
                            href={prog.href}
                            className="inline-flex items-center gap-2 text-xs font-bold text-brand-green hover:text-brand-green-dark uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                          >
                            <span>Learn More & View Details</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
