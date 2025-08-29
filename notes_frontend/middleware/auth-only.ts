import { useAuth } from '~/composables/useAuth';

// PUBLIC_INTERFACE
export default defineNuxtRouteMiddleware((to, from) => {
  /** Require authenticated user; redirect to /login if missing. */
  const auth = useAuth();
  if (!auth.isAuthenticated.value) {
    return navigateTo('/login');
  }
});
