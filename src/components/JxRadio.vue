<template>
  <div class="flex gap-3 m-2" :class="directionClass">
    <label
      tabindex="0"
      @blur="handleBlur"
      class="group flex items-center gap-1 cursor-pointer select-none"
      v-for="item in options"
      :key="item.value"
      :for="item.value"
      :class="[
        sizeTextClass,
        disabled || item.disabled ? ' hover:cursor-not-allowed text-gray-400' : ''
      ]"
    >
      <span
        :class="[
          innerModelValue === item.value ? activeColorClass : hoverColorClass,
          sizeBorderClass
        ]"
        class="relative block border rounded-full transition-all duration-300"
      >
        <span
          :class="[innerModelValue === item.value ? 'block' : 'hidden', sizeInnerClass]"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full"
        ></span>
      </span>
      <input
        type="radio"
        :id="item.value"
        :value="item.value"
        v-model="innerModelValue"
        class="hidden"
        :disabled="disabled || item.disabled"
        :checked="item.value === innerModelValue"
        :name="name"
      />
      {{ item.label }}
    </label>
  </div>
  <div v-if="errors.length" class="flex items-center ml-2 mt-1">
    <JxIcon class="mr-1" :size="20" :weight="300" :grade="-25" color="text-error-light"
      >info</JxIcon
    >
    <p class="text-error-light text-sm">
      {{ errors[0] }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import JxIcon from '@/components/JxIcon.vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: String,
    default: ''
  },
  errors: {
    type: Array,
    default: () => []
  },
  rules: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
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
      ['primary', 'secondary', 'success', 'danger', 'warning', 'info'].includes(value)
  },
  direction: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'validate'])

function handleBlur() {
  emit('validate', props.id, props.modelValue, props.rules)
}

const innerModelValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    emit('change', value)
  }
})

const directionClass = computed(() => {
  switch (props.direction) {
    case 'row':
      return 'flex-row items-center'
    case 'column':
      return 'flex-col'
  }
})
const sizeTextClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm'
    case 'md':
      return 'text-md'
    case 'lg':
      return 'text-lg'
  }
})
const sizeBorderClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-3 h-3'
    case 'md':
      return 'w-5 h-5'
    case 'lg':
      return 'w-7 h-7'
  }
})
const sizeInnerClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-1.5 h-1.5'
    case 'md':
      return 'w-2.5 h-2.5'
    case 'lg':
      return 'w-3.5 h-3.5'
  }
})
const activeColorClass = computed(() => `bg-${props.color}-light`)
const hoverColorClass = computed(() => `group-hover:border-${props.color}-light`)
</script>
