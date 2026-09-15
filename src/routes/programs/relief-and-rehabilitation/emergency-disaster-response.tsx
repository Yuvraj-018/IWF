import { createFileRoute } from "@tanstack/react-router";
import DisasterResponse from "@/Pages/Relief/subpages/DisasterResponse";

export const Route = createFileRoute("/programs/relief-and-rehabilitation/emergency-disaster-response")({
  head: () => ({
    meta: [
      { title: "Emergency Relief & Disaster Response (EDR) — ISLAH Relief" },
      {
        name: "description",
        content: "Immediate humanitarian assistance, food rations, clean water, medical aid, and crisis recovery.",
      },
    ],
  }),
  component: DisasterResponse,
});
