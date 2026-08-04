import { createFileRoute } from "@tanstack/react-router";
import GenericPolicyPage from "@/Pages/Policies/GenericPolicyPage";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy - Islah Welfare Foundation" },
      { name: "description", content: "Cookie policy details of Islah Welfare Foundation." },
    ],
  }),
  component: () => <GenericPolicyPage slug="cookie-policy" />,
});
