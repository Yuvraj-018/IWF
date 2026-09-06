import { useState, useRef } from "react";
import {
  Heart,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  Shield,
  FileText,
  Check,
  Briefcase,
  GraduationCap,
  Calendar,
  BookOpen,
  Sprout,
  HeartPulse,
  Scale,
  TreePine,
  ShieldAlert,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import { VOLUNTEER_SECTORS } from "@/content/volunteerSectors";
import { VolunteerApplicationForm } from "@/components/forms/VolunteerApplicationForm";

export default function VolunteerPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const formRef = useRef<HTMLElement>(null);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* ─── Hero Section (Page 3 Mockup) ────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#072417] via-[#0d3f27] to-[#071d13] text-white py-16 sm:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-black uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5 fill-brand-orange" /> Get Involved
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  VOLUNTEER <br />
                  <span className="text-brand-orange">WITH US</span>
                </h1>

                <p className="text-xl sm:text-2xl font-serif italic text-emerald-200/90 font-light">
                  Your Time. Their Future.
                </p>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  Be the change you wish to see in the world. At ISLAH, your time, skills, and compassion
                  can directly transform lives and build self-reliant rural communities.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => scrollToSection("volunteer-form")}
                    className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-xl shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => scrollToSection("opportunities")}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition text-xs sm:text-sm uppercase tracking-wider"
                  >
                    Explore Opportunities
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-gradient-to-tr from-brand-green to-emerald-800 p-8 text-center flex flex-col justify-between min-h-[340px]">
                  <div className="inline-block self-center px-4 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold tracking-wider uppercase mb-4">
                    Movement for Social Change
                  </div>

                  <div className="my-auto space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-wide">
                      TOGETHER WE CAN CREATE CHANGE
                    </h3>
                    <p className="text-emerald-100 text-xs sm:text-sm max-w-xs mx-auto">
                      Join thousands of dedicated volunteers bringing education, healthcare, and livelihood support to underserved villages.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/20 grid grid-cols-3 gap-2 text-white">
                    <div>
                      <div className="text-xl font-extrabold text-brand-orange">5,800+</div>
                      <div className="text-[10px] text-white/75 font-semibold uppercase">Volunteers</div>
                    </div>
                    <div>
                      <div className="text-xl font-extrabold text-brand-orange">8</div>
                      <div className="text-[10px] text-white/75 font-semibold uppercase">Sectors</div>
                    </div>
                    <div>
                      <div className="text-xl font-extrabold text-brand-orange">120+</div>
                      <div className="text-[10px] text-white/75 font-semibold uppercase">Villages</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Why Volunteer with ISLAH? ────────────────────────────────────────── */}
        <section className="py-14 bg-slate-50 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Purpose & Benefits
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-green-dark mt-1">
                Why Volunteer with ISLAH?
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2">
                Volunteering with ISLAH is an opportunity to serve society, develop leadership skills,
                and become part of a dedicated community working towards sustainable rural transformation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  icon: Heart,
                  title: "Make a Meaningful Impact",
                  desc: "Help create positive, measurable, and lasting change in the lives of rural families.",
                  color: "#15803d",
                },
                {
                  icon: Sparkles,
                  title: "Share Your Skills & Knowledge",
                  desc: "Use your professional background, ideas, and talent to strengthen grassroots communities.",
                  color: "#0284c7",
                },
                {
                  icon: GraduationCap,
                  title: "Gain Experience & Grow",
                  desc: "Enhance your leadership, teamwork, and project execution through real-world field initiatives.",
                  color: "#ea580c",
                },
                {
                  icon: Users,
                  title: "Be Part of a Passionate Team",
                  desc: "Work alongside passionate changemakers, educators, doctors, and community mobilizers.",
                  color: "#7c3aed",
                },
                {
                  icon: Award,
                  title: "Recognition & Appreciation",
                  desc: "Earn an official Volunteer Certificate, recommendation letters, and recognition for your dedication.",
                  color: "#d97706",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 text-center flex flex-col items-center hover:shadow-md hover:border-slate-300 transition-all group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 text-white shadow-sm group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: item.color }}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 leading-snug mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Volunteer Opportunities (8 What We Do Sectors) ──────────────────── */}
        <section id="opportunities" className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                  Explore What We Do
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-green-dark mt-1">
                  Volunteer Opportunities Across Our 8 Working Sectors
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xl">
                  Our work spans eight interconnected thematic areas. Choose the domain where your passion meets community purpose.
                </p>
              </div>

              <button
                onClick={() => scrollToSection("volunteer-form")}
                className="inline-flex items-center gap-2 bg-brand-green text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-green-dark transition shrink-0"
              >
                Apply for Any Sector <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {VOLUNTEER_SECTORS.map((sector) => {
                return (
                  <div
                    key={sector.id}
                    className="rounded-2xl border border-slate-200 p-5 bg-white hover:border-brand-green hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white uppercase tracking-wider"
                          style={{ backgroundColor: sector.badgeColor }}
                        >
                          Sector #{sector.id}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {sector.subcategories.length} initiatives
                        </span>
                      </div>

                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-green transition-colors leading-snug">
                        {sector.name}
                      </h3>

                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {sector.shortDescription}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Key Activities:
                        </p>
                        {sector.subcategories.slice(0, 3).map((sub, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                            <span className="truncate">{sub}</span>
                          </div>
                        ))}
                        {sector.subcategories.length > 3 && (
                          <p className="text-[11px] text-brand-green font-semibold">
                            +{sector.subcategories.length - 3} more sub-activities
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollToSection("volunteer-form")}
                      className="mt-5 w-full py-2 rounded-xl bg-slate-50 hover:bg-brand-green/10 text-brand-green font-bold text-xs transition border border-slate-200 hover:border-brand-green/30 flex items-center justify-center gap-1.5"
                    >
                      Choose in Application <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Who Can Join & Helen Keller Quote ───────────────────────────────── */}
        <section className="py-12 bg-slate-50 border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                    Open To Everyone
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-brand-green-dark">
                    Who Can Join as an ISLAH Volunteer?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    No prior volunteering experience is mandatory — only dedication, compassion, and a genuine willingness to help.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  {[
                    "Students & College Youth",
                    "Teachers & Educators",
                    "Doctors & Healthcare Workers",
                    "Engineers & IT Professionals",
                    "Lawyers & Legal Experts",
                    "Chartered Accountants",
                    "Homemakers",
                    "Retired Professionals",
                    "Corporate Employees",
                    "Social Workers & Changemakers",
                  ].map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs hover:border-brand-green hover:text-brand-green transition"
                    >
                      <Check className="w-3 h-3 text-brand-green" /> {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="bg-[#0b1f3b] text-white p-6 rounded-2xl shadow-md border-l-4 border-brand-orange">
                  <p className="text-sm sm:text-base font-serif italic text-white/90 leading-relaxed">
                    “Alone we can do so little; together we can do so much.”
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-orange mt-3">
                    — Helen Keller
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3-Step Volunteer Journey ────────────────────────────────────────── */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Simple 3 Steps
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-brand-green-dark mt-1 mb-8">
              How to Get Started with ISLAH
            </h3>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Fill Application Form",
                  desc: "Provide your basic details, qualification, and choose your working sectors of interest below.",
                },
                {
                  step: "2",
                  title: "We Review Your Application",
                  desc: "Our volunteer coordinator team reviews your profile and connects with you within 7 working days.",
                },
                {
                  step: "3",
                  title: "Start Your Journey",
                  desc: "Complete brief orientation and begin contributing online, hybrid, or directly on the field!",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center relative"
                >
                  <div className="w-9 h-9 rounded-full bg-brand-green text-white font-extrabold text-sm flex items-center justify-center mx-auto mb-3 shadow-xs">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Volunteer Application Form (Page 4) ────────────────────────────── */}
        <section id="volunteer-form" ref={formRef} className="py-16 bg-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="p-6 sm:p-10">
                <VolunteerApplicationForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
