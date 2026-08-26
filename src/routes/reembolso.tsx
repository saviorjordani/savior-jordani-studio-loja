import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { PageHeader, Prose } from "@/components/PageHeader";
import { SiteLayout } from "@/components/SiteLayout";

const title = "Política de reembolso | Savior Jordâni Studio";
const description =
  "Garantia de 7 dias na assinatura do plugin Savior Jordâni Studio: como pedir reembolso e como funciona o cancelamento.";

export const Route = createFileRoute("/reembolso")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonical("/reembolso")],
  }),
  component: ReembolsoPage,
});

function ReembolsoPage() {
  return (
    <SiteLayout>
      <PageHeader crumb="Reembolso" title="Política de reembolso" />
      <Prose>
        <h2>Garantia de 7 dias</h2>
        <p>
          Você pode pedir o reembolso integral da primeira cobrança em até 7 dias corridos após a
          assinatura, sem precisar justificar o motivo.
        </p>
        <h2>Como solicitar</h2>
        <p>
          Envie um email para contato@savizstudio.com.br com o email usado na compra. O estorno é
          processado em até 5 dias úteis pelo mesmo meio de pagamento.
        </p>
        <h2>Cancelamento</h2>
        <p>
          A assinatura pode ser cancelada a qualquer momento. O acesso continua ativo até o fim do
          período já pago e nenhuma nova cobrança é feita.
        </p>
      </Prose>
    </SiteLayout>
  );
}
