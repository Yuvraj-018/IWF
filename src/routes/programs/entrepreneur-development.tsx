import { createFileRoute } from "@tanstack/react-router";
import EntrepreneurDevelopmentPage from "@/Pages/Sectors/EntrepreneurDevelopmentPage";

export const Route = createFileRoute("/programs/entrepreneur-development")({
  head: () => ({
    meta: [
      { title: "Entrepreneur Development - Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Islah Welfare Foundation entrepreneurship development and interest-free microfinance initiatives for rural youth and women.",
      },
    ],
  }),
  component: () => <EntrepreneurDevelopmentPage />,
});
