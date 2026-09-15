import { createFileRoute } from "@tanstack/react-router";
import FarmerTraining from "@/Pages/Agriculture/subpages/FarmerTraining";

export const Route = createFileRoute("/programs/agriculture/farmer-training")({
  head: () => ({
    meta: [
      {
        title:
          "Farmer Awareness & Training Initiative (FAT) - IWF | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Knowledge for Farmers. Skills for Better Decisions. Awareness for Stronger Livelihoods. Village-level awareness camps, practical workshops, and peer knowledge exchange.",
      },
    ],
  }),
  component: FarmerTraining,
});
