import { createFileRoute } from "@tanstack/react-router";
import TechnicalVocationalPage from "@/Pages/Education/subpages/TechnicalVocationalPage";

export const Route = createFileRoute(
  "/programs/education/technical-institute"
)({
  head: () => ({
    meta: [
      {
        title:
          "Technical & Vocational Education and Training (TVET) - Islah | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Technical Institute is now part of Islah Technical & Vocational Education and Training (TVET) initiative.",
      },
    ],
  }),
  component: TechnicalVocationalPage,
});
