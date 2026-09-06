import { createFileRoute } from "@tanstack/react-router";
import LeadershipPage from "@/Pages/AboutPage/LeadershipPage";

export const Route = createFileRoute("/about_/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership & Management | ISLAH" },
      { name: "description", content: "Meet ISLAH's Board of Trustees, Executive Body, Advisory Panel, and Field Team — guiding grassroots development across India." },
    ],
  }),
  component: LeadershipPage,
});

