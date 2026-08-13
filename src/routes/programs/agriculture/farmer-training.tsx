import { createFileRoute } from "@tanstack/react-router";
import FarmerTraining from "@/Pages/Agriculture/subpages/FarmerTraining";

export const Route = createFileRoute("/programs/agriculture/farmer-training")({
  head: () => ({
    meta: [
      { title: "Farmer Training & Capacity Building — IWF Agriculture" },
      {
        name: "description",
        content: "Empowering farmers with practical agronomy, agri-tech, and bio-input skills.",
      },
    ],
  }),
  component: FarmerTraining,
});
