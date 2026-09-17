import { createFileRoute } from "@tanstack/react-router";
import SocialJusticeLanding from "@/Pages/SocialJustice/SocialJusticeLanding";

export const Route = createFileRoute("/programs/social-justice/")({
  head: () => ({
    meta: [
      {
        title:
          "Social Justice & Legal Empowerment - Islah | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Creating Awareness. Pursuing Justice. Protecting Dignity. Rights education, legal literacy, grievance redressal, and strategic judicial intervention for rural and underserved communities.",
      },
    ],
  }),
  component: SocialJusticeLanding,
});
