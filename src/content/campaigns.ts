import {
  GraduationCap,
  HeartPulse,
  Users,
  Scale,
  Sparkles,
  BookOpen,
  Stethoscope,
  Lightbulb,
  Briefcase,
  ShieldCheck,
  Award,
  Heart,
  Home,
  Sprout,
  UserCheck,
  Megaphone,
  Smile,
  Compass,
  FileCheck,
  Trees,
  Layers,
  Wrench,
} from "lucide-react";
import causeEducationImg from "@/assets/cause-education.jpg";
import causeMedicalImg from "@/assets/cause-medical.png";
import causeWomenImg from "@/assets/cause-women.jpg";
import entrepreneurImg from "@/assets/thematic-entrepreneur.jpg";
import environmentImg from "@/assets/thematic-environment.jpg";

export interface ContinuumStep {
  number: string;
  title: string;
  desc: string;
}

export interface FocusAreaItem {
  icon: any;
  title: string;
  desc: string;
}

export interface DonationTierItem {
  amount: number;
  label: string;
  impact: string;
}

export interface CampaignData {
  id: string;
  slug: string;
  num: string;
  name: string;
  hindiName?: string;
  tagline: string;
  motto: string;
  badge: string;
  category: string;
  themeColor: string; // e.g. "emerald", "rose", "pink", "amber", "teal"
  accentHex: string;
  bgGradient: string;
  lightBg: string;
  borderHex: string;
  heroImage: string;
  intro: string;
  philosophy: string;
  challengeText: string[];
  continuumTitle: string;
  continuumSteps: ContinuumStep[];
  focusAreas: FocusAreaItem[];
  whoWeReach: string[];
  longTermVision: string;
  quote: {
    text: string;
    author?: string;
  };
  donationTiers: DonationTierItem[];
  relatedPrograms: {
    title: string;
    href: string;
  }[];
}

export const CAMPAIGNS_DATA: Record<string, CampaignData> = {
  "shiksha-na-ruke": {
    id: "01",
    slug: "shiksha-na-ruke",
    num: "01",
    name: "Shiksha Na Ruke",
    hindiName: "शिक्षा न रुके",
    tagline: "Keeping Education Within Reach",
    motto: "Education Must Not Stop",
    badge: "EDUCATION & LEARNING CONTINUITY",
    category: "Education & Learning",
    themeColor: "emerald",
    accentHex: "#15803d",
    bgGradient: "from-[#0b1f3b] via-[#0f2d24] to-[#0b1f3b]",
    lightBg: "bg-emerald-50",
    borderHex: "border-emerald-500",
    heroImage: causeEducationImg,
    intro:
      "Shiksha Na Ruke is ISLAH's flagship education and learning campaign dedicated to ensuring that children, young people, and underserved learners are not forced to discontinue their educational journey because of poverty, social circumstances, lack of resources, or limited access to opportunities.",
    philosophy:
      "We believe education is more than access to a classroom. It is a pathway to knowledge, confidence, capability, dignity, and opportunity. Through Shiksha Na Ruke, ISLAH seeks to reduce barriers that prevent children and young people from learning, progressing, and preparing for their future.",
    challengeText: [
      "Millions of children from economically vulnerable rural households risk dropping out due to acute financial hardship, lack of basic learning kits, and school supplies.",
      "Rural students often face a digital divide with no access to digital education tools, structured career counseling, or modern learning resources.",
      "Secondary school transitions and girl child education are particularly vulnerable to abrupt disruption without sustained community support.",
    ],
    continuumTitle: "Beyond Access to Education — The Learning Continuum",
    continuumSteps: [
      { number: "01", title: "Access", desc: "Removing financial & infrastructural barriers to school enrollment." },
      { number: "02", title: "Learning", desc: "Providing learning kits, books, digital tools & remedial support." },
      { number: "03", title: "Skills", desc: "Equipping young learners with practical problem-solving & communication abilities." },
      { number: "04", title: "Confidence", desc: "Mentoring, personality development & talent cultivation." },
      { number: "05", title: "Opportunity", desc: "Structured career guidance, counseling & vocational pathways." },
      { number: "06", title: "Self-Reliance", desc: "Empowering students to achieve independent livelihoods and uplift their families." },
    ],
    focusAreas: [
      {
        icon: GraduationCap,
        title: "Educational Scholarships",
        desc: "Need-based financial grants and merit-cum-means assistance ensuring continuity.",
      },
      {
        icon: BookOpen,
        title: "School Kits & Learning Materials",
        desc: "Distribution of essential backpacks, notebooks, uniforms, and stationery kits.",
      },
      {
        icon: Users,
        title: "Vulnerable Family Support",
        desc: "Holistic educational assistance for children from economically disadvantaged households.",
      },
      {
        icon: Sparkles,
        title: "Digital & Tech-Enabled Learning",
        desc: "Connecting rural learners with computers, digital tablets, and modern e-curricula.",
      },
      {
        icon: Home,
        title: "Community Learning Centres",
        desc: "After-school remedial study spaces and village libraries fostering collective growth.",
      },
      {
        icon: ShieldCheck,
        title: "Dropout Prevention",
        desc: "Early intervention, family counseling, and tracker systems to retain students in school.",
      },
      {
        icon: Compass,
        title: "Career Guidance & Counseling",
        desc: "Professional guidance sessions for secondary and higher secondary students on career choices.",
      },
      {
        icon: UserCheck,
        title: "Mentoring & Academic Support",
        desc: "Connecting rural students with educated mentors for academic coaching and moral support.",
      },
      {
        icon: Award,
        title: "Talent Development",
        desc: "Identifying and nurturing exceptional skills in arts, sciences, sports, and mathematics.",
      },
      {
        icon: Lightbulb,
        title: "Life Skills & Personality",
        desc: "Workshops on public speaking, problem-solving, emotional resilience, and teamwork.",
      },
      {
        icon: Smile,
        title: "Disadvantaged Learners Support",
        desc: "Special inclusive initiatives for differently-abled and marginalized children.",
      },
      {
        icon: Megaphone,
        title: "Community Education Awareness",
        desc: "Sensitizing parents and village elders on the transformative power of uninterrupted schooling.",
      },
    ],
    whoWeReach: [
      "Children and young people facing severe economic distress or risk of dropout",
      "Students from rural, remote, and historically underserved habitations",
      "Socially and economically disadvantaged households with single earners",
      "Families experiencing unforeseen crises, loss of livelihood, or medical debt",
      "First-generation learners seeking guidance for higher education",
    ],
    longTermVision:
      "A future where no child or young person is compelled to abandon learning simply because opportunity was unavailable. Every child deserves the chance to learn, dream, and move forward.",
    quote: {
      text: "Education is not the learning of facts, but the training of the mind to think and the heart to aspire.",
      author: "ISLAH Education Philosophy",
    },
    donationTiers: [
      { amount: 1500, label: "Complete Student Kit", impact: "Provides school bag, notebooks, stationery, and learning materials for 1 child." },
      { amount: 3000, label: "Quarterly Scholarship", impact: "Covers tuition fees, study materials, and remedial coaching for 3 months." },
      { amount: 6000, label: "Semi-Annual Sponsorship", impact: "Supports uninterrupted schooling and digital learning access for 6 months." },
      { amount: 12000, label: "Full-Year Education Patron", impact: "Ensures comprehensive education, health checkups, and mentorship for 1 full academic year." },
    ],
    relatedPrograms: [
      { title: "Education for All", href: "/programs/education" },
      { title: "Skills Development & Vocational Training", href: "/programs/skills-development" },
      { title: "Pari Ki Udaan (Girl Child Empowerment)", href: "/campaign/pari-ki-udaan" },
    ],
  },

  "har-pal-anmol-hai": {
    id: "02",
    slug: "har-pal-anmol-hai",
    num: "02",
    name: "Har Pal Anmol Hai",
    hindiName: "हर पल अनमोल है",
    tagline: "When Every Moment Matters",
    motto: "Medical Need for All",
    badge: "HEALTHCARE & EMERGENCY RELIEF",
    category: "Healthcare & Well-being",
    themeColor: "rose",
    accentHex: "#e11d48",
    bgGradient: "from-[#0b1f3b] via-[#2a0e1a] to-[#0b1f3b]",
    lightBg: "bg-rose-50",
    borderHex: "border-rose-500",
    heroImage: causeMedicalImg,
    intro:
      "Har Pal Anmol Hai is ISLAH's healthcare and humanitarian emergency campaign focused on helping vulnerable individuals access timely medical assistance when urgent treatment cannot wait. When every moment matters, timely intervention saves precious lives.",
    philosophy:
      "A sudden medical emergency places an enormous burden on a family, particularly when the required treatment is far beyond its financial capacity. Through this campaign, ISLAH mobilises community support and resources for verified, need-based critical medical assistance, while promoting preventive healthcare and diagnostics.",
    challengeText: [
      "Commercialisation and rising costs of tertiary healthcare push millions of rural families into catastrophic debt or force them to forego life-saving procedures.",
      "Lack of emergency medical transport and delayed hospital admissions in remote regions turn treatable conditions into life-threatening emergencies.",
      "Absence of early preventive screenings leads to late-stage diagnoses for critical conditions like diabetes, cardiovascular disorders, and cervical cancer.",
    ],
    continuumTitle: "From Emergency Support to Prevention — The Care Pathway",
    continuumSteps: [
      { number: "01", title: "Awareness", desc: "Educating rural communities on early symptoms, hygiene, and wellness." },
      { number: "02", title: "Prevention", desc: "Free diagnostic screenings, blood sugar tests, and wellness checkups." },
      { number: "03", title: "Early Intervention", desc: "Identifying medical risks before they escalate into acute life crises." },
      { number: "04", title: "Treatment", desc: "Direct financial & logistics assistance for critical surgeries & hospital care." },
      { number: "05", title: "Recovery", desc: "Post-operative follow-up, medications, and rehabilitation assistance." },
    ],
    focusAreas: [
      {
        icon: Stethoscope,
        title: "Critical Medical Treatment",
        desc: "Financial assistance for urgent surgeries, oncology care, dialysis, and intensive care.",
      },
      {
        icon: HeartPulse,
        title: "Emergency Healthcare Support",
        desc: "Rapid emergency mobilization when patients require immediate hospital admission.",
      },
      {
        icon: Heart,
        title: "Urgent Patient Case Sponsorship",
        desc: "Transparent, verified individual patient cases connecting donors directly with genuine medical needs.",
      },
      {
        icon: Users,
        title: "Free Rural Health Camps",
        desc: "Multi-specialty doctor consultations, vital checks, and medicine distribution in remote villages.",
      },
      {
        icon: ShieldCheck,
        title: "Preventive Health Screening",
        desc: "Camps for early detection of diabetes, hypertension, vision issues, and general disorders.",
      },
      {
        icon: Sprout,
        title: "Maternal & Child Nutrition",
        desc: "Nutritional supplements, anemia prevention, and prenatal guidance for mothers and infants.",
      },
      {
        icon: Sparkles,
        title: "Cervical Cancer Screening",
        desc: "Specialized mobile awareness and VIA screening drives for rural women's health.",
      },
      {
        icon: Compass,
        title: "Hospital Referral & Facilitation",
        desc: "Guiding rural families through government welfare schemes (such as PM-JAY) and partner hospitals.",
      },
      {
        icon: Home,
        title: "Rural Health Centers",
        desc: "Grassroots primary wellness units providing continuous local access to medical care.",
      },
      {
        icon: Layers,
        title: "Medical Equipment Assistance",
        desc: "Support for essential medical aids, oxygen concentrators, mobility gear, and diagnostics.",
      },
    ],
    whoWeReach: [
      "Critically ill patients requiring urgent surgeries or ICU care without financial means",
      "Families facing catastrophic medical expenses with zero health insurance coverage",
      "Rural women and children suffering from chronic undiagnosed health conditions",
      "Elderly individuals needing continuous vital medications and palliative support",
      "Accident and trauma victims needing rapid emergency transport and admission",
    ],
    longTermVision:
      "A society where financial vulnerability does not become a barrier between a human being and essential medical care. When every moment matters, timely support can make all the difference.",
    quote: {
      text: "To save one life is as if one has saved the whole of humanity. Every pulse matters, every second counts.",
      author: "ISLAH Healthcare Mission",
    },
    donationTiers: [
      { amount: 1000, label: "Emergency Medicines", impact: "Provides essential life-saving drugs and immediate diagnostic tests for an urgent patient." },
      { amount: 2500, label: "Diagnostic & Doctor Care", impact: "Covers full pathology lab workup, radiology scans, and specialist doctor consultation." },
      { amount: 5000, label: "Critical ICU/Treatment Aid", impact: "Contributes directly to hospital bed charges, oxygen support, and post-op care." },
      { amount: 15000, label: "Emergency Surgery Patron", impact: "Funds life-saving surgical intervention and comprehensive hospital recovery." },
    ],
    relatedPrograms: [
      { title: "Healthcare & Community Wellness", href: "/programs/healthcare" },
      { title: "Critical Life Support & Patients", href: "/programs/healthcare/critical-life-support" },
      { title: "Humanitarian Relief & Rehabilitation", href: "/programs/relief-and-rehabilitation" },
    ],
  },

  "pari-ki-udaan": {
    id: "03",
    slug: "pari-ki-udaan",
    num: "03",
    name: "Pari Ki Udaan",
    hindiName: "परी की उड़ान",
    tagline: "Empowering Girls to Dream, Learn and Lead",
    motto: "Empowering Women, Changing Lives",
    badge: "GIRL CHILD & WOMEN EMPOWERMENT",
    category: "Women & Youth Empowerment",
    themeColor: "pink",
    accentHex: "#db2777",
    bgGradient: "from-[#0b1f3b] via-[#2a0e28] to-[#0b1f3b]",
    lightBg: "bg-pink-50",
    borderHex: "border-pink-500",
    heroImage: causeWomenImg,
    intro:
      "Pari Ki Udaan is ISLAH's dedicated campaign for the holistic empowerment, dignity, and advancement of girls and young women. We believe that empowering a girl expands her choices, confidence, capabilities, safety, economic independence, and leadership in society.",
    philosophy:
      "Empowering a girl is not simply about enrolling her in school. It is about creating pathways through which girls move from vulnerability and exclusion to confidence, financial autonomy, and decision-making leadership. When a girl moves forward, she inspires an entire community to move with her.",
    challengeText: [
      "In many rural areas, adolescent girls face high school dropout rates due to early social pressures, lack of sanitation facilities, and deep-seated gender stereotypes.",
      "Taboos surrounding menstrual hygiene prevent thousands of girls from attending school consistently and compromise their long-term reproductive health.",
      "Young women often lack access to digital literacy, marketable vocational skills, financial accounts, and mentorship needed for economic independence.",
    ],
    continuumTitle: "From Learning to Leadership — The Empowerment Pathway",
    continuumSteps: [
      { number: "01", title: "Education", desc: "Ensuring girls complete secondary and higher secondary education without disruption." },
      { number: "02", title: "Skills", desc: "Imparting vocational trades, digital literacy, and financial management capabilities." },
      { number: "03", title: "Confidence", desc: "Personality workshops, self-defense training, and rights awareness." },
      { number: "04", title: "Economic Opportunity", desc: "Connecting women to self-employment, tailoring micro-enterprises & SHGs." },
      { number: "05", title: "Leadership", desc: "Nurturing women leaders who make decisions in their homes and communities." },
    ],
    focusAreas: [
      {
        icon: GraduationCap,
        title: "Girls' Higher Education Scholarships",
        desc: "Dedicated financial support for promising rural girls pursuing college and technical degrees.",
      },
      {
        icon: Sparkles,
        title: "Menstrual Hygiene & Dignity Kits",
        desc: "Sanitary pad distribution, health education, and breaking taboos in rural schools.",
      },
      {
        icon: BookOpen,
        title: "Digital Literacy for Young Women",
        desc: "Hands-on computer training, smartphone safety, and online vocational resources.",
      },
      {
        icon: Briefcase,
        title: "Vocational & Tailoring Centres",
        desc: "Cutting, stitching, garment fabrication, and handicraft training for self-reliance.",
      },
      {
        icon: Users,
        title: "Self-Help Groups (SHGs)",
        desc: "Forming and strengthening women's savings cooperatives and collective micro-enterprises.",
      },
      {
        icon: Compass,
        title: "Career Mentorship & Guidance",
        desc: "Pairing young women with female professionals, educators, and role models.",
      },
      {
        icon: ShieldCheck,
        title: "Legal Rights & Safety Awareness",
        desc: "Workshops on women's legal rights, domestic protection, and government welfare schemes.",
      },
      {
        icon: Lightbulb,
        title: "Financial Literacy & Banking",
        desc: "Training on opening bank accounts, digital UPI payments, micro-savings, and budgeting.",
      },
      {
        icon: Award,
        title: "Women-Led Micro-Enterprises",
        desc: "Seed funding, equipment support (sewing machines), and market linkages for women entrepreneurs.",
      },
      {
        icon: Home,
        title: "Community Enabling Environment",
        desc: "Engaging parents, village elders, and schools to champion girls' rights and higher education.",
      },
    ],
    whoWeReach: [
      "Adolescent girls at risk of leaving education due to financial or domestic hardship",
      "Young women seeking marketable vocational skills and economic self-reliance",
      "Rural women seeking to form Self-Help Groups and start home-based enterprises",
      "Widows and single women needing sustainable livelihood tools and dignity",
      "Female first-generation college aspirants in remote rural clusters",
    ],
    longTermVision:
      "A future where every girl has the freedom, confidence, and opportunity to develop her potential and participate meaningfully in society. When a girl takes flight, she carries the future with her.",
    quote: {
      text: "If you educate a man, you educate an individual. If you educate a woman, you educate an entire generation.",
      author: "ISLAH Women Empowerment Charter",
    },
    donationTiers: [
      { amount: 1200, label: "Annual Dignity & Hygiene Kit", impact: "Provides 1 year of biodegradable sanitary products, hygiene essentials, and wellness guide for 1 girl." },
      { amount: 3500, label: "Digital & Skill Training", impact: "Funds 3 months of comprehensive computer literacy and office software training." },
      { amount: 6500, label: "Sewing Machine & Livelihood Kit", impact: "Gifts a heavy-duty sewing machine, fabric starter pack, and vocational certification for 1 woman." },
      { amount: 15000, label: "Annual Girl Scholar Patron", impact: "Covers full tuition, transport, books, and mentorship for a girl pursuing higher education." },
    ],
    relatedPrograms: [
      { title: "Women Empowerment Initiatives", href: "/programs/women-empowerment" },
      { title: "Skills Development & Vocational Training", href: "/programs/skills-development" },
      { title: "Education for All", href: "/programs/education" },
    ],
  },

  "swabhimaan": {
    id: "04",
    slug: "swabhimaan",
    num: "04",
    name: "Swabhimaan",
    hindiName: "स्वाभिमान",
    tagline: "Dignity. Equality. Self-Reliance.",
    motto: "Dignity Through Self-Reliance",
    badge: "SOCIAL JUSTICE & DIGNIFIED LIVELIHOODS",
    category: "Social Justice & Livelihoods",
    themeColor: "amber",
    accentHex: "#d97706",
    bgGradient: "from-[#0b1f3b] via-[#2d2008] to-[#0b1f3b]",
    lightBg: "bg-amber-50",
    borderHex: "border-amber-500",
    heroImage: entrepreneurImg,
    intro:
      "Swabhimaan represents ISLAH's resolute commitment to human dignity, equality, social justice, rights awareness, and economic self-reliance. We believe development is incomplete when people experience exclusion, discrimination, exploitation, denial of opportunity, or barriers to justice.",
    philosophy:
      "A person who has knowledge of their rights, access to economic opportunity, a sustainable livelihood, confidence to participate, and the ability to make informed decisions is equipped to live with pride and dignity. Justice begins with dignity, and dignity grows through empowerment.",
    challengeText: [
      "Vulnerable rural citizens often lack awareness of government welfare entitlements, legal safeguards, and basic identity documentation.",
      "Economic dependence and lack of productive asset ownership leave marginalized families vulnerable to unfair exploitation.",
      "Navigating administrative grievances and legal institutions remains intimidating without accessible community facilitation.",
    ],
    continuumTitle: "Access to Justice & Dignity — The Empowerment Process",
    continuumSteps: [
      { number: "01", title: "Information", desc: "Understanding constitutional rights, government schemes, and legal entitlements." },
      { number: "02", title: "Documentation", desc: "Assisting with Aadhaar, Ration Card, E-Shram, PM-JAY & disability certificates." },
      { number: "03", title: "Appropriate Institution", desc: "Connecting citizens to District Legal Services Authorities (DLSA) & welfare boards." },
      { number: "04", title: "Qualified Support", desc: "Facilitating guidance through qualified advocates and pro-bono legal experts." },
      { number: "05", title: "Dignified Livelihood", desc: "Providing micro-enterprise toolkits for sustainable economic self-reliance." },
    ],
    focusAreas: [
      {
        icon: Scale,
        title: "Rights & Legal Awareness",
        desc: "Grassroots workshops on constitutional rights, labor safeguards, and fundamental entitlements.",
      },
      {
        icon: FileCheck,
        title: "Government Scheme Facilitation",
        desc: "Assisting families in accessing welfare entitlements, pension schemes, and agricultural subsidies.",
      },
      {
        icon: Compass,
        title: "Access-to-Justice Navigation",
        desc: "Guiding vulnerable individuals through legal-aid authorities and administrative grievance cells.",
      },
      {
        icon: Wrench,
        title: "Livelihood Starter Toolkits",
        desc: "Providing trade toolkits (tailoring, electrical, carpentry, micro-retail) for immediate self-employment.",
      },
      {
        icon: Users,
        title: "Marginalized Group Inclusion",
        desc: "Dedicated initiatives ensuring equal development participation for marginalized communities.",
      },
      {
        icon: ShieldCheck,
        title: "Anti-Exploitation Drives",
        desc: "Sensitization against bonded labor, child labor, unfair debt traps, and discrimination.",
      },
      {
        icon: Lightbulb,
        title: "Microfinance & Enterprise Mentoring",
        desc: "Zero-interest Islamic/ethical micro-finance coaching for rural micro-entrepreneurs.",
      },
      {
        icon: Award,
        title: "Community Leadership Development",
        desc: "Training grassroots community volunteers to advocate for local rights and welfare.",
      },
      {
        icon: Home,
        title: "Dignity in Housing & Sanitation",
        desc: "Advocating for decent rural living standards, safe sanitation, and clean drinking water.",
      },
    ],
    whoWeReach: [
      "Daily wage laborers, informal workers, and smallholder families lacking steady income",
      "Vulnerable individuals needing assistance in accessing government welfare schemes",
      "Marginalized families facing social exclusion or barriers to legal redressal",
      "Unemployed rural youth seeking tools and training to launch micro-enterprises",
      "Persons with disabilities needing entitlement certification and assistive devices",
    ],
    longTermVision:
      "Communities where people are aware of their rights, treated with dignity, included in development, and equipped with the self-reliance to shape their own destiny.",
    quote: {
      text: "Dignity is not a privilege to be granted; it is the birthright of every human being. When people stand self-reliant, society stands strong.",
      author: "ISLAH Social Justice Charter",
    },
    donationTiers: [
      { amount: 1500, label: "Legal Literacy & Entitlement Drive", impact: "Enables documentation support and scheme enrollment for 5 rural families." },
      { amount: 3500, label: "Livelihood Skill Toolkit", impact: "Provides basic trade tools (plumbing, electrical, or artisan kit) for a rural breadwinner." },
      { amount: 7500, label: "Micro-Enterprise Booster", impact: "Funds initial inventory, tools, and branding for a village micro-retail venture." },
      { amount: 15000, label: "Community Swabhimaan Patron", impact: "Sponsors an entire legal literacy and entitlement camp in a remote cluster." },
    ],
    relatedPrograms: [
      { title: "Rural Entrepreneurship & Microfinance", href: "/programs/entrepreneur-development" },
      { title: "Skills Development & Vocational Training", href: "/programs/skills-development" },
      { title: "Humanitarian Relief & Rehabilitation", href: "/programs/relief-and-rehabilitation" },
    ],
  },

  "taiyyari-kal-ki": {
    id: "05",
    slug: "taiyyari-kal-ki",
    num: "05",
    name: "Taiyyari Kal Ki",
    hindiName: "तैयारी कल की",
    tagline: "Preparing Communities for a Better Tomorrow",
    motto: "Preparing for Tomorrow",
    badge: "FUTURE SKILLS, RESILIENCE & SUSTAINABILITY",
    category: "Future Skills & Sustainability",
    themeColor: "teal",
    accentHex: "#0d9488",
    bgGradient: "from-[#0b1f3b] via-[#082827] to-[#0b1f3b]",
    lightBg: "bg-teal-50",
    borderHex: "border-teal-500",
    heroImage: environmentImg,
    intro:
      "Taiyyari Kal Ki is ISLAH's forward-looking campaign focused on preparing individuals, families, and rural communities for the social, economic, environmental, and technological transformations of tomorrow.",
    philosophy:
      "Development should not merely react to today's hardships—it must equip communities to become capable, adaptable, and resilient enough to master tomorrow's uncertainties. The future belongs to communities prepared to shape it.",
    challengeText: [
      "Rapid technological evolution threatens to leave rural youth behind unless they are trained in digital literacy, AI basics, and contemporary market skills.",
      "Climate change, unseasonal weather, and water scarcity directly threaten the agricultural livelihoods of millions of smallholder farmers.",
      "Rural settlements require sustainable green infrastructure, disaster preparedness, and renewable energy adoption to thrive in the decades ahead.",
    ],
    continuumTitle: "Preparing People & Communities — The Resilience Pathway",
    continuumSteps: [
      { number: "01", title: "Knowledge", desc: "Understanding emerging economic, environmental, and technological trends." },
      { number: "02", title: "Skills", desc: "Mastering practical modern tools, digital systems, and sustainable practices." },
      { number: "03", title: "Adaptability", desc: "Building capacity to pivot livelihoods in response to market and climate changes." },
      { number: "04", title: "Economic Resilience", desc: "Diversifying income through agro-enterprises, green energy, and technology." },
      { number: "05", title: "Community Resilience", desc: "Establishing self-reliant Model Villages equipped for sustainable future growth." },
    ],
    focusAreas: [
      {
        icon: Sparkles,
        title: "Future & Digital Skills",
        desc: "Coding fundamentals, digital productivity, e-commerce, and technology training for youth.",
      },
      {
        icon: Sprout,
        title: "Sustainable Agriculture & Bio-Farming",
        desc: "Natural farming techniques, soil health management, and organic crop diversification.",
      },
      {
        icon: Trees,
        title: "Green Village & Afforestation",
        desc: "Large-scale native tree plantation drives, fruit orchard development, and green corridors.",
      },
      {
        icon: Compass,
        title: "Water Conservation & Harvesting",
        desc: "Recharging groundwater, rainwater harvesting structures, and micro-irrigation systems.",
      },
      {
        icon: Home,
        title: "Model Village Development",
        desc: "Integrated rural transformations combining solar lighting, clean water, schools, and health units.",
      },
      {
        icon: Briefcase,
        title: "Youth Entrepreneurship Incubation",
        desc: "Mentoring, business planning, and market linkages for rural agri-tech and service startups.",
      },
      {
        icon: ShieldCheck,
        title: "Disaster Preparedness & Relief Teams",
        desc: "Training community volunteer corps in flood response, emergency rescue, and first aid.",
      },
      {
        icon: Lightbulb,
        title: "Renewable Energy Adoption",
        desc: "Promoting solar pumps, community solar charging stations, and energy-efficient practices.",
      },
      {
        icon: Users,
        title: "Farmer Producer Networks",
        desc: "Organizing collective purchasing and direct farmer-to-market trade channels for better price realization.",
      },
    ],
    whoWeReach: [
      "Rural youth preparing to enter the modern digital workforce and entrepreneurial economy",
      "Small and marginal farmers facing climate risks, water scarcity, and rising input costs",
      "Entire village habitations selected for comprehensive Model Village development",
      "Community volunteers and disaster response squads in flood-prone districts",
      "Rural artisans and small producers transitioning to digital marketplaces",
    ],
    longTermVision:
      "Communities that are not merely recipients of external aid, but are empowered with the knowledge, institutions, and resilience required to lead India's sustainable future.",
    quote: {
      text: "The best way to predict the future is to create it. When we prepare communities today, we secure a prosperous tomorrow.",
      author: "ISLAH Vision 2047 Framework",
    },
    donationTiers: [
      { amount: 1000, label: "Plant 10 Fruit & Shade Trees", impact: "Plants and nurtures 10 native trees with protective tree guards in a rural village." },
      { amount: 3000, label: "Farmer Sustainable Agriculture Kit", impact: "Provides organic bio-fertilizers, heirloom seeds, and natural pest management training." },
      { amount: 6000, label: "Youth Digital Skills Cohort", impact: "Sponsors advanced digital skills and computer literacy for 2 rural students for 6 months." },
      { amount: 15000, label: "Model Village Sustenance Patron", impact: "Supports community water harvesting or solar lighting installation in an underserved hamlet." },
    ],
    relatedPrograms: [
      { title: "Environment Protection & Green Village", href: "/programs/environment" },
      { title: "Agriculture & Farmer Support", href: "/programs/agriculture" },
      { title: "Skills Development & Vocational Training", href: "/programs/skills-development" },
    ],
  },
};

// Add alias mappings so both spellings work seamlessly
CAMPAIGNS_DATA["har-pal-anmol"] = CAMPAIGNS_DATA["har-pal-anmol-hai"];
CAMPAIGNS_DATA["swabhiman"] = CAMPAIGNS_DATA["swabhimaan"];
CAMPAIGNS_DATA["tayyari-kal-ki"] = CAMPAIGNS_DATA["taiyyari-kal-ki"];

export const ALL_CAMPAIGNS_LIST: CampaignData[] = [
  CAMPAIGNS_DATA["shiksha-na-ruke"],
  CAMPAIGNS_DATA["har-pal-anmol-hai"],
  CAMPAIGNS_DATA["pari-ki-udaan"],
  CAMPAIGNS_DATA["swabhimaan"],
  CAMPAIGNS_DATA["taiyyari-kal-ki"],
];
