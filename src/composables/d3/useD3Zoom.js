import { ref, nextTick } from 'vue'
import * as d3 from 'd3'

export function useZoom(context) {
  const { props } = context
  const { width, height, xType } = props

  const resetBtnShow = ref(false)

  function createBrush(brushEndCallback) {
    return d3
      .brush()
      .extent([
        [0, 0],
        [width, height]
      ])
      .on('end', brushEndCallback)
  }
  function brushEnd(event, xScale, yScales, redrawCallback) {
    if (!event.sourceEvent) return
    const [[x0, y0], [x1, y1]] = event.selection
    let selectedXDomain, selectedYDomains
    if (xType === 'band') {
      selectedXDomain = xScale.domain().filter((d) => {
        const bandStart = xScale(d)
        const bandEnd = bandStart + xScale.bandwidth()
        return bandStart >= x0 && bandEnd <= x1
      })
    } else {
      selectedXDomain = [xScale.invert(x0), xScale.invert(x1)]
    }
    selectedYDomains = Array.isArray(yScales)
    ? yScales.map(yScale => [yScale.invert(y1), yScale.invert(y0)])
    : [[yScales.invert(y1), yScales.invert(y0)]]

    xScale.domain(selectedXDomain)
    if (Array.isArray(yScales)) {
      yScales.forEach((yScale, index) => yScale.domain(selectedYDomains[index]))
    } else {
      yScales.domain(selectedYDomains[0])
    }
    redrawCallback()
    resetBtnShow.value = true
  }
  function resetZoom(drawChart) {
    resetBtnShow.value = false
    nextTick(() => {
      drawChart()
    })
  }

  return {
    resetBtnShow,
    createBrush,
    brushEnd,
    resetZoom
  }
}
