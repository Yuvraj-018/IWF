import { createFileRoute } from "@tanstack/react-router";
import TechnicalVocationalPage from "@/Pages/Education/subpages/TechnicalVocationalPage";

export const Route = createFileRoute(
  "/programs/education/vocational-training-institute"
)({
  head: () => ({
    meta: [
      {
        title:
          "Vocational Training Institute - IWF | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Vocational Training is now part of IWF Technical & Vocational Education and Training (TVET) initiative.",
      },
    ],
  }),
  component: TechnicalVocationalPage,
});
