import { createServerFn } from "@tanstack/react-start";
import { sendContactEmail, sendPasswordResetEmail } from "@/lib/email";

export const submitContactForm = createServerFn({ method: "POST" })
  .validator((data: { nome: string; email: string; msg: string }) => data)
  .handler(async ({ data }) => {
    await sendContactEmail({
      name: data.nome,
      email: data.email,
      message: data.msg,
    });
    return { ok: true };
  });

export const requestPasswordReset = createServerFn({ method: "POST" })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const resetUrl = `https://loja.saviz.com.br/esqueci-senha`;
    await sendPasswordResetEmail({
      toEmail: data.email,
      resetUrl,
    });
    return { ok: true };
  });
