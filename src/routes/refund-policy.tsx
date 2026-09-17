import { createFileRoute } from "@tanstack/react-router";
import PolicyPage from "@/Pages/PolicyPage";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy - Islah | Islah Welfare Foundation" },
      {
        name: "description",
        content: "Refund and cancellation policy for Islah Welfare Foundation donations.",
      },
    ],
  }),
  component: () => <PolicyPage slug="refund-policy" />,
});
