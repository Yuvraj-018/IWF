import { useState } from "react";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Compass,
  Lightbulb,
  Award,
  BookOpen,
} from "lucide-react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import { MentorApplicationForm } from "@/components/forms/MentorApplicationForm";
import type { RoleType } from "@/components/forms/RoleFormModal";

export default function MentorPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  const scrollToForm = () => {
    document.getElementById("mentor-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* ─── Hero Section (Pages 41 & 43 of PDF) ───────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#062419] via-[#0b1f3b] to-[#043422] text-white py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" /> BECOME A MENTOR
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  Become a Mentor <br />
                  <span className="text-brand-orange text-2xl sm:text-4xl font-extrabold font-serif italic">
                    Share Your Knowledge. Inspire Lives. Create Lasting Impact.
                  </span>
                </h1>

                <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl pt-1">
                  Mentorship is one of the most powerful ways to empower individuals and strengthen communities. At <strong>ISLAH</strong>, we connect passionate professionals, educators, entrepreneurs, and domain experts with aspiring youth, students, women, and community workers in rural and underserved areas.
                </p>

                <p className="text-emerald-200/90 text-xs sm:text-sm leading-relaxed max-w-xl">
                  Whether online or on-site, one-to-one or through group sessions, your guidance can open new horizons for learners who lack professional networks.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={scrollToForm}
                    className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-xl shadow-lg shadow-brand-orange/30 transition-all hover:scale-[1.02] active:scale-95 text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
                  >
                    Apply as a Mentor <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="/mentorship-policy"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition text-xs sm:text-sm uppercase tracking-wider"
                  >
                    Mentorship Policy
                  </a>
                </div>
              </div>

              {/* Right Poster Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/15 bg-gradient-to-tr from-brand-green via-[#0b1f3b] to-emerald-900 p-8 text-center flex flex-col justify-between min-h-[340px]">
                  <div className="inline-block self-center px-4 py-1 rounded-full bg-white/15 text-white text-[11px] font-bold tracking-wider uppercase mb-3">
                    Knowledge Sharing Initiative
                  </div>

                  <div className="my-auto space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                      GUIDE. INSPIRE. <br />
                      <span className="text-brand-orange">TRANSFORM FUTURES.</span>
                    </h3>
                    <p className="text-emerald-100 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
                      A few hours of your month can help a student find a career path, clear a competitive exam, or build a rural enterprise.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/20 grid grid-cols-2 gap-3 text-white">
                    <div className="bg-white/10 rounded-xl p-2.5">
                      <div className="text-lg font-black text-brand-orange">Flexible</div>
                      <div className="text-[10px] text-white/80 font-bold uppercase">Online & Offline</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-2.5">
                      <div className="text-lg font-black text-brand-orange">1-to-1</div>
                      <div className="text-[10px] text-white/80 font-bold uppercase">Personalised Guidance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Who Can Benefit? (Page 46 of PDF) ──────────────────────────────── */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Impact Beneficiaries
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1f3b] mt-1">
                Who Can Benefit from Your Mentorship?
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Our mentorship initiatives bridge the gap between grassroots potential and professional opportunity.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "School & College Students",
                  desc: "Academic counseling, exam preparation guidance, scholarship applications, and higher education direction.",
                  icon: BookOpen,
                },
                {
                  title: "Aspiring Rural Youth",
                  desc: "Career roadmap building, resume building, interview preparation, digital skills, and competitive exam strategies.",
                  icon: Compass,
                },
                {
                  title: "Women & SHG Entrepreneurs",
                  desc: "Business planning, financial literacy, product marketing, value addition, and small enterprise scaling.",
                  icon: Lightbulb,
                },
                {
                  title: "Grassroots Development Workers",
                  desc: "Project execution advice, community mobilization strategies, documentation, and organizational best practices.",
                  icon: Users,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-brand-green hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-2 group-hover:text-brand-green transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Mentorship Application Form (Page 42) ──────────────────────────── */}
        <section id="mentor-form" className="py-16 bg-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-[#072417] via-[#0d3f27] to-[#0b1f3b] px-6 sm:px-10 py-6 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold mb-2">
                  <GraduationCap className="w-4 h-4" /> Official Application
                </div>
                <h2 className="text-2xl sm:text-3xl font-black">Mentor Application Form</h2>
                <p className="text-white/80 text-xs sm:text-sm mt-1">
                  Join hands with ISLAH and help us shape the next generation of rural leaders.
                </p>
              </div>

              <div className="p-6 sm:p-10">
                <MentorApplicationForm />
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
