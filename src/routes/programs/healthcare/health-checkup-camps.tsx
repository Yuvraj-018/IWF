import { createFileRoute } from "@tanstack/react-router";
import HealthCheckupCamps from "@/Pages/Healthcare/subpages/HealthCheckupCamps";

export const Route = createFileRoute("/programs/healthcare/health-checkup-camps")({
  head: () => ({
    meta: [
      { title: "Medical Health Check-up Camps — IWF Healthcare" },
      {
        name: "description",
        content:
          "IWF organises free medical health check-up camps to improve access to preventive healthcare for underserved rural communities.",
      },
    ],
  }),
  component: HealthCheckupCamps,
});
