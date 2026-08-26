import { createFileRoute } from "@tanstack/react-router";
import { Faq } from "@/components/Faq";
import { PageHeader } from "@/components/PageHeader";
import { SiteLayout } from "@/components/SiteLayout";
import { canonical, faqJsonLd, jsonLdScript } from "@/lib/seo";

const title = "Perguntas frequentes | Savior Jordâni Studio";
const description =
  "Dúvidas sobre assinatura, cancelamento, número de máquinas, compatibilidade com Photoshop e instalação do plugin Savior Jordâni Studio.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonical("/faq")],
    scripts: [jsonLdScript(faqJsonLd)],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteLayout>
      <PageHeader
        crumb="FAQ"
        title="Perguntas frequentes"
        subtitle="Se não encontrar sua resposta aqui, fale com a gente pela página de contato."
      />
      <Faq />
    </SiteLayout>
  );
}
