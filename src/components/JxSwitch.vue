<template>
  <div :class="[$slots.label ? 'flex items-center gap-2' : '']">
    <div
      class="rounded-full relative cursor-pointer transition-colors duration-300 ease-in-out"
      :class="[sizeClasses, colorClasses]"
      @click.stop="handleClick"
    >
      <input
        class="sr-only"
        type="radio"
        id="switch"
        v-model="switchValue"
        :value="switchValue === options[0].value ? options[1].value : options[0].value"
      />
      <label
        for="switch"
        class="absolute bg-white rounded-full transition-transform duration-300 ease-in-out cursor-pointer"
        :class="[labelSizeClasses, isOnPosition]"
        @click.prevent
      ></label>
    </div>
    <slot name="label"></slot>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) =>
      ['primary', 'secondary', 'error', 'warning', 'info', 'success'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'labelChange'])

const switchValue = ref(props.modelValue)

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-8 h-4'
    case 'lg':
      return 'w-14 h-7'
    default:
      return 'w-10 h-5'
  }
})

const labelSizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-3 h-3 top-0.5 left-0.5'
    case 'lg':
      return 'w-6 h-6 top-0.5 left-0.5'
    default:
      return 'w-4 h-4 top-0.5 left-0.5'
  }
})

const isOnPosition = computed(() => {
  const isOn = switchValue.value === props.options[1].value
  if (isOn) {
    switch (props.size) {
      case 'sm':
        return 'translate-x-4'
      case 'lg':
        return 'translate-x-7'
      default:
        return 'translate-x-5'
    }
  }
  return 'translate-x-0'
})

const colorClasses = computed(() => {
  const isOn = switchValue.value === props.options[1].value
  if (!isOn) {
    return 'bg-secondary-light'
  }
  switch (props.color) {
    case 'secondary':
      return 'bg-secondary'
    case 'error':
      return 'bg-error'
    case 'warning':
      return 'bg-warning'
    case 'info':
      return 'bg-info'
    case 'success':
      return 'bg-success'
    default:
      return 'bg-primary'
  }
})

const currentLabel = computed(() => {
  return props.options.find((option) => option.value === switchValue.value)?.label || ''
})

watch(
  () => props.modelValue,
  (newValue) => {
    switchValue.value = newValue
    emit('labelChange', currentLabel.value)
  }
)

function handleClick(event) {
  if (
    event.target.tagName.toLowerCase() === 'label' ||
    event.target.tagName.toLowerCase() === 'div'
  ) {
    switchClick()
  }
}

function switchClick() {
  const newValue =
    switchValue.value === props.options[0].value ? props.options[1].value : props.options[0].value

  emit('update:modelValue', newValue)
  emit('labelChange', currentLabel.value)
}
onMounted(() => {
  emit('labelChange', currentLabel.value)
})
</script>
