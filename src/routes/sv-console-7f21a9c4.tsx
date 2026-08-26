import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, LogOut, Package, ShieldCheck, Store, Users } from "lucide-react";
import { useState } from "react";
import { Field, PasswordField } from "@/components/ui/field";
import { Button } from "@/components/ui/saviz-button";
import { isEmail } from "@/lib/form";
import { isSuperAdmin, signIn, signOut, useSession } from "@/lib/auth";

export const Route = createFileRoute("/sv-console-7f21a9c4")({
  head: () => ({
    meta: [
      { title: "Console" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ConsoleLayout,
});

const BASE = "/sv-console-7f21a9c4" as const;

const nav = [
  { to: BASE, icon: BarChart3, label: "Visão geral", exact: true },
  { to: `${BASE}/plugin`, icon: Package, label: "Plugin", exact: false },
  { to: `${BASE}/loja`, icon: Store, label: "Loja", exact: false },
  { to: `${BASE}/usuarios`, icon: Users, label: "Usuários", exact: false },
];

function ConsoleGate() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(email) || password.length < 6) {
      setError("Credenciais inválidas.");
      return;
    }
    if (!isSuperAdmin(email)) {
      setError("Credenciais inválidas.");
      return;
    }
    signIn(email);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-border bg-background-secondary p-6"
      >
        <div className="mb-5 flex items-center gap-2 font-mono text-[11px] tracking-widest text-accent-soft uppercase">
          <ShieldCheck className="size-4" />
          Acesso restrito
        </div>
        <div className="space-y-4">
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <PasswordField
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </div>
      </form>
    </div>
  );
}

function ConsoleLayout() {
  const { signedIn, ready, email, isAdmin } = useSession();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Verificando acesso…
      </div>
    );
  }

  if (!signedIn || !isAdmin) return <ConsoleGate />;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background-secondary">
        <div className="container-page flex h-14 items-center justify-between">
          <span className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-accent-soft uppercase">
            <ShieldCheck className="size-4" />
            Savior Jordâni Console
          </span>
          <span className="truncate text-xs text-muted-foreground">{email}</span>
        </div>
      </header>

      <div className="container-page flex flex-col gap-8 py-10 lg:flex-row">
        <aside className="lg:w-60 lg:shrink-0">
          <div className="rounded-2xl border border-border bg-background-secondary p-4">
            <nav className="flex gap-1 overflow-x-auto lg:flex-col">
              {nav.map((item) => {
                const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                      active
                        ? "bg-background-tertiary text-accent-soft"
                        : "text-muted-foreground hover:bg-background-tertiary hover:text-foreground"
                    }`}
                  >
                    <item.icon className="size-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  signOut();
                  navigate({ to: "/", replace: true });
                }}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-background-tertiary hover:text-foreground"
              >
                <LogOut className="size-4 shrink-0" />
                Sair
              </button>
            </nav>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
