<template>
  <div class="app">
    <AppTopNav
      :user="auth.user"
      @logout="handleLogout"
    />

    <div class="content">
      <aside class="sidebar">
        <AppSidebar />
      </aside>
      <main class="main">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';

const auth = useAuth();

async function handleLogout() {
  await auth.logout();
  await navigateTo('/login');
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: 56px 1fr;
  background: var(--color-bg);
  color: var(--color-text);
}

.content {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: calc(100vh - 56px);
}

.sidebar {
  border-right: 1px solid var(--color-border);
  background: var(--color-surface);
}

.main {
  padding: 16px;
}

@media (max-width: 900px) {
  .content {
    grid-template-columns: 1fr;
  }
  .sidebar {
    display: none;
  }
}
</style>
