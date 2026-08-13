import { createFileRoute } from "@tanstack/react-router";
import RATSPage from "@/Pages/Education/subpages/RATSPage";

export const Route = createFileRoute("/programs/education/rats")({
  head: () => ({
    meta: [
      { title: "Rural Academic Talent Search (RATS) — IWF Education" },
      {
        name: "description",
        content: "Identifying and nurturing academic excellence in rural communities.",
      },
    ],
  }),
  component: RATSPage,
});
