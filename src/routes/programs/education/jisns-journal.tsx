import { createFileRoute } from "@tanstack/react-router";
import KnowledgeResearchPage from "@/Pages/Education/subpages/KnowledgeResearchPage";

export const Route = createFileRoute("/programs/education/jisns-journal")({
  head: () => ({
    meta: [
      {
        title:
          "Knowledge, Research & Publication (KRP) - Islah | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "JISNS Journal is now part of Islah Knowledge, Research & Publication (KRP) initiative.",
      },
    ],
  }),
  component: KnowledgeResearchPage,
});
