import { Headphones, RefreshCw, ShieldCheck, Zap } from "lucide-react";

const items = [
  { icon: Zap, title: "Entrega imediata", desc: "Link e credenciais no e-mail em segundos" },
  { icon: RefreshCw, title: "7 dias de garantia", desc: "Testou e não gostou? Reembolso integral" },
  { icon: ShieldCheck, title: "Compra 100% segura", desc: "Cartão e Pix em ambiente criptografado" },
  { icon: Headphones, title: "Suporte prioritário", desc: "Atendimento humano por e-mail em até 24h" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-background-secondary">
      <div className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((i) => (
          <div key={i.title} className="flex items-start gap-3">
            <i.icon className="mt-0.5 size-5 shrink-0 text-accent-soft" />
            <div>
              <p className="text-sm font-semibold">{i.title}</p>
              <p className="text-xs text-muted-foreground">{i.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
