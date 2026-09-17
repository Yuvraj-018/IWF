import { createFileRoute } from "@tanstack/react-router";
import MembershipPage from "@/Pages/MembershipPage";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership — Islah | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Join Islah Welfare Foundation as a member. Choose from Blue (₹2,500), Yellow (₹4,000), or Green (₹6,000) membership tiers. Get a digital ID card, fee receipt, and exclusive member benefits.",
      },
    ],
  }),
  component: MembershipPage,
});
