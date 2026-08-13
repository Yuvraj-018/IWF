import { createFileRoute } from "@tanstack/react-router";
import VocationalTrainingInstitute from "@/Pages/Education/subpages/VocationalTrainingInstitute";

export const Route = createFileRoute("/programs/education/vocational-training-institute")({
  head: () => ({
    meta: [
      { title: "Vocational Training Institute — IWF Education" },
      {
        name: "description",
        content: "Market-oriented practical skill trades for employment and self-reliance.",
      },
    ],
  }),
  component: VocationalTrainingInstitute,
});
