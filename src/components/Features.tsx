import { Blend, Eye, Layers, Palette, Sun, Wand2 } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Camadas de Ajuda (Helping Layers)",
    desc: "Ative a visualização guia com 1 clique para enxergar manchas e desníveis de iluminação imperceptíveis a olho nu.",
  },
  {
    icon: Layers,
    title: "Textura & Poros Reais",
    desc: "Remove imperfeições mantendo a textura natural da pele, sem aquele aspecto de filtro ou pele plastificada.",
  },
  {
    icon: Blend,
    title: "Separação de Frequência em 1 Clique",
    desc: "Separe cor e textura instantaneamente para corrigir manchas de pele sem destruir a nitidez e os poros.",
  },
  {
    icon: Sun,
    title: "Dodge & Burn Pro",
    desc: "Crie volume, contorno e iluminação de nível editorial com camadas de luz e sombra pré-calibradas.",
  },
  {
    icon: Wand2,
    title: "Seleção Automática (Quick Select)",
    desc: "Isole a pele, áreas de iluminação e sombras da foto com um clique, sem perder tempo criando máscaras na mão.",
  },
  {
    icon: Palette,
    title: "Correção de Cor & Maquiagem Digital",
    desc: "Uniformize o tom de pele, clareie dentes, realce os olhos, lábios e aplique detalhes finais com facilidade.",
  },
];

export function Features({ id = "recursos" }: { id?: string }) {
  return (
    <section id={id} className="section-y bg-background-secondary">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Tudo o que você precisa para um retoque perfeito
          </h2>
          <p className="mt-4 text-muted-foreground">
            Um único painel intuitivo dentro do Photoshop que substitui dezenas de passos manuais por botões diretos e rápidos.
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
