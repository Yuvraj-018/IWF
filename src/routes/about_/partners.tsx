import { createFileRoute } from "@tanstack/react-router";
import PartnersDonorsPage from "@/Pages/AboutPage/PartnersDonorsPage";

export const Route = createFileRoute("/about_/partners")({
  head: () => ({
    meta: [
      { title: "Our Partners & Supporters - Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Collaborations with corporate CSR entities, government departments, educational institutions, NGOs and foundations at Islah Welfare Foundation.",
      },
    ],
  }),
  component: () => <PartnersDonorsPage />,
});
