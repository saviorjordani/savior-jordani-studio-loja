/** Métricas do painel administrativo. */
export const METRICS: { label: string; value: string; delta: string }[] = [];

/** Série mensal de MRR real para o gráfico de barras. */
export const MRR_SERIES: { m: string; v: number }[] = [];

export const TRANSACTIONS: { id: string; user: string; value: string; method: string; status: string; date: string }[] = [];

export const VERSIONS: { v: string; date: string; status: string; downloads: number }[] = [
  { v: "1.0.0", date: "26/08/2026", status: "Publicada", downloads: 1 }
];

export const COUPONS: { code: string; off: string; uses: string; status: string }[] = [];

export const USERS: { email: string; plan: string; status: string; machines: number; since: string }[] = [
  { email: "savio.ferreira.souza@gmail.com", plan: "Anual", status: "Ativo", machines: 1, since: "27/08/2026" },
  { email: "savio.cliente@saviz.com.br", plan: "Anual", status: "Ativo", machines: 1, since: "26/08/2026" }
];
