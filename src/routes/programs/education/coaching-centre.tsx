import { createFileRoute } from "@tanstack/react-router";
import CoachingCentre from "@/Pages/Education/subpages/CoachingCentre";

export const Route = createFileRoute("/programs/education/coaching-centre")({
  head: () => ({
    meta: [
      { title: "Coaching Centre (CBCE) — IWF Education" },
      {
        name: "description",
        content: "Academic coaching for board and competitive examinations.",
      },
    ],
  }),
  component: CoachingCentre,
});
