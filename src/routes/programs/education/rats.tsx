import { createFileRoute } from "@tanstack/react-router";
import AcademicPathwaysPage from "@/Pages/Education/subpages/AcademicPathwaysPage";

export const Route = createFileRoute("/programs/education/rats")({
  head: () => ({
    meta: [
      {
        title:
          "Rural Academic Talent Search (RATS) - Islah | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "RATS is part of Islah Academic Pathways & Talent Development (APTD) program.",
      },
    ],
  }),
  component: AcademicPathwaysPage,
});
