import {
  BookOpen,
  Briefcase,
  Building2,
  GraduationCap,
  HandHeart,
  Laptop,
  Lightbulb,
  MapPin,
  MonitorSmartphone,
  Presentation,
  Rocket,
  Shield,
  Sprout,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import { Footer, Header, NotificationTicker, UtilityBar } from "@/components/layout/SiteLayout";
import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import { ApplicationWizard } from "@/components/forms/wizard/ApplicationWizard";
import { mentorFormConfig } from "@/components/forms/wizard/configs/mentorForm";
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

const MENTORSHIP_AREAS: { title: string; items: string[] }[] = [
  {
    title: "Academic & Education",
    items: [
      "Academic guidance",
      "Higher education",
      "Scholarship guidance",
      "Competitive examinations",
      "Study skills",
    ],
  },
  {
    title: "Career & Professional Development",
    items: [
      "Career planning",
      "Interview preparation",
      "Professional development",
      "Workplace readiness",
    ],
  },
  {
    title: "Skills & Technology",
    items: [
      "Digital literacy",
      "IT & technology",
      "Communication",
      "Data & research",
      "Creative skills",
    ],
  },
  {
    title: "Entrepreneurship & Livelihoods",
    items: [
      "Entrepreneurship",
      "Business planning",
      "Financial literacy",
      "Marketing",
      "Enterprise development",
    ],
  },
  {
    title: "Leadership & Personal Development",
    items: [
      "Leadership",
      "Communication",
      "Confidence building",
      "Goal setting",
      "Decision-making",
    ],
  },
  {
    title: "Social & Community Development",
    items: [
      "Community development",
      "NGO / project management",
      "Research & documentation",
      "Social innovation",
      "Rural development",
    ],
  },
];

export default function MentorPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main className="flex-grow">
        {/* 01. Hero */}
        <SubpageHeroCarousel
          tag="BECOME A MENTOR"
          title="Share Knowledge. Guide Potential. Create Pathways."
          subtitle="Mentorship connects knowledge, experience and opportunity with students, young people, women entrepreneurs and grassroots workers in rural and underserved communities."
          breadcrumbs={[
            { label: "Get Involved", href: "/get-involved" },
            { label: "Become a Mentor" },
          ]}
        >
          <HeroActions
            primary={{ label: "Become a Mentor", target: "mentor-form" }}
            secondary={{ label: "Explore Mentorship Options", target: "mentorship-areas" }}
            community={{
              label: "Meet our mentor community",
              to: "/about/community",
              search: { tab: "volunteers" },
            }}
          />
        </SubpageHeroCarousel>

        {/* 02. Why mentorship matters */}
        <Section>
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-center">
            <SectionHeader
              eyebrow="02. Why Mentorship Matters"
              title="Talent Exists Everywhere. Access to Guidance Does Not."
            />
            <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p>
                For many students, young people, aspiring entrepreneurs and grassroots workers in
                rural and underserved communities, the right guidance at the right time can make a
                meaningful difference.
              </p>
              <p>
                ISLAH's mentorship programme connects them with experienced mentors who share
                knowledge, provide practical guidance, encourage informed decision-making and help
                them explore pathways for learning, livelihood and personal development.
              </p>
            </div>
          </div>
        </Section>

        {/* 03. Who can benefit */}
        <Section tone="muted">
          <SectionHeader eyebrow="03. Who Can Benefit" title="Who Your Mentorship Can Help" />
          <IconCards
            columns={4}
            items={[
              {
                icon: GraduationCap,
                title: "Students & Learners",
                desc: "Academic guidance, higher education planning, scholarship awareness, exam preparation and learning support.",
              },
              {
                icon: Rocket,
                title: "Rural Youth",
                desc: "Career exploration, professional skills, CV development, interview preparation and digital skills.",
              },
              {
                icon: Sprout,
                title: "Women & Community Entrepreneurs",
                desc: "Business planning, financial literacy, marketing, product development and enterprise growth.",
              },
              {
                icon: Users,
                title: "Grassroots Development Workers",
                desc: "Community mobilisation, project planning, documentation and professional capacity building.",
              },
            ]}
          />
        </Section>

        {/* 04. Mentorship areas */}
        <Section id="mentorship-areas">
          <SectionHeader
            eyebrow="04. What You Can Contribute"
            title="Mentorship Areas"
            desc="Mentor in the areas where your experience is strongest. In the application you can also choose your professional domain — from education and healthcare to law, engineering, finance and agriculture."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MENTORSHIP_AREAS.map((area, i) => {
              const p = pastel(i);
              return (
                <div
                  key={area.title}
                  className={`rounded-xl border border-slate-200 bg-white p-5 transition ${p.hover}`}
                >
                  <h3 className={`text-sm sm:text-base font-semibold ${p.icon}`}>{area.title}</h3>
                  <ul className="mt-2.5 flex flex-wrap gap-1.5">
                    {area.items.map((it) => (
                      <li
                        key={it}
                        className="text-xs text-slate-700 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Section>

        {/* 05. Who can become a mentor */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="05. Who Can Become a Mentor"
            title="Experience Worth Sharing"
            desc="Mentorship is open to anyone with relevant knowledge, experience or practical skills they're willing to share responsibly. Formal mentoring experience is not required."
          />
          <IconCards
            columns={3}
            items={[
              {
                icon: BookOpen,
                title: "Educators & Academics",
                desc: "Teachers, professors, researchers and education professionals.",
              },
              {
                icon: Briefcase,
                title: "Working Professionals",
                desc: "From technology, finance, law, healthcare, engineering, management and other fields.",
              },
              {
                icon: Building2,
                title: "Entrepreneurs & Business Leaders",
                desc: "Practical experience in entrepreneurship, business development and enterprise management.",
              },
              {
                icon: Lightbulb,
                title: "Researchers & Experts",
                desc: "Specialised knowledge for research, knowledge sharing and technical guidance.",
              },
              {
                icon: HandHeart,
                title: "Community Professionals",
                desc: "Meaningful grassroots, development or community-based experience.",
              },
              {
                icon: UserCheck,
                title: "Skilled Volunteers",
                desc: "Practical expertise shared through structured mentoring or workshops.",
              },
            ]}
          />
        </Section>

        {/* 06. Flexible formats */}
        <Section>
          <SectionHeader
            eyebrow="06. Flexible Ways to Mentor"
            title="Mentor in the Way That Suits You"
          />
          <IconCards
            columns={3}
            items={[
              {
                icon: User,
                title: "One-to-One Mentoring",
                desc: "Personalised guidance based on the mentee's goals and needs.",
              },
              {
                icon: Users,
                title: "Group Mentoring",
                desc: "Share experience with small groups of learners or community participants.",
              },
              {
                icon: Presentation,
                title: "Workshops & Knowledge Sessions",
                desc: "Structured sessions on professional, academic, technical or entrepreneurial topics.",
              },
              {
                icon: Laptop,
                title: "Online Mentoring",
                desc: "Contribute remotely through scheduled digital sessions.",
              },
              {
                icon: MapPin,
                title: "On-Site Mentoring",
                desc: "Field-based mentoring in community programmes where applicable.",
              },
              {
                icon: MonitorSmartphone,
                title: "Hybrid Mentoring",
                desc: "Online guidance combined with periodic in-person interaction.",
              },
            ]}
          />
        </Section>

        {/* 07. How it works */}
        <Section tone="muted">
          <SectionHeader eyebrow="07. How It Works" title="How ISLAH Mentorship Works" />
          <JourneySteps
            steps={[
              { title: "Apply", desc: "Share your expertise, interests and availability." },
              {
                title: "Review",
                desc: "We review your experience and preferred areas of contribution.",
              },
              {
                title: "Orient",
                desc: "Selected mentors receive programme information and orientation.",
              },
              {
                title: "Match",
                desc: "Where appropriate, you're matched with mentees, groups or activities.",
              },
              { title: "Mentor", desc: "Provide structured guidance through agreed sessions." },
              {
                title: "Reflect & Grow",
                desc: "Feedback improves the experience for mentors and mentees.",
              },
            ]}
          />
        </Section>

        {/* 08. Mentor commitment */}
        <Section>
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 items-center">
            <SectionHeader
              eyebrow="08. Mentor Commitment"
              title="Mentoring With Care and Responsibility"
              desc="Every ISLAH mentor commits to standards that protect mentees and build trust."
            />
            <div className="space-y-4">
              <CheckPills
                items={[
                  "Professionalism",
                  "Respect",
                  "Confidentiality",
                  "Safeguarding",
                  "Code of Conduct",
                ]}
              />
              <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-sm text-slate-700">
                <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  Roles involving children or vulnerable people include additional screening, clear
                  boundaries and safeguarding procedures appropriate to the role.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* 09. Application */}
        <FormSection
          id="mentor-form"
          eyebrow="09. Become a Mentor"
          title="Share Your Experience. Guide Potential. Shape Futures."
          desc="Tell us about your expertise, mentoring interests and availability so we can explore a suitable mentorship opportunity with you. Your progress is saved on this device as you go."
        >
          <ApplicationWizard config={mentorFormConfig} />
        </FormSection>

        {/* 10. Policies */}
        <Section>
          <SectionHeader
            eyebrow="10. Policies & Safeguarding"
            title="Our Commitments to Mentees and Mentors"
            desc="Please read these before applying. They explain how mentorship is conducted, how information is handled and how we keep everyone safe."
          />
          <PolicyLinks
            links={[
              { label: "Mentorship Policy", to: "/mentorship-policy" },
              { label: "Code of Conduct", to: "/code-of-conduct" },
              { label: "Privacy Policy", to: "/privacy-policy" },
              { label: "Child Protection & Safeguarding", to: "/child-protection-policy" },
            ]}
          />
        </Section>

        <FinalCta
          title="Your Experience Can Become Someone Else's Opportunity."
          desc="Explore more ways to contribute through volunteering, partnerships and community engagement."
          primary={{
            label: "Become a Mentor",
            onClick: () =>
              document.getElementById("mentor-form")?.scrollIntoView({ behavior: "smooth" }),
          }}
          secondary={{ label: "Return to Get Involved", to: "/get-involved" }}
        />
      </main>

      <Footer />
    </div>
  );
}
