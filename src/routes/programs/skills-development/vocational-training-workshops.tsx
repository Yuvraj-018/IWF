import { createFileRoute } from "@tanstack/react-router";
import VocationalTrainingWorkshops from "@/Pages/Skills/subpages/VocationalTrainingWorkshops";

export const Route = createFileRoute("/programs/skills-development/vocational-training-workshops")({
  head: () => ({
    meta: [
      { title: "Vocational Training Workshops (VTW) — IWF Skills" },
      {
        name: "description",
        content: "Short-term intensive mobile skill workshops delivered directly in rural villages.",
      },
    ],
  }),
  component: VocationalTrainingWorkshops,
});
