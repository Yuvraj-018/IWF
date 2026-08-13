import { createFileRoute } from "@tanstack/react-router";
import DisasterResponse from "@/Pages/Relief/subpages/DisasterResponse";

export const Route = createFileRoute("/programs/relief-and-rehabilitation/disaster-response")({
  head: () => ({
    meta: [
      { title: "Disaster Response — IWF Relief" },
      {
        name: "description",
        content: "Rapid emergency relief and humanitarian response during natural disasters.",
      },
    ],
  }),
  component: DisasterResponse,
});
