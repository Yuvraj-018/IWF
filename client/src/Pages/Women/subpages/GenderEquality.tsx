import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer } from "@/components/layout/SiteLayout";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Users, BookOpen, GraduationCap, Heart, Megaphone, Shield, CheckCircle2, Lightbulb, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import heroImg from "@/assets/sector_women_1.png";

export default function GenderEquality() {
  const PILLARS = [
    { icon: BookOpen, title: "Girls' Education Access", desc: "Advocating for 100% secondary school completion for girls and addressing dropout factors." },
    { icon: GraduationCap, title: "Women Leadership Mentoring", desc: "Training women to actively participate in Panchayat decisions, school committees, and village assemblies." },
    { icon: Heart, title: "Health & Menstrual Dignity", desc: "Combating period poverty, breaking taboos, and distributing hygienic menstrual kits across rural schools." },
    { icon: Megaphone, title: "Challenging Social Biases", desc: "Interactive community street plays and family counselling against child marriage and gender discrimination." },
    { icon: Users, title: "Male Allyship & Youth Engagement", desc: "Sensitizing boys and men to become proactive champions of gender equity in homes and public spaces." },
    { icon: Shield, title: "Safe & Inclusive Spaces", desc: "Creating community centres where women can freely study, learn trades, and discuss local welfare issues." },
  ];

  const ACTION_STEPS = [
    { num: "01", title: "Family Gender Pledge", desc: "Community campaigns encouraging parents to pledge equal nutrition, schooling, and freedom for daughters." },
    { num: "02", title: "Daughter Day Celebrations", desc: "Annual district ceremonies honouring high-achieving rural girls in academics, sports, and social work." },
    { num: "03", title: "Equal Futures Forum", desc: "Bi-monthly townhalls bringing together village elders, women leaders, and youth to discuss equality." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Standardized Hero */}
        <SubpageHeroCarousel
          tag="WOMEN & YOUTH • GEA"
          title="Gender Equality & Advocacy"
          subtitle="Fostering inclusive community mindsets through girls' education advocacy, male allyship workshops, leadership development, and anti-discrimination campaigns."
          breadcrumbs={[
            { label: "What We Do", href: "/programs" },
            { label: "Women & Youth", href: "/programs/women-empowerment" },
            { label: "Gender Equality" },
          ]}
          images={[heroImg]}
        >
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to="/programs/women-empowerment"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Women Empowerment
            </Link>
          </div>
        </SubpageHeroCarousel>

        {/* 6 Pillars Grid with Clean Cards */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Pillars of Equality</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900">6 Dimensions of Gender Progress</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Addressing root causes of inequality from household attitudes to institutional representation.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PILLARS.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all duration-200 group flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 group-hover:text-brand-green transition-colors mb-2">{p.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200/60 mt-5 flex items-center gap-1.5 text-xs font-semibold text-brand-green">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Community Action Focus</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3 Action Pathways */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Campaigns in Action</p>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900">3 Flagship Community Campaigns</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {ACTION_STEPS.map((act, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all duration-200">
                  <span className="text-xs font-semibold text-brand-orange uppercase tracking-widest block mb-2">Campaign {act.num}</span>
                  <h4 className="text-base font-semibold text-slate-900 mb-2">{act.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{act.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Banner */}
        <section className="py-10 bg-slate-50/70 border-y border-slate-200 text-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center mx-auto border border-orange-200/60">
              <Lightbulb className="w-5 h-5" />
            </div>
            <p className="text-lg md:text-xl font-semibold leading-relaxed italic text-slate-800">
              "Gender equality is not merely a women's issue — it is a human rights imperative and the foundational bedrock of all sustainable community development."
            </p>
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="h-px w-8 bg-brand-orange/60" />
              <span className="text-brand-orange font-medium text-xs uppercase tracking-widest">Islah Welfare Foundation</span>
              <span className="h-px w-8 bg-brand-orange/60" />
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <section className="py-8 bg-slate-100 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/programs/women-empowerment/womens-rights" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Prev: Women's Rights
            </Link>
            <Link to="/programs/women-empowerment/widows-vulnerable-women" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              Next: Widows Support <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
