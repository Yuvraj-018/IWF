import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/Pages/HomePage";

export const Route = createFileRoute("/")({
  component: HomePage,
});
