import { createFileRoute } from "@tanstack/react-router";
import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";

export const Route = createFileRoute("/donation-policy")({
  head: () => ({
    meta: [
      { title: "Donation Policy - Islah Welfare Foundation" },
      { name: "description", content: "Donation guidelines and 80G tax benefit policy of Islah Welfare Foundation." },
    ],
  }),
  component: () => <GenericPolicyPage slug="donation-policy" />,
});
