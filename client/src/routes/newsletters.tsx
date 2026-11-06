import { createFileRoute, redirect } from "@tanstack/react-router";

// The Research & Publications page has been retired; send old links to the Media hub.
export const Route = createFileRoute("/newsletters")({
  beforeLoad: () => {
    throw redirect({ to: "/media", replace: true });
  },
});
