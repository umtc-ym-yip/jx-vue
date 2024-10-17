<!-- 要做一個table mapping 並且有數據點在上方 觸碰點會出現預設Tooltip，也可以自定義顯示照片 -->
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, useSlots } from 'vue'
import * as d3 from 'd3'

import { useD3Context } from '@/composables/d3/useD3Context'
import { useD3Base } from '@/composables/d3/useD3Base'
import { useD3Element } from '@/composables/d3/useD3Element'
import { useD3Interaction } from '@/composables/d3/useD3Interaction'

//只需要data

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  xKey: {
    type: String,
    default: 'x'
  },
  yKey: {
    type: String,
    default: 'y'
  },
  width: {
    type: [Number, String],
    default: 500
  },
  height: {
    type: [Number, String],
    default: 400
  },
  margin: {
    type: Object,
    default: () => ({ left: 40, right: 80, top: 40, bottom: 40 })
  },
  xType: {
    type: String,
    default: 'band'
  },
  chartType: {
    type: String,
    default: 'hot-zone'
  }
})

const chartContainer = ref(null)
const slots = useSlots()
const context = useD3Context(props, chartContainer, slots)

const { initChart, drawXAxis, drawYAxis, createScales } = useD3Base(context)
const { drawHotZone, drawHotZoneLegend, drawHotZoneText } = useD3Element(context)

const { tooltip, tooltipShow, tooltipLoc, tooltipData, hiddenTooltip, setTooltipRef } =
  useD3Interaction(context)

// 補上rect mouseover 事件
function drawChart() {
  if (!chartContainer.value) return
  d3.select(chartContainer.value).selectAll('*').remove()

  const { svg, innerContent } = initChart()

  const { xScale, yScale } = createScales({
    left: props.margin.left,
    right: props.margin.right,
    top: props.margin.top,
    bottom: props.margin.bottom,
    type: 'hot-zone'
  })

  drawXAxis('hot-zone', null, xScale)
  drawYAxis('hot-zone', props.margin.left, yScale)

  drawHotZone({
    innerContent,
    xScale,
    yScale
  })
  drawHotZoneLegend({
    svg
  })
  drawHotZoneText({ innerContent, xScale, yScale })
}
onMounted(() => {
  drawChart()
})
watch(() => props.data, drawChart, { deep: true })
</script>
