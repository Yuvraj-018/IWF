import { createFileRoute } from "@tanstack/react-router";
import GenderEquality from "@/Pages/Women/subpages/GenderEquality";

export const Route = createFileRoute("/programs/women-empowerment/gender-equality")({
  head: () => ({
    meta: [
      { title: "Gender Equality — IWF Women Empowerment" },
      {
        name: "description",
        content: "Promoting equal opportunities, education, and male allyship in communities.",
      },
    ],
  }),
  component: GenderEquality,
});
