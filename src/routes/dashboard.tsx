import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { Download, KeyRound, LayoutDashboard, LifeBuoy, LogOut, Settings } from "lucide-react";
import { useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { ButtonLink } from "@/components/ui/saviz-button";
import { toast } from "sonner";
import { useCustomerSession } from "@/lib/customer-session";


export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Área do cliente | Savior Jordâni Studio" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardLayout,
});

const nav = [
  { to: "/dashboard" as const, icon: LayoutDashboard, label: "Início", exact: true },
  { to: "/dashboard/licenca" as const, icon: KeyRound, label: "Licença" },
  { to: "/dashboard/download" as const, icon: Download, label: "Download" },
  { to: "/dashboard/config" as const, icon: Settings, label: "Configurações" },
];

function DashboardLayout() {
  const { signedIn, ready, email, signOut } = useCustomerSession();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (ready && !signedIn) navigate({ to: "/login", replace: true });
  }, [ready, signedIn, navigate]);

  if (!ready || !signedIn) {
    return (
      <SiteLayout>
        <div className="container-page section-y text-center text-sm text-muted-foreground">
          Verificando seu acesso…
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="container-page flex flex-col gap-8 py-10 lg:flex-row">
        <aside className="lg:w-60 lg:shrink-0">
          <div className="rounded-2xl border border-border bg-background-secondary p-4">
            <p className="truncate px-2 pb-1 text-xs text-muted-foreground">{email}</p>
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
              <Link
                to="/ajuda"
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-background-tertiary hover:text-foreground"
              >
                <LifeBuoy className="size-4 shrink-0" />
                Suporte
              </Link>
              <button
                type="button"
                onClick={() => {
                  void signOut();
                  toast.success("Sessão encerrada.");
                  navigate({ to: "/", replace: true });
                }}

                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-background-tertiary hover:text-foreground"
              >
                <LogOut className="size-4 shrink-0" />
                Sair
              </button>
            </nav>
          </div>
          <ButtonLink to="/instalacao" variant="secondary" className="mt-4 hidden w-full lg:flex">
            Guia de instalação
          </ButtonLink>
        </aside>

        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </SiteLayout>
  );
}
