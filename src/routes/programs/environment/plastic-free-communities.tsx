import { createFileRoute } from "@tanstack/react-router";
import PlasticFreeCommunities from "@/Pages/Environment/subpages/PlasticFreeCommunities";

export const Route = createFileRoute("/programs/environment/plastic-free-communities")({
  head: () => ({
    meta: [
      { title: "Plastic-Free Communities — IWF Environment" },
      {
        name: "description",
        content: "Eliminating single-use plastics and promoting sustainable alternatives.",
      },
    ],
  }),
  component: PlasticFreeCommunities,
});
