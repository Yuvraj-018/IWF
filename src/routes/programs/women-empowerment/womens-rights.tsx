import { createFileRoute } from "@tanstack/react-router";
import WomensRights from "@/Pages/Women/subpages/WomensRights";

export const Route = createFileRoute("/programs/women-empowerment/womens-rights")({
  head: () => ({
    meta: [
      {
        title:
          "Women’s Rights & Gender Equality Awareness (WRGE) - IWF | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Know Your Rights. Strengthen Your Voice. Build a More Equal Future. IWF promotes legal awareness, gender equality, safety, and women's participation.",
      },
    ],
  }),
  component: WomensRights,
});
