<template>
  <ul class="space-y-2 text-gray-700 list-disc list-inside" :class="customClass">
    <slot></slot>
  </ul>
</template>

<script setup>
const props = defineProps({
  customClass: {
    type: String,
    default: ''
  }
})
</script>
