import { Link } from "@tanstack/react-router";
import { CornerDownLeft, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SEARCH_INDEX, searchSite } from "@/lib/search-index";

const SUGGESTIONS = ["preço", "instalação", "download", "reembolso", "licença"];

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(
    () => (query.trim() ? searchSite(query) : SEARCH_INDEX.slice(0, 6)),
    [query],
  );

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center bg-black/70 p-4 pt-[10vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Buscar no site"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-background-secondary shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            aria-label="Buscar páginas do site"
            placeholder="Buscar páginas, ajuda, preços…"
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((i) => Math.min(i + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter") {
                const el = document.getElementById(`search-result-${active}`);
                (el as HTMLAnchorElement | null)?.click();
              }
            }}
            className="h-14 w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="button"
            aria-label="Fechar busca"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-foreground">Nada encontrado para “{query}”.</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ul>
              {results.map((r, i) => (
                <li key={r.to}>
                  <Link
                    id={`search-result-${i}`}
                    to={r.to}
                    onClick={onClose}
                    onMouseEnter={() => setActive(i)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 ${
                      i === active ? "bg-background-tertiary" : ""
                    }`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {r.title}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {r.description}
                      </span>
                    </span>
                    <span className="shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {r.section}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <CornerDownLeft className="size-3" /> abrir
          </span>
          <span>↑ ↓ navegar</span>
          <span>Esc fechar</span>
        </div>
      </div>
    </div>
  );
}
