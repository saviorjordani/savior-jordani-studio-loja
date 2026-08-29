/** Dados mockados da área do cliente (frontend-only). */

/** Chave de sessionStorage usada para repassar a key recém-emitida do checkout até /success. */
export const LAST_LICENSE_KEY_STORAGE = "sjs_last_license_key";

export const LICENSE = {
  key: "SVZ7-4K2P-9QX1-B3ND",
  status: "Ativa" as const,
  plan: "Licença anual · R$ 300 no 1º ano",
  createdAt: "12/03/2026",
  renewsAt: "12/08/2026",
  version: "1.0.4",
};

export const MACHINES = [
  { name: "PC-ESTUDIO", os: "Windows 11", ip: "189.45.12.7", lastSeen: "Hoje, 09:14" },
  { name: "NOTEBOOK-SAVIZ", os: "Windows 10", ip: "189.45.12.31", lastSeen: "Ontem, 21:02" },
];

export const MACHINE_LIMIT = 2;

export const NEWS: Array<{ t: string; d: string }> = [];

export const CHANGELOG = [
  {
    v: "1.0.4",
    date: "20/07/2026",
    items: [
      "Novo motor de textura de pele",
      "Correções no Dodge & Burn",
      "Melhor desempenho em 8K",
    ],
  },
  {
    v: "1.0.3",
    date: "02/06/2026",
    items: ["Quick Select com detecção de pele", "Ajustes de UI do painel"],
  },
  { v: "1.0.0", date: "12/03/2026", items: ["Lançamento oficial", "Todas as ferramentas base"] },
];

export const INVOICES = [
  { id: "SVZ-2026-03", date: "12/03/2026", value: "R$ 300,00", status: "Pago" },
  { id: "SVZ-2027-03", date: "12/03/2027", value: "R$ 99,90", status: "Renovação anual" },
];

export const SESSIONS = [
  { device: "Chrome · Windows", ip: "189.45.12.7", when: "Agora" },
  { device: "Safari · iPhone", ip: "189.45.12.90", when: "Ontem, 18:40" },
];
