import { createFileRoute } from "@tanstack/react-router";
import TreePlantation from "@/Pages/Environment/subpages/TreePlantation";

export const Route = createFileRoute("/programs/environment/tree-plantation-green-village")({
  head: () => ({
    meta: [
      { title: "Tree Plantation & Green Village — IWF Environment" },
      {
        name: "description",
        content: "Mass plantation drives and Green Village community ecological initiatives.",
      },
    ],
  }),
  component: TreePlantation,
});
