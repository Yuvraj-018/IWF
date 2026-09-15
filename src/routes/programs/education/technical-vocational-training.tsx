import { createFileRoute } from "@tanstack/react-router";
import TechnicalVocationalPage from "@/Pages/Education/subpages/TechnicalVocationalPage";

export const Route = createFileRoute(
  "/programs/education/technical-vocational-training"
)({
  head: () => ({
    meta: [
      {
        title:
          "Technical & Vocational Education and Training (TVET) - IWF | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Building practical capabilities that help people work, earn, create and grow through employment-oriented technical and vocational training.",
      },
    ],
  }),
  component: TechnicalVocationalPage,
});
