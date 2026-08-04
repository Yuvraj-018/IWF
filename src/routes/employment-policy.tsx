import { createFileRoute } from "@tanstack/react-router";
import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";

export const Route = createFileRoute("/employment-policy")({
  head: () => ({
    meta: [
      { title: "Employment Policy - Islah Welfare Foundation" },
      { name: "description", content: "Equal opportunity employment policy of Islah Welfare Foundation." },
    ],
  }),
  component: () => <GenericPolicyPage slug="employment-policy" />,
});
