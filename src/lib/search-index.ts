/** Índice de busca do site (estático, sem backend). */
export const SEARCH_INDEX = [
  {
    to: "/plugin",
    title: "O plugin Savior Jordâni Studio",
    description: "Página do produto: ferramentas, preço e assinatura mensal.",
    section: "Loja",
    keywords: "plugin photoshop painel produto home inicio comprar assinatura",
  },
  {
    to: "/recursos",
    title: "Recursos",
    description: "Frequency separation, dodge & burn, textura de pele e mais.",
    section: "Produto",
    keywords: "ferramentas recursos frequency separation dodge burn textura cor selecao",
  },
  {
    to: "/resultados",
    title: "Resultados",
    description: "Galeria antes e depois feita com o plugin.",
    section: "Produto",
    keywords: "galeria antes depois exemplos fotos retoque resultado",
  },
  {
    to: "/pricing",
    title: "Preços",
    description: "Plano mensal de R$ 47, sem fidelidade.",
    section: "Loja",
    keywords: "preco plano assinatura mensal valor pagamento pricing",
  },
  {
    to: "/checkout",
    title: "Checkout",
    description: "Finalizar assinatura com cartão ou Pix.",
    section: "Loja",
    keywords: "checkout pagar comprar cartao pix assinar",
  },
  {
    to: "/faq",
    title: "Perguntas frequentes",
    description: "Dúvidas sobre licença, instalação e cobrança.",
    section: "Ajuda",
    keywords: "faq duvidas perguntas licenca offline maquinas",
  },
  {
    to: "/ajuda",
    title: "Central de ajuda",
    description: "Suporte, contato e artigos de apoio.",
    section: "Ajuda",
    keywords: "ajuda suporte atendimento contato",
  },
  {
    to: "/instalacao",
    title: "Guia de instalação",
    description: "Como instalar o .exe no Windows e abrir o painel.",
    section: "Ajuda",
    keywords: "instalacao instalar exe windows painel extensoes tutorial",
  },
  {
    to: "/download",
    title: "Download do instalador",
    description: "Área do cliente: baixe o instalador do plugin.",
    section: "Conta",
    keywords: "download baixar instalador exe arquivo",
  },
  {
    to: "/dashboard",
    title: "Minha conta",
    description: "Licença, máquinas, faturas e configurações.",
    section: "Conta",
    keywords: "conta dashboard painel licenca faturas maquinas",
  },
  {
    to: "/login",
    title: "Entrar",
    description: "Acesse sua conta Savior Jordâni Studio.",
    section: "Conta",
    keywords: "login entrar acessar senha",
  },
  {
    to: "/register",
    title: "Criar conta",
    description: "Cadastre-se para assinar o plugin.",
    section: "Conta",
    keywords: "cadastro registrar criar conta",
  },
  {
    to: "/reembolso",
    title: "Política de reembolso",
    description: "Garantia de 7 dias com reembolso integral.",
    section: "Ajuda",
    keywords: "reembolso garantia devolucao estorno",
  },
  {
    to: "/status",
    title: "Status do serviço",
    description: "Disponibilidade da validação de licença.",
    section: "Ajuda",
    keywords: "status servidor disponibilidade incidentes",
  },
  {
    to: "/afiliados",
    title: "Programa de afiliados",
    description: "Indique o plugin e ganhe comissão.",
    section: "Empresa",
    keywords: "afiliados parceria comissao indicacao",
  },
  {
    to: "/sobre",
    title: "Sobre a Savior Jordâni Studio",
    description: "Quem somos e por que criamos o plugin.",
    section: "Empresa",
    keywords: "sobre empresa historia equipe",
  },
  {
    to: "/contato",
    title: "Contato",
    description: "Fale com o time de suporte.",
    section: "Empresa",
    keywords: "contato email falar suporte mensagem",
  },
  {
    to: "/termos",
    title: "Termos de uso",
    description: "Condições de uso e licença do plugin.",
    section: "Legal",
    keywords: "termos condicoes uso licenca contrato",
  },
  {
    to: "/privacidade",
    title: "Política de privacidade",
    description: "Como tratamos seus dados.",
    section: "Legal",
    keywords: "privacidade dados lgpd cookies",
  },
] as const;

export type SearchEntry = (typeof SEARCH_INDEX)[number];

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function searchSite(query: string): SearchEntry[] {
  const q = normalize(query.trim());
  if (!q) return [];
  const terms = q.split(/\s+/);
  return SEARCH_INDEX.filter((entry) => {
    const haystack = normalize(`${entry.title} ${entry.description} ${entry.keywords} ${entry.section}`);
    return terms.every((t) => haystack.includes(t));
  }).slice(0, 8);
}
