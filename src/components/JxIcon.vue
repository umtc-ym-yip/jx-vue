<template>
  <span class="material-symbols-outlined" :style="style" :class="classClass">
    <slot></slot>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  fill: {
    type: [Number, String],
    default: 0,
    validator: (value) => value >= 0 && value <= 1
  },
  weight: {
    type: [Number, String],
    default: 200,
    validator: (value) => value >= 100 && value <= 700
  },
  grade: {
    type: [Number, String],
    default: 0,
    validator: (value) => value >= -25 && value <= 200
  },
  size: {
    type: [Number, String],
    default: 24,
    validator: (value) => value >= 20 && value <= 48
  },
  color: {
    type: String,
    default: 'black'
  }
})

const classClass = computed(() => {
  return `${props.color}`
})

const style = computed(() => ({
  'font-variation-settings': `'FILL' ${props.fill}, 'wght' ${props.weight}, 'GRAD' ${props.grade}, 'opsz' ${props.size}`
}))
</script>
