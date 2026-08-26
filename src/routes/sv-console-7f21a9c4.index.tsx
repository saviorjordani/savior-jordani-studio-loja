import { createFileRoute } from "@tanstack/react-router";
import { Download, Receipt } from "lucide-react";
import { useMemo, useState } from "react";
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

function AdminHome() {
  const max = Math.max(...MRR_SERIES.map((d) => d.v));
  const [txStatus, setTxStatus] = useState<(typeof txFilters)[number]>("Todas");
  const transactions = useMemo(
    () => TRANSACTIONS.filter((t) => txStatus === "Todas" || t.status === txStatus),
    [txStatus],
  );


  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-foreground">Visão geral</h1>
        <p className="mt-1 text-sm text-muted-foreground">Dados de demonstração dos últimos 6 meses.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {METRICS.map((m) => (
          <div key={m.label} className="rounded-2xl border border-border bg-background-secondary p-5">
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className="mt-2 font-mono text-2xl font-bold text-foreground">{m.value}</p>
            <p className="mt-1 text-xs text-accent-soft">{m.delta} vs. mês anterior</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-border bg-background-secondary p-6">
        <h2 className="text-sm font-semibold text-foreground">Evolução do MRR</h2>
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
