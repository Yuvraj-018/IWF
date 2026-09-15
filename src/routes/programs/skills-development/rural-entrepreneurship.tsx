import { createFileRoute } from "@tanstack/react-router";
import RuralEntrepreneurship from "@/Pages/Skills/subpages/RuralEntrepreneurship";

export const Route = createFileRoute("/programs/skills-development/rural-entrepreneurship")({
  head: () => ({
    meta: [
      {
        title: "Rural Entrepreneurship Initiative (REI) - IWF | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Local Ideas. Local Enterprise. Sustainable Rural Growth. Promoting grassroots entrepreneurship, enterprise planning, and incubation for rural youth and communities.",
      },
    ],
  }),
  component: RuralEntrepreneurship,
});
