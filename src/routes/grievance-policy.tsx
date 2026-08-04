import { createFileRoute } from "@tanstack/react-router";
import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";

export const Route = createFileRoute("/grievance-policy")({
  head: () => ({
    meta: [
      { title: "Grievance Redressal Policy - Islah Welfare Foundation" },
      { name: "description", content: "Grievance redressal mechanism and policy of Islah Welfare Foundation." },
    ],
  }),
  component: () => <GenericPolicyPage slug="grievance-policy" />,
});
