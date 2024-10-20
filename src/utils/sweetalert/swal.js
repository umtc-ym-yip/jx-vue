import { ref } from 'vue'

const defaultConfig = {
  show: false,
  title: '',
  text: '',
  icon: 'success',
  showCloseButton: true,
  showConfirmButton: true,
  confirmButtonText: '確認',
  showCancelButton: false,
  cancelButtonText: '取消',
  footer: '',
  html: ''
}

const alertConfig = ref({ ...defaultConfig })

const alertPresets = {
  success: { title: '成功', icon: 'success' },
  error: { title: '失敗', icon: 'error' },
  warning: { title: '警告', icon: 'warning' },
  info: { title: '提示', icon: 'info' }
}

function showAlert(preset, text, customConfig = {}) {
  const presetConfig = alertPresets[preset]

  // 首先重置为默认配置
  Object.assign(alertConfig.value, defaultConfig)

  // 然后应用新的配置
  Object.assign(alertConfig.value, {
    show: true,
    ...presetConfig,
    text,
    ...customConfig
  })
}

export { showAlert, alertConfig }
