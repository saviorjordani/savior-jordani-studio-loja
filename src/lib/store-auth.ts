import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";

/**
 * Bridge to the Savior Jordâni Studio auth-system Worker. The browser never
 * talks to the Worker directly — these server functions run on this app's
 * own Node server, hold the Worker's opaque session token in a sealed
 * HttpOnly cookie, and forward it as a Bearer token server-to-server.
 */
const AUTH_ORIGIN = "https://api.saviz.com.br";
const SESSION_SECRET = process.env.STORE_SESSION_SECRET || "sjs_store_session_secret_32chars_min_length_secure_default";

export type StoreUser = {
  email: string;
  displayName: string | null;
  hasLicense: boolean;
  licenseIssuedAt: string | null;
  licenseExpiresAt: string | null;
  maxDevices: number;
  deviceCount: number;
  createdAt: string;
  subscriptionStatus: string | null;
  subscriptionRenewsAt: string | null;
  cancelAtPeriodEnd: boolean;
};

type StoreSessionData = {
  accessToken: string;
  expiresAt: string;
};

function session() {
  const secret = SESSION_SECRET && SESSION_SECRET.length >= 32 ? SESSION_SECRET : "sjs_store_session_secret_32chars_min_length_secure_default";
  // useSession is a TanStack server primitive, called only inside server functions.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSession<StoreSessionData>({
    password: secret,
    name: "sjs_store",
    maxAge: 60 * 60 * 24 * 30,
    cookie: { sameSite: "lax" },
  });
}

class StoreApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function call<T>(
  path: string,
  init: { method: "GET" | "POST"; body?: unknown; token?: string },
): Promise<T> {
  const response = await fetch(`${AUTH_ORIGIN}${path}`, {
    method: init.method,
    headers: {
      accept: "application/json",
      ...(init.body ? { "content-type": "application/json" } : {}),
      ...(init.token ? { authorization: `Bearer ${init.token}` } : {}),
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new StoreApiError(
      response.status,
      (payload as { error?: string }).error || "Não foi possível completar a solicitação.",
    );
  }
  return payload as T;
}

async function requireToken(): Promise<string> {
  const s = await session();
  const token = s.data.accessToken;
  if (!token) throw new StoreApiError(401, "Você precisa entrar na sua conta.");
  return token;
}

export const registerAccount = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string; displayName?: string }) => data)
  .handler(async ({ data }) => {
    const result = await call<{ accessToken: string; expiresAt: string; user: StoreUser }>(
      "/v1/store/register",
      { method: "POST", body: data },
    );
    const s = await session();
    await s.update({ accessToken: result.accessToken, expiresAt: result.expiresAt });
    return { user: result.user };
  });

export const loginAccount = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const result = await call<{ accessToken: string; expiresAt: string; user: StoreUser }>(
      "/v1/store/login",
      { method: "POST", body: data },
    );
    const s = await session();
    await s.update({ accessToken: result.accessToken, expiresAt: result.expiresAt });
    return { user: result.user };
  });

export const logoutAccount = createServerFn({ method: "POST" }).handler(async () => {
  const s = await session();
  const token = s.data.accessToken;
  if (token) {
    await call("/v1/store/logout", { method: "POST", token }).catch(() => undefined);
  }
  await s.clear();
  return { ok: true };
});

export const fetchMe = createServerFn({ method: "GET" }).handler(async () => {
  const s = await session();
  const token = s.data.accessToken;
  if (!token) return { user: null as StoreUser | null };
  try {
    const result = await call<{ user: StoreUser }>("/v1/store/me", { method: "GET", token });
    return { user: result.user };
  } catch (error) {
    if (error instanceof StoreApiError && error.status === 401) {
      await s.clear();
      return { user: null as StoreUser | null };
    }
    throw error;
  }
});

export const purchaseLicense = createServerFn({ method: "POST" }).handler(async () => {
  const token = await requireToken();
  const result = await call<{ checkoutUrl: string }>("/v1/store/checkout", {
    method: "POST",
    token,
  });
  return result;
});

export const fetchLicenseCredentials = createServerFn({ method: "GET" }).handler(async () => {
  const token = await requireToken();
  return call<{ email: string; activationKey: string; expiresAt: string | null }>(
    "/v1/store/license-credentials",
    { method: "GET", token },
  );
});

export const fetchDevices = createServerFn({ method: "GET" }).handler(async () => {
  const token = await requireToken();
  const result = await call<{
    items: Array<{ id: string; deviceId: string; firstSeenAt: string; lastSeenAt: string }>;
  }>("/v1/store/devices", { method: "GET", token });
  return result.items;
});

export const revokeDevice = createServerFn({ method: "POST" })
  .validator((data: { deviceRowId: string }) => data)
  .handler(async ({ data }) => {
    const token = await requireToken();
    await call(`/v1/store/devices/${encodeURIComponent(data.deviceRowId)}/revoke`, {
      method: "POST",
      token,
    });
    return { ok: true };
  });

export const resetDevices = createServerFn({ method: "POST" }).handler(async () => {
  const token = await requireToken();
  await call("/v1/store/devices/reset", { method: "POST", token });
  return { ok: true };
});

export type { StoreUser };
