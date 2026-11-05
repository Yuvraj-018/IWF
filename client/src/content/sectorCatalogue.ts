/**
 * ISLAH programme sectors with their specific sub-areas, as defined in the
 * Get Involved application specifications (Volunteer, Mentor, Partner, Sponsor).
 */

export const OTHER_SECTOR_NAME = "Other / Cross-Sectoral Interests";
export const OTHER_AREA = "Other — please specify";

export interface SectorCatalogueItem {
  name: string;
  short: string;
  areas: string[];
}

export const SECTOR_CATALOGUE: SectorCatalogueItem[] = [
  {
    name: "Education & Learning",
    short: "Learning support, scholarships, career guidance and vocational education.",
    areas: [
      "School Education & Learning Support",
      "Scholarships & Financial Assistance",
      "Community Learning Centres",
      "Digital Education & Literacy",
      "Career Guidance & Mentorship",
      "Competitive Examination Preparation",
      "Technical & Vocational Education",
      "Other Education Initiatives",
    ],
  },
  {
    name: "Healthcare & Well-being",
    short: "Health camps, preventive care, women's and child health, and well-being.",
    areas: [
      "Primary Healthcare & Health Camps",
      "Preventive Healthcare & Awareness",
      "Women's & Child Health",
      "HPV & Cervical Cancer Awareness",
      "Mental Health & Well-being",
      "Medical & Critical Care Assistance",
      "Sanitation & Menstrual Health",
      "Other Healthcare Initiatives",
    ],
  },
  {
    name: "Women & Youth Empowerment",
    short: "Leadership, inclusion, life skills and financial and digital empowerment.",
    areas: [
      "Women's Empowerment & Leadership",
      "Youth Development & Leadership",
      "Gender Equality & Social Inclusion",
      "Women & Child Rights Awareness",
      "Financial & Digital Empowerment",
      "Life Skills & Personal Development",
      "Self-Help Groups & Community Participation",
      "Other Empowerment Initiatives",
    ],
  },
  {
    name: "Skills & Livelihoods",
    short: "Vocational training, employability, entrepreneurship and income generation.",
    areas: [
      "Vocational & Technical Training",
      "Digital & Computer Skills",
      "Employment & Placement Support",
      "Career Readiness & Job Skills",
      "Entrepreneurship & Start-up Support",
      "Self-Employment & Income Generation",
      "Rural & Women-Led Enterprises",
      "Financial Literacy & Business Development",
      "Other Skills & Livelihood Initiatives",
    ],
  },
  {
    name: "Social Justice & Legal Empowerment",
    short: "Legal literacy, access to justice, rights awareness and safeguarding.",
    areas: [
      "Legal Literacy & Rights Awareness",
      "Access to Justice & Legal Assistance",
      "Women's & Children's Rights",
      "Child Protection & Safeguarding",
      "Rights of Vulnerable Communities",
      "Government Welfare Scheme Awareness",
      "Other Social Justice Initiatives",
    ],
  },
  {
    name: "Agriculture & Rural Livelihoods",
    short: "Sustainable farming, farmer training, livestock and conservation.",
    areas: [
      "Sustainable Agriculture & Farming",
      "Farmer Training & Capacity Building",
      "Organic & Natural Farming Awareness",
      "Livestock, Dairy & Fisheries",
      "Water & Soil Conservation",
      "Other Agriculture & Rural Initiatives",
    ],
  },
  {
    name: "Environment & Sustainable Development",
    short: "Tree plantation, climate awareness, clean and green communities.",
    areas: [
      "Tree Plantation & Biodiversity",
      "Climate Change Awareness",
      "Environmental Education & Awareness",
      "Sustainable Agriculture & Natural Resources",
      "Community Cleanliness & Green Spaces",
      "Other Environmental Initiatives",
    ],
  },
  {
    name: "Humanitarian Relief & Rehabilitation",
    short: "Emergency and disaster relief, shelter, child support and recovery.",
    areas: [
      "Emergency Relief & Essential Supplies",
      "Flood & Disaster Relief",
      "Emergency Medical Assistance",
      "Shelter & Necessities",
      "Orphan & Child Support",
      "Livelihood Restoration",
      "Other Humanitarian Initiatives",
    ],
  },
  {
    name: OTHER_SECTOR_NAME,
    short: "Integrated and cross-cutting community development.",
    areas: [
      "Multiple Core Areas",
      "Community Development",
      "Integrated Rural Development",
      OTHER_AREA,
    ],
  },
];

/** Approved programme list per sector (Sponsor a Programme). */
export const SECTOR_PROGRAMMES: Record<string, string[]> = {
  "Education & Learning": [
    "Primary School (EPS)",
    "School Kit & Learning Support (SKLS)",
    "Community Learning Centre (CLC)",
    "Academic Pathways & Talent Development (APTD)",
    "Scholarships for Higher Education (SHE)",
    "Career Guidance & Mentorship (CGM)",
    "Technical & Vocational Education and Training (TVET)",
    "Knowledge, Research & Publishing (KRP)",
  ],
  "Healthcare & Well-being": [
    "Critical Life & Emergency Support (CLES)",
    "Rural Ambulance & Emergency Response (RAER)",
    "Medical Assistance for Poor Patients (MAP)",
    "Community Health Check-up Camps (CHC)",
    "Diabetes Prevention & Lifestyle Awareness (DPLA)",
    "Menstrual Health & Hygiene Support (MHHS)",
    "Cervical Cancer Prevention & Awareness (CCPA)",
    "Rural Healthcare & Wellness Centres (RHWC)",
  ],
  "Women & Youth Empowerment": [
    "Women Skill Development & Livelihood Programme",
    "Self-Help Group Capacity Building Initiative",
    "Women's Rights & Gender Equality Awareness",
    "Youth Career & Entrepreneurship Development",
  ],
  "Skills & Livelihoods": [
    "Skills & Employability Programme",
    "Livelihood Development Initiative",
    "Rural Entrepreneurship Initiative",
    "Micro-Enterprise & Self-Employment Support",
  ],
  "Social Justice & Legal Empowerment": [
    "Legal Literacy & Rights Awareness Programme (LRA)",
    "Social Justice Legal Action (SJLA)",
    "Public Interest & Strategic Litigation (PISL)",
    "Grievance & Accountability Initiative (GA)",
  ],
  "Agriculture & Rural Livelihoods": [
    "Sustainable Agriculture Development Programme (SAD)",
    "Farmer Awareness & Training Initiative (FAT)",
    "Organic Farming & Natural Agriculture Promotion (ONA)",
    "Farmer Livelihood & Income Enhancement Initiative (FLI)",
  ],
  "Environment & Sustainable Development": [
    "Environmental Awareness Programme (EAP)",
    "Green Village & Clean Community Initiative (GCC)",
    "Tree Plantation & Community Greening Programme (TPCG)",
    "Sustainable Rural Development Programme (SRD)",
  ],
  "Humanitarian Relief & Rehabilitation": [
    "Emergency Relief & Disaster Response Programme (EDR)",
    "Shelter, Clothing & Necessities Support (SCN)",
    "Seasonal & Disaster-Specific Relief Support (SDSR)",
    "Livelihood Recovery & Rehabilitation Support (LRR)",
  ],
};

export const GENERAL_PROGRAMME_OPTIONS = [
  "Multiple Programmes",
  "General Support Across ISLAH's Programmes",
  "I Would Like ISLAH to Recommend a Suitable Initiative",
];

/** Standard service locations offered for on-site / field roles. */
export const SERVICE_LOCATIONS = ["Darbhanga", "Patna", "New Delhi", "Meerut", "Other location"];
