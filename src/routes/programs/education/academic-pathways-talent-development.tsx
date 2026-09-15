import { createFileRoute } from "@tanstack/react-router";
import AcademicPathwaysPage from "@/Pages/Education/subpages/AcademicPathwaysPage";

export const Route = createFileRoute(
  "/programs/education/academic-pathways-talent-development"
)({
  head: () => ({
    meta: [
      {
        title:
          "Academic Pathways & Talent Development (APTD) - IWF | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Identifying, nurturing, and guiding rural students toward academic excellence and competitive career opportunities through RATS and CES.",
      },
    ],
  }),
  component: AcademicPathwaysPage,
});
