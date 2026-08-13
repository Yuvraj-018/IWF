import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Compass, Users, Briefcase, GraduationCap, Award, CheckCircle2, ShieldCheck, Sparkles, Lightbulb } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_education_1.png";

export default function CareerGuidance() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const SERVICES = [
    { icon: Compass, title: "Psychometric Aptitude & Interest Mapping", desc: "Scientific psychometric assessments identifying natural aptitude, cognitive strengths, and matching career paths." },
    { icon: Briefcase, title: "Industry Mentorship & Professional Pairing", desc: "Connecting rural college youth 1-on-1 with software engineers, doctors, civil servants, and business leaders." },
    { icon: GraduationCap, title: "Higher Education Admissions Counselling", desc: "Step-by-step guidance on college forms, central university entrance tests (CUET), and government scholarships." },
    { icon: Users, title: "Resume Building & Interview Mock Panels", desc: "Hands-on workshops teaching professional CV drafting, email etiquettes, group discussions, and interview poise." },
    { icon: Lightbulb, title: "Entrepreneurship & Startup Mentoring", desc: "Guiding ambitious youth in turning rural business ideas into viable, fundable micro-enterprises." },
    { icon: Award, title: "Digital Skills & Freelance Pathways", desc: "Training youth in remote freelancing, graphic design, content writing, and digital marketing for global income." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <section className="relative min-h-[420px] flex items-center overflow-hidden">
          <img src={heroImg} alt="Career Guidance" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/70 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/programs/education" className="hover:text-white">Education</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90 font-semibold">Career Guidance (CTAG)</span>
            </nav>
            <Link to="/programs/education" className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-all mb-5">
              <ArrowLeft className="w-3.5 h-3.5" /> All Education Programmes
            </Link>
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3.5 py-1 rounded-full mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-wider uppercase text-white">Youth Mentorship Hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Career Guidance & Mentorship (CTAG)<br />
              <span className="text-brand-orange">Navigating Pathways from Classroom to Career</span>
            </h1>
            <p className="text-sm md:text-base text-white/85 max-w-2xl leading-relaxed">
              Centre for Training & Academic Guidance (CTAG) empowering rural students with psychometric profiling, 1-on-1 industry mentorship, college counselling, and corporate interview prep.
            </p>
          </div>
        </section>

        {/* 6 Services Grid */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">CTAG Mentorship Services</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">6 Pillars of Career Direction</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Transforming confusion into clear, structured, achievable career milestones for rural youth.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-green transition-colors mb-2">{s.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200/60 mt-5 flex items-center gap-1.5 text-xs font-bold text-brand-green">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Dedicated Mentor Matching</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Navy High-Contrast Banner */}
        <section className="py-14 bg-[#0b1f3b] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
            <Compass className="w-10 h-10 text-brand-orange mx-auto" />
            <p className="text-xl md:text-2xl font-semibold leading-relaxed italic text-white/95">
              "Without guidance, talent wanders in darkness. CTAG provides the lighthouse that guides rural youth into fulfilling professional journeys."
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="h-px w-8 bg-brand-orange/60" />
              <span className="text-brand-orange font-semibold text-xs uppercase tracking-widest">Islah Welfare Foundation</span>
              <span className="h-px w-8 bg-brand-orange/60" />
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 bg-slate-100 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/programs/education/rats" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Prev: RATS Talent Search
            </Link>
            <Link to="/programs/education/technical-institute" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              Next: Technical Institute <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
