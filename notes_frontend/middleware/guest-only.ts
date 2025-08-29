import { useAuth } from '~/composables/useAuth';

// PUBLIC_INTERFACE
export default defineNuxtRouteMiddleware((to, from) => {
  /** Prevent access to guest routes if already authenticated. */
  const auth = useAuth();
  if (auth.isAuthenticated.value) {
    return navigateTo('/');
  }
});
