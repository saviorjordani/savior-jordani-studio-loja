import { Link } from "@tanstack/react-router";
import { BadgePercent, Check, ShieldCheck, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, ButtonLink } from "@/components/ui/saviz-button";
import { BILLING_NOTE, COUPON, PRODUCT_NAME, SKU, TRIAL_NOTE } from "@/lib/site";

const PRICE = 399.90;
const DISCOUNT = 0.5;

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const discount = applied ? PRICE * DISCOUNT : 0;
  const total = PRICE - discount;

  const applyCoupon = () => {
    const value = code.trim().toUpperCase();
    if (!value) {
      toast.error("Digite um cupom.");
      return;
    }
    if (value !== COUPON) {
      toast.error("Cupom inválido ou expirado.");
      return;
    }
    setApplied(value);
    toast.success(`Cupom ${value} aplicado`, { description: "Desconto especial no primeiro ano." });
  };

  return (
    <div
      className="fixed inset-0 z-100 flex justify-end bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-label="Carrinho"
      onClick={onClose}
    >
      <aside
        className="flex h-dvh w-full max-w-sm flex-col border-l border-border bg-background-secondary"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <ShoppingCart className="size-4 text-accent-soft" /> Seu carrinho
          </h2>
          <button
            type="button"
            aria-label="Fechar carrinho"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="rounded-xl border border-border bg-background-tertiary p-4">
            <p className="text-sm font-semibold text-foreground">{PRODUCT_NAME}</p>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">SKU {SKU}</p>
            <p className="mt-3 text-xs text-muted-foreground">{BILLING_NOTE}</p>
            <p className="mt-3 text-lg font-bold text-accent-soft">
              {brl(PRICE)}
              <span className="text-xs font-medium text-muted-foreground">/1º ano</span>
            </p>
          </div>

          <div className="mt-5">
            <label htmlFor="cupom" className="text-xs font-medium text-muted-foreground">
              Cupom de desconto
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="cupom"
                value={applied ?? code}
                disabled={!!applied}
                onChange={(e) => setCode(e.target.value)}
                placeholder={COUPON}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm uppercase placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none disabled:opacity-60"
              />
              {applied ? (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setApplied(null);
                    setCode("");
                    toast("Cupom removido");
                  }}
                >
                  Remover
                </Button>
              ) : (
                <Button variant="secondary" onClick={applyCoupon}>
                  Aplicar
                </Button>
              )}
            </div>
            {applied ? (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-success">
                <Check className="size-3.5" /> {applied} com desconto aplicado
              </p>
            ) : (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <BadgePercent className="size-3.5" /> Use {COUPON} e economize
              </p>
            )}
          </div>
        </div>

        <footer className="border-t border-border px-5 py-5">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <dt>Subtotal (1º ano)</dt>
              <dd>{brl(PRICE)}</dd>
            </div>
            {applied ? (
              <div className="flex justify-between text-success">
                <dt>Desconto</dt>
                <dd>-{brl(discount)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
              <dt>Hoje</dt>
              <dd className="text-accent-soft">{brl(total)}</dd>
            </div>
          </dl>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Renovação anual por apenas R$ 99,90/ano a partir do 2º ano. Cancele quando quiser.
          </p>

          <ButtonLink to="/checkout" className="mt-4 w-full" onClick={onClose}>
            Garantir minha licença
          </ButtonLink>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <ShieldCheck className="size-3.5 text-success" /> {TRIAL_NOTE}
          </p>
          <Link
            to="/pricing"
            onClick={onClose}
            className="mt-3 block text-center text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Ver o que está incluso
          </Link>
        </footer>
      </aside>
    </div>
  );
}
