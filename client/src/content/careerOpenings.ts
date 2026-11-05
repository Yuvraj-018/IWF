/**
 * Current openings shown on /careers.
 *
 * To publish a role, add an entry below. To withdraw one, delete it — roles whose
 * `lastDate` has passed are hidden automatically. Keep `id` unique and URL-safe.
 */

export type EmploymentType = "Full-Time" | "Part-Time" | "Contract" | "Internship";
export type ExperienceBand = "Fresher / Intern" | "1–2 Years" | "2–5 Years" | "5+ Years";
export type OpeningIcon = "programme" | "field" | "data" | "health" | "communication" | "intern";

export interface CareerOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: EmploymentType;
  experience: string;
  experienceBand: ExperienceBand;
  /** ISO date (YYYY-MM-DD); the role is hidden after this date. */
  lastDate: string;
  reportsTo: string;
  icon: OpeningIcon;
  summary: string;
  responsibilities: string[];
  eligibility: string[];
}

export const CAREER_OPENINGS: CareerOpening[] = [
  {
    id: "programme-coordinator-education",
    title: "Programme Coordinator — Education",
    department: "Programmes",
    location: "Darbhanga, Bihar",
    type: "Full-Time",
    experience: "2–5 Years",
    experienceBand: "2–5 Years",
    lastDate: "2026-12-15",
    reportsTo: "Programme Manager",
    icon: "programme",
    summary:
      "Plan, execute and coordinate education programmes including Community Learning Centres and scholarship support across assigned blocks.",
    responsibilities: [
      "Plan, implement and monitor education programmes in assigned areas",
      "Coordinate with field teams, schools, partners and community stakeholders",
      "Prepare monthly progress reports and programme documentation",
      "Ensure effective and accountable utilisation of programme resources",
    ],
    eligibility: [
      "Graduate / Postgraduate in Social Work, Education, Rural Development or a related field",
      "2–5 years of relevant experience in programme implementation",
      "Strong communication and coordination skills; fluency in Hindi",
    ],
  },
  {
    id: "field-officer-community-health",
    title: "Field Officer — Community Health",
    department: "Field Operations",
    location: "Rural Darbhanga, Bihar",
    type: "Full-Time",
    experience: "1–2 Years",
    experienceBand: "1–2 Years",
    lastDate: "2026-12-05",
    reportsTo: "Programme Coordinator — Healthcare",
    icon: "health",
    summary:
      "Conduct field visits, organise health camps and build community relationships to ensure smooth delivery of healthcare programmes.",
    responsibilities: [
      "Organise community health check-up camps and awareness sessions",
      "Identify and follow up with beneficiaries needing medical assistance",
      "Maintain accurate field records and beneficiary data",
      "Build relationships with ASHA workers, PHCs and local leaders",
    ],
    eligibility: [
      "Graduate in Social Work, Public Health, Nursing or a related field",
      "1–2 years of field experience in community health preferred",
      "Willingness to travel extensively within rural areas",
    ],
  },
  {
    id: "mis-documentation-officer",
    title: "MIS & Documentation Officer",
    department: "Monitoring & Evaluation",
    location: "Remote",
    type: "Contract",
    experience: "2–5 Years",
    experienceBand: "2–5 Years",
    lastDate: "2026-11-30",
    reportsTo: "Monitoring & Evaluation Lead",
    icon: "data",
    summary:
      "Manage programme data, reporting and MIS systems to ensure accurate monitoring, documentation and impact reporting.",
    responsibilities: [
      "Maintain programme MIS, dashboards and beneficiary databases",
      "Compile monthly and quarterly reports for internal and partner use",
      "Support data quality checks and field data collection tools",
      "Document case studies and programme learnings",
    ],
    eligibility: [
      "Graduate in Statistics, Computer Applications, Social Sciences or a related field",
      "2+ years of experience with MIS, Excel / Google Sheets and reporting",
      "Familiarity with data-collection tools such as KoBo or ODK is an advantage",
    ],
  },
  {
    id: "programme-associate-women-youth",
    title: "Programme Associate — Women & Youth",
    department: "Programmes",
    location: "Patna, Bihar",
    type: "Full-Time",
    experience: "1–2 Years",
    experienceBand: "1–2 Years",
    lastDate: "2026-12-20",
    reportsTo: "Programme Coordinator",
    icon: "programme",
    summary:
      "Support skill development, self-help group strengthening and youth career initiatives for women and young people.",
    responsibilities: [
      "Facilitate SHG meetings, skill trainings and financial-literacy sessions",
      "Mobilise participants and coordinate with trainers and partners",
      "Track participant progress and maintain programme records",
    ],
    eligibility: [
      "Graduate in Social Work, Gender Studies, Development Studies or a related field",
      "1–2 years of experience with women or youth programmes",
      "Good facilitation skills in Hindi; Urdu or Maithili is an advantage",
    ],
  },
  {
    id: "communications-outreach-associate",
    title: "Communications & Outreach Associate",
    department: "Communications",
    location: "New Delhi (Hybrid)",
    type: "Full-Time",
    experience: "2–5 Years",
    experienceBand: "2–5 Years",
    lastDate: "2026-12-10",
    reportsTo: "Head of Communications",
    icon: "communication",
    summary:
      "Tell ISLAH's story across digital channels, reports and campaigns, and support supporter and partner outreach.",
    responsibilities: [
      "Create content for the website, social media, newsletters and reports",
      "Coordinate photo and video documentation with field teams",
      "Support campaigns, events and donor communications",
    ],
    eligibility: [
      "Graduate in Mass Communication, Journalism, English or a related field",
      "2+ years of experience in communications, preferably in the social sector",
      "Excellent writing skills in English and Hindi",
    ],
  },
  {
    id: "development-intern",
    title: "Development Sector Intern",
    department: "Programmes",
    location: "Darbhanga, Bihar / Remote",
    type: "Internship",
    experience: "Fresher",
    experienceBand: "Fresher / Intern",
    lastDate: "2027-01-15",
    reportsTo: "Programme Coordinator",
    icon: "intern",
    summary:
      "A 2–3 month internship for students and recent graduates to gain hands-on experience in grassroots development.",
    responsibilities: [
      "Assist field teams with surveys, documentation and community activities",
      "Support research, case studies and programme reporting",
      "Contribute to one focused project during the internship",
    ],
    eligibility: [
      "Students or recent graduates in Social Work, Development Studies or related fields",
      "Curiosity, commitment and willingness to work in rural settings",
    ],
  },
];

export const GENERAL_APPLICATION = "General Application (CV for future openings)";

/** Openings whose last date has not passed. */
export function activeOpenings(today = new Date()): CareerOpening[] {
  const t = new Date(today);
  t.setHours(0, 0, 0, 0);
  return CAREER_OPENINGS.filter((o) => new Date(`${o.lastDate}T23:59:59`) >= t);
}

export function formatLastDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
