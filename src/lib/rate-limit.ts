const stores = new Map<string, Map<string, { count: number; windowStart: number }>>();

function getStore(namespace: string) {
  if (!stores.has(namespace)) stores.set(namespace, new Map());
  return stores.get(namespace)!;
}

export function getClientIp(request: Request): string {
  const headers = request.headers;
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  return headers.get("x-real-ip") ?? "unknown";
}

export function isRateLimited(
  clientId: string,
  opts: { namespace?: string; windowMs?: number; max?: number } = {}
): boolean {
  const { namespace = "default", windowMs = 60_000, max = 5 } = opts;
  const store = getStore(namespace);
  const now = Date.now();
  const entry = store.get(clientId);

  if (!entry || now - entry.windowStart > windowMs) {
    store.set(clientId, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= max) return true;

  store.set(clientId, { ...entry, count: entry.count + 1 });
  return false;
}
