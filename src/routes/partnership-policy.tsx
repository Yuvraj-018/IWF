import { createFileRoute } from "@tanstack/react-router";
import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";

export const Route = createFileRoute("/partnership-policy")({
  head: () => ({
    meta: [
      { title: "Partnership Policy - Islah Welfare Foundation" },
      { name: "description", content: "Partnership and collaboration policy of Islah Welfare Foundation." },
    ],
  }),
  component: () => <GenericPolicyPage slug="partnership-policy" />,
});
