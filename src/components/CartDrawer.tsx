import { Link } from "@tanstack/react-router";
import { BadgePercent, Check, Minus, Plus, ShieldCheck, ShoppingCart, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/saviz-button";
import { useCart } from "@/lib/cart-context";
import { COUPON, TRIAL_NOTE } from "@/lib/site";

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    addItem,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    discount,
    total,
    totalItems,
  } = useCart();

  const [code, setCode] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const handleApplyCoupon = () => {
    if (applyCoupon(code)) {
      setCode("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex justify-end bg-black/70 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Carrinho de compras"
      onClick={closeCart}
    >
      <aside
        className="flex h-dvh w-full max-w-md flex-col border-l border-border bg-background-secondary shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="flex items-center gap-2 text-base font-bold tracking-tight">
            <ShoppingCart className="size-5 text-accent-soft" /> Seu Carrinho
            {totalItems > 0 ? (
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold text-accent-soft">
                {totalItems} {totalItems === 1 ? "item" : "itens"}
              </span>
            ) : null}
          </h2>
          <button
            type="button"
            aria-label="Fechar carrinho"
            onClick={closeCart}
            className="flex size-9 items-center justify-center rounded-lg border border-border bg-background-tertiary text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {items.length === 0 ? (
            <div className="my-12 flex flex-col items-center justify-center text-center">
              <span className="flex size-16 items-center justify-center rounded-full border border-border bg-background-tertiary text-muted-foreground">
                <ShoppingCart className="size-8" />
              </span>
              <p className="mt-4 text-base font-semibold text-foreground">Seu carrinho está vazio</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Adicione o plugin Savior Jordâni Studio para prosseguir.
              </p>
              <Button onClick={() => addItem()} className="mt-6">
                Adicionar Plugin ao Carrinho
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-xl border border-border bg-background-tertiary p-4 space-y-3"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-16 shrink-0 rounded-lg border border-border object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-foreground leading-tight">{item.name}</p>
                    <p className="mt-1 font-mono text-[11px] text-muted-foreground">SKU {item.sku}</p>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remover produto"
                    className="self-start rounded p-1 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between border-t border-border/60 pt-3">
                  <div className="flex items-center rounded-lg border border-border bg-background px-1">
                    <button
                      type="button"
                      aria-label="Diminuir quantidade"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-8 text-center font-mono text-xs font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Aumentar quantidade"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-bold text-accent-soft">
                      {brl(item.price * item.quantity)}
                    </span>
                    <p className="text-[10px] text-muted-foreground">1º ano</p>
                  </div>
                </div>
              </div>
            ))
          )}

          {items.length > 0 ? (
            <div className="rounded-xl border border-border bg-background-tertiary p-4 space-y-2">
              <label htmlFor="cupom-cart" className="text-xs font-medium text-muted-foreground">
                Cupom de desconto
              </label>
              <div className="flex gap-2">
                <input
                  id="cupom-cart"
                  value={appliedCoupon ?? code}
                  disabled={!!appliedCoupon}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={COUPON}
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 font-mono text-xs uppercase placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none disabled:opacity-60"
                />
                {appliedCoupon ? (
                  <Button variant="ghost" size="sm" onClick={removeCoupon}>
                    Remover
                  </Button>
                ) : (
                  <Button variant="secondary" size="sm" onClick={handleApplyCoupon}>
                    Aplicar
                  </Button>
                )}
              </div>
              {appliedCoupon ? (
                <p className="flex items-center gap-1.5 text-xs text-success font-medium">
                  <Check className="size-3.5" /> Cupom {appliedCoupon} ativo (50% OFF)
                </p>
              ) : (
                <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <BadgePercent className="size-3.5 text-accent-soft" /> Use {COUPON} e economize
                </p>
              )}
            </div>
          ) : null}
        </div>

        {items.length > 0 ? (
          <footer className="border-t border-border px-5 py-5 space-y-3 bg-background-secondary">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <dt>Subtotal</dt>
                <dd className="font-mono">{brl(subtotal)}</dd>
              </div>
              {appliedCoupon ? (
                <div className="flex justify-between text-success">
                  <dt>Desconto (50%)</dt>
                  <dd className="font-mono">-{brl(discount)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
                <dt>Total Hoje</dt>
                <dd className="font-mono text-accent-soft text-lg">{brl(total)}</dd>
              </div>
            </dl>
            <p className="text-[11px] text-muted-foreground leading-snug">
              Renovação anual por apenas R$ 99,90/ano a partir do 2º ano. Cancele quando quiser.
            </p>

            <ButtonLink to="/checkout" size="lg" className="w-full mt-2" onClick={closeCart}>
              Finalizar Compra
            </ButtonLink>
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="size-3.5 text-success" /> {TRIAL_NOTE}
            </p>
            <Link
              to="/pricing"
              onClick={closeCart}
              className="block text-center text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Ver o que está incluso no plugin
            </Link>
          </footer>
        ) : null}
      </aside>
    </div>
  );
}
