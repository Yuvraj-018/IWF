import { createFileRoute } from "@tanstack/react-router";
import WomenSkillLivelihood from "@/Pages/Women/subpages/WomenSkillLivelihood";

export const Route = createFileRoute("/programs/women-empowerment/women-skill-livelihood")({
  head: () => ({
    meta: [
      { title: "Women Skill & Livelihood — IWF Women Empowerment" },
      {
        name: "description",
        content: "Practical livelihood and skill building for women economic independence.",
      },
    ],
  }),
  component: WomenSkillLivelihood,
});
