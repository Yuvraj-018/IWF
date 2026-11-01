import { useState, type ReactNode } from "react";
import {
  Footer,
  Header,
  NotificationTicker,
  RoleFormModal,
  UtilityBar,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";

export interface MediaLayoutProps {
  children: ReactNode;
}

export function MediaLayout({ children }: MediaLayoutProps) {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main className="flex-1">{children}</main>

      <Footer onOpenModal={(role) => setActiveModal(role)} />
      <RoleFormModal
        type={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}

export default MediaLayout;
