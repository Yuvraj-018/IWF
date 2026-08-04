import { createFileRoute } from "@tanstack/react-router";
import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";

export const Route = createFileRoute("/mentorship-policy")({
  head: () => ({
    meta: [
      { title: "Mentorship Policy - Islah Welfare Foundation" },
      { name: "description", content: "Mentorship program policy of Islah Welfare Foundation." },
    ],
  }),
  component: () => <GenericPolicyPage slug="mentorship-policy" />,
});
