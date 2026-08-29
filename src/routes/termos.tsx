import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { PageHeader, Prose } from "@/components/PageHeader";
import { SiteLayout } from "@/components/SiteLayout";

const title = "Termos de uso | Savior Jordâni Studio";
const description =
  "Condições de uso da assinatura e da licença do plugin Savior Jordâni Studio para Adobe Photoshop.";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonical("/termos")],
  }),
  component: TermosPage,
});

function TermosPage() {
  return (
    <SiteLayout>
      <PageHeader crumb="Termos de uso" title="Termos de uso" />
      <Prose>
        <h2>1. Licença</h2>
        <p>
          A assinatura concede uma licença pessoal e intransferível de uso do plugin em até 2
          computadores, válida durante o período anual contratado.
        </p>
        <h2>2. Restrições</h2>
        <p>
          É proibido revender, redistribuir, descompilar ou compartilhar a chave de ativação com
          terceiros.
        </p>
        <h2>3. Cobrança</h2>
        <p>
          A primeira cobrança é de R$ 299,90 por 1 ano de acesso. Após esse período, a renovação é
          anual, no valor de R$ 99,90, e pode ser cancelada antes da próxima cobrança pela área do
          cliente ou pelo suporte.
        </p>
        <h2>4. Suporte</h2>
        <p>Suporte por email em dias úteis, com resposta em até 1 dia útil.</p>
      </Prose>
    </SiteLayout>
  );
}
