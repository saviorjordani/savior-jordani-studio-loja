import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { BadgePercent, CalendarClock, Link2 } from "lucide-react";
import { PageHeader, Prose } from "@/components/PageHeader";
import { SiteLayout } from "@/components/SiteLayout";
import { ButtonLink } from "@/components/ui/saviz-button";

const title = "Programa de afiliados | Savior Jordâni Studio";
const description =
  "Indique o plugin Savior Jordâni Studio e receba 30% de comissão recorrente enquanto a assinatura do seu indicado estiver ativa.";

export const Route = createFileRoute("/afiliados")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonical("/afiliados")],
  }),
  component: AfiliadosPage,
});

const highlights = [
  { icon: BadgePercent, t: "30% recorrente", d: "Sobre cada mensalidade paga, mês após mês." },
  { icon: CalendarClock, t: "Cookie de 60 dias", d: "A indicação continua sua mesmo se ele assinar depois." },
  { icon: Link2, t: "Link e cupom próprios", d: "Seu cupom dá desconto e identifica a venda." },
];

const steps = [
  { n: "1", t: "Cadastro", d: "Você envia seu perfil e como pretende divulgar. Aprovamos em até 2 dias úteis." },
  { n: "2", t: "Seu link", d: "Recebe um link exclusivo, um cupom e acesso ao painel de indicações." },
  { n: "3", t: "Divulgação", d: "Use em vídeos, cursos, portfólio ou comunidade. Enviamos materiais prontos." },
  { n: "4", t: "Pagamento", d: "Comissões fechadas no dia 1 e pagas via Pix no dia 10 do mês seguinte." },
];

const earnings = [
  { indicados: "5 assinantes", mes: "R$ 70,50/mês" },
  { indicados: "20 assinantes", mes: "R$ 282,00/mês" },
  { indicados: "50 assinantes", mes: "R$ 705,00/mês" },
];

function AfiliadosPage() {
  return (
    <SiteLayout>
      <PageHeader
        crumb="Afiliados"
        title="Ganhe indicando o Savior Jordâni Studio"
        subtitle="30% de comissão recorrente enquanto a assinatura do seu indicado estiver ativa. Sem teto de ganhos."
      />

      <section className="border-b border-border bg-background-secondary">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.t} className="flex items-start gap-3">
              <h.icon className="mt-0.5 size-5 shrink-0 text-accent-soft" />
              <div>
                <p className="text-sm font-semibold">{h.t}</p>
                <p className="text-xs text-muted-foreground">{h.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Prose>
        <h2>Como funciona</h2>
        <div className="not-prose grid gap-4 sm:grid-cols-2">
          {steps.map((s) => (
            <div key={s.n} className="rounded-xl border border-border bg-background-secondary p-5">
              <span className="flex size-8 items-center justify-center rounded-full border border-primary/30 font-mono text-xs text-accent-soft">
                {s.n}
              </span>
              <p className="mt-3 text-sm font-semibold text-foreground">{s.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>

        <h2>Quanto dá para ganhar</h2>
        <div className="not-prose overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-background-secondary text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">Indicações ativas</th>
                <th className="px-5 py-3 font-medium">Comissão mensal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {earnings.map((e) => (
                <tr key={e.indicados}>
                  <td className="px-5 py-3">{e.indicados}</td>
                  <td className="px-5 py-3 font-mono text-accent-soft">{e.mes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs">
          Cálculo sobre a mensalidade de R$ 47, considerando assinaturas mantidas ativas no mês.
        </p>

        <h2>Regras do programa</h2>
        <ul>
          <li>Não é permitido anunciar em buscadores usando a marca Savior Jordâni Studio.</li>
          <li>Autoindicação e compras com o próprio cupom não geram comissão.</li>
          <li>Comissões de assinaturas reembolsadas ou canceladas em 7 dias são estornadas.</li>
          <li>Pagamento mínimo de R$ 50 acumulados; abaixo disso o saldo passa para o mês seguinte.</li>
        </ul>

        <div className="pt-2">
          <ButtonLink to="/contato" size="lg">
            Quero ser afiliado
          </ButtonLink>
        </div>
      </Prose>
    </SiteLayout>
  );
}
