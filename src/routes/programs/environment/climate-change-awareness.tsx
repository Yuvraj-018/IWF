import { createFileRoute } from "@tanstack/react-router";
import EnvironmentalAwareness from "@/Pages/Environment/subpages/EnvironmentalAwareness";

export const Route = createFileRoute("/programs/environment/climate-change-awareness")({
  head: () => ({
    meta: [
      { title: "Environmental Awareness Programme (EAP) — ISLAH Environment" },
      {
        name: "description",
        content: "Grassroots climate literacy, ecological education, and community adaptation.",
      },
    ],
  }),
  component: EnvironmentalAwareness,
});

