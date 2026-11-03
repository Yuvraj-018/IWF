import { createFileRoute } from "@tanstack/react-router";
import CommunityPage from "@/Pages/Community/CommunityPage";

export const Route = createFileRoute("/about_/partners")({
  head: () => ({
    meta: [
      { title: "Partner & Sponsor | ISLAH" },
      {
        name: "description",
        content:
          "Collaborations with corporate CSR entities, institutions, government departments, and foundations at ISLAH.",
      },
    ],
  }),
  component: () => <CommunityPage initialTab="partners" />,
});
