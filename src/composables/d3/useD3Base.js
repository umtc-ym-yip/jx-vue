import * as d3 from 'd3'

export function useD3Base(context) {
  const { props, chartContainer, slots } = context
  let svg, xScale, yScale, yLeftScale, yRightScale
  const { width, height, margin, data, xKey, yKey, xType, seriesKeyArray } = props

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
      .attr('x', margin.left)
      .attr('y', 0)
      .attr('width', width - margin.right - margin.left)
      .attr('height', height - margin.bottom )

    return svg
  }

  const createFixedScales = ({ left, right, top, bottom }) => {
    xScale =
      xType === 'band'
        ? d3
            .scaleBand()
            .domain([left, right])
            .range([margin.left, width - margin.right])
            .padding(0.1)
        : d3
            .scaleLinear()
            .domain([left, right])
            .range([margin.left, width - margin.right])

    yScale = d3
      .scaleLinear()
      .domain([top, bottom])
      .range([height - margin.bottom, margin.top])
    return { xScale, yScale }
  }

  const createDynamicScales = () => {
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
    const thresholdSlots = slots.thresholds?.() || []
    const thresholdValues = thresholdSlots.map((slot) => slot.props?.value).filter(Boolean)

    // Calculate y domain including thresholds
    const yMin = Math.min(
      d3.min(data, (d) => Number(d[yKey])),
      ...thresholdValues.map((d) => Number(d))
    )
    const yMax = Math.max(
      d3.max(data, (d) => Number(d[yKey])),
      ...thresholdValues.map((d) => Number(d))
    )
    yScale = d3
      .scaleLinear()
      .domain([yMin - yMin * 0.05, yMax + yMax * 0.05])
      .range([height - margin.bottom, margin.top])

    return { xScale, yScale }
  }

  const createTwoDynamicScales = () => {
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

    const thresholdSlots = slots.thresholds?.() || []
    const thresholdValues = thresholdSlots.map((slot) => slot.props?.value).filter(Boolean)

    // Calculate y domain including thresholds
    // const yRightMin = Math.min(
    //   d3.min(data, (d) => Number(d[yKey])),
    //   ...thresholdValues.map((d) => Number(d))
    // )
    // const yRightMax = Math.max(
    //   d3.max(data, (d) => Number(d[yKey])),
    //   ...thresholdValues.map((d) => Number(d))
    // )
    yRightScale = d3
      .scaleLinear()
      .domain([0.8, 1])
      .range([height - margin.bottom, margin.top])
      .nice()

    // 要累加值變成domain
    const yLeftDomain = []
    data.forEach((d) => {
      yLeftDomain.push(
        seriesKeyArray.reduce((acc, key) => (acc === null ? 0 : Number(acc) + Number(d[key])), 0)
      )
    })
    const yLeftMax = Math.max(...yLeftDomain)
    const yLeftMin = Math.min(...yLeftDomain)

    yLeftScale = d3
      .scaleLinear()
      .domain([yLeftMin - yLeftMin * 0.05, yLeftMax + yLeftMax * 0.05])
      .range([height - margin.bottom, margin.top])
      .nice()

    return { xScale, yLeftScale, yRightScale }
  }

  const createScales = ({ left, right, top, bottom, type } = {}) => {
    let isFixed = left === 0 ? true : left && right && top && bottom === 0 ? true : bottom
    if (isFixed) {
      return createFixedScales({ left, right, top, bottom })
    } else if (type === 'two-y') {
      return createTwoDynamicScales()
    } else {
      return createDynamicScales()
    }
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
    } else if (type === 'table-mapping') {
      xAxis = d3.axisBottom(xScale).tickSizeOuter(0).tickSizeInner(5).ticks(10)
    } else {
      xAxis = d3.axisBottom(xScale)
    }

    const xAxisGroup = svg
      .append('g')
      .attr('class', 'x-axis')
      .style('user-select', 'none')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis)

    if (type === 'table-mapping') {
      xAxisGroup.selectAll('text').style('text-anchor', 'middle')
    } else {
      xAxisGroup
        .selectAll('text')
        .attr('transform', type === 'table-mapping' ? null : 'rotate(-45)')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
    }
  }

  const drawYAxis = (type, toLeft) => {
    svg.selectAll('.y-axis').remove()
    let yAxis =
      type === 'table-mapping'
        ? d3.axisLeft(yScale).tickSizeOuter(0).tickSizeInner(5).ticks(10)
        : d3.axisLeft(yScale)
    svg
      .append('g')
      .attr('class', 'y-axis')
      .style('user-select', 'none')
      .attr('transform', `translate(${toLeft},0)`)
      .call(yAxis)
  }

  const drawTwoYAxis = (toLeft) => {
    svg.selectAll('.y-axis-left').remove()
    svg.selectAll('.y-axis-right').remove()

    let yAxisLeft = d3
      .axisLeft(yLeftScale)
      .ticks(5)
      .tickFormat((d) => Number(d) * 100 + '%')

    let yAxisRight = d3
      .axisRight(yRightScale)
      .ticks(5)
      .tickFormat((d) => Number(d) * 100 + '%')

    svg
      .append('g')
      .attr('class', 'y-axis-left')
      .style('user-select', 'none')
      .attr('transform', `translate(${toLeft},0)`)
      .call(yAxisLeft)
    svg
      .append('g')
      .attr('class', 'y-axis-right')
      .style('user-select', 'none')
      .attr('transform', `translate(${width - margin.right},0)`)
      .call(yAxisRight)
  }

  const initChart = () => {
    svg = createSvg()
    // const scales = createScales()
    // xScale = scales.xScale
    // yScale = scales.yScale
    return { svg }
  }

  return {
    initChart,
    drawXAxis,
    drawYAxis,
    drawTwoYAxis,
    createScales // 如果需要在外部使用這個函數
  }
}
