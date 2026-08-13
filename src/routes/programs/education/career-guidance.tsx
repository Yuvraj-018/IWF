import { createFileRoute } from "@tanstack/react-router";
import CareerGuidance from "@/Pages/Education/subpages/CareerGuidance";

export const Route = createFileRoute("/programs/education/career-guidance")({
  head: () => ({
    meta: [
      { title: "Career Guidance (CTAG) — IWF Education" },
      {
        name: "description",
        content: "Career counselling, mentorship, and guidance for rural youth.",
      },
    ],
  }),
  component: CareerGuidance,
});
