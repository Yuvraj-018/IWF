import { createFileRoute } from "@tanstack/react-router";
import SchoolKitDistribution from "@/Pages/Education/subpages/SchoolKitDistribution";

export const Route = createFileRoute("/programs/education/school-kit-distribution")({
  head: () => ({
    meta: [
      { title: "School Kit Distribution — IWF Education" },
      {
        name: "description",
        content: "Providing educational kits, stationery, and books to underprivileged students.",
      },
    ],
  }),
  component: SchoolKitDistribution,
});
