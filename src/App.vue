import.meta.env.VITE_APP_STATUS

<template>
  <div class="app">
    <header class="header">
      <h1>Snip Lite</h1>
      <p class="subtitle">Особистий трекер медіа</p>
      <span class="env-badge">{{ appStatus }}</span>
    </header>

    <main class="main">
      <MediaForm @add="handleAdd" />

      <div class="filters">
        <select v-model="filterType">
          <option value="">Всі типи</option>
          <option v-for="t in TYPES" :key="t" :value="t">{{ t }}</option>
        </select>
        <select v-model="filterStatus">
          <option value="">Всі статуси</option>
          <option v-for="(s, k) in STATUSES" :key="k" :value="s">{{ s }}</option>
        </select>
      </div>

      <p class="count">Знайдено: {{ filtered.length }}</p>

      <div class="list">
        <MediaCard
          v-for="item in filtered"
          :key="item.id"
          :item="item"
          @remove="removeItem"
          @update-status="updateStatus"
        />
        <p v-if="filtered.length === 0" class="empty">Список порожній. Додайте перше медіа!</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import MediaForm from './MediaForm.vue'
import MediaCard from './MediaCard.vue'
import { useMedia, STATUSES, TYPES } from './useMedia.js'

const { filtered, filterType, filterStatus, addItem, removeItem, updateStatus } = useMedia()

const appStatus = import.meta.env.VITE_APP_STATUS || 'Development'

function handleAdd(data) {
  addItem(data.title, data.type, data.status, data.rating)
}
</script>




