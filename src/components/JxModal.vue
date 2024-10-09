<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      @click.self="closeModal"
      class="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center z-50"
      :class="isbackgroundShow"
    >
      <div
        class="flex flex-col"
        :class="[
          modalClasses,
          'bg-white rounded-lg shadow-xl transform transition-all duration-300 ease-out',
          {
            'opacity-0 scale-95 translate-y-4': !isActive,
            'opacity-100 scale-100 translate-y-0': isActive
          }
        ]"
      >
        <!-- Header -->
        <div v-if="showHeader" class="px-6 py-4 bg-gray-100 flex items-center justify-between">
          <h3 v-if="title" class="text-lg font-semibold text-gray-800">{{ title }}</h3>
          <div v-else class="flex-grow"></div>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 p-6 overflow-y-auto">
          <slot></slot>
        </div>

        <!-- Footer -->
        <div v-if="showFooter" class="px-6 py-4 bg-gray-100 flex justify-end space-x-2">
          <button
            @click="cancel"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none transition duration-150 ease-in-out"
          >
            {{ cancelText }}
          </button>
          <button
            @click="confirm"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none transition duration-150 ease-in-out"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  title: { type: String, default: '' },
  showFooter: { type: Boolean, default: true },
  cancelText: { type: String, default: 'Cancel' },
  confirmText: { type: String, default: 'OK' },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'fullscreen'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const showHeader = computed(() => props.title !== '' || true)
const isActive = ref(false)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      // 背景出現後100ms，再讓modal出現
      setTimeout(() => {
        isActive.value = true
      }, 100)
    } else {
      isActive.value = false
    }
  }
)

const modalClasses = computed(() => {
  const baseClasses = 'max-h-[90vh] overflow-hidden flex flex-col'
  switch (props.size) {
    case 'small':
      return `${baseClasses} w-1/3`
    case 'large':
      return `${baseClasses} w-3/4`
    case 'fullscreen':
      return 'w-full h-full'
    default:
      return `${baseClasses} w-1/2`
  }
})

const isbackgroundShow = computed(() => {
  return props.size !== 'fullscreen'
    ? 'bg-black bg-opacity-50 transition-opacity duration-300 ease-out'
    : ''
})

function closeModal() {
  isActive.value = false
  //   待modal 300ms消失後，再讓背景執行tailwind的transition-opacity
  setTimeout(() => {
    // 使用v-model可以讓內部控制modal，外部控制modal背景
    emit('update:modelValue', false)
  }, 300)
}

function cancel() {
  emit('cancel')
  closeModal()
}

function confirm() {
  emit('confirm')
  closeModal()
}
</script>
