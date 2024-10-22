<template>
  <div ref="chartContainer" class="relative">
    <!-- 給客製化生成tooltip位置使用 -->
    <!-- 客製化tooltip，用作用域插槽傳遞內部資料出去，利用setTooltipRef去取得外部元素 -->
    <slot
      name="tooltip"
      :show="tooltipShow"
      :data="tooltipData"
      :x="tooltipLoc.x"
      :y="tooltipLoc.y"
      :setTooltipRef="setTooltipRef"
      ><div
        ref="tooltip"
        class="absolute bg-white border border-gray-300 rounded p-2.5 text-sm"
        :class="{ 'opacity-0': hiddenTooltip }"
        v-if="tooltipShow"
        :style="{ left: `${tooltipLoc.x}px`, top: `${tooltipLoc.y}px` }"
      >
        {{ props.xKey }}: {{ tooltipData[props.xKey] }}<br />
        {{ props.yKey }}: {{ tooltipData[props.yKey] }}
      </div>
    </slot>
  </div>
  <div class="absolute" :style="buttonStyle" v-if="resetBtnShow">
    <JxButton size="sm" color="secondary" :is-outline="true" @click="reset">Reset</JxButton>
  </div>
</template>
<script setup>
import * as d3 from 'd3'
import axios from 'axios'
import { ref, computed, watch, onMounted, useSlots } from 'vue'
import JxButton from '@/components/JxButton.vue'

import { useD3Gerber } from '@/composables/d3/useD3Gerber'
import { useD3Context } from '@/composables/d3/useD3Context'
import { useD3Base } from '@/composables/d3/useD3Base'
import { useD3Element } from '@/composables/d3/useD3Element'
import { useD3Interaction } from '@/composables/d3/useD3Interaction'
import { useZoom } from '@/composables/d3/useD3Zoom'

const props = defineProps({
  gerberData: {
    type: Object,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  width: {
    type: Number,
    default: 500
  },
  height: {
    type: Number,
    default: 500
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
  },
  seriesKey: {
    type: String,
    required: true
  }
})
const buttonStyle = computed(() => {
  return `left: ${props.width - props.margin.right}px; top: ${props.margin.top}px;`
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
const { createBrush, brushEnd, resetZoom, resetBtnShow } = useZoom(context)

const { state, renderGerber } = useD3Gerber()

let brushContent

function drawChart() {
  if (!chartContainer.value) return

  d3.select(chartContainer.value).selectAll('*').remove()

  const { svg, innerContent } = initChart()
  // const { xScale, yScale } = createScales()

  const xData = props.gerberData.coordinates.map((d) => d.x).filter((d) => d !== undefined)
  const yData = props.gerberData.coordinates.map((d) => d.y).filter((d) => d !== undefined)
  const maxX = Math.max(...xData)
  const minX = Math.min(...xData)
  const maxY = Math.max(...yData)
  const minY = Math.min(...yData)

  const xScale = d3
    .scaleLinear()
    .domain([minX - 1, maxX + 1])
    .range([props.margin.left, props.width - props.margin.right])

  const yScale = d3
    .scaleLinear()
    .domain([minY - 1, maxY + 1])
    .range([props.height - props.margin.bottom, props.margin.top])

  const brush = createBrush((event) =>
    brushEnd(event, xScale, yScale, () => {
      renderGerber(props.gerberData, innerContent, xScale, yScale)
      drawPoints({
        chartType: 'unit-mapping',
        innerContent,
        xScale,
        getYValue: (d) => yScale(d[props.yKey]),
        onMouseOver: pointMouseOver(svg, innerContent, 7),
        onMouseOut: pointMouseOut(innerContent, 3),
        onRectMouseOver: legendMouseOver(innerContent),
        onRectMouseOut: legendMouseOut(innerContent),
        onTextMouseOver: legendMouseOver(innerContent),
        onTextMouseOut: legendMouseOut(innerContent),
        data: props.data
      })
      drawXAxis('unit-mapping', null, xScale)
      drawYAxis('unit-mapping', props.margin.left, yScale)
      brushContent.call(brush.move, null)
    })
  )

  brushContent = innerContent.append('g').call(brush)

  drawXAxis('unit-mapping', null, xScale)
  drawYAxis('unit-mapping', props.margin.left, yScale)

  renderGerber(props.gerberData, innerContent, xScale, yScale)

  drawPoints({
    chartType: 'unit-mapping',
    innerContent,
    xScale,
    getYValue: (d) => yScale(d[props.yKey]),
    onMouseOver: pointMouseOver(svg, innerContent, 7),
    onMouseOut: pointMouseOut(innerContent, 3),
    onRectMouseOver: legendMouseOver(innerContent),
    onRectMouseOut: legendMouseOut(innerContent),
    onTextMouseOver: legendMouseOver(innerContent),
    onTextMouseOut: legendMouseOut(innerContent),
    data: props.data
  })

  drawLegend({
    svg,
    onRectMouseOver: legendMouseOver(innerContent),
    onRectMouseOut: legendMouseOut(innerContent),
    onTextMouseOver: legendMouseOver(innerContent),
    onTextMouseOut: legendMouseOut(innerContent)
  })
}
function reset() {
  resetZoom(drawChart)
}
onMounted(() => {
  drawChart()
})
watch(() => props.data, drawChart, { deep: true })
</script>
