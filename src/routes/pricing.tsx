import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { Faq } from "@/components/Faq";
import { PricingCard } from "@/components/PricingCard";
import { SiteLayout } from "@/components/SiteLayout";

const title = "Preços | Savior Jordâni Studio Plugin para Photoshop";
const description =
  "Plano mensal de R$ 47 com todas as ferramentas do plugin Savior Jordâni Studio, atualizações contínuas e suporte por email. Cancele quando quiser.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonical("/pricing")],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <SiteLayout>
      <section className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Preços simples, <span className="text-gradient-accent">sem surpresas</span>
            </h1>
            <p className="mt-5 text-muted-foreground md:text-lg">
              Um plugin, um plano. R$ 47 por mês, sem fidelidade.
            </p>
          </div>

          <div className="mt-14">
            <PricingCard />
          </div>

          <p className="mx-auto mt-8 max-w-md text-center text-xs text-muted-foreground">
            Pagamento por cartão ou Pix. Dúvidas antes de assinar? Fale com a gente em
            contato@savizstudio.com.br.
          </p>
        </div>
      </section>

      <div className="bg-background-secondary">
        <Faq />
      </div>
    </SiteLayout>
  );
}
