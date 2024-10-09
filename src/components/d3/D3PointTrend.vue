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
    >
      <!-- 預設tooltip -->
      <div
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
    <slot name="thresholds"></slot>
    <div class="absolute top-0 right-0" v-if="resetBtnShow">
      <JxButton size="sm" color="secondary" :is-outline="true" @click="reset">Reset</JxButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, useSlots, watch, nextTick } from 'vue'
import * as d3 from 'd3'
import JxButton from '@/components/JxButton.vue'
import { useD3Context } from '@/composables/d3/useD3Context'
import { useD3Base } from '@/composables/d3/useD3Base'
import { useD3Alarm } from '@/composables/d3/useD3Alarm'
import { useD3Element } from '@/composables/d3/useD3Element'
import { useD3Interaction } from '@/composables/d3/useD3Interaction'
import { useZoom } from '@/composables/d3/useD3Zoom'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  xKey: {
    type: String,
    required: true
  },
  yKey: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: 1000
  },
  height: {
    type: Number,
    default: 300
  },
  margin: {
    type: Object,
    default: () => ({ top: 20, right: 20, bottom: 120, left: 40 })
  },
  xType: {
    type: String,
    default: 'band'
  },
  xAxisSampleRate: {
    type: Number,
    default: 1
  },
  xAxisType: {
    type: String,
    default: 'sample'
  },
  title: {
    type: String,
    default: ''
  },
  seriesKey: {
    type: String,
    default: ''
  },
  hasLine: {
    type: Boolean,
    default: true
  }
})
const chartContainer = ref(null)
const slots = useSlots()
const context = useD3Context(props, chartContainer, slots)

const { initChart, drawXAxis, drawYAxis } = useD3Base(context)
const { drawPoints, drawThresholds, drawLine, drawLegend } = useD3Element(context)
const { createAlarmLimit } = useD3Alarm()
const alarmLimit = createAlarmLimit(slots)
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

let svg, xScale, yScale, innerContent, brush, brushContent, ucl, lcl
ucl = alarmLimit?.ucl
lcl = alarmLimit?.lcl

function drawChart() {
  if (!chartContainer.value) return
  // Clear previous chart
  d3.select(chartContainer.value).selectAll('*').remove()
  // 初始化產出svg,xScale,yScale
  const initObject = initChart()
  svg = initObject.svg
  xScale = initObject.xScale
  yScale = initObject.yScale

  innerContent = svg.append('g').attr('clip-path', 'url(#clipPath)')

  brush = createBrush((event) =>
    brushEnd(event, xScale, yScale, () => {
      if (props.hasLine) {
        drawLine({ innerContent, xScale, yScale })
      }
      drawPoints({
        innerContent,
        xScale,
        yScale,
        ucl,
        lcl,
        onMouseOver: pointMouseOver(svg),
        onMouseOut: pointMouseOut(),
        onRectMouseOver: legendMouseOver(),
        onRectMouseOut: legendMouseOut(),
        onTextMouseOver: legendMouseOver(),
        onTextMouseOut: legendMouseOut()
      })
      drawXAxis(props.xAxisType, props.xAxisSampleRate)
      drawYAxis(props.margin.left)
      drawThresholds({ innerContent, yScale, slots })
      brushContent.call(brush.move, null)
    })
  )
  brushContent = innerContent.append('g').call(brush)

  // Title
  svg
    .append('text')
    .attr('x', props.width / 2)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .style('font-weight', 'bold')
    .style('user-select', 'none')
    .text(props.title)

  // Draw axes
  drawXAxis(props.xAxisType, props.xAxisSampleRate)
  drawYAxis(props.margin.left)
  // Draw thresholds
  drawThresholds({ innerContent, yScale, slots })
  // Draw line
  if (props.hasLine) {
    drawLine({ innerContent, xScale, yScale })
  }
  // Draw points (after thresholds to ensure correct coloring)
  drawPoints({
    innerContent,
    xScale,
    yScale,
    ucl,
    lcl,
    onMouseOver: pointMouseOver(svg),
    onMouseOut: pointMouseOut(),
    onRectMouseOver: legendMouseOver(),
    onRectMouseOut: legendMouseOut(),
    onTextMouseOver: legendMouseOver(),
    onTextMouseOut: legendMouseOut()
  })
  // Draw legend
  drawLegend({
    svg,
    onRectMouseOver: legendMouseOver(),
    onRectMouseOut: legendMouseOut(),
    onTextMouseOver: legendMouseOver(),
    onTextMouseOut: legendMouseOut()
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
