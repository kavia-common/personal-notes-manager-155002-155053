<template>
  <div class="toasts" aria-live="polite" aria-atomic="true">
    <div v-for="t in toast.items" :key="t.id" class="toast" :class="t.type">
      <span>{{ t.message }}</span>
      <button class="close" @click="toast.remove(t.id)">✕</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast';
const toast = useToast();
</script>

<style scoped>
.toasts {
  position: fixed;
  right: 12px;
  bottom: 12px;
  display: grid;
  gap: 8px;
  z-index: 60;
}
.toast {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-secondary);
  color: var(--color-text);
  padding: 10px 12px;
  border-radius: 10px;
  min-width: 220px;
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.toast.success { border-left-color: #10b981; }
.toast.error { border-left-color: #ef4444; }
.toast.info { border-left-color: var(--color-accent); }
.close {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
}
</style>
