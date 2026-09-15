import { createFileRoute } from "@tanstack/react-router";
import HealthcareLanding from "@/Pages/Healthcare/HealthcareLanding";

export const Route = createFileRoute("/programs/healthcare/")({
  head: () => ({
    meta: [
      {
        title:
          "Healthcare & Well-Being - IWF | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Ensuring healthcare reaches the last mile through emergency support, ambulance services, medical aid, preventive camps, and rural wellness centres.",
      },
    ],
  }),
  component: HealthcareLanding,
});
