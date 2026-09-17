import { createFileRoute } from "@tanstack/react-router";
import GovernancePage from "@/Pages/AboutPage/GovernancePage";

export const Route = createFileRoute("/about_/governance")({
  head: () => ({
    meta: [
      { title: "Governance & Transparency — Islah | Islah Welfare Foundation" },
      { name: "description", content: "Islah operates under a 4-tier governance structure with independent audits, MIS tracking, and full financial transparency. Read about our credibility norms and audit systems." },
    ],
  }),
  component: GovernancePage,
});
