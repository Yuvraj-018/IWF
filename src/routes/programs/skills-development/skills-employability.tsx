import { createFileRoute } from "@tanstack/react-router";
import SkillsEmployability from "@/Pages/Skills/subpages/SkillsEmployability";

export const Route = createFileRoute("/programs/skills-development/skills-employability")({
  head: () => ({
    meta: [
      {
        title: "Skills & Employability Programme (SEP) - IWF | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Building Skills. Creating Opportunity. Enabling Sustainable Livelihoods. Market-relevant technical, digital, and workplace capabilities for rural youth and communities.",
      },
    ],
  }),
  component: SkillsEmployability,
});
