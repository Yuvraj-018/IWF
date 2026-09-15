import { createFileRoute } from "@tanstack/react-router";
import DiabetesPrevention from "@/Pages/Healthcare/subpages/DiabetesPrevention";

export const Route = createFileRoute("/programs/healthcare/diabetes-prevention")({
  head: () => ({
    meta: [
      { title: "Diabetes Prevention & Lifestyle Awareness (DPLA) - IWF | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "IWF's Diabetes Prevention & Lifestyle Awareness (DPLA) initiative creates awareness, promotes healthy lifestyles, and encourages early screening in rural communities.",
      },
    ],
  }),
  component: DiabetesPrevention,
});
