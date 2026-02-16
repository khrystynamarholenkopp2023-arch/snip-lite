# Snip Lite

![CI/CD Pipeline](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-0.1.0-blue)

Веб-застосунок для відстеження медіа: фільмів, серіалів, книг та аніме. Дозволяє вести особистий список з оцінками та статусами перегляду.

## Стек технологій

- **Frontend:** Vue 3 + Vite
- **Стилі:** CSS3
- **Зберігання даних:** localStorage
- **Тести:** Vitest + Playwright
- **Лінтер:** ESLint + Prettier

## Можливості MVP

- Додавання медіа (назва, тип, статус, оцінка)
- Статуси: "Хочу переглянути", "Переглядаю", "Переглянуто"
- Фільтрація за типом та статусом
- Збереження даних у браузері (localStorage)

## Запуск проєкту

```bash
# Встановити залежності
npm install

# Запуск в режимі розробки
npm run dev

# Збірка для продакшену
npm run build

# Запуск тестів
npm run test:unit
```

## Структура проєкту

```
snip-lite/
├── src/
│   ├── components/
│   │   ├── MediaCard.vue       # Картка медіа
│   │   └── MediaForm.vue       # Форма додавання
│   ├── composables/
│   │   └── useMedia.js         # Бізнес-логіка
│   ├── App.vue                 # Кореневий компонент
│   └── main.js                 # Точка входу
├── public/
├── .gitignore
├── .env
├── .env.production
├── index.html
├── vite.config.js
└── README.md
```

## Live Demo

[snip-lite.vercel.app](https://snip-lite.vercel.app)
Test change for PR
