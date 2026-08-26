import { Link } from "@tanstack/react-router";
import { Aperture, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchDialog } from "@/components/SearchDialog";
import { ButtonLink, Button } from "@/components/ui/saviz-button";
import { useCustomerSession } from "@/lib/customer-session";

const links = [
  { label: "O plugin", to: "/plugin" as const },
  { label: "Recursos", to: "/recursos" as const },
  { label: "Resultados", to: "/resultados" as const },
  { label: "Preços", to: "/pricing" as const },
  { label: "FAQ", to: "/faq" as const },
  { label: "Ajuda", to: "/ajuda" as const },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { signedIn } = useCustomerSession();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);


  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container-page flex h-16 items-center gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="gradient-accent flex size-8 items-center justify-center rounded-lg">
            <Aperture className="size-5 text-primary-foreground" strokeWidth={2.2} />
          </span>
          <span className="text-base font-bold tracking-tight">
            Savior Jordâni <span className="text-accent-soft">Studio</span>
          </span>
        </Link>

        <div className="hidden flex-1 items-center md:flex">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar na loja"
            className="relative flex h-10 w-full max-w-md items-center rounded-lg border border-border bg-background-secondary pr-3 pl-9 text-left text-sm text-muted-foreground transition-colors duration-200 hover:border-primary/60 hover:text-foreground"
          >
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            Buscar no site
            <span className="ml-auto hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] lg:inline">
              Ctrl K
            </span>
          </button>
        </div>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          <ButtonLink to={signedIn ? "/dashboard" : "/login"} variant="ghost">
            <User className="size-4" />
            {signedIn ? "Minha conta" : "Entrar"}
          </ButtonLink>
          <Button variant="secondary" aria-label="Abrir carrinho" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="size-4" />
            <span className="rounded bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">
              1
            </span>
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-1 md:hidden">
          <button
            type="button"
            aria-label="Buscar na loja"
            onClick={() => setSearchOpen(true)}
            className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground"
          >
            <Search className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Abrir carrinho"
            onClick={() => setCartOpen(true)}
            className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground"
          >
            <ShoppingCart className="size-5" />
          </button>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

      </div>

      <div className="hidden border-t border-border md:block">
        <nav className="container-page flex h-11 items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              activeOptions={{ exact: (l.to as string) === "/" }}
              activeProps={{
                className: "bg-background-secondary text-foreground",
                "aria-current": "page",
              }}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <span className="ml-auto text-xs text-muted-foreground">
            Suporte: contato@saviz.com.br
          </span>
        </nav>
      </div>

      {open ? (
        <div className="border-t border-border bg-background-secondary md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: (l.to as string) === "/" }}
                activeProps={{
                  className: "bg-background text-foreground",
                  "aria-current": "page",
                }}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <ButtonLink
              to={signedIn ? "/dashboard" : "/login"}
              variant="secondary"
              className="mt-2"
              onClick={() => setOpen(false)}
            >
              {signedIn ? "Minha conta" : "Entrar"}
            </ButtonLink>
            <ButtonLink to="/checkout" className="mt-1" onClick={() => setOpen(false)}>
              Assinar agora
            </ButtonLink>
          </div>
        </div>
      ) : null}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

    </header>
  );
}
