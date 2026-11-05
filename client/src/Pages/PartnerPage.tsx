import {
  BarChart3,
  BookOpen,
  Building,
  Building2,
  ClipboardCheck,
  Coins,
  Cpu,
  GraduationCap,
  Handshake,
  Landmark,
  Layers,
  Lightbulb,
  MapPin,
  Network,
  Scale,
  Target,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import { Footer, Header, NotificationTicker, UtilityBar } from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import { ApplicationWizard } from "@/components/forms/wizard/ApplicationWizard";
import { partnerFormConfig } from "@/components/forms/wizard/configs/partnerForm";
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
} from "@/components/getInvolved/PageSections";
import { SECTOR_CATALOGUE } from "@/content/sectorCatalogue";

const COLLAB_AREAS: Record<string, string> = {
  "Education & Learning":
    "Primary education, academic support, scholarships, career guidance, libraries, knowledge and research.",
  "Healthcare & Well-being":
    "Health awareness, preventive healthcare, community health initiatives and access-oriented programmes.",
  "Women & Youth Empowerment":
    "Leadership, financial literacy, skills, entrepreneurship, education and community participation.",
  "Skills & Livelihoods":
    "Vocational training, employability, entrepreneurship and livelihood development.",
  "Social Justice & Legal Empowerment":
    "Legal awareness, rights education, access to information and community empowerment.",
  "Agriculture & Rural Livelihoods":
    "Farmer support, sustainable agriculture, rural enterprise and livelihood resilience.",
  "Environment & Sustainable Development":
    "Environmental awareness, conservation, climate resilience and sustainable practices.",
  "Humanitarian Relief & Rehabilitation":
    "Emergency assistance, community relief, rehabilitation and recovery support.",
};

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main className="flex-grow">
        {/* 01. Hero */}
        <SubpageHeroCarousel
          tag="PARTNER WITH ISLAH"
          title="Building Partnerships for Sustainable Community Impact"
          subtitle="Through CSR, institutional collaboration, knowledge sharing, technical expertise or programme support, work with us towards measurable and sustainable outcomes for rural communities."
          breadcrumbs={[
            { label: "Get Involved", href: "/get-involved" },
            { label: "Partner With Us" },
          ]}
        >
          <HeroActions
            primary={{ label: "Partner With ISLAH", target: "partner-form" }}
            secondary={{ label: "Explore Partnership Options", target: "partnership-models" }}
            community={{
              label: "See our partner community",
              to: "/about/community",
              search: { tab: "partners" },
            }}
          />
        </SubpageHeroCarousel>

        {/* 02. Why partner */}
        <Section>
          <SectionHeader
            eyebrow="02. Why Partner With ISLAH"
            title="Grounded in Communities, Built for Collaboration"
            desc="Meaningful development requires collaboration. We work with organisations, institutions, professionals and community stakeholders to design and implement practical initiatives."
          />
          <IconCards
            columns={3}
            items={[
              {
                icon: Users,
                title: "Community-Centred Approach",
                desc: "We understand local priorities and develop responses relevant to community needs.",
              },
              {
                icon: MapPin,
                title: "Rural & Underserved Focus",
                desc: "Programmes address challenges in communities with limited access to opportunity and services.",
              },
              {
                icon: Layers,
                title: "Cross-Sector Approach",
                desc: "Education, healthcare, livelihoods, empowerment, agriculture, environment and humanitarian action.",
              },
              {
                icon: Lightbulb,
                title: "Collaborative Programme Design",
                desc: "Initiatives aligned with shared objectives, community needs and available resources.",
              },
              {
                icon: Building,
                title: "Local Implementation",
                desc: "Field coordination, community engagement and programme implementation where appropriate.",
              },
              {
                icon: BarChart3,
                title: "Monitoring & Documentation",
                desc: "Structured monitoring, documentation and reporting for partnership activities.",
              },
            ]}
          />
        </Section>

        {/* 03. Collaboration for impact */}
        <Section tone="muted">
          <SectionHeader eyebrow="03. Collaboration for Impact" title="Our Partnership Approach" />
          <JourneySteps
            steps={[
              {
                title: "Shared Purpose",
                desc: "We begin by understanding each partner's objectives and priorities.",
              },
              { title: "Local Relevance", desc: "Initiatives respond to genuine community needs." },
              {
                title: "Clear Responsibilities",
                desc: "Roles, deliverables and timelines are set before implementation.",
              },
              {
                title: "Measurable Progress",
                desc: "Programmes are supported by defined indicators where appropriate.",
              },
              {
                title: "Learning & Improvement",
                desc: "Evidence and feedback refine the programme.",
              },
              {
                title: "Sustainable Growth",
                desc: "Successful initiatives can be strengthened, adapted or scaled.",
              },
            ]}
          />
        </Section>

        {/* 04. Areas of collaboration */}
        <Section>
          <SectionHeader eyebrow="04. Areas of Collaboration" title="Where We Can Work Together" />
          <IconCards
            columns={4}
            items={SECTOR_CATALOGUE.slice(0, 8).map((s, i) => ({
              tag: String(i + 1).padStart(2, "0"),
              title: s.name,
              desc: COLLAB_AREAS[s.name],
            }))}
          />
        </Section>

        {/* 05. Partnership models */}
        <Section id="partnership-models" tone="muted">
          <SectionHeader eyebrow="05. Partnership Models" title="Ways to Partner With ISLAH" />
          <IconCards
            columns={4}
            items={[
              {
                icon: Handshake,
                title: "CSR Partnership",
                desc: "CSR initiatives aligned with community needs and applicable CSR requirements.",
              },
              {
                icon: Target,
                title: "Programme Partnership",
                desc: "Co-design and support a specific ISLAH programme or initiative.",
              },
              {
                icon: Landmark,
                title: "Institutional Partnership",
                desc: "Long-term collaboration with educational, professional or civil-society institutions.",
              },
              {
                icon: BookOpen,
                title: "Knowledge & Research",
                desc: "Research, documentation, publications and evidence-based development.",
              },
              {
                icon: Cpu,
                title: "Technical Partnership",
                desc: "Specialised expertise, technology, systems or professional services.",
              },
              {
                icon: Wrench,
                title: "Infrastructure & Resources",
                desc: "Equipment, learning or healthcare resources and community infrastructure.",
              },
              {
                icon: Users,
                title: "Community Development",
                desc: "Integrated initiatives addressing multiple community needs together.",
              },
            ]}
          />
        </Section>

        {/* 06. Who can partner */}
        <Section>
          <SectionHeader eyebrow="06. Who Can Partner" title="Partners We Work With" />
          <IconCards
            columns={4}
            items={[
              {
                icon: Building2,
                title: "Corporates & CSR Teams",
                desc: "CSR programmes, community initiatives and strategic social-impact partnerships.",
              },
              {
                icon: Coins,
                title: "Foundations & Philanthropies",
                desc: "Programme support, grants and thematic community initiatives.",
              },
              {
                icon: Handshake,
                title: "NGOs & Civil Society",
                desc: "Complementary expertise, field collaboration and joint programmes.",
              },
              {
                icon: GraduationCap,
                title: "Universities & Institutions",
                desc: "Education, research, internships and knowledge partnerships.",
              },
              {
                icon: Lightbulb,
                title: "Think Tanks & Research Bodies",
                desc: "Research, documentation, evidence generation and knowledge sharing.",
              },
              {
                icon: ClipboardCheck,
                title: "Professional Bodies & Experts",
                desc: "Technical expertise, training, mentoring and capacity development.",
              },
              {
                icon: Landmark,
                title: "Public & Community Institutions",
                desc: "Community-oriented, locally relevant development programmes.",
              },
            ]}
          />
        </Section>

        {/* 07–08. What each side brings */}
        <Section tone="muted">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <SectionHeader
                eyebrow="07. What ISLAH Brings"
                title="Our Contribution"
                desc="Depending on the nature of the partnership, ISLAH can contribute:"
              />
              <CheckPills
                items={[
                  "Community engagement",
                  "Local programme coordination",
                  "Field implementation",
                  "Programme design",
                  "Beneficiary identification",
                  "Volunteer mobilisation",
                  "Community awareness",
                  "Training & capacity building",
                  "Monitoring & documentation",
                  "Stakeholder coordination",
                  "Impact reporting",
                  "Local knowledge & context",
                ]}
              />
            </div>
            <div>
              <SectionHeader eyebrow="08. What Partners Contribute" title="Your Contribution" />
              <IconCards
                columns={2}
                items={[
                  {
                    icon: Coins,
                    title: "Financial Resources",
                    desc: "Programme funding, CSR support and grants.",
                  },
                  {
                    icon: Lightbulb,
                    title: "Knowledge & Expertise",
                    desc: "Professional and technical guidance.",
                  },
                  {
                    icon: Cpu,
                    title: "Technology",
                    desc: "Digital tools and technical infrastructure.",
                  },
                  {
                    icon: Wrench,
                    title: "Infrastructure & Resources",
                    desc: "Equipment, learning and healthcare resources.",
                  },
                  {
                    icon: Users,
                    title: "People & Time",
                    desc: "Mentors, trainers, volunteers and experts.",
                  },
                  {
                    icon: Network,
                    title: "Networks & Opportunities",
                    desc: "Industry, education and employment pathways.",
                  },
                ]}
              />
            </div>
          </div>
        </Section>

        {/* 09. Partnership journey */}
        <Section>
          <SectionHeader
            eyebrow="09. The Partnership Journey"
            title="From First Conversation to Lasting Impact"
          />
          <JourneySteps
            steps={[
              {
                title: "Engage",
                desc: "An initial conversation about shared interests and objectives.",
              },
              {
                title: "Understand",
                desc: "Explore community needs and potential areas of collaboration.",
              },
              { title: "Align", desc: "Identify common goals, roles, resources and outcomes." },
              {
                title: "Co-Design",
                desc: "Develop a practical plan with clear activities and responsibilities.",
              },
              { title: "Agree", desc: "Formalise through an MoU or agreement where applicable." },
              {
                title: "Implement",
                desc: "Execute with coordination and community participation.",
              },
              {
                title: "Measure & Report",
                desc: "Monitor progress and share updates and outcomes.",
              },
              {
                title: "Learn & Scale",
                desc: "Review learning and explore opportunities to expand.",
              },
            ]}
          />
        </Section>

        {/* 10. Principles */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="10. Our Partnership Principles"
            title="What Guides Every Partnership"
          />
          <IconCards
            columns={3}
            items={[
              {
                icon: Users,
                title: "Community First",
                desc: "Partnerships respond to genuine community needs.",
              },
              {
                icon: Handshake,
                title: "Shared Responsibility",
                desc: "Success requires clarity of roles and responsibilities.",
              },
              {
                icon: ClipboardCheck,
                title: "Transparency",
                desc: "Clear communication, responsible documentation and reporting.",
              },
              {
                icon: Scale,
                title: "Respect & Inclusion",
                desc: "We respect dignity, diversity and equal opportunity.",
              },
              {
                icon: Target,
                title: "Accountability",
                desc: "Clear expectations and mechanisms for review.",
              },
              {
                icon: TrendingUp,
                title: "Sustainability",
                desc: "Solutions that create value beyond a single funding cycle.",
              },
            ]}
          />
        </Section>

        {/* 11. Application */}
        <FormSection
          id="partner-form"
          eyebrow="11. Partnership Application"
          title="Build Meaningful Partnerships. Create Lasting Impact."
          desc="Submitting this form is an expression of interest — it does not constitute automatic approval or a formal partnership. Your progress is saved on this device as you go."
        >
          <ApplicationWizard config={partnerFormConfig} />
        </FormSection>

        <Section>
          <SectionHeader
            eyebrow="Policies"
            title="Responsible Partnerships"
            desc="Please read these before applying."
          />
          <PolicyLinks
            links={[
              { label: "Partnership Policy", to: "/partnership-policy" },
              { label: "Code of Conduct", to: "/code-of-conduct" },
              { label: "Privacy Policy", to: "/privacy-policy" },
              { label: "Financial Transparency", to: "/financial-transparency-policy" },
            ]}
          />
        </Section>

        <FinalCta
          title="Let's Build Meaningful Partnerships."
          desc="Explore other ways to support our programmes through volunteering, mentoring and sponsorship."
          primary={{
            label: "Start a Partnership",
            onClick: () =>
              document.getElementById("partner-form")?.scrollIntoView({ behavior: "smooth" }),
          }}
          secondary={{ label: "Return to Get Involved", to: "/get-involved" }}
        />
      </main>

      <Footer />
    </div>
  );
}
