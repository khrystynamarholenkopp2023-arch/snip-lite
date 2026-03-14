import { describe, it, expect, beforeEach } from 'vitest'
import { useMedia, STATUSES } from '../src/useMedia.js'

describe('useMedia - зламаний тест', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('НАВМИСНО ЗЛАМАНИЙ: очікує неправильне значення', () => {
    const { addItem, items } = useMedia()
    addItem('Test Movie', 'Фільм', STATUSES.WANT, 7)
    
    //навмисна помилка: очікує 2 елементи, але додали тільки 1
    expect(items.value).toHaveLength(2)  //тест впаде
  })

  it('НАВМИСНО ЗЛАМАНИЙ: перевіряє неіснуючу властивість', () => {
    const { addItem, items } = useMedia()
    addItem('Breaking Bad', 'Серіал', STATUSES.WATCHING, 10)
    
    //навмисна помилка: перевіряємо неіснуючу властивість
    expect(items.value[0].director).toBe('Vince Gilligan')  //властивості director не існує
  })
})


