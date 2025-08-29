import { useRuntimeConfig } from '#app';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiOptions {
  method?: HttpMethod;
  body?: any;
  token?: string | null;
  headers?: Record<string, string>;
}

function getBaseUrl(): string {
  const config = useRuntimeConfig();
  // Runtime config exposes public under config.public
  const fromEnv = config.public.apiBase as string | undefined;
  return (fromEnv || '').replace(/\/+$/, '');
}

// PUBLIC_INTERFACE
export async function apiFetch<T>(path: string, opts: ApiOptions = {}): Promise<T> {
  /** Perform a fetch against the backend REST API with JSON convenience and auth header support. */
  const base = getBaseUrl();
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers || {}),
  };

  const token = opts.token ?? (typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null);
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, {
    method: opts.method || 'GET',
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    credentials: 'include',
  });

  if (!res.ok) {
    let detail = '';
    try {
      const data = await res.json();
      detail = data?.message || data?.detail || JSON.stringify(data);
    } catch {
      detail = await res.text();
    }
    throw new Error(`API ${res.status}: ${detail || res.statusText}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }
  return res.json() as Promise<T>;
}
