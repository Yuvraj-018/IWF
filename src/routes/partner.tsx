import { createFileRoute } from "@tanstack/react-router";
import PartnerPage from "@/Pages/PartnerPage";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Partner With Us — ISLAH | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Collaborate with ISLAH Welfare Foundation. Explore corporate CSR, institutional partnerships, and implementation programs across rural education, health, and livelihood.",
      },
    ],
  }),
  component: PartnerPage,
});
