import { createFileRoute } from "@tanstack/react-router";
import CommunitySkillCentre from "@/Pages/Skills/subpages/CommunitySkillCentre";

export const Route = createFileRoute("/programs/skills-development/community-skill-centre")({
  head: () => ({
    meta: [
      { title: "Community Skill Centre (CSC) — IWF Skills" },
      {
        name: "description",
        content: "Permanent community training centres providing multi-trade vocational skills.",
      },
    ],
  }),
  component: CommunitySkillCentre,
});
