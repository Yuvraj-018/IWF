import { createFileRoute } from "@tanstack/react-router";
import SkillsLanding from "@/Pages/Skills/SkillsLanding";

export const Route = createFileRoute("/programs/skills-development/")({
  head: () => ({
    meta: [
      { title: "Skills, Livelihoods & Entrepreneurship - IWF | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Building Skills. Creating Livelihoods. Enabling Self-Reliance. Practical training, market linkages, and enterprise guidance for rural youth and communities.",
      },
    ],
  }),
  component: SkillsLanding,
});
