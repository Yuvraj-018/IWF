import { API_BASE_URL } from "./apiClient";

export interface NewsEventItem {
  _id?: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  day?: string;
  month?: string;
  excerpt: string;
  fullStory?: string;
  image: string;
  pdfUrl?: string;
  featured?: boolean;
  location?: string;
  isUpcoming?: boolean;
  impactMetrics?: string[];
  readTime?: string;
  author?: string;
}

export interface UpcomingEventItem {
  _id?: string;
  slug: string;
  title: string;
  month: string;
  day: string;
  location?: string;
  excerpt?: string;
}

export interface NewsEventsResponse {
  success: boolean;
  count: number;
  total: number;
  data: NewsEventItem[];
  categories: string[];
  categoryCounts: { name: string; count: number }[];
  upcomingEvents: UpcomingEventItem[];
}

export const FALLBACK_UPCOMING_EVENTS: UpcomingEventItem[] = [
  {
    slug: "evt-shiksha-na-ruke-annual",
    month: "JUL",
    day: "15",
    title: "Shiksha Na Ruke — Annual Scholarship Distribution",
    location: "Darbhanga, Bihar",
    excerpt: "Annual scholarship distribution for 200+ students from underprivileged families.",
  },
  {
    slug: "evt-mega-eye-screening",
    month: "AUG",
    day: "05",
    title: "Mega Eye & Health Screening Camp",
    location: "Madhubani, Bihar",
    excerpt: "Free vision testing, glasses distribution, and cataract identification camp.",
  },
  {
    slug: "evt-shg-tailoring-exhibition",
    month: "AUG",
    day: "20",
    title: "Rural Women SHG Tailoring Exhibition",
    location: "Samastipur, Bihar",
    excerpt: "Exhibition showcasing apparel and handicrafts made by women self-help cooperatives.",
  },
  {
    slug: "evt-drinking-water-tap",
    month: "SEP",
    day: "10",
    title: "Community Drinking Water Tap Inauguration",
    location: "Katihar, Bihar",
    excerpt: "Inauguration of community drinking water stations serving 400+ rural households.",
  },
];

export const FALLBACK_NEWS_EVENTS: NewsEventItem[] = [
  {
    slug: "up-mega-health-camp",
    date: "25 May 2024",
    day: "25",
    month: "May 2024",
    category: "News & Updates",
    title: "Successful Mega Health Camp in Darbhanga",
    excerpt: "Over 600+ rural residents benefited from our free comprehensive health check-up camp organized in partnership with specialist doctors and local pharmacists.",
    fullStory: "Over 600+ rural residents benefited from our free comprehensive health check-up camp organized in Darbhanga. Dedicated medical teams provided diagnostic blood screenings, diabetes checks, free medicines, and specialized geriatric care. Volunteer teams coordinated transportation for elderly patients from neighboring villages.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    featured: true,
    impactMetrics: ["600+ Beneficiaries", "12 Specialist Doctors", "100% Free Diagnostics"],
    readTime: "3 min",
    author: "Healthcare Department",
  },
  {
    slug: "up-learning-center",
    date: "20 May 2024",
    day: "20",
    month: "May 2024",
    category: "News & Updates",
    title: "New Community Learning Center Inaugurated in Bihar",
    excerpt: "A new solar-powered digital learning center was inaugurated to support 250+ rural children with after-school remedial tutoring and foundational STEM tools.",
    fullStory: "Equipped with tablet computers, offline educational libraries, and solar power backup, the newly inaugurated Community Learning Center provides evening tuition, foundational literacy, and digital mentorship for children from underprivileged households.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    featured: true,
    impactMetrics: ["250+ Students", "Solar-Powered Hub", "Digital STEM Kits"],
    readTime: "4 min",
    author: "Education Wing",
  },
  {
    slug: "pr-partner-greenfuture",
    date: "12 May 2024",
    day: "12",
    month: "May 2024",
    category: "Press Releases",
    title: "IWF Partners with GreenFuture Pvt. Ltd. to Promote Sustainable Rural Development",
    excerpt: "Islah Welfare Foundation (IWF) has signed a strategic partnership with GreenFuture Pvt. Ltd. to implement environmental and livelihood programs in rural communities.",
    fullStory: "Under this MoU, GreenFuture will support rural organic farming clusters, community seed banks, and agro-forestry initiatives across 15 Gram Panchayats in North Bihar. The project aims to transition 300+ smallholder farmers to sustainable micro-irrigation practices.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "/docs/islah_report.pdf",
    featured: false,
    impactMetrics: ["CSR Partnership", "300 Farmers", "15 Panchayats"],
    readTime: "5 min",
    author: "Executive Secretariat",
  },
  {
    slug: "tree-plantation-world-environment-day",
    date: "12 May 2024",
    day: "12",
    month: "May 2024",
    category: "Community Activities",
    title: "Tree Plantation Drive on World Environment Day",
    excerpt: "Our volunteers planted over 1,000 saplings across 15 villages to promote a greener and healthier environment.",
    fullStory: "Local youth groups, school students, and village elders actively participated in planting native shade, fruit-bearing, and medicinal trees along rural roads and school grounds.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    featured: false,
    impactMetrics: ["1,000+ Saplings", "15 Villages", "Community Driven"],
    readTime: "2 min",
    author: "Environment Desk",
  },
  {
    slug: "up-shg-empowerment",
    date: "15 May 2024",
    day: "15",
    month: "May 2024",
    category: "News & Updates",
    title: "SHG Training Program Empowers 120+ Rural Women",
    excerpt: "Our livelihood program helped rural women develop tailoring, handicraft, and micro-savings skills to launch independent home enterprises and self-help groups.",
    fullStory: "Through certified master trainers, participants completed intensive modules on commercial stitching, apparel design, quality inspection, and bookkeeping. The top batches were granted sewing equipment kits to start earning immediately.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    featured: true,
    impactMetrics: ["120 Women Graduated", "Sewing Kits Distributed", "Micro-enterprise Support"],
    readTime: "4 min",
    author: "Women & Youth Wing",
  },
  {
    slug: "women-empowerment-5-villages",
    date: "08 May 2024",
    day: "08",
    month: "May 2024",
    category: "Programs",
    title: "Women Empowerment Program Launched in 5 New Villages",
    excerpt: "The program will provide skill training, financial literacy and livelihood support to rural women.",
    fullStory: "Focusing on vulnerable households, widows, and single mothers, this initiative opens localized community centers where women learn banking, online payment operations, and micro-business management.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    featured: false,
    impactMetrics: ["5 New Clusters", "Financial Literacy", "Livelihood Coaching"],
    readTime: "3 min",
    author: "Women & Youth Wing",
  },
  {
    slug: "pr-women-empowerment",
    date: "28 April 2024",
    day: "28",
    month: "Apr 2024",
    category: "Press Releases",
    title: "IWF Launches Women Empowerment Program in 5 New Villages",
    excerpt: "The initiative will provide skill training, financial literacy and livelihood support to empower women and promote self-reliance.",
    fullStory: "Official media release outlining the five-year strategic roadmap for women self-reliance across Bihar and Uttar Pradesh regional operations.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "/docs/islah_report.pdf",
    featured: false,
    impactMetrics: ["Official Press Release", "Inter-State Coverage"],
    readTime: "3 min",
    author: "Media Relations Desk",
  },
  {
    slug: "education-support-500-students",
    date: "01 May 2024",
    day: "01",
    month: "May 2024",
    category: "Programs",
    title: "Education Support Program Benefits 500+ Students",
    excerpt: "Scholarship kits and learning materials distributed to underprivileged students to encourage their education.",
    fullStory: "Comprehensive kit distribution ceremony held with local school headmasters. Kits included school uniforms, backpacks, geometry sets, and textbook sets.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    featured: false,
    impactMetrics: ["500 School Kits", "Zero Dropout Goal", "Teacher Endorsement"],
    readTime: "3 min",
    author: "Education Wing",
  },
  {
    slug: "free-health-checkup-rural",
    date: "25 Apr 2024",
    day: "25",
    month: "Apr 2024",
    category: "Campaigns",
    title: "Free Health Check-up Camp Organized in Rural Area",
    excerpt: "Over 600 community members received free medical check-ups and medicines in partnership with local doctors.",
    fullStory: "Specialist consultations in general medicine, pediatrics, and ophthalmology provided on-site. Patients requiring cataract procedures were scheduled for free transport to partner hospitals.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    featured: false,
    impactMetrics: ["On-site Pharmacy", "Free Eyeglasses", "Doctor Consultations"],
    readTime: "3 min",
    author: "Healthcare Department",
  },
  {
    slug: "pr-scholarship-expand",
    date: "15 April 2024",
    day: "15",
    month: "Apr 2024",
    category: "Press Releases",
    title: "Education for Every Child: IWF Expands Scholarship Program",
    excerpt: "IWF has expanded its scholarship program to support more deserving students from underprivileged families in pursuing their education.",
    fullStory: "Announcement of the expansion of the 'Shiksha Na Ruke' scholarship pool, targeting meritorious students preparing for board examinations and higher vocational courses.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "/docs/islah_report.pdf",
    featured: false,
    impactMetrics: ["Scholarship Expansion", "Board Exam Coaching"],
    readTime: "4 min",
    author: "Executive Secretariat",
  },
  {
    slug: "clean-water-sanitation-awareness",
    date: "14 Apr 2024",
    day: "14",
    month: "Apr 2024",
    category: "Community Activities",
    title: "Community Awareness Program on Clean Water & Sanitation",
    excerpt: "We conducted awareness sessions on hygiene, sanitation and safe drinking water in 10 villages.",
    fullStory: "Field workers conducted live water testing demonstrations and distributed chlorine tablets alongside informative pamphlets on preventing seasonal waterborne diseases.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    featured: false,
    impactMetrics: ["10 Villages", "Water Quality Tests", "Chlorine Kit Distribution"],
    readTime: "2 min",
    author: "Community Engagement",
  },
  {
    slug: "international-womens-day-celebration",
    date: "07 Apr 2024",
    day: "07",
    month: "Apr 2024",
    category: "Events",
    title: "International Women's Day Celebrated with Rural Women",
    excerpt: "We celebrated the strength and achievements of rural women with interactive sessions, games and health check-ups.",
    fullStory: "A gathering honoring community health workers, women agricultural leaders, and student toppers with excellence awards and mentorship panels.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    featured: false,
    impactMetrics: ["Community Honor Roll", "Women Role Models"],
    readTime: "3 min",
    author: "Women & Youth Wing",
  },
  {
    slug: "flood-relief-support-bihar",
    date: "28 Mar 2024",
    day: "28",
    month: "Mar 2024",
    category: "Community Activities",
    title: "IWF Extends Relief Support to Flood-Affected Families",
    excerpt: "Essential food kits, clothing and clean water supplies were distributed to flood-affected families in North Bihar.",
    fullStory: "Emergency response volunteers deployed country boats to deliver dry ration kits (rice, pulses, salt, oil, biscuits), baby food, and tarpaulin sheets to marooned hamlets.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
    featured: false,
    impactMetrics: ["Emergency Ration Kits", "Boat Rescue Support", "Medical First-Aid"],
    readTime: "4 min",
    author: "Disaster Relief Unit",
  },
  {
    slug: "skill-development-batch-completion",
    date: "21 Mar 2024",
    day: "21",
    month: "Mar 2024",
    category: "Programs",
    title: "Skill Development Training Program Completed",
    excerpt: "30 young participants completed the vocational training program and are now ready for job placement.",
    fullStory: "Graduation ceremony for the first batch of IT, electrical repair, and plumbing technicians trained under our regional skill center.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    featured: false,
    impactMetrics: ["30 Certified Youths", "Placement Assistance", "Toolkits Given"],
    readTime: "3 min",
    author: "Skills & Livelihood Desk",
  },
];

export async function fetchNewsEvents(params?: {
  category?: string;
  search?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}): Promise<NewsEventsResponse> {
  const query = new URLSearchParams();
  if (params?.category && params.category !== "All") {
    query.set("category", params.category);
  }
  if (params?.search && params.search.trim()) {
    query.set("search", params.search.trim());
  }
  if (params?.featured !== undefined) {
    query.set("featured", String(params.featured));
  }
  if (params?.page) {
    query.set("page", String(params.page));
  }
  if (params?.limit) {
    query.set("limit", String(params.limit));
  }

  const url = `${API_BASE_URL}/news${query.toString() ? `?${query.toString()}` : ""}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch news events (status: ${res.status})`);
    }
    const json: NewsEventsResponse = await res.json();
    if (json.success && json.data && json.data.length > 0) {
      return json;
    }
    throw new Error("Empty backend news list");
  } catch (err) {
    console.warn("Backend /api/news offline or unreached, using bundled fallback catalog:", err);
    return {
      success: true,
      count: FALLBACK_NEWS_EVENTS.length,
      total: FALLBACK_NEWS_EVENTS.length,
      data: FALLBACK_NEWS_EVENTS,
      categories: [
        "All",
        "News & Updates",
        "Events",
        "Press Releases",
        "Community Activities",
        "Programs",
        "Campaigns",
      ],
      categoryCounts: [
        { name: "All", count: FALLBACK_NEWS_EVENTS.length },
        { name: "News & Updates", count: 4 },
        { name: "Events", count: 4 },
        { name: "Press Releases", count: 3 },
        { name: "Community Activities", count: 3 },
        { name: "Programs", count: 3 },
        { name: "Campaigns", count: 1 },
      ],
      upcomingEvents: FALLBACK_UPCOMING_EVENTS,
    };
  }
}

export async function fetchNewsEventBySlug(slug: string): Promise<NewsEventItem> {
  try {
    const res = await fetch(`${API_BASE_URL}/news/${slug}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch news item ${slug} (status: ${res.status})`);
    }
    const json = await res.json();
    return json.data;
  } catch (err) {
    const fallback = FALLBACK_NEWS_EVENTS.find((n) => n.slug === slug) || FALLBACK_NEWS_EVENTS[0];
    return fallback;
  }
}
