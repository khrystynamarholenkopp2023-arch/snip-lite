<template>
  <div class="card" :class="statusClass">
    <div class="card-info">
      <span class="card-type">{{ item.type }}</span>
      <h3 class="card-title">{{ item.title }}</h3>
      <span class="card-rating">⭐ {{ item.rating }}/10</span>
    </div>
    <div class="card-actions">
      <select :value="item.status" @change="$emit('update-status', item.id, $event.target.value)">
        <option v-for="(s, k) in STATUSES" :key="k" :value="s">{{ s }}</option>
      </select>
      <button class="btn-remove" @click="$emit('remove', item.id)">✕</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { STATUSES } from './useMedia.js'

const props = defineProps({ item: Object })
defineEmits(['remove', 'update-status'])

const statusClass = computed(() => ({
  'card--want': props.item.status === STATUSES.WANT,
  'card--watching': props.item.status === STATUSES.WATCHING,
  'card--done': props.item.status === STATUSES.DONE,
}))
</script>
