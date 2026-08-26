import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { Clock, SlidersHorizontal } from "lucide-react";
import { PageHeader, Prose } from "@/components/PageHeader";
import { SiteLayout } from "@/components/SiteLayout";
import { ButtonLink } from "@/components/ui/saviz-button";

const title = "Sobre a Savior Jordâni Studio";
const description =
  "Quem faz o Savior Jordâni Studio: um estúdio brasileiro de retoque que transformou seu fluxo diário de trabalho em um painel único para o Photoshop.";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonical("/sobre")],
  }),
  component: SobrePage,
});

const stats = [
  { icon: Clock, value: "9 anos", label: "de estúdio antes do plugin" },
  { icon: SlidersHorizontal, value: "6", label: "módulos dentro de um só painel" },
];

const timeline = [
  {
    year: "2017",
    text: "Abrimos um estúdio de retoque em São Paulo atendendo beleza, moda e publicidade. Todo arquivo passava pela mesma sequência manual de camadas.",
  },
  {
    year: "2021",
    text: "Transformamos essa sequência em actions internas para a equipe. O tempo médio por imagem caiu quase pela metade.",
  },
  {
    year: "2024",
    text: "As actions viraram um painel de verdade, com interface, presets e controle de intensidade. Assim nasceu o primeiro Savior Jordâni Studio.",
  },
  {
    year: "Hoje",
    text: "O painel é atualizado continuamente com base nos pedidos de quem usa, e chega a todo assinante sem custo extra.",
  },
];

function SobrePage() {
  return (
    <SiteLayout>
      <PageHeader
        crumb="Sobre"
        title="Feito por retocadores, para retocadores"
        subtitle="Não somos uma software house. Somos um estúdio que cansou de repetir os mesmos 40 cliques em cada foto."
      />

      <section className="border-b border-border bg-background-secondary">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-2">
          {stats.map((s) => (
            <div key={s.label} className="flex items-start gap-3">
              <s.icon className="mt-1 size-5 shrink-0 text-accent-soft" />
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Prose>
        <h2>Por que o plugin existe</h2>
        <p>
          Retoque profissional é repetição: separar frequências, montar as camadas de dodge &amp;
          burn, recuperar textura, ajustar cor. Sempre os mesmos passos, sempre à mão. O Savior Jordâni
          Studio nasceu de uma decisão simples: automatizar o caminho, nunca o julgamento. O
          plugin monta a estrutura; a mão continua sendo sua.
        </p>

        <h2>O que defendemos</h2>
        <ul>
          <li>Pele com poro visível: textura preservada, nada de efeito plástico.</li>
          <li>Camadas organizadas e não destrutivas, prontas para revisão do cliente.</li>
          <li>Um painel só, sem pacotes soltos nem dezenas de arquivos para instalar.</li>
          <li>Preço honesto e sem fidelidade: se não economizar seu tempo, você cancela.</li>
        </ul>

        <h2>Nossa linha do tempo</h2>
        <div className="not-prose space-y-4">
          {timeline.map((t) => (
            <div key={t.year} className="rounded-xl border border-border bg-background-secondary p-5">
              <p className="font-mono text-xs text-accent-soft">{t.year}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
            </div>
          ))}
        </div>

        <h2>Atualizações contínuas</h2>
        <p>
          Cada nova versão entra na assinatura sem custo adicional. As prioridades saem direto dos
          emails de quem usa o painel todos os dias. O changelog fica visível na área do cliente.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <ButtonLink to="/checkout" size="lg">
            Assinar o plugin
          </ButtonLink>
          <ButtonLink to="/contato" variant="secondary" size="lg">
            Falar com a gente
          </ButtonLink>
        </div>
      </Prose>
    </SiteLayout>
  );
}
