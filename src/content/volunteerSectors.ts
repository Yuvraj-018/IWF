export interface SectorOption {
  id: string;
  name: string;
  shortDescription: string;
  badgeColor: string;
  iconName: string;
  subcategories: string[];
}

export const VOLUNTEER_SECTORS: SectorOption[] = [
  {
    id: "education",
    name: "Education & Learning",
    shortDescription: "Help open doors to knowledge, student mentoring, career guidance, and academic growth.",
    badgeColor: "#15803d",
    iconName: "GraduationCap",
    subcategories: [
      "Teaching and academic support",
      "Student mentoring and guidance",
      "Career and competitive-exam guidance",
      "Learning activities and workshops",
      "Digital and technology-enabled learning",
      "Educational awareness and outreach",
      "Research, documentation, and educational content",
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare & Well-being",
    shortDescription: "Promote health awareness, preventive care, hygiene, nutrition, and wellness camps.",
    badgeColor: "#0284c7",
    iconName: "HeartPulse",
    subcategories: [
      "Health and hygiene awareness",
      "Nutrition and well-being campaigns",
      "Community health outreach",
      "Health camps and support activities",
      "Public-health education",
      "Documentation and community research",
      "Professional healthcare support",
    ],
  },
  {
    id: "women-youth",
    name: "Women & Youth Empowerment",
    shortDescription: "Support potential, leadership, life skills, confidence-building, and equal opportunities.",
    badgeColor: "#db2777",
    iconName: "Sparkles",
    subcategories: [
      "Mentoring and leadership development",
      "Life skills and confidence-building programs",
      "Youth engagement activities",
      "Women's empowerment initiatives",
      "Awareness and community participation",
      "Career and opportunity guidance",
      "Workshops and capacity-building activities",
    ],
  },
  {
    id: "skills-livelihoods",
    name: "Skills, Livelihoods & Entrepreneurship",
    shortDescription: "Turn practical knowledge and vocational skills into sustainable income-generating opportunities.",
    badgeColor: "#ea580c",
    iconName: "Briefcase",
    subcategories: [
      "Skill-development training",
      "Entrepreneurship mentoring",
      "Career and employment guidance",
      "Business and financial-literacy sessions",
      "Digital and professional skills",
      "Enterprise development support",
      "Market and opportunity research",
    ],
  },
  {
    id: "social-justice",
    name: "Social Justice & Legal Empowerment",
    shortDescription: "Build awareness of constitutional rights, legal resources, social inclusion, and civic dignity.",
    badgeColor: "#7c3aed",
    iconName: "Scale",
    subcategories: [
      "Rights and legal-awareness programs",
      "Community awareness sessions",
      "Legal-information resources",
      "Documentation and research",
      "Social inclusion initiatives",
      "Community outreach",
      "Professional legal support",
    ],
  },
  {
    id: "agriculture",
    name: "Agriculture & Rural Livelihoods",
    shortDescription: "Strengthen rural communities from the ground up through sustainable practices and innovation.",
    badgeColor: "#16a34a",
    iconName: "Sprout",
    subcategories: [
      "Agricultural awareness and training",
      "Farmer-support initiatives",
      "Sustainable farming practices",
      "Rural entrepreneurship",
      "Livelihood research",
      "Technology and knowledge sharing",
      "Community-based rural development",
    ],
  },
  {
    id: "environment",
    name: "Environment & Sustainable Development",
    shortDescription: "Protect resources, organize tree plantation, clean-ups, water conservation, and climate action.",
    badgeColor: "#059669",
    iconName: "TreePine",
    subcategories: [
      "Environmental awareness campaigns",
      "Community clean-up initiatives",
      "Tree plantation and conservation activities",
      "Sustainable-living awareness",
      "Climate and environmental education",
      "Research and documentation",
      "Community sustainability projects",
    ],
  },
  {
    id: "relief",
    name: "Humanitarian Relief & Rehabilitation",
    shortDescription: "Stand with vulnerable people during emergencies with dignified relief, outreach, and recovery.",
    badgeColor: "#dc2626",
    iconName: "ShieldAlert",
    subcategories: [
      "Relief distribution and logistics",
      "Community outreach",
      "Emergency-support activities",
      "Needs assessment and documentation",
      "Rehabilitation support",
      "Resource coordination",
      "Awareness and preparedness activities",
    ],
  },
];
