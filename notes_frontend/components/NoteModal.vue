<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <header class="modal-header">
        <h3 v-if="mode === 'create'">Create Note</h3>
        <h3 v-else-if="mode === 'edit'">Edit Note</h3>
        <h3 v-else>View Note</h3>
        <button class="close" @click="$emit('close')">✕</button>
      </header>

      <div class="modal-body">
        <div class="field">
          <label for="title">Title</label>
          <input id="title" v-model="local.title" :readonly="mode === 'view'" placeholder="Note title" />
        </div>
        <div class="field">
          <label for="content">Content</label>
          <textarea id="content" v-model="local.content" :readonly="mode === 'view'" rows="10" placeholder="Write your note here..." />
        </div>
      </div>

      <footer class="modal-footer">
        <button class="btn ghost" @click="$emit('close')">Close</button>
        <button
          v-if="mode !== 'view'"
          class="btn primary"
          @click="emitSave"
        >
          Save
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '~/composables/useNotes';

const props = defineProps<{
  mode: 'view'|'create'|'edit',
  note: Partial<Note> | null
}>();
const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'save', payload: { id?: string; title: string; content: string }): void
}>();

const local = reactive<{ id?: string; title: string; content: string }>({
  id: '',
  title: '',
  content: ''
});

watch(() => props.note, (n) => {
  local.id = (n?.id as string) || '';
  local.title = n?.title || '';
  local.content = n?.content || '';
}, { immediate: true });

function emitSave() {
  emit('save', { id: local.id || undefined, title: local.title, content: local.content });
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.35);
  display: grid;
  place-items: center;
  padding: 16px;
  z-index: 50;
}
.modal {
  width: 100%;
  max-width: 720px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-bottom: 1px solid var(--color-border);
}
.modal-body {
  padding: 12px 14px;
  display: grid;
  gap: 12px;
}
.modal-footer {
  padding: 12px 14px;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.field {
  display: grid;
  gap: 8px;
}
input, textarea {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
}
input:focus, textarea:focus {
  outline: 2px solid var(--color-accent-weak);
  border-color: var(--color-accent);
}

.close {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.btn {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
}
.btn.ghost {
  background: transparent;
}
.btn.primary {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}
</style>
