import { createFileRoute } from "@tanstack/react-router";
import { Download, Monitor } from "lucide-react";
import { toast } from "sonner";
import installerAsset from "@/assets/installer.asset.json";
import { ButtonLink } from "@/components/ui/saviz-button";
import { CHANGELOG, LICENSE } from "@/lib/account";


export const Route = createFileRoute("/dashboard/download")({
  head: () => ({
    meta: [
      { title: "Download do plugin | Savior Jordâni Studio" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardDownload,
});

const sizeMb = (installerAsset.size / 1024 / 1024).toFixed(1).replace(".", ",");

function DashboardDownload() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Download</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Instalador exclusivo para assinantes com licença ativa.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-background-secondary p-6 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl border border-border bg-background-tertiary">
          <Monitor className="size-6 text-accent-soft" />
        </span>
        <p className="mt-4 text-base font-semibold">Savior Jordâni Studio Plugin</p>
        <p className="font-mono text-xs text-muted-foreground">
          Versão {LICENSE.version} · {installerAsset.original_filename} · {sizeMb} MB
        </p>
        <a
          href={installerAsset.url}
          download={installerAsset.original_filename}
          onClick={() =>
            toast.success("Download iniciado", {
              description: "Feche o Photoshop antes de executar o instalador.",
            })
          }
          className="mt-5 inline-flex h-12 w-full max-w-sm items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity duration-200 hover:opacity-90"
        >
          <Download className="size-4" />
          Baixar instalador para Windows
        </a>

        <ul className="mx-auto mt-5 max-w-sm space-y-1 text-left text-xs text-muted-foreground">
          <li>• Adobe Photoshop CC 2021 ou superior</li>
          <li>• Windows 10 ou 11 (64 bits)</li>
          <li>• Conexão com a internet para validar a licença</li>
          <li>• Feche o Photoshop antes de executar o instalador</li>
        </ul>
        <ButtonLink to="/instalacao" variant="secondary" className="mt-5">
          Ver guia de instalação
        </ButtonLink>
      </section>

      <section className="rounded-2xl border border-border bg-background-secondary p-6">
        <h2 className="text-sm font-bold tracking-wide uppercase">Changelog</h2>
        <ol className="mt-4 space-y-5">
          {CHANGELOG.map((c) => (
            <li key={c.v}>
              <p className="font-mono text-sm text-accent-soft">
                v{c.v} <span className="text-muted-foreground">· {c.date}</span>
              </p>
              <ul className="mt-1.5 space-y-1 text-sm text-muted-foreground">
                {c.items.map((i) => (
                  <li key={i}>• {i}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
