import { createFileRoute } from "@tanstack/react-router";
import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";

export const Route = createFileRoute("/financial-transparency-policy")({
  head: () => ({
    meta: [
      { title: "Financial Transparency Policy - Islah Welfare Foundation" },
      { name: "description", content: "Financial transparency and audit controls policy of Islah Welfare Foundation." },
    ],
  }),
  component: () => <GenericPolicyPage slug="financial-transparency-policy" />,
});
