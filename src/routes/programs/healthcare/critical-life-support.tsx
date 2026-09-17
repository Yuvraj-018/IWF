import { createFileRoute } from "@tanstack/react-router";
import CriticalLifeSupport from "@/Pages/Healthcare/subpages/CriticalLifeSupport";

export const Route = createFileRoute(
  "/programs/healthcare/critical-life-support"
)({
  head: () => ({
    meta: [
      {
        title:
          "Critical Life & Emergency Support (CLES) - Islah | Islah Welfare Foundation",
      },
      {
        name: "description",
        content:
          "Har Pal Anmol Hai—Providing immediate financial and ICU medical support to critically ill underprivileged patients during life-threatening emergencies.",
      },
    ],
  }),
  component: CriticalLifeSupport,
});
