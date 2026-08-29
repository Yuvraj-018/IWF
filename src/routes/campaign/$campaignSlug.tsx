import { createFileRoute } from "@tanstack/react-router";
import CampaignDetailPage from "@/Pages/Campaigns/CampaignDetailPage";
import { CAMPAIGNS_DATA } from "@/content/campaigns";

export const Route = createFileRoute("/campaign/$campaignSlug")({
  head: ({ params }) => {
    const campaign = CAMPAIGNS_DATA[params.campaignSlug];
    const title = campaign
      ? `${campaign.name} - ${campaign.tagline} | ISLAH`
      : "ISLAH Flagship Campaign";
    const desc = campaign
      ? campaign.intro
      : "ISLAH Flagship Campaign for community development and social impact.";

    return {
      meta: [
        { title },
        { name: "description", content: desc },
      ],
    };
  },
  component: CampaignDetailRouteComponent,
});

function CampaignDetailRouteComponent() {
  const { campaignSlug } = Route.useParams();
  return <CampaignDetailPage campaignSlug={campaignSlug} />;
}
