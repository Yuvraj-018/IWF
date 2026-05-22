import { createFileRoute } from "@tanstack/react-router";
import WellnessCentres from "@/Pages/Healthcare/subpages/WellnessCentres";

export const Route = createFileRoute("/programs/healthcare/wellness-centres")({
  head: () => ({
    meta: [
      { title: "Rural Healthcare & Wellness Centres — IWF Healthcare" },
      {
        name: "description",
        content:
          "IWF establishes community-based Rural Healthcare & Wellness Centres to provide accessible care to underserved rural populations.",
      },
    ],
  }),
  component: WellnessCentres,
});
