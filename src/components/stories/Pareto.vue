<template>
  <StoryContainer title="Pareto 圖表">
    <StorySection title="屬性說明">
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
    </StorySection>

    <StorySection title="基本用法">
      <template #description>
        <p>基本的 Pareto 圖表使用示例：</p>
      </template>
      <template #code>
          <pre>
          &lt;D3Pareto
  :data="paretoData"
  :xKey="label"
  yKey="percentage"
  title="基本 Pareto 圖表"
  &gt;
</pre>
      </template>
      <D3Pareto
        :data="paretoData"
        :xKey="'label'"
        yKey="percentage"
        title="基本 Pareto 圖表"
      />
    </StorySection>

    <StorySection title="自定義 'Others' 閾值">
      <template #description>
        <p>使用 <code>JxInput</code> 組件來設置 "Others" 類別的閾值：</p>
      </template>
      <template #code>
        <pre>
&lt;D3Pareto
  :data="paretoData"
  :xKey="'label'"
  yKey="percentage"
  title="自定義 'Others' 閾值的 Pareto 圖表"
&gt;
  &lt;template #others&gt;
    &lt;JxInput
      v-model="combineValue"
      type="number"
      :min="0"
      :max="1"
      :step="0.01"
    /&gt;
  &lt;/template&gt;
&lt;/D3Pareto&gt;
        </pre>
      </template>
      <D3Pareto
        :data="paretoData"
        :xKey="'label'"
        yKey="percentage"
        title="自定義 'Others' 閾值的 Pareto 圖表"
      >
        <template #others>
          <JxInput
            v-model="combineValue"
            type="number"
            :min="0"
            :max="1"
            :step="0.01"
          />
        </template>
      </D3Pareto>
    </StorySection>

    <StorySection title="自定義 Tooltip">
      <template #description>
        <p>使用 <code>#tooltip</code> 插槽和 <code>D3Tooltip</code> 組件自定義懸浮提示的內容：</p>
        <p class="mt-2">
          <strong>D3Tooltip 組件數據流原理：</strong>
        </p>
        <ol class="list-decimal list-inside ml-4">
          <li>D3Pareto 組件在檢測到懸停事件時，會收集相關數據。</li>
          <li>這些數據通過 <code>tooltipProps</code> 傳遞給 tooltip 插槽。</li>
          <li>在插槽中，我們將 <code>tooltipProps</code> 綁定到 D3Tooltip 組件。</li>
          <li>D3Tooltip 組件處理定位邏輯，並通過默認插槽將數據傳遞給自定義內容。</li>
          <li>在自定義內容中，我們可以訪問 <code>data</code> 和 <code>status</code> 等屬性來渲染所需信息。</li>
        </ol>
      </template>
      <template #code>
        <pre>
&lt;D3Pareto
  :data="paretoData"
  :xKey="'label'"
  yKey="percentage"
  title="自定義 Tooltip 的 Pareto 圖表"
&gt;
  &lt;template #tooltip="tooltipProps"&gt;
    &lt;D3Tooltip v-bind="tooltipProps"&gt;
      &lt;template #default="{ data, status }"&gt;
        &lt;template v-if="status === 'point'"&gt;
          &lt;h3&gt;{ data.label }&lt;/h3&gt;
          &lt;p&gt;累積百分比: { (data.cumulativePercentage * 100).toFixed(2) }%&lt;/p&gt;
        &lt;/template&gt;
        &lt;template v-if="status === 'single-bar'"&gt;
          &lt;h3&gt;{ data.label }&lt;/h3&gt;
          &lt;p&gt;百分比: { (data.percentage * 100).toFixed(2) }%&lt;/p&gt;
        &lt;/template&gt;
      &lt;/template&gt;
    &lt;/D3Tooltip&gt;
  &lt;/template&gt;
&lt;/D3Pareto&gt;
        </pre>
      </template>
      <D3Pareto
        :data="paretoData"
        :xKey="'label'"
        yKey="percentage"
        title="自定義 Tooltip 的 Pareto 圖表"
      >
        <template #tooltip="tooltipProps">
          <D3Tooltip v-bind="tooltipProps">
            <template #default="{ data, status }">
              <template v-if="status === 'point'">
                <h3>{{ data.label }}</h3>
                <p>累積百分比: {{ (data.cumulativePercentage * 100).toFixed(2) }}%</p>
              </template>
              <template v-if="status === 'single-bar'">
                <h3>{{ data.label }}</h3>
                <p>百分比: {{ (data.percentage * 100).toFixed(2) }}%</p>
              </template>
            </template>
          </D3Tooltip>
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
import D3Tooltip from '@/components/d3/D3Tooltip.vue'

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