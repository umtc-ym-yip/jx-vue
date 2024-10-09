export const colorArray = [
  '#CC3333',
  '#00BB00',
  '#663366',
  '#CCCC99',
  '#666666',
  '#ff7f50',
  '#FF6666',
  '#0066CC',
  '#333333',
  '#336633',
  '#990033',
  '#CC9966',
  '#d2691e',
  '#FF0033',
  '#408080',
  '#003399',
  '#99CC00',
  '#999933',
  '#333300',
  '#CCFF99',
  '#99CCFF',
  '#FF9966',
  '#336699',
  '#CCCC33',
  '#996600',
  '#FFCC33',
  '#336666',
  '#0099CC',
  '#FFCC00',
  '#CC6699',
  '#3366CC',
  '#009966',
  '#FF6600',
  '#FFFF66',
  '#99CC99',
  '#FFFF99',
  '#CC0033',
  '#993333',
  '#FFFF00',
  '#FF9900',
  '#FFFF00',
  '#FF9933',
  '#FFCC99'
]

// 1%100->1 ,101%100->1 ,201%100->1 循環使用
export function getColor(index) {
  return colorArray[index % colorArray.length]
}

// 根據series生成顏色，如果seriesColors已經有顏色，則使用已有的顏色，反之則用getColor生成顏色
export function getColorBySeries(uniqueSeries, seriesColors = {}) {
  return uniqueSeries.map((series, index) => {
    return seriesColors[series] || getColor(index)
  })
}
