import { createFileRoute } from "@tanstack/react-router";
import TechnicalInstitute from "@/Pages/Education/subpages/TechnicalInstitute";

export const Route = createFileRoute("/programs/education/technical-institute")({
  head: () => ({
    meta: [
      { title: "Technical Institute — IWF Education" },
      {
        name: "description",
        content: "Diploma and technical education across IT, electrical, and mechanical fields.",
      },
    ],
  }),
  component: TechnicalInstitute,
});
