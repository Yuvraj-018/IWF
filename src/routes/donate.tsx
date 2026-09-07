import { createFileRoute } from "@tanstack/react-router";
import DonatePage from "@/Pages/DonatePage";

export const Route = createFileRoute("/donate")({
  validateSearch: (search: Record<string, unknown>): { patientId?: string; amount?: string } => ({
    patientId: search.patientId as string | undefined,
    amount: search.amount as string | undefined,
  }),
  head: () => ({
    meta: [
      { title: "Donate — IWF | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Support Islah Welfare Foundation's mission. Donate online to fund healthcare, education, women empowerment and rural development in India. 80G tax exemption available.",
      },
    ],
  }),
  component: DonatePage,
});
