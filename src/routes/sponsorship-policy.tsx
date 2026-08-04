import { createFileRoute } from "@tanstack/react-router";
import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";

export const Route = createFileRoute("/sponsorship-policy")({
  head: () => ({
    meta: [
      { title: "Sponsorship Policy - Islah Welfare Foundation" },
      { name: "description", content: "Sponsorship guidelines and policy of Islah Welfare Foundation." },
    ],
  }),
  component: () => <GenericPolicyPage slug="sponsorship-policy" />,
});
