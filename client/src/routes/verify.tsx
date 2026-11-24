import { createFileRoute } from "@tanstack/react-router";
import VerifyPage from "@/Pages/VerifyPage";

export const Route = createFileRoute("/verify")({
  validateSearch: (search: Record<string, unknown>): { ref?: string } => ({
    ref: typeof search.ref === "string" && search.ref.trim() ? search.ref.trim() : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Verify a Document — ISLAH | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Verify an ISLAH donation receipt, acknowledgement card, membership or statutory registration using its official number.",
      },
    ],
  }),
  component: VerifyPage,
});
