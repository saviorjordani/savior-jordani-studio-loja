import React from "react";

export function PaymentBadges({ showAmex = true }: { showAmex?: boolean }) {
  const badges = [
    { name: "Pix", src: "/icons/payment/pix.svg", alt: "Pix - Pagamento instantâneo", h: "h-5" },
    { name: "Visa", src: "/icons/payment/visa.svg", alt: "Cartão Visa", h: "h-4" },
    { name: "Mastercard", src: "/icons/payment/mastercard.svg", alt: "Cartão Mastercard", h: "h-5" },
    { name: "Elo", src: "/icons/payment/elo.svg", alt: "Cartão Elo", h: "h-5" },
    ...(showAmex
      ? [{ name: "Amex", src: "/icons/payment/amex.svg", alt: "Cartão American Express", h: "h-5" }]
      : []),
    { name: "Boleto", src: "/icons/payment/boleto.svg", alt: "Boleto bancário", h: "h-5" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {badges.map((b) => (
        <div
          key={b.name}
          className="flex h-8 items-center justify-center rounded-lg border border-border bg-background-tertiary px-2.5 py-1 transition-all hover:border-primary/40 hover:bg-background"
          title={b.alt}
        >
          <img src={b.src} alt={b.alt} className={`${b.h} w-auto object-contain`} />
        </div>
      ))}
    </div>
  );
}
