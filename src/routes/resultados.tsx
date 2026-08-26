import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { Gallery } from "@/components/Gallery";
import { PageHeader } from "@/components/PageHeader";
import { SiteLayout } from "@/components/SiteLayout";

const title = "Resultados reais | Savior Jordâni Studio";
const description =
  "Antes e depois de retoques feitos com o plugin Savior Jordâni Studio.";

export const Route = createFileRoute("/resultados")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonical("/resultados")],
  }),
  component: ResultadosPage,
});

function ResultadosPage() {
  return (
    <SiteLayout>
      <PageHeader
        crumb="Resultados"
        title="Antes e depois feitos com o plugin"
        subtitle="Arraste os controles para comparar as imagens originais com o retoque final."
      />
      <Gallery />
    </SiteLayout>
  );
}
