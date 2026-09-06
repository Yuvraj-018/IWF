import { createFileRoute } from "@tanstack/react-router";
import SponsorPage from "@/Pages/SponsorPage";

export const Route = createFileRoute("/sponsor")({
  head: () => ({
    meta: [
      { title: "Sponsor a Program — ISLAH | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Sponsor rural education, healthcare, women empowerment, or livelihood programs with ISLAH. Transparent reporting, 80G tax benefits, and direct community impact.",
      },
    ],
  }),
  component: SponsorPage,
});
