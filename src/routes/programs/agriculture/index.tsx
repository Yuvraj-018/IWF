import { createFileRoute } from "@tanstack/react-router";
import AgricultureLanding from "@/Pages/Agriculture/AgricultureLanding";

export const Route = createFileRoute("/programs/agriculture/")({
  head: () => ({
    meta: [
      { title: "Agriculture & Rural Livelihoods - IWF | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Strengthening Rural Economies. Supporting Farmers. Building Sustainable Livelihoods. Sustainable agriculture, farmer training, organic farming, and livelihood diversification for rural households.",
      },
    ],
  }),
  component: AgricultureLanding,
});
