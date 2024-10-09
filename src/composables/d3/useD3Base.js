import { onMounted } from 'vue'
import * as d3 from 'd3'

export function useD3Base(props, chartContainer) {
  let svg, xScale, yScale
  const { width, height, margin, data, xKey, yKey, xType, seriesKey } = props

  const createSvg = () => {
    if (!chartContainer.value) return null

    // Clear previous chart
    d3.select(chartContainer.value).selectAll('*').remove()
    // Create SVG
    svg = d3.select(chartContainer.value).append('svg').attr('width', width).attr('height', height)

    svg
      .append('defs')
      .append('clipPath')
      .attr('id', 'clipPath')
      .append('rect')
      .attr('width', width)
      .attr('height', height - margin.bottom)

    return svg
  }

  const createScales = () => {
    // Create xScale
    if (xType === 'band') {
      xScale = d3
        .scaleBand()
        .domain(data.map((d) => d[xKey]))
        .range([margin.left, width - margin.right])
        .padding(0.1)
    } else {
      xScale = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d[xKey]))
        .range([margin.left, width - margin.right])
    }

    // Create yScale
    const yMin = d3.min(data, (d) => Number(d[yKey]))
    const yMax = d3.max(data, (d) => Number(d[yKey]))

    yScale = d3
      .scaleLinear()
      .domain([yMin - yMin * 0.05, yMax + yMax * 0.05])
      .range([height - margin.bottom, margin.top])

    return { xScale, yScale }
  }

  const drawXAxis = (type, sampleRate) => {
    svg.selectAll('.x-axis').remove()
    let xAxis
    if (type === 'sample') {
      xAxis = d3.axisBottom(xScale).tickValues(
        xScale.domain().filter((d, i, self) => {
          if (self.length < 30) {
            return true
          } else if (i === 0) {
            return false
          } else {
            return i % sampleRate === 0
          }
        })
      )
    } else if (type === 'rotate') {
      xAxis = d3.axisBottom(xScale)
    } else if (type === 'ticks') {
      xAxis = d3.axisBottom(xScale).tickFormat((d, i) => (i % sampleRate === 0 ? d : ''))
    } else {
      xAxis = d3.axisBottom(xScale)
    }

    const xAxisGroup = svg
      .append('g')
      .attr('class', 'x-axis')
      .style('user-select', 'none')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis)

    xAxisGroup
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
  }

  const drawYAxis = (toLeft) => {
    svg.selectAll('.y-axis').remove()
    const yAxis = d3.axisLeft(yScale)
    svg
      .append('g')
      .attr('class', 'y-axis')
      .style('user-select', 'none')
      .attr('transform', `translate(${toLeft},0)`)
      .call(yAxis)
  }

  const initChart = () => {
    svg = createSvg()
    const scales = createScales()
    xScale = scales.xScale
    yScale = scales.yScale
    return { svg, xScale, yScale }
  }

  return {
    initChart,
    drawXAxis,
    drawYAxis
  }
}
