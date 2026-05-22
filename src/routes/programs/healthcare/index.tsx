import { createFileRoute } from "@tanstack/react-router";
import HealthcareLanding from "@/Pages/Healthcare/HealthcareLanding";

export const Route = createFileRoute("/programs/healthcare/")({
  head: () => ({
    meta: [
      { title: "Healthcare — IWF | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "IWF's Healthcare initiatives bring affordable, preventive, and community-based medical services to rural India's most underserved populations.",
      },
    ],
  }),
  component: HealthcareLanding,
});
