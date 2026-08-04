import { createFileRoute } from "@tanstack/react-router";
import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer - Islah Welfare Foundation" },
      { name: "description", content: "General disclaimer notice of Islah Welfare Foundation website." },
    ],
  }),
  component: () => <GenericPolicyPage slug="disclaimer" />,
});
