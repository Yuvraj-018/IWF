import { Request, Response } from "express";
import { SiteSetting } from "../models/SiteSetting.js";

const DEFAULT_SETTINGS: Record<string, { category: "impact" | "contact" | "general"; data: Record<string, any> }> = {
  // ── 1. Top-Level Core Milestones (Outcomes, Annual Reports, Global) ──
  impact_stats: {
    category: "impact",
    data: {
      livesTouched: "50,000+",
      villagesReached: "300+",
      districtsCovered: "15+",
      ongoingPrograms: "25+",
      volunteersCount: "500+",
      partnersCount: "100+",
      yearsOfImpact: "10+",
      totalCumulativeImpact: "71,000+",
    },
  },

  // ── 2. Homepage Hero & Animated Live Counters ──
  homepage_stats: {
    category: "impact",
    data: {
      livesTouched: "5,000+",
      healthCamps: "100+",
      studentsSupported: "2,000+",
      villagesReached: "50+",
      activePrograms: "12",
      yearsOfService: "8",
      heroBeneficiaries: "10,000+",
    },
  },

  // ── 3. Get Involved Community Mini-Counters ──
  getinvolved_stats: {
    category: "impact",
    data: {
      lives: "25,000+",
      villages: "120+",
      students: "18,500+",
      volunteers: "5,800+",
    },
  },

  // ── 4. Featured Causes Progress & Donation Counters ──
  featured_causes_stats: {
    category: "impact",
    data: {
      eduRaised: "1,65,240",
      eduGoalPct: "75",
      medRaised: "2,12,880",
      medGoalPct: "48",
      womenRaised: "1,48,720",
      womenGoalPct: "60",
    },
  },

  // ── 5. Demographic Beneficiary Breakdown ──
  demographic_stats: {
    category: "impact",
    data: {
      childrenCount: "28,000+",
      womenCount: "21,000+",
      youthCount: "15,000+",
      seniorCitizensCount: "7,000+",
    },
  },

  // ── 6. Sector-Wise Key Achievements (All 7 Pillars) ──
  sector_stats: {
    category: "impact",
    data: {
      educationChildren: "8,000+",
      educationSchools: "120+",
      enrollmentRate: "95%",
      healthPeople: "6,000+",
      healthCamps: "85+",
      womenEmpowered: "4,000+",
      selfHelpGroups: "200+",
      youthTrained: "3,500+",
      youthPlacedRate: "70%",
      treesPlanted: "15,000+",
      farmersSupported: "2,500+",
      waterProjects: "50+",
      reliefFamilies: "12,000+",
      reliefDrives: "30+",
      foodRationKits: "45,000+",
      cleanWaterPoints: "80+",
      householdToilets: "250+",
      cleanWaterPeople: "15,000+",
    },
  },

  // ── 7. Official Helplines & Headquarters ──
  contact_info: {
    category: "contact",
    data: {
      primaryPhone: "+91 94314 00000",
      helplinePhone: "+91 94314 11111",
      whatsappNumber: "+91 94314 00000",
      primaryEmail: "info@iwfindia.org",
      emergencyEmail: "emergency@iwfindia.org",
      darbhangaOffice: "Islah Welfare Foundation, Near Tower Chowk, Darbhanga, Bihar - 846004",
      delhiOffice: "New Delhi Liaison Office, India",
    },
  },

  // ── 8. Official Social Media Profiles & WhatsApp Direct ──
  social_links: {
    category: "general",
    data: {
      facebook: "https://www.facebook.com/islahindia/",
      twitter: "https://x.com/islahindia/",
      instagram: "https://www.instagram.com/islahindia/",
      linkedin: "https://www.linkedin.com/in/islahindia/",
      youtube: "https://www.youtube.com/channel/UC5sty9L25QQwC89JwGmEIVw/",
      whatsapp: "https://wa.me/919811861633",
    },
  },

  // ── 9. Statutory Reports & Public Compliance Documents ──
  statutory_reports: {
    category: "general",
    data: {
      reports: [
        { id: "rep-1", title: "Annual Report", year: "2023-24", status: "Available", fileUrl: "/policies", fileSize: "2.4 MB" },
        { id: "rep-2", title: "Audited Financial Statements", year: "2023-24", status: "Available", fileUrl: "/policies", fileSize: "1.8 MB" },
        { id: "rep-3", title: "Income & Expenditure Statement", year: "2023-24", status: "Available", fileUrl: "/policies", fileSize: "950 KB" },
        { id: "rep-4", title: "Balance Sheet", year: "2023-24", status: "Available", fileUrl: "/policies", fileSize: "1.2 MB" },
        { id: "rep-5", title: "Audit Report", year: "2023-24", status: "Available", fileUrl: "/policies", fileSize: "3.1 MB" },
        { id: "rep-6", title: "12A/80G Order", year: "2021-22", status: "Available", fileUrl: "/policies", fileSize: "680 KB" },
      ],
    },
  },

  // ── 10. Leadership, Governance & Advisory Board ──
  leadership_data: {
    category: "general",
    data: {
      trustees: [
        { id: "lead-t1", sno: 1, name: "Er. Nasera Firdausi", designation: "Acting Chairman", portfolio: "Governance Stewardship & Strategic Direction", email: "chairman@iwfindia.org", badgeColor: "bg-emerald-600", gender: "female" },
        { id: "lead-t2", sno: 2, name: "Er. Md. Ejazullah", designation: "Secretary", portfolio: "Statutory Governance & Board Administration", email: "secretary@iwfindia.org", badgeColor: "bg-blue-600", gender: "male" },
        { id: "lead-t3", sno: 3, name: "Md. Sajid", designation: "Joint Secretary", portfolio: "Operational Alignment & Inter-Body Coordination", email: "jointsec@iwfindia.org", badgeColor: "bg-indigo-600", gender: "male" },
        { id: "lead-t4", sno: 4, name: "Mr. Md. Azizullah", designation: "Treasurer", portfolio: "Financial Oversight & Fiduciary Compliance", email: "treasurer@iwfindia.org", badgeColor: "bg-amber-600", gender: "male" },
        { id: "lead-t5", sno: 5, name: "CA Sanjeet", designation: "Member", portfolio: "Financial Audits, Accounts Review & Fiscal Policy", email: "trustee@iwfindia.org", badgeColor: "bg-slate-700", gender: "male" },
        { id: "lead-t6", sno: 6, name: "Md. Atiqure Rahman", designation: "Member", portfolio: "Community Outreach & Programmatic Review", email: "trustee@iwfindia.org", badgeColor: "bg-slate-700", gender: "male" },
        { id: "lead-t7", sno: 7, name: "Saleh Hedayatullah", designation: "Member", portfolio: "Institutional Partnerships & Social Initiatives", email: "trustee@iwfindia.org", badgeColor: "bg-slate-700", gender: "male" },
      ],
      executive: [
        { id: "lead-e1", sno: 1, name: "Er. Nasera Firdausi", designation: "Acting Chairman", portfolio: "Executive Leadership, Strategic Operations & Institutional Management", email: "chairman@iwfindia.org", gender: "female" },
        { id: "lead-e2", sno: 2, name: "Md. Shahid Raza", designation: "Program Manager", portfolio: "Project Planning, Field Coordination & Ground Operations", email: "programs@iwfindia.org", gender: "male" },
        { id: "lead-e3", sno: 3, name: "Ms. Farifa Khatoon", designation: "Admin Coordinator", portfolio: "Administrative Systems, Personnel Logistics & Facility Oversight", email: "admin@iwfindia.org", gender: "female" },
        { id: "lead-e4", sno: 4, name: "Mr. Arun Kumar Jha", designation: "Communications Coordinator", portfolio: "Institutional Communications, Media Relations & Public Affairs", email: "communications@iwfindia.org", gender: "male" },
        { id: "lead-e5", sno: 5, name: "Adv. Kanhaiya Mishra", designation: "Legal & Compliance Coordinator", portfolio: "Statutory Adherence, Legal Documentation & Regulatory Compliance", email: "legal@iwfindia.org", gender: "male" },
        { id: "lead-e6", sno: 6, name: "Mr. Rakesh Ranjan", designation: "Finance Officer", portfolio: "Financial Reporting, Budget Administration & Audit Facilitation", email: "finance@iwfindia.org", gender: "male" },
      ],
      advisory: [
        { id: "lead-a1", sno: 1, name: "Prof. (Dr.) Karan Singh", expertise: "Academic Advisor", focus: "Higher Education, Pedagogical Frameworks & Academic Linkages", gender: "male" },
        { id: "lead-a2", sno: 2, name: "Prof. (Dr.) Tayyab Khan", expertise: "Technical Advisor", focus: "Technical Infrastructure, Digital Systems & Scalable Solutions", gender: "male" },
        { id: "lead-a3", sno: 3, name: "Prof. (Dr.) Md. Arquam", expertise: "Social Inclusion Advisor", focus: "Marginalized Rights, Equitable Access & Community Inclusivity", gender: "male" },
        { id: "lead-a4", sno: 4, name: "Dr. Intiyaz Ahmad", expertise: "Program & Policy Advisor", focus: "Policy Research, Evidence-Based Design & Program Governance", gender: "male" },
        { id: "lead-a5", sno: 5, name: "CS. Satish Kumar", expertise: "Finance Advisor", focus: "Corporate Governance, Statutory Compliance & Fiscal Oversight", gender: "male" },
        { id: "lead-a6", sno: 6, name: "Adv. Pankaj Kumar", expertise: "Legal Advisor", focus: "Statutory Law, Legal Safeguards & Trust Regulations", gender: "male" },
      ],
      field: [
        { id: "lead-f1", sno: 1, name: "Mr. Mohammad Rashid", designation: "Field Coordinator", focus: "Community Mobilization & Field Operations", gender: "male" },
        { id: "lead-f2", sno: 2, name: "Mr. Rakesh Kumar", designation: "Field Coordinator", focus: "Programme Delivery & Direct Community Outreach", gender: "male" },
        { id: "lead-f3", sno: 3, name: "Ms. Saksi Kumari", designation: "Field Coordinator", focus: "Women & Child Community Mobilization", gender: "female" },
        { id: "lead-f4", sno: 4, name: "Mr. Ravi Paswan", designation: "Field Documentation", focus: "Field Monitoring, Beneficiary Records & Documentation", gender: "male" },
        { id: "lead-f5", sno: 5, name: "Ms. Samia Khatoon", designation: "Community Volunteers", focus: "Volunteer Coordination & Community Support", gender: "female" },
        { id: "lead-f6", sno: 6, name: "Mr. Tarique Anwar", designation: "Field Coordinator", focus: "Healthcare Mobilization & Patient Care", gender: "male" },
      ],
    },
  },

  // ── 11. Community Directory Spotlight & Public Consent ──
  community_directory: {
    category: "general",
    data: {
      stats: {
        membersCount: "120+",
        donorsCount: "80+",
        partnersCount: "40+",
        volunteersCount: "25+",
        chaptersCount: "12 Districts",
      },
      spotlight: [
        { id: "dir-1", name: "Ayesha Khan", role: "Individual Member", type: "member", location: "Darbhanga, Bihar", category: "Blue", bio: "Educator & Social Worker", isPublicConsent: true },
        { id: "dir-2", name: "Rahul Sharma", role: "Individual Donor", type: "donor", location: "New Delhi, Delhi", category: "Gold", bio: "Healthcare & Rural Development", isPublicConsent: true },
        { id: "dir-3", name: "Tata Consultancy Services", role: "Corporate Partner", type: "partner", location: "Pan India", category: "Corporate Partner", bio: "Technology & Digital Skills", isPublicConsent: true },
        { id: "dir-4", name: "Neha Verma", role: "Education Volunteer", type: "volunteer", location: "Lucknow, Uttar Pradesh", category: "Youth Volunteer", bio: "Digital Literacy & Tech", isPublicConsent: true },
        { id: "dir-5", name: "Dr. Tariq Anwar", role: "Executive Member", type: "member", location: "Darbhanga, Bihar", category: "Yellow", bio: "Medical Consultant", isPublicConsent: true },
        { id: "dir-6", name: "Reliance Foundation", role: "Development Partner", type: "partner", location: "Maharashtra / Bihar", category: "Development Partner", bio: "Healthcare & Rural Development", isPublicConsent: true },
        { id: "dir-7", name: "Azim Premji Philanthropy", role: "Platinum Foundation Donor", type: "donor", location: "Pan India", category: "Platinum", bio: "Primary Education & Grassroots Health", isPublicConsent: true },
        { id: "dir-8", name: "Dr. Ayesha Rahman", role: "Education Mentor", type: "mentor", location: "Delhi NCR", category: "Mentor", bio: "Education & Career Guidance", isPublicConsent: true },
      ],
      members: [
        { id: "ISLAH-MB-0012", name: "Ayesha Khan", category: "Blue", type: "Community Member", district: "Darbhanga", state: "Bihar", status: "Active", joinDate: "12 Jan 2024", validTill: "11 Jan 2027", profession: "Educator & Social Worker" },
        { id: "ISLAH-MY-0034", name: "Rahul Sharma", category: "Yellow", type: "Contributing Member", district: "New Delhi", state: "Delhi NCR", status: "Active", joinDate: "05 Mar 2023", validTill: "04 Mar 2026", profession: "IT Project Lead" },
        { id: "ISLAH-MG-0056", name: "Neha Verma", category: "Green", type: "Patron Member", district: "Lucknow", state: "Uttar Pradesh", status: "Active", joinDate: "18 Aug 2022", validTill: "17 Aug 2027", profession: "Advocate & Legal Advisor" },
        { id: "ISLAH-MB-0078", name: "Imran Ansari", category: "Blue", type: "Community Member", district: "Patna", state: "Bihar", status: "Active", joinDate: "09 Feb 2024", validTill: "08 Feb 2026", profession: "Grassroots Organizer" },
        { id: "ISLAH-MY-0091", name: "Sneha Gupta", category: "Yellow", type: "Contributing Member", district: "Gurugram", state: "Haryana", status: "Active", joinDate: "21 Jun 2023", validTill: "20 Jun 2026", profession: "Financial Analyst" },
        { id: "ISLAH-MG-0110", name: "Md. Saifullah", category: "Green", type: "Patron Member", district: "Azamgarh", state: "Uttar Pradesh", status: "Active", joinDate: "14 Nov 2022", validTill: "13 Nov 2027", profession: "Senior Entrepreneur" },
        { id: "ISLAH-MB-0127", name: "Pooja Singh", category: "Blue", type: "Community Member", district: "Saran", state: "Bihar", status: "Active", joinDate: "02 Apr 2024", validTill: "01 Apr 2026", profession: "Healthcare Worker" },
        { id: "ISLAH-MY-0154", name: "Rakesh Yadav", category: "Yellow", type: "Contributing Member", district: "Meerut", state: "Uttar Pradesh", status: "Expired", joinDate: "10 Oct 2022", validTill: "09 Oct 2024", profession: "Agriculture Consultant" },
        { id: "ISLAH-MG-0178", name: "Fatima Bano", category: "Green", type: "Patron Member", district: "Patna", state: "Bihar", status: "Active", joinDate: "15 Jan 2023", validTill: "14 Jan 2028", profession: "Women SHG Lead" },
        { id: "ISLAH-MO-0205", name: "Dr. Tariq Anwar", category: "Orange", type: "Executive Member", district: "Darbhanga", state: "Bihar", status: "Active", joinDate: "01 Jan 2021", validTill: "31 Dec 2026", profession: "Medical Consultant" },
        { id: "ISLAH-MB-0219", name: "Zainab Siddiqui", category: "Blue", type: "Community Member", district: "New Delhi", state: "Delhi NCR", status: "Active", joinDate: "28 Oct 2024", validTill: "27 Oct 2027", profession: "Youth Mentor" },
        { id: "ISLAH-MY-0242", name: "Amitabh Sen", category: "Yellow", type: "Contributing Member", district: "Kolkata", state: "West Bengal", status: "Active", joinDate: "11 May 2023", validTill: "10 May 2026", profession: "Public Policy Specialist" },
      ],
      donors: [
        { id: "DNR-001", name: "Tata Consultancy Services", tier: "Platinum", type: "Corporate Donor", causes: ["Education", "Digital Learning"], sinceYear: 2021, location: "Pan India", amountLabel: "₹50,000+ Tier", description: "Multi-year backing for smart computer laboratories and digital literacy.", logoText: "TCS" },
        { id: "DNR-002", name: "Reliance Foundation", tier: "Gold", type: "Corporate Donor", causes: ["Healthcare", "Rural Development"], sinceYear: 2020, location: "Maharashtra / Bihar", amountLabel: "₹20,000 – ₹49,999 Tier", description: "Supporting community healthcare camps, mobile diagnostic clinics, and seasonal relief camps.", logoText: "RF" },
        { id: "DNR-003", name: "HDFC Bank", tier: "Silver", type: "Corporate Donor", causes: ["Livelihoods", "Financial Inclusion"], sinceYear: 2019, location: "Pan India", amountLabel: "₹5,000 – ₹19,999 Tier", description: "Grant assistance for micro-enterprise incubation and self-help group financial literacy.", logoText: "HDFC" },
        { id: "DNR-004", name: "State Bank of India", tier: "Recognised", type: "Corporate Donor", causes: ["Education", "Skill Development"], sinceYear: 2018, location: "Pan India", amountLabel: "Recognised Contributor", description: "Vocational skill kits and student scholarship stipends for deserving candidates.", logoText: "SBI" },
        { id: "DNR-005", name: "ITC Limited", tier: "Gold", type: "Corporate Donor", causes: ["Health", "Community Development"], sinceYear: 2017, location: "West Bengal / Bihar", amountLabel: "₹20,000 – ₹49,999 Tier", description: "Partnership supporting clean drinking water filtration and sanitation awareness.", logoText: "ITC" },
        { id: "DNR-006", name: "Cipla Foundation", tier: "Silver", type: "Corporate Donor", causes: ["Healthcare", "Nutrition"], sinceYear: 2016, location: "Maharashtra", amountLabel: "₹5,000 – ₹19,999 Tier", description: "Essential life support medicines, diabetes screening packages, and maternal nutritional kits.", logoText: "Cipla" },
        { id: "DNR-007", name: "Ayesha Khan", tier: "Individual", type: "Individual Donor", causes: ["Education", "Women Empowerment"], sinceYear: 2023, location: "Darbhanga, Bihar", amountLabel: "Individual Patron", description: "Recurring donor sponsoring higher secondary tuition and study materials.", logoText: "AK" },
        { id: "DNR-008", name: "Faisal Ahmed", tier: "Individual", type: "Individual Donor", causes: ["Skills", "Youth Development"], sinceYear: 2022, location: "New Delhi", amountLabel: "Individual Patron", description: "Donations directed toward student career coaching, laptop distributions, and exam fees.", logoText: "FA" },
        { id: "DNR-009", name: "Azim Premji Philanthropic Initiatives", tier: "Platinum", type: "Foundation Partner", causes: ["Primary Education", "Grassroots Health"], sinceYear: 2022, location: "Pan India", amountLabel: "₹50,000+ Tier", description: "Comprehensive institutional support for teacher enablement and foundational literacy centres.", logoText: "APPI" },
      ],
      partners: [
        { id: "PTR-001", name: "Tata Consultancy Services", category: "Strategic Partner", focusArea: "Technology & Digital Skills", location: "Pan India", sinceYear: 2021, description: "Co-creating rural digital learning hubs and providing cloud-based curriculum modules.", badge: "TCS" },
        { id: "PTR-002", name: "HDFC Bank", category: "Financial Partner", focusArea: "Financial Inclusion & Livelihoods", location: "Pan India", sinceYear: 2019, description: "Empowering rural women self-help groups with zero-cost accounts and basic entrepreneurship loans.", badge: "HDFC" },
        { id: "PTR-003", name: "Reliance Foundation", category: "Development Partner", focusArea: "Healthcare & Rural Development", location: "Maharashtra / Bihar", sinceYear: 2020, description: "Providing mobile medical screening vans, medical supplies, and maternal health monitoring camps.", badge: "RF" },
        { id: "PTR-004", name: "ITC Limited", category: "Corporate Partner", focusArea: "Health | Community Development", location: "Pan India", sinceYear: 2017, description: "Promoting green community sanitation drives, clean water access, and agro-forestry livelihoods.", badge: "ITC" },
        { id: "PTR-005", name: "Cipla Foundation", category: "Healthcare Partner", focusArea: "Healthcare & Nutrition", location: "Maharashtra", sinceYear: 2016, description: "Providing critical healthcare aid for patients facing catastrophic chronic illnesses and cancer care.", badge: "Cipla" },
        { id: "PTR-006", name: "State Bank of India", category: "Financial Partner", focusArea: "Education & Skill Development", location: "Pan India", sinceYear: 2018, description: "Skill certification sponsorship and youth entrepreneurship mentoring in northern Bihar.", badge: "SBI" },
        { id: "PTR-007", name: "Microsoft India", category: "Technology Partner", focusArea: "Digital Education & Innovation", location: "Pan India", sinceYear: 2022, description: "Providing software toolkits, AI fundamentals training, and digital classrooms for rural colleges.", badge: "MSFT" },
        { id: "PTR-008", name: "Infosys Foundation", category: "CSR Partner", focusArea: "Education & Livelihoods", location: "Karnataka / Bihar", sinceYear: 2021, description: "Supplying libraries with STEM textbooks, science lab apparatus, and student mentor programs.", badge: "INF" },
        { id: "PTR-009", name: "Tata Steel Foundation", category: "Development Partner", focusArea: "Skills & Livelihoods", location: "Jharkhand", sinceYear: 2020, description: "Grassroots artisan training, traditional handloom promotion, and rural market linkages.", badge: "TSF" },
      ],
      volunteers: [
        { id: "VOL-001", name: "Dr. Ayesha Rahman", role: "Mentor", title: "Education Mentor", domain: "Education & Career Guidance", location: "Delhi NCR", bio: "Assistant Professor with 10+ years mentoring first-generation college aspirants.", initials: "AR" },
        { id: "VOL-002", name: "Rahul Verma", role: "Volunteer", title: "Digital Skills Volunteer", domain: "Digital Literacy & Tech", location: "Delhi NCR", bio: "Software developer conducting weekly online coding workshops and computer literacy drills.", initials: "RV" },
        { id: "VOL-003", name: "Meera Singh", role: "Mentor", title: "Healthcare Awareness Mentor", domain: "Healthcare Awareness", location: "Uttar Pradesh", bio: "Public health specialist running community sessions on nutrition, wellness, and hygiene.", initials: "MS" },
        { id: "VOL-004", name: "Arif Khan", role: "Volunteer", title: "Career & Employability Mentor", domain: "Skills & Livelihoods", location: "Bihar", bio: "HR professional organizing mock interviews, resume writing labs, and coaching.", initials: "AK" },
        { id: "VOL-005", name: "Neha Sharma", role: "Volunteer", title: "Women's Empowerment Volunteer", domain: "Women Empowerment", location: "Delhi NCR", bio: "Community activist assisting rural women collectives in self-defense and rights awareness.", initials: "NS" },
        { id: "VOL-006", name: "Vikram Das", role: "Volunteer", title: "Agriculture & Rural Livelihoods", domain: "Agriculture & Rural", location: "Darbhanga, Bihar", bio: "Agronomist helping local farmers adopt organic compost, water-efficient drip systems, and crop rotation.", initials: "VD" },
        { id: "VOL-007", name: "Sana Parveen", role: "Mentor", title: "Legal Literacy Volunteer", domain: "Legal Rights", location: "Patna, Bihar", bio: "High Court advocate educating rural families on consumer rights and RTI.", initials: "SP" },
        { id: "VOL-008", name: "Karan Mehta", role: "Mentor", title: "Research & Knowledge Mentor", domain: "Education & Career Guidance", location: "Remote / Online", bio: "Policy researcher assisting ISLAH with grassroots demographic surveys and impact reports.", initials: "KM" },
        { id: "VOL-009", name: "Pooja Yadav", role: "Volunteer", title: "Youth Leadership Mentor", domain: "Skills & Livelihoods", location: "Meerut, UP", bio: "Youth worker guiding adolescent clubs, sports events, and volunteer disaster readiness.", initials: "PY" },
      ],
    },
  },

  // ── 12. Media Hub Reach Metrics (/media page) ──
  media_hub_stats: {
    category: "impact",
    data: {
      fieldEvents: "120+",
      newsBulletins: "250+",
      livesReached: "50,000+",
      publications: "18+",
      visualStories: "500+",
    },
  },

  // ── 13. Visual Archive & Gallery Ribbon Stats (/media/gallery) ──
  gallery_stats: {
    category: "impact",
    data: {
      fieldPhotos: "500+",
      videoStories: "35+",
      districtsCovered: "15+",
      realImpact: "100%",
    },
  },

  // ── 13. Outcomes & Impact Deep Analytics (/media/outcomes) ──
  outcomes_settings: {
    category: "impact",
    data: {
      totalCumulativeImpact: "71,000+",
      growthNote: "Consistent growth, deeper reach, greater impact. Every year, we reach more lives and build stronger communities.",
      beneficiaryQuote: "These numbers are not just statistics; they represent real people, real stories, and real change. Together, we can create an even greater impact in the years to come.",
      quoteText: "The change we see today is the result of collective effort, commitment, and compassion. Together, we are creating stronger, healthier, and self-reliant communities.",
      quoteAuthor: "Islah Welfare Foundation",
      reach: {
        villages: "300+",
        districts: "15+",
        states: "5 States",
        stateList: [
          "Bihar (Darbhanga, Madhubani, Samastipur)",
          "Delhi NCR",
          "Uttar Pradesh",
          "Jharkhand",
          "West Bengal",
        ],
      },
      growthHistory: [
        { year: "2016-17", value: "8K", num: 8, heightPct: 18 },
        { year: "2017-18", value: "12K", num: 12, heightPct: 26 },
        { year: "2018-19", value: "16K", num: 16, heightPct: 34 },
        { year: "2019-20", value: "26K", num: 26, heightPct: 48 },
        { year: "2020-21", value: "34K", num: 34, heightPct: 60 },
        { year: "2021-22", value: "42K", num: 42, heightPct: 70 },
        { year: "2022-23", value: "55K", num: 55, heightPct: 84 },
        { year: "2023-24", value: "71K", num: 71, heightPct: 100 },
      ],
      themes: [
        { name: "Education & Child Development", count: "8,000+", percentage: 16, color: "#2563eb" },
        { name: "Healthcare & Wellness", count: "6,000+", percentage: 12, color: "#059669" },
        { name: "Livelihood & Skill Development", count: "5,500+", percentage: 11, color: "#d97706" },
        { name: "Women Empowerment", count: "4,000+", percentage: 8, color: "#db2777" },
        { name: "Agriculture & Livelihood", count: "2,500+", percentage: 5, color: "#16a34a" },
        { name: "Environment & Sustainability", count: "15,000+", percentage: 30, color: "#0d9488" },
        { name: "Community Development", count: "35,000+", percentage: 18, color: "#7c3aed" },
      ],
      keyAreas: [
        {
          title: "Education & Child Development",
          achievements: [
            "8,000+ Children Supported with Education",
            "120+ Schools & Learning Centres Strengthened",
            "95% School Enrollment Rate in Supported Villages",
          ],
        },
        {
          title: "Healthcare & Wellness",
          achievements: [
            "6,000+ People Provided Healthcare Support",
            "85+ Health Camps Conducted",
            "Improved Health Awareness in 300+ Villages",
          ],
        },
        {
          title: "Women Empowerment",
          achievements: [
            "4,000+ Women Empowered",
            "200+ Self Help Groups Supported",
            "Increased Financial Independence",
          ],
        },
        {
          title: "Skill Development & Livelihood",
          achievements: [
            "3,500+ Youth Trained in Skills",
            "70% Trained Youth Placed/Self-Employed",
            "Better Income Opportunities Created",
          ],
        },
        {
          title: "Agriculture & Livelihood",
          achievements: [
            "2,500+ Farmers Supported",
            "150+ Trainings on Sustainable Farming",
            "Increased Productivity & Income",
          ],
        },
        {
          title: "Environment Conservation",
          achievements: [
            "15,000+ Trees Planted",
            "50+ Water Conservation Projects",
            "Cleaner, Greener Communities",
          ],
        },
        {
          title: "Community Development",
          achievements: [
            "35+ Community Centres Built/Supported",
            "Improved Access to Basic Facilities",
            "Stronger, United Communities",
          ],
        },
      ],
    },
  },

  // ── 15. Annual Reports & Document Archive (/media/annual-reports) ──
  annual_reports_data: {
    category: "general",
    data: {
      statsRibbon: {
        livesImpacted: "50,000+",
        villagesCovered: "300+",
        ongoingPrograms: "25+",
        partnersSupporters: "100+",
        yearsOfImpact: "10+",
      },
      sidebar: {
        highlightsTitle: "REPORT HIGHLIGHTS",
        highlights: [
          { title: "Program Overview", desc: "Key achievements and milestones" },
          { title: "Impact Stories", desc: "Real stories of change from our communities" },
          { title: "Financial Overview", desc: "Transparent use of resources and financial statements" },
          { title: "Future Roadmap", desc: "Our vision and plan for greater impact" },
        ],
        aboutTitle: "ABOUT OUR REPORTS",
        aboutText:
          "Our Annual Reports provide a comprehensive overview of our programs, achievements, challenges, and financial performance. They reflect our commitment to transparency, good governance, and accountability to our donors, partners, and communities.",
      },
      reports: [
        {
          id: "ar-2023-24",
          year: "2023-24",
          title: "Annual Report 2023-24",
          summary: "A year of growth, impact, and community transformation.",
          cover: "",
          fileSize: "6.5 MB",
          pdfUrl: "/docs/islah_report.pdf",
        },
        {
          id: "ar-2022-23",
          year: "2022-23",
          title: "Annual Report 2022-23",
          summary: "Strengthening communities and creating sustainable opportunities.",
          cover: "",
          fileSize: "5.8 MB",
          pdfUrl: "/docs/islah_report.pdf",
        },
        {
          id: "ar-2021-22",
          year: "2021-22",
          title: "Annual Report 2021-22",
          summary: "Empowering lives through inclusive and sustainable development.",
          cover: "",
          fileSize: "5.2 MB",
          pdfUrl: "/docs/islah_report.pdf",
        },
        {
          id: "ar-2020-21",
          year: "2020-21",
          title: "Annual Report 2020-21",
          summary: "Working together for stronger, healthier, and self-reliant communities.",
          cover: "",
          fileSize: "4.9 MB",
          pdfUrl: "/docs/islah_report.pdf",
        },
        {
          id: "ar-2019-20",
          year: "2019-20",
          title: "Annual Report 2019-20",
          summary: "Expanding reach. Enriching lives. Building a better tomorrow.",
          cover: "",
          fileSize: "4.4 MB",
          pdfUrl: "/docs/islah_report.pdf",
        },
        {
          id: "ar-2018-19",
          year: "2018-19",
          title: "Annual Report 2018-19",
          summary: "Promoting health, education, and livelihoods in rural communities.",
          cover: "",
          fileSize: "4.1 MB",
          pdfUrl: "/docs/islah_report.pdf",
        },
        {
          id: "ar-2017-18",
          year: "2017-18",
          title: "Annual Report 2017-18",
          summary: "Small steps, big impact towards sustainable development.",
          cover: "",
          fileSize: "3.7 MB",
          pdfUrl: "/docs/islah_report.pdf",
        },
        {
          id: "ar-2016-17",
          year: "2016-17",
          title: "Annual Report 2016-17",
          summary: "Laying the foundation for empowered and resilient communities.",
          cover: "",
          fileSize: "3.2 MB",
          pdfUrl: "/docs/islah_report.pdf",
        },
      ],
    },
  },
};

export async function getSettings(req: Request, res: Response): Promise<void> {
  try {
    const rawKey = req.params.key || req.query.key;
    const key = typeof rawKey === "string" ? rawKey : undefined;
    const category = typeof req.query.category === "string" ? req.query.category : undefined;
    const query: Record<string, any> = {};

    if (key) query.key = key;
    if (category) query.category = category;

    let settings = await SiteSetting.find(query);

    // Auto-seed defaults if not initialized in MongoDB yet
    if (settings.length === 0 && !key && !category) {
      const docs = Object.entries(DEFAULT_SETTINGS).map(([k, val]) => ({
        key: k,
        category: val.category,
        data: val.data,
      }));
      settings = await SiteSetting.insertMany(docs);
      console.log("⚡ [SETTINGS] Auto-initialized all site stats, sector metrics, and contact numbers.");
    }

    // Prepare map with fallbacks for any keys not yet created in existing DB instances
    const settingsMap: Record<string, any> = {};
    for (const [k, val] of Object.entries(DEFAULT_SETTINGS)) {
      if (!key || key === k) {
        if (!category || category === val.category) {
          settingsMap[k] = JSON.parse(JSON.stringify(val.data));
        }
      }
    }

    // Override with DB values
    for (const item of settings) {
      settingsMap[item.key] = { ...(settingsMap[item.key] || {}), ...item.data };
    }

    res.json({
      success: true,
      data: key && settingsMap[key] ? settingsMap[key] : settingsMap,
      all: settingsMap,
      raw: settings,
    });
  } catch (error: any) {
    console.error("getSettings error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function updateSetting(req: Request, res: Response): Promise<void> {
  try {
    const { key } = req.params;
    const { data, category } = req.body;

    if (!key) {
      res.status(400).json({ success: false, message: "Setting key is required" });
      return;
    }

    const updated = await SiteSetting.findOneAndUpdate(
      { key },
      {
        $set: {
          data,
          ...(category ? { category } : {}),
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({
      success: true,
      message: `Setting '${key}' updated successfully. Changes are live across the site.`,
      data: updated.data,
    });
  } catch (error: any) {
    console.error("updateSetting error:", error);
    res.status(500).json({ success: false, message: "Failed to update setting" });
  }
}

export async function seedDefaultSettings(): Promise<void> {
  try {
    for (const [k, val] of Object.entries(DEFAULT_SETTINGS)) {
      await SiteSetting.findOneAndUpdate(
        { key: k },
        { $setOnInsert: { category: val.category, data: val.data } },
        { upsert: true, new: true }
      );
    }
    console.log(`[Database Seed] Synchronized ${Object.keys(DEFAULT_SETTINGS).length} Site Settings into MongoDB.`);
  } catch (error) {
    console.error("[Database Seed] Error seeding site settings:", error);
  }
}
