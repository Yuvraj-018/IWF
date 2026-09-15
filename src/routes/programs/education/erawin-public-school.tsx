import { createFileRoute } from "@tanstack/react-router";
import PrimarySchoolPage from "@/Pages/Education/subpages/PrimarySchoolPage";

export const Route = createFileRoute("/programs/education/erawin-public-school")({
  head: () => ({
    meta: [
      { title: "Primary School (EPS) - IWF | Islah Welfare Foundation" },
      {
        name: "description",
        content: "Building strong foundations for rural education through Erawin Public School (EPS).",
      },
    ],
  }),
  component: PrimarySchoolPage,
});
