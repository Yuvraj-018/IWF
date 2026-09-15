import { createFileRoute } from "@tanstack/react-router";
import CommunityLearningCentrePage from "@/Pages/Education/subpages/CommunityLearningCentrePage";

export const Route = createFileRoute("/programs/education/community-learning-centre")({
  head: () => ({
    meta: [
      { title: "Community Learning Centre (CLC) - IWF | Islah Welfare Foundation" },
      {
        name: "description",
        content: "Promoting values, character building, life skills, and community development for rural youth.",
      },
    ],
  }),
  component: CommunityLearningCentrePage,
});
