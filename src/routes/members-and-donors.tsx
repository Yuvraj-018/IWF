import { createFileRoute } from "@tanstack/react-router";
import MembersDonorsPage from "@/Pages/AboutPage/MembersDonorsPage";

export const Route = createFileRoute("/members-and-donors")({
  head: () => ({
    meta: [
      { title: "Members & Donors Showcase - Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Explore supporting members directory, membership categories, and top featured donors of Islah Welfare Foundation.",
      },
    ],
  }),
  component: () => <MembersDonorsPage />,
});
