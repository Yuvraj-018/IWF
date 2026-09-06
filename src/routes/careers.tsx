import { createFileRoute } from "@tanstack/react-router";
import CareersPage from "@/Pages/CareersPage";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers & Opportunities — ISLAH | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Build a purposeful career creating grassroots social change with ISLAH. Explore open positions and submit your CV for full-time, part-time, or internship roles.",
      },
    ],
  }),
  component: CareersPage,
});
