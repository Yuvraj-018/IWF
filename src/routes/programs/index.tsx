import { createFileRoute } from "@tanstack/react-router";
import ProgramsMasterPage from "@/Pages/Programs/ProgramsMasterPage";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "Our Programs - Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Explore all programs and initiatives by Islah Welfare Foundation in education, healthcare, livelihood, women empowerment, and rural development.",
      },
    ],
  }),
  component: () => <ProgramsMasterPage />,
});
