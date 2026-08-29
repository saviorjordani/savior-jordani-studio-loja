import { Link } from "@tanstack/react-router";
import { Aperture, Instagram, Mail, Youtube } from "lucide-react";

const cols = [
  {
    title: "Produto",
    items: [
      { label: "O plugin", to: "/plugin" as const },
      { label: "Plano e preço", to: "/pricing" as const },
      { label: "Ferramentas", to: "/recursos" as const },
      { label: "Resultados", to: "/resultados" as const },
    ],
  },
  {
    title: "Ajuda",
    items: [
      { label: "Central de ajuda", to: "/ajuda" as const },
      { label: "Instalação do plugin", to: "/instalacao" as const },
      { label: "Política de reembolso", to: "/reembolso" as const },
      { label: "Status", to: "/status" as const },
    ],
  },
  {
    title: "Empresa",
    items: [
      { label: "Sobre", to: "/sobre" as const },
      { label: "Afiliados", to: "/afiliados" as const },
      { label: "Termos de uso", to: "/termos" as const },
      { label: "Privacidade", to: "/privacidade" as const },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="gradient-accent flex size-7 items-center justify-center rounded-md">
              <Aperture className="size-4 text-primary-foreground" strokeWidth={2.2} />
            </span>
            <span className="text-sm font-bold">Savior Jordâni Studio</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Um único plugin de retoque para Photoshop, feito para fotógrafos e retocadores
            profissionais. Licença anual com renovação opcional.
          </p>
          <div className="mt-4 flex items-center gap-2">
            {[Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="https://instagram.com/savizstudio"
                target="_blank"
                rel="noreferrer"
                aria-label="Redes sociais Savior Jordâni Studio"
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
            <Link
              to="/contato"
              aria-label="Contato"
              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-4" />
            </Link>
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-xs font-semibold tracking-[0.14em] text-foreground uppercase">
              {c.title}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {c.items.map((it) => (
                <li key={it.label}>
                  <Link to={it.to} className="transition-colors hover:text-foreground">
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted-foreground md:flex-row">
          <span>© 2026 Savior Jordâni Studio · CNPJ 00.000.000/0001-00</span>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {["Pix", "Visa", "Mastercard", "Elo", "Amex", "Boleto"].map((m) => (
              <span
                key={m}
                className="rounded border border-border px-2 py-1 font-mono text-[11px]"
              >
                {m}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <Link to="/termos" className="transition-colors hover:text-foreground">
              Termos
            </Link>
            <Link to="/privacidade" className="transition-colors hover:text-foreground">
              Privacidade
            </Link>
            <Link to="/contato" className="transition-colors hover:text-foreground">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
