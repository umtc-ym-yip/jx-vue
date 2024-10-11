<template>
  <button
    @click="handleClick"
    :class="[
      'flex items-center rounded-md',
      sizeClass,
      colorClass,
      { 'flex-row-reverse': iconPosition === 'right' },
      { 'opacity-50 cursor-not-allowed': disabled || loading },
      { 'cursor-progress': loading }
    ]"
  >
    <JxIcon v-if="icon" :class="iconClass">{{ icon }}</JxIcon>
    <span v-if="text && !loading" :class="textClass">{{ text }}</span>
    <!-- 之後改成用套件Spin -->
<<<<<<< HEAD
    <span v-if="loading">Loading...</span>
=======
    <span v-if="loading" class="flex items-center">
      <i class="fas fa-spinner fa-spin mr-2"></i>
      <span :class="textClass">{{ text }}</span>
    </span>
>>>>>>> ff3f097ca01bdd9ac00bb319f6aee267f859c7fd
    <slot></slot>
  </button>
</template>

<script setup>
import { computed, defineEmits } from 'vue'
import JxIcon from './JxIcon.vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'error', 'warning', 'success'].includes(value)
  },
  isOutline: {
    type: Boolean,
    default: false
  },
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  icon: {
    type: String,
    default: ''
  },
  iconColor: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-2 py-1 text-sm'
    case 'md':
      return 'px-4 py-2 text-base'
    case 'lg':
      return 'px-6 py-3 text-lg'
    default:
      return ''
  }
})

const colorClass = computed(() => {
  if (props.isOutline) {
    return `text-${props.color} border border-${props.color} hover:bg-${props.color}/90 hover:text-white active:bg-${props.color}/80`
  } else {
    return `bg-${props.color} border border-${props.color} text-white hover:bg-${props.color}/90 active:bg-${props.color}/80`
  }
})

const iconClass = computed(() => {
  // 如果只有icon，則不需要margin
  return props.text ? (props.iconPosition === 'left' ? 'mr-2' : 'ml-2') : ''
})

const textClass = computed(() => {
  return props.icon ? (props.iconPosition === 'left' ? 'ml-2' : 'mr-2') : ''
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  emit('click', event)
}
</script>
