# Loja: desenvolvimento e operação

A loja é uma aplicação TanStack Start com React, TypeScript e Tailwind CSS. Ela
publica as páginas de marketing, conta do cliente, checkout e painel de licença.

## Estrutura

| Área                | Local                               | Função                                                                                  |
| ------------------- | ----------------------------------- | --------------------------------------------------------------------------------------- |
| Rotas               | `src/routes/`                       | Páginas públicas, checkout, área `/dashboard` e Console Admin (`/sv-console-7f21a9c4`). |
| Carrinho de compras | `src/lib/cart-context.tsx`          | Estado global do carrinho (`localStorage`), drawer lateral e contadores de itens.       |
| Bandeiras Pagamento | `src/components/PaymentBadges.tsx`  | Badges vetoriais SVG de pagamento (Pix, Visa, Mastercard, Elo, Amex, Boleto).           |
| Checkout Stripe     | `savior-jordani-studio-auth-system` | Sessões Stripe Checkout com `payment_method_types` (`card`, `boleto`, `pix`).           |
| Executável          | `public/savizstudio-installer.exe`  | Binário nativo C de instalação do plugin distribuído aos clientes na loja.              |
| Console Admin       | `src/routes/sv-console-7f21a9c4.*`  | Gestão de preços, imagens do produto, cupons e métricas Stripe em tempo real.           |
| Sessão do cliente   | `src/lib/store-auth.ts`             | Server functions e cookie HttpOnly da loja (`licenseIssuedAt`, etc).                    |
| Permissões Admin    | `src/lib/auth.ts`                   | Controle de e-mails administrativos (`ADMIN_EMAILS`).                                   |
| Estado no navegador | `src/lib/customer-session.ts`       | Carrega a conta atual para a interface.                                                 |
| Worker da loja      | `src/server.ts`                     | Entrada SSR para Cloudflare Pages.                                                      |
| Configuração        | `wrangler.jsonc`                    | Projeto Pages `saviz-loja` (`compatibility_date: 2026-07-01`, `nodejs_compat`).          |

## Execução local

```bash
npm install
npm run dev
```

Validação de build:

```bash
npm run build
```

## Variáveis de ambiente

| Variável               | Onde             | Finalidade                                                                              |
| ---------------------- | ---------------- | --------------------------------------------------------------------------------------- |
| `STORE_SESSION_SECRET` | Ambiente da loja | Protege o cookie de sessão que guarda o token opaco do Worker. Mínimo de 32 caracteres. |

Não há valor padrão para `STORE_SESSION_SECRET`. Configure-o como secret da
loja no ambiente de produção. Não exponha o token, qualquer segredo Stripe ou
credencial no código do navegador.

## Publicação & CI/CD

A publicação é **100% automatizada via Git Push** para o repositório no GitHub:

- **Repositório da Loja**: `https://github.com/saviorjordani/savior-jordani-studio-loja.git`
- **Fluxo**: Ao fazer `git push origin main`, o Cloudflare Pages (projeto `saviz-loja`) compila e publica o site automaticamente.
- **Importante**: Não execute comandos manuais de deploy via CLI (`wrangler pages deploy`), para evitar duplicações de build ou alterações fora do versionamento.

## Fluxo de licença

Consulte [licenciamento.md](licenciamento.md) para o fluxo entre conta da loja,
Checkout Stripe, webhook e painel do cliente.
