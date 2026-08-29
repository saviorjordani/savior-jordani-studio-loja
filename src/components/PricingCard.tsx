import { Check, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/saviz-button";
import { BILLING_NOTE, PLAN_INCLUDES, PRICE_LABEL, PRICE_PERIOD } from "@/lib/site";

export function PricingCard({
  features = PLAN_INCLUDES,
  compact = false,
}: {
  features?: string[];
  compact?: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-primary/30 bg-background-secondary p-8 shadow-[var(--shadow-glow)] md:p-10">
      <div className="gradient-accent absolute inset-x-0 top-0 h-1" />

      <p className="text-xs font-semibold tracking-[0.18em] text-accent-soft uppercase">
        Licença anual · Savior Jordâni Studio
      </p>

      <div className="mt-6 flex items-end gap-2">
        <span className="text-5xl font-bold tracking-tight">{PRICE_LABEL}</span>
        <span className="pb-2 text-sm text-muted-foreground">{PRICE_PERIOD}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{BILLING_NOTE}</p>

      <ul className="mt-8 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} />
            <span className="text-muted-foreground">{f}</span>
          </li>
        ))}
      </ul>

      <ButtonLink to="/checkout" size="lg" className="mt-8 w-full">
        Comprar licença anual
      </ButtonLink>

      {!compact ? (
        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-success" />
          Pagamento seguro · Renovação anual cancelável
        </p>
      ) : null}
    </div>
  );
}
