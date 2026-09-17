import { createFileRoute } from "@tanstack/react-router";
import KnowledgeResearchPage from "@/Pages/Education/subpages/KnowledgeResearchPage";

export const Route = createFileRoute(
  "/programs/education/knowledge-research-publication"
)({
  head: () => ({
    meta: [
      {
        title:
          "Knowledge, Research & Publication (KRP) - Islah | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Promoting intellectual depth, academic rigour and rational inquiry across disciplines through rural libraries, digital knowledge and community research.",
      },
    ],
  }),
  component: KnowledgeResearchPage,
});
