import { createFileRoute } from "@tanstack/react-router";
import PublicInterestLitigation from "@/Pages/SocialJustice/subpages/PublicInterestLitigation";

export const Route = createFileRoute(
  "/programs/social-justice/public-interest-strategic-litigation",
)({
  head: () => ({
    meta: [
      {
        title:
          "Public Interest & Strategic Litigation (PISL) - Islah | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Using the Law for Public Good. Creating Change Beyond One Case. Responsible public-interest and strategic litigation to address systemic injustices and promote equality.",
      },
    ],
  }),
  component: PublicInterestLitigation,
});
