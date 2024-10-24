<template>
  <div
    v-show="isShow"
    class="fixed w-10 h-10 flex items-center justify-center rounded-full bg-secondary-light hover:bg-secondary opacity-80 shadow-md bottom-20 right-6 cursor-pointer select-none"
    @click="scrollTop"
  >
    <JxIcon class="text-white" weight="200" grade="150" size="24" color="gray"
      >arrow_upward_alt</JxIcon
    >
  </div>
</template>
<script setup>
import { ref, watch, onUnmounted } from 'vue'
import JxIcon from './JxIcon.vue'

const props = defineProps({
  scrollableRef: {
    type: [Object, null],
    required: true
  }
})

const isShow = ref(false)
const scrollElement = ref(null)

const scrollTop = () => {
  isShow.value = false
  if (scrollElement.value) {
    scrollElement.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function handleScrollY() {
  if (scrollElement.value) {
    isShow.value = scrollElement.value.scrollTop > 100
  }
}

watch(
  () => props.scrollableRef,
  (newRef) => {
    if (newRef) {
      scrollElement.value = newRef
      scrollElement.value.addEventListener('scroll', handleScrollY)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  scrollElement.value.removeEventListener('scroll', handleScrollY)
})
</script>
