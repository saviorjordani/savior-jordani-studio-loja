import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Download, KeyRound, LifeBuoy, XCircle } from "lucide-react";
import { NEWS } from "@/lib/account";
import { useCustomerSession } from "@/lib/customer-session";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Minha conta | Savior Jordâni Studio" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardHome,
});

function DashboardHome() {
  const { user, email } = useCustomerSession();
  const hasLicense = user?.hasLicense ?? false;

  const cards = [
    { to: "/dashboard/licenca" as const, icon: KeyRound, t: "Licença", d: hasLicense ? "Ativa" : "Sem licença" },
    { to: "/dashboard/download" as const, icon: Download, t: "Download", d: "Instalador do plugin" },
    { to: "/ajuda" as const, icon: LifeBuoy, t: "Suporte", d: "Resposta em 24h" },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Bem-vindo de volta!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {hasLicense
            ? "Sua licença está ativa. Abra o Photoshop e informe suas credenciais no painel."
            : "Você ainda não tem uma licença. Adquira uma para liberar o plugin no Photoshop."}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.t}
            to={c.to}
            className="rounded-xl border border-border bg-background-secondary p-5 transition-colors hover:border-primary/60"
          >
            <c.icon className="size-5 text-accent-soft" />
            <p className="mt-3 text-sm font-semibold">{c.t}</p>
            <p className="text-xs text-muted-foreground">{c.d}</p>
          </Link>
        ))}
      </div>

      <section className="rounded-2xl border border-border bg-background-secondary p-6">
        <h2 className="text-sm font-bold tracking-wide uppercase">Informações da conta</h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          {[
            ["Email", email ?? "Não informado"],
            ["Máquinas", user ? `${user.deviceCount} de ${user.maxDevices}` : "Não informado"],
            ["Conta criada em", user ? new Date(user.createdAt).toLocaleDateString("pt-BR") : "Não informado"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-4 border-b border-border pb-2">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 border-b border-border pb-2">
            <dt className="text-muted-foreground">Licença</dt>
            <dd className="flex items-center gap-1.5 text-right font-medium">
              {hasLicense ? (
                <>
                  <CheckCircle2 className="size-4 text-success" /> Ativa
                </>
              ) : (
                <>
                  <XCircle className="size-4 text-muted-foreground" /> Nenhuma
                </>
              )}
            </dd>
          </div>
        </dl>
        {!hasLicense ? (
          <Link
            to="/dashboard/licenca"
            className="mt-4 inline-block text-sm font-semibold text-accent-soft hover:underline"
          >
            Adquirir licença →
          </Link>
        ) : null}
      </section>

      <section className="rounded-2xl border border-border bg-background-secondary p-6">
        <h2 className="text-sm font-bold tracking-wide uppercase">Últimas notícias</h2>
        {NEWS.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {NEWS.map((n) => (
              <li key={n.t} className="border-b border-border pb-3 last:border-0 last:pb-0">
                <p className="text-sm font-medium">{n.t}</p>
                <p className="text-xs text-muted-foreground">{n.d}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">Nenhuma notícia no momento.</p>
        )}
      </section>
    </div>
  );
}
