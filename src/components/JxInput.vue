<template>
  <div class="relative mb-4">
    <label v-if="label" :for="id" class="block mb-1">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      v-model="inputValue"
      @blur="handleBlur"
      @focus="focused = true"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      v-bind="type === 'number' ? { min, max, step } : {}"
      class="w-full px-3 py-2 border rounded-md outline-none transition-all duration-200 ease-in-out"
      :class="[
        errors.length
          ? 'border-error-light focus:ring-2 focus:ring-error-light focus:ring-opacity-50'
          : 'border-secondary-light focus:border-primary-light focus:ring-2 focus:ring-primary-light focus:ring-opacity-50',
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
      ]"
    />
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
  type: {
    type: String,
    default: 'text'
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
    type: Array,
    default: () => []
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 1
  },
  step: {
    type: Number,
    default: 0.1
  }
})
const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const emit = defineEmits(['update:modelValue', 'validate'])

const focused = ref(false)

// const updateValue = (event) => {
//   const newValue = event.target.value;
//   emit('update:modelValue', newValue);
//   if (props.validateOnInput) {
//     emit('validate', props.id, newValue, props.rules);
//   }
// };

const handleBlur = (event) => {
  ///失焦時發送emit事件去驗證
  focused.value = false
  //   console.log('event.target.value', event.target.value);
  //   if (!event.target.value) {
  emit('validate', props.id, props.modelValue, props.rules)
  //   }
}
</script>
