import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Scissors, TrendingUp, Users, Award, Briefcase, Heart, CheckCircle2, Lightbulb, Star, ShieldCheck, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_women_1.png";
import causeWomenImg from "@/assets/cause-women.jpg";

export default function WomenSkillLivelihood() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const COURSES = [
    { icon: Scissors, title: "Tailoring & Garment Making", tag: "Most Popular", desc: "Professional garment construction, pattern drafting, stitching machines, and finishing techniques." },
    { icon: Star, title: "Embroidery & Zari Craft", tag: "Artisanal", desc: "Traditional hand embroidery, zari work, and contemporary motif design for commercial apparel." },
    { icon: Briefcase, title: "Food Processing & Baking", tag: "Micro-Enterprise", desc: "Hygienic food preservation, pickle/spice packaging, bakery products, and FSSAI standards." },
    { icon: Heart, title: "Handicrafts & Jute Products", tag: "Eco-Friendly", desc: "Jute bags, handcrafted home decor, pottery embellishment, and sustainable artisanal goods." },
  ];

  const ROADMAP = [
    { step: "01", title: "Mobilization & Skill Assessment", desc: "Identifying interested women from rural households and assessing local market demand." },
    { step: "02", title: "Hands-On Practical Training", desc: "120+ hours of structured machine training under expert female master instructors." },
    { step: "03", title: "Certification & Toolkit Support", desc: "Providing starter toolkits (sewing machines/craft kits) upon successful course completion." },
    { step: "04", title: "Market Linkage & Income Flow", desc: "Connecting artisans to local boutiques, e-commerce channels, and institutional orders." },
  ];

  const IMPACT_STATS = [
    { value: "2,000+", label: "Women Trained & Certified" },
    { value: "85%", label: "Generating Active Monthly Income" },
    { value: "15+", label: "Rural Training Centers" },
    { value: "100%", label: "Women-Only Safe Spaces" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean, unshaded hero header */}
        <section className="relative min-h-[420px] flex items-center overflow-hidden">
          <img src={heroImg} alt="Women Skill & Livelihood" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/70 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/programs/women-empowerment" className="hover:text-white">Women Empowerment</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90 font-semibold">Women Skill & Livelihood</span>
            </nav>
            <Link to="/programs/women-empowerment" className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-all mb-5">
              <ArrowLeft className="w-3.5 h-3.5" /> All Women Empowerment
            </Link>
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3.5 py-1 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-wider uppercase text-white">Flagship Livelihood Initiative</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Women Skill & Livelihood<br />
              <span className="text-brand-orange">From Stitches to Financial Sovereignty</span>
            </h1>
            <p className="text-sm md:text-base text-white/85 max-w-2xl leading-relaxed">
              Empowering rural women with vocational masterclasses in tailoring, handicrafts, food packaging, and direct market linkage to build lasting economic independence.
            </p>
          </div>
        </section>

        {/* 4-Stat Metric Banner */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {IMPACT_STATS.map((stat, i) => (
                <div key={i} className="border-r last:border-r-0 border-slate-100 py-2">
                  <p className="text-2xl md:text-3xl font-extrabold text-brand-green-dark">{stat.value}</p>
                  <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Collage Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Core Vocational Tracks</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">Market-Ready Skill Courses</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Designed specifically for rural women with flexible batch timings and localized training centres.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              {/* Large Spotlight Box */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-[#0b1f3b] text-white p-8 flex flex-col justify-between">
                <img src={causeWomenImg} alt="Tailoring training" className="absolute inset-0 w-full h-full object-cover opacity-25" />
                <div className="relative z-10 space-y-4">
                  <span className="inline-block bg-brand-orange text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Spotlight Program
                  </span>
                  <h3 className="text-2xl font-extrabold leading-snug">Sewing & Fashion Technology Masterclasses</h3>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Over 65% of our trainees choose tailoring as their core enterprise. We provide free access to modern electric sewing machines, overlock machines, and cutting tables.
                  </p>
                </div>
                <div className="relative z-10 pt-6 border-t border-white/15 mt-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-brand-orange shrink-0" />
                    <p className="text-xs text-slate-200">Certified by industry master trainers with free starter tailoring kit upon graduation.</p>
                  </div>
                </div>
              </div>

              {/* 4 Cards Grid */}
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {COURSES.map((course, idx) => {
                  const Icon = course.icon;
                  return (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between group">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-bold text-brand-orange bg-orange-50 border border-orange-200/60 px-2.5 py-0.5 rounded-full">
                            {course.tag}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-green transition-colors mb-2">{course.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{course.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4 flex items-center gap-1.5 text-xs font-bold text-brand-green">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>100% Practical Sessions</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 4-Step Process Flow */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Our Methodology</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">4-Stage Livelihood Pathway</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {ROADMAP.map((step, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative">
                  <span className="text-3xl font-black text-brand-green/20 mb-2 block">{step.step}</span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navy High-Contrast Banner */}
        <section className="py-14 bg-[#0b1f3b] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
            <Lightbulb className="w-10 h-10 text-brand-orange mx-auto" />
            <p className="text-xl md:text-2xl font-semibold leading-relaxed italic text-white/95">
              "When a woman acquires a practical livelihood skill, her entire household experiences improved nutrition, education, and social dignity."
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="h-px w-8 bg-brand-orange/60" />
              <span className="text-brand-orange font-semibold text-xs uppercase tracking-widest">Islah Welfare Foundation</span>
              <span className="h-px w-8 bg-brand-orange/60" />
            </div>
          </div>
        </section>

        {/* Prev / Next Footer Nav */}
        <section className="py-8 bg-slate-100 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/programs/women-empowerment" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Women Empowerment Overview
            </Link>
            <Link to="/programs/women-empowerment/rural-women-entrepreneurship" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              Next: Rural Women Entrepreneurship <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
