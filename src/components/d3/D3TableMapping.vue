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
    <slot name="thresholds"></slot>
    <div class="absolute top-0 right-0" v-if="resetBtnShow">
      <JxButton size="sm" color="secondary" :is-outline="true" @click="reset">Reset</JxButton>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, useSlots } from 'vue'
import * as d3 from 'd3'
import JxButton from '@/components/JxButton.vue'

import { useD3Context } from '@/composables/d3/useD3Context'
import { useD3Base } from '@/composables/d3/useD3Base'
import { useD3Element } from '@/composables/d3/useD3Element'
import { useD3Interaction } from '@/composables/d3/useD3Interaction'
import { useZoom } from '@/composables/d3/useD3Zoom'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  layoutData: {
    type: Array,
    required: true
  },
  width: {
    type: Number,
    default: 800
  },
  height: {
    type: Number,
    default: 600
  },
  margin: {
    type: Object,
    default: () => ({ top: 20, right: 20, bottom: 40, left: 40 })
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
  },
  xType: {
    type: String,
    default: 'linear'
  }
})
const chartContainer = ref(null)
const slots = useSlots()
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

let brushContent

function drawChart() {
  if (!chartContainer.value) return
  // 清除先前的圖表
  d3.select(chartContainer.value).selectAll('*').remove()
  // 初始化產出svg,xScale,yScale
  const { svg } = initChart()
  const { xScale, yScale } = createScales({ left: 0, right: 515, top: 0, bottom: 510 })

  // 在SVG加上遮罩
  const innerContent = svg.append('g').attr('clip-path', 'url(#clipPath)')

  const brush = createBrush((event) =>
    brushEnd(event, xScale, yScale, () => {
      if (props.hasLine) {
        drawLine({ innerContent, xScale, yScale })
      }
      innerContent.selectAll('path').remove()
      innerContent
        .selectAll(`layout-path`)
        .data(props.layoutData)
        .enter()
        .append('path')
        .attr('d', (d) => line(d))
        .attr('stroke', 'rgba(0,0,0,0.2)')
        .attr('fill', 'none')
      drawPoints({
        innerContent,
        xScale,
        yScale,
        onMouseOver: pointMouseOver(svg),
        onMouseOut: pointMouseOut(),
        onRectMouseOver: legendMouseOver(),
        onRectMouseOut: legendMouseOut(),
        onTextMouseOver: legendMouseOver(),
        onTextMouseOut: legendMouseOut()
      })
      drawXAxis(props.xAxisType, props.xAxisSampleRate)
      drawYAxis(null, props.margin.left)
      brushContent.call(brush.move, null)
    })
  )
  brushContent = innerContent.append('g').call(brush)

  drawXAxis('table-mapping', null)
  drawYAxis('table-mapping', props.margin.left)

  const line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))

  innerContent
    .selectAll(`layout-path`)
    .data(props.layoutData)
    .enter()
    .append('path')
    .attr('d', (d) => line(d))
    .attr('stroke', 'rgba(0,0,0,0.2)')
    .attr('fill', 'none')

  drawPoints({
    chartType: 'table-mapping',
    innerContent,
    xScale,
    yScale,
    onMouseOver: pointMouseOver(svg),
    onMouseOut: pointMouseOut(),
    onRectMouseOver: legendMouseOver(),
    onRectMouseOut: legendMouseOut(),
    onTextMouseOver: legendMouseOver(),
    onTextMouseOut: legendMouseOut()
  })
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
