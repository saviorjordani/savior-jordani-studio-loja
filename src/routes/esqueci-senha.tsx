import { createFileRoute, Link } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AuthCard } from "@/components/AuthCard";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/saviz-button";
import { Field } from "@/components/ui/field";
import { isEmail, useSubmit } from "@/lib/form";

import { requestPasswordReset } from "@/lib/email-actions";

const title = "Recuperar senha | Savior Jordâni Studio";
const description =
  "Recupere o acesso à sua área de cliente Savior Jordâni Studio e volte a baixar o plugin e gerenciar sua licença.";

export const Route = createFileRoute("/esqueci-senha")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [sent, setSent] = useState(false);
  const { loading, run } = useSubmit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setError("Informe um email válido.");
      return;
    }
    setError(undefined);
    void run(async () => {
      await requestPasswordReset({ data: { email } });
      setSent(true);
      toast.success("Link enviado", { description: "Confira sua caixa de entrada e o spam." });
    });
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Recuperar senha"
        subtitle="Enviaremos um link de redefinição para o email da sua assinatura."
        footer={
          <span>
            Lembrou a senha?{" "}
            <Link to="/login" className="font-semibold text-accent-soft hover:underline">
              Entrar
            </Link>
          </span>
        }
      >
        {sent ? (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-border bg-background-tertiary">
              <MailCheck className="size-5 text-accent-soft" />
            </div>
            <p className="rounded-lg border border-border bg-background-tertiary p-4 text-sm text-muted-foreground">
              Se existir uma conta com <span className="text-foreground">{email}</span>, o link de
              redefinição chega em alguns minutos. Confira também a caixa de spam.
            </p>
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => setSent(false)}
            >
              Usar outro email
            </Button>
          </div>
        ) : (
          <form className="space-y-5" noValidate onSubmit={handleSubmit}>
            <Field
              label="Email"
              type="email"
              placeholder="voce@email.com"
              autoComplete="email"
              value={email}
              error={error}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Enviando..." : "Enviar link de recuperação"}
            </Button>
          </form>
        )}
      </AuthCard>
    </AuthLayout>
  );
}
