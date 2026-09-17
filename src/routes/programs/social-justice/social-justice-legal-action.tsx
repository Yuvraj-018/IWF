import { createFileRoute } from "@tanstack/react-router";
import SocialJusticeLegalAction from "@/Pages/SocialJustice/subpages/SocialJusticeLegalAction";

export const Route = createFileRoute(
  "/programs/social-justice/social-justice-legal-action",
)({
  head: () => ({
    meta: [
      {
        title:
          "Social Justice Legal Action (SJLA) - Islah | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "From Injustice to Action. From Action to Justice. Supporting lawful legal intervention and access to judicial remedies for genuine rights violations and social injustice.",
      },
    ],
  }),
  component: SocialJusticeLegalAction,
});
