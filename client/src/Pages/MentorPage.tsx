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

import { StandardPageHero } from "@/components/layout/StandardPageHero";

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
        {/* Standardized Hero Section */}
        <StandardPageHero
          badge="BECOME A MENTOR"
          title="Become a Mentor"
          description="Share your knowledge, inspire lives, and create lasting impact. At ISLAH, we connect passionate professionals, educators, and domain experts with aspiring youth, students, and community workers in rural and underserved areas."
          breadcrumb={[{ label: "Become a Mentor" }]}
        >
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
        </StandardPageHero>

        {/* ─── Who Can Benefit? (Page 46 of PDF) ──────────────────────────────── */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Impact Beneficiaries
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Who Can Benefit from Your Mentorship?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal mt-2">
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
                  <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-brand-green transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">{item.desc}</p>
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
              <div className="bg-gradient-to-r from-[#071527] to-[#0c2340] px-6 sm:px-10 py-6 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold mb-2">
                  <GraduationCap className="w-4 h-4" /> Official Application
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Mentor Application Form</h2>
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
