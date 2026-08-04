import { createFileRoute } from "@tanstack/react-router";
import AgriculturePage from "@/Pages/Sectors/AgriculturePage";

export const Route = createFileRoute("/programs/agriculture")({
  head: () => ({
    meta: [
      { title: "Agriculture & Rural Livelihood - Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Sustainable agriculture, organic farming, water conservation, and farmer livelihood programs by Islah Welfare Foundation.",
      },
    ],
  }),
  component: () => <AgriculturePage />,
});
