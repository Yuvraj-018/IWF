import { createFileRoute } from "@tanstack/react-router";
import FarmerLivelihood from "@/Pages/Agriculture/subpages/FarmerLivelihood";

export const Route = createFileRoute("/programs/agriculture/farmer-livelihood")({
  head: () => ({
    meta: [
      { title: "Farmer Livelihood & FPO — IWF Agriculture" },
      {
        name: "description",
        content: "Farmer Producer Organizations, cold storage, and direct market linkage.",
      },
    ],
  }),
  component: FarmerLivelihood,
});
