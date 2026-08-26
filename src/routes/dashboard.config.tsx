import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, Monitor } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDialog, type ConfirmState } from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/saviz-button";
import { CheckboxField, Field, PasswordField } from "@/components/ui/field";
import { INVOICES, LICENSE, SESSIONS } from "@/lib/account";
import { useCustomerSession } from "@/lib/customer-session";
import { isEmail, useSubmit, type Errors } from "@/lib/form";

export const Route = createFileRoute("/dashboard/config")({
  head: () => ({
    meta: [
      { title: "Configurações da conta | Savior Jordâni Studio" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SettingsPage,
});

const tabs = ["Geral", "Assinatura", "Notificações", "Sessões", "Conta"] as const;
type Tab = (typeof tabs)[number];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-background-secondary p-6">
      <h2 className="text-sm font-bold tracking-wide uppercase">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function SettingsPage() {
  const { email, signOut } = useCustomerSession();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("Geral");
  const [sessions, setSessions] = useState(SESSIONS);
  const [confirm, setConfirm] = useState<ConfirmState>(null);
  const [canceled, setCanceled] = useState(false);

  const [nome, setNome] = useState("Assinante Savior Jordâni");
  const [mail, setMail] = useState(email ?? "");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState<Errors<"nome" | "email" | "senha">>({});
  const profile = useSubmit();
  const notif = useSubmit();

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors<"nome" | "email" | "senha"> = {};
    if (nome.trim().length < 2) next.nome = "Informe seu nome.";
    if (!isEmail(mail)) next.email = "Email inválido.";
    if (senha && senha.length < 8) next.senha = "A nova senha precisa de 8 caracteres.";
    setErrors(next);
    if (Object.keys(next).length) return;
    void profile.run(() => {
      setSenha("");
      toast.success("Alterações salvas", {
        description: senha ? "Perfil e senha atualizados." : "Seus dados foram atualizados.",
      });
    });
  };

  const cancelSubscription = () =>
    setConfirm({
      title: "Cancelar sua assinatura?",
      description: `Você mantém o acesso até ${LICENSE.renewsAt}. Depois disso o painel deixa de abrir no Photoshop.`,
      confirmLabel: "Cancelar assinatura",
      danger: true,
      onConfirm: () => {
        setCanceled(true);
        toast.success("Assinatura cancelada", {
          description: `Acesso liberado até ${LICENSE.renewsAt}.`,
        });
      },
    });

  const deleteAccount = () =>
    setConfirm({
      title: "Deletar sua conta?",
      description:
        "A licença é desativada na hora e todos os dados são removidos. Essa ação não pode ser desfeita.",
      confirmLabel: "Deletar conta",
      danger: true,
      onConfirm: () => {
        toast.success("Conta deletada (demonstração).");
        void signOut();
        void navigate({ to: "/" });
      },
    });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Configurações</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Dados da conta, assinatura, notificações e segurança.
        </p>
      </header>

      <div className="flex gap-1 overflow-x-auto border-b border-border">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            aria-current={tab === t ? "page" : undefined}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
              tab === t
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Geral" ? (
        <Card title="Dados pessoais">
          <form className="space-y-4" noValidate onSubmit={saveProfile}>
            <Field
              label="Nome"
              value={nome}
              error={errors.nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Field
              label="Email"
              type="email"
              value={mail}
              error={errors.email}
              onChange={(e) => setMail(e.target.value)}
            />
            <PasswordField
              label="Nova senha"
              placeholder="Deixe em branco para manter"
              value={senha}
              error={errors.senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <Button type="submit" disabled={profile.loading}>
              {profile.loading ? "Salvando..." : "Salvar alterações"}
            </Button>
          </form>
        </Card>
      ) : null}

      {tab === "Assinatura" ? (
        <>
          <Card title="Plano atual">
            <p className="text-sm">
              {LICENSE.plan} ·{" "}
              {canceled ? (
                <>
                  cancelada · acesso até <span className="font-medium">{LICENSE.renewsAt}</span>
                </>
              ) : (
                <>
                  próxima cobrança em <span className="font-medium">{LICENSE.renewsAt}</span>
                </>
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={() => toast.info("Abrindo portal de pagamento (demonstração).")}
              >
                Atualizar cartão
              </Button>
              {canceled ? (
                <Button
                  onClick={() => {
                    setCanceled(false);
                    toast.success("Assinatura reativada.");
                  }}
                >
                  Reativar assinatura
                </Button>
              ) : (
                <Button variant="ghost" onClick={cancelSubscription}>
                  Cancelar assinatura
                </Button>
              )}
            </div>
          </Card>
          <Card title="Faturas">
            <ul className="divide-y divide-border text-sm">
              {INVOICES.map((i) => (
                <li key={i.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    {i.id} · {i.date}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="font-medium">{i.value}</span>
                    <span className="text-xs text-success">{i.status}</span>
                    <button
                      type="button"
                      onClick={() => toast.success(`Recibo ${i.id} enviado para seu email.`)}
                      className="text-xs text-accent-soft hover:underline"
                    >
                      Recibo
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </>
      ) : null}

      {tab === "Notificações" ? (
        <Card title="Emails que você recebe">
          <CheckboxField label="Novas versões e atualizações do plugin" defaultChecked />
          <CheckboxField label="Tutoriais e dicas de retoque" defaultChecked />
          <CheckboxField label="Avisos de cobrança e recibos" defaultChecked />
          <CheckboxField label="Promoções e novidades da loja" />
          <Button
            disabled={notif.loading}
            onClick={() =>
              void notif.run(() => {
                toast.success("Preferências salvas.");
              })
            }

          >
            {notif.loading ? "Salvando..." : "Salvar preferências"}
          </Button>
        </Card>
      ) : null}

      {tab === "Sessões" ? (
        <Card title="Sessões ativas">
          {sessions.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              Nenhuma outra sessão ativa.
            </p>
          ) : (
            <ul className="space-y-3">
              {sessions.map((s) => (
                <li
                  key={s.device}
                  className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background-tertiary p-4"
                >
                  <Monitor className="size-5 text-accent-soft" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{s.device}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      IP {s.ip} · {s.when}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSessions((l) => l.filter((x) => x.device !== s.device));
                      toast.success(`Sessão em ${s.device} encerrada.`);
                    }}
                  >
                    Revogar
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <Button
            variant="ghost"
            disabled={sessions.length === 0}
            onClick={() =>
              setConfirm({
                title: "Encerrar todas as sessões?",
                description: "Você precisará entrar novamente em todos os dispositivos.",
                confirmLabel: "Encerrar tudo",
                danger: true,
                onConfirm: () => {
                  setSessions([]);
                  toast.success("Todas as sessões foram encerradas.");
                },
              })
            }
          >
            Revogar todas as sessões
          </Button>
        </Card>
      ) : null}

      {tab === "Conta" ? (
        <Card title="Zona de risco">
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />
            Ao deletar a conta, sua licença é desativada imediatamente e o painel deixa de abrir no
            Photoshop.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() =>
                toast.success("Exportação iniciada", {
                  description: "Enviaremos o arquivo para o email da conta.",
                })
              }
            >
              Exportar meus dados
            </Button>
            <Button variant="ghost" className="text-error hover:text-error" onClick={deleteAccount}>
              Deletar minha conta
            </Button>
          </div>
        </Card>
      ) : null}

      <ConfirmDialog state={confirm} onClose={() => setConfirm(null)} />
    </div>
  );
}
