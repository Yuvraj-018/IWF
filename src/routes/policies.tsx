import { createFileRoute } from "@tanstack/react-router";
import MasterPoliciesPage from "@/Pages/Policies/MasterPoliciesPage";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "Organizational Policies Directory - Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Complete list of official policies, governance standards, legal disclosures, and operational frameworks of Islah Welfare Foundation.",
      },
    ],
  }),
  component: () => <MasterPoliciesPage />,
});
