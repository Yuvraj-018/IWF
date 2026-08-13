import { createFileRoute } from "@tanstack/react-router";
import WomensRights from "@/Pages/Women/subpages/WomensRights";

export const Route = createFileRoute("/programs/women-empowerment/womens-rights")({
  head: () => ({
    meta: [
      { title: "Women's Rights — IWF Women Empowerment" },
      {
        name: "description",
        content: "Legal literacy, domestic violence protection, and rights awareness.",
      },
    ],
  }),
  component: WomensRights,
});
