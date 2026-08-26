import { useCallback, useEffect, useState } from "react";
import { fetchMe, logoutAccount, type StoreUser } from "@/lib/store-auth";

/** Sessão real do cliente da loja, apoiada na conta do auth-system. */
const EVENT = "sjs-customer-session";

function notify() {
  window.dispatchEvent(new Event(EVENT));
}

export function refreshCustomerSession() {
  notify();
}

export function useCustomerSession() {
  const [user, setUser] = useState<StoreUser | null>(null);
  const [ready, setReady] = useState(false);

  const load = useCallback(async () => {
    try {
      const result = await fetchMe();
      setUser(result.user);
    } catch {
      setUser(null);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    void load();
    window.addEventListener(EVENT, load);
    return () => window.removeEventListener(EVENT, load);
  }, [load]);

  const signOut = useCallback(async () => {
    await logoutAccount().catch(() => undefined);
    setUser(null);
    notify();
  }, []);

  return {
    user,
    email: user?.email ?? null,
    ready,
    signedIn: !!user,
    hasLicense: user?.hasLicense ?? false,
    signOut,
    refresh: load,
  };
}
