import { createFileRoute } from "@tanstack/react-router";
import WomenSkillLivelihood from "@/Pages/Women/subpages/WomenSkillLivelihood";

export const Route = createFileRoute("/programs/women-empowerment/women-skill-livelihood")({
  head: () => ({
    meta: [
      {
        title:
          "Women Skill Development & Livelihood Programme (WSDL) - IWF | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Building Skills. Creating Livelihoods. Strengthening Women's Independence. Practical vocational training, enterprise skills, and market linkages for rural women.",
      },
    ],
  }),
  component: WomenSkillLivelihood,
});
