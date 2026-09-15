import { createFileRoute } from "@tanstack/react-router";
import GreenVillageCleanCommunity from "@/Pages/Environment/subpages/GreenVillageCleanCommunity";

export const Route = createFileRoute("/programs/environment/green-village-clean-community")({
  head: () => ({
    meta: [
      { title: "Green Village & Clean Community (GCC) — ISLAH Environment" },
      {
        name: "description",
        content: "Promoting cleaner rural settlements, waste segregation, plastic elimination, and community green spaces.",
      },
    ],
  }),
  component: GreenVillageCleanCommunity,
});
