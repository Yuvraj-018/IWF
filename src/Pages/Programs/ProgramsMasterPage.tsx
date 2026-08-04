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
  ArrowRight,
  Filter,
  CheckCircle2,
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

interface ProgramItem {
  id: string;
  category: string;
  title: string;
  desc: string;
  image: string;
  stats: string;
  icon: any;
  href: string;
}

const PROGRAM_LIST: ProgramItem[] = [
  {
    id: "edu-1",
    category: "Education",
    title: "Education for All",
    desc: "Promoting quality primary & secondary education, scholarships, school kit distribution, and digital learning opportunities for rural children.",
    image: causeEducationImg,
    stats: "18,500+ Students Supported",
    icon: BookOpen,
    href: "/programs/education",
  },
  {
    id: "health-1",
    category: "Healthcare",
    title: "Healthcare & Community Wellness",
    desc: "Providing accessible primary healthcare, medical camps, critical emergency support, cervical cancer screening, and rural ambulance services.",
    image: causeMedicalImg,
    stats: "1,20,000+ Patients Treated",
    icon: Stethoscope,
    href: "/programs/healthcare",
  },
  {
    id: "skills-1",
    category: "Livelihood & Skills",
    title: "Skills Development & Vocational Training",
    desc: "Community skill centres, hands-on technical workshops, digital literacy, and youth employability training.",
    image: entrepreneurImg,
    stats: "1,200+ Trainees Certified",
    icon: Wrench,
    href: "/programs/skills-development",
  },
  {
    id: "women-1",
    category: "Women Empowerment",
    title: "Women Empowerment Initiatives",
    desc: "Tailoring & garment training, Self-Help Groups (SHG) promotion, financial literacy, and women's rights awareness.",
    image: causeWomenImg,
    stats: "2,000+ Women Empowered",
    icon: Users,
    href: "/programs/women-empowerment",
  },
  {
    id: "entrepreneur-1",
    category: "Entrepreneur Development",
    title: "Rural Entrepreneurship & Microfinance",
    desc: "Supporting small rural enterprises, youth entrepreneurship guidance, and interest-free Islah Microfinance options.",
    image: entrepreneurImg,
    stats: "500+ Micro-Enterprises",
    icon: Lightbulb,
    href: "/programs/entrepreneur-development",
  },
  {
    id: "relief-1",
    category: "Relief & Rehabilitation",
    title: "Humanitarian Relief & Disaster Response",
    desc: "Immediate food packets, ration kits, flood rescue, winter blanket distribution, and marriage assistance for vulnerable families.",
    image: causeMedicalImg,
    stats: "8,750+ Families Assisted",
    icon: Heart,
    href: "/programs/relief-and-rehabilitation",
  },
  {
    id: "environment-1",
    category: "Environment",
    title: "Environment Protection & Green Village",
    desc: "Tree plantation drives, plastic-free rural campaigns, organic farming promotion, and climate change awareness.",
    image: environmentImg,
    stats: "15,000+ Trees Planted",
    icon: Trees,
    href: "/programs/environment",
  },
  {
    id: "agriculture-1",
    category: "Agriculture",
    title: "Agriculture & Farmer Support",
    desc: "Farmer awareness workshops, natural farming methods, water conservation, and agricultural livelihood enhancement.",
    image: agricultureImg,
    stats: "2,500+ Farmers Trained",
    icon: Wheat,
    href: "/programs/agriculture",
  },
];

const CATEGORIES = [
  "All Programs",
  "Education",
  "Healthcare",
  "Livelihood & Skills",
  "Women Empowerment",
  "Entrepreneur Development",
  "Relief & Rehabilitation",
  "Environment",
  "Agriculture",
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
        <section className="bg-gradient-to-r from-[#071527] via-[#0b1f3b] to-[#15803d] text-white py-16 md:py-20 px-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-white/10 text-brand-orange text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-md border border-white/15">
                <span>Islah Welfare Foundation</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                OUR PROGRAMS
              </h1>
              <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl">
                Empowering individuals and communities through sustainable, structured development initiatives across education, healthcare, skills, environment, and rural livelihoods.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-center">
                <span className="text-3xl md:text-4xl font-extrabold text-brand-orange block">25+</span>
                <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">Programs</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-center">
                <span className="text-3xl md:text-4xl font-extrabold text-emerald-400 block">1,25,000+</span>
                <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">Beneficiaries</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-center">
                <span className="text-3xl md:text-4xl font-extrabold text-emerald-400 block">250+</span>
                <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">Villages</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-center">
                <span className="text-3xl md:text-4xl font-extrabold text-brand-orange block">10+</span>
                <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">Sectors</span>
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
                            <div className="flex items-center gap-2 text-brand-green font-bold text-xs uppercase tracking-wider">
                              <Icon className="w-4 h-4" />
                              <span>{prog.stats}</span>
                            </div>
                            <h3 className="text-lg font-bold text-[#0b1f3b] group-hover:text-brand-green transition-colors">
                              {prog.title}
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {prog.desc}
                            </p>
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
