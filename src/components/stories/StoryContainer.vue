<template>
  <div class="story-container">
    <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
    <div class="my-8">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
