import { createFileRoute } from "@tanstack/react-router";
import GreenVillageCleanCommunity from "@/Pages/Environment/subpages/GreenVillageCleanCommunity";

export const Route = createFileRoute("/programs/environment/plastic-free-communities")({
  head: () => ({
    meta: [
      { title: "Green Village & Clean Community (GCC) — ISLAH Environment" },
      {
        name: "description",
        content: "Eliminating single-use plastics and promoting sustainable clean communities.",
      },
    ],
  }),
  component: GreenVillageCleanCommunity,
});

