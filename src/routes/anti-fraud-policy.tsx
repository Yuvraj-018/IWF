import { createFileRoute } from "@tanstack/react-router";
import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";

export const Route = createFileRoute("/anti-fraud-policy")({
  head: () => ({
    meta: [
      { title: "Anti-Fraud & Anti-Corruption Policy - IWF" },
      { name: "description", content: "Anti-fraud and anti-corruption policy of Islah Welfare Foundation." },
    ],
  }),
  component: () => <GenericPolicyPage slug="anti-fraud-policy" />,
});
