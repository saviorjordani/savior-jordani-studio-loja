import { Blend, Droplets, Layers, Palette, Sun, Wand2 } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Texture",
    desc: "Reconstrua e controle a textura da pele preservando o detalhe natural do poro.",
  },
  {
    icon: Blend,
    title: "Frequency Separation",
    desc: "Separação em alta e baixa frequência com um clique, pronta para pintar.",
  },
  {
    icon: Sun,
    title: "Dodge & Burn",
    desc: "Camadas de luz e sombra calibradas, com curva de contraste para conferência.",
  },
  {
    icon: Wand2,
    title: "Quick Select",
    desc: "Seleções rápidas de pele, olhos, lábios e cabelo com máscaras editáveis.",
  },
  {
    icon: Palette,
    title: "Color Correction",
    desc: "Correção de tom, temperatura e uniformização de pele em painel dedicado.",
  },
  {
    icon: Droplets,
    title: "Details & Skin",
    desc: "Realce de detalhes finos e limpeza de manchas sem aparência plastificada.",
  },
];

export function Features({ id = "recursos" }: { id?: string }) {
  return (
    <section id={id} className="section-y bg-background-secondary">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Tudo que um retoque de beleza precisa
          </h2>
          <p className="mt-4 text-muted-foreground">
            Seis módulos que substituem dezenas de ações e atalhos manuais no seu fluxo diário.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="hover-lift rounded-2xl border border-border bg-background-tertiary p-6"
            >
              <span className="flex size-11 items-center justify-center rounded-xl border border-primary/25 bg-background-secondary">
                <Icon className="size-5 text-accent-soft" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
