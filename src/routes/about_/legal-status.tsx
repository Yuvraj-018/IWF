import { createFileRoute } from "@tanstack/react-router";
import LegalStatusPage from "@/Pages/AboutPage/LegalStatusPage";

export const Route = createFileRoute("/about_/legal-status")({
  head: () => ({
    meta: [
      { title: "Legal Status & Registration — Islah | Islah Welfare Foundation" },
      { name: "description", content: "Islah is a registered public charitable trust with 12A, 80G, FCRA, and CSR eligibility. Donors receive 50% tax deduction. View our official registration details and bank accounts." },
    ],
  }),
  component: LegalStatusPage,
});
