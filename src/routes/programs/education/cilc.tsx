import { createFileRoute } from "@tanstack/react-router";
import CILCPage from "@/Pages/Education/subpages/CILCPage";

export const Route = createFileRoute("/programs/education/cilc")({
  head: () => ({
    meta: [
      { title: "Community & Islamic Learning Centre (CILC) — IWF Education" },
      {
        name: "description",
        content: "Holistic community learning and values education.",
      },
    ],
  }),
  component: CILCPage,
});
