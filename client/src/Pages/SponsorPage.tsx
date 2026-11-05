import { Link } from "@tanstack/react-router";
import {
  Building2,
  CalendarSync,
  FolderKanban,
  Home,
  Landmark,
  Package,
  ShieldCheck,
  Tags,
  Target,
  User,
  Users,
} from "lucide-react";
import { Footer, Header, NotificationTicker, UtilityBar } from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import { ApplicationWizard } from "@/components/forms/wizard/ApplicationWizard";
import { sponsorFormConfig } from "@/components/forms/wizard/configs/sponsorForm";
import {
  CheckPills,
  FinalCta,
  FormSection,
  HeroActions,
  IconCards,
  JourneySteps,
  PolicyLinks,
  Section,
  SectionHeader,
  pastel,
} from "@/components/getInvolved/PageSections";
import { SECTOR_CATALOGUE, SECTOR_PROGRAMMES } from "@/content/sectorCatalogue";

const SPONSOR_AREAS: Record<string, string> = {
  "Education & Learning":
    "Learning opportunities, academic assistance, scholarships, libraries, mentoring and educational resources.",
  "Healthcare & Well-being":
    "Health awareness, preventive healthcare, medical camps and community well-being.",
  "Women & Youth Empowerment":
    "Skills, leadership, entrepreneurship and opportunities for women and young people.",
  "Skills & Livelihoods":
    "Vocational training, employability, entrepreneurship and livelihood development.",
  "Social Justice & Legal Empowerment":
    "Rights awareness, legal literacy and community empowerment.",
  "Agriculture & Rural Livelihoods":
    "Farmers, sustainable agriculture and rural livelihood initiatives.",
  "Environment & Sustainable Development":
    "Environmental awareness, conservation and sustainable community initiatives.",
  "Humanitarian Relief & Rehabilitation":
    "Relief, recovery and rehabilitation for communities affected by emergencies.",
};

export default function SponsorPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main className="flex-grow">
        {/* 01. Hero */}
        <SubpageHeroCarousel
          tag="SPONSOR A PROGRAMME"
          title="Support a Programme. Strengthen a Community."
          subtitle="Whether you are an individual, family, company, foundation or institution, your sponsorship can help a community programme move from planning to meaningful action."
          breadcrumbs={[
            { label: "Get Involved", href: "/get-involved" },
            { label: "Sponsor a Programme" },
          ]}
        >
          <HeroActions
            primary={{ label: "Sponsor a Programme", target: "sponsor-form" }}
            secondary={{ label: "Explore Sponsor Options", target: "what-to-sponsor" }}
            community={{
              label: "See our sponsor community",
              to: "/about/community",
              search: { tab: "partners" },
            }}
          />
        </SubpageHeroCarousel>

        {/* 02. What can you sponsor */}
        <Section id="what-to-sponsor">
          <SectionHeader
            eyebrow="02. What Can You Sponsor?"
            title="Programmes You Can Support"
            desc="Each sector runs defined programmes. Choose a sector here, then pick specific programmes in the application."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SECTOR_CATALOGUE.slice(0, 8).map((s, i) => {
              const p = pastel(i);
              const programmes = SECTOR_PROGRAMMES[s.name] ?? [];
              return (
                <div
                  key={s.name}
                  className={`rounded-xl border border-slate-200 bg-white p-5 transition ${p.hover} flex flex-col`}
                >
                  <span
                    className={`self-start text-[11px] font-semibold px-2 py-0.5 rounded-full ${p.bg} ${p.icon}`}
                  >
                    {String(i + 1).padStart(2, "0")} · {programmes.length} programmes
                  </span>
                  <h3 className="text-sm sm:text-base font-semibold text-[#071527] mt-2.5 leading-snug">
                    {s.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {SPONSOR_AREAS[s.name]}
                  </p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* 03. Sponsorship opportunities */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="03. Sponsorship Opportunities"
            title="Choose How You Want to Sponsor"
          />
          <IconCards
            columns={3}
            items={[
              {
                icon: FolderKanban,
                title: "Programme Sponsorship",
                desc: "Support an identified ISLAH programme for a defined period.",
              },
              {
                icon: Target,
                title: "Project Sponsorship",
                desc: "Support a specific project, activity or community initiative.",
              },
              {
                icon: Home,
                title: "Community / Village Initiative",
                desc: "Support a defined community or cluster where a programme is implemented.",
              },
              {
                icon: Tags,
                title: "Thematic Sponsorship",
                desc: "Support an area such as education, healthcare or livelihoods.",
              },
              {
                icon: Package,
                title: "Resource Sponsorship",
                desc: "Equipment, learning materials, technology or infrastructure.",
              },
              {
                icon: CalendarSync,
                title: "Recurring Programme Support",
                desc: "Regular sponsorship that sustains an ongoing programme.",
              },
            ]}
          />
        </Section>

        {/* 04. Sponsorship with purpose */}
        <Section>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <SectionHeader
              eyebrow="04. Sponsorship With Purpose"
              title="From Resources to Results"
              desc="Your sponsorship provides the resources required to plan, implement and strengthen community-focused programmes. Depending on the programme, sponsors may receive updates on:"
            />
            <CheckPills
              items={[
                "Activities completed",
                "Communities reached",
                "Programme progress",
                "Resources utilised",
                "Photographic documentation where appropriate",
                "Key outputs and outcomes",
                "Programme learnings",
              ]}
            />
          </div>
        </Section>

        {/* 05. Journey */}
        <Section tone="muted">
          <SectionHeader eyebrow="05. The Sponsorship Journey" title="How Sponsorship Works" />
          <JourneySteps
            steps={[
              { title: "Connect", desc: "Tell us what area or programme you'd like to support." },
              { title: "Explore", desc: "Review suitable programme or project opportunities." },
              { title: "Align", desc: "Discuss scope, activities and resource requirements." },
              { title: "Confirm", desc: "Finalise amount, duration, documentation and terms." },
              { title: "Support", desc: "Your sponsorship contributes to implementation." },
              { title: "Report", desc: "Receive appropriate programme updates and documentation." },
              { title: "Review", desc: "Understand progress, learning and future opportunities." },
            ]}
          />
        </Section>

        {/* 06–07. Expectations & accountability */}
        <Section>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <SectionHeader
                eyebrow="06. What Sponsors Can Expect"
                title="Depending on the Arrangement"
              />
              <CheckPills
                items={[
                  "Confirmation of sponsorship",
                  "Programme information",
                  "Defined sponsorship scope",
                  "Utilisation documentation",
                  "Programme updates",
                  "Relevant photographs / documentation",
                  "Progress information",
                  "Impact reporting where applicable",
                  "Donation documentation as applicable",
                  "Continued engagement opportunities",
                ]}
              />
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6">
              <span className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <span className="block text-xs font-bold uppercase tracking-wider text-brand-orange mt-4">
                07. Financial Accountability
              </span>
              <h3 className="text-xl font-semibold text-[#071527] mt-1">
                Responsible Use of Resources
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                ISLAH maintains appropriate financial records and follows applicable accounting,
                reporting and governance requirements for every sponsorship it receives.
              </p>
              <Link
                to="/financial-transparency-policy"
                className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-brand-orange hover:text-orange-700"
              >
                Read our Financial Transparency Policy →
              </Link>
            </div>
          </div>
        </Section>

        {/* 08. Who can sponsor */}
        <Section tone="muted">
          <SectionHeader eyebrow="08. Who Can Sponsor?" title="Sponsorship Is Open to Everyone" />
          <IconCards
            columns={4}
            items={[
              {
                icon: User,
                title: "Individuals",
                desc: "Support a programme that aligns with your interests and values.",
              },
              {
                icon: Building2,
                title: "Companies / Corporates",
                desc: "Contribute towards education, healthcare or community development.",
              },
              {
                icon: Landmark,
                title: "CSR Foundations",
                desc: "Structured programmes aligned with CSR priorities and requirements.",
              },
              {
                icon: Users,
                title: "Institutions & Community Organisations",
                desc: "Support knowledge, skills, resources or implementation.",
              },
            ]}
          />
        </Section>

        {/* 09. Application */}
        <FormSection
          id="sponsor-form"
          eyebrow="09. Sponsorship Application"
          title="Support Meaningful Initiatives. Empower Communities."
          desc="Share your sponsorship interests and our team will discuss suitable opportunities with you. This is an enquiry, not a payment — contributions are arranged only after terms are agreed."
        >
          <ApplicationWizard config={sponsorFormConfig} />
        </FormSection>

        <Section>
          <SectionHeader
            eyebrow="Transparency & Accountability"
            title="Policies for Sponsors"
            desc="Please read these before applying."
          />
          <PolicyLinks
            links={[
              { label: "Sponsorship Policy", to: "/sponsorship-policy" },
              { label: "Financial Transparency", to: "/financial-transparency-policy" },
              { label: "Code of Conduct", to: "/code-of-conduct" },
              { label: "Privacy Policy", to: "/privacy-policy" },
            ]}
          />
        </Section>

        <FinalCta
          title="Help a Programme Move From Planning to Action."
          desc="Explore other ways to contribute through partnership, mentoring and volunteering."
          primary={{
            label: "Sponsor a Programme",
            onClick: () =>
              document.getElementById("sponsor-form")?.scrollIntoView({ behavior: "smooth" }),
          }}
          secondary={{ label: "Return to Get Involved", to: "/get-involved" }}
        />
      </main>

      <Footer />
    </div>
  );
}
