import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDialog, type ConfirmState } from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/saviz-button";
import { VERSIONS } from "@/lib/admin";
import { CHANGELOG } from "@/lib/account";
import { useSubmit } from "@/lib/form";

export const Route = createFileRoute("/sv-console-7f21a9c4/plugin")({
  head: () => ({
    meta: [
      { title: "Gerenciar plugin | Admin Savior Jordâni Studio" },
      { name: "description", content: "Versões publicadas, upload de build e changelog do plugin Savior Jordâni Studio." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPlugin,
});

function AdminPlugin() {
  const [killSwitch, setKillSwitch] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmState>(null);
  const [versions, setVersions] = useState(VERSIONS);
  const [version, setVersion] = useState("1.0.5");
  const [file, setFile] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { loading, run } = useSubmit();

  const publish = () => {
    if (!/^\d+\.\d+\.\d+$/.test(version.trim())) {
      setError("Use o formato x.y.z (ex.: 1.0.5).");
      return;
    }
    if (versions.some((v) => v.v === version.trim())) {
      setError("Essa versão já existe.");
      return;
    }
    if (!file) {
      setError("Selecione o instalador .exe.");
      return;
    }
    setError(null);
    void run(() => {
      setVersions((prev) => [
        {
          v: version.trim(),
          date: new Date().toLocaleDateString("pt-BR"),
          status: "Publicada",
          downloads: 0,
        },
        ...prev.map((p) => (p.status === "Publicada" ? { ...p, status: "Arquivada" } : p)),
      ]);
      setFile(null);
      setNotes("");
      toast.success(`Versão ${version.trim()} publicada`);
    });
  };

  const archive = (v: string) =>
    setConfirm({
      title: `Arquivar a versão ${v}?`,
      description: "Ela deixa de ser oferecida como download na área do cliente.",
      confirmLabel: "Arquivar",
      danger: true,
      onConfirm: () => {
        setVersions((prev) => prev.map((p) => (p.v === v ? { ...p, status: "Arquivada" } : p)));
        toast.success(`Versão ${v} arquivada`);
      },
    });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-foreground">Plugin</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Controle de versões do instalador e do changelog público.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-background-secondary p-6">
        <h2 className="text-sm font-semibold text-foreground">Nova versão</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            <span className="text-muted-foreground">Número da versão</span>
            <input
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm text-foreground outline-none focus:border-primary"
            />
          </label>
          <label className="text-sm">
            <span className="text-muted-foreground">Arquivo (.exe)</span>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-dashed border-border bg-background px-3 py-2.5 text-sm text-muted-foreground focus-within:border-primary">
              <Upload className="size-4 shrink-0" />
              <span className="truncate">{file ?? "Selecionar instalador"}</span>
              <input
                type="file"
                accept=".exe"
                aria-label="Selecionar instalador"
                onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)}
                className="ml-auto w-28 shrink-0 cursor-pointer text-xs opacity-0"
              />
            </div>
          </label>
        </div>
        <label className="mt-4 block text-sm">
          <span className="text-muted-foreground">Notas da versão</span>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="- Correções de desempenho…"
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
          />
        </label>
        {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
        <Button className="mt-4" disabled={loading} onClick={publish}>
          {loading ? "Publicando…" : "Publicar versão"}
        </Button>
      </section>

      <section className="rounded-2xl border border-border bg-background-secondary">
        <h2 className="border-b border-border px-6 py-4 text-sm font-semibold text-foreground">
          Versões
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr>
                {["Versão", "Data", "Status", "Downloads", ""].map((h) => (
                  <th key={h} className="px-6 py-3 font-medium whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {versions.map((v) => (
                <tr key={v.v} className="border-t border-border">
                  <td className="px-6 py-3 font-mono whitespace-nowrap text-foreground">{v.v}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-muted-foreground">{v.date}</td>
                  <td
                    className={`px-6 py-3 whitespace-nowrap font-medium ${
                      v.status === "Publicada" ? "text-accent-soft" : "text-muted-foreground"
                    }`}
                  >
                    {v.status}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-muted-foreground">{v.downloads}</td>
                  <td className="px-6 py-3 text-right whitespace-nowrap">
                    <Button
                      variant="ghost"
                      disabled={v.status === "Arquivada"}
                      onClick={() => archive(v.v)}
                    >
                      {v.status === "Arquivada" ? "Arquivada" : "Arquivar"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-background-secondary p-6">
        <h2 className="text-sm font-semibold text-foreground">Changelog público</h2>
        <ul className="mt-4 space-y-4">
          {CHANGELOG.map((c) => (
            <li key={c.v} className="border-l-2 border-border pl-4">
              <p className="font-mono text-sm text-accent-soft">
                v{c.v} <span className="text-muted-foreground">· {c.date}</span>
              </p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-muted-foreground">
                {c.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-destructive/40 bg-destructive/5 p-6">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-destructive">
          <AlertTriangle className="size-4" />
          Kill switch
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Bloqueia a validação de licença de todas as versões e derruba os painéis abertos.
        </p>
        <Button
          variant={killSwitch ? "primary" : "secondary"}
          className="mt-4"
          onClick={() =>
            setConfirm({
              title: killSwitch ? "Reativar o plugin?" : "Ativar o kill switch?",
              description: killSwitch
                ? "A validação de licença volta a funcionar para todos os assinantes."
                : "Todos os painéis abertos serão derrubados e nenhuma licença será validada.",
              confirmLabel: killSwitch ? "Reativar" : "Ativar",
              danger: !killSwitch,
              onConfirm: () => {
                setKillSwitch((v) => !v);
                toast[killSwitch ? "success" : "error"](
                  killSwitch ? "Plugin reativado" : "Kill switch ativado",
                );
              },
            })
          }
        >
          {killSwitch ? "Kill switch ativo: reativar plugin" : "Ativar kill switch"}
        </Button>
      </section>

      <ConfirmDialog state={confirm} onClose={() => setConfirm(null)} />
    </div>
  );
}
