import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer, RoleFormModal } from "@/components/layout/SiteLayout";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Heart, Banknote, Users, BookOpen, Shield, Home as HomeIcon, CheckCircle2, HandHeart, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_women_1.png";

export default function WidowsVulnerableWomen() {
  const [activeModal, setActiveModal] = useState<"volunteer" | "partner" | "sponsor" | "mentor" | "employee" | null>(null);

  const SUPPORT_SERVICES = [
    { icon: Banknote, title: "Direct Monthly Welfare Stipends", desc: "Unconditional monthly financial support to help destitute widows meet critical food, medicine, and utility costs." },
    { icon: HomeIcon, title: "Emergency Shelter & Roof Repairs", desc: "Repairing leaking thatch/tin roofs, installing secure doors/windows, and providing safe housing assistance." },
    { icon: BookOpen, title: "Children's Education Sponsorship", desc: "Full coverage of school fees, textbooks, uniforms, and tutoring to ensure children of widowed mothers stay in school." },
    { icon: Shield, title: "Legal Property & Inheritance Aid", desc: "Legal representation protecting vulnerable widows from property encroachment and securing legal succession rights." },
    { icon: Users, title: "Grief & Mental Health Counselling", desc: "Compassionate psychosocial support groups and community integration for isolated, bereaved women." },
    { icon: Heart, title: "Priority Livelihood Enrolment", desc: "Direct admission into tailoring and home-enterprise training with free toolkits to achieve lasting self-reliance." },
  ];

  const BENEFICIARIES = [
    { title: "Widowed Mothers", desc: "Women who have lost their spouse and are the sole providers for young dependent children." },
    { title: "Abandoned & Divorced Women", desc: "Women left without financial or familial support, facing severe social marginalization." },
    { title: "Differently-Abled Women", desc: "Women with disabilities living in extreme poverty requiring specialized care and assistive aids." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <section className="relative min-h-[420px] flex items-center overflow-hidden">
          <img src={heroImg} alt="Widows & Vulnerable Women" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/70 mb-6 font-medium flex-wrap">
              <Link to="/" className="hover:text-white flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/programs/women-empowerment" className="hover:text-white">Women Empowerment</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90 font-semibold">Widows & Vulnerable Women</span>
            </nav>
            <Link to="/programs/women-empowerment" className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-all mb-5">
              <ArrowLeft className="w-3.5 h-3.5" /> All Women Empowerment
            </Link>
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3.5 py-1 rounded-full mb-4">
              <Heart className="w-3.5 h-3.5" />
              <span className="text-xs font-bold tracking-wider uppercase text-white">Humanitarian Care</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Widows & Vulnerable Women Support<br />
              <span className="text-brand-orange">Dignity, Care & Pathways to Recovery</span>
            </h1>
            <p className="text-sm md:text-base text-white/85 max-w-2xl leading-relaxed">
              Delivering holistic assistance — monthly stipends, shelter repairs, orphan education funds, legal property aid, and vocational rehabilitation for bereaved and vulnerable women.
            </p>
          </div>
        </section>

        {/* 3 Beneficiary Groups */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              {BENEFICIARIES.map((b, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">Target Group 0{i + 1}</span>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{b.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6 Support Services Grid */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Comprehensive Assistance</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark">6 Key Pillars of Widow Welfare</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Addressing immediate survival needs while constructing long-term economic independence.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SUPPORT_SERVICES.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-green/40 transition-all flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-green transition-colors mb-2">{s.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 mt-5 flex items-center gap-1.5 text-xs font-bold text-brand-green">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Household Direct Support</span>
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
            <HandHeart className="w-10 h-10 text-brand-orange mx-auto" />
            <p className="text-xl md:text-2xl font-semibold leading-relaxed italic text-white/95">
              "No widow should face grief and extreme poverty alone. IWF stands beside every vulnerable woman — with unconditional care, compassion, and concrete support."
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="h-px w-8 bg-brand-orange/60" />
              <span className="text-brand-orange font-semibold text-xs uppercase tracking-widest">Islah Welfare Foundation</span>
              <span className="h-px w-8 bg-brand-orange/60" />
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <section className="py-8 bg-slate-100 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/programs/women-empowerment/gender-equality" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Prev: Gender Equality
            </Link>
            <Link to="/programs/relief-and-rehabilitation" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-green hover:bg-brand-green-dark px-5 py-2.5 rounded-lg transition-all shadow-sm">
              Relief & Rehabilitation Sector →
            </Link>
          </div>
        </section>
      </main>
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
