import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Target, GraduationCap, Award, BookOpen, CheckCircle2, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_education_1.png";

export default function CoachingCentre() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const FEATURE_ROWS = [
    {
      icon: Target,
      num: "01",
      title: "Class 10 & 12 Board Exam Mastery Batches",
      desc: "Intensive concept clearing, chapter-wise test series, and previous 10-year question solving in Mathematics, Physics, Chemistry, Biology, and Accountancy.",
      highlights: ["Experienced subject master faculties", "Weekly mock test simulations", "Personalized doubt clearing sessions"],
    },
    {
      icon: Trophy,
      num: "02",
      title: "Competitive Entrance Foundation (NEET / JEE / CUET)",
      desc: "Free foundation coaching for meritorious rural science students aspiring to crack government medical and engineering entrance exams without moving to expensive coaching hubs.",
      highlights: ["Daily practice problem (DPP) sheets", "Computer-based test (CBT) practice labs", "Complete study material & formula books"],
    },
    {
      icon: Award,
      num: "03",
      title: "Civil Services & State PSC Foundation Guidance",
      desc: "Mentoring rural graduates for UPSC, State PSC, SSC, and Banking exams with free library access, current affairs digests, and mock interview panels.",
      highlights: ["Daily editorial analysis & answer writing", "Guest lectures by serving officers", "Free Wi-Fi digital study library"],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <section className="relative min-h-[420px] flex items-center overflow-hidden">
          <img src={heroImg} alt="CBCE Coaching Centre" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/70 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/programs/education" className="hover:text-white">Education</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90 font-semibold">Coaching Centre (CBCE)</span>
            </nav>
            <Link to="/programs/education" className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-all mb-5">
              <ArrowLeft className="w-3.5 h-3.5" /> All Education Programmes
            </Link>
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3.5 py-1 rounded-full mb-4">
              <Target className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-wider uppercase text-white">Exam Excellence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Coaching Centre for Board & Competitive Exams<br />
              <span className="text-brand-orange">Unlocking Rural Potential for Premier Careers</span>
            </h1>
            <p className="text-sm md:text-base text-white/85 max-w-2xl leading-relaxed">
              Providing expert coaching for Board Exams (10th/12th), NEET, JEE, CUET, and civil services to talented rural students completely free of cost.
            </p>
          </div>
        </section>

        {/* Horizontal Feature Rows */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Exam Coaching Programs</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">3 Specialized Coaching Tracks</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Targeted preparation ensuring students achieve top percentiles in competitive examinations.</p>
            </div>

            <div className="space-y-6">
              {FEATURE_ROWS.map((row, idx) => {
                const Icon = row.icon;
                return (
                  <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                    <div className="grid lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-8 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-extrabold text-brand-orange tracking-widest uppercase">Track {row.num}</span>
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-900">{row.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{row.desc}</p>
                      </div>
                      <div className="lg:col-span-4 bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-2.5">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Track Highlights</p>
                        {row.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
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
            <Trophy className="w-10 h-10 text-brand-orange mx-auto" />
            <p className="text-xl md:text-2xl font-semibold leading-relaxed italic text-white/95">
              "Talent is evenly distributed across society, but opportunity is not. CBCE provides the launchpad for rural brilliance to reach top universities and government services."
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
            <Link to="/programs/education/cilc" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Prev: CILC Centre
            </Link>
            <Link to="/programs/education/scholarships" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              Next: Scholarships <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
