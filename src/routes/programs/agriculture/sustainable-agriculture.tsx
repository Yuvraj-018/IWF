import { createFileRoute } from "@tanstack/react-router";
import SustainableAgricultureAgri from "@/Pages/Agriculture/subpages/SustainableAgriculture";

export const Route = createFileRoute("/programs/agriculture/sustainable-agriculture")({
  head: () => ({
    meta: [
      { title: "Sustainable Agriculture — IWF Agriculture" },
      {
        name: "description",
        content: "Agronomic excellence, soil enrichment, and crop diversification for farmers.",
      },
    ],
  }),
  component: SustainableAgricultureAgri,
});
