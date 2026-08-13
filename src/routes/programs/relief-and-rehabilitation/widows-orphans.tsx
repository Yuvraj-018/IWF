import { createFileRoute } from "@tanstack/react-router";
import WidowsOrphans from "@/Pages/Relief/subpages/WidowsOrphans";

export const Route = createFileRoute("/programs/relief-and-rehabilitation/widows-orphans")({
  head: () => ({
    meta: [
      { title: "Widows & Orphans — IWF Relief" },
      {
        name: "description",
        content: "Holistic monthly stipends, education funds, and care for widows and orphans.",
      },
    ],
  }),
  component: WidowsOrphans,
});
