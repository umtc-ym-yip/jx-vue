<template>
  <div ref="chartContainer" class="relative"></div>
</template>
<script setup>
import * as d3 from 'd3'
import axios from 'axios'
import { ref, watch, onMounted, useSlots } from 'vue'

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
const state = {
  format: null,
  unit: null,
  apertures: {},
  currentAperture: null,
  coordinates: [],
  layerPolarity: 'dark',
  layerName: null,
  scale: 1,
  currentX: 0,
  currentY: 0,
  interpolationMode: 'linear',
  regionMode: false,
  quadrantMode: 'single',
  currentG: '01', // 默認為線性插值
  isInRegion: false
}
function drawChart() {
  if (!chartContainer.value) return

  d3.select(chartContainer.value).selectAll('*').remove()

  const { svg, innerContent } = initChart()
  const { xScale, yScale } = createScales()
    
  drawXAxis('unit-mapping', null, xScale)
  drawYAxis('unit-mapping', props.margin.left, yScale)

//   const gerberState = parseGerberFile(props.gerberContent)
  renderGerber(props.data, innerContent)
}

function parseAperture(line) {
  // %ADD10C,0.077000*% 擷取 10 C 0.077000 ，利用正則表達式 match 的捕獲組
  const match = line.match(/%ADD(\d+)([A-Z]),([\d.]+)\*\%/)

  // pad參數
  if (match) {
    const [, number, shape, paramsString] = match
    let params = []
    if (paramsString) {
      params = paramsString.split('X').map(Number)
    }
    state.apertures[number] = { shape, params }
  }
}

function parseFormatSpecification(line) {
  const match = line.match(/%FS([LT])([AI])X(\d)(\d)Y(\d)(\d)\*%/)
  if (match) {
    state.format = {
      zeroOmission: match[1] === 'L' ? 'leading' : 'trailing',
      notation: match[2] === 'A' ? 'absolute' : 'incremental',
      xInteger: parseInt(match[3]),
      xDecimal: parseInt(match[4]),
      yInteger: parseInt(match[5]),
      yDecimal: parseInt(match[6])
    }
    state.scale = Math.pow(10, -state.format.xDecimal)
  }
}

function parseCoordinate(line, index) {
  const xMatch = line.match(/X(-?\d+)/)
  const yMatch = line.match(/Y(-?\d+)/)
  const dMatch = line.match(/D0[123]/)
  const iMatch = line.match(/I(-?\d+)/)
  const jMatch = line.match(/J(-?\d+)/)
  const gMatch = line.match(/G0[123]/)

  let x = xMatch ? parseInt(xMatch[1]) * state.scale : state.currentX
  let y = yMatch ? parseInt(yMatch[1]) * state.scale : state.currentY

  const d = dMatch ? dMatch[0].slice(1) : null
  const i = iMatch ? parseInt(iMatch[1]) * state.scale : 0
  const j = jMatch ? parseInt(jMatch[1]) * state.scale : 0

  if (gMatch) {
    state.currentG = gMatch[0].slice(1)
  }

  state.currentX = x
  state.currentY = y

  return {
    x,
    y,
    command: d,
    i,
    j,
    g: state.currentG,
    index,
    aperture: state.currentAperture,
    interpolationMode: state.interpolationMode,
    isInRegion: state.isInRegion
  }
}

function parseGerberFile(gerberContent) {
  const lines = gerberContent.split('\n')

  lines.forEach((line, index) => {
    line = line.trim()
    if (line.startsWith('%FS')) parseFormatSpecification(line)
    else if (line.startsWith('%MO')) state.unit = line === '%MOMM*%' ? 'mm' : 'inch'
    else if (line.startsWith('%ADD')) parseAperture(line)
    else if (line.startsWith('%LP')) state.layerPolarity = line === '%LPD*%' ? 'dark' : 'clear'
    else if (line.startsWith('%LN')) state.layerName = line.slice(3, -2)
    // 繪製區塊(?)
    else if (line === 'G01*' || line === 'G02*' || line === 'G03*') {
      state.interpolationMode =
        line === 'G01*' ? 'linear' : line === 'G02*' ? 'clockwise' : 'counterclockwise'
      state.currentG = line.slice(1, 3)
      state.coordinates.push({
        command: line.slice(0, 3),
        isInRegion: state.isInRegion,
        index
      })
    } else if (line.startsWith('G54')) {
      state.currentAperture = line.match(/D(\d+)/)[1]
    } else if (line === 'G36*') {
      state.isInRegion = true
      state.coordinates.push({
        command: 'G36',
        isInRegion: true,
        index
      })
    } else if (line === 'G37*') {
      state.isInRegion = false
      state.coordinates.push({
        command: 'G37',
        isInRegion: false,
        index
      })
    }
    // else if (line === 'G74*' || line === 'G75*') {
    //   state.quadrantMode = line === 'G74*' ? 'single' : 'multi'
    //   state.coordinates.push({
    //     command: line.slice(0, 3),
    //     quadrantMode: state.quadrantMode,
    //     index
    //   })
    // }

    // X50720Y1678360D01* XYIJD開頭的字串會被解析成座標
    else if (line.match(/^[XYIJD]/)) {
      const coord = parseCoordinate(line, index)
      state.coordinates.push(coord)
    }
  })

  return state
}

function addToPath(coord) {
  if (coord.command === '02' || currentPath.length === 0) {
    if (currentPath.length > 0) {
      paths.push(currentPath)
    }
    currentPath = [coord]
  } else {
    currentPath.push(coord)
  }
}
function addToRegion(coord) {
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
function renderGerber(state, innerContent) {
  const xExtent = d3.extent(state.coordinates, (d) => d.x)
  const yExtent = d3.extent(state.coordinates, (d) => d.y)

  xScale = d3
    .scaleLinear()
    .domain([xExtent[0] - 1, xExtent[1] + 1])
    .range([50, 550])
  yScale = d3
    .scaleLinear()
    .domain([yExtent[0] - 1, yExtent[1] + 1])
    .range([550, 50])

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
      // svg
      //   .append('path')
      //   .attr('d', regionPath)
      //   .attr('fill', state.layerPolarity === 'dark' ? 'gray' : 'white')
      //   .attr('stroke', 'none')
    } else if (isInRegion) {
      addToRegion(coord)
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
      addToPath(coord)
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

// onMounted(() => {
// //   const gerberState = parseGerberFile(props.gerberContent)
// //   renderGerber(gerberState, chartContainer.value)
// })
onMounted(() => {
  drawChart()
})
watch(() => props.gerberContent, drawChart, { deep: true })
</script>
