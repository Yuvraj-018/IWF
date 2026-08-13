import { createFileRoute } from "@tanstack/react-router";
import WaterConservation from "@/Pages/Agriculture/subpages/WaterConservation";

export const Route = createFileRoute("/programs/agriculture/water-conservation")({
  head: () => ({
    meta: [
      { title: "Water Conservation & Irrigation — IWF Agriculture" },
      {
        name: "description",
        content: "Micro-irrigation, rainwater harvesting ponds, and groundwater recharge.",
      },
    ],
  }),
  component: WaterConservation,
});
