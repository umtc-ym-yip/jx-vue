<template>
  <div v-if="isEmpty" class="flex flex-col items-center justify-center">
    <slot>
      <img :src="getImage()" :alt="imageAlt" :class="['object-contain']" :style="imageStyle" />
      <p :class="messageClass">{{ message }}</p>
    </slot>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  isEmpty: {
    type: Boolean,
    default: true,
    require: true
  },
  message: {
    type: String,
    default: '沒有資料'
  },
  width: {
    type: [String, Number],
    default: '600px'
  },
  height: {
    type: [String, Number],
    default: 'auto'
  },
  imageSrc: {
    type: String,
    default: '@/assets/data_not_found.png'
  },
  imageAlt: {
    type: String,
    default: 'Data not found'
  },
  messageClass: {
    type: String,
    default: 'text-secondary font-medium'
  }
})

function getImage() {
  return new URL(`${props.imageSrc.replace('@/', '../')}`, import.meta.url)
}
const imageStyle = computed(() => {
  const style = {}
  if (props.width !== 'auto') {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.height !== 'auto') {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return style
})
</script>
