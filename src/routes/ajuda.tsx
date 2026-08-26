import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Download, LifeBuoy, Mail, RefreshCcw } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SiteLayout } from "@/components/SiteLayout";
import { canonical } from "@/lib/seo";

const title = "Central de ajuda | Savior Jordâni Studio";
const description =
  "Guias de instalação, políticas de reembolso, status do serviço e canais de suporte do plugin Savior Jordâni Studio para Photoshop.";

export const Route = createFileRoute("/ajuda")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonical("/ajuda")],
  }),
  component: AjudaPage,
});

const cards = [
  { to: "/instalacao" as const, icon: Download, t: "Instalação do plugin", d: "Passo a passo do instalador .exe no Windows." },
  { to: "/faq" as const, icon: BookOpen, t: "Perguntas frequentes", d: "Assinatura, máquinas ativadas e compatibilidade." },
  { to: "/reembolso" as const, icon: RefreshCcw, t: "Reembolso", d: "Como funciona a garantia de 7 dias." },
  { to: "/status" as const, icon: LifeBuoy, t: "Status do serviço", d: "Disponibilidade da ativação e dos downloads." },
  { to: "/contato" as const, icon: Mail, t: "Falar com suporte", d: "Resposta em até 1 dia útil por email." },
];

function AjudaPage() {
  return (
    <SiteLayout>
      <PageHeader
        crumb="Central de ajuda"
        title="Como podemos ajudar?"
        subtitle="Tudo o que você precisa para instalar, ativar e tirar o máximo do plugin."
      />
      <section className="section-y">
        <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="rounded-2xl border border-border bg-background-secondary p-6 transition-colors duration-200 hover:border-primary/50"
            >
              <c.icon className="size-5 text-accent-soft" />
              <p className="mt-4 text-base font-semibold">{c.t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
