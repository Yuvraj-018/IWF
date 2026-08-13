import { createFileRoute } from "@tanstack/react-router";
import SectorLandingPage from "@/Pages/Sectors/SectorLandingPage";
import { SECTOR_CONTENT } from "@/content/siteContent";

export const Route = createFileRoute("/programs/education/")({
  head: () => ({
    meta: [
      { title: "Education - IWF | Islah Welfare Foundation" },
      {
        name: "description",
        content: "IWF education initiatives support rural learning, mentorship, scholarships and academic opportunity.",
      },
    ],
  }),
  component: () => <SectorLandingPage content={SECTOR_CONTENT["education"]} />,
});
