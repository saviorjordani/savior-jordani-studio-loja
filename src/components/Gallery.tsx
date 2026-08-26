import { BeforeAfter } from "@/components/BeforeAfter";

const galleryImage = (index: number) => `/gallery/retouch-${index}.jpg`;

const compare = [
  { src: galleryImage(1), alt: "Retrato em close com sardas e pele texturizada retocada" },
  { src: galleryImage(3), alt: "Beauty editorial com sombra azul vibrante" },
];

const shots = [
  { src: galleryImage(2), alt: "Retrato de beleza com trança e iluminação dourada" },
  { src: galleryImage(4), alt: "Retrato com sardas naturais e brilho de pele preservado" },
  { src: galleryImage(5), alt: "Retrato dramático em baixa luz com olhos azuis" },
  { src: galleryImage(6), alt: "Retrato de cabelos cacheados claros com sardas" },
  { src: galleryImage(7), alt: "Beauty com batom vermelho e textura de pele preservada" },
  { src: galleryImage(8), alt: "Retrato clean com pele uniforme e cabelo loiro" },
  { src: galleryImage(9), alt: "Beauty com delineado dourado e pele luminosa" },
];

export function Gallery({ id = "galeria" }: { id?: string }) {
  return (
    <section id={id} className="section-y border-b border-border">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Resultados feitos com o plugin
          </h2>
          <p className="mt-4 text-muted-foreground">
            Arraste a barra para comparar antes e depois: pele com textura preservada, luz esculpida
            e cor consistente.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-2">
          {compare.map((c) => (
            <BeforeAfter key={c.src} src={c.src} alt={c.alt} className="aspect-[8/5]" />
          ))}
        </div>

        <div className="mx-auto mt-4 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {shots.map((s) => (
            <figure
              key={s.src}
              className="hover-lift aspect-[4/3] overflow-hidden rounded-xl border border-border bg-background-secondary"
            >
              <img src={s.src} alt={s.alt} loading="lazy" decoding="async" className="size-full object-cover" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
