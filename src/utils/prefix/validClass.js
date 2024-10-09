export const isValidClass = (type, className) => {
  let validClass = []
  if (type === 'margin') {
    validClass = ['m', 'my', 'mx', 'mt', 'mr', 'mb', 'ml']
  }
  if (type === 'padding') {
    validClass = ['p', 'py', 'px', 'pt', 'pr', 'pb', 'pl']
  }
  const parts = className.split(' ') //// ['px-1','mx-4']
  return parts.every((part) => {
    const [prefix, value] = part.split('-')
    // 字首為陣列中元素且value為數字(需要調整)
    return validClass.includes(prefix) && typeof Number(value) === 'number'
  })
}
