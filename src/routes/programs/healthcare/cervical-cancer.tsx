import { createFileRoute } from "@tanstack/react-router";
import CervicalCancerPrevention from "@/Pages/Healthcare/subpages/CervicalCancerPrevention";

export const Route = createFileRoute("/programs/healthcare/cervical-cancer")({
  head: () => ({
    meta: [
      { title: "Cervical Cancer Prevention & Awareness — IWF Healthcare" },
      {
        name: "description",
        content:
          "IWF's Cervical Cancer Prevention Programme improves awareness, promotes preventive healthcare, and supports early detection in rural communities.",
      },
    ],
  }),
  component: CervicalCancerPrevention,
});
