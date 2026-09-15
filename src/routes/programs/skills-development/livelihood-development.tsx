import { createFileRoute } from "@tanstack/react-router";
import LivelihoodDevelopment from "@/Pages/Skills/subpages/LivelihoodDevelopment";

export const Route = createFileRoute("/programs/skills-development/livelihood-development")({
  head: () => ({
    meta: [
      {
        title: "Livelihood Development Initiative (LDI) - IWF | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Creating Livelihoods. Strengthening Families. Building Self-Reliance. Supporting practical income pathways, market linkages, and self-employment for rural communities.",
      },
    ],
  }),
  component: LivelihoodDevelopment,
});
