<template>
  <div ref="chartContainer" class="relative"></div>
</template>
<script setup>
import * as d3 from 'd3'
import axios from 'axios'
import { ref, watch, onMounted, useSlots } from 'vue'

import { state, resetState } from '@/composables/d3/useD3Gerber'
import { useD3Context } from '@/composables/d3/useD3Context'
import { useD3Base } from '@/composables/d3/useD3Base'
import { useD3Element } from '@/composables/d3/useD3Element'
import { useD3Interaction } from '@/composables/d3/useD3Interaction'
import { useZoom } from '@/composables/d3/useD3Zoom'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  width: {
    type: Number,
    default: 400
  },
  height: {
    type: Number,
    default: 300
  },
  margin: {
    type: Object,
    default: () => ({ top: 20, right: 20, bottom: 20, left: 40 })
  },
  xKey: {
    type: String,
    required: true
  },
  yKey: {
    type: String,
    required: true
  }
})

const slots = useSlots()
const chartContainer = ref(null)
const context = useD3Context(props, chartContainer, slots)

const { initChart, drawXAxis, drawYAxis, createScales } = useD3Base(context)
const { drawPoints, drawLegend } = useD3Element(context)
const {
  tooltip,
  tooltipShow,
  tooltipLoc,
  tooltipData,
  hiddenTooltip,
  setTooltipRef,
  pointMouseOver,
  pointMouseOut,
  legendMouseOver,
  legendMouseOut
} = useD3Interaction(context)

let xScale,
  yScale,
  regionPath,
  isInRegion = false,
  currentPath = []
const paths = []

function drawChart() {
  if (!chartContainer.value) return

  d3.select(chartContainer.value).selectAll('*').remove()

  const { svg, innerContent } = initChart()
  const { xScale, yScale } = createScales()

  drawXAxis('unit-mapping', null, xScale)
  drawYAxis('unit-mapping', props.margin.left, yScale)
  renderGerber(state, innerContent, xScale, yScale)
}

function addToPath(coord, xScale, yScale) {
  if (coord.command === '02' || currentPath.length === 0) {
    if (currentPath.length > 0) {
      paths.push(currentPath)
    }
    currentPath = [coord]
  } else {
    currentPath.push(coord)
  }
}
function addToRegion(coord, xScale, yScale) {
  if (coord.command === '02') {
    regionPath += `M${xScale(coord.x)},${yScale(coord.y)}`
  } else if (coord.g === '01') {
    regionPath += `L${xScale(coord.x)},${yScale(coord.y)}`
  } else {
    const d = arc({
      startAngle: 0,
      endAngle: Math.PI * 2,
      x: coord.x,
      y: coord.y,
      i: coord.i,
      j: coord.j
    })
    regionPath += d
  }
}
function renderGerber(state, innerContent, xScale, yScale) {

  const line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
  // const arc = d3
  //   .arc()
  //   .innerRadius(0)
  //   .outerRadius((d) => Math.abs(d.i || d.j) * (xScale(1) - xScale(0)))
  state.coordinates.forEach((coord) => {
    if (coord.command === 'G36') {
      isInRegion = true
      regionPath = ''
    } else if (coord.command === 'G37') {
      isInRegion = false
    } else if (isInRegion) {
      addToRegion(coord, xScale, yScale)
      // 繪製pad
    } else if (coord.command === '03') {
      const aperture = state.apertures[coord.aperture]
      if (aperture && aperture.shape === 'C') {
        innerContent
          .append('circle')
          .attr('cx', xScale(coord.x))
          .attr('cy', yScale(coord.y))
          .attr('r', aperture.params[0] * 10)
          .attr('fill', state.layerPolarity === 'dark' ? 'gray' : 'white')
      }
    } else {
      addToPath(coord, xScale, yScale)
    }
  })

  if (currentPath.length > 0) {
    paths.push(currentPath)
  }

  innerContent
    .selectAll('path.gerber-path')
    .data(paths)
    .enter()
    .append('path')
    .attr('class', 'gerber-path')
    .attr('d', (d) => line(d))
    .attr('fill', 'none')
    .attr('stroke', state.layerPolarity === 'dark' ? 'gray' : 'white')
    .attr('stroke-width', 1)
}

onMounted(() => {
  drawChart()
})
watch(() => props.gerberContent, drawChart, { deep: true })
</script>
