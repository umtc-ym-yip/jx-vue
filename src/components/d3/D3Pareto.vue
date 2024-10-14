<!-- 要有折線(80/20)/柱狀圖 -->
<!-- 缺點陣列['S1','S1','S2',...] 分母 排算比例 -->
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
    default: 500
  },
  height: {
    type: Number,
    default: 300
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
  combineValue: {
    type: [Number, String],
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
  }
})
const chartContainer = ref(null)
const slots = useSlots()
const context = useD3Context(props, chartContainer, slots)

const { initChart, drawXAxis, drawTwoYAxis, createScales } = useD3Base(context)
const { drawBars, drawPoints, drawThresholds, drawLine, drawLegend } = useD3Element(context)
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
  drawXAxis(props.xAxisType, props.xAxisSampleRate)
  drawTwoYAxis(props.margin.left)
  drawBars({
    innerContent,
    xScale,
    getYValue: (d) => yLeftScale(d),
    onMouseOver: barMouseOver(svg, innerContent),
    onMouseOut: barMouseOut(innerContent)
  })
  drawLine({
    innerContent,
    xScale,
    getYValue: (d) => yRightScale(d)
  })
  drawPoints({
    innerContent,
    xScale,
    getYValue: (d) => yRightScale(d),
    onMouseOver: pointMouseOver(svg, innerContent),
    onMouseOut: pointMouseOut(innerContent)
  })
}

onMounted(() => {
  drawChart()
})
watch(() => props.data, drawChart, { deep: true })
</script>
