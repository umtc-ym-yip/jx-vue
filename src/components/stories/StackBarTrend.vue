<template>
  <StoryContainer title="D3StackBarTrend 元件">
    <StorySection title="基本用法">
      <template #description>
        D3StackBarTrend 是一個基於 D3.js
        的堆疊柱狀圖趨勢元件，用於展示多個缺陷類型隨時間變化的趨勢，同時顯示良率趨勢線。
      </template>

      <template #usage>
        使用 <StoryCode>data</StoryCode>, <StoryCode>xKey</StoryCode>, <StoryCode>yKey</StoryCode>,
        和 <StoryCode>seriesKeyArray</StoryCode>
        屬性來設置圖表的數據和軸。
      </template>

      <template #props>
        <StoryList>
          <li><span class="font-semibold">data:</span> 圖表數據，必須是一個對象數組</li>
          <li><span class="font-semibold">xKey:</span> X 軸對應的數據鍵名（通常是 'Time'）</li>
          <li><span class="font-semibold">yKey:</span> Y 軸對應的數據鍵名（通常是 'Yield'）</li>
          <li><span class="font-semibold">seriesKeyArray:</span> 堆疊系列的鍵名數組（缺陷類型）</li>
          <li><span class="font-semibold">width:</span> 圖表寬度，默認為 1000</li>
          <li><span class="font-semibold">height:</span> 圖表高度，默認為 300</li>
          <li>
            <span class="font-semibold">margin:</span> 圖表邊距，默認為 { top: 20, right: 60,
            bottom: 120, left: 60 }
          </li>
          <li><span class="font-semibold">xType:</span> X 軸類型，默認為 'band'</li>
          <li><span class="font-semibold">xAxisSampleRate:</span> X 軸標籤採樣率，默認為 1</li>
          <li><span class="font-semibold">xAxisType:</span> X 軸標籤類型，默認為 'sample'</li>
          <li><span class="font-semibold">title:</span> 圖表標題</li>
        </StoryList>
      </template>

      <template #notes>
        <h3 class="text-lg font-bold mb-2">數據格式規範：</h3>
        <p class="mb-2"><strong>data 格式：</strong></p>
        <pre class="bg-gray-100 p-2 rounded">
[
  {
    A1: null,
    A2: null,
    A5: null,
    A6: null,
    A7: null,
    A8: null,
    A9: null,
    A10: null,
    A12: null,
    A13: null,
    A16: null,
    A17: null,
    A18: null,
    A19: null,
    A20: null,
    A21: null,
    A22: null,
    A41: null,
    A71: null,
    B4: null,
    J6: null,
    LayerCount: null,
    LotNum: '243QE001-01-02',
    LotType: 'E3_實驗3',
    O1: null,
    O8: null,
    O10: null,
    O52: null,
    P2: null,
    P3: null,
    PN: '3273187',
    Remark: '',
    S2: null,
    S9: '0.0093',
    S10: null,
    S11: null,
    S12: null,
    S13: null,
    S14: null,
    S15: null,
    S21: null,
    Time: '2024-08-08T11:11:45.000Z',
    Top1: '0.0093',
    Top2: null,
    Top3: null,
    Top_1: 'S9',
    Top_2: null,
    Top_3: null,
    ULMark94V: null,
    Yield: '0.9907',
    sf_link: null
  },
  // ... 更多數據項
]
        </pre>
        <p class="mt-2 mb-2"><strong>seriesKeyArray 格式：</strong></p>
        <pre class="bg-gray-100 p-2 rounded">
['A1', 'A2', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10',...]
        </pre>
        <p class="mt-2">
          seriesKeyArray 定義了堆疊的順序，應包含所有要顯示的缺陷類型鍵名。
          這個數組決定了堆疊的順序、圖例的順序和顏色分配。
        </p>
      </template>

      <template #code>
        <pre>
&lt;D3StackBarTrend
  :data="data"
  xKey="LotNum"
  yKey="Yield"
  :series-key-array="seriesKeyArray"
  title="缺陷趨勢分析"
  :width="800"
  :height="400"
  x-axis-type="rotate"
  :x-axis-sample-rate="1"
&gt;
&lt;/D3StackBarTrend&gt;
        </pre>
      </template>

      <D3StackBarTrend
        v-if="dataLoaded"
        :data="data"
        xKey="LotNum"
        yKey="Yield"
        :series-key-array="seriesKeyArray"
        title="缺陷趨勢分析"
        :width="800"
        :height="400"
        x-axis-type="rotate"
        :x-axis-sample-rate="1"
      >
      </D3StackBarTrend>
    </StorySection>

    <StorySection title="自定義 Tooltip">
      <template #description>
        D3StackBarTrend 允許您使用 <StoryCode>tooltip</StoryCode> 插槽來自定義懸浮提示的內容和樣式。
      </template>

      <template #usage>
        使用 <StoryCode>#tooltip</StoryCode> 插槽來定義自定義的 tooltip 內容。
        插槽提供了當前數據點的信息，包括堆疊數據和良率數據。
      </template>

      <template #code>
        <pre>
&lt;D3StackBarTrend
  :data="data"
  xKey="LotNum"
  yKey="Yield"
  :series-key-array="seriesKeyArray"
  title="缺陷趨勢分析（自定義 Tooltip）"
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
      &lt;h3 class="font-bold"&gt;{ new Date(data.Time).toLocaleDateString() }&lt;/h3&gt;
      &lt;p&gt;良率: { (parseFloat(data.Yield) * 100).toFixed(2) }%&lt;/p&gt;
      &lt;p&gt;批號: { data.LotNum }&lt;/p&gt;
      &lt;p&gt;批次類型: { data.LotType }&lt;/p&gt;
      &lt;p v-for="key in ['Top1', 'Top2', 'Top3']" :key="key" v-if="data[key]"&gt;
        { key }: { data[`Top_${key.slice(-1)}`] } ({
            (parseFloat(data[key]) * 100).toFixed(2)
          }%)
      &lt;/p&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/D3StackBarTrend&gt;
        </pre>
      </template>

      <template #notes>
        記得使用 setTooltipRef 來設置 tooltip 的 ref，以便內部計算是否超出邊界並做方向轉換。
      </template>

      <D3StackBarTrend
        v-if="dataLoaded"
        :data="data"
        xKey="LotNum"
        yKey="Yield"
        :series-key-array="seriesKeyArray"
        title="缺陷趨勢分析（自定義 Tooltip）"
        :width="800"
        :height="400"
      >
        <template #tooltip="{ show, data, x, y, setTooltipRef }">
          <div
            v-if="show"
            :ref="setTooltipRef"
            class="absolute bg-white border border-gray-300 rounded p-2.5 text-sm"
            :style="{ left: `${x}px`, top: `${y}px` }"
          >
            <h3 class="font-bold">{{ new Date(data.Time).toLocaleDateString() }}</h3>
            <p>良率: {{ (parseFloat(data.Yield) * 100).toFixed(2) }}%</p>
            <p>批號: {{ data.LotNum }}</p>
            <p>批次類型: {{ data.LotType }}</p>
            <p v-for="key in ['Top1', 'Top2', 'Top3']" :key="key">
              {{ key }}: {{ data[`Top_${key.slice(-1)}`] }} ({{
                (parseFloat(data[key]) * 100).toFixed(2)
              }}%)
            </p>
          </div>
        </template>
      </D3StackBarTrend>
    </StorySection>

    <StorySection title="添加閾值線">
      <template #description>
        D3StackBarTrend 允許您使用 <StoryCode>thresholds</StoryCode> 插槽來添加自定義的閾值線，例如目標線或警戒線。
      </template>

      <template #usage>
        使用 <StoryCode>#thresholds</StoryCode> 插槽來定義閾值線。您可以添加多個 <StoryCode>threshold</StoryCode> 組件來顯示不同的閾值線。
      </template>

      <template #code>
        <pre>
&lt;D3StackBarTrend
  :data="data"
  xKey="LotNum"
  yKey="Yield"
  :series-key-array="seriesKeyArray"
  title="缺陷趨勢分析（帶閾值線）"
  :width="800"
  :height="400"
&gt;
  &lt;template #thresholds&gt;
    &lt;threshold :value="0.99" label="Target" color="green" /&gt;
    &lt;threshold :value="0.95" label="Trigger" color="red" strokeType="dashed" /&gt;
  &lt;/template&gt;
&lt;/D3StackBarTrend&gt;
        </pre>
      </template>

      <template #notes>
        <p>閾值線的屬性說明：</p>
        <StoryList>
          <li><span class="font-semibold">value:</span> 閾值的數值</li>
          <li><span class="font-semibold">label:</span> 閾值線的標籤文字</li>
          <li><span class="font-semibold">color:</span> 閾值線的顏色</li>
          <li><span class="font-semibold">strokeType:</span> 線條類型，可以是 'solid'（實線）或 'dashed'（虛線）</li>
        </StoryList>
      </template>

      <D3StackBarTrend
        v-if="dataLoaded"
        :data="data"
        xKey="LotNum"
        yKey="Yield"
        :series-key-array="seriesKeyArray"
        title="缺陷趨勢分析（帶閾值線）"
        :width="800"
        :height="400"
      >
        <template #thresholds>
          <threshold :value="0.99" label="Target" color="green" />
          <threshold :value="0.95" label="Trigger" color="red" strokeType="dashed" />
        </template>   
                    
      </D3StackBarTrend>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import D3StackBarTrend from '@/components/d3/D3StackBarTrend.vue'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryCode from './StoryCode.vue'
import StoryList from './StoryList.vue'


const data = ref([
  {
    A1: null,
    A2: null,
    A5: null,
    A6: null,
    A7: null,
    A8: null,
    A9: null,
    A10: null,
    A12: null,
    A13: null,
    A16: null,
    A17: null,
    A18: null,
    A19: null,
    A20: null,
    A21: null,
    A22: null,
    A41: null,
    A71: null,
    B4: null,
    J6: null,
    LayerCount: null,
    LotNum: '243QE001-01-02',
    LotType: 'E3_實驗3',
    O1: null,
    O8: null,
    O10: null,
    O52: null,
    P2: null,
    P3: null,
    PN: '3273187',
    Remark: '',
    S2: null,
    S9: '0.0093',
    S10: null,
    S11: null,
    S12: null,
    S13: null,
    S14: null,
    S15: null,
    S21: null,
    Time: '2024-08-08T11:11:45.000Z',
    Top1: '0.0093',
    Top2: null,
    Top3: null,
    Top_1: 'S9',
    Top_2: null,
    Top_3: null,
    ULMark94V: null,
    Yield: '0.9907',
    sf_link: null
  },
  {
    A1: null,
    A2: null,
    A5: null,
    A6: null,
    A7: null,
    A8: null,
    A9: null,
    A10: null,
    A12: null,
    A13: null,
    A16: null,
    A17: null,
    A18: '0.0104',
    A19: null,
    A20: null,
    A21: null,
    A22: null,
    A41: null,
    A71: null,
    B4: null,
    J6: null,
    LayerCount: null,
    LotNum: '243QE001-01-00',
    LotType: 'R3_研發不可出貨批',
    O1: null,
    O8: null,
    O10: null,
    O52: null,
    P2: null,
    P3: null,
    PN: '3273187',
    Remark: '',
    S2: null,
    S9: null,
    S10: null,
    S11: '0.0035',
    S12: null,
    S13: null,
    S14: null,
    S15: null,
    S21: null,
    Time: '2024-08-11T16:53:21.000Z',
    Top1: '0.0104',
    Top2: '0.0035',
    Top3: null,
    Top_1: 'A18',
    Top_2: 'S11',
    Top_3: null,
    ULMark94V: null,
    Yield: '0.9861',
    sf_link: null
  },
  {
    A1: '0.0208',
    A2: null,
    A5: null,
    A6: null,
    A7: null,
    A8: null,
    A9: null,
    A10: null,
    A12: null,
    A13: null,
    A16: null,
    A17: null,
    A18: null,
    A19: null,
    A20: null,
    A21: null,
    A22: null,
    A41: null,
    A71: null,
    B4: null,
    J6: null,
    LayerCount: null,
    LotNum: '243QE001-01-04',
    LotType: 'E3_實驗3',
    O1: null,
    O8: null,
    O10: null,
    O52: null,
    P2: null,
    P3: null,
    PN: '3273187',
    Remark: '',
    S2: null,
    S9: '0.0139',
    S10: '0.0069',
    S11: null,
    S12: null,
    S13: null,
    S14: null,
    S15: null,
    S21: null,
    Time: '2024-09-27T02:43:56.000Z',
    Top1: '0.0208',
    Top2: '0.0139',
    Top3: '0.0069',
    Top_1: 'A1',
    Top_2: 'S9',
    Top_3: 'S10',
    ULMark94V: null,
    Yield: '0.9584',
    sf_link: null
  },
  {
    A1: null,
    A2: null,
    A5: null,
    A6: null,
    A7: null,
    A8: null,
    A9: null,
    A10: null,
    A12: null,
    A13: null,
    A16: null,
    A17: null,
    A18: null,
    A19: null,
    A20: null,
    A21: '0.0012',
    A22: null,
    A41: null,
    A71: null,
    B4: null,
    J6: null,
    LayerCount: null,
    LotNum: '245GE001-01-00',
    LotType: 'S1_樣品1',
    O1: null,
    O8: null,
    O10: null,
    O52: null,
    P2: null,
    P3: null,
    PN: '3273187',
    Remark: '',
    S2: null,
    S9: null,
    S10: null,
    S11: '0.0012',
    S12: null,
    S13: null,
    S14: null,
    S15: null,
    S21: null,
    Time: '2024-10-10T11:34:20.000Z',
    Top1: '0.0012',
    Top2: '0.0012',
    Top3: null,
    Top_1: 'A21',
    Top_2: 'S11',
    Top_3: null,
    ULMark94V: null,
    Yield: '0.9976',
    sf_link: null
  },
  {
    A1: null,
    A2: null,
    A5: null,
    A6: null,
    A7: null,
    A8: null,
    A9: null,
    A10: null,
    A12: null,
    A13: null,
    A16: null,
    A17: null,
    A18: '0.0058',
    A19: null,
    A20: null,
    A21: null,
    A22: null,
    A41: null,
    A71: null,
    B4: null,
    J6: null,
    LayerCount: null,
    LotNum: '247TE015-01-00',
    LotType: 'S1_樣品1',
    O1: null,
    O8: null,
    O10: null,
    O52: null,
    P2: null,
    P3: null,
    PN: '3273187',
    Remark: '',
    S2: null,
    S9: null,
    S10: null,
    S11: '0.0006',
    S12: null,
    S13: null,
    S14: null,
    S15: null,
    S21: null,
    Time: '2024-10-10T23:00:04.000Z',
    Top1: '0.0058',
    Top2: '0.0006',
    Top3: null,
    Top_1: 'A18',
    Top_2: 'S11',
    Top_3: null,
    ULMark94V: null,
    Yield: '0.9936',
    sf_link: null
  },
  // 以下是新生成的15筆數據
  {
    A1: null,
    A2: '0.0075',
    A5: null,
    A6: null,
    A7: null,
    A8: null,
    A9: null,
    A10: null,
    A12: null,
    A13: null,
    A16: null,
    A17: null,
    A18: '0.0032',
    A19: null,
    A20: null,
    A21: null,
    A22: null,
    A41: null,
    A71: null,
    B4: null,
    J6: null,
    LayerCount: null,
    LotNum: '248TE016-01-00',
    LotType: 'S1_樣品1',
    O1: null,
    O8: null,
    O10: null,
    O52: null,
    P2: null,
    P3: null,
    PN: '3273187',
    Remark: '',
    S2: null,
    S9: null,
    S10: null,
    S11: null,
    S12: null,
    S13: null,
    S14: null,
    S15: null,
    S21: null,
    Time: '2024-10-15T09:30:00.000Z',
    Top1: '0.0075',
    Top2: '0.0032',
    Top3: null,
    Top_1: 'A2',
    Top_2: 'A18',
    Top_3: null,
    ULMark94V: null,
    Yield: '0.9893',
    sf_link: null
  },
  {
    A1: null,
    A2: null,
    A5: '0.0045',
    A6: null,
    A7: null,
    A8: null,
    A9: null,
    A10: null,
    A12: null,
    A13: null,
    A16: null,
    A17: null,
    A18: null,
    A19: null,
    A20: null,
    A21: null,
    A22: null,
    A41: null,
    A71: null,
    B4: '0.0023',
    J6: null,
    LayerCount: null,
    LotNum: '249QE002-01-01',
    LotType: 'E3_實驗3',
    O1: null,
    O8: null,
    O10: null,
    O52: null,
    P2: null,
    P3: null,
    PN: '3273187',
    Remark: '',
    S2: null,
    S9: null,
    S10: null,
    S11: null,
    S12: null,
    S13: null,
    S14: null,
    S15: null,
    S21: null,
    Time: '2024-10-20T14:45:30.000Z',
    Top1: '0.0045',
    Top2: '0.0023',
    Top3: null,
    Top_1: 'A5',
    Top_2: 'B4',
    Top_3: null,
    ULMark94V: null,
    Yield: '0.9932',
    sf_link: null
  },
  {
    A1: null,
    A2: null,
    A5: null,
    A6: '0.0087',
    A7: null,
    A8: null,
    A9: null,
    A10: null,
    A12: null,
    A13: null,
    A16: null,
    A17: null,
    A18: null,
    A19: null,
    A20: null,
    A21: null,
    A22: null,
    A41: null,
    A71: null,
    B4: null,
    J6: '0.0034',
    LayerCount: null,
    LotNum: '250GE002-01-02',
    LotType: 'R3_研發不可出貨批',
    O1: null,
    O8: null,
    O10: null,
    O52: null,
    P2: null,
    P3: null,
    PN: '3273187',
    Remark: '',
    S2: null,
    S9: null,
    S10: null,
    S11: null,
    S12: null,
    S13: null,
    S14: null,
    S15: null,
    S21: null,
    Time: '2024-10-25T18:20:15.000Z',
    Top1: '0.0087',
    Top2: '0.0034',
    Top3: null,
    Top_1: 'A6',
    Top_2: 'J6',
    Top_3: null,
    ULMark94V: null,
    Yield: '0.9879',
    sf_link: null
  },
  {
    A1: null,
    A2: null,
    A5: null,
    A6: null,
    A7: '0.0056',
    A8: null,
    A9: null,
    A10: null,
    A12: null,
    A13: null,
    A16: null,
    A17: null,
    A18: null,
    A19: null,
    A20: null,
    A21: null,
    A22: null,
    A41: null,
    A71: null,
    B4: null,
    J6: null,
    LayerCount: null,
    LotNum: '251TE017-01-00',
    LotType: 'S1_樣品1',
    O1: '0.0021',
    O8: null,
    O10: null,
    O52: null,
    P2: null,
    P3: null,
    PN: '3273187',
    Remark: '',
    S2: null,
    S9: null,
    S10: null,
    S11: null,
    S12: null,
    S13: null,
    S14: null,
    S15: null,
    S21: null,
    Time: '2024-10-30T22:05:40.000Z',
    Top1: '0.0056',
    Top2: '0.0021',
    Top3: null,
    Top_1: 'A7',
    Top_2: 'O1',
    Top_3: null,
    ULMark94V: null,
    Yield: '0.9923',
    sf_link: null
  },
  {
    A1: null,
    A2: null,
    A5: null,
    A6: null,
    A7: null,
    A8: '0.0098',
    A9: null,
    A10: null,
    A12: null,
    A13: null,
    A16: null,
    A17: null,
    A18: null,
    A19: null,
    A20: null,
    A21: null,
    A22: null,
    A41: null,
    A71: null,
    B4: null,
    J6: null,
    LayerCount: null,
    LotNum: '252GE003-01-00',
    LotType: 'S1_樣品1',
    O1: null,
    O8: null,
    O10: null,
    O52: null,
    P2: null,
    P3: null,
    PN: '3273187',
    Remark: '',
    S2: null,
    S9: null,
    S10: null,
    S11: null,
    S12: null,
    S13: null,
    S14: null,
    S15: null,
    S21: null,
    Time: '2024-11-05T10:15:20.000Z',
    Top1: '0.0098',
    Top2: null,
    Top3: null,
    Top_1: 'A8',
    Top_2: null,
    Top_3: null,
    ULMark94V: null,
    Yield: '0.9902',
    sf_link: null
  }
])

const seriesKeyArray = computed(() => {
  return Object.keys(data.value[0]).filter(
    (key) =>
      key !== 'PN' &&
      key !== 'LotNum' &&
      key !== 'LotType' &&
      key !== 'Time' &&
      key !== 'Top_1' &&
      key !== 'Top1' &&
      key !== 'Top_2' &&
      key !== 'Top2' &&
      key !== 'Top_3' &&
      key !== 'Top3' &&
      key !== 'Yield' &&
      key !== 'Remark' &&
      key !== 'sf_link' &&
      key !== 'LayerCount' &&
      key !== 'ULMark94V'
  )
})
const dataLoaded = ref(false)

onMounted(() => {
  // 在實際應用中，這裡可能會是一個 API 調用
  // 現在我們直接使用提供的數據
  dataLoaded.value = true
})
</script>
