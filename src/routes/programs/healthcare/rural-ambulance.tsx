import { createFileRoute } from "@tanstack/react-router";
import RuralAmbulance from "@/Pages/Healthcare/subpages/RuralAmbulance";

export const Route = createFileRoute("/programs/healthcare/rural-ambulance")({
  head: () => ({
    meta: [
      { title: "Rural Ambulance & Emergency Response Service — IWF Healthcare" },
      {
        name: "description",
        content:
          "IWF's Rural Ambulance & Emergency Response Service provides timely emergency medical transportation to rural and economically weaker communities.",
      },
    ],
  }),
  component: RuralAmbulance,
});
