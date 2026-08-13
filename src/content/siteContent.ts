import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Briefcase,
  GraduationCap,
  HandHeart,
  HeartPulse,
  Leaf,
  Lightbulb,
  Scale,
  ShieldCheck,
  Sprout,
  Stethoscope,
  Users,
  Wrench,
} from "lucide-react";
import heroImg from "@/assets/hero.png";
import aboutHeroImg from "@/assets/about-hero.jpg";
import causeEducationImg from "@/assets/cause-education.jpg";
import causeMedicalImg from "@/assets/cause-medical.png";
import causeWomenImg from "@/assets/cause-women.jpg";
import womenImg from "@/assets/thematic-women.jpg";
import womenAltImg from "@/assets/thematic-women-2.png";
import environmentImg from "@/assets/thematic-environment.jpg";
import entrepreneurImg from "@/assets/thematic-entrepreneur.jpg";
import agricultureImg from "@/assets/thematic-agriculture.jpg";
import programsHeroImg from "@/assets/programs-hero.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import sectorEducation1 from "@/assets/sector_education_1.png";
import sectorEducation2 from "@/assets/sector_education_2.png";
import sectorHealthcare1 from "@/assets/sector_healthcare_1.png";
import sectorWomen1 from "@/assets/sector_women_1.png";
import sectorSkills1 from "@/assets/sector_skills_1.png";
import sectorEnvironment1 from "@/assets/sector_environment_1.png";
import sectorAgriculture1 from "@/assets/sector_agriculture_1.png";
import sectorRelief1 from "@/assets/sector_relief_1.png";
import sectorEntrepreneur1 from "@/assets/sector_entrepreneur_1.png";

export type SectorContent = {
  slug: "education" | "skills-development" | "women-empowerment";
  eyebrow: string;
  title: string;
  subtitle: string;
  quote: string;
  heroImage: string;
  heroSlides: { image: string; caption: string }[];
  icon: LucideIcon;
  challengeTitle: string;
  challengeCopy: string;
  challenges: string[];
  strategicFocus: string[];
  initiatives: string[];
  impact: string[];
  vision: string;
};

export const HOME_CONTENT = {
  hero: {
    eyebrow: "Islah Welfare Foundation (Reg.)",
    title: "Welcome to Islah Welfare Foundation",
    subtitle:
      "Planting Seeds of Hope and Change through education, healthcare, livelihood, women empowerment and rural development.",
    description:
      "IWF works with underserved communities to create practical pathways to dignity, learning, health and self-reliance.",
    image: heroImg,
  },
  stats: [
    { value: "2019", label: "Foundation journey" },
    { value: "8+", label: "Core focus areas" },
    { value: "2047", label: "Long-term vision" },
  ],
  about: {
    image: aboutHeroImg,
    title: "A public charitable trust for inclusive rural development",
    copy:
      "Islah Welfare Foundation works for the socio-economic development of weaker sections of society. Its programmes focus on education, healthcare, women empowerment, livelihood, social welfare and community resilience.",
    values: [
      { title: "Compassion", text: "Serving people with sensitivity and care.", icon: HandHeart },
      { title: "Empowerment", text: "Helping communities unlock their own potential.", icon: Users },
      { title: "Justice", text: "Upholding dignity and equal opportunity.", icon: Scale },
      { title: "Accountability", text: "Working transparently with partners and supporters.", icon: ShieldCheck },
    ],
  },
  focusAreas: [
    {
      title: "Education",
      text: "Quality learning, mentorship, scholarships and rural academic support.",
      image: causeEducationImg,
      icon: GraduationCap,
      href: "/programs/education",
    },
    {
      title: "Health Care",
      text: "Preventive care, emergency support, medical aid and rural wellness access.",
      image: causeMedicalImg,
      icon: HeartPulse,
      href: "/programs/healthcare",
    },
    {
      title: "Skills Development",
      text: "Community skill centres, vocational workshops and livelihood training.",
      image: entrepreneurImg,
      icon: Wrench,
      href: "/programs/skills-development",
    },
    {
      title: "Women Empowerment",
      text: "Livelihood, awareness, financial literacy and leadership opportunities.",
      image: causeWomenImg,
      icon: Users,
      href: "/programs/women-empowerment",
    },
    {
      title: "Environment & Sustainability",
      text: "Community action for healthier, more resilient local ecosystems.",
      image: environmentImg,
      icon: Leaf,
      href: "/programs/environment",
    },
    {
      title: "Agriculture & Rural Livelihood",
      text: "Local livelihood support for rural families and communities.",
      image: agricultureImg,
      icon: Sprout,
      href: "/programs/agriculture",
    },
  ],
  campaigns: [
    {
      title: "Shiksha Na Ruke",
      text: "Keeping children connected to education through learning support and guidance.",
      image: causeEducationImg,
      href: "/programs/education",
    },
    {
      title: "Health Cannot Wait",
      text: "Making urgent and preventive healthcare support reachable for vulnerable families.",
      image: causeMedicalImg,
      href: "/programs/healthcare",
    },
    {
      title: "She Can Fly",
      text: "Supporting girls and women with education, skills, dignity and opportunity.",
      image: womenImg,
      href: "/programs/women-empowerment",
    },
  ],
  vision2047: {
    image: programsHeroImg,
    title: "Vision 2047: Transforming Lives, Building a New India",
    copy:
      "IWF envisions a progressive, inclusive and self-reliant India where every individual has access to quality education, healthcare, dignified housing and sustainable livelihood opportunities.",
    pillars: ["Education", "Healthcare", "Housing & Basic Needs", "Skill Development & Livelihood", "Women Empowerment"],
  },
  gallery: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6],
};

export const SECTOR_CONTENT: Record<SectorContent["slug"], SectorContent> = {
  education: {
    slug: "education",
    eyebrow: "What We Do",
    title: "Education",
    subtitle:
      "Strengthening rural education so children and young people can build the foundation for lifelong learning, opportunity and dignity.",
    quote:
      "Empowering rural India through education, because inclusive development begins where the need is greatest.",
    heroImage: causeEducationImg,
    heroSlides: [
      { image: sectorEducation1, caption: "Rural classroom learning" },
      { image: sectorEducation2, caption: "School kit distribution" },
      { image: causeEducationImg, caption: "Education for all" },
    ],
    icon: GraduationCap,
    challengeTitle: "Rural Education Landscape in India",
    challengeCopy:
      "Rural communities continue to face gaps in literacy, learning outcomes, quality infrastructure, trained teachers and access to digital education. IWF prioritises education as a core driver of transformation.",
    challenges: [
      "Lower literacy rates compared to urban areas",
      "High dropout rates, especially at secondary levels",
      "Shortage of trained teachers and modern learning methods",
      "Limited access to digital education and career guidance",
      "Gender disparities affecting girls' education",
    ],
    strategicFocus: [
      "Strengthening primary and secondary education",
      "Supporting economically disadvantaged students",
      "Promoting girls' education and gender equality",
      "Providing career guidance, mentorship and skill pathways",
      "Bridging education and employability",
    ],
    initiatives: [
      "Erawin Public School (EPS)",
      "JISNS Journal",
      "Community & Islamic Learning Centre (CILC)",
      "Coaching Centre (CBCE)",
      "Scholarships for Higher Education",
      "School Kit Distribution",
      "Rural Academic Talent Search (RATS)",
      "Career Guidance & Mentorship (CTAG)",
      "Technical Institute",
      "Vocational Training Institute",
    ],
    impact: [
      "Improved learning outcomes and academic performance",
      "Reduced dropout rates",
      "Increased transition to higher education",
      "Empowered girls and young learners",
      "A skilled, confident and self-reliant rural generation",
    ],
    vision:
      "IWF aims to create model educational institutions and community learning spaces that make quality education accessible to underserved rural children.",
  },
  "skills-development": {
    slug: "skills-development",
    eyebrow: "What We Do",
    title: "Skills Development",
    subtitle:
      "Creating pathways from learning to livelihood through practical training, employability support and entrepreneurship development.",
    quote:
      "Empowering rural communities through skills, because sustainable development begins with self-reliance.",
    heroImage: entrepreneurImg,
    heroSlides: [
      { image: sectorSkills1, caption: "Vocational training workshops" },
      { image: sectorEntrepreneur1, caption: "Entrepreneurship development" },
      { image: entrepreneurImg, caption: "Skills for livelihood" },
    ],
    icon: Wrench,
    challengeTitle: "Why Skill Development Matters",
    challengeCopy:
      "Many rural youth and women remain excluded from stable livelihoods because academic learning does not always translate into employable skills. IWF focuses on practical, locally relevant training.",
    challenges: [
      "Limited access to vocational and technical training institutions",
      "High unemployment and underemployment among rural youth",
      "Mismatch between education and industry requirements",
      "Limited digital literacy and technical exposure",
      "Low participation of women in income-generating activities",
    ],
    strategicFocus: [
      "Providing demand-driven skill training",
      "Enhancing employability of youth and women",
      "Promoting self-employment and micro-entrepreneurship",
      "Strengthening digital literacy and technical competencies",
      "Integrating communication, soft skills and personality development",
    ],
    initiatives: [
      "Community Skill Centre (CSC)",
      "Vocational Training Workshops (VTW)",
    ],
    impact: [
      "Sustainable employment and self-employment opportunities",
      "Increased income levels and improved living standards",
      "Reduced migration through local livelihood creation",
      "Women and youth equipped for economic participation",
      "A skilled and self-reliant rural workforce",
    ],
    vision:
      "IWF aims to build community-based skill centres that become rural empowerment hubs for training, mentorship and livelihood creation.",
  },
  "women-empowerment": {
    slug: "women-empowerment",
    eyebrow: "What We Do",
    title: "Women Empowerment",
    subtitle:
      "Supporting women and girls with education, skills, livelihood opportunities, rights awareness and leadership confidence.",
    quote:
      "Empowering women with education, skills, dignity and opportunity, building stronger families and a more inclusive future.",
    heroImage: womenAltImg,
    heroSlides: [
      { image: sectorWomen1, caption: "Women self-help groups" },
      { image: causeWomenImg, caption: "Women empowerment programs" },
      { image: womenAltImg, caption: "Building stronger communities" },
    ],
    icon: Users,
    challengeTitle: "Women at the Centre of Community Progress",
    challengeCopy:
      "Women are central to strong families and sustainable communities, yet many women in rural areas face barriers to education, livelihood, health awareness and decision-making.",
    challenges: [
      "Limited access to education and skill development",
      "Financial dependency and lack of livelihood support",
      "Low participation in employment and entrepreneurship",
      "Limited awareness about health, hygiene and legal rights",
      "Gender discrimination and early dropout among girls",
    ],
    strategicFocus: [
      "Women skill development and livelihood programmes",
      "Rural women entrepreneurship support",
      "Self-Help Group capacity building",
      "Financial literacy and income generation",
      "Rights, health and gender equality awareness",
    ],
    initiatives: [
      "Women Skill & Livelihood",
      "Rural Women Entrepreneurship",
      "Self-Help Groups (SHG)",
      "Financial Literacy",
      "Women's Rights & Legal Awareness",
      "Gender Equality & Community Advocacy",
      "Widows & Vulnerable Women Support",
    ],
    impact: [
      "Improved livelihood opportunities for women",
      "Greater financial independence and self-reliance",
      "Increased participation in social and economic activities",
      "Improved confidence, dignity and leadership",
      "Stronger families and more inclusive communities",
    ],
    vision:
      "IWF envisions a society where every woman has equal opportunity, confidence and dignity to contribute meaningfully to family, community and national development.",
  },
};

export const POLICY_CONTENT = {
  "privacy-policy": {
    title: "Privacy Policy",
    subtitle:
      "How Islah Welfare Foundation handles information shared through this frontend website experience.",
    sections: [
      {
        heading: "Information We Collect",
        body:
          "IWF may collect personal information when users donate, subscribe to updates, fill out forms, apply for volunteering or partnership, or contact the organisation. This can include name, address, phone number, email, occupation and organisation details.",
      },
      {
        heading: "Purpose of Collection",
        body:
          "Information may be used for donation processing, communication about programmes, newsletters, inquiry responses, records required by law and website improvement.",
      },
      {
        heading: "Donation and Payment Security",
        body:
          "Online payment information should be processed through authorised payment gateways. Sensitive payment credentials are not intended to be stored on IWF servers.",
      },
      {
        heading: "Data Sharing",
        body:
          "IWF does not sell or rent personal information. Information may be disclosed only for legal compliance, authorised service providers, payment processing or organisational safety.",
      },
    ],
  },
  "refund-policy": {
    title: "Refund & Cancellation Policy",
    subtitle:
      "Donation cancellation and refund guidance for Islah Welfare Foundation supporters.",
    sections: [
      {
        heading: "Nature of Donations",
        body:
          "Donations made to IWF are voluntary contributions toward charitable, educational, healthcare, livelihood and community development activities.",
      },
      {
        heading: "Cancellation and Refund Requests",
        body:
          "Donation refunds are generally not automatic. Requests may be considered in exceptional cases such as duplicate transactions, incorrect amount, technical error or unauthorised transaction.",
      },
      {
        heading: "Request Timeline",
        body:
          "Refund requests, where applicable, should be submitted within 7 days with donor name, transaction ID, date, amount, reason and contact information.",
      },
      {
        heading: "Processing",
        body:
          "Approved refunds are processed through the original payment method where feasible and may take 7-15 working days depending on bank or payment gateway timelines.",
      },
    ],
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    subtitle:
      "Basic terms for using the Islah Welfare Foundation website and frontend services.",
    sections: [
      {
        heading: "About the Website",
        body:
          "This website represents Islah Welfare Foundation, a charitable organisation working in education, healthcare, livelihood development, women empowerment, rural development and humanitarian support.",
      },
      {
        heading: "Use of Website",
        body:
          "Users agree to use the website lawfully and without harming the reputation, security or functioning of the website or organisation.",
      },
      {
        heading: "Donations and Contributions",
        body:
          "Donations are voluntary and may be used for welfare programmes at the discretion of IWF unless specifically earmarked and accepted under applicable conditions.",
      },
      {
        heading: "Applications",
        body:
          "Submitting volunteer, partnership, sponsorship, internship or career forms does not guarantee acceptance or create an automatic contractual relationship.",
      },
    ],
  },
} as const;

export type PolicySlug = keyof typeof POLICY_CONTENT;

export const CONTACT_DETAILS = {
  phone: "+91 9811861633",
  email: "info@iwfindia.org",
  address: "Bathiya, Darbhanga, Bihar - 847423, India",
};

export const IMPACT_HIGHLIGHTS = [
  { icon: BookOpen, title: "Education First", text: "Helping rural learners continue, progress and dream bigger." },
  { icon: Stethoscope, title: "Healthcare Access", text: "Taking preventive and emergency support closer to underserved families." },
  { icon: Briefcase, title: "Livelihood Pathways", text: "Turning training into income, confidence and local opportunity." },
  { icon: Lightbulb, title: "Community Ownership", text: "Building programmes with local participation, partners and volunteers." },
];
