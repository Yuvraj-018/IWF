import { createFileRoute } from "@tanstack/react-router";
import CommunityPage from "@/Pages/Community/CommunityPage";

export const Route = createFileRoute("/about_/community")({
  head: () => ({
    meta: [
      { title: "ISLAH Community — Members, Donors, Partners & Volunteers | ISLAH" },
      {
        name: "description",
        content:
          "Discover the ISLAH Community ecosystem: Members, Donors, Partners/Sponsors, and Volunteers/Mentors working together to uplift communities.",
      },
    ],
  }),
  component: () => <CommunityPage />,
});
