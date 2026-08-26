import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SiteLayout } from "@/components/SiteLayout";

const title = "Status do serviço | Savior Jordâni Studio";
const description =
  "Disponibilidade em tempo real da ativação de licenças, downloads e checkout do plugin Savior Jordâni Studio.";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonical("/status")],
  }),
  component: StatusPage,
});

const services = ["Ativação de licença", "Download do plugin", "Checkout e pagamentos", "Site"];

function StatusPage() {
  return (
    <SiteLayout>
      <PageHeader crumb="Status" title="Todos os sistemas operacionais" />
      <section className="section-y">
        <div className="container-page max-w-2xl divide-y divide-border rounded-2xl border border-border bg-background-secondary">
          {services.map((s) => (
            <div key={s} className="flex items-center justify-between px-5 py-4 text-sm">
              <span className="font-medium">{s}</span>
              <span className="flex items-center gap-2 text-success">
                <CheckCircle2 className="size-4" />
                Operacional
              </span>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
