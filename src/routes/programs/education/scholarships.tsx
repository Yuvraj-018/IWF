import { createFileRoute } from "@tanstack/react-router";
import ScholarshipsPage from "@/Pages/Education/subpages/ScholarshipsPage";

export const Route = createFileRoute("/programs/education/scholarships")({
  head: () => ({
    meta: [
      { title: "Scholarships — IWF Education" },
      {
        name: "description",
        content: "Merit and need-based educational scholarships.",
      },
    ],
  }),
  component: ScholarshipsPage,
});
