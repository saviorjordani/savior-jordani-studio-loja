import { Download, Heart, RefreshCw, ShieldCheck, ShoppingCart, Zap } from "lucide-react";
import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/saviz-button";
import { useCart } from "@/lib/cart-context";
import { PaymentBadges } from "@/components/PaymentBadges";
import {
  BILLING_NOTE,
  FILE_INFO,
  PRICE_LABEL,
  PRICE_PERIOD,
  PRODUCT_NAME,
  SKU,
  TOOLS,
} from "@/lib/site";

const media = [
  { src: "/images/plugin-ui-main.jpg", alt: "Visão geral do painel Savior Jordâni Studio no Photoshop" },
  { src: "/images/plugin-ui-frequency-separation.jpg", alt: "Módulo de Separação de Frequência do plugin" },
  { src: "/images/plugin-ui-dodge-burn.jpg", alt: "Módulo de Dodge & Burn e Iluminação" },
  { src: "/images/plugin-ui-color-correction.jpg", alt: "Módulo de Correção de Cor e Seleção Automática" },
];

export function StoreHero() {
  const [active, setActive] = useState(0);
  const { addItem } = useCart();

  return (
    <section className="border-b border-border">
      <div className="container-page py-8 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12">
          <div>
            <div className="aspect-16/9 overflow-hidden rounded-xl border border-border bg-background-secondary">
              <img
                src={media[active].src}
                alt={media[active].alt}
                width={1600}
                height={900}
                loading="eager"
                className="size-full object-cover object-center"
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {media.map((m, i) => (
                <button
                  key={m.src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Ver imagem ${i + 1}`}
                  className={`overflow-hidden rounded-lg border transition-colors ${
                    i === active ? "border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  <img src={m.src} alt="" loading="eager" className="aspect-16/9 w-full object-cover" />
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-border bg-background-secondary p-6">
              <h2 className="text-lg font-bold tracking-tight">Um plugin, todas as ferramentas</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Não existem pacotes separados. Tudo abaixo vive no mesmo painel, com a assinatura
                ativa você tem acesso a todas as ferramentas e a tudo que for lançado depois.
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {TOOLS.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Zap className="mt-0.5 size-4 shrink-0 text-accent-soft" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-xs text-muted-foreground">
              SKU {SKU} · Assinatura digital
            </p>

            <h1 className="mt-2 text-2xl leading-tight font-bold tracking-tight md:text-3xl">
              {PRODUCT_NAME}
            </h1>

            <div className="mt-6 rounded-xl border border-border bg-background-secondary p-5">
              <div className="flex items-end gap-1.5">
                <span className="text-4xl font-bold tracking-tight">{PRICE_LABEL}</span>
                <span className="pb-1.5 text-sm text-muted-foreground">{PRICE_PERIOD}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{BILLING_NOTE}</p>

              <div className="mt-5 space-y-2.5">
                <Button size="lg" className="w-full" onClick={() => addItem()}>
                  <ShoppingCart className="size-4" />
                  Adicionar ao carrinho
                </Button>
                <ButtonLink to="/checkout" variant="secondary" size="lg" className="w-full">
                  Comprar direto no checkout
                </ButtonLink>
                <ButtonLink to="/recursos" variant="ghost" size="lg" className="w-full">
                  Ver todas as ferramentas
                </ButtonLink>
              </div>

              <ul className="mt-5 space-y-2.5 border-t border-border pt-5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <Zap className="size-4 shrink-0 text-accent-soft" />
                  Acesso liberado na hora, direto no email
                </li>
                <li className="flex items-center gap-2.5">
                  <Download className="size-4 shrink-0 text-accent-soft" />
                  {FILE_INFO}
                </li>
                <li className="flex items-center gap-2.5">
                  <RefreshCw className="size-4 shrink-0 text-accent-soft" />7 dias de garantia com
                  reembolso integral
                </li>
                <li className="flex items-center gap-2.5">
                  <ShieldCheck className="size-4 shrink-0 text-accent-soft" />
                  Pagamento processado com criptografia
                </li>
              </ul>

              <div className="mt-5 border-t border-border pt-4 flex justify-start">
                <PaymentBadges />
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Compatível com Photoshop CC 2024 ou superior
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
