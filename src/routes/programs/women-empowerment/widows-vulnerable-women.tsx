import { createFileRoute } from "@tanstack/react-router";
import WidowsVulnerableWomen from "@/Pages/Women/subpages/WidowsVulnerableWomen";

export const Route = createFileRoute("/programs/women-empowerment/widows-vulnerable-women")({
  head: () => ({
    meta: [
      { title: "Widows & Vulnerable Women — IWF Women Empowerment" },
      {
        name: "description",
        content: "Compassionate social, legal, and financial support for widowed women.",
      },
    ],
  }),
  component: WidowsVulnerableWomen,
});
