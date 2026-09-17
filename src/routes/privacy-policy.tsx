import { createFileRoute } from "@tanstack/react-router";
import PolicyPage from "@/Pages/PolicyPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy - Islah | Islah Welfare Foundation" },
      {
        name: "description",
        content: "Privacy Policy for Islah Welfare Foundation website users.",
      },
    ],
  }),
  component: () => <PolicyPage slug="privacy-policy" />,
});
