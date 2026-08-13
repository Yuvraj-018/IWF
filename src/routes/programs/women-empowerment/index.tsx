import { createFileRoute } from "@tanstack/react-router";
import SectorLandingPage from "@/Pages/Sectors/SectorLandingPage";
import { SECTOR_CONTENT } from "@/content/siteContent";

export const Route = createFileRoute("/programs/women-empowerment/")({
  head: () => ({
    meta: [
      { title: "Women Empowerment - IWF | Islah Welfare Foundation" },
      {
        name: "description",
        content: "IWF women empowerment programmes support skills, livelihood, awareness, dignity and leadership.",
      },
    ],
  }),
  component: () => <SectorLandingPage content={SECTOR_CONTENT["women-empowerment"]} />,
});
