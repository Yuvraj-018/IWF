import { createFileRoute } from "@tanstack/react-router";
import GrievanceAccountability from "@/Pages/SocialJustice/subpages/GrievanceAccountability";

export const Route = createFileRoute(
  "/programs/social-justice/grievance-accountability",
)({
  head: () => ({
    meta: [
      {
        title:
          "Grievance & Accountability Initiative (GAI) - IWF | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Listen to Concerns. Strengthen Accountability. Promote Justice. Assisting citizens and communities in documenting concerns, engaging authorities, and securing administrative accountability.",
      },
    ],
  }),
  component: GrievanceAccountability,
});
