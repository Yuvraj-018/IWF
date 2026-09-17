import { createFileRoute } from "@tanstack/react-router";
import CareerGuidance from "@/Pages/Education/subpages/CareerGuidance";

export const Route = createFileRoute("/programs/education/career-guidance")({
  head: () => ({
    meta: [
      {
        title:
          "Career Guidance & Mentorship (CGM) - Islah | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Guiding rural students towards better educational & career opportunities through counselling, academic guidance, and lifelong mentorship.",
      },
    ],
  }),
  component: CareerGuidance,
});
