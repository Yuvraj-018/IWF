import { createFileRoute } from "@tanstack/react-router";
import CampaignMasterPage from "@/Pages/Campaigns/CampaignMasterPage";

export const Route = createFileRoute("/campaign/")({
  head: () => ({
    meta: [
      { title: "Our Campaigns - Five Pillars of Change | ISLAH" },
      {
        name: "description",
        content:
          "Explore ISLAH's 5 Flagship Campaigns: Shiksha Na Ruke, Har Pal Anmol Hai, Pari Ki Udaan, Swabhimaan, and Taiyyari Kal Ki.",
      },
    ],
  }),
  component: () => <CampaignMasterPage />,
});
