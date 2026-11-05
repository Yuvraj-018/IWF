import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  PackageCheck,
  Heart,
  BookOpen,
  CheckCircle2,
  Users,
  Award,
  PenTool,
  Bookmark,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  NotificationTicker,
  UtilityBar,
  Header,
  Footer,
} from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import kitImg from "@/assets/sector_education_2.png";
import causeEduImg from "@/assets/cause-education.jpg";

export default function SchoolKitPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* Hero Section */}
      <SubpageHeroCarousel
        tag="EDUCATION • SKLS"
        title="School Kit & Learning Support (SKLS)"
        subtitle="Providing essential school kits to underprivileged children for a brighter and confident future. Removing basic resource barriers so every child can learn with dignity."
        breadcrumbs={[
          { label: "What We Do", href: "/programs" },
          { label: "Education", href: "/programs/education" },
          { label: "School Kit Support" },
        ]}
        images={[kitImg, causeEduImg]}
      >
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link to="/donate" search={{ financialType: "Education & Learning", initiative: "School Kit & Learning Support (SKLS)" }} className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider cursor-pointer">
            <Heart className="w-4 h-4 fill-white" />
            <span>Support a Child</span>
          </Link>

          <Link to="/partner" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-xl backdrop-blur-xs transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider cursor-pointer">
            <PackageCheck className="w-4 h-4 text-brand-orange" />
            <span>Donate for School Kits</span>
          </Link>
        </div>
      </SubpageHeroCarousel>

      {/* ─── Highlights Ribbon (Symmetrical 4-Card Grid) ─────────────────── */}
      <section className="bg-slate-50 border-b border-slate-200 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center">
            {[
              { title: "Essential School Kits", desc: "Age-appropriate materials", icon: PackageCheck },
              { title: "Encouraging Education", desc: "Motivating regular attendance", icon: BookOpen },
              { title: "Building Confidence", desc: "Dignity without stigma", icon: Award },
              { title: "Rural Communities", desc: "Deep grassroots reach", icon: Users },
            ].map((pill) => {
              const IconC = pill.icon;
              return (
                <div
                  key={pill.title}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3.5 hover:shadow-xs transition"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <IconC className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      {pill.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-tight mt-1">
                      {pill.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Main Content Canvas (Continuous, Airy Whitespace like About Us Overview) ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14 sm:space-y-16">
        {/* Section 1: Challenge & Intervention */}
        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 items-stretch">
            {/* The Challenge */}
            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-brand-orange block">
                      GROUND REALITY
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      The Educational Challenge
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  In many underserved rural communities, access to education is not only limited by
                  infrastructure but also by the lack of basic learning materials. Thousands of
                  children—especially orphans and students from economically weaker families—are
                  unable to afford essentials such as school bags, notebooks, uniforms, and stationery.
                </p>

                <p className="text-xs font-semibold text-slate-800">
                  For poor families, these basic items often become a financial burden, leading to:
                </p>

                <div className="space-y-2 text-xs text-slate-700">
                  {[
                    "Low school attendance and irregular participation",
                    "Poor learning outcomes due to lack of study materials",
                    "Increased dropout rates at an early stage",
                    "Loss of confidence and interest in education",
                  ].map((ch) => (
                    <div key={ch} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>{ch}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-600 bg-amber-50/80 p-3.5 rounded-xl border border-amber-200/80 leading-relaxed mt-2">
                Without these essential tools, children are unable to fully participate in classroom
                learning, directly affecting their academic progression.
              </p>
            </div>

            {/* ISLAH Intervention */}
            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 block">
                      ISLAH INTERVENTION
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Our Comprehensive Response
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Recognising this fundamental gap, Islah Welfare Foundation proposes the School Kit
                  Distribution Programme to ensure that no child is deprived of education due to a lack
                  of basic resources.
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Each kit is thoughtfully designed to ensure that children can attend school with
                  confidence, dignity, and readiness to learn. By removing these basic obstacles, the
                  initiative directly contributes to improved enrolment, regular attendance, and
                  sustained engagement in education.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-emerald-200/70 space-y-1.5 mt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Dignity in Every Kit — Support Without Stigma
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We believe educational assistance should be provided in a manner that respects the
                  dignity and privacy of every child. The purpose is not to label a child as a
                  beneficiary, but to empower a learner to participate with pride.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 2: Programme Objective Callout */}
        <ScrollReveal>
          <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-8 sm:p-10 text-center space-y-3 shadow-xs max-w-4xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              PROGRAMME OBJECTIVE
            </span>
            <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed max-w-3xl mx-auto italic">
              “To provide essential school kits to underprivileged students, enabling them to attend
              school with dignity, confidence, and readiness to learn, while reducing dropout rates.”
            </p>
          </div>
        </ScrollReveal>

        {/* Section 3: Programme Approach & Kit Components */}
        <ScrollReveal>
          <div className="space-y-8">
            <div className="text-center max-w-4xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                PROGRAMME APPROACH
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Provision of Complete, Age-Appropriate School Kits
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
                Each kit is curated with durable, high-utility supplies tailored to the student's grade level.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "School Bags",
                  desc: "Durable, waterproof, and ergonomic backpacks built for rugged rural terrains.",
                  icon: PackageCheck,
                  color: "#004724",
                  badge: "Ergonomic & Tough",
                },
                {
                  title: "Notebooks & Textbooks",
                  desc: "High-quality lined and unlined notebooks for comprehensive classwork and writing.",
                  icon: BookOpen,
                  color: "#2563eb",
                  badge: "Grade-Specific",
                },
                {
                  title: "Pens, Pencils & Stationery",
                  desc: "Complete pencil cases with pens, pencils, erasers, sharpeners, and geometry rulers.",
                  icon: PenTool,
                  color: "#ea580c",
                  badge: "Complete Geometry Set",
                },
                {
                  title: "Basic Learning Materials",
                  desc: "Drawing sketchbooks, crayons, color pencils, and visual supplementary study aids.",
                  icon: Bookmark,
                  color: "#7c3aed",
                  badge: "Creative Expression",
                },
              ].map((kit) => {
                const IconC = kit.icon;
                return (
                  <div
                    key={kit.title}
                    className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${kit.color}15`, color: kit.color }}
                        >
                          <IconC className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                          {kit.badge}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-slate-900 leading-snug">
                        {kit.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {kit.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>100% Brand New Supplies</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Section 4: Implementation, Impact & Why It Matters */}
        <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Implementation Plan */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-800 pb-2 border-b border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>IMPLEMENTATION PLAN</span>
                </div>
                <div className="space-y-3 text-xs text-slate-700">
                  {[
                    "Identification of needy students in rural areas",
                    "Procurement of high-grade, durable school kits",
                    "Distribution through schools and local community partners",
                    "Ensuring transparent and equitable distribution",
                    "Regular monitoring and feedback collection",
                  ].map((step) => (
                    <div key={step} className="flex items-start gap-2.5 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Expected Impact */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-purple-700 pb-2 border-b border-slate-200">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span>EXPECTED IMPACT</span>
                </div>
                <div className="space-y-3 text-xs text-slate-700">
                  {[
                    "Improved school attendance and regular participation",
                    "Reduction in dropout rates among poor students",
                    "Enhanced learning outcomes and academic performance",
                    "Increased confidence and motivation among children",
                    "Encouragement for families to prioritise education",
                  ].map((imp) => (
                    <div key={imp} className="flex items-start gap-2.5 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                      <span>{imp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Why It Matters */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-brand-orange pb-2 border-b border-slate-200">
                  <Heart className="w-4 h-4 text-brand-orange" />
                  <span>WHY IT MATTERS</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A simple school kit removes barriers, restores dignity, and shows a child that they
                  are valued.
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  It empowers them to learn with confidence and dream of a better future. When many people
                  contribute together, small acts of support create life-changing educational opportunities.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 text-[11px] font-semibold text-brand-orange">
                Dignity • Opportunity • Equal Access
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 5: Warm Light Callout / CTA (Matching About Us Overview - Zero Black Boxes) */}
        <ScrollReveal>
          <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-8 sm:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 fill-brand-orange text-brand-orange" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-bold text-[#0b1f3b]">
                  “A simple school kit can change a child's journey.”
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Empower children with confidence, dignity, and the opportunity to learn, grow, and build a better future.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link to="/donate" search={{ financialType: "Education & Learning", initiative: "School Kit & Learning Support (SKLS)" }} className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider cursor-pointer">
                <Heart className="w-4 h-4 fill-white" />
                <span>Support a Child</span>
              </Link>

              <Link to="/partner" className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xs transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider cursor-pointer">
                <PackageCheck className="w-4 h-4 text-brand-orange" />
                <span>Donate for School Kits</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
