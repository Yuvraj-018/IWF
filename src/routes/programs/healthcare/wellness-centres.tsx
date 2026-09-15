import { createFileRoute } from "@tanstack/react-router";
import WellnessCentres from "@/Pages/Healthcare/subpages/WellnessCentres";

export const Route = createFileRoute("/programs/healthcare/wellness-centres")({
  head: () => ({
    meta: [
      { title: "Rural Healthcare & Wellness Centres (RHWC) - IWF | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "IWF establishes community-based Rural Healthcare & Wellness Centres (RHWC) to provide accessible, preventive, and quality healthcare in rural India.",
      },
    ],
  }),
  component: WellnessCentres,
});
