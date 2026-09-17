import { createFileRoute } from "@tanstack/react-router";
import PolicyPage from "@/Pages/PolicyPage";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions - Islah | Islah Welfare Foundation" },
      {
        name: "description",
        content: "Terms and conditions for using the Islah Welfare Foundation website.",
      },
    ],
  }),
  component: () => <PolicyPage slug="terms-and-conditions" />,
});
