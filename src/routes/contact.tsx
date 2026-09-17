import { createFileRoute } from "@tanstack/react-router";
import ContactPage from "@/Pages/ContactPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Islah | Islah Welfare Foundation" },
      {
        name: "description",
        content:
          "Contact Islah Welfare Foundation at our offices in Darbhanga, Patna, Delhi, and Meerut. Reach our Chairman, Treasurer, and CEO. Send us a message using the online contact form.",
      },
    ],
  }),
  component: ContactPage,
});
