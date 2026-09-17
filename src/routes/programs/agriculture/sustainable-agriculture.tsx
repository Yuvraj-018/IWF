import { createFileRoute } from "@tanstack/react-router";
import SustainableAgricultureAgri from "@/Pages/Agriculture/subpages/SustainableAgriculture";

export const Route = createFileRoute("/programs/agriculture/sustainable-agriculture")({
  head: () => ({
    meta: [
      {
        title:
          "Sustainable Agriculture Development Programme (SAD) - Islah | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Growing Responsibly. Farming Sustainably. Building Resilient Rural Livelihoods. Capacity building, soil health, water stewardship, and climate-resilient farming.",
      },
    ],
  }),
  component: SustainableAgricultureAgri,
});
