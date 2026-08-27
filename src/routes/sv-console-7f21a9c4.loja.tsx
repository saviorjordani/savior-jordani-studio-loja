import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDialog, type ConfirmState } from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/saviz-button";
import { COUPONS } from "@/lib/admin";
import { useSubmit } from "@/lib/form";

export const Route = createFileRoute("/sv-console-7f21a9c4/loja")({
  head: () => ({
    meta: [
      { title: "Configurações da loja | Admin Savior Jordâni Studio" },
      { name: "description", content: "Preço da assinatura, cupons de desconto e textos da landing page." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminStore,
});

type Coupon = (typeof COUPONS)[number];

function AdminStore() {
  const [confirm, setConfirm] = useState<ConfirmState>(null);

  const [price, setPrice] = useState("47,00");
  const [oldPrice, setOldPrice] = useState("97,00");
  const [machines, setMachines] = useState("2");
  const [priceError, setPriceError] = useState<string | null>(null);
  const priceSubmit = useSubmit();

  const [coupons, setCoupons] = useState<Coupon[]>(COUPONS);
  const [newCoupon, setNewCoupon] = useState(false);
  const [code, setCode] = useState("");
  const [off, setOff] = useState("");

  const [title, setTitle] = useState("Retoque profissional em minutos, direto no Photoshop");
  const [subtitle, setSubtitle] = useState(
    "O Savior Jordâni Studio automatiza pele, dodge & burn e cor com controle total do artista.",
  );
  const [banner, setBanner] = useState("Oferta de lançamento: use o cupom SAVIZ10");
  const [textsError, setTextsError] = useState<string | null>(null);
  const textsSubmit = useSubmit();

  const [images, setImages] = useState<string[]>([
    "/images/plugin-ui-main.jpg",
    "/images/plugin-ui-frequency-separation.jpg",
    "/images/plugin-ui-dodge-burn.jpg",
    "/images/plugin-ui-color-correction.jpg",
  ]);
  const imagesSubmit = useSubmit();

  const saveImages = () => {
    void imagesSubmit.run(async () => {
      try {
        await fetch("https://api.saviz.com.br/v1/store/config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ images }),
        });
        toast.success("Imagens do produto salvas e enviadas ao Worker com sucesso");
      } catch {
        toast.error("Erro ao salvar imagens no Worker.");
      }
    });
  };

  const savePrices = () => {
    if (!/^\d{1,4}(,\d{2})?$/.test(price.trim())) {
      setPriceError("Informe um preço válido (ex.: 47,00).");
      return;
    }
    if (!/^[1-9]\d?$/.test(machines.trim())) {
      setPriceError("O limite de máquinas deve ser um número de 1 a 99.");
      return;
    }
    setPriceError(null);
    void priceSubmit.run(() => {
      toast.success("Preços atualizados");
    });
  };

  const saveTexts = () => {
    if (!title.trim() || !subtitle.trim()) {
      setTextsError("Título e subtítulo não podem ficar vazios.");
      return;
    }
    setTextsError(null);
    void textsSubmit.run(() => {
      toast.success("Textos da landing salvos");
    });
  };

  const createCoupon = () => {
    const c = code.trim().toUpperCase();
    if (!c || !off.trim()) {
      toast.error("Preencha código e desconto.");
      return;
    }
    if (coupons.some((x) => x.code === c)) {
      toast.error("Já existe um cupom com esse código.");
      return;
    }
    setCoupons((prev) => [{ code: c, off: off.trim(), uses: "0/∞", status: "Ativo" }, ...prev]);
    setCode("");
    setOff("");
    setNewCoupon(false);
    toast.success(`Cupom ${c} criado`);
  };

  const toggleCoupon = (c: Coupon) => {
    const disabling = c.status !== "Inativo";
    const apply = () => {
      setCoupons((prev) =>
        prev.map((x) => (x.code === c.code ? { ...x, status: disabling ? "Inativo" : "Ativo" } : x)),
      );
      toast.success(disabling ? `Cupom ${c.code} desativado` : `Cupom ${c.code} reativado`);
    };
    if (!disabling) return apply();
    setConfirm({
      title: `Desativar o cupom ${c.code}?`,
      description: "Ele deixa de ser aceito no checkout imediatamente.",
      confirmLabel: "Desativar",
      danger: true,
      onConfirm: apply,
    });
  };

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary";

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-foreground">Loja</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Preço da assinatura, cupons e textos exibidos na página de vendas.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-background-secondary p-6">
        <h2 className="text-sm font-semibold text-foreground">Assinatura</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <label className="text-sm">
            <span className="text-muted-foreground">Preço mensal (R$)</span>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`${inputClass} font-mono`}
            />
          </label>
          <label className="text-sm">
            <span className="text-muted-foreground">Preço "de" (R$)</span>
            <input
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              className={`${inputClass} font-mono`}
            />
          </label>
          <label className="text-sm">
            <span className="text-muted-foreground">Limite de máquinas</span>
            <input
              value={machines}
              onChange={(e) => setMachines(e.target.value)}
              className={`${inputClass} font-mono`}
            />
          </label>
        </div>
        {priceError ? <p className="mt-2 text-sm text-destructive">{priceError}</p> : null}
        <Button className="mt-4" disabled={priceSubmit.loading} onClick={savePrices}>
          {priceSubmit.loading ? "Salvando…" : "Salvar preços"}
        </Button>
      </section>

      <section className="rounded-2xl border border-border bg-background-secondary">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-sm font-semibold text-foreground">Cupons</h2>
          <Button variant="secondary" onClick={() => setNewCoupon((v) => !v)}>
            {newCoupon ? "Cancelar" : "Novo cupom"}
          </Button>
        </div>

        {newCoupon ? (
          <div className="grid gap-3 border-b border-border px-6 py-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <label className="text-sm">
              <span className="text-muted-foreground">Código</span>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="SAVIZ20"
                className={`${inputClass} font-mono`}
              />
            </label>
            <label className="text-sm">
              <span className="text-muted-foreground">Desconto</span>
              <input
                value={off}
                onChange={(e) => setOff(e.target.value)}
                placeholder="20% ou R$ 10"
                className={inputClass}
              />
            </label>
            <Button onClick={createCoupon}>Criar cupom</Button>
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr>
                {["Código", "Desconto", "Usos", "Status", ""].map((h) => (
                  <th key={h} className="px-6 py-3 font-medium whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.code} className="border-t border-border">
                  <td className="px-6 py-3 font-mono whitespace-nowrap text-accent-soft">{c.code}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-foreground">{c.off}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-muted-foreground">{c.uses}</td>
                  <td
                    className={`px-6 py-3 font-medium whitespace-nowrap ${
                      c.status === "Inativo" ? "text-destructive" : "text-foreground"
                    }`}
                  >
                    {c.status}
                  </td>
                  <td className="px-6 py-3 text-right whitespace-nowrap">
                    <Button variant="ghost" onClick={() => toggleCoupon(c)}>
                      {c.status === "Inativo" ? "Reativar" : "Desativar"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-background-secondary p-6">
        <h2 className="text-sm font-semibold text-foreground">Textos da landing</h2>
        <label className="mt-4 block text-sm">
          <span className="text-muted-foreground">Título principal</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
        </label>
        <label className="mt-4 block text-sm">
          <span className="text-muted-foreground">Subtítulo</span>
          <textarea
            rows={3}
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="mt-4 block text-sm">
          <span className="text-muted-foreground">Barra de anúncio</span>
          <input value={banner} onChange={(e) => setBanner(e.target.value)} className={inputClass} />
        </label>
        {textsError ? <p className="mt-2 text-sm text-destructive">{textsError}</p> : null}
        <Button className="mt-4" disabled={textsSubmit.loading} onClick={saveTexts}>
          {textsSubmit.loading ? "Salvando…" : "Salvar textos"}
        </Button>
      </section>

      <section className="rounded-2xl border border-border bg-background-secondary p-6">
        <h2 className="text-sm font-semibold text-foreground">Imagens do Produto (Plugin)</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Gerencie as imagens da interface do plugin exibidas na página de vendas (proporção 16:9).
        </p>
        <div className="mt-4 space-y-3">
          {images.map((img, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <img
                src={img}
                alt={`Preview ${idx + 1}`}
                className="size-12 shrink-0 rounded-lg border border-border object-cover bg-background"
              />
              <input
                value={img}
                onChange={(e) => {
                  const updated = [...images];
                  updated[idx] = e.target.value;
                  setImages(updated);
                }}
                className={inputClass}
                placeholder="/images/plugin-ui-main.jpg ou URL de imagem"
              />
              <Button
                variant="ghost"
                onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                disabled={images.length <= 1}
              >
                Remover
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => setImages((prev) => [...prev, "/images/plugin-ui-main.jpg"])}
          >
            Adicionar nova imagem
          </Button>
          <Button disabled={imagesSubmit.loading} onClick={saveImages}>
            {imagesSubmit.loading ? "Salvando…" : "Salvar imagens do produto"}
          </Button>
        </div>
      </section>

      <ConfirmDialog state={confirm} onClose={() => setConfirm(null)} />
    </div>
  );
}
