import { Link } from "@tanstack/react-router";
import { Compass, Home, LifeBuoy, Search } from "lucide-react";

import { SiteLayout } from "@/components/SiteLayout";
import { ButtonLink } from "@/components/ui/saviz-button";

const SUGGESTIONS = [
  { to: "/plugin", label: "Página do plugin" },
  { to: "/recursos", label: "Recursos" },
  { to: "/pricing", label: "Preços" },
  { to: "/instalacao", label: "Instalação" },
  { to: "/faq", label: "Perguntas frequentes" },
  { to: "/ajuda", label: "Central de ajuda" },
] as const;

export function NotFoundPage() {
  return (
    <SiteLayout>
      <section className="section-y">
        <div className="container-page max-w-2xl text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-border bg-background-secondary">
            <Compass className="size-6 text-primary" aria-hidden="true" />
          </div>
          <p className="mt-6 font-mono text-sm tracking-widest text-primary">ERRO 404</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Essa página saiu do painel
          </h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            O link pode estar quebrado ou o conteúdo mudou de lugar. Use os atalhos abaixo ou a
            busca (Ctrl K) para achar o que precisa.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/" variant="primary">
              <Home className="size-4" />
              Voltar para a loja
            </ButtonLink>
            <ButtonLink to="/ajuda" variant="secondary">
              <LifeBuoy className="size-4" />
              Central de ajuda
            </ButtonLink>
          </div>

          <div className="mt-10 rounded-xl border border-border bg-background-secondary p-6 text-left">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Search className="size-4 text-primary" aria-hidden="true" />
              Páginas mais acessadas
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="block rounded-lg border border-transparent px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-border hover:bg-background hover:text-foreground"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
