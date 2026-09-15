import { createFileRoute } from "@tanstack/react-router";
import EnvironmentalAwareness from "@/Pages/Environment/subpages/EnvironmentalAwareness";

export const Route = createFileRoute("/programs/environment/environmental-awareness")({
  head: () => ({
    meta: [
      { title: "Environmental Awareness Programme (EAP) — ISLAH Environment" },
      {
        name: "description",
        content: "Building environmental literacy, climate awareness, and community responsibility in rural communities.",
      },
    ],
  }),
  component: EnvironmentalAwareness,
});
