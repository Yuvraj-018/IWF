import { createFileRoute } from "@tanstack/react-router";
import HousingNecessities from "@/Pages/Relief/subpages/HousingNecessities";

export const Route = createFileRoute("/programs/relief-and-rehabilitation/housing-necessities")({
  head: () => ({
    meta: [
      { title: "Housing & Necessities — IWF Relief" },
      {
        name: "description",
        content: "Shelter repairs, clean water, sanitation, and essential household kits.",
      },
    ],
  }),
  component: HousingNecessities,
});
