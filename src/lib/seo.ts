import { FAQ_ITEMS } from "@/lib/site";

export const SITE_URL = "https://pixel-perfect-render-833.lovable.app";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Savior Jordâni Studio",
  url: SITE_URL,
  email: "contato@savizstudio.com.br",
  description:
    "Plugin profissional de retoque de retratos e beauty para Adobe Photoshop, em assinatura mensal.",
};

export const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Savior Jordâni Studio Plugin de Retoque para Photoshop",
  description:
    "Plugin único para Photoshop com frequency separation, dodge & burn, textura de pele e correção de cor. Assinatura mensal.",
  brand: { "@type": "Brand", name: "Savior Jordâni Studio" },
  operatingSystem: "Windows",
  applicationCategory: "DesignApplication",
  offers: {
    "@type": "Offer",
    price: "47.00",
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/pricing`,
  },
};

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function jsonLdScript(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export function canonical(path: string) {
  return { rel: "canonical" as const, href: `${SITE_URL}${path === "/" ? "" : path}` };
}
