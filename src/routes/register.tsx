import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthCard } from "@/components/AuthCard";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/saviz-button";
import { CheckboxField, Field, PasswordField } from "@/components/ui/field";
import { refreshCustomerSession } from "@/lib/customer-session";
import { registerAccount } from "@/lib/store-auth";
import { isEmail, useSubmit, type Errors } from "@/lib/form";

const title = "Criar conta | Savior Jordâni Studio";
const description =
  "Crie sua conta Savior Jordâni Studio para ativar a licença do plugin de retoque para Photoshop e baixar as atualizações.";

export const Route = createFileRoute("/register")({
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
  component: RegisterPage,
});

type FormKey = "nome" | "email" | "senha" | "confirmar" | "termos";

function RegisterPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ nome: "", email: "", senha: "", confirmar: "" });
  const [aceito, setAceito] = useState(false);
  const [errors, setErrors] = useState<Errors<FormKey>>({});
  const { loading, run } = useSubmit();

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors<FormKey> = {};
    if (values.nome.trim().length < 2) next.nome = "Informe seu nome completo.";
    if (!isEmail(values.email)) next.email = "Email inválido.";
    if (values.senha.length < 8) next.senha = "Mínimo de 8 caracteres.";
    else if (!/[A-Z]/.test(values.senha)) next.senha = "Inclua pelo menos 1 letra maiúscula.";
    else if (!/[0-9]/.test(values.senha)) next.senha = "Inclua pelo menos 1 número.";
    if (values.confirmar !== values.senha) next.confirmar = "As senhas não são iguais.";
    if (!aceito) next.termos = "Você precisa aceitar os termos para continuar.";
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error("Revise os campos destacados.");
      return;
    }

    void run(async () => {
      try {
        await registerAccount({
          data: { email: values.email, password: values.senha, displayName: values.nome },
        });
        refreshCustomerSession();
        toast.success("Conta criada!", {
          description: "Agora adquira sua licença para liberar o plugin.",
        });
        navigate({ to: "/dashboard" });
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Não foi possível criar sua conta.");
      }
    }, 300);
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Crie sua conta"
        subtitle="Leva menos de um minuto e dá acesso à sua licença."
        footer={
          <span>
            Já tem conta?{" "}
            <Link to="/login" className="font-semibold text-accent-soft hover:underline">
              Entrar
            </Link>
          </span>
        }
      >
        <form className="space-y-5" noValidate onSubmit={handleSubmit}>
          <Field
            label="Nome"
            placeholder="Seu nome"
            autoComplete="name"
            value={values.nome}
            error={errors.nome}
            onChange={set("nome")}
          />
          <Field
            label="Email"
            type="email"
            placeholder="voce@email.com"
            autoComplete="email"
            value={values.email}
            error={errors.email}
            onChange={set("email")}
          />
          <PasswordField
            label="Senha"
            placeholder="••••••••"
            autoComplete="new-password"
            hint="Mínimo 8 caracteres, 1 maiúscula e 1 número."
            value={values.senha}
            error={errors.senha}
            onChange={set("senha")}
          />
          <PasswordField
            label="Confirmar senha"
            placeholder="••••••••"
            autoComplete="new-password"
            value={values.confirmar}
            error={errors.confirmar}
            onChange={set("confirmar")}
          />
          <CheckboxField
            label="Concordo com os Termos de Uso e a Política de Privacidade"
            checked={aceito}
            error={errors.termos}
            onChange={(e) => setAceito(e.target.checked)}
          />
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Criando conta..." : "Criar conta"}
          </Button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
