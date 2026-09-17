import { createFileRoute } from "@tanstack/react-router";
import PrimarySchoolPage from "@/Pages/Education/subpages/PrimarySchoolPage";

export const Route = createFileRoute("/programs/education/primary-school")({
  head: () => ({
    meta: [
      { title: "Primary School (EPS) - Islah | Islah Welfare Foundation" },
      {
        name: "description",
        content: "Building strong foundations for rural education and a brighter tomorrow through Erawin Public School (EPS) in Darbhanga, Bihar.",
      },
    ],
  }),
  component: PrimarySchoolPage,
});
