import { createFileRoute } from "@tanstack/react-router";
import SeasonalRelief from "@/Pages/Relief/subpages/SeasonalRelief";

export const Route = createFileRoute("/programs/relief-and-rehabilitation/seasonal-relief")({
  head: () => ({
    meta: [
      { title: "Seasonal Relief — IWF Relief" },
      {
        name: "description",
        content: "Winter blanket drives, Eid clothing, and seasonal disaster packages.",
      },
    ],
  }),
  component: SeasonalRelief,
});
