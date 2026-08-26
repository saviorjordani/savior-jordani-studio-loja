import { Download, Heart, RefreshCw, ShieldCheck, ShoppingCart, Zap } from "lucide-react";
import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/saviz-button";
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
  { src: "https://placehold.co/1600x1008/20211F/F4E58D?text=Savior+Jordani+Studio+Plugin", alt: "Placeholder da exibição do plugin Savior Jordâni Studio" },
  { src: "https://placehold.co/800x600/262725/F4E58D?text=Frequency+Separation", alt: "Placeholder da ferramenta Frequency Separation" },
  { src: "https://placehold.co/800x600/2C2D2A/F4E58D?text=Dodge+%26+Burn", alt: "Placeholder da ferramenta Dodge e Burn" },
  { src: "https://placehold.co/800x600/32332F/F4E58D?text=Color+Correction", alt: "Placeholder da ferramenta Color Correction" },
];

export function StoreHero() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-b border-border">
      <div className="container-page py-8 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12">
          <div>
            <div className="overflow-hidden rounded-xl border border-border bg-background-secondary">
              <img
                src={media[active].src}
                alt={media[active].alt}
                width={1600}
                height={1008}
                loading="eager"
                className="w-full"
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
                  <img src={m.src} alt="" loading="eager" className="aspect-4/3 w-full object-cover" />
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
                <ButtonLink to="/checkout" size="lg" className="w-full">
                  <ShoppingCart className="size-4" />
                  Assinar agora
                </ButtonLink>
                <ButtonLink to="/recursos" variant="secondary" size="lg" className="w-full">
                  Ver demonstração
                </ButtonLink>
                <Button variant="ghost" className="w-full">
                  <Heart className="size-4" />
                  Salvar para depois
                </Button>
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

              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
                {["Pix", "Visa", "Mastercard", "Elo", "Boleto"].map((m) => (
                  <span
                    key={m}
                    className="rounded border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {m}
                  </span>
                ))}
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
