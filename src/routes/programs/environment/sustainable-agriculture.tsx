import { createFileRoute } from "@tanstack/react-router";
import SustainableAgricultureEnv from "@/Pages/Environment/subpages/SustainableAgriculture";

export const Route = createFileRoute("/programs/environment/sustainable-agriculture")({
  head: () => ({
    meta: [
      { title: "Sustainable Agriculture — IWF Environment" },
      {
        name: "description",
        content: "Regenerative and ecological farming methods restoring soil and water.",
      },
    ],
  }),
  component: SustainableAgricultureEnv,
});
