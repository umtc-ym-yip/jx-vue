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
    <div class="absolute" :style="buttonStyle" v-if="resetBtnShow">
      <JxButton size="sm" color="secondary" :is-outline="true" @click="reset">Reset</JxButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, useSlots, watch } from 'vue'
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
const buttonStyle = computed(() => {
  return `left: ${props.width - props.margin.right}px; top: ${props.margin.top}px;`
})

const chartContainer = ref(null)
const slots = useSlots()
const context = useD3Context(props, chartContainer, slots)

const { initChart, drawXAxis, drawYAxis, createScales } = useD3Base(context)
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

let brushContent, ucl, lcl
ucl = alarmLimit?.ucl
lcl = alarmLimit?.lcl

function drawChart() {
  if (!chartContainer.value) return
  // 清除先前的圖表
  d3.select(chartContainer.value).selectAll('*').remove()
  // 初始化產出svg,xScale,yScale
  // const initObject = initChart()
  // svg = initObject.svg
  // xScale = initObject.xScale
  // yScale = initObject.yScale
  const { svg,innerContent } = initChart()
  const { xScale, yScale } = createScales()

  const brush = createBrush((event) =>
    brushEnd(event, xScale, yScale, () => {
      if (props.hasLine) {
        drawLine({ innerContent, xScale, getYValue: (d) => yScale(d[props.yKey]) })
      }
      drawPoints({
        innerContent,
        xScale,
        getYValue: (d) => yScale(d[props.yKey]),
        ucl,
        lcl,
        onMouseOver: pointMouseOver(svg, innerContent,7),
        onMouseOut: pointMouseOut(innerContent,3),
        onRectMouseOver: legendMouseOver(innerContent),
        onRectMouseOut: legendMouseOut(innerContent),
        onTextMouseOver: legendMouseOver(innerContent),
        onTextMouseOut: legendMouseOut(innerContent)
      })
      drawXAxis(props.xAxisType, props.xAxisSampleRate)
      drawYAxis(null, props.margin.left)
      drawThresholds({ innerContent, getYValue: (d) => yScale(d), slots })
      brushContent.call(brush.move, null)
    })
  )
  brushContent = innerContent.append('g').call(brush)

  // 繪製Title
  svg
    .append('text')
    .attr('x', props.width / 2)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .style('font-weight', 'bold')
    .style('user-select', 'none')
    .text(props.title)

  // 繪製X,Y軸
  drawXAxis(props.xAxisType, props.xAxisSampleRate)
  drawYAxis(null, props.margin.left)
  // 繪製管制線
  drawThresholds({ innerContent, getYValue: (d) => yScale(d), slots })
  // 繪製連線
  if (props.hasLine) {
    drawLine({ innerContent, xScale, getYValue: (d) => yScale(d[props.yKey]) })
  }
  // 繪製點
  drawPoints({
    innerContent,
    xScale,
    getYValue: (d) => yScale(d[props.yKey]),
    pointSize:3,
    ucl,
    lcl,
    onMouseOver: pointMouseOver(svg, innerContent,7),
    onMouseOut: pointMouseOut(innerContent,3),
    onRectMouseOver: legendMouseOver(innerContent),
    onRectMouseOut: legendMouseOut(innerContent),
    onTextMouseOver: legendMouseOver(innerContent),
    onTextMouseOut: legendMouseOut(innerContent)
  })
  // 繪製Legend
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
