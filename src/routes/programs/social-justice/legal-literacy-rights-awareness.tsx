import { createFileRoute } from "@tanstack/react-router";
import LegalLiteracyRightsAwareness from "@/Pages/SocialJustice/subpages/LegalLiteracyRightsAwareness";

export const Route = createFileRoute(
  "/programs/social-justice/legal-literacy-rights-awareness",
)({
  head: () => ({
    meta: [
      {
        title:
          "Legal Literacy & Rights Awareness Programme (LLRA) - IWF | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Know Your Rights. Understand the Law. Access Justice. Practical legal literacy, constitutional rights education, and institutional legal aid referrals for rural communities.",
      },
    ],
  }),
  component: LegalLiteracyRightsAwareness,
});
