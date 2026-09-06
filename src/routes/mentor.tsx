import { createFileRoute } from "@tanstack/react-router";
import MentorPage from "@/Pages/MentorPage";

export const Route = createFileRoute("/mentor")({
  head: () => ({
    meta: [
      { title: "Become a Mentor — ISLAH | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Mentor aspiring students, rural youth, and grassroots women entrepreneurs with ISLAH. Share your professional expertise online or offline to transform lives.",
      },
    ],
  }),
  component: MentorPage,
});
