import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "@/lib/seo";
import { Mail, MessageCircle, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { SiteLayout } from "@/components/SiteLayout";
import { Field, TextareaField } from "@/components/ui/field";
import { Button } from "@/components/ui/saviz-button";
import { isEmail, useSubmit, type Errors } from "@/lib/form";


import { submitContactForm } from "@/lib/email-actions";

const title = "Contato e suporte | Savior Jordâni Studio";
const description =
  "Fale com o time do Savior Jordâni Studio sobre assinatura, instalação do plugin ou dúvidas técnicas. Resposta em até 1 dia útil.";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonical("/contato")],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const [values, setValues] = useState({ nome: "", email: "", msg: "" });
  const [errors, setErrors] = useState<Errors<"nome" | "email" | "msg">>({});
  const [sent, setSent] = useState(false);
  const { loading, run } = useSubmit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors<"nome" | "email" | "msg"> = {};
    if (values.nome.trim().length < 2) next.nome = "Informe seu nome.";
    if (!isEmail(values.email)) next.email = "Email inválido.";
    if (values.msg.trim().length < 10) next.msg = "Escreva ao menos 10 caracteres.";
    setErrors(next);
    if (Object.keys(next).length) return;
    void run(async () => {
      await submitContactForm({ data: values });
      setSent(true);
      setValues({ nome: "", email: "", msg: "" });
      toast.success("Mensagem enviada", { description: "Respondemos em até 1 dia útil." });
    });
  };

  return (
    <SiteLayout>
      <PageHeader
        crumb="Contato"
        title="Fale com a gente"
        subtitle="Suporte em português, de segunda a sexta, com resposta em até 1 dia útil."
      />
      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5 rounded-2xl border border-border bg-background-secondary p-6 md:p-8"
          >
            <Field
              label="Nome"
              name="nome"
              placeholder="Seu nome"
              value={values.nome}
              error={errors.nome}
              onChange={(e) => setValues((v) => ({ ...v, nome: e.target.value }))}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="voce@email.com"
              value={values.email}
              error={errors.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            />
            <TextareaField
              label="Mensagem"
              name="msg"
              rows={5}
              placeholder="Como podemos ajudar?"
              value={values.msg}
              error={errors.msg}
              onChange={(e) => setValues((v) => ({ ...v, msg: e.target.value }))}
            />
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Enviando..." : "Enviar mensagem"}
            </Button>
            {sent ? (
              <p className="rounded-lg border border-success/40 bg-success/10 p-3 text-center text-xs text-muted-foreground">
                Recebemos sua mensagem. Fique de olho no email cadastrado.
              </p>
            ) : null}
          </form>


          <ul className="space-y-4 text-sm">
            {[
              { icon: Mail, t: "contato@saviz.com.br", d: "Suporte e assuntos comerciais" },
              { icon: MessageCircle, t: "@savizstudio", d: "Instagram e YouTube" },
              { icon: Clock, t: "Seg a sex, 9h às 18h", d: "Horário de Brasília" },
            ].map((i) => (
              <li key={i.t} className="flex gap-3 rounded-xl border border-border p-4">
                <i.icon className="mt-0.5 size-5 shrink-0 text-accent-soft" />
                <div>
                  <p className="font-semibold">{i.t}</p>
                  <p className="text-muted-foreground">{i.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
