import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState } from "react";
import videoCover from "@/assets/video-cover.jpg";
import { cn } from "@/lib/utils";
const slides = [
  { src: "/images/plugin-ui-frequency-separation.jpg", alt: "Painel de Separação de Frequência do plugin Savior Jordâni Studio", caption: "Separação de Frequência (8-bit e 16-bit)" },
  { src: "/images/plugin-ui-dodge-burn.jpg", alt: "Controles de Dodge & Burn e Iluminação no Photoshop", caption: "Dodge & Burn (Global, Local e Escultura de Luz)" },
  { src: "/images/plugin-ui-color-correction.jpg", alt: "Painel de Correção de Cor e Seleção Automática", caption: "Correção de Cor e Seleção Automática" },
  { src: "/images/plugin-ui-main.jpg", alt: "Painel completo docked dentro do Adobe Photoshop", caption: "Interface Completa no Photoshop" },
];

export function Demo({ id = "demo" }: { id?: string }) {
  const [index, setIndex] = useState(0);
  const go = (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length);

  return (
    <section id={id} className="section-y">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Veja o plugin em ação</h2>
          <p className="mt-4 text-muted-foreground">
            Interface enxuta, encaixada no seu Photoshop, sem sair do arquivo em que você trabalha.
          </p>
        </div>

        <div className="mt-12 flex items-center gap-3 md:gap-5">
          <button
            type="button"
            aria-label="Screenshot anterior"
            onClick={() => go(-1)}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background-secondary text-foreground transition-colors duration-200 hover:border-primary/60 hover:bg-background-tertiary"
          >
            <ChevronLeft className="size-5" />
          </button>

          <figure className="min-w-0 flex-1">
            <div className="overflow-hidden rounded-2xl border border-border bg-background-secondary">
              <img
                key={slides[index].src}
                src={slides[index].src}
                alt={slides[index].alt}
                width={1280}
                height={800}
                loading="eager"
                className="w-full"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm font-medium text-muted-foreground">
              {slides[index].caption}
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="Próximo screenshot"
            onClick={() => go(1)}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background-secondary text-foreground transition-colors duration-200 hover:border-primary/60 hover:bg-background-tertiary"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.caption}
              type="button"
              aria-label={`Ir para ${s.caption}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                i === index ? "gradient-accent w-8" : "w-3 bg-surface hover:bg-border",
              )}
            />
          ))}
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-border">
          <img
            src={videoCover}
            alt="Capa do tutorial em vídeo de retoque de beleza com o plugin Savior Jordâni Studio"
            width={1600}
            height={912}
            loading="eager"
            className="w-full"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-background/45">
            <span className="gradient-accent flex size-16 items-center justify-center rounded-full shadow-[var(--shadow-glow)]">
              <Play className="ml-1 size-7 fill-primary-foreground text-primary-foreground" />
            </span>
          </div>
          <span className="absolute bottom-4 left-5 text-sm font-medium">
            Tutorial completo · em breve
          </span>
        </div>
      </div>
    </section>
  );
}
