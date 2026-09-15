import { createFileRoute } from "@tanstack/react-router";
import DisasterResponse from "@/Pages/Relief/subpages/DisasterResponse";

export const Route = createFileRoute("/programs/relief-and-rehabilitation/disaster-response")({
  head: () => ({
    meta: [
      { title: "Emergency Relief & Disaster Response (EDR) — ISLAH Relief" },
      {
        name: "description",
        content: "Rapid emergency relief, dry food rations, clean drinking water, and crisis assistance.",
      },
    ],
  }),
  component: DisasterResponse,
});
