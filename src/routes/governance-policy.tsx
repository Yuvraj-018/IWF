import { createFileRoute } from "@tanstack/react-router";
import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";

export const Route = createFileRoute("/governance-policy")({
  head: () => ({
    meta: [
      { title: "Governance Policy - Islah Welfare Foundation" },
      { name: "description", content: "Governance framework and principles of Islah Welfare Foundation." },
    ],
  }),
  component: () => <GenericPolicyPage slug="governance-policy" />,
});
