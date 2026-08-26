import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { PageHeader, Prose } from "@/components/PageHeader";
import { SiteLayout } from "@/components/SiteLayout";

const title = "Política de privacidade | Savior Jordâni Studio";
const description =
  "Como a Savior Jordâni Studio coleta, usa e protege os dados pessoais de quem assina o plugin para Photoshop.";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonical("/privacidade")],
  }),
  component: PrivacidadePage,
});

function PrivacidadePage() {
  return (
    <SiteLayout>
      <PageHeader crumb="Privacidade" title="Política de privacidade" />
      <Prose>
        <h2>Dados coletados</h2>
        <p>Nome, email e dados de pagamento processados pelo provedor de cobrança.</p>
        <h2>Uso dos dados</h2>
        <p>
          Utilizamos os dados para entregar a licença, emitir notas, dar suporte e enviar avisos de
          atualização do plugin.
        </p>
        <h2>Suas imagens</h2>
        <p>
          O processamento das imagens acontece no seu Photoshop; só a validação da chave de licença é feita online. Nenhuma foto editada é enviada para os nossos
          servidores.
        </p>
        <h2>Seus direitos</h2>
        <p>
          Você pode solicitar acesso, correção ou exclusão dos seus dados pelo email
          contato@savizstudio.com.br.
        </p>
      </Prose>
    </SiteLayout>
  );
}
