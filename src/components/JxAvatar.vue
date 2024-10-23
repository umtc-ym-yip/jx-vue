<template>
  <div
    ref="avatarRef"
    class="flex items-center justify-center w-10 h-10 bg-secondary-light rounded-full cursor-pointer relative"
    @click="toggleShow"
  >
    <p v-if="displayName" :class="textClass" class="select-none">{{ displayName }}</p>
    <JxIcon
      v-else
      class="text-3xl select-none"
      fill="0.1"
      weight="200"
      grade="150"
      size="32"
      color="white"
      >face_6</JxIcon
    >
    <slot
      name="nav"
      :isShow="isShowLocal"
      :toggleShow="toggleShow"
      :navDirectionClass="navDirectionClass"
    >
      <nav
        v-show="isShowLocal"
        class="absolute top-3/4 mt-3 transition-opacity duration-300"
        :class="[{ 'opacity-0': !isShowLocal, 'opacity-100': isShowLocal }, navDirectionClass]"
      >
        <ul class="bg-white rounded-md w-32 py-2 shadow-md select-none">
          <li class="px-4 py-2 hover:bg-gray-100 text-center">基本資料</li>
          <li class="px-4 py-2 hover:bg-gray-100 text-center">帳號設定</li>
          <li class="px-4 py-2 hover:bg-gray-100 text-center">登出</li>
        </ul>
      </nav>
    </slot>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import JxIcon from './JxIcon.vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  method: {
    type: String,
    default: 'first', // 'truncate 截斷','shrink 縮小','initials 首字母'
    validator: (value) => ['first', 'shrink', 'initials'].includes(value)
  },
  maxLength: {
    type: Number,
    default: 4
  },
  isShow: {
    type: Boolean,
    default: false
  },
  navDirection: {
    type: String,
    default: 'right',
    validator: (value) => ['right', 'left'].includes(value)
  }
})

const emit = defineEmits(['update:isShow'])

const avatarRef = ref(null)

const displayName = computed(() => {
  if (props.method === 'first') {
    return props.name.length > props.maxLength ? props.name.slice(0, 1) : props.name
  } else if (props.method === 'shrink') {
    return props.name
  } else if (props.method === 'initials') {
    return props.name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
  }
})

const textClass = computed(() => {
  const baseClasses = 'text-white text-center font-bold'
  if (props.method === 'shrink') {
    return `${baseClasses} text-[0.5rem] leading-tight`
  } else {
    return `${baseClasses} text-sm`
  }
})

const isShowLocal = computed({
  get: () => props.isShow,
  set: (value) => emit('update:isShow', value)
})

const navDirectionClass = computed(() => {
  return props.navDirection === 'right' ? 'right-2/3' : 'left-2/3'
})

function toggleShow() {
  isShowLocal.value = !isShowLocal.value
}

function handleClickOutside(event) {
  if (avatarRef.value && !avatarRef.value.contains(event.target) && props.isShow) {
    emit('update:isShow', false)
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
