import { createFileRoute } from "@tanstack/react-router";
import GetInvolvedPage from "@/Pages/GetInvolvedPage";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Get Involved — ISLAH | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Explore ways to get involved with ISLAH: Volunteer, Partner, Sponsor, Mentor, Member, Donate, or Career opportunities. Together, we can create lasting change.",
      },
    ],
  }),
  component: GetInvolvedPage,
});
