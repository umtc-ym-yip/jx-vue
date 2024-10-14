import * as d3 from 'd3'
import { getColorBySeries } from '../../utils/d3/colorUtils.js'
import { useD3Alarm } from './useD3Alarm.js'

export function useD3Element(context) {
  const { width, height, margin, data, xKey, yKey, xType, seriesKey, seriesKeyArray } =
    context.props
  let colorScale

  if (seriesKey) {
    const uniqueSeries = [...new Set(data.map((d) => d[seriesKey]))]
    colorScale = d3.scaleOrdinal().domain(uniqueSeries).range(getColorBySeries(uniqueSeries))
  } else if (seriesKeyArray) {
    colorScale = d3.scaleOrdinal().range(getColorBySeries(seriesKeyArray))
  } else {
    colorScale = d3.scaleOrdinal().range(['steelblue'])
  }

  function drawPoints(options = {}) {
    const {
      chartType,
      innerContent,
      xScale,
      getYValue,
      ucl,
      lcl,
      pointSize = 3,
      onMouseOver,
      onMouseOut,
      onClick,
      pointShape = 'circle',
      keyFn = (d) => d[xKey]
    } = options

    if (!innerContent || !xScale || !getYValue) {
      console.error('Missing required parameters for drawPoints')
      return
    }

    innerContent.selectAll(`.point`).remove()
    const points = innerContent.selectAll(`.point`).data(data, keyFn)

    // Enter + Update
    points
      .enter()
      .append(pointShape || 'circle')
      .attr('class', (d) => `point point-${d[seriesKey]}`)
      .attr('r', 0)
      .filter((d) => xScale(d[xKey]) !== undefined && getYValue(d) !== undefined)
      .attr('cx', (d) =>
        isNaN(xScale(d[xKey]))
          ? null
          : xType === 'band'
            ? xScale(d[xKey]) + xScale.bandwidth() / 2
            : xScale(d[xKey])
      )
      .attr('cy', (d) => getYValue(d))
      .attr('r', (d) => (d[seriesKey] === '0' ? 1.5 : pointSize))
      .attr('fill', (d) => {
        if (seriesKey) {
          return d[seriesKey] === '0' ? 'gray' : colorScale(d[seriesKey])
        }
        const y = getYValue(d)
        if ((ucl && y > Number(ucl)) || (lcl && y < Number(lcl))) {
          return 'red'
        }
        return 'steelblue'
      })
      .attr('opacity', (d) => (d[seriesKey] === '0' ? 0.2 : 1))
      .attr('stroke', (d) => (d[seriesKey] === '0' || chartType === 'table-mapping' ? '' : 'white'))
      .attr('stroke-width', 1)
      .on('mouseover', function (event, d) {
        if (onMouseOver) onMouseOver(event, d, this)
      })
      .on('mouseout', function (event, d) {
        if (onMouseOut) onMouseOut(event, d, this)
      })
      .on('click', onClick)
  }
  function drawStackBars(options = {}) {
    const { innerContent, xScale, getYValue, onMouseOver, onMouseOut, onClick } = options

    innerContent.selectAll(`.bar-group`).remove()

    const stack = d3.stack().keys(seriesKeyArray)
    const layers = stack(data)

    const xScaleArray = data.map((d) => d[xKey])

    innerContent
      .append('g')
      .attr('class', `stack`)
      .selectAll('g')
      .data(layers)
      .join('g')
      .attr('class', (d) => `bar-group bar-group-${d.key}`)
      .attr('fill', (d) => colorScale(d.key))
      .selectAll('rect')
      .data((d) => d.map((value) => ({ value, key: d.key })))
      .join('rect')
      .attr('rx', 1)
      .attr('stroke', 'white')
      .attr('stroke-width', 1)
      .attr('class', (d) => `bar bar-${d.key}`)
      .attr('x', (d, i) => xScale(xScaleArray[i]))
      .attr('y', (d) => getYValue(d.value[1]))
      .attr('height', (d) => getYValue(d.value[0]) - getYValue(d.value[1]))
      .attr('width', xScale.bandwidth())
      .on('mouseover', function (event, d) {
        if (onMouseOver) onMouseOver(event, d, this)
      })
      .on('mouseout', function (event, d) {
        if (onMouseOut) onMouseOut(event, d, this)
      })
      .on('click', onClick)
  }

  function drawBars(options = {}) {
    const { innerContent, xScale, getYValue, onMouseOver, onMouseOut, onClick } = options

    innerContent.selectAll(`.bar`).remove()

    innerContent
      .selectAll('bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d[xKey]))
      .attr('y', (d) => getYValue(d[yKey]))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - getYValue(d[yKey]))
      .attr('fill', 'green')
  }
  function drawThresholds({ innerContent, getYValue, slots }) {
    const thresholdSlots = slots.thresholds?.()
    if (!thresholdSlots) return
    innerContent.selectAll('.threshold,.threshold-text').remove()

    thresholdSlots.forEach((slot) => {
      const threshold = slot.props
      if (!threshold || !threshold.value) return

      const y = getYValue(threshold.value)

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
  function drawLine({ innerContent, xScale, getYValue }) {
    innerContent.selectAll(`.line`).remove()
    const lineGenerator = d3
      .line()
      .x((d) => xType === 'band' ? xScale(d[xKey]) + xScale.bandwidth() / 2 : xScale(d[xKey]))
      .y((d) =>getYValue(d))
      .defined((d) => xScale(d[xKey]) !== undefined && getYValue(d) !== undefined)

    // Draw line
    // 如果有不同的seriesKey，則繪製不同的line
    if (seriesKey) {
    
      const uniqueSeries = [...new Set(data.map((d) => d[seriesKey]))]
      uniqueSeries.forEach((item) => {
        innerContent
          .append('path')
          .datum(data.filter((d) => d[seriesKey] === item))
          .attr('class', (d) => `line line-${d[seriesKey]}`)
          .attr('fill', 'none')
          .attr('stroke', colorScale(item))
          .attr('stroke-width', 1.5)
          .attr('d', lineGenerator)
      })
    } else {

      innerContent
        .append('path')
        .datum(data)
        .attr('class', `line`)
        .attr('fill', 'none')
        .attr('stroke', colorScale())
        .attr('stroke-width', 2)
        .attr('d', lineGenerator)
    }
  }

  function calculateLegendLayout(svg, series, width, height, options = {}) {
    const {
      legendRectSize = 10,
      firstLegendX = 80,
      textRectSpacing = 5,
      legendItemSpacing = 30,
      legendFontSize = 16
    } = options

    const legendItemWidths = []
    const legendItemXPositions = []
    const legendRowYPositions = []

    // 计算每个 legend 项的宽度
    series.forEach((item) => {
      const tempText = svg.append('text').style('font-size', `${legendFontSize}px`)
      const textWidth = tempText.text(item).node().getComputedTextLength()
      tempText.remove()
      legendItemWidths.push(textWidth + legendRectSize + textRectSpacing)
    })

    const maxLegendItemWidth = Math.max(...legendItemWidths)

    // 计算 legend 的位置
    let maxYPosition = 0
    const legendItems = series.map((item, index) => {
      let xPosition, yPosition
      if (index === 0) {
        xPosition = firstLegendX
        yPosition = height
        legendItemWidths.push(firstLegendX)
        legendRowYPositions.push(yPosition)
      } else {
        const prevXPosition = legendItemXPositions[index - 1]
        const newXPosition = prevXPosition + maxLegendItemWidth + legendItemSpacing

        if (newXPosition + legendItemWidths[index] + legendFontSize + textRectSpacing >= width) {
          // 换行
          xPosition = firstLegendX
          yPosition =
            legendRowYPositions[legendRowYPositions.length - 1] + legendFontSize + textRectSpacing
          legendRowYPositions.push(yPosition)
        } else {
          xPosition = newXPosition
          yPosition = legendRowYPositions[legendRowYPositions.length - 1]
        }
      }
      legendItemXPositions.push(xPosition)
      maxYPosition = Math.max(maxYPosition, yPosition)

      return { [seriesKey ? seriesKey : 'key']: item, x: xPosition, y: yPosition }
    })

    const newHeight = maxYPosition + legendFontSize + textRectSpacing

    return {
      legendItems,
      newHeight,
      legendRectSize,
      textRectSpacing,
      legendFontSize
    }
  }

  function drawLegend(options = {}) {
    const { svg, onRectMouseOver, onRectMouseOut, onTextMouseOver, onTextMouseOut, onClick } =
      options
    if (!seriesKey) return

    const uniqueSeries = [...new Set(data.map((d) => d[seriesKey]))]

    const { legendItems, newHeight, legendRectSize, textRectSpacing, legendFontSize } =
      calculateLegendLayout(svg, uniqueSeries, width, height)

    svg.attr('height', newHeight)

    // 绘制 legend
    const legend = svg.append('g').attr('class', 'legend')

    const tagWrap = legend
      .selectAll('.tags-legend')
      .data(legendItems.filter((item) => item[seriesKey] !== ''))
      .enter()
      .append('g')
      .attr('class', 'tags-legend')

    tagWrap
      .append('rect')
      .attr('class', (d) => `tags-legend-rect tags-legend-rect-${d[seriesKey]}`)
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .attr('fill', (d) => (d[seriesKey] === '0' ? 'gray' : colorScale(d[seriesKey])))
      .attr('cursor', 'pointer')
      .attr('rx', 2)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .on('mouseover', function (event, d) {
        if (onRectMouseOver) onRectMouseOver(event, d, this)
      })
      .on('mouseout', function (event, d) {
        if (onRectMouseOut) onRectMouseOut(event, d, this)
      })
      .on('click', onClick)

    tagWrap
      .append('text')
      .attr('class', (d) => `tags-legend-text tags-legend-text-${d[seriesKey]}`)
      .attr('x', (d) => d.x + legendRectSize + textRectSpacing)
      .attr('y', (d) => d.y + legendRectSize / 2)
      .attr('fill', 'black')
      .style('font-size', `${legendFontSize}px`)
      .style('user-select', 'none')
      .style('dominant-baseline', 'middle')
      .text((d) => d[seriesKey])
      .attr('cursor', 'pointer')
      .on('mouseover', function (event, d) {
        d3.select(this).transition().duration(200).style('font-weight', 'bold')
        if (onTextMouseOver) onTextMouseOver(event, d, this)
      })
      .on('mouseout', function (event, d) {
        d3.select(this).transition().duration(200).style('font-weight', 'normal')
        if (onTextMouseOut) onTextMouseOut(event, d, this)
      })
      .on('click', onClick)
  }

  function drawStackLegend(options = {}) {
    const { svg, onRectMouseOver, onRectMouseOut, onTextMouseOver, onTextMouseOut, onClick } =
      options
    if (!seriesKeyArray) return

    const { legendItems, newHeight, legendRectSize, textRectSpacing, legendFontSize } =
      calculateLegendLayout(svg, seriesKeyArray, width, height)

    svg.attr('height', newHeight)

    // 绘制 legend
    const legend = svg.append('g').attr('class', 'legend')

    const tagWrap = legend
      .selectAll('.tags-legend')
      .data(legendItems)
      .enter()
      .append('g')
      .attr('class', 'tags-legend')

    tagWrap
      .append('rect')
      .attr('class', (d) => `tags-legend-rect-${d.key}`)
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .attr('fill', (d) => colorScale(d.key))
      .attr('cursor', 'pointer')
      .attr('rx', 2)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .on('mouseover', function (event, d) {
        if (onRectMouseOver) onRectMouseOver(event, d, this)
      })
      .on('mouseout', function (event, d) {
        if (onRectMouseOut) onRectMouseOut(event, d, this)
      })
      .on('click', onClick)

    tagWrap
      .append('text')
      .attr('class', (d) => `tags-legend-text-${d.key}`)
      .attr('x', (d) => d.x + legendRectSize + textRectSpacing)
      .attr('y', (d) => d.y + legendRectSize / 2)
      .attr('fill', 'black')
      .style('font-size', `${legendFontSize}px`)
      .style('user-select', 'none')
      .style('dominant-baseline', 'middle')
      .text((d) => d.key)
      .attr('cursor', 'pointer')
      .on('mouseover', function (event, d) {
        d3.select(this).transition().duration(200).style('font-weight', 'bold')
        if (onTextMouseOver) onTextMouseOver(event, d, this)
      })
      .on('mouseout', function (event, d) {
        d3.select(this).transition().duration(200).style('font-weight', 'normal')
        if (onTextMouseOut) onTextMouseOut(event, d, this)
      })
      .on('click', onClick)
  }

  return {
    drawPoints,
    drawThresholds,
    drawLine,
    drawLegend,
    drawStackBars,
    drawBars,
    drawStackLegend
  }
}
