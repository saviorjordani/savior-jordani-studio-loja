import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function PageHeader({
  title,
  subtitle,
  crumb,
}: {
  title: string;
  subtitle?: string;
  crumb: string;
}) {
  return (
    <section className="border-b border-border bg-background-secondary py-12">
      <div className="container-page">
        <nav aria-label="Trilha" className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">
            Início
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">{crumb}</span>
        </nav>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl">{title}</h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <section className="section-y">
      <div className="container-page max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc">
        {children}
      </div>
    </section>
  );
}
