import { Shield, Award, Sparkles, Building2 } from "lucide-react";
export {
  AGE_GROUPS,
  COUNTRIES,
  EMAIL_RE,
  GENDERS,
  PAN_RE,
  URL_RE,
  isValidPhone,
} from "@/components/forms/formRules";

// ============================================================================
// Membership tiers (approved fee schedule)
// ============================================================================

export type TierType = "Blue" | "Yellow" | "Green" | "Orange";
export type FormMode = "individual" | "organisation";
export type Recognition = "public" | "private" | "anonymous";

export interface TierConfig {
  id: TierType;
  cardName: string;
  roleTitle: string;
  amount: number;
  code: string;
  monthlyEquiv: string;
  badge: string;
  borderClass: string;
  bgPastel: string;
  accentColor: string;
  tagline: string;
  suitableFor: string[];
  features: string[];
  icon: typeof Shield;
  popular?: boolean;
}

export const MEMBERSHIP_TIERS: Record<TierType, TierConfig> = {
  Blue: {
    id: "Blue",
    cardName: "Blue Card",
    roleTitle: "Community Member",
    amount: 2400,
    code: "MBL",
    monthlyEquiv: "₹200/mo",
    badge: "bg-blue-100 text-blue-800 border-blue-200",
    borderClass: "border-blue-200 hover:border-blue-400",
    bgPastel: "bg-blue-50/40 hover:bg-blue-50/80",
    accentColor: "#1d4ed8",
    tagline:
      "For individuals who wish to connect with ISLAH, support its mission and participate in community activities.",
    suitableFor: ["Students", "Community Members", "Volunteers", "Supporters"],
    features: [
      "Official Digital Membership Card & Member ID",
      "Opportunity to participate in selected programs & awareness drives",
      "Regular updates on community initiatives & impact reports",
      "Option for public listing in the ISLAH Community Directory",
    ],
    icon: Shield,
  },
  Yellow: {
    id: "Yellow",
    cardName: "Yellow Card",
    roleTitle: "Contributing Member",
    amount: 3600,
    code: "MYL",
    monthlyEquiv: "₹300/mo",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    borderClass: "border-amber-300 hover:border-amber-400",
    bgPastel: "bg-amber-50/40 hover:bg-amber-50/80",
    accentColor: "#d97706",
    tagline:
      "For individuals who wish to take a more active role through knowledge, skills, professional experience and volunteering.",
    suitableFor: ["Professionals", "Educators", "Skilled Volunteers", "Community Contributors"],
    features: [
      "All Blue Card community benefits included",
      "Priority participation in program-level consultations & activities",
      "Opportunities to contribute specialized skills & guidance",
      "Invitations to quarterly member webinars & learning sessions",
    ],
    icon: Award,
    popular: true,
  },
  Green: {
    id: "Green",
    cardName: "Green Card",
    roleTitle: "Patron Member",
    amount: 5400,
    code: "MGR",
    monthlyEquiv: "₹450/mo",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    borderClass: "border-emerald-300 hover:border-emerald-500",
    bgPastel: "bg-emerald-50/40 hover:bg-emerald-50/80",
    accentColor: "#15803d",
    tagline:
      "For individuals who wish to maintain a deeper, sustained connection with ISLAH's mission and community progress.",
    suitableFor: [
      "Experienced Professionals",
      "Entrepreneurs",
      "Philanthropic Supporters",
      "Community Leaders",
    ],
    features: [
      "All Yellow Card privileges included",
      "Special acknowledgment as an ISLAH Patron Member",
      "Invitations to annual leadership roundtable & special events",
      "Direct engagement with program coordinators on key initiatives",
    ],
    icon: Sparkles,
  },
  Orange: {
    id: "Orange",
    cardName: "Orange Card",
    roleTitle: "Organizational Member",
    amount: 9600,
    code: "MOR",
    monthlyEquiv: "₹800/mo",
    badge: "bg-orange-100 text-orange-800 border-orange-200",
    borderClass: "border-orange-300 hover:border-orange-500",
    bgPastel: "bg-orange-50/40 hover:bg-orange-50/80",
    accentColor: "#ea580c",
    tagline:
      "For institutions, NGOs, corporations and associations seeking strategic alignment and sustained community development.",
    suitableFor: [
      "NGOs & Non-Profits",
      "Educational Institutions",
      "Companies & CSR Teams",
      "Social Enterprises",
    ],
    features: [
      "Institutional Member ID and Certificate of Association",
      "Authorized logo & link in the ISLAH Community Directory",
      "Opportunities for joint awareness & grassroots initiatives",
      "Dedicated institutional liaison for CSR and social programs",
    ],
    icon: Building2,
  },
};

export const INDIVIDUAL_TIERS: TierType[] = ["Blue", "Yellow", "Green"];

// ============================================================================
// Option lists (as specified in the membership application document)
// ============================================================================

export const OTHER_SECTOR = "Other / Cross-Sectoral Interests";
export const SECTOR_OPTIONS = [
  "Education & Learning",
  "Healthcare & Well-being",
  "Women & Youth Empowerment",
  "Skills & Livelihoods",
  "Social Justice & Legal Empowerment",
  "Agriculture & Rural Livelihoods",
  "Environment & Sustainable Development",
  "Humanitarian Relief & Rehabilitation",
  OTHER_SECTOR,
];

export const HEAR_ABOUT_OPTIONS = [
  "ISLAH website",
  "Social media",
  "Friend or family",
  "Existing member",
  "Volunteer or mentor",
  "Educational institution",
  "Community organisation",
  "Event or campaign",
  "Other",
];

export const ORG_HEAR_ABOUT_OPTIONS = [
  "ISLAH website",
  "Existing ISLAH member",
  "Volunteer or mentor",
  "Social media",
  "Educational / professional network",
  "Community organisation",
  "Event or programme",
  "Other",
];

export const ORG_TYPES = [
  "NGO / Non-profit Organisation",
  "Educational Institution",
  "Healthcare Institution",
  "Company / Business Organisation",
  "Research / Academic Institution",
  "Community-Based Organisation",
  "Social Enterprise",
  "Professional Association",
  "Other",
];

export const ORG_REG_TYPES = [
  "Trust",
  "Society",
  "Section 8 Company",
  "Educational Institution",
  "Registered Company",
  "Other",
];

export const OTHER_CONTRIBUTION = "Other contribution";
export const ORG_CONTRIBUTION_WAYS = [
  "Technical or professional expertise",
  "Knowledge sharing and training",
  "Volunteers or mentors",
  "Educational or learning resources",
  "Community outreach and mobilisation",
  "Programme implementation support",
  "Research and documentation",
  "Equipment, materials or in-kind support",
  "Networking and institutional linkages",
  "Financial support or sponsorship",
  OTHER_CONTRIBUTION,
];

export const REP_RELATIONSHIPS = [
  "Founder / Trustee / Governing Body Member",
  "Director / Senior Management",
  "Head of Institution",
  "Programme / Department Head",
  "Authorised Administrative Representative",
  "Other Authorised Representative",
];

export const RECOGNITION_OPTIONS: Record<
  FormMode,
  { id: Recognition; title: string; desc: string }[]
> = {
  individual: [
    {
      id: "public",
      title: "Public Recognition",
      desc: "I consent to my name being displayed in the ISLAH Community Members Directory.",
    },
    {
      id: "private",
      title: "Private Recognition",
      desc: "I do not want my name displayed publicly. ISLAH may communicate with me directly.",
    },
    {
      id: "anonymous",
      title: "Anonymous",
      desc: "I prefer not to be individually identified or publicly recognised.",
    },
  ],
  organisation: [
    {
      id: "public",
      title: "Public Recognition",
      desc: "We authorise ISLAH to display our organisation's approved name and logo in the directory.",
    },
    {
      id: "private",
      title: "Private Recognition",
      desc: "We do not wish to be listed publicly. ISLAH may contact our authorised representative.",
    },
    {
      id: "anonymous",
      title: "Anonymous",
      desc: "We prefer not to be individually identified or publicly recognised.",
    },
  ],
};

// Membership periods: 1 year, 2 years, or a specified number of years
export const MAX_SPECIFIED_YEARS = 10;

// ============================================================================
// Foundation details (used on the member card)
// ============================================================================

export const FOUNDATION = {
  name: "ISLAH Welfare Foundation",
  address: "B-144, Abul Fazal Enclave, Okhla, Delhi-110025",
  phone: "+91 9811861633",
  email: "info@iwfindia.org",
  website: "www.iwfindia.org",
};

// ============================================================================
// Helpers
// ============================================================================

export function formatDisplayDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

/** Valid-till date: one day before the same date N years later. */
export function computeValidTill(from: Date, years: number): Date {
  const till = new Date(from);
  till.setFullYear(till.getFullYear() + years);
  till.setDate(till.getDate() - 1);
  return till;
}

export function generateMemberId(tier: TierType): string {
  const year = new Date().getFullYear();
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `ISLAH-${MEMBERSHIP_TIERS[tier].code}-${year}-${suffix}`;
}

export function generateReceiptNo(): string {
  const year = new Date().getFullYear();
  return `RCP-MEM-${year}-${Math.floor(10000 + Math.random() * 90000)}`;
}

/** Map API / legacy category names onto the card tiers. */
export function normaliseTier(category: string | undefined): TierType {
  const c = (category || "").toLowerCase();
  if (c.includes("blue") || c.includes("community")) return "Blue";
  if (c.includes("green") || c.includes("patron")) return "Green";
  if (c.includes("orange") || c.includes("organi")) return "Orange";
  return "Yellow";
}
