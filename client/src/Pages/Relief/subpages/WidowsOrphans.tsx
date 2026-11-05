import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer } from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Heart, GraduationCap, Banknote, Shield, Users, CheckCircle2, HandHeart, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_relief_1.png";

export default function WidowsOrphans() {
  const STAGES = [
    {
      step: "01",
      icon: Users,
      title: "Guardian & Orphan Verification",
      desc: "Door-to-door social audit verifying the socio-economic status of bereaved children and widowed caretakers.",
    },
    {
      step: "02",
      icon: GraduationCap,
      title: "Complete Education Sponsorship",
      desc: "Covering 100% of school tuition, books, uniforms, bags, shoes, and after-school remedial coaching fees.",
    },
    {
      step: "03",
      icon: Banknote,
      title: "Monthly Household Subsidy",
      desc: "Direct digital cash assistance to ensure adequate family nutrition, preventing child labour and school dropouts.",
    },
    {
      step: "04",
      icon: Heart,
      title: "Holistic Health & Mentorship",
      desc: "Annual comprehensive pediatric health checkups, dental screening, and emotional mentorship from trained volunteers.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <SubpageHeroCarousel
          tag="Initiative • Compassionate Care"
          title="Widows & Orphans Care"
          subtitle="Guaranteed educational sponsorships, monthly nutrition stipends, healthcare, and compassionate mentorship for orphaned children and destitute widowed mothers."
          breadcrumbs={[
            { label: "What We Do", href: "/programs" },
            { label: "Relief & Rehabilitation", href: "/programs/relief-and-rehabilitation" },
            { label: "Widows & Orphans Support" },
          ]}
          images={[heroImg]}
        >
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to="/sponsor"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider"
            >
              Sponsor an Orphan
            </Link>
            <Link
              to="/partner"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-xl backdrop-blur-xs transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider"
            >
              Partner With Us
            </Link>
            <Link
              to="/programs/relief-and-rehabilitation"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2.5 rounded-xl transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Relief Programmes
            </Link>
          </div>
        </SubpageHeroCarousel>

        {/* Stepwise Progression Pathway */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Our Care Model</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900">4-Stage Child & Widow Protection</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">A holistic, continuous support system ensuring every orphaned child has access to education and security.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STAGES.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-brand-green/30 group-hover:text-brand-green transition-colors">{s.step}</span>
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <h4 className="text-base font-semibold text-slate-900 mb-2">{s.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200/60 mt-4 flex items-center gap-1.5 text-xs font-semibold text-brand-green">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Impact</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quote Banner */}
        <section className="py-10 bg-slate-50/70 border-y border-slate-200 text-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center mx-auto border border-orange-200/60">
              <HandHeart className="w-5 h-5" />
            </div>
            <p className="text-lg md:text-xl font-semibold leading-relaxed italic text-slate-800">
              "The best home is the home in which an orphan is treated with kindness and care. We are honoured to be the guardians of our children's future."
            </p>
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="h-px w-8 bg-brand-orange/60" />
              <span className="text-brand-orange font-medium text-xs uppercase tracking-widest">Islah Welfare Foundation</span>
              <span className="h-px w-8 bg-brand-orange/60" />
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 bg-slate-100 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/programs/relief-and-rehabilitation/housing-necessities" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Prev: Housing & Necessities
            </Link>
            <Link to="/programs/relief-and-rehabilitation/marriage-assistance" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              Next: Marriage Assistance <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
