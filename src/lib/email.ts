import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.hostinger.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER || "contato@saviz.com.br";
const SMTP_PASS = process.env.SMTP_PASS || "~fx/2SsMB9Jaskda";
const SMTP_FROM = process.env.SMTP_FROM || "Savior Jordâni Studio <contato@saviz.com.br>";

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export interface ContactEmailInput {
  name: string;
  email: string;
  message: string;
}

export interface LicenseEmailInput {
  toEmail: string;
  displayName?: string | null;
  password?: string;
  activationKey: string;
}

export interface PasswordResetEmailInput {
  toEmail: string;
  resetUrl: string;
}

/**
 * Envia o e-mail de contato recebido pelo formulário do site para a equipe
 * e envia uma cópia de confirmação para o remetente.
 */
export async function sendContactEmail(data: ContactEmailInput): Promise<void> {
  const adminMailOptions = {
    from: SMTP_FROM,
    to: SMTP_USER,
    replyTo: data.email,
    subject: `[Contato Site] Mensagem de ${data.name}`,
    text: `Nova mensagem recebida pelo site Savior Jordâni Studio:\n\nNome: ${data.name}\nEmail: ${data.email}\n\nMensagem:\n${data.message}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333;">
        <h2>Nova Mensagem de Contato</h2>
        <p><strong>Nome:</strong> ${data.name}</p>
        <p><strong>E-mail:</strong> ${data.email}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p><strong>Mensagem:</strong></p>
        <p style="background: #f9f9f9; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${data.message}</p>
      </div>
    `,
  };

  const userMailOptions = {
    from: SMTP_FROM,
    to: data.email,
    subject: "Recebemos sua mensagem | Savior Jordâni Studio",
    text: `Olá ${data.name},\n\nRecebemos sua mensagem enviada pelo nosso site. Nossa equipe responderá em até 1 dia útil.\n\nAtenciosamente,\nEquipe Savior Jordâni Studio`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333;">
        <h2>Recebemos sua mensagem!</h2>
        <p>Olá, <strong>${data.name}</strong>.</p>
        <p>Obrigado por entrar em contato com o <strong>Savior Jordâni Studio</strong>. Recebemos seu recado e nossa equipe de suporte responderá em até 1 dia útil.</p>
        <p style="color: #666; font-size: 13px; margin-top: 30px;">Se você não enviou esta mensagem, por favor desconsidere este e-mail.</p>
      </div>
    `,
  };

  await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(userMailOptions),
  ]);
}

/**
 * Envia as credenciais do plugin e a chave de ativação para o e-mail do comprador.
 */
export async function sendLicenseCredentialsEmail(data: LicenseEmailInput): Promise<void> {
  const name = data.displayName || data.toEmail.split("@")[0];
  const passwordSection = data.password
    ? `<p><strong>Sua senha de acesso ao plugin:</strong> <code style="background: #eee; padding: 3px 6px; border-radius: 4px;">${data.password}</code></p>`
    : "";

  const mailOptions = {
    from: SMTP_FROM,
    to: data.toEmail,
    subject: "Sua Licença e Acesso | Savior Jordâni Studio",
    text: `Olá ${name},\n\nSua licença do Savior Jordâni Studio foi gerada com sucesso!\n\nChave de Ativação: ${data.activationKey}\n${data.password ? `Senha: ${data.password}\n` : ""}\nPara baixar e instalar o plugin, acesse: https://loja.saviz.com.br/dashboard/licenca\n\nAtenciosamente,\nEquipe Savior Jordâni Studio`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333; line-height: 1.6;">
        <h2 style="color: #111;">Bem-vindo ao Savior Jordâni Studio!</h2>
        <p>Olá, <strong>${name}</strong>.</p>
        <p>Sua licença do plugin profissional para Adobe Photoshop está pronta.</p>
        
        <div style="background: #f4f4f6; border-left: 4px solid #000; padding: 15px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0 0 10px 0;"><strong>Chave de Ativação (Key):</strong></p>
          <p style="font-size: 18px; font-weight: bold; letter-spacing: 1px; margin: 0; color: #111;">${data.activationKey}</p>
        </div>

        ${passwordSection}

        <p><strong>Como começar:</strong></p>
        <ol>
          <li>Acesse sua área de cliente: <a href="https://loja.saviz.com.br/dashboard/licenca" style="color: #0066cc;">https://loja.saviz.com.br/dashboard/licenca</a></li>
          <li>Baixe o instalador do plugin para Windows ou Mac.</li>
          <li>No Photoshop, abra o painel e entre com seu e-mail, senha e Chave de Ativação.</li>
        </ol>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="font-size: 13px; color: #666;">Dúvidas? Responda a este e-mail ou fale com nossa equipe em <a href="https://loja.saviz.com.br/contato">suporte</a>.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

/**
 * Envia o e-mail de redefinição de senha da conta.
 */
export async function sendPasswordResetEmail(data: PasswordResetEmailInput): Promise<void> {
  const mailOptions = {
    from: SMTP_FROM,
    to: data.toEmail,
    subject: "Redefinição de Senha | Savior Jordâni Studio",
    text: `Olá,\n\nSolicitaram a redefinição de senha para o seu e-mail (${data.toEmail}) no Savior Jordâni Studio.\n\nPara redefinir sua senha, acesse o link abaixo:\n${data.resetUrl}\n\nSe não solicitou a alteração, ignore este e-mail.\n\nAtenciosamente,\nEquipe Savior Jordâni Studio`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333; line-height: 1.6;">
        <h2>Redefinição de Senha</h2>
        <p>Recebemos um pedido para redefinir a senha da sua conta <strong>${data.toEmail}</strong>.</p>
        <p style="margin: 25px 0;">
          <a href="${data.resetUrl}" style="background: #000; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">Redefinir Minha Senha</a>
        </p>
        <p style="font-size: 13px; color: #666;">Se o botão acima não funcionar, copie e cole este link no navegador:</p>
        <p style="font-size: 12px; color: #888; word-break: break-all;">${data.resetUrl}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="font-size: 13px; color: #666;">Se você não solicitou a redefinição de senha, nenhuma ação é necessária.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
