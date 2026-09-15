import { createFileRoute } from "@tanstack/react-router";
import KnowledgeResearchPage from "@/Pages/Education/subpages/KnowledgeResearchPage";

export const Route = createFileRoute("/programs/education/jisns-journal")({
  head: () => ({
    meta: [
      {
        title:
          "Knowledge, Research & Publication (KRP) - IWF | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "JISNS Journal is now part of IWF Knowledge, Research & Publication (KRP) initiative.",
      },
    ],
  }),
  component: KnowledgeResearchPage,
});
