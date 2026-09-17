import { createFileRoute } from "@tanstack/react-router";
import ObjectiveVisionPage from "@/Pages/AboutPage/ObjectiveVisionPage.tsx";

export const Route = createFileRoute("/about_/objective-and-vision")({
  head: () => ({
    meta: [
      { title: "Our Objective & Vision | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Discover Islah's objectives, vision and mission — working towards an equitable, empowered and compassionate India where no one is left behind.",
      },
    ],
  }),
  component: ObjectiveVisionPage,
});
