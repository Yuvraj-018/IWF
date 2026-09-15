import { createFileRoute } from "@tanstack/react-router";
import SelfHelpGroups from "@/Pages/Women/subpages/SelfHelpGroups";

export const Route = createFileRoute("/programs/women-empowerment/self-help-groups")({
  head: () => ({
    meta: [
      {
        title:
          "Self-Help Group Capacity Building (SHG) - IWF | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Strengthening Groups. Building Confidence. Creating Collective Opportunity. IWF provides governance, financial literacy, and enterprise support to women-led Self-Help Groups.",
      },
    ],
  }),
  component: SelfHelpGroups,
});
