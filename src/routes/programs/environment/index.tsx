import { createFileRoute } from "@tanstack/react-router";
import EnvironmentLanding from "@/Pages/Environment/EnvironmentLanding";

export const Route = createFileRoute("/programs/environment/")({
  head: () => ({
    meta: [
      { title: "Environment & Sustainable Development — ISLAH Welfare Foundation" },
      {
        name: "description",
        content: "Environmental awareness, green villages, tree plantation, and sustainable rural development initiatives by ISLAH.",
      },
    ],
  }),
  component: EnvironmentLanding,
});

