# Loja: desenvolvimento e operação

A loja é uma aplicação TanStack Start com React, TypeScript e Tailwind. Ela
publica as páginas de marketing, conta do cliente, checkout e painel de licença.

## Estrutura

| Área                | Local                         | Função                                          |
| ------------------- | ----------------------------- | ----------------------------------------------- |
| Rotas               | `src/routes/`                 | Páginas públicas, checkout, área `/dashboard` e Console Admin (`/sv-console-7f21a9c4`). |
| Carrinho de compras | `src/lib/cart-context.tsx`    | Estado global do carrinho (`localStorage`), drawer lateral e contadores de itens. |
| Console Admin       | `src/routes/sv-console-7f21a9c4.*` | Gestão de preços, imagens do produto 16:9, cupons e métricas Stripe em tempo real. |
| Sessão do cliente   | `src/lib/store-auth.ts`       | Server functions e cookie HttpOnly da loja.     |
| Permissões Admin    | `src/lib/auth.ts`             | Controle de e-mails administrativos (`ADMIN_EMAILS`). |
| Estado no navegador | `src/lib/customer-session.ts` | Carrega a conta atual para a interface.         |
| Worker da loja      | `src/server.ts`               | Entrada SSR para Cloudflare Pages.              |
| Configuração        | `wrangler.jsonc`              | Projeto Pages `saviz-loja`.                     |

## Execução local

```bash
npm install
npm run dev
```

Validação de produção:

```bash
npm run lint
npm run build
```

O lint geral possui formatação histórica fora do fluxo de pagamento; valide ao
menos os arquivos alterados antes de publicar.

## Variáveis de ambiente

| Variável               | Onde             | Finalidade                                                                              |
| ---------------------- | ---------------- | --------------------------------------------------------------------------------------- |
| `STORE_SESSION_SECRET` | Ambiente da loja | Protege o cookie de sessão que guarda o token opaco do Worker. Mínimo de 32 caracteres. |

Não há valor padrão para `STORE_SESSION_SECRET`. Configure-o como secret da
loja no ambiente de produção. Não exponha o token, qualquer segredo Stripe ou
credencial no código do navegador.

## Publicação

```bash
npm run build
npx wrangler pages deploy dist --project-name saviz-loja --branch main
```

O domínio público é `https://loja.saviz.com.br/`. Por ser sincronizado com
Lovable, não reescreva o histórico Git publicado.

## Fluxo de licença

Consulte [licenciamento.md](licenciamento.md) para o fluxo entre conta da loja,
Checkout Stripe, webhook e painel do cliente.
