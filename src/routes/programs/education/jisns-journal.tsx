import { createFileRoute } from "@tanstack/react-router";
import JISNSJournal from "@/Pages/Education/subpages/JISNSJournal";

export const Route = createFileRoute("/programs/education/jisns-journal")({
  head: () => ({
    meta: [
      { title: "JISNS Journal — IWF Education" },
      {
        name: "description",
        content: "Peer-reviewed research and scholarly discourse under Islah Welfare Foundation.",
      },
    ],
  }),
  component: JISNSJournal,
});
