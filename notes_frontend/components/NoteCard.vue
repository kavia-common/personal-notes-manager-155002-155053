<template>
  <article class="card" @click="$emit('open')">
    <header class="header">
      <h3 class="title">{{ note.title || 'Untitled' }}</h3>
      <div class="actions" @click.stop>
        <button class="icon-btn" title="Edit" @click="$emit('edit')">
          ✏️
        </button>
        <button class="icon-btn danger" title="Delete" @click="$emit('delete')">
          🗑️
        </button>
      </div>
    </header>
    <p class="content">{{ preview }}</p>
    <footer class="meta">
      <span>{{ dateText }}</span>
    </footer>
  </article>
</template>

<script setup lang="ts">
import type { Note } from '~/composables/useNotes';

const props = defineProps<{ note: Note }>();

const preview = computed(() => {
  const text = props.note.content || '';
  return text.length > 160 ? text.slice(0, 160) + '…' : text;
});
const dateText = computed(() => {
  const d = props.note.updated_at || props.note.created_at;
  if (!d) return '';
  try {
    return new Date(d).toLocaleString();
  } catch {
    return d;
  }
});
</script>

<style scoped>
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 12px;
  display: grid;
  gap: 8px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
}
.card:hover {
  border-color: color-mix(in oklab, var(--color-primary) 25%, var(--color-border));
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}
.title {
  margin: 0;
  font-size: 16px;
}
.actions {
  display: flex;
  gap: 6px;
}
.icon-btn {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 4px 6px;
  cursor: pointer;
}
.icon-btn.danger {
  border-color: #ef4444;
  color: #ef4444;
}
.content {
  margin: 0;
  color: var(--color-text-muted);
  min-height: 50px;
}
.meta {
  font-size: 12px;
  color: var(--color-text-muted);
}
</style>
