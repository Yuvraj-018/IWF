import { createFileRoute } from "@tanstack/react-router";
import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";

export const Route = createFileRoute("/code-of-conduct")({
  head: () => ({
    meta: [
      { title: "Code of Conduct - Islah Welfare Foundation" },
      { name: "description", content: "Ethical standards and Code of Conduct of Islah Welfare Foundation." },
    ],
  }),
  component: () => <GenericPolicyPage slug="code-of-conduct" />,
});
