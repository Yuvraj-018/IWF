import { createFileRoute } from "@tanstack/react-router";
import SustainableRuralDevelopment from "@/Pages/Environment/subpages/SustainableRuralDevelopment";

export const Route = createFileRoute("/programs/environment/sustainable-rural-development")({
  head: () => ({
    meta: [
      { title: "Sustainable Rural Development (SRD) — ISLAH Environment" },
      {
        name: "description",
        content: "People, resources, livelihoods, and sustainability: an umbrella framework for rural ecological resilience.",
      },
    ],
  }),
  component: SustainableRuralDevelopment,
});
