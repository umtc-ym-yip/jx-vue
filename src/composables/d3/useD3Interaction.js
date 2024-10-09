import * as d3 from 'd3'
import { ref, nextTick } from 'vue'

export function useD3Interaction(props, chartContainer) {
  const { seriesKey } = props

  // Tooltip
  const tooltip = ref(null)
  const tooltipShow = ref(false)
  const tooltipLoc = ref({ x: 0, y: 0 })
  const tooltipData = ref({})
  const hiddenTooltip = ref(false)
  const externalTooltipRef = ref(null)
  const setTooltipRef = (el) => {
    externalTooltipRef.value = el
  }
  // Tooltip

  // Point
  function pointMouseOver(svg) {
    return function (event, d, element) {
      d3.select(element).transition().duration(200).attr('r', 7)
      const [x, y] = d3.pointer(event, chartContainer.value)

      const svgWidth = svg.node().getBoundingClientRect().width
      tooltipLoc.value = { x: 0, y: 0 }
      tooltipData.value = d
      tooltipShow.value = true
      nextTick(() => {
        let tooltipWidth = tooltip.value?.offsetWidth || externalTooltipRef.value?.offsetWidth
        let tooltipX = x + tooltipWidth > svgWidth ? x - tooltipWidth - 10 : x + 10
        let tooltipY = y - 30

        tooltipLoc.value = { x: tooltipX, y: tooltipY }
        hiddenTooltip.value = false
      })
      otherPointFade(event, d)
      otherLineFade(event, d)
    }
  }
  function pointMouseOut() {
    return function (event, d, element) {
      d3.select(element).transition().duration(200).attr('r', 3)
      tooltipShow.value = false
      hiddenTooltip.value = true
      otherPointReset(event, d)
      otherLineReset(event, d)
    }
  }

  // 觸碰legend
  function legendMouseOver() {
    return function (event, d) {
      otherLegendFade(event, d)
      otherPointFade(event, d)
      otherLineFade(event, d)
    }
  }
  function legendMouseOut() {
    return function (event, d) {
      otherLegendReset(event, d)
      otherPointReset(event, d)
      otherLineReset(event, d)
    }
  }

  function otherPointFade(event, d) {
    const allElements = d3.selectAll(`.point-${seriesKey}`)
    const othersElements = allElements.filter((i) => i[seriesKey] !== d[seriesKey])
    othersElements.each((d, i, nodes) => {
      d3.select(nodes[i]).attr('stroke-width', 0)
      const currentColor = d3.select(nodes[i]).attr('fill')
      if (currentColor) {
        const color = d3.color(currentColor)
        color.opacity = 0.2
        d3.select(nodes[i]).attr('fill', color)
      }
    })
  }

  function otherPointReset(event, d) {
    // 恢復原本大小
    d3.select(event.target).transition().duration(200).attr('r', 3)

    const allElements = d3.selectAll(`.point-${seriesKey}`)
    const othersElements = allElements.filter((i) => i[seriesKey] !== d[seriesKey])
    othersElements.each((d, i, nodes) => {
      d3.select(nodes[i]).attr('stroke-width', 1)
      const currentColor = d3.select(nodes[i]).attr('fill')
      if (currentColor) {
        const color = d3.color(currentColor)
        color.opacity = 1
        d3.select(nodes[i]).attr('fill', color)
      }
    })
  }
  function otherLineFade(event, d) {
    const allElements = d3.selectAll(`.line-${seriesKey}`)
    const othersElements = allElements.filter((i) => i[0]?.[seriesKey] !== d[seriesKey])
    othersElements.each((d, i, nodes) => {
      const currentStroke = d3.select(nodes[i]).attr('stroke')
      const color = d3.color(currentStroke)
      color.opacity = 0.2
      d3.select(nodes[i]).attr('stroke', color)
    })
  }
  function otherLineReset(event, d) {
    const allElements = d3.selectAll(`.line-${seriesKey}`)
    const othersElements = allElements.filter((i) => i[0]?.[seriesKey] !== d[seriesKey])
    othersElements.each((d, i, nodes) => {
      const currentStroke = d3.select(nodes[i]).attr('stroke')
      const color = d3.color(currentStroke)
      color.opacity = 1
      d3.select(nodes[i]).attr('stroke', color)
    })
  }
  function otherLegendFade(event, d) {
    const legend = d3.selectAll(`.tags-legend-rect-${seriesKey}`)
    const othersLegend = legend.filter((i) => i[seriesKey] !== d[seriesKey])

    othersLegend.each((d, i, nodes) => {
      d3.select(nodes[i]).attr('fill', (d) => {
        const currentColor = d3.select(nodes[i]).attr('fill')
        const targetColor = d3.color(currentColor)
        targetColor.opacity = 0.1
        return targetColor
      })
    })
    //其他text變淺
    const text = d3.selectAll(`.tags-legend-text-${seriesKey}`)
    text.filter((i) => i[seriesKey] !== d[seriesKey]).attr('fill', 'gray')
  }
  function otherLegendReset(event, d) {
    const legend = d3.selectAll(`.tags-legend-rect-${seriesKey}`)
    const othersLegend = legend.filter((i) => i[seriesKey] !== d[seriesKey])
    othersLegend.attr('fill', (d, i, nodes) => {
      const currentColor = d3.select(nodes[i]).attr('fill')
      const targetColor = d3.color(currentColor)
      targetColor.opacity = 1
      return targetColor
    })
    const text = d3.selectAll(`.tags-legend-text-${seriesKey}`)
    text.filter((i) => i[seriesKey] !== d[seriesKey]).attr('fill', 'black')
  }

  return {
    tooltip,
    tooltipShow,
    tooltipLoc,
    tooltipData,
    hiddenTooltip,
    setTooltipRef,
    pointMouseOver,
    otherPointFade,
    pointMouseOut,
    otherPointReset,
    legendMouseOver,
    legendMouseOut
  }
}
