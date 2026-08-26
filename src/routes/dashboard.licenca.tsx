import { createFileRoute, useRouterState } from "@tanstack/react-router";
import {
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  KeyRound,
  Monitor,
  RotateCcw,
  ShieldAlert,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ConfirmDialog, type ConfirmState } from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/saviz-button";
import { useCustomerSession } from "@/lib/customer-session";
import {
  fetchDevices,
  fetchLicenseCredentials,
  purchaseLicense,
  resetDevices,
  revokeDevice,
} from "@/lib/store-auth";

export const Route = createFileRoute("/dashboard/licenca")({
  head: () => ({
    meta: [
      { title: "Minha licença | Savior Jordâni Studio" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LicensePage,
});

type Device = { id: string; deviceId: string; firstSeenAt: string; lastSeenAt: string };

function LicensePage() {
  const { user, refresh } = useCustomerSession();
  const search = useRouterState({ select: (state) => state.location.search });
  const [purchasing, setPurchasing] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loadingDevices, setLoadingDevices] = useState(true);
  const [confirm, setConfirm] = useState<ConfirmState>(null);

  const hasLicense = user?.hasLicense ?? false;
  const awaitingWebhook = new URLSearchParams(search).get("checkout") === "success" && !hasLicense;

  useEffect(() => {
    if (!awaitingWebhook) return;
    let attempts = 0;
    const refreshLicense = () => {
      attempts += 1;
      void refresh();
    };
    refreshLicense();
    const timer = window.setInterval(() => {
      refreshLicense();
      if (attempts >= 12) window.clearInterval(timer);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [awaitingWebhook, refresh]);

  const loadDevices = async () => {
    if (!hasLicense) {
      setDevices([]);
      setLoadingDevices(false);
      return;
    }
    setLoadingDevices(true);
    try {
      setDevices(await fetchDevices());
    } catch {
      toast.error("Não foi possível carregar suas máquinas.");
    } finally {
      setLoadingDevices(false);
    }
  };

  useEffect(() => {
    void loadDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasLicense]);

  const buyLicense = async () => {
    setPurchasing(true);
    try {
      const result = await purchaseLicense();
      window.location.assign(result.checkoutUrl);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível emitir a licença.");
    } finally {
      setPurchasing(false);
    }
  };

  const revealKey = async () => {
    setRevealing(true);
    try {
      const result = await fetchLicenseCredentials();
      setRevealedKey(result.activationKey);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível carregar sua chave.");
    } finally {
      setRevealing(false);
    }
  };

  const copyKey = async () => {
    if (!revealedKey) return;
    try {
      await navigator.clipboard.writeText(revealedKey);
      setCopied(true);
      toast.success("Chave copiada para a área de transferência.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Não foi possível copiar. Selecione a chave manualmente.");
    }
  };

  const revoke = (device: Device) =>
    setConfirm({
      title: `Revogar "${device.deviceId}"?`,
      description:
        "O painel deixa de abrir nesse computador na próxima validação. Você pode ativar outra máquina no lugar.",
      confirmLabel: "Revogar máquina",
      danger: true,
      onConfirm: async () => {
        try {
          await revokeDevice({ data: { deviceRowId: device.id } });
          toast.success("Máquina revogada", {
            description: `${device.deviceId} perdeu o acesso à licença.`,
          });
          void loadDevices();
          void refresh();
        } catch {
          toast.error("Não foi possível revogar essa máquina.");
        }
      },
    });

  const resetAll = () =>
    setConfirm({
      title: "Resetar todas as ativações?",
      description:
        "Todos os computadores serão desconectados da sua licença. Você poderá ativar novamente informando e-mail, senha e key no Photoshop.",
      confirmLabel: "Resetar tudo",
      danger: true,
      onConfirm: async () => {
        try {
          await resetDevices();
          toast.success("Ativações resetadas", {
            description: "Nenhuma máquina está ativa agora.",
          });
          void loadDevices();
          void refresh();
        } catch {
          toast.error("Não foi possível resetar as ativações.");
        }
      },
    });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Gerenciar licença</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sua chave é validada online sempre que o painel abre no Photoshop.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-background-secondary p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-bold tracking-wide uppercase">Sua licença</h2>
          {hasLicense ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
              <CheckCircle2 className="size-3.5" />
              Ativa
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background-tertiary px-2.5 py-1 text-xs font-medium text-muted-foreground">
              Sem licença
            </span>
          )}
        </div>

        {awaitingWebhook ? (
          <p className="mt-4 rounded-lg border border-primary/30 bg-background-tertiary px-3 py-2 text-sm text-muted-foreground">
            Pagamento recebido. Estamos confirmando sua assinatura. Esta página será atualizada
            automaticamente.
          </p>
        ) : null}

        {!hasLicense ? (
          <div className="mt-5 space-y-4">
            <p className="text-sm text-muted-foreground">
              Sua conta ainda não tem uma licença ativa. Após o pagamento confirmado pela Stripe,
              sua key de ativação aparecerá aqui. O Photoshop pede e-mail, senha e essa key no
              primeiro login.
            </p>
            <Button onClick={() => void buyLicense()} disabled={purchasing}>
              <KeyRound className="size-4" />
              <ExternalLink className="size-4" />
              {purchasing ? "Abrindo checkout..." : "Adquirir licença"}
            </Button>
          </div>
        ) : revealedKey ? (
          <div className="mt-5 space-y-2">
            <p className="flex items-start gap-2 text-xs text-warning">
              <ShieldAlert className="mt-0.5 size-3.5 shrink-0" />
              Mantenha esta key em local seguro. Não a compartilhe.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <code className="flex-1 rounded-lg border border-border bg-background-tertiary px-3 py-2.5 font-mono text-sm tracking-wider">
                {revealedKey}
              </code>
              <Button variant="secondary" onClick={copyKey}>
                <Copy className="size-4" />
                {copied ? "Copiado!" : "Copiar"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-2">
            <p className="text-xs text-muted-foreground">Chave de licença</p>
            <Button variant="secondary" onClick={() => void revealKey()} disabled={revealing}>
              <KeyRound className="size-4" />
              {revealing ? "Carregando..." : "Ver minha key de ativação"}
            </Button>
          </div>
        )}

        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          {[
            ["Email da Conta", user?.email ?? "Não informado"],
            ["Máquinas permitidas", user ? String(user.maxDevices) : "Não informado"],
            [
              "Renovação",
              user?.subscriptionRenewsAt
                ? new Date(user.subscriptionRenewsAt).toLocaleDateString("pt-BR")
                : "Não informada",
            ],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-border pb-2">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
          <div>
            <p className="text-sm font-semibold">Instalador para Windows</p>
            <p className="text-xs text-muted-foreground">savizstudio-installer.exe (350 KB)</p>
          </div>
          <a
            href="/savizstudio-installer.exe"
            download="savizstudio-installer.exe"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Download className="size-4" />
            Baixar Instalador
          </a>
        </div>
      </section>

      {hasLicense ? (
        <section className="rounded-2xl border border-border bg-background-secondary p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-bold tracking-wide uppercase">
              Máquinas ativadas ({devices.length}/{user?.maxDevices ?? 0})
            </h2>
            <Button variant="ghost" onClick={resetAll} disabled={devices.length === 0}>
              <RotateCcw className="size-4" />
              Resetar todas
            </Button>
          </div>

          {loadingDevices ? (
            <p className="mt-4 text-sm text-muted-foreground">Carregando...</p>
          ) : devices.length === 0 ? (
            <div className="mt-4 rounded-lg border border-dashed border-border p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Nenhuma máquina ativada. Abra o painel no Photoshop e informe e-mail, senha e key
                para ativar.
              </p>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {devices.map((d) => (
                <li
                  key={d.id}
                  className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background-tertiary p-4"
                >
                  <Monitor className="size-5 text-accent-soft" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-sm font-medium">{d.deviceId}</p>
                    <p className="text-xs text-muted-foreground">
                      Ativado em {new Date(d.firstSeenAt).toLocaleDateString("pt-BR")} · Última vez
                      em {new Date(d.lastSeenAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <Button variant="secondary" onClick={() => revoke(d)}>
                    Revogar
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            Revogue um dispositivo para liberar espaço para outro.
          </p>
        </section>
      ) : null}

      <ConfirmDialog state={confirm} onClose={() => setConfirm(null)} />
    </div>
  );
}
