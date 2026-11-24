import { CAMPAIGNS_DATA } from "@/content/campaigns";
import { SECTOR_CATALOGUE, SECTOR_PROGRAMMES } from "@/content/sectorCatalogue";

/**
 * Content and option lists for the Donation & Support page and the Donation &
 * Community Support Form (see "Make Donation Page" specification).
 */

// ============================================================================
// Support areas (8 sectors + general options)
// ============================================================================

export const SECTOR_AREAS = SECTOR_CATALOGUE.slice(0, 8).map((s) => s.name);

export const GENERAL_SUPPORT = "General Support Across ISLAH's Programmes";
export const NON_RECURRING_SUPPORT = "Non-recurring support to ISLAH";

/** 1.2 Preferred Support Area — select one or more. */
export const SUPPORT_AREAS = [...SECTOR_AREAS, GENERAL_SUPPORT, NON_RECURRING_SUPPORT];

/** Work-area codes used by the finance ledger. */
export const AREA_WORK_CODES: Record<string, string> = {
  "Education & Learning": "EDU",
  "Healthcare & Well-being": "HLT",
  "Women & Youth Empowerment": "WYE",
  "Skills & Livelihoods": "SLE",
  "Social Justice & Legal Empowerment": "SJL",
  "Agriculture & Rural Livelihoods": "AGR",
  "Environment & Sustainable Development": "ENV",
  "Humanitarian Relief & Rehabilitation": "HRR",
};

export interface SupportAreaInfo {
  name: string;
  desc: string;
  linkLabel: string;
  to: string;
}

/** Section 03 — Where your support can make a difference. */
export const SUPPORT_AREA_INFO: SupportAreaInfo[] = [
  {
    name: "Education & Learning",
    desc: "Supporting access to learning, academic development, skills, knowledge and educational opportunities.",
    linkLabel: "Explore Education & Learning",
    to: "/programs/education",
  },
  {
    name: "Healthcare & Well-being",
    desc: "Supporting initiatives that promote health awareness, access, prevention and community well-being.",
    linkLabel: "Explore Healthcare & Well-being",
    to: "/programs/healthcare",
  },
  {
    name: "Women & Youth Empowerment",
    desc: "Creating opportunities for women and young people through education, skills, participation and leadership.",
    linkLabel: "Explore Women & Youth Empowerment",
    to: "/programs/women-empowerment",
  },
  {
    name: "Skills & Livelihoods",
    desc: "Supporting practical skills, vocational development, entrepreneurship and livelihood opportunities.",
    linkLabel: "Explore Skills & Livelihoods",
    to: "/programs/skills-development",
  },
  {
    name: "Social Justice & Legal Empowerment",
    desc: "Supporting awareness, access to information, rights-based understanding and appropriate community assistance.",
    linkLabel: "Explore Social Justice & Legal Empowerment",
    to: "/programs/social-justice",
  },
  {
    name: "Agriculture & Rural Livelihoods",
    desc: "Supporting sustainable agricultural practices, rural livelihoods, knowledge and community resilience.",
    linkLabel: "Explore Agriculture & Rural Livelihoods",
    to: "/programs/agriculture",
  },
  {
    name: "Environment & Sustainable Development",
    desc: "Supporting environmental awareness, conservation, sustainability and community-led action.",
    linkLabel: "Explore Environment & Sustainability",
    to: "/programs/environment",
  },
  {
    name: "Humanitarian Relief & Rehabilitation",
    desc: "Supporting appropriate relief, recovery and rehabilitation initiatives for communities affected by emergencies and hardship.",
    linkLabel: "Explore Humanitarian Action",
    to: "/programs/relief-and-rehabilitation",
  },
];

// ============================================================================
// Form option lists
// ============================================================================

export const CONTRIBUTION_TYPES = [
  "General Donation",
  "Programme-Specific Donation",
  "Community Initiative Donation",
  "Emergency / Humanitarian Support",
  "Other — Please Specify",
];
export const CONTRIBUTION_OTHER = "Other — Please Specify";

export const PROGRAMME_SPECIFIC = "Select a Specific Programme";
export const PROGRAMME_MULTIPLE = "Support Multiple Programmes";
export const PROGRAMME_GENERAL = "General Organisational Support";
export const PROGRAMME_RECOMMEND = "Recommend a Suitable Programme";
/** 1.3 Preferred Programme / Initiative. */
export const PROGRAMME_CHOICES = [
  PROGRAMME_SPECIFIC,
  PROGRAMME_MULTIPLE,
  PROGRAMME_GENERAL,
  PROGRAMME_RECOMMEND,
];

/** Suggested contributions (illustrative). */
export const PRESET_AMOUNTS = [1000, 3000, 5000, 10000];
export const MIN_DONATION = 100;
/** Larger gifts go through bank transfer (payment-gateway per-transaction limits). */
export const MAX_ONLINE_DONATION = 500000;

export type DonationFrequency = "One Time" | "Monthly" | "Yearly";
export const FREQUENCY_OPTIONS: { value: DonationFrequency; label: string }[] = [
  { value: "One Time", label: "No, Just Once" },
  { value: "Monthly", label: "Every Month" },
  { value: "Yearly", label: "Every Year" },
];
export const FREQUENCY_LABEL: Record<DonationFrequency, string> = {
  "One Time": "One-Time",
  Monthly: "Recurring — Every Month",
  Yearly: "Recurring — Every Year",
};

/**
 * Set to true only once e-mandate / subscription billing is live on the payment
 * gateway. While false, a recurring choice is recorded as a pledge with reminders
 * and nothing is debited automatically — the form tells the donor exactly this.
 */
export const RECURRING_AUTO_DEBIT_ENABLED = false;

export const DONOR_INDIVIDUAL = "Individual";
export const DONOR_ORGANISATION = "Organisation / Institution";
export const DONOR_CATEGORIES = [DONOR_INDIVIDUAL, DONOR_ORGANISATION];

export const ORGANISATION_TYPES = [
  "Company / Corporate",
  "CSR Foundation",
  "Trust / Society / NGO",
  "Educational Institution",
  "Religious / Community Institution",
  "Government / Public Body",
  "Other",
];

export type DocumentationPreference = "standard" | "tax";
export const DOCUMENTATION_OPTIONS: { id: DocumentationPreference; title: string; desc: string }[] =
  [
    {
      id: "standard",
      title: "Standard Donation Receipt / Acknowledgement",
      desc: "A receipt and acknowledgement for your records.",
    },
    {
      id: "tax",
      title: "Applicable Tax-Deduction Documentation, if eligible",
      desc: "Needs your legal name, PAN and complete postal address.",
    },
  ];

export const HEAR_ABOUT_OPTIONS = [
  "ISLAH Website",
  "Social Media",
  "Family / Friends / Personal Referral",
  "Existing Donor or Partner",
  "Event / Workshop / Community Programme",
  "Institutional / Professional Network",
  "Other",
];

export type RecognitionPreference = "public" | "private" | "anonymous";
export const RECOGNITION_OPTIONS: { id: RecognitionPreference; title: string; desc: string }[] = [
  {
    id: "public",
    title: "Public Recognition",
    desc: "I authorise ISLAH to display my approved name or organisation name in an appropriate donor recognition section on its official website.",
  },
  {
    id: "private",
    title: "Private Recognition",
    desc: "I do not wish my name or organisation to be displayed publicly. Acknowledgement may be provided privately.",
  },
  {
    id: "anonymous",
    title: "Anonymous",
    desc: "I prefer not to be identified publicly in donor recognition materials.",
  },
];
export const RECOGNITION_LABEL: Record<RecognitionPreference, string> = {
  public: "Public",
  private: "Private",
  anonymous: "Anonymous",
};

// ============================================================================
// Programme helpers
// ============================================================================

/** Programmes that belong to the chosen support areas, grouped by area. */
export function programmesForAreas(areas: string[]): { area: string; programmes: string[] }[] {
  return areas
    .filter((a) => SECTOR_PROGRAMMES[a]?.length)
    .map((area) => ({ area, programmes: SECTOR_PROGRAMMES[area] }));
}

export function flatProgrammes(areas: string[]): string[] {
  return programmesForAreas(areas).flatMap((g) => g.programmes);
}

// ============================================================================
// Prefill from links into /donate (programme pages, patients, campaigns)
// ============================================================================

export interface DonateSearch {
  patientId?: string;
  patient?: string;
  name?: string;
  amount?: string;
  financialType?: string;
  program?: string;
  initiative?: string;
  cause?: string;
  type?: string;
  campaign?: string;
}

export interface DonationPrefill {
  contributionType?: string;
  supportAreas?: string[];
  programmeChoice?: string;
  programme?: string;
  amount?: string;
  patientSlug?: string;
  purposeDetails?: string;
  /** Short line describing what the donor arrived to support. */
  contextLabel?: string;
}

const STOP_WORDS = new Set([
  "and",
  "the",
  "of",
  "for",
  "programme",
  "programmes",
  "program",
  "programs",
  "initiative",
  "initiatives",
  "support",
  "campaigns",
]);

const tokens = (s: string) =>
  s
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .split(/[^a-z]+/)
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t));

/** Maps any legacy cause / programme label to one of the support areas. */
export function areaFromLabel(raw?: string): string | undefined {
  if (!raw) return undefined;
  const label = decodeURIComponent(raw).trim();
  const exact = SUPPORT_AREAS.find((a) => a.toLowerCase() === label.toLowerCase());
  if (exact) return exact;
  const c = label.toLowerCase();
  const has = (...words: string[]) => words.some((w) => c.includes(w));
  if (
    has(
      "medic",
      "patient",
      "hospital",
      "ambulance",
      "cancer",
      "diabetes",
      "menstrual",
      "cles",
      "health",
    )
  )
    return "Healthcare & Well-being";
  if (has("agri", "farm", "crop")) return "Agriculture & Rural Livelihoods";
  if (has("env", "green", "tree", "climate", "water", "plastic", "sustainab"))
    return "Environment & Sustainable Development";
  if (has("edu", "school", "clc", "learn", "scholarship")) return "Education & Learning";
  if (has("women", "youth", "shg", "gender", "girl")) return "Women & Youth Empowerment";
  if (has("skill", "livelihood", "entrepreneur", "vocation")) return "Skills & Livelihoods";
  if (has("justice", "legal", "rights", "grievance")) return "Social Justice & Legal Empowerment";
  if (has("relief", "disaster", "rehab", "shelter", "flood", "winter", "ration", "humanitarian"))
    return "Humanitarian Relief & Rehabilitation";
  if (has("general", "capital")) return GENERAL_SUPPORT;
  return undefined;
}

/** Finds the approved programme an initiative label refers to, if any. */
export function matchProgramme(initiative: string, area?: string): string | undefined {
  const label = decodeURIComponent(initiative).trim();
  if (!label) return undefined;
  if (SUPPORT_AREAS.some((a) => a.toLowerCase() === label.toLowerCase())) return undefined;
  const pool =
    area && SECTOR_PROGRAMMES[area] ? SECTOR_PROGRAMMES[area] : flatProgrammes(SECTOR_AREAS);

  const code = label.match(/\(([A-Z]{2,5})\)/)?.[1];
  if (code) {
    const byCode = pool.find((p) => p.includes(`(${code})`));
    if (byCode) return byCode;
  }
  const lower = label.toLowerCase();
  const byName = pool.find((p) => {
    const name = p.replace(/\s*\([^)]*\)\s*$/, "").toLowerCase();
    return name.includes(lower) || lower.includes(name);
  });
  if (byName) return byName;

  const want = new Set(tokens(label));
  let best: { p: string; score: number } | undefined;
  for (const p of pool) {
    const score = tokens(p).filter((t) => want.has(t)).length;
    if (score >= 2 && (!best || score > best.score)) best = { p, score };
  }
  return best?.p;
}

/** Turns the search params of a /donate link into initial form values. */
export function prefillFromSearch(search: DonateSearch): DonationPrefill {
  const out: DonationPrefill = {};
  const amount = Number(String(search.amount ?? "").replace(/\D/g, ""));
  if (amount >= MIN_DONATION) out.amount = String(Math.min(amount, MAX_ONLINE_DONATION));

  const patientSlug = search.patientId || search.patient;
  if (patientSlug) {
    out.patientSlug = patientSlug;
    out.contributionType = "Emergency / Humanitarian Support";
    out.supportAreas = ["Healthcare & Well-being"];
    out.programmeChoice = PROGRAMME_SPECIFIC;
    out.programme = "Critical Life & Emergency Support (CLES)";
    out.contextLabel = search.name
      ? `Emergency patient support: ${decodeURIComponent(search.name)}`
      : "Emergency patient support";
    return out;
  }

  if (search.campaign) {
    const campaign = CAMPAIGNS_DATA[search.campaign];
    const title = campaign?.name ?? decodeURIComponent(search.campaign).replace(/-/g, " ");
    const area = areaFromLabel(campaign?.category);
    out.contributionType = "Community Initiative Donation";
    if (area) out.supportAreas = [area];
    out.purposeDetails = `Campaign: ${title}`;
    out.contextLabel = `Campaign: ${title}`;
    return out;
  }

  const rawType = search.financialType || search.program || search.type || search.cause;
  const area =
    areaFromLabel(rawType) ?? (search.initiative ? areaFromLabel(search.initiative) : undefined);
  if (/emergency/i.test(rawType ?? "")) out.contributionType = "Emergency / Humanitarian Support";
  if (area) out.supportAreas = [area];
  if (area === GENERAL_SUPPORT) {
    out.contributionType = "General Donation";
    out.programmeChoice = PROGRAMME_GENERAL;
  }

  if (search.initiative) {
    const programme = matchProgramme(search.initiative, area);
    if (programme) {
      out.contributionType ??= "Programme-Specific Donation";
      out.programmeChoice = PROGRAMME_SPECIFIC;
      out.programme = programme;
      out.contextLabel = programme;
    } else if (!area || !tokens(search.initiative).every((t) => tokens(area).includes(t))) {
      out.purposeDetails = `Supporting: ${decodeURIComponent(search.initiative)}`;
      out.contextLabel = decodeURIComponent(search.initiative);
    }
  }
  if (!out.contextLabel && area && area !== GENERAL_SUPPORT) out.contextLabel = area;
  return out;
}

// ============================================================================
// Page copy
// ============================================================================

export const DONATION_FAQS: { q: string; a: string }[] = [
  {
    q: "How can I donate to ISLAH?",
    a: "You can use the available online donation facility or the other payment methods officially provided by ISLAH.",
  },
  {
    q: "Can I choose what my donation supports?",
    a: "Where a programme designation option is available, you may indicate your preferred area. Allocation remains subject to programme requirements and ISLAH's applicable policies.",
  },
  {
    q: "Can I make a recurring donation?",
    a: "If recurring payments are enabled on the ISLAH donation system, you can choose the applicable recurring option.",
  },
  {
    q: "Can I donate to a specific programme?",
    a: "Where programme-specific support is available, you can select the relevant programme or initiative.",
  },
  {
    q: "Will I receive a donation receipt?",
    a: "A receipt or acknowledgement should be issued according to the donation system and applicable documentation requirements.",
  },
  {
    q: "Can I remain anonymous?",
    a: "Yes, where the donation system provides an anonymity option. ISLAH should respect the donor's applicable privacy preference.",
  },
  {
    q: "Can I support ISLAH without donation?",
    a: "Yes. You can volunteer, become a member, become a mentor, partner with ISLAH or contribute knowledge and skills.",
  },
  {
    q: "Can organisations support ISLAH?",
    a: "Yes. Organisations can explore programme support, CSR engagement, resource support or structured partnerships.",
  },
  {
    q: "Can I request tax-related donation documentation?",
    a: "If ISLAH is eligible to issue the relevant documentation and the applicable legal requirements are met, the appropriate documentation can be provided. Donors should retain the receipt and follow applicable tax rules.",
  },
  {
    q: "How can I know more about ISLAH's work?",
    a: "Explore our programmes, impact information, organisational information and relevant reports available through the website.",
  },
];

// ============================================================================
// Offline contribution details (official banking details)
// ============================================================================

export const OFFLINE_BANK_DETAILS = {
  accountName: "Islah Welfare Foundation",
  accountNo: "1004451030069725",
  accountType: "Savings Account",
  ifsc: "PUNBOMBGB06",
  micr: "800811002",
  bankName: "Bihar Gramin Bank",
  branch: "Baghant, Manigachi, Darbhanga, Bihar - 847423",
  chequePayableTo: "ISLAH WELFARE FOUNDATION",
  chequeAddress: "B-144, Abul Fazal Enclave-II, Okhla, New Delhi - 110025",
} as const;
