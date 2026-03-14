import { test, expect } from '@playwright/test'

test.describe('Snip Lite E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('додає нове медіа через форму', async ({ page }) => {
    //заповнюємо форму
    await page.fill('input[placeholder="Назва..."]', 'Inception')
    await page.selectOption('select >> nth=0', 'Фільм')
    await page.selectOption('select >> nth=1', 'Переглянуто')
    await page.fill('input[type="number"]', '9')
    
    //натискаємо кнопку додавання
    await page.click('button:has-text("Додати")')
    
    //перевіряємо що картка зявилася
    await expect(page.locator('.card')).toHaveCount(1)
    await expect(page.locator('.card-title')).toHaveText('Inception')
    await expect(page.locator('.card-rating')).toContainText('9')
  })

  test('фільтрує медіа за типом', async ({ page }) => {
    //додаємо два медіа різних типів
    await page.fill('input[placeholder="Назва..."]', 'Film Title')
    await page.selectOption('select >> nth=0', 'Фільм')
    await page.click('button:has-text("Додати")')
    
    await page.fill('input[placeholder="Назва..."]', 'Book Title')
    await page.selectOption('select >> nth=0', 'Книга')
    await page.click('button:has-text("Додати")')
    
    //фільтруємо за типом Фільм
    await page.locator('.filters select').first().selectOption('Фільм')
    
    //перевіряємо що залишилась тільки одна картка
    await expect(page.locator('.card')).toHaveCount(1)
    await expect(page.locator('.card-title')).toHaveText('Film Title')
  })

  test('видаляє медіа', async ({ page }) => {
    //додаємо медіа
    await page.fill('input[placeholder="Назва..."]', 'To Delete')
    await page.selectOption('select >> nth=0', 'Фільм')
    await page.click('button:has-text("Додати")')
    
    //натискаємо кнопку видалення
    await page.click('.btn-remove')
    
    //перевіряємо що список порожній
    await expect(page.locator('.empty')).toBeVisible()
    await expect(page.locator('.card')).toHaveCount(0)
  })

  test('змінює статус медіа', async ({ page }) => {
    //додаємо медіа зі статусом "Хочу переглянути"
    await page.fill('input[placeholder="Назва..."]', 'Status Test')
    await page.selectOption('select >> nth=0', 'Фільм')
    await page.selectOption('select >> nth=1', 'Хочу переглянути')
    await page.click('button:has-text("Додати")')
    
    //змінюємо статус через select у картці
    await page.locator('.card-actions select').selectOption('Переглянуто')
    
    //перевіряємо що клас картки змінився
    await expect(page.locator('.card')).toHaveClass(/card--done/)
  })

  test('показує повідомлення про помилку при порожній назві', async ({ page }) => {
    //натискаємо "додати" без введення назви
    await page.click('button:has-text("Додати")')
    
    //перевіряємо що зявилось повідомлення про помилку
    await expect(page.locator('.error')).toBeVisible()
    await expect(page.locator('.error')).toHaveText('Введіть назву')
    
    //перевіряємо що картка не додалась
    await expect(page.locator('.card')).toHaveCount(0)
  })

  test('зберігає дані в localStorage', async ({ page }) => {
    //додаємо медіа
    await page.fill('input[placeholder="Назва..."]', 'Persistence Test')
    await page.selectOption('select >> nth=0', 'Аніме')
    await page.click('button:has-text("Додати")')
    
    //перезавантажуємо сторінку
    await page.reload()
    
    //перевіряємо що медіа залишилось
    await expect(page.locator('.card')).toHaveCount(1)
    await expect(page.locator('.card-title')).toHaveText('Persistence Test')
  })

  test('показує лічильник знайдених елементів', async ({ page }) => {
    //додаємо 3 медіа
    for (let i = 1; i <= 3; i++) {
      await page.fill('input[placeholder="Назва..."]', `Item ${i}`)
      await page.selectOption('select >> nth=0', 'Фільм')
      await page.click('button:has-text("Додати")')
    }
    
    //перевіряємо лічильник
    await expect(page.locator('.count')).toContainText('Знайдено: 3')
  })
})
