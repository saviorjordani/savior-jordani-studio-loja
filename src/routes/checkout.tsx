import { createFileRoute } from "@tanstack/react-router";
import { Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { ButtonLink, Button } from "@/components/ui/saviz-button";
import { PRICE_FULL_LABEL, PRICE_LABEL, PRICE_PERIOD, TOOLS } from "@/lib/site";
import { useState } from "react";
import { useSubmit } from "@/lib/form";
import { useCustomerSession } from "@/lib/customer-session";
import { purchaseLicense } from "@/lib/store-auth";

const title = "Checkout | Savior Jordâni Studio Plugin";
const description =
  "Licença anual do plugin Savior Jordâni Studio para Photoshop: R$ 300 no primeiro ano e R$ 99,90 nas renovações anuais.";

export const Route = createFileRoute("/checkout")({
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
  component: CheckoutPage,
});

function CheckoutPage() {
  const { ready, signedIn, hasLicense, email, refresh } = useCustomerSession();
  const { loading, run } = useSubmit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void run(async () => {
      try {
        const result = await purchaseLicense();
        await refresh();
        window.location.assign(result.checkoutUrl);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Não foi possível concluir a compra.");
      }
    }, 1200);
  };

  return (
    <SiteLayout>
      <section className="section-y">
        <div className="container-page">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Comprar licença anual do Savior Jordâni Studio
          </h1>
          <p className="mt-3 text-muted-foreground">
            R$ 300 no primeiro ano. Depois, renovação anual automática de R$ 99,90, cancelável a
            qualquer momento.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            {!ready ? (
              <div className="rounded-2xl border border-border bg-background-secondary p-6 text-sm text-muted-foreground md:p-8">
                Verificando sua conta...
              </div>
            ) : !signedIn ? (
              <div className="rounded-2xl border border-border bg-background-secondary p-6 md:p-8">
                <h2 className="text-lg font-semibold">Entre para continuar</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  A licença fica vinculada à sua conta. Crie uma conta ou entre antes de comprar.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink to="/register" size="lg">
                    Criar conta
                  </ButtonLink>
                  <ButtonLink to="/login" variant="secondary" size="lg">
                    Entrar
                  </ButtonLink>
                </div>
              </div>
            ) : hasLicense ? (
              <div className="rounded-2xl border border-border bg-background-secondary p-6 md:p-8">
                <h2 className="text-lg font-semibold">Você já tem uma licença ativa</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Sua conta ({email}) já possui uma licença. Veja os detalhes na sua área de
                  cliente.
                </p>
                <ButtonLink to="/dashboard/licenca" size="lg" className="mt-6">
                  Ver minha licença
                </ButtonLink>
              </div>
            ) : (
              <form
                className="rounded-2xl border border-border bg-background-secondary p-6 md:p-8"
                noValidate
                onSubmit={handleSubmit}
              >
                <h2 className="text-lg font-semibold">Conta</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  A licença será emitida para{" "}
                  <span className="font-medium text-foreground">{email}</span>.
                </p>

                <div className="my-8 h-px bg-border" />

                <h2 className="text-lg font-semibold">Pagamento seguro</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Você será direcionado ao checkout seguro da Stripe para escolher uma forma de
                  pagamento disponível.
                </p>

                <Button type="submit" size="lg" className="mt-8 w-full" disabled={loading}>
                  {loading ? "Abrindo checkout..." : "Continuar para pagamento"}
                </Button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Ao comprar, você concorda com os Termos de Uso. A renovação anual de R$ 99,90
                  começa após o primeiro ano e pode ser cancelada antes da próxima cobrança.
                </p>
              </form>
            )}

            <aside className="h-fit rounded-2xl border border-primary/30 bg-background-secondary p-6 md:p-8">
              <h2 className="text-lg font-semibold">Resumo do pedido</h2>

              <div className="mt-6 rounded-xl border border-border bg-background-tertiary p-5">
                <p className="text-sm font-semibold">Savior Jordâni Studio Plugin</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Licença anual · até 2 computadores
                </p>
                <p className="mt-4 text-3xl font-bold tracking-tight">
                  {PRICE_LABEL}
                  <span className="text-base font-normal text-muted-foreground">
                    {PRICE_PERIOD}
                  </span>
                </p>
              </div>

              <ul className="mt-6 space-y-2 text-xs text-muted-foreground">
                {TOOLS.slice(0, 5).map((t) => (
                  <li key={t}>· {t}</li>
                ))}
              </ul>

              <dl className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>Hoje</dt>
                  <dd>{PRICE_FULL_LABEL}</dd>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between font-semibold">
                  <dt>Total hoje</dt>
                  <dd>{PRICE_FULL_LABEL}</dd>
                </div>
              </dl>

              <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="size-4 text-success" />
                Pagamento seguro e criptografado
              </p>
              <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-success" />
                Garantia de 7 dias · cancele quando quiser
              </p>
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
