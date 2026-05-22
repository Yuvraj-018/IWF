import { createFileRoute } from "@tanstack/react-router";
import CriticalLifeSupport from "@/Pages/Healthcare/subpages/CriticalLifeSupport";

export const Route = createFileRoute("/programs/healthcare/critical-life-support")({
  head: () => ({
    meta: [
      { title: "Critical Life & Emergency Support — IWF Healthcare" },
      {
        name: "description",
        content:
          "IWF's Critical Life & Emergency Support Initiative provides timely emergency assistance and life-saving support to poor and vulnerable patients.",
      },
    ],
  }),
  component: CriticalLifeSupport,
});
