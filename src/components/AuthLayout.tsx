import { Link } from "@tanstack/react-router";
import { Aperture } from "lucide-react";
import type { ReactNode } from "react";

/** Tela única de autenticação: ocupa o viewport sem rolar a página. */
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <header className="flex shrink-0 items-center justify-center py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="gradient-accent flex size-8 items-center justify-center rounded-lg">
            <Aperture className="size-5 text-primary-foreground" strokeWidth={2.2} />
          </span>
          <span className="text-base font-bold tracking-tight">
            Savior Jordâni <span className="text-accent-soft">Studio</span>
          </span>
        </Link>
      </header>

      <main className="flex min-h-0 flex-1 justify-center overflow-y-auto px-4 pb-4 [align-items:safe_center]">
        {children}
      </main>
    </div>
  );
}
