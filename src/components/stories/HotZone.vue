<template>
  <div ref="gerberContainer"></div>

  <StoryContainer title="D3HotZone 圖表">
    <StorySection title="基本用法">
      <template #description>
        <p>基本的 D3HotZone 圖表使用示例：</p>
      </template>
      <template #code>
        <pre>
&lt;D3HotZone
  :data="hotZoneData"
  xKey="x"
  yKey="y"
/&gt;
        </pre>
      </template>
      <D3HotZone
        v-if="hotZoneData.length > 0"
        width="600"
        height="450"
        :data="hotZoneData"
        xKey="x"
        yKey="y"
      />
    </StorySection>
    <StorySection title="屬性說明">
      <template #props>
        <StoryList>
          <li>
            <span class="font-semibold">data:</span>
            圖表數據，必須是一個對象數組。每個對象應包含以下屬性:
            <ul class="mt-2 ml-4">
              <li><code>x</code>: X 軸的值 (數字或字符串)</li>
              <li><code>y</code>: Y 軸的值 (數字或字符串)</li>
              <li><code>value</code>: 該點的數量或強度 (數字)</li>
            </ul>
            例如: <code>[{ x: 1, y: 2, value: 5 }, { x: 2, y: 3, value: 10 }, ...]</code>
          </li>
          <li><span class="font-semibold">xKey:</span> X 軸對應的數據鍵名，默認為 'x'</li>
          <li><span class="font-semibold">yKey:</span> Y 軸對應的數據鍵名，默認為 'y'</li>
          <li><span class="font-semibold">width:</span> 圖表寬度，默認為 500</li>
          <li><span class="font-semibold">height:</span> 圖表高度，默認為 400</li>
          <li>
            <span class="font-semibold">margin:</span> 圖表邊距，默認為 { left: 40, right: 80, top:
            40, bottom: 40 }
          </li>
          <li><span class="font-semibold">xType:</span> X 軸類型，默認為 'band'</li>
          <li><span class="font-semibold">chartType:</span> 圖表類型，默認為 'hot-zone'</li>
        </StoryList>
      </template>
    </StorySection>
    <StorySection title="自定義尺寸">
      <template #description>
        <p>自定義 D3HotZone 圖表的寬度和高度：</p>
      </template>
      <template #code>
        <pre>
&lt;D3HotZone
  :data="hotZoneData"
  xKey="x"
  yKey="y"
  :width="600"
  :height="450"
/&gt;
        </pre>
      </template>
      <D3HotZone
        v-if="hotZoneData2.length > 0"
        :data="hotZoneData2"
        xKey="x"
        yKey="y"
        width="600"
        height="450"
      />
    </StorySection>

    <StorySection title="自定義 Tooltip">
      <template #description>
        <p>使用 <code>#tooltip</code> 插槽自定義懸浮提示的內容：</p>
      </template>
      <template #code>
        <pre>
&lt;D3HotZone
  :data="hotZoneData"
  xKey="x"
  yKey="y"
&gt;
  &lt;template #tooltip="{ show, data, x, y, setTooltipRef }"&gt;
    &lt;div
      v-if="show"
      :ref="setTooltipRef"
      class="absolute p-3 text-sm bg-white border border-gray-300 rounded-md shadow-md"
      :style="{ left: `${x}px`, top: `${y}px` }"
    &gt;
      &lt;h3 class="mb-2 text-lg font-bold"&gt;自定義 Tooltip&lt;/h3&gt;
      &lt;p class="mb-1"&gt;X: { data.x }, Y: { data.y }&lt;/p&gt;
      &lt;p&gt;value: { data.value }&lt;/p&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/D3HotZone&gt;
        </pre>
      </template>
      <D3HotZone v-if="hotZoneData.length > 0" :data="hotZoneData" xKey="x" yKey="y">
        <template #tooltip="{ show, data, x, y, setTooltipRef }">
          <div
            v-if="show"
            :ref="setTooltipRef"
            class="absolute p-3 text-sm bg-white border border-gray-300 rounded-md shadow-md"
            :style="{ left: `${x}px`, top: `${y}px` }"
          >
            <h3 class="mb-2 text-lg font-bold">自定義 Tooltip</h3>
            <p class="mb-1">X: {{ data.x }}, Y: {{ data.y }}</p>
            <p>value: {{ data.value }}</p>
          </div>
        </template>
      </D3HotZone>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
import * as d3 from 'd3'
import axios from 'axios'

import { ref, onMounted } from 'vue'
import D3HotZone from '@/components/d3/D3HotZone.vue'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryList from './StoryList.vue'

function generateData() {
  const result = []
  const usedCoordinates = new Set()

  for (let x = 1; x <= 12; x++) {
    for (let y = 1; y <= 10; y++) {
      const coordinate = `${x},${y}`
      if (!usedCoordinates.has(coordinate)) {
        result.push({ x, y, value: 0 })
        usedCoordinates.add(coordinate)
      }
    }
  }

  const numberOfOnes = Math.floor(result.length * 0.5)
  for (let i = 0; i < numberOfOnes; i++) {
    const randomIndex = Math.floor(Math.random() * result.length)
    result[randomIndex].value += 1
  }

  return result
}

const hotZoneData = ref([])
const hotZoneData2 = ref([])

onMounted(async () => {
  hotZoneData.value = generateData()
  hotZoneData2.value = generateData()
})
</script>
