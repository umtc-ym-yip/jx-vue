<!-- 要有折線(80/20)/柱狀圖 -->
<!-- 缺點陣列['S1','S1','S2',...] 分母 排算比例 -->
<template>
  <div class="flex">
    <div ref="chartContainer" class="relative">
      <!-- 圖表內容 -->
      <slot
        name="tooltip"
        :show="tooltipShow"
        :data="tooltipData"
        :x="tooltipLoc.x"
        :y="tooltipLoc.y"
        :status="tooltipStatus"
        :setTooltipRef="setTooltipRef"
      >
        <!-- 預設tooltip -->
        <div
          v-if="tooltipShow && tooltipStatus === 'single-bar'"
          ref="tooltip"
          class="absolute bg-white border border-gray-300 rounded p-2.5 text-sm"
          :class="{ 'opacity-0': hiddenTooltip }"
          :style="{ left: `${tooltipLoc.x}px`, top: `${tooltipLoc.y}px` }"
        >
          {{ props.xKey }}: {{ tooltipData[props.xKey] }}<br />
          {{ props.yKey }}: {{ (tooltipData['percentage'] * 100).toFixed(1) + '%' }}
        </div>

        <div
          v-if="tooltipShow && tooltipStatus === 'point'"
          ref="tooltip"
          class="absolute bg-white border border-gray-300 rounded p-2.5 text-sm"
          :class="{ 'opacity-0': hiddenTooltip }"
          :style="{ left: `${tooltipLoc.x}px`, top: `${tooltipLoc.y}px` }"
        >
          {{ props.xKey }}: {{ tooltipData[props.xKey] }}<br />
          {{ props.yKey }}: {{ (tooltipData['cumulativePercentage'] * 100).toFixed(1) + '%' }}
        </div>
      </slot>
    </div>
    <slot name="others"></slot>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, useSlots, watch } from 'vue'
import * as d3 from 'd3'
import { useD3Context } from '@/composables/d3/useD3Context'
import { useD3Base } from '@/composables/d3/useD3Base'
import { useD3Alarm } from '@/composables/d3/useD3Alarm'
import { useD3Element } from '@/composables/d3/useD3Element'
import { useD3Interaction } from '@/composables/d3/useD3Interaction'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  width: {
    type: Number,
    default: 400
  },
  height: {
    type: Number,
    default: 400
  },
  margin: {
    type: Object,
    default: () => ({ top: 20, right: 40, bottom: 120, left: 40 })
  },
  xKey: {
    type: String,
    required: true
  },
  yKey: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  xAxisSampleRate: {
    type: Number,
    default: 1
  },
  xAxisType: {
    type: String,
    default: 'sample'
  },
  xType: {
    type: String,
    default: 'band'
  },
  lineColor: {
    type: String,
    default: 'orange'
  },
  barTextColor: {
    type: String,
    default: 'gray'
  },
  lineTextColor: {
    type: String,
    default: 'orange'
  },
  barColor: {
    type: String,
    default: 'green'
  },
  pointColor: {
    type: String,
    default: 'steelblue'
  }
})
const chartContainer = ref(null)
const slots = useSlots()
const context = useD3Context(props, chartContainer, slots)

const { initChart, drawXAxis, drawTwoYAxis, createScales } = useD3Base(context)
const { drawBars, drawPoints, drawThresholds, drawLine, drawLegend, drawLabel } =
  useD3Element(context)
const { createAlarmLimit } = useD3Alarm()
const alarmLimit = createAlarmLimit(slots)
const {
  tooltip,
  tooltipShow,
  tooltipStatus,
  tooltipLoc,
  tooltipData,
  hiddenTooltip,
  setTooltipRef,
  pointMouseOver,
  pointMouseOut,
  legendMouseOver,
  legendMouseOut,
  barMouseOver,
  barMouseOut
} = useD3Interaction(context)

function drawChart() {
  if (!chartContainer.value) return
  d3.select(chartContainer.value).selectAll('*').remove()
  const { svg, innerContent } = initChart()
  const { xScale, yLeftScale, yRightScale } = createScales({ type: 'two-y' })

  svg
    .append('text')
    .attr('x', props.width / 2)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .style('font-weight', 'bold')
    .style('user-select', 'none')
    .text(props.title)

  // 繪製X,Y軸
  xScale.domain(props.data.map((item) => item.label)) ///重新依照data的label來產生xScale

  // 算出更新後的data 左邊y軸(percentage) 新值
  const newLeftMaxData = Math.max(...props.data.map((item) => item.percentage))

  yLeftScale.domain([0, newLeftMaxData + 0.1])

  drawXAxis(props.xAxisType, props.xAxisSampleRate, xScale)
  drawTwoYAxis(props.margin.left, yLeftScale, yRightScale)
  drawBars({
    innerContent,
    xScale,
    getYValue: (d) => yLeftScale(d),
    barColor: props.barColor,
    onMouseOver: barMouseOver(svg, innerContent),
    onMouseOut: barMouseOut(innerContent),
    data: props.data
  })

  xScale.domain(
    [...props.data]
      .sort((a, b) => a.cumulativePercentage - b.cumulativePercentage)
      .map((item) => item.label)
  )

  drawLine({
    innerContent,
    xScale,
    getYValue: (d) => yRightScale(d['cumulativePercentage']),
    key: null,
    color: props.lineColor,
    data: props.data
  })
  drawPoints({
    innerContent,
    xScale,
    getYValue: (d) => yRightScale(d['cumulativePercentage']),
    color: props.pointColor,
    onMouseOver: pointMouseOver(svg, innerContent, 7),
    onMouseOut: pointMouseOut(innerContent, 3),
    data: props.data
  })
  drawLabel({
    innerContent,
    xScale,
    getYValue: (d) => yRightScale(d['cumulativePercentage']),
    key: 'cumulativePercentage',
    color: props.lineTextColor,
    data: props.data
  })
  drawLabel({
    innerContent,
    xScale,
    getYValue: (d) => yLeftScale(d['percentage']),
    key: 'percentage',
    color: props.barTextColor,
    data: props.data
  })
}

onMounted(() => {
  drawChart()
})
watch(() => props.data, drawChart, { deep: true })
</script>
