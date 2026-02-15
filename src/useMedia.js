import { ref, computed } from 'vue'

const STORAGE_KEY = 'snip-lite-media'

export const STATUSES = {
  WANT: 'Хочу переглянути',
  WATCHING: 'Переглядаю',
  DONE: 'Переглянуто',
}

export const TYPES = ['Фільм', 'Серіал', 'Аніме', 'Книга']

export function useMedia() {
  const items = ref(loadFromStorage())
  const filterType = ref('')
  const filterStatus = ref('')

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
  }

  function addItem(title, type, status, rating = 0) {
    if (!title || !title.trim()) return false
    if (!TYPES.includes(type)) return false
    if (!Object.values(STATUSES).includes(status)) return false
    if (rating < 0 || rating > 10) return false

    items.value.push({
      id: Date.now(),
      title: title.trim(),
      type,
      status,
      rating,
    })
    saveToStorage()
    return true
  }

  function removeItem(id) {
    items.value = items.value.filter((i) => i.id !== id)
    saveToStorage()
  }

  function updateStatus(id, status) {
    const item = items.value.find((i) => i.id === id)
    if (!item) return false
    item.status = status
    saveToStorage()
    return true
  }

  const filtered = computed(() => {
    return items.value.filter((i) => {
      const matchType = filterType.value ? i.type === filterType.value : true
      const matchStatus = filterStatus.value ? i.status === filterStatus.value : true
      return matchType && matchStatus
    })
  })

  return {
    items,
    filtered,
    filterType,
    filterStatus,
    addItem,
    removeItem,
    updateStatus,
  }
}
