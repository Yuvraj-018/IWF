import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NotificationTicker, UtilityBar, Header, Footer } from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import { Home, ChevronRight, ArrowLeft, ArrowRight, Heart, Gift, Users, Shield, Package, CheckCircle2, Sparkles, HandHeart } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import heroImg from "@/assets/sector_relief_1.png";

export default function MarriageAssistance() {
  const KIT_ITEMS = [
    { icon: Gift, title: "Essential Home Appliances & Utensils", desc: "Complete 42-piece stainless steel kitchen set, pressure cooker, mixer grinder, and daily culinary ware." },
    { icon: Package, title: "Bedding & Furniture Essentials", desc: "Durable wooden bed frame, cotton mattress, pillows, bedsheets, blankets, and storage trunk." },
    { icon: Heart, title: "Bridal Attire & Personal Care", desc: "Traditional wedding bridal suits, shoes, wrist watch, grooming essentials, and personal luggage." },
    { icon: Users, title: "Dignified Community Reception Support", desc: "Modest assistance with dignified venue arrangements and food packets for close guests." },
    { icon: Shield, title: "Legal Marriage Registration Aid", desc: "Full legal guidance and paperwork sponsorship for formal government/Nikah marriage certificates." },
    { icon: Sparkles, title: "Direct Financial Grant", desc: "Cash transfer directly to the bride's personal savings account to prevent indebtedness." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker /><UtilityBar /><Header />
      <main>
        {/* Clean Hero */}
        <SubpageHeroCarousel
          tag="Initiative • Social Dignity"
          title="Marriage Assistance Programme"
          subtitle="Relieving extreme financial stress on impoverished parents and widowed mothers by providing comprehensive bridal starter kits and legal registration assistance."
          breadcrumbs={[
            { label: "What We Do", href: "/programs" },
            { label: "Relief & Rehabilitation", href: "/programs/relief-and-rehabilitation" },
            { label: "Marriage Assistance" },
          ]}
          images={[heroImg]}
        >
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to="/programs/relief-and-rehabilitation"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Relief Programmes
            </Link>
          </div>
        </SubpageHeroCarousel>

        {/* 6 Kit Component Cards */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">Household Starter Kit</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="h-px w-8 bg-brand-green" />
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900">What the Marriage Kit Includes</h2>
                <span className="h-px w-8 bg-brand-green" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm">Carefully curated essentials allowing newly married couples to start their household comfortably without debt.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {KIT_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 group-hover:text-brand-green transition-colors mb-2">{item.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200/60 mt-5 flex items-center gap-1.5 text-xs font-semibold text-brand-green">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Quality Inspected</span>
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
              "No parent should be driven to crippling debt or despair when getting their daughter married. We ensure every marriage is celebrated with honour and joy."
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
            <Link to="/programs/relief-and-rehabilitation/widows-orphans" className="inline-flex items-center gap-2 text-sm font-bold text-brand-green-dark hover:text-brand-green border border-slate-300 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Prev: Widows & Orphans
            </Link>
            <Link to="/programs/relief-and-rehabilitation/seasonal-relief" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-lg transition-all shadow-sm">
              Next: Seasonal Relief <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
