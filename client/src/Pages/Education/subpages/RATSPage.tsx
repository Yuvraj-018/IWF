import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Award, Trophy, Users, BookOpen, Star, CheckCircle2, ShieldCheck, Sparkles, GraduationCap } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import heroImg from "@/assets/sector_education_1.png";

export default function RATSPage() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const HIGHLIGHTS = [
    { icon: Trophy, tag: "Merit Awards", title: "District & State Cash Prizes", desc: "Top performers in Grades 5–10 receive cash scholarships, scientific calculator kits, and merit certificates." },
    { icon: GraduationCap, tag: "Free Coaching", title: "Residential Super-30 Induction", desc: "Top 30 ranked students inducted into intensive residential coaching programs for engineering and medical entrances." },
    { icon: Star, tag: "Mentorship", title: "1-on-1 IIT/AIIMS Scholar Mentors", desc: "Matched with university mentors who guide students through Olympiads, NTSE, and high school academic milestones." },
    { icon: Users, tag: "Mass Reach", title: "100+ Rural School Exam Centres", desc: "Standardized OMR-based written examination conducted simultaneously across rural government schools." },
  ];

  const STATS = [
    { value: "25,000+", label: "Rural Students Appeared" },
    { value: "500+", label: "Full Scholarships Awarded" },
    { value: "100+", label: "Partner Rural Schools" },
    { value: "100%", label: "Free Examination Registration" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Standardized Hero */}
        <SubpageHeroCarousel
          tag="EDUCATION • RATS"
          title="Rural Academic Talent Search (RATS)"
          subtitle="An annual standardized talent search examination across rural schools identifying gifted students in Mathematics, Science, and Mental Ability for scholarship grooming."
          breadcrumbs={[
            { label: "What We Do", href: "/programs" },
            { label: "Education", href: "/programs/education" },
            { label: "RATS Talent Search" },
          ]}
          images={[heroImg]}
        >
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to="/programs/education"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Education Programmes
            </Link>
          </div>
        </SubpageHeroCarousel>

        {/* Stats Strip */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {STATS.map((s, i) => (
                <div key={i} className="border-r last:border-r-0 border-slate-100 py-2">
                  <p className="text-2xl md:text-3xl font-extrabold text-brand-green-dark">{s.value}</p>
                  <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Talent Identification Framework</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">RATS Examination Highlights</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Providing a transparent, merit-based platform where every rural student can shine.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xs border border-slate-200 bg-slate-50 text-slate-800 p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="inline-block bg-brand-orange text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Flagship Talent Test
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">Empowering Rural Geniuses to Compete Nationally</h3>
                  <p className="text-sm text-slate-600 leading-relaxed text-balance">
                    RATS bridges the gap between rural classrooms and national Olympiads. Students testing in the top 5th percentile receive continuous academic handholding and scholarship grants.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-200 mt-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-brand-orange shrink-0" />
                    <p className="text-xs text-slate-600">100% free registration for all government school students.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {HIGHLIGHTS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-sm hover:border-brand-green/40 transition-all flex flex-col justify-between group">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-bold text-brand-orange bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                            {item.tag}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-green transition-colors mb-2">{item.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 mt-4 flex items-center gap-1.5 text-xs font-bold text-brand-green">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Annual Merit Feature</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Quote Banner */}
        <section className="py-10 bg-slate-50/70 border-y border-slate-200 text-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
            <Trophy className="w-8 h-8 text-brand-orange mx-auto" />
            <p className="text-lg md:text-xl font-serif italic leading-relaxed text-slate-800 text-balance">
              "Great minds can be found in the remotest villages. RATS exists to discover them, celebrate them, and propel them to national greatness."
            </p>
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="h-px w-8 bg-brand-orange/40" />
              <span className="text-brand-orange font-semibold text-xs uppercase tracking-widest">Islah Welfare Foundation</span>
              <span className="h-px w-8 bg-brand-orange/40" />
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 bg-slate-100 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/programs/education/school-kit-distribution" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-xs">
              <ArrowLeft className="w-4 h-4" /> Prev: School Kit Distribution
            </Link>
            <Link to="/programs/education/career-guidance" className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-xs">
              Next: Career Guidance <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
