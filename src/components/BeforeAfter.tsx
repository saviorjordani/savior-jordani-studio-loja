import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export function BeforeAfter({ src, alt, className }: Props) {
  const [pos, setPos] = useState(50);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-background-secondary select-none",
        className,
      )}
    >
      <img src={src} alt={alt} loading="eager" className="absolute inset-0 size-full object-cover" />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={src}
          alt=""
          aria-hidden
          loading="eager"
          className="size-full object-cover brightness-[0.94] contrast-[0.9] saturate-[0.72] sepia-[0.12]"
        />
      </div>

      <span className="pointer-events-none absolute top-3 left-3 rounded bg-background/85 px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
        Antes
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded bg-background/85 px-2 py-0.5 font-mono text-[10px] tracking-wide text-accent-soft uppercase">
        Depois
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-accent-soft"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute top-1/2 left-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent-soft bg-background text-accent-soft">
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 6-5 6 5 6M15 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Comparar antes e depois: ${alt}`}
        className="absolute inset-0 size-full cursor-ew-resize opacity-0 focus-visible:opacity-100"
      />
    </div>
  );
}
