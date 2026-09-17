import { createFileRoute } from "@tanstack/react-router";
import WomenLanding from "@/Pages/Women/WomenLanding";

export const Route = createFileRoute("/programs/women-empowerment/")({
  head: () => ({
    meta: [
      { title: "Women & Youth Empowerment - Islah | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Creating Opportunity. Building Confidence. Strengthening Communities. Islah's Women & Youth Empowerment programmes support skills, livelihood, awareness, dignity and leadership in rural communities.",
      },
    ],
  }),
  component: WomenLanding,
});
