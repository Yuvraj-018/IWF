import { createFileRoute } from "@tanstack/react-router";
import CommunityPage from "@/Pages/Community/CommunityPage";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership & Community — ISLAH | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Discover ISLAH membership tiers, active members directory, and community initiatives.",
      },
    ],
  }),
  component: () => <CommunityPage initialTab="members" />,
});
