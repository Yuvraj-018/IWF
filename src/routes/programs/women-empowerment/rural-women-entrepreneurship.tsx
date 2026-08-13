import { createFileRoute } from "@tanstack/react-router";
import RuralWomenEntrepreneurship from "@/Pages/Women/subpages/RuralWomenEntrepreneurship";

export const Route = createFileRoute("/programs/women-empowerment/rural-women-entrepreneurship")({
  head: () => ({
    meta: [
      { title: "Rural Women Entrepreneurship — IWF Women Empowerment" },
      {
        name: "description",
        content: "Incubating micro-enterprises and business ownership for rural women.",
      },
    ],
  }),
  component: RuralWomenEntrepreneurship,
});
