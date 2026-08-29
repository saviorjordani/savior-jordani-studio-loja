import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, PackageOpen } from "lucide-react";
import { canonical, jsonLdScript, organizationJsonLd } from "@/lib/seo";
import { SiteLayout } from "@/components/SiteLayout";
import { ButtonLink } from "@/components/ui/saviz-button";
import { PRICE_LABEL, PRICE_PERIOD, PRODUCT_DESCRIPTION, PRODUCT_NAME } from "@/lib/site";

const title = "Loja | Savior Jordâni Studio";
const description =
  "Produtos digitais da Savior Jordâni Studio para fotógrafos e retocadores.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonical("/")],
    scripts: [jsonLdScript(organizationJsonLd)],
  }),
  component: StoreHome,
});

function StoreHome() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-background-secondary">
        <div className="container-page py-14 md:py-20">
          <p className="flex items-center gap-2 text-sm font-semibold text-accent-soft">
            <PackageOpen className="size-4" /> Produtos digitais
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-balance md:text-5xl">
            Ferramentas para um fluxo de retoque mais preciso.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Conheça os plugins e recursos da Savior Jordâni Studio para Photoshop.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-accent-soft">Catálogo</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Produtos disponíveis</h2>
            </div>
            <span className="hidden text-sm text-muted-foreground sm:block">1 produto</span>
          </div>

          <article className="mt-8 grid overflow-hidden rounded-2xl border border-border bg-background-secondary md:grid-cols-[minmax(0,1.15fr)_minmax(280px,.85fr)]">
            <img
              src="https://placehold.co/1400x900/20211F/F4E58D?text=Savior+Jordani+Studio+Plugin"
              alt="Placeholder da exibição do plugin Savior Jordâni Studio"
              width={1400}
              height={900}
              className="h-full min-h-56 w-full object-cover"
            />
            <div className="flex flex-col p-6 md:p-8">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <PackageOpen className="size-5" />
              </span>
              <p className="mt-6 text-xs font-semibold tracking-[0.14em] text-accent-soft uppercase">
                Plugin para Photoshop
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">{PRODUCT_NAME}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{PRODUCT_DESCRIPTION}</p>
              <div className="mt-7 flex items-end justify-between gap-4 border-t border-border pt-5">
                <span className="text-xl font-bold">
                  {PRICE_LABEL}{" "}
                  <span className="text-xs font-normal text-muted-foreground">{PRICE_PERIOD}</span>
                </span>
                <ButtonLink to="/plugin" className="px-6">
                  Ver produto <ArrowRight className="size-4" />
                </ButtonLink>
              </div>
            </div>
          </article>
        </div>
      </section>
    </SiteLayout>
  );
}
