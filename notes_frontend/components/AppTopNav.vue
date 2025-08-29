<template>
  <header class="topnav">
    <div class="left">
      <div class="brand">
        <span class="dot" />
        <span class="name">Notes</span>
      </div>
    </div>
    <div class="right">
      <span v-if="user" class="user">{{ user.email }}</span>
      <button v-if="user" class="btn ghost" @click="$emit('logout')">Logout</button>
      <NuxtLink v-else class="btn primary" to="/login">Login</NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  user: { email: string } | null
}>();
defineEmits<{
  (e: 'logout'): void
}>();
</script>

<style scoped>
.topnav {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
}
.brand {
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 600;
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 20%, transparent);
}
.name {
  color: var(--color-primary);
  letter-spacing: .2px;
}
.right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.user {
  color: var(--color-text-muted);
  font-size: 14px;
}
.btn {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  text-decoration: none;
}
.btn.ghost { background: transparent; }
.btn.primary {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}
</style>
