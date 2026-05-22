import { createFileRoute } from "@tanstack/react-router";
import DiabetesPrevention from "@/Pages/Healthcare/subpages/DiabetesPrevention";

export const Route = createFileRoute("/programs/healthcare/diabetes-prevention")({
  head: () => ({
    meta: [
      { title: "Diabetes Prevention & Lifestyle Awareness — IWF Healthcare" },
      {
        name: "description",
        content:
          "IWF's Diabetes Prevention Programme creates awareness, promotes healthy lifestyles, and encourages early screening in rural communities.",
      },
    ],
  }),
  component: DiabetesPrevention,
});
