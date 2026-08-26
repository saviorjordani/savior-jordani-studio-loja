import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Faq({ id = "faq" }: { id?: string }) {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <section id={id} className="section-y">
      <div className="container-page max-w-3xl">
        <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
          Perguntas frequentes
        </h2>

        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-background-secondary">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-background-tertiary"
                >
                  <span className="text-base font-semibold">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-accent-soft transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                {isOpen ? (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
