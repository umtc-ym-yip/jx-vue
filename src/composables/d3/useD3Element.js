import * as d3 from 'd3'
import { getColorBySeries } from '../../utils/d3/colorUtils.js'
import { useD3Alarm } from './useD3Alarm.js'

export function useD3Element(context) {
  const { width, height, margin, data, xKey, yKey, xType, seriesKey } = context.props
  let colorScale

  function createColorScale() {
    if (seriesKey) {
      const uniqueSeries = [...new Set(data.map((d) => d[seriesKey]))]
      colorScale = d3.scaleOrdinal().domain(uniqueSeries).range(getColorBySeries(uniqueSeries))
    }
  }

  function drawPoints(options = {}) {
    const {
      innerContent,
      xScale,
      yScale,
      ucl,
      lcl,
      pointSize = 3,
      onMouseOver,
      onMouseOut,
      onClick,
      pointShape = 'circle',
      transitionDuration = 300,
      keyFn = (d) => d[xKey]
    } = options

    if (!innerContent || !xScale || !yScale) {
      console.error('Missing required parameters for drawPoints')
      return
    }

    if (seriesKey) {
      createColorScale()
    }
    innerContent.selectAll(`.point-${seriesKey}`).remove()
    const points = innerContent.selectAll(`.point-${seriesKey}`).data(data, keyFn)

    // Enter + Update
    points
      .enter()
      .append('circle')
      .attr('class', `point-${seriesKey}`)
      .attr('r', 0)
      .filter((d) => xScale(d[xKey]) !== undefined && yScale(d[yKey]) !== undefined)
      // .transition()
      // .duration(transitionDuration)
      .attr('cx', (d) =>
        isNaN(xScale(d[xKey]))
          ? null
          : xType === 'band'
            ? xScale(d[xKey]) + xScale.bandwidth() / 2
            : xScale(d[xKey])
      )
      .attr('cy', (d) => yScale(d[yKey]))
      .attr('r', pointSize)
      .attr('fill', (d) => {
        if (seriesKey) {
          return colorScale(d[seriesKey])
        }
        const y = d[yKey]
        if ((ucl && y > Number(ucl)) || (lcl && y < Number(lcl))) {
          return 'red'
        }
        return 'steelblue'
      })
      .attr('stroke', 'white')
      .attr('stroke-width', 1)
      .on('mouseover', function (event, d) {
        if (onMouseOver) onMouseOver(event, d, this)
      })
      .on('mouseout', function (event, d) {
        if (onMouseOut) onMouseOut(event, d, this)
      })
      .on('click', onClick)
    // .attr('role', 'img')
    // .attr('aria-label', (d) => `Point at x: ${d[xKey]}, y: ${d[yKey]}`)
  }
  function drawThresholds({ innerContent, yScale, slots }) {
    const thresholdSlots = slots.thresholds?.()
    if (!thresholdSlots) return
    innerContent.selectAll('.threshold,.threshold-text').remove()

    thresholdSlots.forEach((slot) => {
      const threshold = slot.props
      if (!threshold || !threshold.value) return

      const y = yScale(threshold.value)

      innerContent
        .append('line')
        .attr('class', 'threshold')
        .attr('x1', margin.left)
        .attr('x2', width - margin.right)
        .attr('y1', y)
        .attr('y2', y)
        .attr('stroke', threshold.color || 'red')
        .attr('stroke-dasharray', threshold.strokeType === 'dashed' ? '5,5' : 'none')
        .attr('stroke-width', 1)

      if (threshold.label) {
        innerContent
          .append('text')
          .attr('class', 'threshold-text')
          .attr('x', margin.left * 3)
          .attr('y', y - 5)
          .attr('font-size', '14px')
          .attr('text-anchor', 'end')
          .attr('font-weight', 'bold')
          .style('user-select', 'none')
          .attr('fill', threshold.color || 'red')
          .text(threshold.label)
      }
    })
  }
  function drawLine({ innerContent, xScale, yScale }) {
    innerContent.selectAll(`.line-${seriesKey}`).remove()
    const lineGenerator = d3
      .line()
      .x((d) => {
        return xType === 'band' ? xScale(d[xKey]) + xScale.bandwidth() / 2 : xScale(d[xKey])
      })
      .y((d) => yScale(d[yKey]))
      .defined((d) => {
        return xScale(d[xKey]) !== undefined && yScale(d[yKey]) !== undefined
      })

    // Draw line
    // 如果有不同的seriesKey，則繪製不同的line
    if (seriesKey) {
      createColorScale()
      const uniqueSeries = [...new Set(data.map((d) => d[seriesKey]))]
      uniqueSeries.forEach((item) => {
        innerContent
          .append('path')
          .datum(data.filter((d) => d[seriesKey] === item))
          .attr('class', `line-${seriesKey}`)
          .attr('fill', 'none')
          .attr('stroke', colorScale(item))
          .attr('stroke-width', 1.5)
          .attr('d', lineGenerator)
      })
    }
  }
  function drawLegend(options = {}) {
    const { svg, onRectMouseOver, onRectMouseOut, onTextMouseOver, onTextMouseOut, onClick } =
      options
    if (!seriesKey) return
    createColorScale()
    const uniqueSeries = [...new Set(data.map((d) => d[seriesKey]))]
    const rectSize = 10
    const rectFirstLoc = 80
    const textPadding = 5
    const itemSpacing = 30
    const fontSize = 16

    const rectSavedAry = [] ///儲存每個字串加上rect寬度加上文字padding
    const rectSaveSumXAry = []
    const rectSaveSumYAry = []

    // 計算每個 legend 項的寬度
    uniqueSeries.forEach((series) => {
      const tempText = svg.append('text').style('font-size', `${fontSize}px`)
      const curTextWidth = tempText.text(series).node().getComputedTextLength()
      tempText.remove()
      rectSavedAry.push(curTextWidth + rectSize + textPadding)
    })

    // 計算 legend 的位置
    let maxY = 0
    const legendItems = uniqueSeries.map((series, i) => {
      let x, y
      if (i === 0) {
        x = rectFirstLoc
        y = height
        rectSavedAry.push(rectFirstLoc)
        rectSaveSumYAry.push(y)
      } else {
        const prevX = rectSaveSumXAry[i - 1]
        const prevWidth = rectSavedAry[i - 1]
        const newX = prevX + prevWidth + itemSpacing

        if (newX + rectSavedAry[i] >= width) {
          // 換行
          x = rectFirstLoc
          y = rectSaveSumYAry[rectSaveSumYAry.length - 1] + fontSize + textPadding
          rectSaveSumYAry.push(y)
        } else {
          x = newX
          y = rectSaveSumYAry[rectSaveSumYAry.length - 1]
        }
      }
      rectSaveSumXAry.push(x)
      maxY = Math.max(maxY, y)

      return { [seriesKey]: series, x, y }
    })

    const newHeight = maxY + fontSize + textPadding
    svg.attr('height', newHeight)

    // 繪製 legend
    const legend = svg.append('g').attr('class', 'legend')

    const tagWrap = legend
      .selectAll('.tags-legend')
      .data(legendItems.filter((item) => item[seriesKey] !== ''))
      .enter()
      .append('g')
      .attr('class', 'tags-legend')

    tagWrap
      .append('rect')
      .attr('class', `tags-legend-rect-${seriesKey}`)
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('width', rectSize)
      .attr('height', rectSize)
      .attr('fill', (d) => colorScale(d[seriesKey]))
      .attr('cursor', 'pointer')
      .on('mouseover', function (event, d) {
        if (onRectMouseOver) onRectMouseOver(event, d, this)
      })
      .on('mouseout', function (event, d) {
        if (onRectMouseOut) onRectMouseOut(event, d, this)
      })
      .on('click', onClick)

    tagWrap
      .append('text')
      .attr('class', `tags-legend-text-${seriesKey}`)
      .attr('x', (d) => d.x + rectSize + textPadding)
      .attr('y', (d) => d.y + rectSize)
      .attr('fill', 'black')
      .style('font-size', `${fontSize}px`)
      .style('user-select', 'none')
      .text((d) => d[seriesKey])
      .attr('cursor', 'pointer')
      .on('mouseover', function (event, d) {
        if (onTextMouseOver) onTextMouseOver(event, d, this)
      })
      .on('mouseout', function (event, d) {
        if (onTextMouseOut) onTextMouseOut(event, d, this)
      })
      .on('click', onClick)
  }
  return {
    drawPoints,
    drawThresholds,
    drawLine,
    drawLegend
  }
}
