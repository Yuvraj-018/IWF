import { createFileRoute } from "@tanstack/react-router";
import ScholarshipsPage from "@/Pages/Education/subpages/ScholarshipsPage";

export const Route = createFileRoute("/programs/education/scholarships")({
  head: () => ({
    meta: [
      {
        title:
          "Scholarships for Higher Education (SHE) - IWF | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Supporting meritorious and financially needy students in rural areas to pursue secondary, undergraduate, and higher education with dignity and confidence.",
      },
    ],
  }),
  component: ScholarshipsPage,
});
