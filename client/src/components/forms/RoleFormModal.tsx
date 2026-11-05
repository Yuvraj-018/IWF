import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

/** Where each role's application form lives. */
export const ROLE_FORM_LINKS: Record<RoleType, { to: string; hash: string }> = {
  volunteer: { to: "/volunteer", hash: "volunteer-form" },
  partner: { to: "/partner", hash: "partner-form" },
  sponsor: { to: "/sponsor", hash: "sponsor-form" },
  mentor: { to: "/mentor", hash: "mentor-form" },
  employee: { to: "/careers", hash: "career-form" },
};

export function roleFormHref(type: RoleType) {
  const l = ROLE_FORM_LINKS[type];
  return `${l.to}#${l.hash}`;
}

/**
 * Application forms are no longer shown as pop-ups. Buttons across the site still
 * call `setActiveModal(role)`; this component turns that into navigation to the
 * form section of the role's own page, then resets the trigger.
 */
export function RoleFormModal({ type, onClose }: { type: RoleType | null; onClose: () => void }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!type) return;
    const { to, hash } = ROLE_FORM_LINKS[type];
    onClose();
    if (window.location.pathname === to) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    void navigate({ to, hash });
  }, [type, onClose, navigate]);

  return null;
}
