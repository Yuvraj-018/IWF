import { createFileRoute } from "@tanstack/react-router";
import SustainableRuralDevelopment from "@/Pages/Environment/subpages/SustainableRuralDevelopment";

export const Route = createFileRoute("/programs/environment/sustainable-agriculture")({
  head: () => ({
    meta: [
      { title: "Sustainable Rural Development (SRD) — ISLAH Environment" },
      {
        name: "description",
        content: "Connecting agriculture, natural resources, livelihoods, and rural resilience.",
      },
    ],
  }),
  component: SustainableRuralDevelopment,
});

