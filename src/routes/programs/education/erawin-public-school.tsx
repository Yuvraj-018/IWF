import { createFileRoute } from "@tanstack/react-router";
import ErawinPublicSchool from "@/Pages/Education/subpages/ErawinPublicSchool";

export const Route = createFileRoute("/programs/education/erawin-public-school")({
  head: () => ({
    meta: [
      { title: "Erawin Public School — IWF Education" },
      {
        name: "description",
        content: "Comprehensive modern education rooted in ethics for rural children.",
      },
    ],
  }),
  component: ErawinPublicSchool,
});
