<template>
  <div class="auth-container">
    <div class="card">
      <h1 class="title">Sign in</h1>
      <p class="subtitle">Access your notes securely</p>

      <form @submit.prevent="onSubmit" class="form">
        <div class="field">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>

        <div class="field">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
          />
        </div>

        <button class="btn primary" type="submit" :disabled="loading">
          <span v-if="loading">Signing in...</span>
          <span v-else>Sign in</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import { useToast } from '~/composables/useToast';

definePageMeta({
  layout: 'default',
  middleware: ['guest-only']
});

const auth = useAuth();
const toast = useToast();

const email = ref('');
const password = ref('');
const loading = ref(false);

async function onSubmit() {
  try {
    loading.value = true;
    await auth.login(email.value, password.value);
    toast.success('Welcome back!');
    await navigateTo('/');
  } catch (e: any) {
    toast.error(e?.message || 'Unable to sign in');
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.auth-container {
  min-height: calc(100vh - 56px);
  display: grid;
  place-items: center;
  padding: 16px;
}
.card {
  width: 100%;
  max-width: 420px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
}
.title {
  margin: 0 0 8px;
  font-size: 22px;
}
.subtitle {
  margin: 0 0 24px;
  color: var(--color-text-muted);
}
.form {
  display: grid;
  gap: 16px;
}
.field {
  display: grid;
  gap: 8px;
}
input {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
}
input:focus {
  outline: 2px solid var(--color-accent-weak);
  border-color: var(--color-accent);
}
.btn {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
}
.btn.primary {
  background: var(--color-primary);
  color: white;
}
.btn.primary:disabled {
  opacity: 0.7;
  cursor: default;
}
</style>
