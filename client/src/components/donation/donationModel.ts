import type {
  DocumentationPreference,
  DonationFrequency,
  RecognitionPreference,
} from "@/content/donationContent";
import { DONOR_ORGANISATION } from "@/content/donationContent";

/** Answers held by the Donation & Community Support Form. */
export interface DonationValues {
  // 01 — Contribution
  contributionType: string;
  contributionOther: string;
  supportAreas: string[];
  programmeChoice: string;
  programme: string;
  programmes: string[];
  patientSlug: string;
  amountPreset: string;
  amount: string;
  frequency: DonationFrequency;
  recurringAck: boolean;
  purposeDetails: string;
  // 02 — Donor
  donorCategory: string;
  fullName: string;
  orgName: string;
  orgType: string;
  contactPerson: string;
  designation: string;
  countryCode: string;
  phone: string;
  whatsappCode: string;
  whatsapp: string;
  email: string;
  country: string;
  state: string;
  city: string;
  address: string;
  pin: string;
  // 03 — Receipt & tax
  documentation: DocumentationPreference | "";
  legalName: string;
  pan: string;
  // 05 — Additional
  hearAbout: string;
  comments: string;
  // 06 — Recognition
  recognition: RecognitionPreference | "";
  displayName: string;
  displayOrgName: string;
  logoAuthorised: boolean;
  // 07 — Declarations
  declAccurate: boolean;
  declPolicy: boolean;
  declTax: boolean;
  declIndian: boolean;
  optUpdates: boolean;
}

/** Donor name as entered — organisation name for organisational donors. */
export function donorDisplayName(v: DonationValues) {
  return (v.donorCategory === DONOR_ORGANISATION ? v.orgName : v.fullName).trim();
}
