import { Publication } from "../models/Publication.js";

export const INITIAL_PUBLICATIONS = [
  {
    title: "Annual Governance & Program Report 2023-24",
    type: "Annual Reports",
    authors: "Research & Monitoring Directorate",
    date: "October 15, 2024",
    summary:
      "Comprehensive multi-sector evaluation covering 50,000+ beneficiaries across education, healthcare, and rural livelihoods.",
    coverUrl: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/islah/publications/annual_report_cover.jpg",
    downloadUrl: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/islah/publications/annual_report_2023_24.pdf",
    fileSize: "4.8 MB",
    pages: "48 Pages",
    featured: true,
    order: 1,
  },
  {
    title: "Q2 2024 Newsletter — Spring of Progress",
    type: "Newsletters",
    authors: "Islah Editorial Desk",
    date: "June 30, 2024",
    summary:
      "Highlights of our expanding initiatives in primary education, solar learning centres, rural health camps, and women micro-entrepreneurship.",
    coverUrl: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/islah/publications/newsletter_q2_2024.jpg",
    downloadUrl: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/islah/publications/newsletter_q2_2024.pdf",
    fileSize: "5.4 MB",
    pages: "16 Pages",
    featured: false,
    order: 2,
  },
  {
    title: "Education Program Longitudinal Impact Evaluation",
    type: "Research Papers",
    authors: "Education Advisory Cell, IWF",
    date: "September 10, 2024",
    summary:
      "Systematic assessment of remedial learning centres and secondary scholarship distributions in rural clusters.",
    coverUrl: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/islah/publications/edu_evaluation.jpg",
    downloadUrl: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/islah/publications/edu_evaluation.pdf",
    fileSize: "3.2 MB",
    pages: "32 Pages",
    featured: true,
    order: 3,
  },
  {
    title: "Q1 2024 Newsletter — Winter Relief & Education",
    type: "Newsletters",
    authors: "Islah Editorial Desk",
    date: "March 31, 2024",
    summary:
      "Quarterly review of winter blanket distributions, scholarship kit disbursements, new healthcare partnerships, and community training sessions.",
    coverUrl: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/islah/publications/newsletter_q1_2024.jpg",
    downloadUrl: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/islah/publications/newsletter_q1_2024.pdf",
    fileSize: "4.1 MB",
    pages: "14 Pages",
    featured: false,
    order: 4,
  },
  {
    title: "Socio-Economic Mobility through Rural Women SHGs",
    type: "Research Papers",
    authors: "Livelihoods & Micro-Enterprise Team",
    date: "August 20, 2024",
    summary:
      "A rigorous primary survey measuring household income changes and financial decision-making agency among 1,200 rural women.",
    coverUrl: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/islah/publications/shg_study.jpg",
    downloadUrl: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/islah/publications/shg_study.pdf",
    fileSize: "6.2 MB",
    pages: "54 Pages",
    featured: true,
    order: 5,
  },
  {
    title: "Policy Blueprint: Scalable Rural Sanitation & Water Security",
    type: "Policy Briefs",
    authors: "Community Infrastructure Directorate",
    date: "July 30, 2024",
    summary:
      "Recommendations for block and district authorities on community-managed groundwater purification plants and sanitary infrastructure.",
    coverUrl: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/islah/publications/sanitation_policy.jpg",
    downloadUrl: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/islah/publications/sanitation_policy.pdf",
    fileSize: "2.8 MB",
    pages: "20 Pages",
    featured: false,
    order: 6,
  },
];

export async function seedInitialPublications(): Promise<void> {
  const count = await Publication.countDocuments();
  if (count > 0) {
    console.log(`ℹ️ [SeedPublications] ${count} publications already exist in DB.`);
    return;
  }

  console.log("🌱 [SeedPublications] Seeding initial publications...");
  await Publication.insertMany(INITIAL_PUBLICATIONS);
  console.log(`✅ [SeedPublications] Seeded ${INITIAL_PUBLICATIONS.length} publications successfully.`);
}

