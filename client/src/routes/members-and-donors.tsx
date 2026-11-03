import { createFileRoute } from "@tanstack/react-router";
import CommunityPage from "@/Pages/Community/CommunityPage";

export const Route = createFileRoute("/members-and-donors")({
  head: () => ({
    meta: [
      { title: "Members & Donors | ISLAH" },
      {
        name: "description",
        content:
          "Explore supporting members directory, membership categories, and top featured donors of ISLAH.",
      },
    ],
  }),
  component: () => <CommunityPage initialTab="members" />,
});
