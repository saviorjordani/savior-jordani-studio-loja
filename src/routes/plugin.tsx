import { createFileRoute } from "@tanstack/react-router";
import { canonical, jsonLdScript, organizationJsonLd, productJsonLd } from "@/lib/seo";
import { Demo } from "@/components/Demo";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { Features } from "@/components/Features";
import { Gallery } from "@/components/Gallery";
import { PricingCard } from "@/components/PricingCard";
import { SiteLayout } from "@/components/SiteLayout";
import { StoreHero } from "@/components/StoreHero";
import { TrustStrip } from "@/components/TrustStrip";

const title = "Savior Jordâni Studio Plugin de Retoque para Photoshop | Licença anual";
const description =
  "Um único plugin com frequency separation, dodge & burn, textura de pele e correção de cor dentro do Photoshop. R$ 300 no primeiro ano e R$ 99,90 nas renovações anuais.";

export const Route = createFileRoute("/plugin")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonical("/plugin")],
    scripts: [jsonLdScript(productJsonLd), jsonLdScript(organizationJsonLd)],
  }),
  component: PluginPage,
});

function PluginPage() {
  return (
    <SiteLayout>
      <StoreHero />
      <TrustStrip />
      <Reveal>
        <Gallery />
      </Reveal>
      <Reveal>
        <Features />
      </Reveal>
      <Reveal>
        <Demo />
      </Reveal>
      <Reveal>
        <section className="section-y border-b border-border">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Um plano, tudo incluído
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                R$ 300 no primeiro ano pelo plugin completo, com todas as atualizações. Depois, R$
                99,90 por ano.
              </p>
            </div>
            <div className="mt-10">
              <PricingCard />
            </div>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <Faq />
      </Reveal>
    </SiteLayout>
  );
}
