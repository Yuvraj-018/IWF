import { createFileRoute } from "@tanstack/react-router";
import MenstrualHygiene from "@/Pages/Healthcare/subpages/MenstrualHygiene";

export const Route = createFileRoute("/programs/healthcare/menstrual-hygiene")({
  head: () => ({
    meta: [
      { title: "Menstrual Hygiene Support Programme — IWF Healthcare" },
      {
        name: "description",
        content:
          "IWF's Menstrual Hygiene Support Programme promotes menstrual health awareness and provides access to safe hygiene products for girls and women.",
      },
    ],
  }),
  component: MenstrualHygiene,
});
