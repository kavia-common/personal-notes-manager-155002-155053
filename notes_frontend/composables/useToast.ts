type ToastItem = {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
};

const items = ref<ToastItem[]>([]);
let idCounter = 1;

// PUBLIC_INTERFACE
export function useToast() {
  /** Simple toast notifications composable. */
  function push(type: ToastItem['type'], message: string, timeout = 3000) {
    const id = idCounter++;
    const item = { id, type, message };
    items.value.push(item);
    if (timeout > 0) {
      setTimeout(() => {
        remove(id);
      }, timeout);
    }
  }
  function success(msg: string) {
    push('success', msg);
  }
  function error(msg: string) {
    push('error', msg, 4500);
  }
  function info(msg: string) {
    push('info', msg);
  }
  function remove(id: number) {
    items.value = items.value.filter(t => t.id !== id);
  }

  return { items, push, success, error, info, remove };
}
