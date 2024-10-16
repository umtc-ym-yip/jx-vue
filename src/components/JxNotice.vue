<template>
  <Transition
    enter-active-class="transition-all duration-200 ease-out"
    enter-from-class="opacity-0 translate-y-6"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-6"
  >
    <div
      v-if="isVisible"
      :class="[
        isBanner ? 'w-full' : width,
        noticeClass,
        positionClass,
        customClass,
        isBanner ? 'm-0' : 'm-4',
        'flex p-4 rounded-md absolute'
      ]"
      :style="offsetStyle"
    >
      <div class="mr-4 flex" v-if="hasIcon && iconName">
        <JxIcon v-bind="iconProps">
          {{ iconName }}
        </JxIcon>
      </div>
      <div class="flex flex-col">
        <h3 :class="titleClass" v-if="title && hasTitle" class="mb-4 font-bold">{{ title }}</h3>
        <p :class="messageClass" v-if="message && hasMessage" class="leading-6 font-medium">
          {{ message }}
        </p>
      </div>
      <div v-if="showClose" class="ml-auto">
        <JxIcon
          class="cursor-pointer text-secondary hover:text-secondary-dark"
          fill="0"
          weight="300"
          @click="closeNotice"
          >close</JxIcon
        >
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import JxIcon from '@/components/JxIcon.vue'

const props = defineProps({
  width: {
    type: String,
    default: 'w-1/2'
  },
  hasTitle: {
    type: Boolean,
    default: true
  },
  hasMessage: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: 'Informational Notes'
  },
  message: {
    type: String,
    default: 'Additional description and information about copywriting.'
  },
  type: {
    type: String,
    default: 'primary'
  },
  titleColor: {
    type: String,
    default: 'secondary-dark'
  },
  titleSize: {
    type: String,
    default: ''
  },
  messageColor: {
    type: String,
    default: 'text-secondary-dark'
  },
  messageSize: {
    type: String,
    default: ''
  },
  hasIcon: {
    type: Boolean,
    default: false
  },
  iconName: {
    type: String,
    default: 'info'
  },
  iconColor: {
    type: String,
    default: undefined
  },
  iconSize: {
    type: String,
    default: undefined
  },
  iconWeight: {
    type: String,
    default: undefined
  },
  iconGrade: {
    type: String,
    default: undefined
  },
  iconFill: {
    type: String,
    default: undefined
  },
  duration: {
    type: [Number, String],
    default: 3000
  },
  position: {
    type: String,
    default: 'top-1/4'
  },
  offset: {
    type: String,
    default: ''
  },
  customClass: {
    type: String,
    default: ''
  },
  showClose: {
    type: Boolean,
    default: true
  },
  isBanner: {
    type: Boolean,
    default: false
  }
})

const noticeClass = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'bg-blue-100 opacity-100 border border-blue-500'
    case 'success':
      return 'bg-green-100 opacity-100 border border-green-500'
    case 'warning':
      return 'bg-yellow-100 opacity-100 border border-yellow-500'
    case 'error':
      return 'bg-red-100 opacity-100 border border-red-500'
  }
})
const messageClass = computed(() => {
  return ` ${props.messageColor} ${props.messageSize}`
})

const titleClass = computed(() => {
  return ` text-${props.titleColor} ${props.titleSize}`
})

const positionClass = computed(() => {
  if (props.isBanner) {
    return 'top-0 left-0 right-0'
  }

  const [vertical, horizontal] = props.position.split('-')
  let classes = []

  if (vertical === 'top') classes.push('top-0')
  if (vertical === 'bottom') classes.push('bottom-0')
  if (horizontal === 'left') classes.push('left-0')
  if (horizontal === 'right') classes.push('right-0')
  if (horizontal === '1/4') classes.push('left-1/4')
  if (horizontal === '1/3') classes.push('left-1/3')
  if (horizontal === '1/2') classes.push('left-1/2')
  if (horizontal === '2/3') classes.push('left-2/3')
  if (horizontal === '3/4') classes.push('left-3/4')
  if (horizontal === '3/5') classes.push('left-3/5')
  return classes.join(' ')
})

const offsetStyle = computed(() => {
  if (!props.offset) return {}

  const [vertical, horizontal] = props.position.split('-')
  let style = {}

  if (vertical === 'top') style.top = props.offset
  if (vertical === 'bottom') style.bottom = props.offset
  if (horizontal === 'left') style.left = props.offset
  if (horizontal === 'right') style.right = props.offset

  return style
})

const iconProps = computed(() => {
  const result = {}
  if (props.iconColor !== undefined) result.color = props.iconColor
  if (props.iconSize !== undefined) result.size = props.iconSize
  if (props.iconWeight !== undefined) result.weight = props.iconWeight
  if (props.iconGrade !== undefined) result.grade = props.iconGrade
  if (props.iconFill !== undefined) result.fill = props.iconFill
  return result
})

const isVisible = ref(false)
const durationTimer = ref(null)

onMounted(() => {
  isVisible.value = true

  if (props.duration > 0) {
    durationTimer.value = setTimeout(() => {
      closeNotice()
    }, Number(props.duration))
  }
})

const emit = defineEmits(['close'])

function closeNotice() {
  isVisible.value = false

  //   要等過渡效果執行完後，再emit讓這個組件消失
  setTimeout(() => {
    emit('close')
  }, 300)
}

onBeforeUnmount(() => {
  if (durationTimer.value) {
    clearTimeout(durationTimer.value)
  }
})
</script>
