import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { Demo } from "@/components/Demo";
import { Features } from "@/components/Features";
import { PageHeader } from "@/components/PageHeader";
import { PricingCard } from "@/components/PricingCard";
import { SiteLayout } from "@/components/SiteLayout";

const title = "Recursos do plugin | Savior Jordâni Studio para Photoshop";
const description =
  "Frequency separation, dodge & burn, textura de pele, correção de cor e mais: veja todas as ferramentas do plugin Savior Jordâni Studio dentro do Photoshop.";

export const Route = createFileRoute("/recursos")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonical("/recursos")],
  }),
  component: RecursosPage,
});

function RecursosPage() {
  return (
    <SiteLayout>
      <PageHeader
        crumb="Recursos"
        title="Todas as ferramentas do Savior Jordâni Studio"
        subtitle="Um painel único dentro do Photoshop com o fluxo completo de retoque profissional."
      />
      <Features />
      <Demo />
      <section className="section-y border-t border-border">
        <div className="container-page">
          <PricingCard />
        </div>
      </section>
    </SiteLayout>
  );
}
