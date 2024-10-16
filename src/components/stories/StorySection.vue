<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-8">
    <h3 class="text-xl font-bold mb-6 text-gray-800 border-b pb-2">{{ title }}</h3>

    <div v-if="$slots.description" class="mb-4 bg-gray-50 p-4 rounded-md border border-gray-200">
      <div class="flex items-center gap-2 mb-2">
        <JxIcon color="text-gray-700" size="20" weight="400" grade="100">flare</JxIcon>
        <h4 class="text-lg font-semibold text-gray-700">描述</h4>
      </div>
      <p class="text-gray-700">
        <slot name="description"></slot>
      </p>
    </div>

    <div v-if="$slots.usage" class="mb-4 bg-gray-50 p-4 rounded-md border border-gray-200">
      <div class="flex items-center gap-2 mb-2">
        <JxIcon color="text-gray-700" size="20" weight="400" grade="100">mystery</JxIcon>
        <h4 class="text-lg font-semibold text-gray-700">使用方法</h4>
      </div>
      <p class="text-gray-700">
        <slot name="usage"></slot>
      </p>
    </div>

    <div v-if="$slots.props" class="mb-4 bg-gray-50 p-4 rounded-md border border-gray-200">
      <div class="flex items-center gap-2 mb-2">
        <JxIcon color="text-gray-700" size="20" weight="400" grade="100"
          >format_list_bulleted</JxIcon
        >
        <h4 class="text-lg font-semibold text-gray-700">屬性</h4>
      </div>
      <slot name="props"></slot>
    </div>

    <div v-if="$slots.code" class="mb-4 bg-gray-50 p-2 rounded-md border border-gray-200">
      <div class="bg-gray-800 text-white rounded-lg overflow-x-auto p-4">
        <code ref="codeBlock" class="hljs language-html whitespace-pre-wrap">
          <slot name="code"></slot>
        </code>
      </div>
    </div>
    <!-- <div v-if="$slots.code" class="mb-4 bg-gray-800 p-2 rounded-md">
      <pre class="m-0"><code v-code:[codeLanguage]><slot name="code"></slot></code></pre>
    </div> -->

    <div v-if="$slots.notes" class="mb-4 bg-gray-50 p-4 rounded-md border border-gray-200">
      <div class="flex items-center gap-2 mb-2">
        <JxIcon color="text-gray-700" size="20" weight="400" grade="100">privacy_tip</JxIcon>
        <h4 class="text-lg font-semibold text-gray-700">注意事項</h4>
      </div>
      <p class="text-gray-700 mb-0">
        <slot name="notes"></slot>
      </p>
    </div>

    <div v-if="$slots.default" class="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
      <div class="flex items-center gap-2 mb-2">
        <JxIcon color="text-gray-700" size="20" weight="400" grade="100"
          >approval_delegation</JxIcon
        >
        <h4 class="text-lg font-semibold text-gray-700">範例</h4>
      </div>
      <div class="space-y-4">
        <slot name="default"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, useSlots } from 'vue'
import JxIcon from '@/components/JxIcon.vue'
import hljs from 'highlight.js/lib/core'

defineProps({
  title: {
    type: String,
    required: true
  }
})
const codeBlock = ref(null)
const slots = useSlots()
const highlightCode = () => {
  if (slots.code && codeBlock.value) {
    const codeContent = slots
      .code()
      .map((node) => node.children)
      .join('')
      .trim()
    codeBlock.value.textContent = codeContent
    hljs.highlightElement(codeBlock.value)
  }
}

onMounted(() => {
  highlightCode()
})

watch(
  () => slots.code,
  () => {
    highlightCode()
  },
  { immediate: true }
)
</script>
