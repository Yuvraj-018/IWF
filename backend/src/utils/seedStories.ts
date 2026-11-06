import { SuccessStory } from "../models/SuccessStory.js";

export const INITIAL_STORIES = [
  {
    title: "From a Dream to a Bright Future",
    category: "Education",
    personName: "Anjali Kumari",
    village: "Bathiya, Darbhanga",
    state: "Bihar",
    excerpt:
      "Anjali from a small village now excels in her studies and dreams of becoming an engineer after receiving our education kit and remedial tutoring.",
    fullStory:
      "Anjali comes from a family where continuing education beyond middle school was a distant dream due to acute financial distress. Through IWF's Community Learning Centre and annual scholarship assistance, she received dedicated mathematics mentoring, science kits, and digital classes. Today, she consistently ranks first in her high school and is preparing for regional STEM Olympiads with soaring confidence.",
    image: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/islah/stories/anjali_edu.jpg",
    impactMetrics: ["Grade 10 Class Topper", "Full Merit Scholarship", "Aspiring Civil Engineer"],
    featured: true,
    order: 1,
  },
  {
    title: "From Struggle to Self-Reliance",
    category: "Women Empowerment",
    personName: "Farida Khatoon",
    village: "Alinagar",
    state: "Bihar",
    excerpt:
      "Farida joined a self-help group, trained in garment stitching, and now runs her own tailoring business, supporting her family with dignity.",
    fullStory:
      "Struggling as the sole breadwinner for three young children, Farida enrolled in IWF's 6-month certified garment stitching and entrepreneurship workshop. With micro-capital seed support and SHG peer backing, she purchased two sewing machines and opened a local tailoring centre. She now trains eight other village women while generating steady monthly income.",
    image: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/islah/stories/farida_shg.jpg",
    impactMetrics: ["Monthly Income +300%", "Employs 8 Rural Women", "Zero Household Debt"],
    featured: true,
    order: 2,
  },
  {
    title: "From Uncertainty to Sustainable Income",
    category: "Livelihood",
    personName: "Rameshwar Yadav",
    village: "Singhwara",
    state: "Bihar",
    excerpt:
      "Ramesh adopted organic farming practices and increased his income, securing a better future for his family.",
    fullStory:
      "Facing depleted soil fertility and soaring chemical fertiliser costs, Ramesh was on the verge of leasing his ancestral land. After participating in IWF's farmer field school on vermicomposting, multi-cropping, and natural pest repellents, his cultivation expenses plummeted by 45% while crop yield and market rates rose significantly.",
    image: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/islah/stories/ramesh_farmer.jpg",
    impactMetrics: ["Cultivation Cost -45%", "100% Organic Certified", "Year-round Vegetable Cycles"],
    featured: true,
    order: 3,
  },
  {
    title: "Better Health, Brighter Days",
    category: "Healthcare",
    personName: "Mohd. Aslam",
    village: "Keoti",
    state: "Bihar",
    excerpt:
      "Elderly resident Aslam received timely diabetic screening and free prescription medicine at our rural medical camp, preventing severe complications.",
    fullStory:
      "Living miles away from the nearest sub-divisional hospital, Mohd. Aslam had unmonitored chronic diabetes and progressive vision impairment. An IWF mobile medical health camp conducted diagnostics on-site, provided a two-month supply of verified medications, and scheduled home follow-ups by community health workers.",
    image: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/islah/stories/aslam_health.jpg",
    impactMetrics: ["HbA1c Normalised", "Free Monthly Medications", "Telemedicine Support"],
    featured: false,
    order: 4,
  },
];

export async function seedInitialStories(): Promise<void> {
  const count = await SuccessStory.countDocuments();
  if (count > 0) {
    console.log(`ℹ️ [SeedStories] ${count} success stories already exist in DB.`);
    return;
  }

  console.log("🌱 [SeedStories] Seeding initial success stories...");
  await SuccessStory.insertMany(INITIAL_STORIES);
  console.log(`✅ [SeedStories] Seeded ${INITIAL_STORIES.length} success stories successfully.`);
}

