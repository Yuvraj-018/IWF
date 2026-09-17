import { createFileRoute } from "@tanstack/react-router";
import WellnessCentres from "@/Pages/Healthcare/subpages/WellnessCentres";

export const Route = createFileRoute("/programs/healthcare/wellness-centres")({
  head: () => ({
    meta: [
      { title: "Rural Healthcare & Wellness Centres (RHWC) - Islah | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Islah establishes community-based Rural Healthcare & Wellness Centres (RHWC) to provide accessible, preventive, and quality healthcare in rural India.",
      },
    ],
  }),
  component: WellnessCentres,
});
