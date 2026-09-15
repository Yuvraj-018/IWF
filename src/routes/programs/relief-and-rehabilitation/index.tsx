import { createFileRoute } from "@tanstack/react-router";
import ReliefLanding from "@/Pages/Relief/ReliefLanding";

export const Route = createFileRoute("/programs/relief-and-rehabilitation/")({
  head: () => ({
    meta: [
      { title: "Humanitarian Relief & Rehabilitation — ISLAH Welfare Foundation" },
      {
        name: "description",
        content: "Emergency disaster response, shelter & basic necessities, seasonal relief, and livelihood rehabilitation by ISLAH.",
      },
    ],
  }),
  component: ReliefLanding,
});

