import { createFileRoute } from "@tanstack/react-router";
import { Search, UserSearch } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ConfirmDialog, type ConfirmState } from "@/components/ConfirmDialog";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/saviz-button";
import { USERS } from "@/lib/admin";

export const Route = createFileRoute("/sv-console-7f21a9c4/usuarios")({
  head: () => ({
    meta: [
      { title: "Usuários | Admin Savior Jordâni Studio" },
      { name: "description", content: "Busca, filtros e ações sobre os assinantes do Savior Jordâni Studio." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminUsers,
});

const filters = ["Todos", "Ativo", "Inadimplente", "Bloqueado"] as const;

const tone: Record<string, string> = {
  Ativo: "text-accent-soft",
  Inadimplente: "text-foreground",
  Bloqueado: "text-destructive",
};

function AdminUsers() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof filters)[number]>("Todos");
  const [users, setUsers] = useState(USERS);
  const [confirm, setConfirm] = useState<ConfirmState>(null);

  const rows = useMemo(
    () =>
      users.filter(
        (u) =>
          (status === "Todos" || u.status === status) &&
          u.email.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [users, query, status],
  );

  const resetMachines = (email: string) =>
    setConfirm({
      title: "Resetar máquinas ativadas?",
      description: `Todas as ativações de ${email} serão liberadas e o usuário precisará entrar novamente no plugin.`,
      confirmLabel: "Resetar",
      danger: true,
      onConfirm: () => {
        setUsers((prev) => prev.map((u) => (u.email === email ? { ...u, machines: 0 } : u)));
        toast.success("Máquinas liberadas");
      },
    });

  const toggleBlock = (email: string, blocked: boolean) => {
    const apply = () => {
      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, status: blocked ? "Ativo" : "Bloqueado" } : u)),
      );
      toast.success(blocked ? "Usuário desbloqueado" : "Usuário bloqueado");
    };
    if (blocked) return apply();
    setConfirm({
      title: "Bloquear este usuário?",
      description: `${email} perde o acesso ao plugin e à área do cliente imediatamente.`,
      confirmLabel: "Bloquear",
      danger: true,
      onConfirm: apply,
    });
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-foreground">Usuários</h1>
        <p className="mt-1 text-sm text-muted-foreground">{users.length} assinantes cadastrados.</p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background-secondary px-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por e-mail"
            aria-label="Buscar usuários por e-mail"
            className="w-full bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setStatus(f)}
              className={`rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                status === f
                  ? "bg-background-tertiary text-accent-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <section className="rounded-2xl border border-border bg-background-secondary">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr>
                {["E-mail", "Plano", "Status", "Máquinas", "Desde", ""].map((h) => (
                  <th key={h} className="px-6 py-3 font-medium whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.email} className="border-t border-border">
                  <td className="px-6 py-3 whitespace-nowrap text-foreground">{u.email}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-muted-foreground">{u.plan}</td>
                  <td className={`px-6 py-3 font-medium whitespace-nowrap ${tone[u.status] ?? ""}`}>
                    {u.status}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-muted-foreground">{u.machines}/2</td>
                  <td className="px-6 py-3 whitespace-nowrap text-muted-foreground">{u.since}</td>
                  <td className="px-6 py-3 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        disabled={u.machines === 0}
                        onClick={() => resetMachines(u.email)}
                      >
                        Resetar máquinas
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => toggleBlock(u.email, u.status === "Bloqueado")}
                      >
                        {u.status === "Bloqueado" ? "Desbloquear" : "Bloquear"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 ? (
          <EmptyState
            icon={UserSearch}
            title="Nenhum usuário encontrado"
            description="Ajuste a busca por email ou troque o filtro de status para ver outros resultados."
          />
        ) : null}
      </section>

      <ConfirmDialog state={confirm} onClose={() => setConfirm(null)} />
    </div>
  );
}
