import { createFileRoute } from "@tanstack/react-router";
import EducationLandingPage from "@/Pages/Education/EducationLandingPage";

export const Route = createFileRoute("/programs/education/")({
  head: () => ({
    meta: [
      { title: "Education & Learning - IWF | Islah Welfare Foundation" },
      {
        name: "description",
        content: "Creating pathways for children and young people to learn, discover their potential, develop capabilities, and build a future with greater opportunity.",
      },
    ],
  }),
  component: EducationLandingPage,
});
