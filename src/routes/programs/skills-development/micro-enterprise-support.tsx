import { createFileRoute } from "@tanstack/react-router";
import MicroEnterpriseSupport from "@/Pages/Skills/subpages/MicroEnterpriseSupport";

export const Route = createFileRoute("/programs/skills-development/micro-enterprise-support")({
  head: () => ({
    meta: [
      {
        title:
          "Micro-Enterprise & Self-Employment Support (MSES) - IWF | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Small Enterprise. Sustainable Income. Greater Independence. Assisting rural youth and women with startup readiness, bookkeeping, digital banking, and market linkages.",
      },
    ],
  }),
  component: MicroEnterpriseSupport,
});
