import { createFileRoute } from "@tanstack/react-router";
import SchoolKitPage from "@/Pages/Education/subpages/SchoolKitPage";

export const Route = createFileRoute("/programs/education/school-kit-learning-support")({
  head: () => ({
    meta: [
      { title: "School Kit & Learning Support (SKLS) - Islah | Islah Welfare Foundation" },
      {
        name: "description",
        content: "Providing essential school kits to underprivileged children for a brighter and confident future.",
      },
    ],
  }),
  component: SchoolKitPage,
});
