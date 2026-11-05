import { createFileRoute } from "@tanstack/react-router";
import MembershipPage from "@/Pages/MembershipPage";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Become a Member — ISLAH | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Join the ISLAH community. Explore membership tiers, benefits, and apply to become a supporting member working for meaningful social impact.",
      },
    ],
  }),
  component: MembershipPage,
});
