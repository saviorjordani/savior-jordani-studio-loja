import { Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { COUPON } from "@/lib/site";

const DEADLINE = Date.UTC(2026, 7, 31, 23, 59, 59);

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    { label: "Dias", value: Math.floor(s / 86400) },
    { label: "Horas", value: Math.floor((s % 86400) / 3600) },
    { label: "Min", value: Math.floor((s % 3600) / 60) },
    { label: "Seg", value: s % 60 },
  ];
}

export function AnnouncementBar() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(DEADLINE - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border-b border-border bg-background-secondary">
      <div className="container-page flex min-h-11 flex-wrap items-center justify-center gap-x-5 gap-y-1.5 py-2 text-xs">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Tag className="size-3.5 text-accent-soft" />
          Primeiro mês com 50% OFF usando o cupom{" "}
          <span className="font-mono font-semibold text-foreground">{COUPON}</span>
        </span>

        <span className="flex items-center gap-1.5" aria-label="Tempo restante da promoção">
          {(left === null ? parts(0) : parts(left)).map((p) => (
            <span key={p.label} className="flex flex-col items-center">
              <span className="min-w-8 rounded bg-background px-1.5 py-0.5 text-center font-mono text-[13px] font-bold tabular-nums text-foreground">
                {left === null ? "--" : String(p.value).padStart(2, "0")}
              </span>
              <span className="text-[9px] tracking-wide text-muted-foreground uppercase">
                {p.label}
              </span>
            </span>
          ))}
        </span>

        <Link
          to="/checkout"
          className="rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground"
        >
          Assinar agora
        </Link>
      </div>
    </div>
  );
}
