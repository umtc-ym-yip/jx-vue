import * as d3 from 'd3'
import { ref, nextTick } from 'vue'

export function useD3Interaction(context) {
  const { props, chartContainer } = context
  const { seriesKey } = props

  // Tooltip
  const tooltip = ref(null)
  const tooltipShow = ref(false)
  const tooltipLoc = ref({ x: 0, y: 0 })
  const tooltipData = ref({})
  const tooltopStatus = ref('')
  const hiddenTooltip = ref(false)
  const externalTooltipRef = ref(null)
  const setTooltipRef = (el) => {
    externalTooltipRef.value = el
  }
  // Tooltip

  // Point
  function pointMouseOver(svg, innerContent, pointSize) {
    return function (event, d, element) {
      d3.select(element).transition().duration(200).attr('r', pointSize)
      const [x, y] = d3.pointer(event, chartContainer.value)

      const svgWidth = svg.node().getBoundingClientRect().width
      tooltipLoc.value = { x: 0, y: 0 }
      tooltipData.value = d
      tooltopStatus.value = 'point'
      tooltipShow.value = true
      nextTick(() => {
        let tooltipWidth = tooltip.value?.offsetWidth || externalTooltipRef.value?.offsetWidth
        let tooltipX = x + tooltipWidth > svgWidth ? x - tooltipWidth - 10 : x + 10
        let tooltipY = y - 30

        tooltipLoc.value = { x: tooltipX, y: tooltipY }
        hiddenTooltip.value = false
      })
      otherPointFade(event, d, innerContent)
      otherLineFade(event, d, innerContent)
    }
  }
  function pointMouseOut(innerContent, pointSize) {
    return function (event, d, element) {
      d3.select(element).transition().duration(200).attr('r', pointSize)
      tooltipShow.value = false
      hiddenTooltip.value = true
      otherPointReset(event, d, innerContent,pointSize)
      otherLineReset(event, d, innerContent)
    }
  }

  function stackBarMouseOver(svg, innerContent) {
    return function (event, d, element) {
      d3.select(element).transition().duration(200).attr('transform', 'scale(1.005)')

      const [x, y] = d3.pointer(event, chartContainer.value)

      const svgWidth = svg.node().getBoundingClientRect().width
      tooltipLoc.value = { x: 0, y: 0 }
      tooltipData.value = d
      tooltopStatus.value = 'stack'
      tooltipShow.value = true
      nextTick(() => {
        let tooltipWidth = tooltip.value?.offsetWidth || externalTooltipRef.value?.offsetWidth
        let tooltipX = x + tooltipWidth > svgWidth ? x - tooltipWidth - 10 : x + 10
        let tooltipY = y - 30

        tooltipLoc.value = { x: tooltipX, y: tooltipY }
        hiddenTooltip.value = false
      })
      othersStackBarFade(event, d, innerContent)
    }
  }
  function stackBarMouseOut(innerContent) {
    return function (event, d, element) {
      d3.select(element).transition().duration(200).attr('transform', 'scale(1)')
      tooltipShow.value = false
      hiddenTooltip.value = true
      othersStackBarReset(event, d, innerContent)
    }
  }

  // 觸碰legend
  function legendMouseOver(innerContent) {
    return function (event, d) {
      // otherLegendFade(event, d, innerContent)
      otherPointFade(event, d, innerContent)
      otherLineFade(event, d, innerContent)
    }
  }
  function stackLegendMouseOver(innerContent) {
    return function (event, d) {
      // otherLegendFade(event, d)
      othersStackBarFade(event, d, innerContent)
      // otherLineFade(event, d)
    }
  }
  function stackLegendMouseOut(innerContent) {
    return function (event, d) {
      // otherLegendFade(event, d)
      othersStackBarReset(event, d, innerContent)
      // otherLineFade(event, d)
    }
  }

  function legendMouseOut(innerContent) {
    return function (event, d) {
      // otherLegendReset(event, d,innerContent)
      otherPointReset(event, d, innerContent)
      otherLineReset(event, d, innerContent)
    }
  }

  function otherPointFade(event, d, innerContent) {
    const allElements = innerContent.selectAll(`.point`)
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

  function otherPointReset(event, d, innerContent) {
    // 恢復原本大小

    const allElements = innerContent.selectAll(`.point`)
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
  function otherLineFade(event, d, innerContent) {
    const allElements = innerContent.selectAll(`.line`)
    const othersElements = allElements.filter((i) => i[0]?.[seriesKey] !== d[seriesKey])
    othersElements.each((d, i, nodes) => {
      const currentStroke = d3.select(nodes[i]).attr('stroke')
      const color = d3.color(currentStroke)
      color.opacity = 0.2
      d3.select(nodes[i]).attr('stroke', color)
    })
  }
  function otherLineReset(event, d, innerContent) {
    const allElements = innerContent.selectAll(`.line`)
    const othersElements = allElements.filter((i) => i[0]?.[seriesKey] !== d[seriesKey])
    othersElements.each((d, i, nodes) => {
      const currentStroke = d3.select(nodes[i]).attr('stroke')
      const color = d3.color(currentStroke)
      color.opacity = 1
      d3.select(nodes[i]).attr('stroke', color)
    })
  }

  function othersStackBarFade(event, d, innerContent) {
    const allBars = innerContent.selectAll('.bar-group')
    const othersBars = allBars.filter((i) => i.key !== d.key)
    othersBars.each((d, i, nodes) => {
      const currentColor = d3.select(nodes[i]).attr('fill')
      if (currentColor) {
        const color = d3.color(currentColor)
        color.opacity = 0.2
        d3.select(nodes[i]).attr('fill', color)
      }
    })
  }
  function othersStackBarReset(event, d, innerContent) {
    const allBars = innerContent.selectAll('.bar-group')
    const othersBars = allBars.filter((i) => i.key !== d.parentKey)
    othersBars.each((d, i, nodes) => {
      const currentColor = d3.select(nodes[i]).attr('fill')
      if (currentColor) {
        const color = d3.color(currentColor)
        color.opacity = 1
        d3.select(nodes[i]).attr('fill', color)
      }
    })
  }
  // function otherLegendFade(event, d,innerContent) {
  //   const legend = innerContent.selectAll(`.tags-legend-rect`)
  //   const othersLegend = legend.filter((i) => i[seriesKey] !== d[seriesKey])

  //   othersLegend.each((d, i, nodes) => {
  //     d3.select(nodes[i]).attr('fill', (d) => {
  //       const currentColor = d3.select(nodes[i]).attr('fill')
  //       const targetColor = d3.color(currentColor)
  //       targetColor.opacity = 0.1
  //       return targetColor
  //     })
  //   })
  //   //其他text變淺
  //   const text = innerContent.selectAll(`.tags-legend-text`)
  //   text.filter((i) => i[seriesKey] !== d[seriesKey]).attr('fill', 'gray')
  // }
  // function otherLegendReset(event, d,innerContent) {
  //   const legend = innerContent.selectAll(`.tags-legend-rect`)
  //   const othersLegend = legend.filter((i) => i[seriesKey] !== d[seriesKey])
  //   othersLegend.attr('fill', (d, i, nodes) => {
  //     const currentColor = d3.select(nodes[i]).attr('fill')
  //     const targetColor = d3.color(currentColor)
  //     targetColor.opacity = 1
  //     return targetColor
  //   })
  //   const text = innerContent.selectAll(`.tags-legend-text`)
  //   text.filter((i) => i[seriesKey] !== d[seriesKey]).attr('fill', 'black')
  // }

  return {
    tooltip,
    tooltipShow,
    tooltipLoc,
    tooltipData,
    tooltopStatus,
    hiddenTooltip,
    setTooltipRef,
    pointMouseOver,
    otherPointFade,
    pointMouseOut,
    otherPointReset,
    legendMouseOver,
    stackLegendMouseOver,
    stackLegendMouseOut,
    legendMouseOut,
    stackBarMouseOver,
    stackBarMouseOut
  }
}
