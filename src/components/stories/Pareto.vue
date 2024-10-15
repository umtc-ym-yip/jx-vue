<template>
  <StoryContainer title="D3Pareto 元件">
    <StorySection title="基本用法">
      <template #description>
        D3Pareto 是一個基於 D3.js
        的Pareto元件，用於展示數據的分佈情況和累積百分比。它結合了柱狀圖和折線圖，能夠直觀地顯示各類別的佔比及其累積效應。
      </template>

      <template #usage>
        使用 <StoryCode>data</StoryCode>, <StoryCode>xKey</StoryCode>, <StoryCode>yKey</StoryCode>,
        屬性來設置圖表的數據和主要參數。
      </template>

      <template #props>
        <StoryList>
          <li><span class="font-semibold">data:</span> 圖表數據，必須是一個對象數組</li>
          <li><span class="font-semibold">xKey:</span> X 軸對應的數據鍵名</li>
          <li><span class="font-semibold">yKey:</span> Y 軸對應的數據鍵名</li>
          <li><span class="font-semibold">width:</span> 圖表寬度，默認為 500</li>
          <li><span class="font-semibold">height:</span> 圖表高度，默認為 300</li>
          <li>
            <span class="font-semibold">margin:</span> 圖表邊距，默認為 { top: 20, right: 40,
            bottom: 120, left: 40 }
          </li>
          <li><span class="font-semibold">title:</span> 圖表標題</li>
          <li><span class="font-semibold">xAxisSampleRate:</span> X 軸標籤採樣率，默認為 1</li>
          <li><span class="font-semibold">xAxisType:</span> X 軸標籤類型，默認為 'sample'</li>
          <li><span class="font-semibold">xType:</span> X 軸類型，默認為 'band'</li>
          <li><span class="font-semibold">lineColor:</span> 折線顏色，默認為 'orange'</li>
          <li><span class="font-semibold">barColor:</span> 柱狀圖顏色，默認為 'green'</li>
          <li><span class="font-semibold">pointColor:</span> 數據點顏色，默認為 'steelblue'</li>
          <li><span class="font-semibold">barTextColor:</span> 柱狀圖文字顏色，默認為 'gray'</li>
          <li><span class="font-semibold">lineTextColor:</span> 折線文字顏色，默認為 'orange'</li>
        </StoryList>
      </template>

      <template #code>
        <pre>
&lt;D3Pareto
  :data="paretoData"
  xKey="label"
  yKey="percentage"

  title="Pareto分析圖"
  :width="800"
  :height="400"
  x-axis-type="rotate"
  :x-axis-sample-rate="1"
&gt;
&lt;/D3Pareto&gt;
        </pre>
      </template>
      <D3Pareto
        :data="paretoData"
        xKey="label"
        yKey="percentage"
        title="Pareto分析圖"
        :width="800"
        :height="400"
        x-axis-type="rotate"
      />
    </StorySection>

    <StorySection title="自定義 Tooltip">
      <template #description>
        D3Pareto 允許您使用 <StoryCode>tooltip</StoryCode> 插槽來自定義懸浮提示的內容和樣式。
      </template>

      <template #usage>
        使用 <StoryCode>#tooltip</StoryCode> 插槽來定義自定義的 tooltip 內容。
        插槽提供了當前數據點的信息，包括顯示狀態、數據、位置等。
      </template>

      <template #code>
        <pre>
&lt;D3Pareto
  :data="paretoData"
  xKey="label"
  yKey="percentage"

  title="Pareto分析圖（自定義 Tooltip）"
  :width="800"
  :height="400"
&gt;
  &lt;template #tooltip="{ show, data, x, y, setTooltipRef }"&gt;
    &lt;div
      v-if="show"
      :ref="setTooltipRef"
      class="absolute bg-white border border-gray-300 rounded p-2.5 text-sm"
      :style="{ left: `${x}px`, top: `${y}px` }"
    &gt;
      &lt;h3 class="font-bold"&gt;{ data.label }&lt;/h3&gt;
      &lt;p&gt;百分比: { (data.percentage * 100).toFixed(2) }%&lt;/p&gt;
      &lt;p&gt;累積百分比: { (data.cumulativePercentage * 100).toFixed(2) }%&lt;/p&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/D3Pareto&gt;
        </pre>
      </template>

      <D3Pareto
        :data="paretoData"
        xKey="label"
        yKey="percentage"
        title="Pareto分析圖（自定義 Tooltip）"
        :width="400"
        :height="400"
      >
        <template #tooltip="{ show, data, x, y, setTooltipRef }">
          <div
            v-if="show"
            :ref="setTooltipRef"
            class="absolute bg-white border border-gray-300 rounded p-2.5 text-sm"
            :style="{ left: `${x}px`, top: `${y}px` }"
          >
            <h3 class="font-bold">{{ data.label }}</h3>
            <p>百分比: {{ (data.percentage * 100).toFixed(2) }}%</p>
            <p>累積百分比: {{ (data.cumulativePercentage * 100).toFixed(2) }}%</p>
          </div>
        </template>
      </D3Pareto>
    </StorySection>
    <StorySection title="自訂義 Others項合併值">
      <template #description>
        D3Pareto 允許您使用 <StoryCode>combineValue</StoryCode> 屬性來自定義 Others 項的合併值。
      </template>

      <template #usage>
        使用 <StoryCode>combineValue</StoryCode> 屬性來設置 Others 項的合併值。
      </template>

      <template #code>
        <pre>
&lt;D3Pareto
  :data="paretoData"
  xKey="label"
  yKey="percentage"
&gt;
&lt;/D3Pareto&gt;
        </pre>
      </template>
      <D3Pareto :data="paretoData" xKey="label" yKey="percentage">
        <template #others>
          <JxInput
            class="w-1/12"
            id="text"
            label=" "
            type="number"
            placeholder=" "
            v-model="combineValue"
          />
        </template>
      </D3Pareto>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { processParetoData } from '@/utils/d3/paretoDataProcessor'
import D3Pareto from '@/components/d3/D3Pareto.vue'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryCode from './StoryCode.vue'
import StoryList from './StoryList.vue'
import JxInput from '@/components/JxInput.vue'
// 假設這是您的原始數據
const rawData = ref(generateTestData())
const xKey = ref('Classify')
const rawCombineValue = ref(0.8)
const combineValue = computed({
  get: () => rawCombineValue.value,
  set: (value) => {
    const numValue = Number(value)
    if (!isNaN(numValue)) {
      rawCombineValue.value = Math.min(Math.max(Number(numValue.toFixed(2)), 0), 1)
    }
  }
})

function generateTestData(count = 50) {
  const classifications = ['S1', 'S2', 'S3', 'S4', 'S5']
  const data = []

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * classifications.length)
    data.push({ Classify: classifications[randomIndex] })
  }

  return data
}

// 使用 processParetoData 函數處理數據
const paretoData = computed(() => processParetoData(rawData.value, xKey.value, combineValue.value))
</script>
