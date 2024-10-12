export const colorArray = [
  '#808080',
  '#E0E0C3',
  '#A3A3A3',
  '#90EE90',
  '#F08080',
  '#B19CD9',
  '#FFA07A',
  '#FFA8A8',
  '#87CEFA',
  '#8FBC8F',
  '#DB7093',
  '#DEB887',
  '#E9967A',
  '#FF6B6B',
  '#8FD8D8',
  '#6495ED',
  '#BDE76A',
  '#D4D4AA',
  '#A0A060',
  '#E6FFB3',
  '#B0E2FF',
  '#FFBB99',
  '#87CEEB',
  '#E6E68A',
  '#D2B48C',
  '#FFD700',
  '#9ACD32',
  '#66CDAA',
  '#FFE4B5',
  '#DDA0DD',
  '#87CEFA',
  '#98FB98',
  '#FFA07A',
  '#FFFACD',
  '#C1FFC1',
  '#FAFAD2',
  '#FF9999',
  '#CD8C95',
  '#FFFFE0',
  '#FFDAB9',
  '#FFFACD',
  '#FFD1A8',
  '#FFE4B5'
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
