<template>
    <div class="flex items-center gap-4">
      <label
        v-for="item in items"
        :key="item.value"
        class="flex items-center gap-2 transition duration-200"
        :class="getLabelClasses(item)"
      >
        <span class="relative rounded border border-opacity-10" :class="getCheckboxClasses(item)">
          <input
            type="checkbox"
            :value="item.value"
            v-model="innerModelValue"
            :disabled="item.disabled"
            class="hidden"
            :aria-label="item.label"
          />

          <span v-if="isChecked(item)" class="absolute top-1/2 left-1/2">
            <svg
              class="w-3 h-3 fill-current -translate-x-1/2 -translate-y-1/2"
              :class="iconClass"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          </span>
        </span>
        <span :class="{ 'text-gray-500': item.disabled }">{{ item.label }}</span>
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
import JxIcon from './JxIcon.vue';

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
    default: () => []
  },
  items: {
    type: Array,
    required: true,
    default: () => [],
    validator: (value) => value.every((item) => 'value' in item && 'label' in item)
  },
  size: {
    type: String,
    default: 'w-4 h-4'
  },
  bgColor: {
    type: String,
    default: 'bg-primary'
  },
  iconColor: {
    type: String,
    default: 'text-white'
  },
  borderColor: {
    type: String,
    default: 'border-black'
  },
  errors: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const innerModelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const hasErrors = computed(() => props.errors.length > 0)

const iconClass = computed(() => props.iconColor)

const isChecked = (item) => innerModelValue.value.includes(item.value) && !item.disabled

const getLabelClasses = (item) => ({
  'cursor-pointer hover:opacity-80': !item.disabled,
  'opacity-50 cursor-not-allowed': item.disabled
})

const getCheckboxClasses = (item) => [
  props.size,
  isChecked(item) ? [props.bgColor, props.borderColor] : '',
  item.disabled ? 'bg-gray-200 border-gray-300' : '',
  hasErrors.value ? 'border-red-500' : ''
]
</script>
