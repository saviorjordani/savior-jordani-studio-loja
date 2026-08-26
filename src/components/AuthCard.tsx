import type { ReactNode } from "react";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-background-secondary p-6 shadow-[var(--shadow-lift)] sm:p-8">
      <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>

      <div className="mt-6">{children}</div>

      <div className="mt-6 border-t border-border pt-5 text-center text-sm text-muted-foreground">
        {footer}
      </div>
    </div>
  );
}
