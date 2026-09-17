import { createFileRoute } from "@tanstack/react-router";
import HealthCheckupCamps from "@/Pages/Healthcare/subpages/HealthCheckupCamps";

export const Route = createFileRoute(
  "/programs/healthcare/health-checkup-camps"
)({
  head: () => ({
    meta: [
      {
        title:
          "Community Health Check-up Camps (CHC) - Islah | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Taking healthcare to the community—Free preventive medical consultations, diagnostic screenings, and health awareness camps for underserved rural populations.",
      },
    ],
  }),
  component: HealthCheckupCamps,
});
