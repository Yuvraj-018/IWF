import { createFileRoute } from "@tanstack/react-router";
import DonatePage from "@/Pages/DonatePage";
import type { DonateSearch } from "@/content/donationContent";

const str = (v: unknown) =>
  typeof v === "string" || typeof v === "number" ? String(v) : undefined;

export const Route = createFileRoute("/donate")({
  validateSearch: (search: Record<string, unknown>): DonateSearch => ({
    patientId: str(search.patientId),
    patient: str(search.patient),
    name: str(search.name),
    amount: str(search.amount),
    financialType: str(search.financialType),
    program: str(search.program),
    initiative: str(search.initiative),
    cause: str(search.cause),
    type: str(search.type),
    campaign: str(search.campaign),
  }),
  head: () => ({
    meta: [
      { title: "Donation Form — ISLAH | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Make a one-time or recurring donation to ISLAH Welfare Foundation and choose the programme area you wish to support — education, healthcare, empowerment, livelihoods, environment and humanitarian relief.",
      },
    ],
  }),
  component: DonatePage,
});
