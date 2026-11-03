export type MemberCategory = "Blue" | "Yellow" | "Green" | "Orange";
export type MemberType = "Community Member" | "Contributing Member" | "Patron Member" | "Executive Member";
export type MemberStatus = "Active" | "Pending" | "Expired";

export interface MemberItem {
  id: string;
  name: string;
  category: MemberCategory;
  type: MemberType;
  district: string;
  state: string;
  status: MemberStatus;
  joinDate: string;
  validTill: string;
  avatarUrl?: string;
  profession?: string;
}

export type DonorTier = "Platinum" | "Gold" | "Silver" | "Recognised" | "Individual";
export type DonorType = "Corporate Donor" | "Individual Donor" | "Foundation Partner";

export interface DonorItem {
  id: string;
  name: string;
  tier: DonorTier;
  type: DonorType;
  causes: string[];
  sinceYear: number;
  location: string;
  amountLabel?: string;
  description?: string;
  logoText?: string;
}

export type PartnerCategory =
  | "Strategic Partner"
  | "Corporate Partner"
  | "Financial Partner"
  | "Healthcare Partner"
  | "Technology Partner"
  | "CSR Partner"
  | "Development Partner";

export interface PartnerItem {
  id: string;
  name: string;
  category: PartnerCategory;
  focusArea: string;
  location: string;
  sinceYear: number;
  description: string;
  badge: string;
  website?: string;
}

export type VolunteerRole = "Mentor" | "Volunteer";

export interface VolunteerItem {
  id: string;
  name: string;
  role: VolunteerRole;
  title: string;
  domain: string;
  location: string;
  bio: string;
  initials: string;
}

// ─────────────────────────────────────────────────────────────
// STATS & OVERVIEW DATA
// ─────────────────────────────────────────────────────────────

export const COMMUNITY_STATS = {
  membersCount: "120+",
  donorsCount: "80+",
  partnersCount: "40+",
  volunteersCount: "25+",
  chaptersCount: "12 Districts",
};

// ─────────────────────────────────────────────────────────────
// MEMBERS DATA
// ─────────────────────────────────────────────────────────────

export const MEMBERS_DATA: MemberItem[] = [
  {
    id: "ISLAH-MB-0012",
    name: "Ayesha Khan",
    category: "Blue",
    type: "Community Member",
    district: "Darbhanga",
    state: "Bihar",
    status: "Active",
    joinDate: "12 Jan 2024",
    validTill: "11 Jan 2027",
    profession: "Educator & Social Worker",
  },
  {
    id: "ISLAH-MY-0034",
    name: "Rahul Sharma",
    category: "Yellow",
    type: "Contributing Member",
    district: "New Delhi",
    state: "Delhi NCR",
    status: "Active",
    joinDate: "05 Mar 2023",
    validTill: "04 Mar 2026",
    profession: "IT Project Lead",
  },
  {
    id: "ISLAH-MG-0056",
    name: "Neha Verma",
    category: "Green",
    type: "Patron Member",
    district: "Lucknow",
    state: "Uttar Pradesh",
    status: "Active",
    joinDate: "18 Aug 2022",
    validTill: "17 Aug 2027",
    profession: "Advocate & Legal Advisor",
  },
  {
    id: "ISLAH-MB-0078",
    name: "Imran Ansari",
    category: "Blue",
    type: "Community Member",
    district: "Patna",
    state: "Bihar",
    status: "Active",
    joinDate: "09 Feb 2024",
    validTill: "08 Feb 2026",
    profession: "Grassroots Organizer",
  },
  {
    id: "ISLAH-MY-0091",
    name: "Sneha Gupta",
    category: "Yellow",
    type: "Contributing Member",
    district: "Gurugram",
    state: "Haryana",
    status: "Active",
    joinDate: "21 Jun 2023",
    validTill: "20 Jun 2026",
    profession: "Financial Analyst",
  },
  {
    id: "ISLAH-MG-0110",
    name: "Md. Saifullah",
    category: "Green",
    type: "Patron Member",
    district: "Azamgarh",
    state: "Uttar Pradesh",
    status: "Active",
    joinDate: "14 Nov 2022",
    validTill: "13 Nov 2027",
    profession: "Senior Entrepreneur",
  },
  {
    id: "ISLAH-MB-0127",
    name: "Pooja Singh",
    category: "Blue",
    type: "Community Member",
    district: "Saran",
    state: "Bihar",
    status: "Active",
    joinDate: "02 Apr 2024",
    validTill: "01 Apr 2026",
    profession: "Healthcare Worker",
  },
  {
    id: "ISLAH-MY-0154",
    name: "Rakesh Yadav",
    category: "Yellow",
    type: "Contributing Member",
    district: "Meerut",
    state: "Uttar Pradesh",
    status: "Expired",
    joinDate: "10 Oct 2022",
    validTill: "09 Oct 2024",
    profession: "Agriculture Consultant",
  },
  {
    id: "ISLAH-MG-0178",
    name: "Fatima Bano",
    category: "Green",
    type: "Patron Member",
    district: "Patna",
    state: "Bihar",
    status: "Active",
    joinDate: "15 Jan 2023",
    validTill: "14 Jan 2028",
    profession: "Women SHG Lead",
  },
  {
    id: "ISLAH-MO-0205",
    name: "Dr. Tariq Anwar",
    category: "Orange",
    type: "Executive Member",
    district: "Darbhanga",
    state: "Bihar",
    status: "Active",
    joinDate: "01 Jan 2021",
    validTill: "31 Dec 2026",
    profession: "Medical Consultant",
  },
  {
    id: "ISLAH-MB-0219",
    name: "Zainab Siddiqui",
    category: "Blue",
    type: "Community Member",
    district: "New Delhi",
    state: "Delhi NCR",
    status: "Pending",
    joinDate: "28 Oct 2026",
    validTill: "27 Oct 2027",
    profession: "Youth Mentor",
  },
  {
    id: "ISLAH-MY-0242",
    name: "Amitabh Sen",
    category: "Yellow",
    type: "Contributing Member",
    district: "Kolkata",
    state: "West Bengal",
    status: "Active",
    joinDate: "11 May 2023",
    validTill: "10 May 2026",
    profession: "Public Policy Specialist",
  },
];

// ─────────────────────────────────────────────────────────────
// DONORS DATA
// ─────────────────────────────────────────────────────────────

export const DONORS_DATA: DonorItem[] = [
  {
    id: "DNR-001",
    name: "Tata Consultancy Services",
    tier: "Platinum",
    type: "Corporate Donor",
    causes: ["Education", "Digital Learning"],
    sinceYear: 2021,
    location: "Pan India",
    amountLabel: "₹50,000+ Tier",
    description: "Multi-year backing for smart computer laboratories and digital literacy in underserved rural districts.",
    logoText: "TCS",
  },
  {
    id: "DNR-002",
    name: "Reliance Foundation",
    tier: "Gold",
    type: "Corporate Donor",
    causes: ["Healthcare", "Rural Development"],
    sinceYear: 2020,
    location: "Maharashtra / Bihar",
    amountLabel: "₹20,000 – ₹49,999 Tier",
    description: "Supporting community healthcare camps, mobile diagnostic clinics, and seasonal relief camps.",
    logoText: "RF",
  },
  {
    id: "DNR-003",
    name: "HDFC Bank",
    tier: "Silver",
    type: "Corporate Donor",
    causes: ["Livelihoods", "Financial Inclusion"],
    sinceYear: 2019,
    location: "Pan India",
    amountLabel: "₹5,000 – ₹19,999 Tier",
    description: "Grant assistance for micro-enterprise incubation and self-help group financial literacy trainings.",
    logoText: "HDFC",
  },
  {
    id: "DNR-004",
    name: "State Bank of India",
    tier: "Recognised",
    type: "Corporate Donor",
    causes: ["Education", "Skill Development"],
    sinceYear: 2018,
    location: "Pan India",
    amountLabel: "Recognised Contributor",
    description: "Vocational skill kits and student scholarship stipends for deserving rural candidates.",
    logoText: "SBI",
  },
  {
    id: "DNR-005",
    name: "ITC Limited",
    tier: "Gold",
    type: "Corporate Donor",
    causes: ["Health", "Community Development"],
    sinceYear: 2017,
    location: "West Bengal / Bihar",
    amountLabel: "₹20,000 – ₹49,999 Tier",
    description: "Partnership supporting clean drinking water filtration and sanitation awareness initiatives.",
    logoText: "ITC",
  },
  {
    id: "DNR-006",
    name: "Cipla Foundation",
    tier: "Silver",
    type: "Corporate Donor",
    causes: ["Healthcare", "Nutrition"],
    sinceYear: 2016,
    location: "Maharashtra",
    amountLabel: "₹5,000 – ₹19,999 Tier",
    description: "Essential life support medicines, diabetes screening packages, and maternal nutritional kits.",
    logoText: "Cipla",
  },
  {
    id: "DNR-007",
    name: "Ayesha Khan",
    tier: "Individual",
    type: "Individual Donor",
    causes: ["Education", "Women Empowerment"],
    sinceYear: 2023,
    location: "Darbhanga, Bihar",
    amountLabel: "Individual Patron",
    description: "Recurring donor sponsoring higher secondary tuition and study materials for 12 rural girls.",
    logoText: "AK",
  },
  {
    id: "DNR-008",
    name: "Faisal Ahmed",
    tier: "Individual",
    type: "Individual Donor",
    causes: ["Skills", "Youth Development"],
    sinceYear: 2022,
    location: "New Delhi",
    amountLabel: "Individual Patron",
    description: "Donations directed toward student career coaching, laptop distributions, and exam fees.",
    logoText: "FA",
  },
  {
    id: "DNR-009",
    name: "Azim Premji Philanthropic Initiatives",
    tier: "Platinum",
    type: "Foundation Partner",
    causes: ["Primary Education", "Grassroots Health"],
    sinceYear: 2022,
    location: "Pan India",
    amountLabel: "₹50,000+ Tier",
    description: "Comprehensive institutional support for teacher enablement and foundational literacy centres.",
    logoText: "APPI",
  },
];

// ─────────────────────────────────────────────────────────────
// PARTNERS & SPONSORS DATA
// ─────────────────────────────────────────────────────────────

export const PARTNERS_DATA: PartnerItem[] = [
  {
    id: "PTR-001",
    name: "Tata Consultancy Services",
    category: "Strategic Partner",
    focusArea: "Technology & Digital Skills",
    location: "Pan India",
    sinceYear: 2021,
    description: "Co-creating rural digital learning hubs and providing cloud-based curriculum modules for students.",
    badge: "TCS",
  },
  {
    id: "PTR-002",
    name: "HDFC Bank",
    category: "Financial Partner",
    focusArea: "Financial Inclusion & Livelihoods",
    location: "Pan India",
    sinceYear: 2019,
    description: "Empowering rural women self-help groups with zero-cost accounts and basic entrepreneurship loans.",
    badge: "HDFC",
  },
  {
    id: "PTR-003",
    name: "Reliance Foundation",
    category: "Development Partner",
    focusArea: "Healthcare & Rural Development",
    location: "Maharashtra / Bihar",
    sinceYear: 2020,
    description: "Providing mobile medical screening vans, medical supplies, and maternal health monitoring camps.",
    badge: "RF",
  },
  {
    id: "PTR-004",
    name: "ITC Limited",
    category: "Corporate Partner",
    focusArea: "Health | Community Development",
    location: "Pan India",
    sinceYear: 2017,
    description: "Promoting green community sanitation drives, clean water access, and agro-forestry livelihoods.",
    badge: "ITC",
  },
  {
    id: "PTR-005",
    name: "Cipla Foundation",
    category: "Healthcare Partner",
    focusArea: "Healthcare & Nutrition",
    location: "Maharashtra",
    sinceYear: 2016,
    description: "Providing critical healthcare aid for patients facing catastrophic chronic illnesses and cancer care.",
    badge: "Cipla",
  },
  {
    id: "PTR-006",
    name: "State Bank of India",
    category: "Financial Partner",
    focusArea: "Education & Skill Development",
    location: "Pan India",
    sinceYear: 2018,
    description: "Skill certification sponsorship and youth entrepreneurship mentoring in northern Bihar.",
    badge: "SBI",
  },
  {
    id: "PTR-007",
    name: "Microsoft India",
    category: "Technology Partner",
    focusArea: "Digital Education & Innovation",
    location: "Pan India",
    sinceYear: 2022,
    description: "Providing software toolkits, AI fundamentals training, and digital classrooms for rural colleges.",
    badge: "MSFT",
  },
  {
    id: "PTR-008",
    name: "Infosys Foundation",
    category: "CSR Partner",
    focusArea: "Education & Livelihoods",
    location: "Karnataka / Bihar",
    sinceYear: 2021,
    description: "Supplying libraries with STEM textbooks, science lab apparatus, and student mentor programs.",
    badge: "INF",
  },
  {
    id: "PTR-009",
    name: "Tata Steel Foundation",
    category: "Development Partner",
    focusArea: "Skills & Livelihoods",
    location: "Jharkhand",
    sinceYear: 2020,
    description: "Grassroots artisan training, traditional handloom promotion, and rural market linkages.",
    badge: "TSF",
  },
];

// ─────────────────────────────────────────────────────────────
// VOLUNTEERS & MENTORS DATA
// ─────────────────────────────────────────────────────────────

export const VOLUNTEERS_DATA: VolunteerItem[] = [
  {
    id: "VOL-001",
    name: "Dr. Ayesha Rahman",
    role: "Mentor",
    title: "Education Mentor",
    domain: "Education & Career Guidance",
    location: "Delhi NCR",
    bio: "Assistant Professor with 10+ years mentoring first-generation college aspirants and competitive exam seekers.",
    initials: "AR",
  },
  {
    id: "VOL-002",
    name: "Rahul Verma",
    role: "Volunteer",
    title: "Digital Skills Volunteer",
    domain: "Digital Literacy & Tech",
    location: "Delhi NCR",
    bio: "Software developer conducting weekly online coding workshops and basic computer literacy drills.",
    initials: "RV",
  },
  {
    id: "VOL-003",
    name: "Meera Singh",
    role: "Mentor",
    title: "Healthcare Awareness Mentor",
    domain: "Healthcare Awareness",
    location: "Uttar Pradesh",
    bio: "Public health specialist running community sessions on adolescent nutrition, maternal wellness, and hygiene.",
    initials: "MS",
  },
  {
    id: "VOL-004",
    name: "Arif Khan",
    role: "Volunteer",
    title: "Career & Employability Mentor",
    domain: "Skills & Livelihoods",
    location: "Bihar",
    bio: "HR professional organizing mock interviews, resume writing labs, and corporate soft skills coaching.",
    initials: "AK",
  },
  {
    id: "VOL-005",
    name: "Neha Sharma",
    role: "Volunteer",
    title: "Women's Empowerment Volunteer",
    domain: "Women Empowerment",
    location: "Delhi NCR",
    bio: "Community activist assisting rural women collectives in self-defense, rights awareness, and banking.",
    initials: "NS",
  },
  {
    id: "VOL-006",
    name: "Vikram Das",
    role: "Volunteer",
    title: "Agriculture & Rural Livelihoods",
    domain: "Agriculture & Rural",
    location: "Darbhanga, Bihar",
    bio: "Agronomist helping local farmers adopt organic compost, water-efficient drip systems, and crop rotation.",
    initials: "VD",
  },
  {
    id: "VOL-007",
    name: "Sana Parveen",
    role: "Mentor",
    title: "Legal Literacy Volunteer",
    domain: "Legal Rights",
    location: "Patna, Bihar",
    bio: "High Court advocate educating rural families on consumer rights, domestic violence safeguards, and RTI.",
    initials: "SP",
  },
  {
    id: "VOL-008",
    name: "Karan Mehta",
    role: "Mentor",
    title: "Research & Knowledge Mentor",
    domain: "Education & Career Guidance",
    location: "Remote / Online",
    bio: "Policy researcher assisting ISLAH with grassroots demographic surveys, impact assessments, and reports.",
    initials: "KM",
  },
  {
    id: "VOL-009",
    name: "Pooja Yadav",
    role: "Volunteer",
    title: "Youth Leadership Mentor",
    domain: "Skills & Livelihoods",
    location: "Meerut, UP",
    bio: "Youth worker guiding adolescent clubs, sports events, and local volunteer teams in disaster readiness.",
    initials: "PY",
  },
];

// ─────────────────────────────────────────────────────────────
// VALUES & COMMITMENTS
// ─────────────────────────────────────────────────────────────

export const SHARED_COMMITMENTS = [
  {
    title: "Integrity",
    desc: "Uncompromising ethical stewardship, open public accounting, and adherence to our founding moral code.",
    iconName: "ShieldCheck",
  },
  {
    title: "Inclusion",
    desc: "Leaving no community behind, regardless of gender, caste, socioeconomic background, or geography.",
    iconName: "Users",
  },
  {
    title: "Accountability",
    desc: "Audited financial transparency, real-time ground tracking, and verifiable impact milestones.",
    iconName: "FileCheck",
  },
  {
    title: "Collaboration",
    desc: "Uniting donors, volunteers, state agencies, and corporate partners for collective social action.",
    iconName: "Handshake",
  },
  {
    title: "Sustainability",
    desc: "Designing long-term interventions that foster self-reliance rather than perpetual dependence.",
    iconName: "Leaf",
  },
];

// ─────────────────────────────────────────────────────────────
// INSPIRATIONAL QUOTES (For pre-footer empty space filler)
// ─────────────────────────────────────────────────────────────

export interface QuoteBannerData {
  quote: string;
  author: string;
  role: string;
  bgTag: string;
}

export const INSPIRATIONAL_QUOTES: Record<string, QuoteBannerData> = {
  overview: {
    quote: "Stronger communities are built by people who care, contribute and collaborate.",
    author: "ISLAH Welfare Foundation",
    role: "Vision 2047 Statement",
    bgTag: "Community Collective",
  },
  members: {
    quote: "We cannot always build the future for our youth, but we can build our youth for the future.",
    author: "Franklin D. Roosevelt",
    role: "Inspiration for Community Action",
    bgTag: "Membership Impact",
  },
  donors: {
    quote: "A generous heart builds a stronger and more inclusive community. What we give in charity never decreases our wealth.",
    author: "ISLAH Philanthropic Charter",
    role: "Honoring Our Donors",
    bgTag: "Transparent Stewardship",
  },
  partners: {
    quote: "If you want to go fast, go alone. If you want to go far, go together.",
    author: "Grassroots Proverb",
    role: "Shared Vision for Transformation",
    bgTag: "Strategic Partnerships",
  },
  volunteers: {
    quote: "A little time, shared with purpose, can create lasting change in someone's life.",
    author: "ISLAH Volunteers Creed",
    role: "Empowering Rural Lives",
    bgTag: "Service & Dedication",
  },
};

