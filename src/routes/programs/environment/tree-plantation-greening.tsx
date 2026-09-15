import { createFileRoute } from "@tanstack/react-router";
import TreePlantationGreening from "@/Pages/Environment/subpages/TreePlantationGreening";

export const Route = createFileRoute("/programs/environment/tree-plantation-greening")({
  head: () => ({
    meta: [
      { title: "Tree Plantation & Community Greening (TPCG) — ISLAH Environment" },
      {
        name: "description",
        content: "Responsible plantation, sapling survival, native biodiversity, and community green spaces.",
      },
    ],
  }),
  component: TreePlantationGreening,
});
