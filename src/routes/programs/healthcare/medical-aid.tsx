import { createFileRoute } from "@tanstack/react-router";
import MedicalAidProgramme from "@/Pages/Healthcare/subpages/MedicalAidProgramme";

export const Route = createFileRoute("/programs/healthcare/medical-aid")({
  head: () => ({
    meta: [
      {
        title:
          "Medical Assistance for Poor Patients (MAP) - Islah | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Extending care and compassion to those who need it most—Financial assistance covering hospitalisation, costly medicines, diagnostics, and surgical expenses.",
      },
    ],
  }),
  component: MedicalAidProgramme,
});
