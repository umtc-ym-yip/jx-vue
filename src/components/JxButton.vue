<template>
  <button
    @click="handleClick"
    :class="[
      'flex items-center rounded-md',
      sizeClass,
      colorClass,
      { 'flex-row-reverse': iconPosition === 'right' },
      { 'opacity-50 cursor-not-allowed': disabled || loading },
      { 'cursor-progress': loading },
      { relative: hasBadge }
    ]"
  >
    <JxIcon v-if="icon" :class="iconClass">{{ icon }}</JxIcon>
    <span v-if="text && !loading" :class="textClass">{{ text }}</span>
    <span v-if="loading" class="flex items-center">
      <i class="fas fa-spinner fa-spin mr-2"></i>
      <span :class="textClass">{{ text }}</span>
    </span>
    <span
      v-if="hasBadge && (badgeText === 0 || badgeText) && badgeBgColor"
      class="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
      :class="[
        badgeClass,
        {
          'rounded-full': String(badgeText).length,
          ' rounded-xl': String(badgeText).length > 1
        }
      ]"
      ><p class="transition-all text-xs px-2 py-1" :class="animationClass">
        {{ displayedBadgeText }}
      </p></span
    >
    <slot></slot>
  </button>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
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
  },
  hasBadge: {
    type: Boolean,
    default: false
  },
  badgeText: {
    type: [String, Number],
    default: 0
  },
  badgeBgColor: {
    type: String,
    default: 'bg-error-light'
  },
  badgeTextColor: {
    type: String,
    default: 'text-white'
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

const badgeClass = computed(() => {
  return `${props.badgeBgColor} ${props.badgeTextColor}`
})

const displayedBadgeText = ref(props.badgeText)
const animationClass = ref('')

watch(
  () => props.badgeText,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      animationClass.value = 'opacity-0 -translate-y-1/2'

      setTimeout(() => {
        displayedBadgeText.value = newValue
        animationClass.value = 'opacity-100 '
      }, 200)
    }
  }
)
const emit = defineEmits(['click'])

const handleClick = (event) => {
  emit('click', event)
}
</script>
