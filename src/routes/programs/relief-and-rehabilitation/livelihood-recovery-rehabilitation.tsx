import { createFileRoute } from "@tanstack/react-router";
import LivelihoodRecoveryRehabilitation from "@/Pages/Relief/subpages/LivelihoodRecoveryRehabilitation";

export const Route = createFileRoute("/programs/relief-and-rehabilitation/livelihood-recovery-rehabilitation")({
  head: () => ({
    meta: [
      { title: "Livelihood Recovery & Rehabilitation (LRR) — ISLAH Relief" },
      {
        name: "description",
        content: "Productive asset replacement, small enterprise recovery, farming inputs, and economic self-reliance.",
      },
    ],
  }),
  component: LivelihoodRecoveryRehabilitation,
});
