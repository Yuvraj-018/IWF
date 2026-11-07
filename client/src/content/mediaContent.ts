import outcomesHero from "@/assets/media/outcomes_hero.jpg";
import successStoriesHero from "@/assets/media/success_stories_hero.jpg";
import impactHero from "@/assets/media/impact_hero.jpg";
import annualReportsHero from "@/assets/media/annual_reports_hero.jpg";
import mediaHero from "@/assets/media/media_hero.jpg";
import newsEventsHero from "@/assets/media/news_events_hero.jpg";
import latestUpdatesHero from "@/assets/media/latest_updates_hero.jpg";
import newslettersHero from "@/assets/media/newsletters_hero.jpg";
import publicationsHero from "@/assets/media/publications_hero.jpg";
import pressReleasesHero from "@/assets/media/press_releases_hero.jpg";
import galleryHero from "@/assets/media/gallery_hero.jpg";

import outcomeSectorEdu from "@/assets/media/outcome_sector_education.jpg";
import outcomeSectorHealth from "@/assets/media/outcome_sector_healthcare.jpg";
import outcomeSectorWomen from "@/assets/media/outcome_sector_women.jpg";
import outcomeSectorSkills from "@/assets/media/outcome_sector_skills.jpg";
import outcomeSectorAgri from "@/assets/media/outcome_sector_agriculture.jpg";
import outcomeSectorEnv from "@/assets/media/outcome_sector_environment.jpg";
import outcomeSectorComm from "@/assets/media/outcome_sector_community.jpg";

import storyEduImg from "@/assets/media/story_education.jpg";
import storyWomenImg from "@/assets/media/story_women.jpg";
import storyFarmerImg from "@/assets/media/story_farmer.jpg";

import report2023_24 from "@/assets/media/report_cover_2023_24.jpg";
import report2022_23 from "@/assets/media/report_cover_2022_23.jpg";
import report2021_22 from "@/assets/media/report_cover_2021_22.jpg";
import report2020_21 from "@/assets/media/report_cover_2020_21.jpg";
import report2019_20 from "@/assets/media/report_cover_2019_20.jpg";
import report2018_19 from "@/assets/media/report_cover_2018_19.jpg";
import report2017_18 from "@/assets/media/report_cover_2017_18.jpg";
import report2016_17 from "@/assets/media/report_cover_2016_17.jpg";

import nlCover1 from "@/assets/media/newsletter_cover_1.jpg";
import nlCover2 from "@/assets/media/newsletter_cover_2.jpg";
import nlCover3 from "@/assets/media/newsletter_cover_3.jpg";
import nlCover4 from "@/assets/media/newsletter_cover_4.jpg";
import nlCover5 from "@/assets/media/newsletter_cover_5.jpg";
import nlCover6 from "@/assets/media/newsletter_cover_6.jpg";


import galPhoto1 from "@/assets/media/gallery_photo_1.jpg";
import galPhoto2 from "@/assets/media/gallery_photo_2.jpg";
import galPhoto3 from "@/assets/media/gallery_photo_3.jpg";
import galPhoto4 from "@/assets/media/gallery_photo_4.jpg";
import galPhoto5 from "@/assets/media/gallery_photo_5.jpg";
import galPhoto6 from "@/assets/media/gallery_photo_6.jpg";
import galPhoto7 from "@/assets/media/gallery_photo_7.jpg";
import galPhoto8 from "@/assets/media/gallery_photo_8.jpg";
import galPhoto9 from "@/assets/media/gallery_photo_9.jpg";
import galPhoto10 from "@/assets/media/gallery_photo_10.jpg";

import vidThumb1 from "@/assets/media/video_thumb_1.jpg";
import vidThumb2 from "@/assets/media/video_thumb_2.jpg";
import vidThumb3 from "@/assets/media/video_thumb_3.jpg";
import vidThumb4 from "@/assets/media/video_thumb_4.jpg";

export const MEDIA_HERO_IMAGES = {
  outcomes: outcomesHero,
  successStories: successStoriesHero,
  impact: impactHero,
  annualReports: annualReportsHero,
  media: mediaHero,
  newsEvents: newsEventsHero,
  latestUpdates: latestUpdatesHero,
  newsletters: newslettersHero,
  publications: publicationsHero,
  pressReleases: pressReleasesHero,
  gallery: galleryHero,
};

// -------------------------------------------------------------
// 1. OUTCOMES DATA (Page 3)
// -------------------------------------------------------------
export const OUTCOMES_DATA = {
  hero: {
    badge: "OUTCOMES & IMPACT",
    title: "REAL CHANGE. MEASURABLE COMMUNITY OUTCOMES.",
    description:
      "Our outcomes reflect the impact of our community-driven initiatives across education, health, empowerment, livelihoods, environment, and sustainable development.",
    subtext: "Together, we are building a better and brighter tomorrow.",
    image: outcomesHero,
  },
  statsRibbon: [
    { value: "50,000+", label: "Lives Touched", desc: "Improving quality of life across rural communities" },
    { value: "300+", label: "Villages Reached", desc: "Working in remote and underserved areas" },
    { value: "25+", label: "Ongoing Programs", desc: "Addressing key social development needs" },
    { value: "500+", label: "Community Volunteers", desc: "United in the mission of positive change" },
    { value: "100+", label: "Partners & Supporters", desc: "Collaborating for greater impact" },
    { value: "10+", label: "Years of Impact", desc: "Dedicated to building sustainable communities" },
  ],
  keyAreas: [
    {
      title: "Education & Child Development",
      image: outcomeSectorEdu,
      achievements: [
        "8,000+ Children Supported with Education",
        "120+ Schools & Learning Centres Strengthened",
        "95% School Enrollment Rate in Supported Villages",
      ],
    },
    {
      title: "Healthcare & Wellness",
      image: outcomeSectorHealth,
      achievements: [
        "6,000+ People Provided Healthcare Support",
        "85+ Health Camps Conducted",
        "Improved Health Awareness in 300+ Villages",
      ],
    },
    {
      title: "Women Empowerment",
      image: outcomeSectorWomen,
      achievements: [
        "4,000+ Women Empowered",
        "200+ Self Help Groups Supported",
        "Increased Financial Independence",
      ],
    },
    {
      title: "Skill Development & Livelihood",
      image: outcomeSectorSkills,
      achievements: [
        "3,500+ Youth Trained in Skills",
        "70% Trained Youth Placed/Self-Employed",
        "Better Income Opportunities Created",
      ],
    },
    {
      title: "Agriculture & Livelihood",
      image: outcomeSectorAgri,
      achievements: [
        "2,500+ Farmers Supported",
        "150+ Trainings on Sustainable Farming",
        "Increased Productivity & Income",
      ],
    },
    {
      title: "Environment Conservation",
      image: outcomeSectorEnv,
      achievements: [
        "15,000+ Trees Planted",
        "50+ Water Conservation Projects",
        "Cleaner, Greener Communities",
      ],
    },
    {
      title: "Community Development",
      image: outcomeSectorComm,
      achievements: [
        "35+ Community Centres Built/Supported",
        "Improved Access to Basic Facilities",
        "Stronger, United Communities",
      ],
    },
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
  totalCumulativeImpact: "71,000+",
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
  growthNote: "Consistent growth, deeper reach, greater impact. Every year, we reach more lives and build stronger communities.",
  reach: {
    villages: "300+",
    districts: "15+",
    states: "5 States",
    stateList: ["Bihar (Darbhanga, Madhubani, Samastipur)", "Delhi NCR", "Uttar Pradesh", "Jharkhand", "West Bengal"],
  },
  beneficiaries: [
    { count: "28,000+", label: "Children", desc: "Enrolled in schools and remedial learning centres" },
    { count: "21,000+", label: "Women", desc: "Empowered through SHGs and health education" },
    { count: "15,000+", label: "Youth", desc: "Trained in vocational and employment skills" },
    { count: "7,000+", label: "Senior Citizens", desc: "Provided free medical diagnostics and relief" },
  ],
  beneficiaryQuote: "These numbers are not just statistics; they represent real people, real stories, and real change. Together, we can create an even greater impact in the years to come.",
  principles: [
    { title: "Data Driven", desc: "Decisions", icon: "PieChart" },
    { title: "Transparent", desc: "Reporting", icon: "FileText" },
    { title: "Measurable", desc: "Outcomes", icon: "Target" },
    { title: "Sustainable", desc: "Change", icon: "Leaf" },
    { title: "Community", desc: "Focused", icon: "Users" },
  ],
  communityMetrics: [
    { value: "300+", label: "Villages Reached" },
    { value: "50,000+", label: "Happy Beneficiaries" },
    { value: "500+", label: "Community Volunteers" },
    { value: "100+", label: "Partners & Supporters" },
    { value: "10+", label: "Years of Transforming Lives" },
  ],
  quote: {
    text: "The change we see today is the result of collective effort, commitment, and compassion. Together, we are creating stronger, healthier, and self-reliant communities.",
    author: "Islah Welfare Foundation",
  },
  featuredStories: [
    {
      title: "From Learning to Leading",
      category: "Education",
      desc: "With access to quality education and support, children in rural areas are now aspiring higher and achieving their dreams.",
      image: storyEduImg,
      link: "/success-stories?id=anjali-education",
    },
    {
      title: "Empowered Women, Stronger Families",
      category: "Women Empowerment",
      desc: "Our women empowerment programs are helping women become financially independent and confident leaders.",
      image: storyWomenImg,
      link: "/success-stories?id=farida-shg",
    },
    {
      title: "Better Livelihoods, Better Tomorrow",
      category: "Livelihood",
      desc: "Farmers are adopting modern techniques and improving productivity, leading to better income and brighter futures.",
      image: storyFarmerImg,
      link: "/success-stories?id=ramesh-organic-farming",
    },
  ],
};

// -------------------------------------------------------------
// 2. SUCCESS STORIES DATA (Page 4)
// -------------------------------------------------------------
export interface SuccessStoryItem {
  id: string;
  category: string;
  title: string;
  personName: string;
  village: string;
  state: string;
  excerpt: string;
  fullStory: string;
  quote?: string;
  impactMetrics: string[];
  image: string;
}

export const SUCCESS_STORIES_DATA = {
  hero: {
    badge: "SUCCESS STORIES",
    title: "Real People. Real Change.",
    description:
      "Every story is a proof of hope, determination, and the power of collective support. These are the stories of individuals and communities whose lives have changed through IWF's initiatives.",
    tagline: "Changing Lives. Building Futures.",
    image: successStoriesHero,
  },
  statsRibbon: [
    { value: "50,000+", label: "Lives Impacted", desc: "Through our community initiatives" },
    { value: "300+", label: "Inspiring Stories", desc: "Of transformation and new beginnings" },
    { value: "300+", label: "Villages Reached", desc: "Creating sustainable and lasting change" },
    { value: "10+", label: "Years of Impact", desc: "Dedicated to building stronger communities" },
  ],
  categories: [
    "All Stories",
    "Education",
    "Healthcare",
    "Livelihood",
    "Women Empowerment",
    "Environment",
    "Community Development",
  ],
  sidebarQuote: {
    title: "Every Story Matters",
    text: "Behind every success is an opportunity given, support received, and a community that believed in a better tomorrow.",
    author: "Islah Welfare Foundation",
  },
  storiesByArea: [
    { area: "Education", count: "25+ Stories" },
    { area: "Healthcare", count: "20+ Stories" },
    { area: "Livelihood", count: "30+ Stories" },
    { area: "Women Empowerment", count: "25+ Stories" },
    { area: "Environment", count: "15+ Stories" },
    { area: "Community Development", count: "15+ Stories" },
  ],
  stories: [] as SuccessStoryItem[],
};

// -------------------------------------------------------------
// 3. IMPACT STATISTICS DATA (Consolidated into Outcomes & Impact)
// -------------------------------------------------------------
export const IMPACT_STATISTICS_DATA = OUTCOMES_DATA;

// -------------------------------------------------------------
// 4. ANNUAL REPORTS DATA (Page 6)
// -------------------------------------------------------------
export const ANNUAL_REPORTS_DATA = {
  hero: {
    badge: "ANNUAL REPORTS",
    title: "OUR JOURNEY. OUR IMPACT.",
    description:
      "Our Annual Reports reflect our commitment to transparency, accountability, and measurable impact in the communities we serve. Explore our progress over the years.",
    tagline: "Transparency builds trust. Impact creates change.",
    image: annualReportsHero,
  },
  statsRibbon: [
    { value: "50,000+", label: "Lives Impacted", desc: "Through our community initiatives" },
    { value: "300+", label: "Villages Covered", desc: "In rural and underserved areas" },
    { value: "25+", label: "Ongoing Programs", desc: "Focused on sustainable development" },
    { value: "100+", label: "Partners & Supporters", desc: "Collaborating for greater impact" },
    { value: "10+", label: "Years of Impact", desc: "Working towards a better and brighter tomorrow" },
  ],
  reports: [
    {
      year: "2023-24",
      title: "Annual Report 2023-24",
      summary: "A year of growth, impact, and community transformation.",
      cover: report2023_24,
      fileSize: "6.5 MB",
      pdfUrl: "/docs/islah_report.pdf",
    },
    {
      year: "2022-23",
      title: "Annual Report 2022-23",
      summary: "Strengthening communities and creating sustainable opportunities.",
      cover: report2022_23,
      fileSize: "5.8 MB",
      pdfUrl: "/docs/islah_report.pdf",
    },
    {
      year: "2021-22",
      title: "Annual Report 2021-22",
      summary: "Empowering lives through inclusive and sustainable development.",
      cover: report2021_22,
      fileSize: "5.2 MB",
      pdfUrl: "/docs/islah_report.pdf",
    },
    {
      year: "2020-21",
      title: "Annual Report 2020-21",
      summary: "Working together for stronger, healthier, and self-reliant communities.",
      cover: report2020_21,
      fileSize: "4.9 MB",
      pdfUrl: "/docs/islah_report.pdf",
    },
    {
      year: "2019-20",
      title: "Annual Report 2019-20",
      summary: "Expanding reach. Enriching lives. Building a better tomorrow.",
      cover: report2019_20,
      fileSize: "4.4 MB",
      pdfUrl: "/docs/islah_report.pdf",
    },
    {
      year: "2018-19",
      title: "Annual Report 2018-19",
      summary: "Promoting health, education, and livelihoods in rural communities.",
      cover: report2018_19,
      fileSize: "4.1 MB",
      pdfUrl: "/docs/islah_report.pdf",
    },
    {
      year: "2017-18",
      title: "Annual Report 2017-18",
      summary: "Small steps, big impact towards sustainable development.",
      cover: report2017_18,
      fileSize: "3.7 MB",
      pdfUrl: "/docs/islah_report.pdf",
    },
    {
      year: "2016-17",
      title: "Annual Report 2016-17",
      summary: "Laying the foundation for empowered and resilient communities.",
      cover: report2016_17,
      fileSize: "3.2 MB",
      pdfUrl: "/docs/islah_report.pdf",
    },
  ],
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
};

// -------------------------------------------------------------
// 5. MEDIA HUB DATA (Page 7)
// -------------------------------------------------------------
export const MEDIA_HUB_DATA = {
  hero: {
    badge: "MEDIA & UPDATES",
    title: "COMMUNITY STORIES, NEWS & REAL-TIME IMPACT",
    description: "Stay informed about our latest news, field events, publications, audio-visual archives and stories of lasting grassroots impact.",
    image: mediaHero,
    videoBadge: "Watch: A Decade of Grassroots Transformation (10 Min)",
  },
  statsRibbon: [
    { value: "120+", label: "Field Events", desc: "Organized across 15+ rural districts" },
    { value: "250+", label: "News & Bulletins", desc: "Verified dispatches & media coverage" },
    { value: "50,000+", label: "Lives Reached", desc: "Direct beneficiary impact to date" },
    { value: "500+", label: "Visual Stories", desc: "Archived field documentation" },
  ],
  sections: [
    {
      title: "Outcomes & Impact",
      desc: "Comprehensive review of systemic transformations, verified metrics, and interactive district-level distribution data across our ongoing missions.",
      image: outcomeSectorEdu,
      link: "/media/outcomes",
      actionText: "Explore Outcomes",
    },
    {
      title: "Success Stories",
      desc: "Inspiring first-person narratives of determination, women entrepreneurship, and youth achievement from our field locations.",
      image: storyWomenImg,
      link: "/media/success-stories",
      actionText: "Read Stories",
    },
    {
      title: "News & Events",
      desc: "Live field dispatches, official press releases, community health camps, and upcoming initiatives driving grassroots change.",
      image: outcomeSectorHealth,
      link: "/media/news-and-events",
      actionText: "View News & Events",
    },
    {
      title: "Annual Reports",
      desc: "Official audited financial disclosures, programmatic evaluations, and annual reports for public transparency and governance.",
      image: report2023_24,
      link: "/media/annual-reports",
      actionText: "Download Reports",
    },
    {
      title: "Photo & Video Gallery",
      desc: "Browse authentic on-the-ground visual documentation capturing beneficiary progress and volunteer dedication.",
      image: galPhoto1,
      link: "/media/gallery",
      actionText: "Browse Gallery",
    },
  ],
  latestFromCommunities: [
    {
      title: "Free Rural Health & Diagnostic Camp in Darbhanga",
      category: "Healthcare",
      desc: "Over 850 rural residents received specialist medical consultations, basic lab testing, and essential medicine distributions.",
      image: outcomeSectorHealth,
    },
    {
      title: "Kishori Utthan Digital Literacy Center Inauguration",
      category: "Education",
      desc: "Empowering 120 adolescent girls with computer skills, basic software training, and digital career guidance.",
      image: outcomeSectorEdu,
    },
    {
      title: "Sustainable Agriculture & Organic Compost Training",
      category: "Agriculture",
      desc: "Training 450 marginal farmers in soil conservation, water management, and high-yield sustainable cultivation techniques.",
      image: outcomeSectorAgri,
    },
  ],
  subsections: [
    {
      title: "Outcomes & Impact",
      desc: "Measurable grassroots outcomes and verified field statistics.",
      href: "/media/outcomes",
      icon: "TrendingUp",
    },
    {
      title: "Success Stories",
      desc: "Inspiring first-person narratives of personal transformation.",
      href: "/media/success-stories",
      icon: "Heart",
    },
    {
      title: "News & Events",
      desc: "Field news, press statements, and upcoming events.",
      href: "/media/news-and-events",
      icon: "FileText",
    },
    {
      title: "Annual Reports",
      desc: "Audited financial reports and transparent disclosures.",
      href: "/media/annual-reports",
      icon: "Download",
    },
    {
      title: "Photo & Video Gallery",
      desc: "Moments captured from our programs and events.",
      href: "/media/gallery",
      icon: "Image",
    },
  ],
  quickHighlights: [
    { count: "120+", label: "Events", icon: "Calendar" },
    { count: "250+", label: "News Articles", icon: "FileText" },
    { count: "500+", label: "Gallery Photos", icon: "Image" },
  ],
};

// -------------------------------------------------------------
// 6. NEWS & EVENTS DATA (Consolidated News, Dispatches & Events)
// -------------------------------------------------------------
export const NEWS_EVENTS_DATA = {
  hero: {
    badge: "NEWS & EVENTS",
    breadcrumb: "Home > Media & Updates > News & Events",
    title: "News & Events",
    description: "Stay informed about our latest activities, field dispatches, official press releases and community initiatives creating positive change.",
    image: newsEventsHero,
  },
  categories: [
    "All",
    "News & Updates",
    "Events",
    "Press Releases",
    "Community Activities",
    "Programs",
    "Campaigns",
  ],
  items: [],
  upcomingEvents: [],
  categoryCounts: [],
  sidebarContact: {
    email: "media@islahwelfare.org",
    phone: "+91 93102 96911",
    locations: "New Delhi & Darbhanga, Bihar",
    boilerplate: "Islah Welfare Foundation (IWF) is a registered non-profit organization dedicated to empowering underprivileged rural and semi-urban communities through sustainable initiatives in education, healthcare, women empowerment, environmental stewardship, and emergency relief.",
  },
};

// -------------------------------------------------------------
// 7. LATEST UPDATES DATA (Consolidated alias into News & Events)
// -------------------------------------------------------------
export const LATEST_UPDATES_DATA = NEWS_EVENTS_DATA;

// -------------------------------------------------------------
// PRESS RELEASES (alias of News & Events)
// -------------------------------------------------------------
export const PRESS_RELEASES_DATA = NEWS_EVENTS_DATA;

// -------------------------------------------------------------
// 11. GALLERY DATA (Page 13)
// -------------------------------------------------------------
export interface GalleryItem {
  id: string | number;
  type: "photo" | "video";
  title: string;
  category: string;
  location?: string;
  date?: string;
  thumbnail: string;
  image?: string;
  videoUrl?: string;
}

export const GALLERY_DATA = {
  hero: {
    badge: "VISUAL ARCHIVE",
    title: "PHOTO & VIDEO GALLERY",
    description: "Explore on-the-ground moments of transformation, community resilience, grassroots training, and verified social progress.",
    image: galleryHero,
  },
  statsRibbon: [
    { value: "500+", label: "Field Photos", desc: "Verifiable project documentation" },
    { value: "35+", label: "Video Stories", desc: "Grassroots testimonials & documentaries" },
    { value: "15+", label: "Districts Covered", desc: "Field programs across Bihar & UP" },
    { value: "100%", label: "Real Impact", desc: "Authentic on-site community moments" },
  ],
  categories: [
    "All Media",
    "Photos",
    "Videos",
    "Education",
    "Healthcare",
    "Women Empowerment",
    "Livelihood",
    "Environment",
  ],
  items: [],
  photos: [
    { id: 1, title: "Education for Every Child", category: "Education", image: galPhoto1 },
    { id: 2, title: "Health Camp in Rural Area", category: "Healthcare", image: galPhoto2 },
    { id: 3, title: "Women Empowerment Program", category: "Women Empowerment", image: galPhoto3 },
    { id: 4, title: "Skill Development Training", category: "Livelihood", image: galPhoto4 },
    { id: 5, title: "Tree Plantation Drive", category: "Environment", image: galPhoto5 },
    { id: 6, title: "Community Awareness Program", category: "Community Development", image: galPhoto6 },
    { id: 7, title: "Livelihood Support", category: "Livelihood", image: galPhoto7 },
    { id: 8, title: "Clean Water Initiative", category: "Environment", image: galPhoto8 },
    { id: 9, title: "Food Distribution Drive", category: "Events", image: galPhoto9 },
    { id: 10, title: "Independence Day Celebration", category: "Events", image: galPhoto10 },
  ],
  videos: [
    {
      id: 1,
      title: "Empowering Rural Education",
      duration: "02:45",
      desc: "How we are bringing quality education to rural children.",
      thumb: vidThumb1,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Transforming Livelihoods",
      duration: "03:12",
      desc: "Supporting communities to build sustainable livelihoods.",
      thumb: vidThumb2,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ],
};

