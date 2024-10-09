export function required(value) {
  return value ? '' : '必填'
}

export function email(value) {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value) ? '' : '信箱格式錯誤'
}

export function minLength(value, length) {
  return value && value.length >= length ? '' : `最少需要 ${length} 個字符`
}
