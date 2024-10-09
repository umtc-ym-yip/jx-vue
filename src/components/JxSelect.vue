<template>
  <div class="mb-3">
    <label v-if="label" :for="id" class="block mb-2 text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <select
      :id="id"
      v-model="selectValue"
      @blur="handleBlur"
      @focus="focused = true"
      :required="required"
      :disabled="disabled"
      class="block w-full px-3 py-2 text-base text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
      :class="[
        errors.length
          ? 'border-error-light focus:ring-2 focus:ring-error-light focus:ring-opacity-50'
          : focused
            ? 'border-primary-light focus:ring-2 focus:ring-primary-light focus:ring-opacity-50'
            : 'border-secondary-light',
        disabled ? 'border-secondary-light cursor-not-allowed' : ''
      ]"
    >
      <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
      <option v-for="option of options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <div v-if="errors.length" class="flex items-center mt-1">
      <!-- 顯示第一個錯誤訊息 -->
      <JxIcon class="mr-1" :size="20" :weight="300" :grade="-25" color="text-error-light"
        >info</JxIcon
      >
      <p class="text-error-light text-sm">
        {{ errors[0] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import JxIcon from './JxIcon.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  errors: {
    type: Array,
    default: () => []
  },
  rules: {
    type: [Array],
    default: () => []
  },
  options: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'validate'])

const selectValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const focused = ref(false)

const handleBlur = () => {
  focused.value = false
  emit('validate', props.id, props.modelValue, props.rules)
}
</script>
