import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthCard } from "@/components/AuthCard";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/saviz-button";
import { CheckboxField, Field, PasswordField } from "@/components/ui/field";
import { refreshCustomerSession } from "@/lib/customer-session";
import { loginAccount } from "@/lib/store-auth";
import { isEmail, useSubmit, type Errors } from "@/lib/form";

const title = "Entrar | Savior Jordâni Studio";
const description =
  "Acesse sua área de membro Savior Jordâni Studio para gerenciar a licença, baixar o plugin e ver as atualizações.";

export const Route = createFileRoute("/login")({
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
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors<"email" | "password">>({});
  const { loading, run } = useSubmit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors<"email" | "password"> = {};
    if (!email.trim()) next.email = "Informe seu email.";
    else if (!isEmail(email)) next.email = "Email inválido.";
    if (!password) next.password = "Informe sua senha.";
    else if (password.length < 6) next.password = "A senha tem pelo menos 6 caracteres.";
    setErrors(next);
    if (Object.keys(next).length) return;

    void run(async () => {
      try {
        await loginAccount({ data: { email, password } });
        refreshCustomerSession();
        toast.success("Bem-vindo de volta!", {
          description: "Sessão iniciada com sucesso.",
        });
        navigate({ to: "/dashboard" });
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Não foi possível entrar.");
      }
    }, 300);
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Bem-vindo de volta!"
        subtitle="Entre para acessar sua licença e o download do plugin."
        footer={
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link to="/esqueci-senha" className="transition-colors hover:text-foreground">
              Esqueceu a senha?
            </Link>
            <span className="text-border">|</span>
            <span>
              Não tem conta?{" "}
              <Link to="/register" className="font-semibold text-accent-soft hover:underline">
                Registre-se
              </Link>
            </span>
          </div>
        }
      >
        <form className="space-y-5" noValidate onSubmit={handleSubmit}>
          <Field
            label="Email"
            type="email"
            placeholder="voce@email.com"
            autoComplete="email"
            value={email}
            error={errors.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordField
            label="Senha"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            error={errors.password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CheckboxField label="Lembrar-me por 30 dias" defaultChecked />
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
