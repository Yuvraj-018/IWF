import { createFileRoute } from "@tanstack/react-router";
import FinancialLiteracy from "@/Pages/Women/subpages/FinancialLiteracy";

export const Route = createFileRoute("/programs/women-empowerment/financial-literacy")({
  head: () => ({
    meta: [
      { title: "Financial Literacy — IWF Women Empowerment" },
      {
        name: "description",
        content: "Demystifying banking, savings, digital payments, and insurance for women.",
      },
    ],
  }),
  component: FinancialLiteracy,
});
