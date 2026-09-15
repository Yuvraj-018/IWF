import { createFileRoute } from "@tanstack/react-router";
import RuralAmbulance from "@/Pages/Healthcare/subpages/RuralAmbulance";

export const Route = createFileRoute(
  "/programs/healthcare/rural-ambulance"
)({
  head: () => ({
    meta: [
      {
        title:
          "Rural Ambulance & Emergency Response (RAER) - IWF | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Reaching every life in time—Providing accessible, affordable, and rapid emergency ambulance transportation for rural communities.",
      },
    ],
  }),
  component: RuralAmbulance,
});
