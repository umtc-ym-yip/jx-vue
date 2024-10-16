<template>
  <span class="material-symbols-outlined" :style="iconStyle" :class="iconClass">
    <slot></slot>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  fill: {
    type: [Number, String],
    default: 0,
    validator: (value) => Number(value) >= 0 && Number(value) <= 1
  },
  weight: {
    type: [Number, String],
    default: 200,
    validator: (value) => Number(value) >= 100 && Number(value) <= 700
  },
  grade: {
    type: [Number, String],
    default: 0,
    validator: (value) => Number(value) >= -25 && Number(value) <= 200
  },
  size: {
    type: [Number, String],
    default: 24,
    validator: (value) => Number(value) >= 20 && Number(value) <= 48
  },
  color: {
    type: String,
    default: 'black'
  }
})

const iconColor = computed(() => {
  return `text-${props.color}`
})
const iconSize = computed(() => {
  return `text-${props.size}`
})

const iconClass = computed(() => {
  return `${iconSize.value} ${iconColor.value}`
})

const iconStyle = computed(() => ({
  'font-variation-settings': `'FILL' ${String(props.fill)}, 'wght' ${String(props.weight)}, 'GRAD' ${String(props.grade)}, 'opsz' ${String(props.size)}`
}))
</script>
