<template>
  <div :class="[paddingClass, marginClass, roundedClass, bgColorClass, borderClass]">
    <slot></slot>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { isValidClass } from '@/utils/prefix/validClass.js'

const props = defineProps({
  padding: {
    type: [String, Number],
    default: ''
  },
  margin: {
    type: [String, Number],
    default: ''
  },
  rounded: {
    type: [String, Number],
    default: 'none'
  },
  bgColor: {
    type: String,
    default: 'white'
  },
  hasBorder: {
    type: Boolean,
    default: false
  },
  borderColor: {
    type: String,
    default: 'gray-300'
  },
  borderWidth: {
    type: [String, Number],
    default: ''
  }

  //   borderColor: {
  //     type: String,
  //     default: 'gray-300'
  //   },
  //   borderWidth: {
  //     type: String,
  //     default: '1'
  //   }
})

const paddingClass = computed(() => {
  if (props.padding) {
    if (typeof props.padding === 'string') {
      if (!isNaN(Number(props.padding))) {
        return `p-${props.padding}`
      }
      //驗證padding class ex.'px-4 py-4'
      if (isValidClass('padding', props.padding)) {
        return props.padding
      } else {
        console.warn(`Invalid padding class: ${props.padding}. Using default 'p-4'.`)
        return `p-4`
      }
    }
    //數字
    return `p-${props.padding}`
  }
  return `p-4`
})
const marginClass = computed(() => {
  if (props.margin) {
    if (typeof props.margin === 'string') {
      //純文字的數字
      if (!isNaN(Number(props.margin))) {
        return `m-${props.margin}`
      }
      //驗證margin class ex.'mx-4 my-4'
      if (isValidClass('margin', props.margin)) {
        return props.margin
      } else {
        console.warn(`Invalid margin class: ${props.margin}. Using default 'my-2'.`)
        return 'my-2'
      }
    }
    //數字
    return `m-${props.margin}`
  }
  //   預設
  return 'my-2'
})
const roundedClass = computed(() => {
  return `rounded-${props.rounded}`
})
const bgColorClass = computed(() => {
  return `bg-${props.bgColor}`
})
const borderClass = computed(() => {
  if (props.hasBorder) {
    return `border${props.borderWidth ? `-${props.borderWidth}` : ''} border-${props.borderColor} `
  }
  return ''
})
</script>
