import { apiFetch } from '~/services/api';

export type Note = {
  id: string;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;
};

const _notes = ref<Note[]>([]);
const _loading = ref(false);

// PUBLIC_INTERFACE
export function useNotes() {
  /** Notes composable offering CRUD operations and state. */
  async function listNotes() {
    _loading.value = true;
    try {
      const data = await apiFetch<Note[]>('/notes');
      _notes.value = data;
    } finally {
      _loading.value = false;
    }
  }

  // PUBLIC_INTERFACE
  async function createNote(payload: Partial<Note>) {
    const created = await apiFetch<Note>('/notes', {
      method: 'POST',
      body: payload
    });
    _notes.value = [created, ..._notes.value];
    return created;
  }

  // PUBLIC_INTERFACE
  async function updateNote(id: string, payload: Partial<Note>) {
    const updated = await apiFetch<Note>(`/notes/${id}`, {
      method: 'PUT',
      body: payload
    });
    _notes.value = _notes.value.map(n => n.id === id ? updated : n);
    return updated;
  }

  // PUBLIC_INTERFACE
  async function deleteNote(id: string) {
    await apiFetch<void>(`/notes/${id}`, {
      method: 'DELETE'
    });
    _notes.value = _notes.value.filter(n => n.id !== id);
  }

  return {
    notes: computed(() => _notes.value),
    loading: computed(() => _loading.value),
    listNotes,
    createNote,
    updateNote,
    deleteNote
  };
}
