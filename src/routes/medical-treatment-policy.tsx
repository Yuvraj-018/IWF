import { createFileRoute } from "@tanstack/react-router";
import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";

export const Route = createFileRoute("/medical-treatment-policy")({
  head: () => ({
    meta: [
      { title: "Fundraising for Critical Medical Treatment Policy - IWF" },
      { name: "description", content: "Policy governing critical medical treatment fundraising campaigns." },
    ],
  }),
  component: () => <GenericPolicyPage slug="medical-treatment-policy" />,
});
