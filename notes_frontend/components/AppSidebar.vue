<template>
  <nav class="sidebar">
    <NuxtLink to="/" class="item" exact-active-class="active">
      <span>All Notes</span>
    </NuxtLink>
    <!-- Placeholder for possible future sections -->
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.sidebar {
  padding: 12px;
  display: grid;
  gap: 6px;
}
.item {
  padding: 10px 12px;
  border-radius: 8px;
  color: var(--color-text);
  text-decoration: none;
  border: 1px solid transparent;
}
.item:hover {
  background: color-mix(in oklab, var(--color-primary) 7%, white);
}
.active {
  background: color-mix(in oklab, var(--color-primary) 10%, white);
  border-color: var(--color-border);
}
</style>
