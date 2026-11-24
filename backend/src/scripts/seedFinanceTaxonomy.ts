import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { WorkArea } from "../models/WorkArea.js";
import { ExpenseHead } from "../models/ExpenseHead.js";
import { ensureChartOfAccounts } from "../services/accountingService.js";

dotenv.config();

export const SEED_WORK_AREAS = [
  {
    code: "EDU",
    name: "Education & Learning",
    financialActivityExample: "School supplies, learning materials, student support",
    sortOrder: 1,
    isActive: true,
  },
  {
    code: "HLT",
    name: "Healthcare & Well-being",
    financialActivityExample: "Medical assistance, medicines, healthcare camps",
    sortOrder: 2,
    isActive: true,
  },
  {
    code: "WYE",
    name: "Women & Youth Empowerment",
    financialActivityExample: "Training, workshops, empowerment activities",
    sortOrder: 3,
    isActive: true,
  },
  {
    code: "SLE",
    name: "Skills, Livelihoods & Entrepreneurship",
    financialActivityExample: "Vocational training, tools, livelihood support",
    sortOrder: 4,
    isActive: true,
  },
  {
    code: "SJL",
    name: "Social Justice & Legal Empowerment",
    financialActivityExample: "Legal awareness, eligible legal support",
    sortOrder: 5,
    isActive: true,
  },
  {
    code: "AGR",
    name: "Agriculture & Rural Livelihoods",
    financialActivityExample: "Seeds, farming support, agricultural training",
    sortOrder: 6,
    isActive: true,
  },
  {
    code: "ENV",
    name: "Environment & Sustainable Development",
    financialActivityExample: "Plantation, waste management, environmental activities",
    sortOrder: 7,
    isActive: true,
  },
  {
    code: "HRR",
    name: "Humanitarian Relief & Rehabilitation",
    financialActivityExample: "Emergency relief, food, shelter, rehabilitation",
    sortOrder: 8,
    isActive: true,
  },
];

export const SEED_EXPENSE_HEADS = [
  {
    code: "medical_support",
    name: "Medical Support",
    group: "Programme" as const,
    isActive: true,
  },
  {
    code: "programme_activities",
    name: "Programme Activities",
    group: "Programme" as const,
    isActive: true,
  },
  {
    code: "administration",
    name: "Administration",
    group: "Administrative" as const,
    isActive: true,
  },
  {
    code: "travel_logistics",
    name: "Travel & Logistics",
    group: "Operational" as const,
    isActive: true,
  },
  {
    code: "emergency_relief",
    name: "Emergency Relief",
    group: "Humanitarian" as const,
    isActive: true,
  },
  {
    code: "educational_supplies",
    name: "Educational Supplies",
    group: "Programme" as const,
    isActive: true,
  },
  {
    code: "capital_equipment",
    name: "Capital Equipment",
    group: "Other" as const,
    isActive: true,
  },
  {
    code: "staff_expenses",
    name: "Staff Expenses",
    group: "Administrative" as const,
    isActive: true,
  },
  {
    code: "other_authorised_expenses",
    name: "Other Authorised Expenses",
    group: "Other" as const,
    isActive: true,
  },
  // Blueprint organisational and capital heads (ADE, ORU, CTE, PCF, BGC, CPE, OCA).
  { code: "office_rent_utilities", name: "Office Rent & Utilities", group: "Administrative" as const, isActive: true },
  { code: "communication_technology", name: "Communication & Technology", group: "Administrative" as const, isActive: true },
  { code: "professional_fees", name: "Professional & Consultancy Fees", group: "Administrative" as const, isActive: true },
  { code: "bank_gateway_charges", name: "Bank & Payment Gateway Charges", group: "Administrative" as const, isActive: true },
  { code: "capital_expenditure", name: "Capital Expenditure", group: "Other" as const, isActive: true },
  { code: "other_capital_assets", name: "Other Capital Assets", group: "Other" as const, isActive: true },
];

export async function seedFinanceTaxonomy(): Promise<void> {
  console.log("🌱 Starting Finance Master Taxonomy Seeding...");
  await connectDB();

  // 1. Seed Work Areas
  console.log("-> Seeding 8 Master Work Areas...");
  for (const area of SEED_WORK_AREAS) {
    await WorkArea.findOneAndUpdate(
      { code: area.code },
      { $set: area },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    );
  }
  console.log(`✓ 8 Work Areas verified/upserted.`);

  // 2. Seed Expense Heads
  console.log("-> Seeding Master Expense Heads...");
  for (const head of SEED_EXPENSE_HEADS) {
    await ExpenseHead.findOneAndUpdate(
      { code: head.code },
      { $set: head },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    );
  }
  console.log(`✓ ${SEED_EXPENSE_HEADS.length} Expense Heads verified/upserted.`);

  // 3. Chart of Accounts (system accounts only). Bank and cash accounts are never
  // seeded with made-up details: finance staff add the real ones in the CMS.
  console.log("-> Seeding Chart of Accounts...");
  await ensureChartOfAccounts();
  console.log("✓ Chart of Accounts verified/upserted.");

  console.log("🎉 Finance Master Taxonomy Seeding completed successfully!");
}

// Direct CLI execution
if (process.argv[1]?.includes("seedFinanceTaxonomy")) {
  seedFinanceTaxonomy()
    .then(() => {
      mongoose.disconnect();
      process.exit(0);
    })
    .catch((err) => {
      console.error("❌ Seeding failed:", err);
      mongoose.disconnect();
      process.exit(1);
    });
}
