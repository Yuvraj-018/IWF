import mongoose from "mongoose";
import dotenv from "dotenv";
import { Media } from "../models/Media.js";

dotenv.config();

const INITIAL_MEDIA_ENTRIES = [
  // Hero slides
  {
    key: "hero-slide-1",
    title: "Education for Every Child",
    category: "hero",
    url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80",
    altText: "Education for Every Child",
    tags: ["hero", "education", "carousel"],
  },
  {
    key: "hero-slide-2",
    title: "Building a Better India – Vision 2047",
    category: "hero",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80",
    altText: "Building a Better India – Vision 2047",
    tags: ["hero", "nation-building", "carousel"],
  },
  {
    key: "hero-slide-3",
    title: "Healthcare That Reaches the Last Mile",
    category: "hero",
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    altText: "Healthcare That Reaches the Last Mile",
    tags: ["hero", "healthcare", "carousel"],
  },
  {
    key: "hero-slide-4",
    title: "Skills Today, Success Tomorrow",
    category: "hero",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    altText: "Skills Today, Success Tomorrow",
    tags: ["hero", "livelihood", "carousel"],
  },

  // Causes
  {
    key: "cause-education",
    title: "Education & Learning Centres",
    category: "causes",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    altText: "Education scholarships and kits",
    tags: ["causes", "education"],
  },
  {
    key: "cause-medical",
    title: "Emergency Medical & Health Camps",
    category: "causes",
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    altText: "Health camps and treatments",
    tags: ["causes", "health"],
  },
  {
    key: "cause-women",
    title: "Women & Youth Empowerment",
    category: "causes",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    altText: "Self help groups and vocational skills",
    tags: ["causes", "women"],
  },
  {
    key: "cause-agriculture",
    title: "Rural Agriculture & Sustainable Livelihoods",
    category: "causes",
    url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    altText: "Clean water and rural empowerment",
    tags: ["causes", "agriculture"],
  },
  {
    key: "cause-relief",
    title: "Humanitarian Relief & Rehabilitation",
    category: "causes",
    url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
    altText: "Disaster response and emergency aid",
    tags: ["causes", "relief"],
  },

  // ── Gallery Event Albums & Sub-Media Photos ──
  // Album 1: Opening Ceremony
  {
    key: "gallery-opening-ceremony-cover",
    albumId: "opening-ceremony",
    albumTitle: "OPENING CEREMONY",
    title: "Grand Foundation Opening Event",
    category: "gallery",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    altText: "Opening Ceremony",
    location: "Baghant, Bihar",
    date: "Nov 2026",
    isCover: true,
    mediaType: "photo",
    order: 1,
  },
  {
    key: "gallery-opening-ceremony-sub-1",
    albumId: "opening-ceremony",
    albumTitle: "OPENING CEREMONY",
    title: "Dignitaries and Village Elders Address",
    category: "gallery",
    url: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=800&q=80",
    altText: "Dignitaries Address",
    location: "Baghant, Bihar",
    date: "Nov 2026",
    isCover: false,
    mediaType: "photo",
    order: 2,
  },
  {
    key: "gallery-opening-ceremony-sub-2",
    albumId: "opening-ceremony",
    albumTitle: "OPENING CEREMONY",
    title: "Cultural Welcome Program by Students",
    category: "gallery",
    url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    altText: "Cultural Program",
    location: "Baghant, Bihar",
    date: "Nov 2026",
    isCover: false,
    mediaType: "photo",
    order: 3,
  },

  // Album 2: Health Diagnostic Camp
  {
    key: "gallery-health-camp-cover",
    albumId: "health-diagnostic-camp",
    albumTitle: "HEALTH DIAGNOSTIC CAMP",
    title: "General Health Screening & Diagnostics Camp",
    category: "gallery",
    url: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
    altText: "Health Diagnostic Camp",
    location: "Bathiya Village",
    date: "Nov 2026",
    isCover: true,
    mediaType: "photo",
    order: 1,
  },
  {
    key: "gallery-health-camp-sub-1",
    albumId: "health-diagnostic-camp",
    albumTitle: "HEALTH DIAGNOSTIC CAMP",
    title: "Free Essential Medicine Distribution",
    category: "gallery",
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    altText: "Free Medicine Distribution",
    location: "Bathiya Village",
    date: "Nov 2026",
    isCover: false,
    mediaType: "photo",
    order: 2,
  },
  {
    key: "gallery-health-camp-sub-2",
    albumId: "health-diagnostic-camp",
    albumTitle: "HEALTH DIAGNOSTIC CAMP",
    title: "Pediatric Consultation & Nutrition Guidance",
    category: "gallery",
    url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
    altText: "Pediatric Consultation",
    location: "Bathiya Village",
    date: "Nov 2026",
    isCover: false,
    mediaType: "photo",
    order: 3,
  },

  // Album 3: Vision Academic City
  {
    key: "gallery-vision-city-cover",
    albumId: "vision-academic-city",
    albumTitle: "VISION ACADEMIC CITY",
    title: "Campus Hub & Digital Learning Environment",
    category: "gallery",
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    altText: "Vision Academic City",
    location: "Darbhanga, Bihar",
    date: "2026",
    isCover: true,
    mediaType: "photo",
    order: 1,
  },
  {
    key: "gallery-vision-city-sub-1",
    albumId: "vision-academic-city",
    albumTitle: "VISION ACADEMIC CITY",
    title: "Smart Classrooms & STEM Science Laboratories",
    category: "gallery",
    url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
    altText: "Smart Classrooms",
    location: "Darbhanga, Bihar",
    date: "2026",
    isCover: false,
    mediaType: "photo",
    order: 2,
  },
  {
    key: "gallery-vision-city-sub-2",
    albumId: "vision-academic-city",
    albumTitle: "VISION ACADEMIC CITY",
    title: "Community Library & Study Resource Center",
    category: "gallery",
    url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
    altText: "Library Center",
    location: "Darbhanga, Bihar",
    date: "2026",
    isCover: false,
    mediaType: "photo",
    order: 3,
  },

  // Album 4: Environment Plantation
  {
    key: "gallery-environment-cover",
    albumId: "environment-plantation",
    albumTitle: "ENVIRONMENT PLANTATION",
    title: "Green Darbhanga Tree Plantation Drive",
    category: "gallery",
    url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    altText: "Environment Plantation Drive",
    location: "Darbhanga & Madhubani",
    date: "2026",
    isCover: true,
    mediaType: "photo",
    order: 1,
  },
  {
    key: "gallery-environment-sub-1",
    albumId: "environment-plantation",
    albumTitle: "ENVIRONMENT PLANTATION",
    title: "Youth Volunteers in Action Planting Trees",
    category: "gallery",
    url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
    altText: "Youth Volunteers Planting",
    location: "Darbhanga & Madhubani",
    date: "2026",
    isCover: false,
    mediaType: "photo",
    order: 2,
  },

  // Album 5: Shiksha Na Ruke
  {
    key: "gallery-shiksha-cover",
    albumId: "shiksha-na-ruke",
    albumTitle: "SHIKSHA NA RUKE CAMPAIGN",
    title: "School Bags & Stationery Distribution Drive",
    category: "gallery",
    url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
    altText: "Shiksha Na Ruke Campaign",
    location: "Rural Learning Centres",
    date: "2026",
    isCover: true,
    mediaType: "photo",
    order: 1,
  },
  {
    key: "gallery-shiksha-sub-1",
    albumId: "shiksha-na-ruke",
    albumTitle: "SHIKSHA NA RUKE CAMPAIGN",
    title: "Evening Remedial Coaching Class",
    category: "gallery",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    altText: "Remedial Coaching",
    location: "Rural Learning Centres",
    date: "2026",
    isCover: false,
    mediaType: "photo",
    order: 2,
  },

  // Album 6: Vocational Training
  {
    key: "gallery-vocational-cover",
    albumId: "vocational-training",
    albumTitle: "VOCATIONAL TRAINING",
    title: "Women Livelihood Stitching Center",
    category: "gallery",
    url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
    altText: "Women Vocational Sewing Program",
    location: "Women Skill Center",
    date: "2026",
    isCover: true,
    mediaType: "photo",
    order: 1,
  },
  {
    key: "gallery-vocational-sub-1",
    albumId: "vocational-training",
    albumTitle: "VOCATIONAL TRAINING",
    title: "Certification & Toolkit Handover Ceremony",
    category: "gallery",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    altText: "Certification Ceremony",
    location: "Women Skill Center",
    date: "2026",
    isCover: false,
    mediaType: "photo",
    order: 2,
  },
];

export async function seedInitialMedia(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/iwf";
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
    }

    for (const item of INITIAL_MEDIA_ENTRIES) {
      await Media.findOneAndUpdate(
        { key: item.key },
        { ...item },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log(`Successfully seeded ${INITIAL_MEDIA_ENTRIES.length} initial CMS media entries.`);
  } catch (err) {
    console.error("Error seeding initial media:", err);
  }
}

// Allow direct CLI execution: node dist/utils/seedMedia.js
if (process.argv[1]?.endsWith("seedMedia.js") || process.argv[1]?.endsWith("seedMedia.ts")) {
  seedInitialMedia().then(() => {
    mongoose.disconnect();
    process.exit(0);
  });
}
