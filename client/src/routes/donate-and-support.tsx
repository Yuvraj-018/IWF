import { createFileRoute } from "@tanstack/react-router";
import DonateSupportPage from "@/Pages/DonateSupportPage";

export const Route = createFileRoute("/donate-and-support")({
  head: () => ({
    meta: [
      { title: "Donation & Support — ISLAH | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Give with purpose. Support ISLAH's work across education, healthcare, women and youth empowerment, livelihoods, social justice, agriculture, environment and humanitarian relief — one-time, recurring or programme-specific.",
      },
    ],
  }),
  component: DonateSupportPage,
});
