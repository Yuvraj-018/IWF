import { createFileRoute } from "@tanstack/react-router";
import FarmerLivelihood from "@/Pages/Agriculture/subpages/FarmerLivelihood";

export const Route = createFileRoute("/programs/agriculture/farmer-livelihood")({
  head: () => ({
    meta: [
      { title: "Farmer Livelihood & Income Enhancement (FLI) — ISLAH Agriculture" },
      {
        name: "description",
        content: "Livelihood diversification, agriculture-allied activities, value addition, and rural micro-enterprise support.",
      },
    ],
  }),
  component: FarmerLivelihood,
});
