import { ref, nextTick } from 'vue'
import * as d3 from 'd3'

export function useZoom(props) {
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
  function brushEnd(event, xScale, yScale, redrawCallback) {
    if (!event.sourceEvent) return
    const [[x0, y0], [x1, y1]] = event.selection
    let selectedXDomain, selectedYDomain
    if (xType === 'band') {
      selectedXDomain = xScale.domain().filter((d) => {
        const bandStart = xScale(d)
        const bandEnd = bandStart + xScale.bandwidth()
        return bandStart >= x0 && bandEnd <= x1
      })
    } else {
      selectedXDomain = [xScale.invert(x0), xScale.invert(x1)]
    }
    selectedYDomain = [yScale.invert(y1), yScale.invert(y0)]
    xScale.domain(selectedXDomain)
    yScale.domain(selectedYDomain)
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
