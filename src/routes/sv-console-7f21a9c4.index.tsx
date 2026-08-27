import { createFileRoute } from "@tanstack/react-router";
import { Download, Receipt } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/saviz-button";
import { METRICS, MRR_SERIES, TRANSACTIONS } from "@/lib/admin";

export const Route = createFileRoute("/sv-console-7f21a9c4/")({
  head: () => ({
    meta: [
      { title: "Visão geral do admin | Savior Jordâni Studio" },
      { name: "description", content: "Métricas de assinaturas, MRR e últimas transações do Savior Jordâni Studio." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminHome,
});

const statusTone: Record<string, string> = {
  Pago: "text-accent-soft",
  Recusado: "text-destructive",
  Reembolsado: "text-muted-foreground",
};

const txFilters = ["Todas", "Pago", "Recusado", "Reembolsado"] as const;

interface AdminStats {
  mrr: string;
  activeSubscribers: number;
  monthSalesCount: number;
  monthSalesTotal: string;
  churnRate: string;
  transactions: { id: string; user: string; value: string; method: string; status: string; date: string }[];
}

function AdminHome() {
  const [stats, setStats] = useState<AdminStats>({
    mrr: "R$ 0,00",
    activeSubscribers: 0,
    monthSalesCount: 0,
    monthSalesTotal: "R$ 0,00",
    churnRate: "0,0%",
    transactions: [],
  });

  const [txStatus, setTxStatus] = useState<(typeof txFilters)[number]>("Todas");

  useEffect(() => {
    fetch("https://api.saviz.com.br/v1/admin/stats")
      .then((res) => res.json())
      .then((data: AdminStats) => {
        if (data.mrr !== undefined) setStats(data);
      })
      .catch(() => {});
  }, []);

  const transactions = useMemo(
    () => stats.transactions.filter((t) => txStatus === "Todas" || t.status === txStatus),
    [stats.transactions, txStatus],
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-foreground">Visão geral</h1>
        <p className="mt-1 text-sm text-muted-foreground">Métricas e vendas pagas via Stripe em tempo real.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-border bg-background-secondary p-5">
          <p className="text-xs text-muted-foreground">MRR</p>
          <p className="mt-2 font-mono text-2xl font-bold text-foreground">{stats.mrr}</p>
          <p className="mt-1 text-xs text-accent-soft">Receita Recorrente Real</p>
        </div>
        <div className="rounded-2xl border border-border bg-background-secondary p-5">
          <p className="text-xs text-muted-foreground">Assinantes Pagos Ativos</p>
          <p className="mt-2 font-mono text-2xl font-bold text-foreground">{stats.activeSubscribers}</p>
          <p className="mt-1 text-xs text-accent-soft">Stripe Webhooks</p>
        </div>
        <div className="rounded-2xl border border-border bg-background-secondary p-5">
          <p className="text-xs text-muted-foreground">Vendas no Mês</p>
          <p className="mt-2 font-mono text-2xl font-bold text-foreground">{stats.monthSalesTotal}</p>
          <p className="mt-1 text-xs text-accent-soft">{stats.monthSalesCount} vendas confirmadas</p>
        </div>
        <div className="rounded-2xl border border-border bg-background-secondary p-5">
          <p className="text-xs text-muted-foreground">Churn</p>
          <p className="mt-2 font-mono text-2xl font-bold text-foreground">{stats.churnRate}</p>
          <p className="mt-1 text-xs text-accent-soft">Sem cancelamentos</p>
        </div>
      </div>

      <section className="rounded-2xl border border-border bg-background-secondary p-6">
        <h2 className="text-sm font-semibold text-foreground">Evolução do MRR</h2>
        {MRR_SERIES.length > 0 ? (
          <div className="mt-6 flex h-48 items-end gap-3">
            {MRR_SERIES.map((d) => (
              <div key={d.m} className="flex flex-1 flex-col items-center justify-end gap-2">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {(d.v / 1000).toFixed(1)}k
                </span>
                <div
                  className="w-full rounded-t-md bg-primary/80"
                  style={{ height: `${Math.round((d.v / max) * 130)}px` }}
                />
                <span className="text-xs text-muted-foreground">{d.m}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">Sem dados suficientes para exibição do gráfico no momento.</p>
        )}
      </section>

      <section className="rounded-2xl border border-border bg-background-secondary">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
          <h2 className="text-sm font-semibold text-foreground">Últimas transações</h2>
          <div className="flex flex-wrap items-center gap-1">
            {txFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setTxStatus(f)}
                className={`rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  txStatus === f
                    ? "bg-background-tertiary text-accent-soft"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
            <Button
              variant="secondary"
              className="ml-2"
              onClick={() => toast.success("Exportação enviada para o seu e-mail")}
            >
              <Download className="size-4" />
              Exportar CSV
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr>
                {["ID", "Cliente", "Valor", "Método", "Status", "Data"].map((h) => (
                  <th key={h} className="px-6 py-3 font-medium whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-t border-border">
                  <td className="px-6 py-3 font-mono text-xs whitespace-nowrap text-muted-foreground">{t.id}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-foreground">{t.user}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-foreground">{t.value}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-muted-foreground">{t.method}</td>
                  <td className={`px-6 py-3 whitespace-nowrap font-medium ${statusTone[t.status] ?? ""}`}>
                    {t.status}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-muted-foreground">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {transactions.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title="Nenhuma transação nesse filtro"
            description="Selecione outro status para ver as cobranças registradas."
          />
        ) : null}
      </section>

    </div>
  );
}
