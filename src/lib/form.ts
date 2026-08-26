import { useState } from "react";

export type Errors<T extends string> = Partial<Record<T, string>>;

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim());

/** Simula uma chamada de rede (frontend-only). */
export function useSubmit() {
  const [loading, setLoading] = useState(false);
  const run = async (fn?: () => void | Promise<void>, ms = 900) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, ms));
    await fn?.();
    setLoading(false);
  };
  return { loading, run };
}
