import { createFileRoute } from "@tanstack/react-router";
import FoodNutrition from "@/Pages/Relief/subpages/FoodNutrition";

export const Route = createFileRoute("/programs/relief-and-rehabilitation/food-nutrition")({
  head: () => ({
    meta: [
      { title: "Food & Nutrition — IWF Relief" },
      {
        name: "description",
        content: "Community kitchens, ration distribution, and nutritional security.",
      },
    ],
  }),
  component: FoodNutrition,
});
