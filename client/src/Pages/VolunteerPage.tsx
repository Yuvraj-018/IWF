import {
  Award,
  BookOpen,
  Briefcase,
  Calculator,
  Code2,
  GraduationCap,
  Heart,
  HeartPulse,
  Home,
  Scale,
  Sparkles,
  Stethoscope,
  UserRoundCheck,
  Users,
  Download,
} from "lucide-react";
import { Footer, Header, NotificationTicker, UtilityBar } from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import { ApplicationWizard } from "@/components/forms/wizard/ApplicationWizard";
import { volunteerFormConfig } from "@/components/forms/wizard/configs/volunteerForm";
import {
  FinalCta,
  FormSection,
  HeroActions,
  IconCards,
  JourneySteps,
  Section,
  SectionHeader,
  pastel,
} from "@/components/getInvolved/PageSections";
import { SECTOR_CATALOGUE } from "@/content/sectorCatalogue";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el)
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 80,
      behavior: "smooth",
    });
};

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main className="flex-grow">
        {/* 01. Hero */}
        <SubpageHeroCarousel
          tag="VOLUNTEER WITH ISLAH"
          title="Together, We Can Make a Difference"
          subtitle="Volunteers are the driving force behind meaningful social change. Whether you are a student, professional, homemaker, retiree or corporate employee, your time, skills and compassion can help transform lives and strengthen rural communities."
          breadcrumbs={[
            { label: "Get Involved", href: "/get-involved" },
            { label: "Volunteer With Us" },
          ]}
        >
          <HeroActions
            primary={{ label: "Volunteer With Us", target: "volunteer-form" }}
            secondary={{ label: "Explore Volunteer Options", target: "opportunities" }}
            community={{
              label: "Meet our volunteer community",
              to: "/about/community",
              search: { tab: "volunteers" },
            }}
          />
        </SubpageHeroCarousel>

        {/* 02. Why volunteer */}
        <Section>
          <SectionHeader
            eyebrow="02. Why Volunteer With Us"
            title="Serve, Learn and Grow With a Purpose"
            desc="Volunteering with ISLAH is an opportunity to serve society, develop leadership skills and become part of a dedicated community working towards sustainable rural transformation."
          />
          <IconCards
            columns={3}
            items={[
              {
                icon: Heart,
                title: "Make a Meaningful Impact",
                desc: "Help create positive, measurable and lasting change in the lives of rural families.",
              },
              {
                icon: Sparkles,
                title: "Share Your Skills & Knowledge",
                desc: "Use your professional background, ideas and talent to strengthen grassroots communities.",
              },
              {
                icon: GraduationCap,
                title: "Gain Experience & Grow",
                desc: "Build leadership, teamwork and project-execution skills through real field initiatives.",
              },
              {
                icon: Users,
                title: "Join a Passionate Team",
                desc: "Work alongside changemakers, educators, doctors and community mobilisers.",
              },
              {
                icon: Award,
                title: "Recognition & Appreciation",
                desc: "Receive a volunteer certificate, recommendation letters and recognition for your dedication.",
              },
              {
                icon: UserRoundCheck,
                title: "Flexible Commitment",
                desc: "Contribute on-site, online or in a hybrid way — as regularly or occasionally as suits you.",
              },
            ]}
          />
        </Section>

        {/* 03. Opportunities */}
        <Section id="opportunities" tone="muted">
          <SectionHeader
            eyebrow="03. Volunteer Opportunities"
            title="Opportunities Across Our 8 Working Sectors"
            desc="Our work spans eight interconnected areas. Choose the one where your passion meets community purpose — you can pick specific activities in the application."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SECTOR_CATALOGUE.slice(0, 8).map((sector, i) => {
              const p = pastel(i);
              return (
                <div
                  key={sector.name}
                  className={`rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 ${p.hover} flex flex-col`}
                >
                  <span
                    className={`self-start text-[11px] font-semibold px-2 py-0.5 rounded-full ${p.bg} ${p.icon}`}
                  >
                    {sector.areas.length} activity areas
                  </span>
                  <h3 className="text-sm sm:text-base font-semibold text-[#071527] mt-2.5 leading-snug">
                    {sector.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {sector.short}
                  </p>
                  <ul className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600 flex-1">
                    {sector.areas.slice(0, 3).map((a) => (
                      <li key={a} className="flex gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => scrollTo("volunteer-form")}
                    className="mt-4 text-xs font-semibold text-brand-orange hover:text-orange-700 text-left"
                  >
                    Volunteer in this sector →
                  </button>
                </div>
              );
            })}
          </div>
        </Section>

        {/* 04. Who can join */}
        <Section>
          <SectionHeader
            eyebrow="04. Who Can Join"
            title="Open to Everyone Who Wants to Help"
            desc="No prior volunteering experience is required — only dedication, compassion and a genuine willingness to help."
          />
          <div className="space-y-5">
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              {[
                { icon: GraduationCap, label: "Students & College Youth" },
                { icon: BookOpen, label: "Teachers & Educators" },
                { icon: Stethoscope, label: "Doctors & Healthcare Workers" },
                { icon: Code2, label: "Engineers & IT Professionals" },
                { icon: Scale, label: "Lawyers & Legal Experts" },
                { icon: Calculator, label: "Chartered Accountants" },
                { icon: Home, label: "Homemakers" },
                { icon: Award, label: "Retired Professionals" },
                { icon: Briefcase, label: "Corporate Employees" },
                { icon: HeartPulse, label: "Social Workers & Changemakers" },
              ].map((r, i) => {
                const p = pastel(i);
                return (
                  <div
                    key={r.label}
                    className={`flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3.5 py-3 transition ${p.hover}`}
                  >
                    <span
                      className={`w-8 h-8 rounded-md ${p.bg} ${p.icon} flex items-center justify-center shrink-0`}
                    >
                      <r.icon className="w-4 h-4" />
                    </span>
                    <span className="text-sm text-slate-800">{r.label}</span>
                  </div>
                );
              })}
            </div>
            <figure className="rounded-xl border border-slate-200 border-l-4 border-l-brand-orange bg-slate-50/70 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1">
              <blockquote className="text-base font-serif italic text-slate-700 leading-relaxed">
                “Alone we can do so little; together we can do so much.”
              </blockquote>
              <figcaption className="text-xs font-semibold uppercase tracking-wider text-brand-orange shrink-0">
                — Helen Keller
              </figcaption>
            </figure>
          </div>
        </Section>

        {/* 05. How to get started */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="05. How to Get Started"
            title="Your Volunteer Journey With ISLAH"
            desc="A simple, transparent process — from your first application to your first day contributing."
          />
          <JourneySteps
            steps={[
              {
                title: "Explore",
                desc: "Browse our sectors and find the area where your skills and interests fit best.",
              },
              {
                title: "Apply",
                desc: "Complete the short three-step application with your interests, skills and availability.",
              },
              {
                title: "Review & Connect",
                desc: "Our coordinator reviews your profile and aims to contact you within 7 working days.",
              },
              {
                title: "Orientation",
                desc: "Selected volunteers receive a brief orientation, role details and guidance.",
              },
              {
                title: "Start Contributing",
                desc: "Begin online, hybrid or in the field — and grow with the community over time.",
              },
            ]}
          />

          {/* Volunteer Handbook Download Banner */}
          <div className="mt-8 rounded-2xl border border-orange-200/90 bg-gradient-to-r from-orange-50 via-white to-amber-50/70 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-orange text-[11px] font-bold uppercase tracking-wider">
                Official Volunteer Blueprint
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#071527]">
                Download Get Involved &amp; Volunteer Handbook
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                Comprehensive 86-page guide covering volunteer roles, membership guidelines, mentorship pathways, code of conduct, and field safety protocols.
              </p>
            </div>
            <a
              href="https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/docs/get_involved_and_volunteer_handbook.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-orange/20 transition cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download Handbook (PDF)</span>
            </a>
          </div>
        </Section>

        {/* 06. Application */}
        <FormSection
          id="volunteer-form"
          eyebrow="06. Volunteer Application"
          title="Your Time. Your Skills. Your Impact."
          desc="Tell us about your interests, skills and availability so we can explore a suitable volunteering opportunity with you. Your progress is saved on this device as you go."
        >
          <ApplicationWizard config={volunteerFormConfig} />
        </FormSection>

        <FinalCta
          title="Ready to Continue Exploring ISLAH?"
          desc="Explore other ways to support our programmes through mentoring, partnerships, sponsorship and membership."
          primary={{ label: "Return to Get Involved", to: "/get-involved" }}
          secondary={{ label: "Become a Mentor", to: "/mentor" }}
        />
      </main>

      <Footer />
    </div>
  );
}
