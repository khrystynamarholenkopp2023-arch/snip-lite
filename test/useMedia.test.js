import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useMedia, STATUSES, TYPES } from './src/useMedia.js'

describe('useMedia composable', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('addItem', () => {
    it('додає медіа з коректними даними', () => {
      const { addItem, items } = useMedia()
      const success = addItem('Inception', 'Фільм', STATUSES.DONE, 9)
      
      expect(success).toBe(true)
      expect(items.value).toHaveLength(1)
      expect(items.value[0].title).toBe('Inception')
      expect(items.value[0].rating).toBe(9)
    })

    it('повертає false при порожній назві', () => {
      const { addItem, items } = useMedia()
      const success = addItem('', 'Фільм', STATUSES.WANT, 0)
      
      expect(success).toBe(false)
      expect(items.value).toHaveLength(0)
    })

    it('повертає false при некоректному типі', () => {
      const { addItem, items } = useMedia()
      const success = addItem('Test', 'НеІснуючийТип', STATUSES.WANT, 0)
      
      expect(success).toBe(false)
      expect(items.value).toHaveLength(0)
    })

    it('повертає false при некоректному статусі', () => {
      const { addItem, items } = useMedia()
      const success = addItem('Test', 'Фільм', 'НеІснуючийСтатус', 0)
      
      expect(success).toBe(false)
      expect(items.value).toHaveLength(0)
    })

    it('повертає false при оцінці менше 0', () => {
      const { addItem, items } = useMedia()
      const success = addItem('Test', 'Фільм', STATUSES.WANT, -5)
      
      expect(success).toBe(false)
      expect(items.value).toHaveLength(0)
    })

    it('повертає false при оцінці більше 10', () => {
      const { addItem, items } = useMedia()
      const success = addItem('Test', 'Фільм', STATUSES.WANT, 15)
      
      expect(success).toBe(false)
      expect(items.value).toHaveLength(0)
    })

    it('тримує пробіли в назві', () => {
      const { addItem, items } = useMedia()
      addItem('  Breaking Bad  ', 'Серіал', STATUSES.WATCHING, 10)
      
      expect(items.value[0].title).toBe('Breaking Bad')
    })
  })

  describe('removeItem', () => {
    it('видаляє медіа за id', () => {
      const { addItem, removeItem, items } = useMedia()
      addItem('Test', 'Фільм', STATUSES.WANT, 5)
      const id = items.value[0].id
      
      removeItem(id)
      expect(items.value).toHaveLength(0)
    })

    it('не видаляє при неіснуючому id', () => {
      const { addItem, removeItem, items } = useMedia()
      addItem('Test', 'Фільм', STATUSES.WANT, 5)
      
      removeItem(99999)
      expect(items.value).toHaveLength(1)
    })
  })

  describe('updateStatus', () => {
    it('оновлює статус медіа', () => {
      const { addItem, updateStatus, items } = useMedia()
      addItem('Test', 'Фільм', STATUSES.WANT, 5)
      const id = items.value[0].id
      
      const success = updateStatus(id, STATUSES.DONE)
      expect(success).toBe(true)
      expect(items.value[0].status).toBe(STATUSES.DONE)
    })

    it('повертає false при неіснуючому id', () => {
      const { addItem, updateStatus } = useMedia()
      addItem('Test', 'Фільм', STATUSES.WANT, 5)
      
      const success = updateStatus(99999, STATUSES.DONE)
      expect(success).toBe(false)
    })
  })

  describe('filtered', () => {
    it('фільтрує за типом', () => {
      const { addItem, filtered, filterType } = useMedia()
      addItem('Film1', 'Фільм', STATUSES.WANT, 5)
      addItem('Book1', 'Книга', STATUSES.WANT, 5)
      
      filterType.value = 'Фільм'
      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].title).toBe('Film1')
    })

    it('фільтрує за статусом', () => {
      const { addItem, filtered, filterStatus } = useMedia()
      addItem('Film1', 'Фільм', STATUSES.WANT, 5)
      addItem('Film2', 'Фільм', STATUSES.DONE, 8)
      
      filterStatus.value = STATUSES.DONE
      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].title).toBe('Film2')
    })

    it('фільтрує за типом і статусом одночасно', () => {
      const { addItem, filtered, filterType, filterStatus } = useMedia()
      addItem('Film1', 'Фільм', STATUSES.WANT, 5)
      addItem('Film2', 'Фільм', STATUSES.DONE, 8)
      addItem('Book1', 'Книга', STATUSES.DONE, 7)
      
      filterType.value = 'Фільм'
      filterStatus.value = STATUSES.DONE
      expect(filtered.value).toHaveLength(1)
      expect(filtered.value[0].title).toBe('Film2')
    })
  })

  describe('localStorage persistence', () => {
    it('зберігає дані в localStorage', () => {
      const { addItem } = useMedia()
      addItem('Test', 'Фільм', STATUSES.WANT, 5)
      
      const stored = JSON.parse(localStorage.getItem('snip-lite-media'))
      expect(stored).toHaveLength(1)
      expect(stored[0].title).toBe('Test')
    })

    it('завантажує дані з localStorage', () => {
      const testData = [{ id: 1, title: 'Stored', type: 'Фільм', status: STATUSES.WANT, rating: 5 }]
      localStorage.setItem('snip-lite-media', JSON.stringify(testData))
      
      const { items } = useMedia()
      expect(items.value).toHaveLength(1)
      expect(items.value[0].title).toBe('Stored')
    })

    it('повертає порожній масив при недоступному localStorage', () => {
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('localStorage unavailable')
      })
      
      const { items } = useMedia()
      expect(items.value).toEqual([])
    })
  })
})
