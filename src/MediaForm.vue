<template>
  <div class="form-card">
    <h2>Додати медіа</h2>
    <div class="form-row">
      <input v-model="title" placeholder="Назва..." />
      <select v-model="type">
        <option value="">Тип</option>
        <option v-for="t in TYPES" :key="t" :value="t">{{ t }}</option>
      </select>
      <select v-model="status">
        <option v-for="(s, k) in STATUSES" :key="k" :value="s">{{ s }}</option>
      </select>
      <input v-model.number="rating" type="number" min="0" max="10" placeholder="Оцінка (0–10)" />
      <button @click="submit">Додати</button>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { STATUSES, TYPES } from './useMedia.js'

const emit = defineEmits(['add'])

const title = ref('')
const type = ref(TYPES[0])
const status = ref(Object.values(STATUSES)[0])
const rating = ref(0)
const error = ref('')

function submit() {
  if (!title.value.trim()) {
    error.value = 'Введіть назву'
    return
  }
  emit('add', { title: title.value, type: type.value, status: status.value, rating: rating.value })
  title.value = ''
  rating.value = 0
  error.value = ''
}
</script>
