import { createFileRoute } from "@tanstack/react-router";
import SelfHelpGroups from "@/Pages/Women/subpages/SelfHelpGroups";

export const Route = createFileRoute("/programs/women-empowerment/self-help-groups")({
  head: () => ({
    meta: [
      { title: "Self-Help Groups (SHG) — IWF Women Empowerment" },
      {
        name: "description",
        content: "Forming and strengthening women-led savings and credit collectives.",
      },
    ],
  }),
  component: SelfHelpGroups,
});
