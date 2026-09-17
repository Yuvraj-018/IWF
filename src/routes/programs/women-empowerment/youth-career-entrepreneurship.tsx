import { createFileRoute } from "@tanstack/react-router";
import YouthCareerEntrepreneurship from "@/Pages/Women/subpages/YouthCareerEntrepreneurship";

export const Route = createFileRoute(
  "/programs/women-empowerment/youth-career-entrepreneurship"
)({
  head: () => ({
    meta: [
      {
        title:
          "Youth Career & Entrepreneurship Development (YCED) - Islah | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Discover Direction. Build Capability. Create Opportunity. Islah's Youth Career & Entrepreneurship Development programme helps rural youth with career exploration, mentorship, and enterprise skills.",
      },
    ],
  }),
  component: YouthCareerEntrepreneurship,
});
