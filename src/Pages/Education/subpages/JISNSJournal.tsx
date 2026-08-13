import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import { Home, ChevronRight, ArrowLeft, ArrowRight, BookOpen, Search, Award, CheckCircle2, ShieldCheck, Sparkles, FileText, Globe } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_education_1.png";

export default function JISNSJournal() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const SECTIONS = [
    {
      icon: BookOpen,
      badge: "Peer-Reviewed",
      title: "Scholarly Research Articles & Treatises",
      desc: "Original research papers exploring historical Islamic contributions to mathematics, astronomy, medicine, ethics, and jurisprudence.",
    },
    {
      icon: Search,
      badge: "Contemporary",
      title: "Contemporary Science & Ethics Discourse",
      desc: "Dialogues bridging scientific inquiry with moral philosophy, bioethics, environmental responsibility, and social welfare.",
    },
    {
      icon: Globe,
      badge: "Open Access",
      title: "Digital Archive & Open Scholar Access",
      desc: "Freely accessible digital repository for universities, madrassas, researchers, and students across the globe.",
    },
  ];

  const OBJECTIVES = [
    "Foster rigorous academic research bridging classical Islamic thought with modern empirical sciences",
    "Provide a scholarly, peer-reviewed platform for young researchers, historians, and theologians",
    "Promote rational inquiry, intellectual depth, and ethical dialogue in contemporary society",
    "Publish indexed biannual journal volumes distributed to academic institutions nationwide",
    "Encourage critical thinking and scientific inquiry among rural students and community scholars",
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <section className="relative min-h-[420px] flex items-center overflow-hidden">
          <img src={heroImg} alt="JISNS Journal" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/70 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/programs/education" className="hover:text-white">Education</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90 font-semibold">JISNS Journal</span>
            </nav>
            <Link to="/programs/education" className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-all mb-5">
              <ArrowLeft className="w-3.5 h-3.5" /> All Education Programmes
            </Link>
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3.5 py-1 rounded-full mb-4">
              <FileText className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-wider uppercase text-white">Scholarly Publication</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              JISNS Scholarly Journal<br />
              <span className="text-brand-orange">Journal of Islamic Sciences & Natural Studies</span>
            </h1>
            <p className="text-sm md:text-base text-white/85 max-w-2xl leading-relaxed">
              A peer-reviewed academic publication uniting Islamic scholarship, scientific inquiry, philosophy, and socio-ethical research to inspire intellectual revival.
            </p>
          </div>
        </section>

        {/* 3-Column Magazine Cards Section */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Editorial Scope</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">3 Core Journal Sections</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Promoting intellectual depth, academic rigor, and rational inquiry across disciplines.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {SECTIONS.map((col, idx) => {
                const Icon = col.icon;
                return (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-bold text-brand-orange bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                          {col.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-green transition-colors">{col.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{col.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200/60 mt-6 flex items-center gap-2 text-xs font-bold text-brand-green">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Peer-Reviewed Standard</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5 Objectives */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Publishing Mandate</p>
              <h3 className="text-2xl font-extrabold text-brand-green-dark">5 Key Editorial Objectives</h3>
            </div>
            <div className="space-y-3">
              {OBJECTIVES.map((obj, i) => (
                <div key={i} className="flex items-start gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-brand-green flex items-center justify-center shrink-0 font-bold text-sm">
                    {i + 1}
                  </div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed pt-1">{obj}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navy High-Contrast Banner */}
        <section className="py-14 bg-[#0b1f3b] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
            <BookOpen className="w-10 h-10 text-brand-orange mx-auto" />
            <p className="text-xl md:text-2xl font-semibold leading-relaxed italic text-white/95">
              "True knowledge illuminates both the intellect and the heart. JISNS is dedicated to reviving rigorous scholarly tradition in the modern age."
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
            <Link to="/programs/education/erawin-public-school" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Prev: Erawin Public School
            </Link>
            <Link to="/programs/education/cilc" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              Next: CILC Centre <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
