<template>
  <slot>
    <div class="relative">
      <ul class="flex list-none border-b border-gray-200" :class="listClass">
        <li
          v-for="(item, index) in data"
          :key="item.key"
          :class="[
            'cursor-pointer transition-all duration-300 ease-in-out',
            activeIndex === index ? activeClass : inactiveClass,
            itemClass
          ]"
          @click="clickHandle(item, index)"
          :ref="
            (el) => {
              if (el) tabRefs[index] = el
            }
          "
        >
          <p class="px-4 py-2 font-bold">{{ item.label }}</p>
        </li>
      </ul>
      <div
        class="absolute bottom-0 h-0.5 transition-all duration-300 ease-in-out"
        :class="underlineClass"
        :style="underlineStyle"
      ></div>
    </div>
  </slot>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  listClass: {
    type: String,
    default: ''
  },
  itemClass: {
    type: String,
    default: ''
  },
  activeClass: {
    type: String,
    default: 'text-primary'
  },
  inactiveClass: {
    type: String,
    default: 'text-gray-500 hover:text-gray-700'
  },
  underlineClass: {
    type: String,
    default: 'bg-primary'
  }
})

const activeIndex = ref(0)
const tabRefs = ref([])

const emit = defineEmits(['click'])

function clickHandle(item, index) {
  emit('click', { ...item, index })
  activeIndex.value = index
}

const underlineStyle = computed(() => {
  if (tabRefs.value.length === 0) return
  if (activeIndex.value === 0) {
    const activeTab = tabRefs.value[activeIndex.value]
    if (!activeTab) return
    const { width } = activeTab.getBoundingClientRect()
    return {
      width: `${width}px`,
      left: '0px'
    }
  } else {
    const lastTab = tabRefs.value[activeIndex.value - 1]
    const activeTab = tabRefs.value[activeIndex.value]
    if (!lastTab) return

    const accWidth = tabRefs.value.reduce((acc, cur, index) => {
      if (index < activeIndex.value) {
        return acc + cur.getBoundingClientRect().width
      }
      return acc
    }, 0)

    const { width } = activeTab.getBoundingClientRect()
    return {
      width: `${width}px`,
      left: `${accWidth}px`
    }
  }
})
</script>
