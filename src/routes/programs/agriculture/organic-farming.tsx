import { createFileRoute } from "@tanstack/react-router";
import OrganicFarming from "@/Pages/Agriculture/subpages/OrganicFarming";

export const Route = createFileRoute("/programs/agriculture/organic-farming")({
  head: () => ({
    meta: [
      { title: "Organic Farming & Certification — IWF Agriculture" },
      {
        name: "description",
        content: "PGS organic certification, bio-formulations, and premium organic markets.",
      },
    ],
  }),
  component: OrganicFarming,
});
