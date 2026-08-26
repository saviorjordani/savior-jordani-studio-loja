import { useEffect, useState } from "react";

/** Mock de sessão do cliente (frontend-only). */
const KEY = "saviz_session";

/** Email com acesso total ao painel administrativo. */
export const SUPER_ADMIN_EMAIL = "euwagnerofficial@gmail.com";

export function isSuperAdmin(email: string | null | undefined) {
  return !!email && email.trim().toLowerCase() === SUPER_ADMIN_EMAIL;
}

export function signIn(email: string) {
  localStorage.setItem(KEY, JSON.stringify({ email: email.trim(), at: Date.now() }));
  window.dispatchEvent(new Event("saviz-session"));
}

export function signOut() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("saviz-session"));
}

export function useSession() {
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem(KEY);
        setEmail(raw ? (JSON.parse(raw).email as string) : null);
      } catch {
        setEmail(null);
      }
      setReady(true);
    };
    read();
    window.addEventListener("saviz-session", read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("saviz-session", read);
      window.removeEventListener("storage", read);
    };
  }, []);

  return { email, ready, signedIn: !!email, isAdmin: isSuperAdmin(email) };
}
