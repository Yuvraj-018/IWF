import { createFileRoute } from "@tanstack/react-router";
import GalleryPage from "@/Pages/GalleryPage";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Programme Gallery - IWF | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Explore photographs and field impact from Islah Welfare Foundation programmes across education, healthcare, livelihoods, agriculture, environment and disaster relief.",
      },
    ],
  }),
  component: GalleryPage,
});
