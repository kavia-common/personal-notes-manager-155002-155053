import { apiFetch } from '~/services/api';

type User = {
  id: string;
  email: string;
  name?: string;
};

const _user = ref<User | null>(null);
const _loaded = ref(false);

// PUBLIC_INTERFACE
export function useAuth() {
  /** Auth composable managing user session and helpers. */
  const isAuthenticated = computed(() => !!_user.value);

  async function fetchMe(): Promise<User | null> {
    try {
      const me = await apiFetch<User>('/auth/me');
      _user.value = me;
      return me;
    } catch {
      _user.value = null;
      return null;
    } finally {
      _loaded.value = true;
    }
  }

  async function login(email: string, password: string) {
    const data = await apiFetch<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: { email, password },
      token: null,
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', data.token);
    }
    _user.value = data.user;
  }

  async function logout() {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
    _user.value = null;
  }

  if (!_loaded.value && process.client) {
    // Initialize session on first client use
    fetchMe();
  }

  return {
    user: computed(() => _user.value),
    isAuthenticated,
    login,
    logout,
    fetchMe,
  };
}
