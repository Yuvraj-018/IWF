import { TopBar } from "./TopBar";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white font-sans text-foreground flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer onOpenModal={() => {}} />
    </div>
  );
}
