import { createFileRoute } from "@tanstack/react-router";
import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";

export const Route = createFileRoute("/volunteer-policy")({
  head: () => ({
    meta: [
      { title: "Volunteer Policy - Islah Welfare Foundation" },
      { name: "description", content: "Volunteer guidelines and policy of Islah Welfare Foundation." },
    ],
  }),
  component: () => <GenericPolicyPage slug="volunteer-policy" />,
});
