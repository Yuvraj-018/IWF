import patient1Img from "@/assets/patient-1.jpg";
import patient2Img from "@/assets/patient-2.jpg";
import patient3Img from "@/assets/patient-3.jpg";
import patient4Img from "@/assets/patient-4.jpg";

export const CLOUDFLARE_R2_PUBLIC_URL = "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev";

export const PATIENT_IMAGES = {
  patient1: `${CLOUDFLARE_R2_PUBLIC_URL}/patients/patient-1.jpg`,
  patient2: `${CLOUDFLARE_R2_PUBLIC_URL}/patients/patient-2.jpg`,
  patient3: `${CLOUDFLARE_R2_PUBLIC_URL}/patients/patient-3.jpg`,
  patient4: `${CLOUDFLARE_R2_PUBLIC_URL}/patients/patient-4.jpg`,
};

// ─── Types ────────────────────────────────────────────────────────────────────

export type PatientCondition = "Critical" | "Serious" | "Stable" | "Recovering" | "Discharged";

export type PatientDocument = {
  label: string;
  type: "admission" | "income" | "identity" | "medical" | "prescription";
  verified: boolean;
};

export type DonationEntry = {
  donor: string; // anonymized, e.g. "A donor from Delhi"
  amount: number;
  date: string; // ISO date
  message?: string;
};

export type PatientUpdate = {
  date: string; // ISO date
  title: string;
  text: string;
  type: "admission" | "surgery" | "treatment" | "progress" | "discharge" | "funding";
};

export type CostBreakdown = {
  label: string;
  amount: number;
};

export type Patient = {
  id: number;
  slug: string;
  name: string;
  age: number;
  gender: string;
  disease: string;
  diagnosis?: string; // layperson-friendly explanation
  hospital: string;
  hospitalAddress?: string;
  ward?: string; // e.g. "ICU Ward 3"
  admissionDate: string; // ISO date
  condition: PatientCondition;
  urgent: boolean;
  image: string;

  // Financials
  neededAmount: number;
  raisedAmount: number;
  donorsCount: number;
  costBreakdown: CostBreakdown[];

  // Transparency
  verificationId: string; // Islah case reference e.g. "Islah-CLS-2026-001"
  verifiedBy: string;
  verificationDate: string;
  documents: PatientDocument[];

  // Story & narrative
  story: string[]; // paragraphs
  familyBackground?: string;

  // Timeline
  updates: PatientUpdate[];
  donationHistory: DonationEntry[];
};

// ─── Data ────────────────────────────────────────────────────────────────────

export const URGENT_PATIENTS: Patient[] = [];
