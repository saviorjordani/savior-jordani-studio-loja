import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Copy, Download, LayoutDashboard, BookOpen, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { Button, ButtonLink } from "@/components/ui/saviz-button";
import { LAST_LICENSE_KEY_STORAGE } from "@/lib/account";

const title = "Assinatura ativa | Savior Jordâni Studio";
const description =
  "Sua assinatura do plugin Savior Jordâni Studio está ativa. Baixe o plugin, acesse a área de membro e comece a retocar.";

export const Route = createFileRoute("/success")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const [key, setKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(LAST_LICENSE_KEY_STORAGE);
    if (stored) {
      setKey(stored);
      sessionStorage.removeItem(LAST_LICENSE_KEY_STORAGE);
    }
  }, []);

  const copyKey = async () => {
    if (!key) return;
    try {
      await navigator.clipboard.writeText(key);
      setCopied(true);
      toast.success("Chave copiada.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Não foi possível copiar. Selecione a chave manualmente.");
    }
  };

  return (
    <SiteLayout>
      <section className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-xl rounded-3xl border border-border bg-background-secondary p-8 text-center shadow-[var(--shadow-lift)] md:p-12">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full border border-success/40 bg-background-tertiary">
              <CheckCircle2 className="size-8 text-success" />
            </span>

            <h1 className="mt-6 text-3xl font-bold tracking-tight">Assinatura ativa!</h1>
            <p className="mt-4 text-muted-foreground">
              Obrigado por assinar. Abra o Photoshop e informe seu e-mail, sua senha da loja e a key
              de ativação abaixo.
            </p>

            {key ? (
              <div className="mt-6 space-y-2 text-left">
                <p className="flex items-start gap-2 text-xs text-warning">
                  <ShieldAlert className="mt-0.5 size-3.5 shrink-0" />
                  Copie agora: por segurança, essa key só é exibida uma vez.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <code className="flex-1 rounded-lg border border-border bg-background-tertiary px-3 py-2.5 font-mono text-sm tracking-wider">
                    {key}
                  </code>
                  <Button variant="secondary" onClick={copyKey}>
                    <Copy className="size-4" />
                    {copied ? "Copiado!" : "Copiar"}
                  </Button>
                </div>
              </div>
            ) : null}

            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink to="/dashboard/download" size="lg">
                <Download className="size-4" />
                Download do plugin
              </ButtonLink>
              <ButtonLink to="/dashboard" variant="secondary" size="lg">
                <LayoutDashboard className="size-4" />
                Acessar área de membro
              </ButtonLink>
              <ButtonLink to="/instalacao" variant="ghost" size="lg">
                <BookOpen className="size-4" />
                Ver documentação
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
