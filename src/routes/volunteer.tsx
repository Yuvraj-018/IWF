import { createFileRoute } from "@tanstack/react-router";
import VolunteerPage from "@/Pages/VolunteerPage";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer With Us — ISLAH | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Volunteer with ISLAH across our 8 working sectors including Education, Healthcare, Women Empowerment, Skills, Agriculture, Environment, and Relief. Apply online today.",
      },
    ],
  }),
  component: VolunteerPage,
});
