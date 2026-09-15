import { createFileRoute } from "@tanstack/react-router";
import SeasonalRelief from "@/Pages/Relief/subpages/SeasonalRelief";

export const Route = createFileRoute("/programs/relief-and-rehabilitation/seasonal-disaster-relief")({
  head: () => ({
    meta: [
      { title: "Seasonal & Disaster-Specific Relief (SDSR) — ISLAH Relief" },
      {
        name: "description",
        content: "Monsoon flood relief, winter warm blankets, heatwave hydration, and extreme weather response.",
      },
    ],
  }),
  component: SeasonalRelief,
});
