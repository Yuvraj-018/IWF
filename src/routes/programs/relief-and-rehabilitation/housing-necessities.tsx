import { createFileRoute } from "@tanstack/react-router";
import ShelterClothingNecessities from "@/Pages/Relief/subpages/ShelterClothingNecessities";

export const Route = createFileRoute("/programs/relief-and-rehabilitation/housing-necessities")({
  head: () => ({
    meta: [
      { title: "Shelter, Clothing & Necessities (SCN) — ISLAH Relief" },
      {
        name: "description",
        content: "Emergency shelter materials, warm seasonal clothing, bedding, and essential household utility kits.",
      },
    ],
  }),
  component: ShelterClothingNecessities,
});
