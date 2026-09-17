import { createFileRoute } from "@tanstack/react-router";
import Vision2047Page from "@/Pages/AboutPage/Vision2047Page.tsx";

export const Route = createFileRoute("/about_/vision-2047")({
  head: () => ({
    meta: [
      { title: "Vision 2047 — Transforming Lives, Building a New India | Islah" },
      {
        name: "description",
        content:
          "Islah's Vision 2047 is an ambitious roadmap to uplift millions of underserved Indians by 2047 — 100 years of independence — through education, healthcare, housing and livelihood.",
      },
    ],
  }),
  component: Vision2047Page,
});
