# Fluxo de compra e licença

A compra é vinculada à conta autenticada da loja. A interface não emite keys,
não confirma pagamento pelo redirecionamento e não envia segredo Stripe ao
navegador.

## Fluxo

1. O cliente cria uma conta ou entra em `/register` ou `/login`.
2. Em `/checkout`, a server function chama `POST /v1/store/checkout` no Auth
   System com o token da sessão da loja.
3. O Auth System cria a Checkout Session com o Price anual de R$ 300,00 do
   primeiro ano e devolve somente a URL hospedada pela Stripe.
4. A Stripe envia `checkout.session.completed` e eventos de assinatura a
   `POST /v1/stripe/webhook`.
5. O Worker valida a assinatura, confirma a assinatura na API Stripe, cria uma
   agenda idempotente para a renovação de R$ 99,90/ano e grava o estado em
   `stripe_subscriptions`.
6. Com assinatura `active` ou `trialing`, o Worker cria a key se necessário e
   atualiza a expiração da licença.
7. Em `/dashboard/licenca`, a loja carrega `GET /v1/store/me`; a key é revelada
   sob demanda por `GET /v1/store/license-credentials` para a própria conta.

## Retorno do Checkout

O retorno da Stripe vai para `/dashboard/licenca?checkout=success`. Essa página
consulta a conta novamente por até um minuto enquanto o webhook é processado.
O retorno é apenas experiência de usuário: a fonte de verdade é sempre o
webhook Stripe validado.

## Regras de segurança

- Não use `purchase-demo`: o endpoint está desativado no Worker.
- Não coloque key, senha, token ou dados de pagamento em URL, analytics, logs
  ou `sessionStorage`.
- A key é carregada apenas pela server function autenticada da loja.
- O cliente usa a senha da conta da loja junto da key para entrar no plugin CEP.
- Configure Stripe somente no Worker. A loja precisa apenas de
  `STORE_SESSION_SECRET`.

## Configuração de Stripe

As variáveis do Worker, eventos de webhook e validação de teste estão em
[`../../savior-jordani-studio-auth-system/docs/STRIPE.md`](../../savior-jordani-studio-auth-system/docs/STRIPE.md).
