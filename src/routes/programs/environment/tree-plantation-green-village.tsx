import { createFileRoute } from "@tanstack/react-router";
import TreePlantationGreening from "@/Pages/Environment/subpages/TreePlantationGreening";

export const Route = createFileRoute("/programs/environment/tree-plantation-green-village")({
  head: () => ({
    meta: [
      { title: "Tree Plantation & Community Greening (TPCG) — ISLAH Environment" },
      {
        name: "description",
        content: "Community tree plantation, sapling survival care, native greening drives.",
      },
    ],
  }),
  component: TreePlantationGreening,
});
