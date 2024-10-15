<template>
  <div
    v-if="show"
    :ref="setTooltipRef"
    :class="tooltipClass"
    :style="{ left: `${x}px`, top: `${y}px`, ...tooltipStyle }"
  >
    <slot :data="data" :status="status"></slot>
  </div>
</template>
<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => ({})
  },
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: ''
  },
  setTooltipRef: Function,
  tooltipClass: {
    type: String,
    default: 'absolute bg-white border border-gray-300 rounded p-2.5 text-sm'
  },
  tooltipStyle: {
    type: Object,
    default: () => ({})
  }
})
</script>
