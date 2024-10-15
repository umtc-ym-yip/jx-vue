export function processParetoData(data, key, combineValue) {
  const uniqueItems = [...new Set(data.map((d) => d[key]))]

  const itemCounts = uniqueItems.map((item) => ({
    label: item,
    count: data.filter((d) => d[key] === item).length
  }))

  const sortedItems = itemCounts
    .sort((a, b) => b.count - a.count)
    .map((item) => ({
      ...item,
      percentage: item.count / data.length
    }))

  let cumulativePercentage = 0
  let othersIndex = -1

  const paretoItems = sortedItems.map((item, index) => {
    cumulativePercentage += item.percentage
    item.cumulativePercentage = cumulativePercentage

    if (cumulativePercentage > combineValue && othersIndex === -1) {
      othersIndex = index
    }

    return item
  })

  const significantItems = paretoItems.slice(
    0,
    // 如果Others的下一項是最後一個，則不用Others
    othersIndex !== -1 && othersIndex !== paretoItems.length - 1 ? othersIndex : paretoItems.length
  )

  if (othersIndex !== -1 && othersIndex !== paretoItems.length - 1) {
    const othersPercentage = 1 - significantItems.reduce((sum, item) => sum + item.percentage, 0)
    significantItems.push({
      label: 'Others',
      count: data.length - significantItems.reduce((sum, item) => sum + item.count, 0),
      percentage: othersPercentage,
      cumulativePercentage: 1
    })
  }

  return significantItems.length > 0
    ? significantItems
    : [
        {
          label: '無',
          count: 0,
          percentage: 0,
          cumulativePercentage: 0
        }
      ]
}
