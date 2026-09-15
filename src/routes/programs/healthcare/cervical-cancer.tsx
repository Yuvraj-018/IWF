import { createFileRoute } from "@tanstack/react-router";
import CervicalCancerPrevention from "@/Pages/Healthcare/subpages/CervicalCancerPrevention";

export const Route = createFileRoute("/programs/healthcare/cervical-cancer")({
  head: () => ({
    meta: [
      { title: "Cervical Cancer Prevention & Awareness (CCPA) - IWF | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "IWF's Cervical Cancer Prevention & Awareness (CCPA) initiative improves awareness, promotes preventive healthcare, and supports early detection for women in rural communities.",
      },
    ],
  }),
  component: CervicalCancerPrevention,
});
