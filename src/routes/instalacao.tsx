import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { SiteLayout } from "@/components/SiteLayout";
import { ButtonLink } from "@/components/ui/saviz-button";

const title = "Instalação do plugin (.exe) | Savior Jordâni Studio";
const description =
  "Guia passo a passo para instalar o painel Savior Jordâni Studio no Adobe Photoshop com o instalador .exe para Windows e ativar sua licença.";

export const Route = createFileRoute("/instalacao")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonical("/instalacao")],
  }),
  component: InstalacaoPage,
});

const steps = [
  { t: "1. Baixe o instalador .exe", d: "Entre na área do cliente com a conta da assinatura: o instalador fica disponível apenas lá, em /download." },
  { t: "2. Feche o Photoshop", d: "O instalador precisa que o Photoshop esteja fechado para registrar o painel." },
  { t: "3. Execute o savizstudio-installer.exe", d: "Clique duas vezes e siga o assistente. Se o Windows exibir um aviso, escolha Mais informações › Executar assim mesmo." },
  { t: "4. Abra o Photoshop", d: "Vá em Janela › Extensões › Savior Jordâni Studio para abrir o painel." },
  { t: "5. Ative sua licença", d: "Cole a chave enviada por email. Cada assinatura ativa até 2 computadores." },
];

function InstalacaoPage() {
  return (
    <SiteLayout>
      <PageHeader
        crumb="Instalação"
        title="Instalando o Savior Jordâni Studio no Photoshop"
        subtitle="Instalador .exe para Windows, compatível com Photoshop CC 2021 ou superior."
      />
      <section className="section-y">
        <div className="container-page max-w-3xl space-y-4">
          {steps.map((s) => (
            <div key={s.t} className="rounded-2xl border border-border bg-background-secondary p-6">
              <p className="text-base font-semibold">{s.t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
          <div className="flex flex-wrap gap-3 pt-4">
            <ButtonLink to="/checkout" size="lg">
              Assinar agora
            </ButtonLink>
            <ButtonLink to="/contato" variant="secondary" size="lg">
              Preciso de ajuda
            </ButtonLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
