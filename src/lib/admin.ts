/** Dados mockados do painel administrativo (frontend-only). */

export const METRICS = [
  { label: "MRR", value: "R$ 18.612", delta: "+12,4%" },
  { label: "Assinantes ativos", value: "396", delta: "+23" },
  { label: "Vendas no mês", value: "R$ 22.184", delta: "+8,1%" },
  { label: "Churn", value: "3,2%", delta: "-0,4%" },
];

/** Série mensal de MRR (mock) para o gráfico de barras. */
export const MRR_SERIES = [
  { m: "Fev", v: 6200 },
  { m: "Mar", v: 8400 },
  { m: "Abr", v: 10800 },
  { m: "Mai", v: 13100 },
  { m: "Jun", v: 15400 },
  { m: "Jul", v: 18612 },
];

export const TRANSACTIONS = [
  { id: "TX-9241", user: "ana.souza@email.com", value: "R$ 47,00", method: "Pix", status: "Pago", date: "29/07/2026" },
  { id: "TX-9240", user: "carlos.m@email.com", value: "R$ 47,00", method: "Cartão", status: "Pago", date: "29/07/2026" },
  { id: "TX-9239", user: "studio@lumen.com", value: "R$ 47,00", method: "Cartão", status: "Recusado", date: "28/07/2026" },
  { id: "TX-9238", user: "bia.retouch@email.com", value: "R$ 47,00", method: "Pix", status: "Pago", date: "28/07/2026" },
  { id: "TX-9237", user: "foto.rafa@email.com", value: "R$ 47,00", method: "Cartão", status: "Reembolsado", date: "27/07/2026" },
];

export const VERSIONS = [
  { v: "1.0.4", date: "20/07/2026", status: "Publicada", downloads: 312 },
  { v: "1.0.3", date: "02/06/2026", status: "Arquivada", downloads: 288 },
  { v: "1.0.0", date: "12/03/2026", status: "Arquivada", downloads: 174 },
];

export const COUPONS = [
  { code: "SAVIZ10", off: "10%", uses: "47/200", status: "Ativo" },
  { code: "BLACKFRIDAY", off: "30%", uses: "0/500", status: "Agendado" },
  { code: "INDICA5", off: "R$ 5", uses: "112/∞", status: "Ativo" },
];

export const USERS = [
  { email: "ana.souza@email.com", plan: "Mensal", status: "Ativo", machines: 2, since: "12/03/2026" },
  { email: "carlos.m@email.com", plan: "Mensal", status: "Ativo", machines: 1, since: "04/04/2026" },
  { email: "studio@lumen.com", plan: "Mensal", status: "Inadimplente", machines: 2, since: "22/04/2026" },
  { email: "bia.retouch@email.com", plan: "Mensal", status: "Ativo", machines: 1, since: "01/05/2026" },
  { email: "foto.rafa@email.com", plan: "Mensal", status: "Bloqueado", machines: 0, since: "17/05/2026" },
  { email: "julia.pixel@email.com", plan: "Mensal", status: "Ativo", machines: 2, since: "09/06/2026" },
];
