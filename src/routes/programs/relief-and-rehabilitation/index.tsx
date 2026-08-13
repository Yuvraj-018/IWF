import { createFileRoute } from "@tanstack/react-router";
import ReliefRehabilitationPage from "@/Pages/Sectors/ReliefRehabilitationPage";

export const Route = createFileRoute("/programs/relief-and-rehabilitation/")({
  head: () => ({
    meta: [
      { title: "Relief & Rehabilitation - Islah Welfare Foundation" },
      {
        name: "description",
        content: "Islah Welfare Foundation disaster relief, food distribution, housing assistance, and emergency response initiatives.",
      },
    ],
  }),
  component: () => <ReliefRehabilitationPage />,
});
