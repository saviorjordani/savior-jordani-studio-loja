import { Skeleton } from "@/components/ui/skeleton";

/** Full-page loading placeholder used while a route resolves. */
export function PageLoader() {
  return (
    <div className="container-page section-y" role="status" aria-live="polite">
      <span className="sr-only">Carregando página…</span>
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-6 h-10 w-2/3 max-w-xl" />
      <Skeleton className="mt-4 h-4 w-full max-w-2xl" />
      <Skeleton className="mt-2 h-4 w-5/6 max-w-xl" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-36 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

/** Inline spinner-ish placeholder for lists and cards. */
export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3 p-6" role="status" aria-live="polite">
      <span className="sr-only">Carregando…</span>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-lg" />
      ))}
    </div>
  );
}
