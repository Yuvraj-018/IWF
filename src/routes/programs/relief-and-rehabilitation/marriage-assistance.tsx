import { createFileRoute } from "@tanstack/react-router";
import MarriageAssistance from "@/Pages/Relief/subpages/MarriageAssistance";

export const Route = createFileRoute("/programs/relief-and-rehabilitation/marriage-assistance")({
  head: () => ({
    meta: [
      { title: "Marriage Assistance — IWF Relief" },
      {
        name: "description",
        content: "Financial grants and wedding assistance for poor and orphaned brides.",
      },
    ],
  }),
  component: MarriageAssistance,
});
