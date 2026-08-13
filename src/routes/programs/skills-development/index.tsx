import { createFileRoute } from "@tanstack/react-router";
import SectorLandingPage from "@/Pages/Sectors/SectorLandingPage";
import { SECTOR_CONTENT } from "@/content/siteContent";

export const Route = createFileRoute("/programs/skills-development/")({
  head: () => ({
    meta: [
      { title: "Skills Development - IWF | Islah Welfare Foundation" },
      {
        name: "description",
        content: "IWF skill development initiatives create livelihood, employability and entrepreneurship pathways for rural youth and women.",
      },
    ],
  }),
  component: () => <SectorLandingPage content={SECTOR_CONTENT["skills-development"]} />,
});
