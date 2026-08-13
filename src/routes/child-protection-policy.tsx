import { createFileRoute } from "@tanstack/react-router";
import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";

export const Route = createFileRoute("/child-protection-policy")({
  head: () => ({
    meta: [
      { title: "Child Protection & Safeguarding Policy - IWF" },
      { name: "description", content: "Child protection and safeguarding policy of Islah Welfare Foundation." },
    ],
  }),
  component: () => <GenericPolicyPage slug="child-protection-policy" />,
});
