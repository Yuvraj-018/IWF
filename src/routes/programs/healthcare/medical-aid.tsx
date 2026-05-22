import { createFileRoute } from "@tanstack/react-router";
import MedicalAidProgramme from "@/Pages/Healthcare/subpages/MedicalAidProgramme";

export const Route = createFileRoute("/programs/healthcare/medical-aid")({
  head: () => ({
    meta: [
      { title: "Medical Aid Programme for Poor Patients — IWF Healthcare" },
      {
        name: "description",
        content:
          "IWF's Medical Aid Programme provides financial assistance and healthcare support to poor and underprivileged patients.",
      },
    ],
  }),
  component: MedicalAidProgramme,
});
