import { createFileRoute } from "@tanstack/react-router";
import EnvironmentPage from "@/Pages/Sectors/EnvironmentPage";

export const Route = createFileRoute("/programs/environment")({
  head: () => ({
    meta: [
      { title: "Environment & Sustainability - Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Tree plantation drives, plastic-free campaigns, and environmental protection initiatives by Islah Welfare Foundation.",
      },
    ],
  }),
  component: () => <EnvironmentPage />,
});
