import { createFileRoute } from "@tanstack/react-router";
import MenstrualHygiene from "@/Pages/Healthcare/subpages/MenstrualHygiene";

export const Route = createFileRoute("/programs/healthcare/menstrual-hygiene")({
  head: () => ({
    meta: [
      { title: "Menstrual Health & Hygiene Support (MHHS) - Islah | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Islah's Menstrual Health & Hygiene Support (MHHS) initiative promotes menstrual health awareness, provides hygiene products, and supports women's dignity in rural communities.",
      },
    ],
  }),
  component: MenstrualHygiene,
});
