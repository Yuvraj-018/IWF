import { createFileRoute } from "@tanstack/react-router";
import ClimateChangeAwareness from "@/Pages/Environment/subpages/ClimateChangeAwareness";

export const Route = createFileRoute("/programs/environment/climate-change-awareness")({
  head: () => ({
    meta: [
      { title: "Climate Change Awareness — IWF Environment" },
      {
        name: "description",
        content: "Grassroots climate literacy, renewable energy, and community adaptation.",
      },
    ],
  }),
  component: ClimateChangeAwareness,
});
