import { createFileRoute } from "@tanstack/react-router";
import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";
import LiveFinancialTransparencyCard from "@/components/common/LiveFinancialTransparencyCard";

function FinancialTransparencyPage() {
  return (
    <div>
      <GenericPolicyPage slug="financial-transparency-policy" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <LiveFinancialTransparencyCard />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/financial-transparency-policy")({
  head: () => ({
    meta: [
      { title: "Financial Transparency Policy - Islah Welfare Foundation" },
      { name: "description", content: "Financial transparency and audit controls policy of Islah Welfare Foundation." },
    ],
  }),
  component: FinancialTransparencyPage,
});
