<template></template>
<script setup>
import Swal from 'sweetalert2'
import { computed, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: '',
    validator: (value) => ['success', 'error', 'warning', 'info', 'question'].includes(value)
  },
  showCloseButton: {
    type: Boolean,
    default: false
  },
  showConfirmButton: {
    type: Boolean,
    default: true
  },
  confirmButtonText: {
    type: String,
    default: '确定'
  },
  showCancelButton: {
    type: Boolean,
    default: false
  },
  cancelButtonText: {
    type: String,
    default: '取消'
  },
  footer: {
    type: String,
    default: ''
  },
  html: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:show', 'confirm', 'cancel'])

const innerShow = computed({
  get() {
    return props.show
  },
  set(newVal) {
    emit('update:show', newVal)
  }
})

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      Swal.fire({
        title: props.title,
        text: props.text,
        icon: props.icon,
        showCloseButton: props.showCloseButton,
        showConfirmButton: props.showConfirmButton,
        confirmButtonText: props.confirmButtonText,
        showCancelButton: props.showCancelButton,
        cancelButtonText: props.cancelButtonText,
        footer: props.footer,
        html: props.html
      }).then((result) => {
        if (result.isConfirmed) {
          emit('confirm')
        } else if (result.isDismissed) {
          emit('cancel')
        }
        innerShow.value = false
      })
    }
  }
)
</script>
