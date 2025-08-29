<template>
  <div class="page">
    <section class="toolbar">
      <div class="search">
        <IconSearch class="icon" />
        <input
          v-model="query"
          type="text"
          placeholder="Search notes by title or content..."
        />
      </div>
      <div class="actions">
        <button class="btn ghost" @click="refreshNotes" :disabled="loading">Refresh</button>
        <button class="btn primary" @click="openCreate">New Note</button>
      </div>
    </section>

    <section class="grid">
      <NoteCard
        v-for="n in filteredNotes"
        :key="n.id"
        :note="n"
        @open="openView(n)"
        @edit="openEdit(n)"
        @delete="onDelete(n)"
      />
      <div v-if="!loading && filteredNotes.length === 0" class="empty">
        No notes yet. Create your first one!
      </div>
      <div v-if="loading" class="loading">Loading notes...</div>
    </section>

    <NoteModal
      v-if="modal.open"
      :mode="modal.mode"
      :note="modal.note"
      @close="closeModal"
      @save="onSave"
    />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import { useNotes } from '~/composables/useNotes';
import { useToast } from '~/composables/useToast';
import IconSearch from '~/components/icons/IconSearch.vue';
import NoteCard from '~/components/NoteCard.vue';
import NoteModal from '~/components/NoteModal.vue';

definePageMeta({
  layout: 'default',
  middleware: ['auth-only']
});

const auth = useAuth();
const { listNotes, createNote, updateNote, deleteNote, notes, loading } = useNotes();
const toast = useToast();

const query = ref('');
const modal = reactive<{ open: boolean; mode: 'view' | 'create' | 'edit'; note: any | null }>({
  open: false,
  mode: 'view',
  note: null
});

const filteredNotes = computed(() => {
  if (!query.value.trim()) return notes.value;
  const q = query.value.toLowerCase();
  return notes.value.filter(
    (n) =>
      n.title?.toLowerCase().includes(q) ||
      n.content?.toLowerCase().includes(q)
  );
});

onMounted(async () => {
  if (auth.isAuthenticated.value) {
    await listNotes();
  }
});

function openCreate() {
  modal.open = true;
  modal.mode = 'create';
  modal.note = { title: '', content: '' };
}
function openEdit(note: any) {
  modal.open = true;
  modal.mode = 'edit';
  modal.note = { ...note };
}
function openView(note: any) {
  modal.open = true;
  modal.mode = 'view';
  modal.note = { ...note };
}
function closeModal() {
  modal.open = false;
  modal.note = null;
}
async function onSave(payload: { id?: string; title: string; content: string }) {
  try {
    if (modal.mode === 'create') {
      await createNote(payload);
      toast.success('Note created');
    } else if (modal.mode === 'edit' && payload.id) {
      await updateNote(payload.id, payload);
      toast.success('Note updated');
    }
    closeModal();
  } catch (e: any) {
    toast.error(e?.message || 'Failed to save note');
  }
}
async function onDelete(note: any) {
  if (!confirm('Delete this note?')) return;
  try {
    await deleteNote(note.id);
    toast.success('Note deleted');
  } catch (e: any) {
    toast.error(e?.message || 'Failed to delete note');
  }
}
async function refreshNotes() {
  await listNotes();
}
</script>

<style scoped>
.page {
  display: grid;
  gap: 16px;
}
.toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.search {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--color-border);
  padding: 8px 10px;
  border-radius: 10px;
  background: var(--color-surface);
  min-width: 260px;
  flex: 1;
}
.search input {
  border: none;
  outline: none;
  background: transparent;
  color: var(--color-text);
  width: 100%;
}
.icon {
  width: 18px;
  height: 18px;
  color: var(--color-text-muted);
}
.actions {
  display: flex;
  gap: 8px;
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
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.empty, .loading {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--color-text-muted);
  padding: 24px 0;
}
@media (max-width: 1100px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
