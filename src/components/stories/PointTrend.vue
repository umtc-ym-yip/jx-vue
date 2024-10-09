<!-- 自訂義tooltip 有問題，待處理 -->
<template>
  <StoryContainer title="D3PointTrend 元件">
    <StorySection title="基本用法">
      <template #description>
        D3PointTrend 是一個基於 D3.js 的點狀趨勢圖元件，用於展示數據的趨勢和分佈。
      </template>

      <template #usage>
        使用 <StoryCode>data</StoryCode>, <StoryCode>xKey</StoryCode>, 和
        <StoryCode>yKey</StoryCode> 屬性來設置圖表的數據和軸。
      </template>

      <template #props>
        <StoryList>
          <li><span class="font-semibold">data:</span> 圖表數據，必須是一個對象數組</li>
          <li><span class="font-semibold">xKey:</span> X 軸對應的數據鍵名</li>
          <li><span class="font-semibold">yKey:</span> Y 軸對應的數據鍵名</li>
          <li><span class="font-semibold">width:</span> 圖表寬度，默認為 1000</li>
          <li><span class="font-semibold">height:</span> 圖表高度，默認為 300</li>
          <li>
            <span class="font-semibold">margin:</span> 圖表邊距，默認為 { top: 20, right: 20,
            bottom: 30, left: 40 }
          </li>
          <li>
            <span class="font-semibold">xType:</span> X 軸類型，可以是 'band' 或 'linear'，默認為
            'band'
          </li>
          <li><span class="font-semibold">xAxisSampleRate:</span> X 軸標籤採樣率，默認為 1</li>
          <li>
            <span class="font-semibold">xAxisType:</span> X 軸標籤類型，可以是 'sample'、'rotate' 或
            'ticks'，默認為 'sample'
          </li>
          <li><span class="font-semibold">title:</span> 圖表標題</li>
          <li><span class="font-semibold">seriesKey:</span> 用於多系列數據的鍵名</li>
          <li><span class="font-semibold">hasLine:</span> 是否顯示線，默認為 true</li>
        </StoryList>
      </template>

      <template #code>
        <pre>
        &lt;D3PointTrend 
        :data="chartData" 
        xKey="date" 
        yKey="value" 
        title="銷售趨勢" 
        :width="600" 
        :height="400" 
        xAxisType="rotate" 
        :xAxisSampleRate="2" 
        seriesKey="product"&gt;
        
        </pre>
      </template>

      <D3PointTrend
        :data="chartData"
        xKey="date"
        yKey="value"
        title="銷售趨勢"
        :width="600"
        :height="400"
        xAxisType="rotate"
        :xAxisSampleRate="2"
        seriesKey="product"
      >
      </D3PointTrend>
    </StorySection>

    <StorySection title="自定義閾值">
      <template #description>
        您可以使用 <StoryCode>thresholds</StoryCode> 插槽來添加自定義閾值線。
      </template>

      <template #code>
        <pre>
        &lt;D3PointTrend 
        :data="chartData" 
        xKey="date" 
        yKey="value" 
        :has-line="false"
        title="銷售趨勢（帶閾值）"&gt;
        &lt;template #thresholds&gt; 
          &lt;threshold :value="1000" label="目標" color="green" /&gt;
          &lt;threshold :value="500" label="警戒線" color="red" strokeType="dashed" /&gt;
        &lt;/template&gt; 
        &lt;/D3PointTrend&gt;
        </pre>
      </template>

      <D3PointTrend
        :data="chartData"
        xKey="date"
        yKey="value"
        :width="600"
        :height="400"
        title="銷售趨勢（帶閾值）"
        series-key="product"
        :has-line="false"
      >
        <template #thresholds>
          <threshold :value="1000" label="目標" color="green" />
          <threshold :value="500" label="警戒線" color="red" strokeType="dashed" />
        </template>
      </D3PointTrend>
    </StorySection>

    <StorySection title="自定義 Tooltip">
      <template #description>
        D3PointTrend 允許您使用 <StoryCode>tooltip</StoryCode> 插槽來自定義懸浮提示的內容和樣式。
      </template>

      <template #usage>
        使用 <StoryCode>#tooltip</StoryCode> 插槽來定義自定義的 tooltip
        內容。插槽提供了當前數據點的信息。
      </template>

      <template #code>
        <pre>
        &lt;D3PointTrend 
          :data="chartData" 
          xKey="date" 
          yKey="value" 
          title="銷售趨勢（自定義Tooltip）" 
        :width="600" 
        :height="400"
        seriesKey="product"&gt;
        &lt;template #tooltip="{ data }"&gt; 
          &lt;div :ref="data.setTooltipRef()" class="custom-tooltip"&gt; 
            &lt;h3&gt;{{ 'data.product' }}&lt;/h3&gt; 
            &lt;p&gt;日期: {{ 'data.date' }}&lt;/p&gt; 
            &lt;p&gt;銷售額: {{ 'data.value' }} 元&lt;/p&gt;
            &lt;p&gt;同比增長: {{ 'calculateGrowth(data)' }}%&lt;/p&gt; 
          &lt;/div&gt; 
        &lt;/template&gt;
        </pre>
      </template>
      <template #notes>
        要記得使用data.setTooltipRef() 來設置tooltip的ref，來讓內部計算是否超出邊界做轉換方向
      </template>

      <D3PointTrend
        :data="chartData"
        xKey="date"
        yKey="value"
        :width="600"
        :height="400"
        title="銷售趨勢（自定義 Tooltip）"
        series-key="product"
      >
        <template #tooltip="{ show, data, x, y, setTooltipRef }">
          <div
            v-if="show"
            :ref="setTooltipRef"
            class="absolute bg-white bg-opacity-90 border border-gray-300 rounded p-2.5 text-sm"
            :style="{ left: `${x}px`, top: `${y}px` }"
          >
            <h3 class="mb-1 text-base font-bold">{{ data.product }}</h3>
            <p class="m-0 leading-relaxed">日期: {{ data.date }}</p>
            <p class="m-0 leading-relaxed">銷售額: {{ data.value }} 元</p>
            <p class="m-0 leading-relaxed">同比增長: {{ calculateGrowth(data) }}%</p>
          </div>
        </template>
      </D3PointTrend>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
// import { ref } from 'vue'
import D3PointTrend from '../d3/D3PointTrend.vue'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryCode from './StoryCode.vue'
import StoryList from './StoryList.vue'

// const tooltip = ref(null)
// 模擬數據
const chartData = [
  { date: '2023-01-01', value: 500, product: 'A' },
  { date: '2023-01-02', value: 600, product: 'A' },
  { date: '2023-01-03', value: 750, product: 'A' },
  { date: '2023-01-04', value: 600, product: 'A' },
  { date: '2023-01-05', value: 950, product: 'A' },
  { date: '2023-01-01', value: 400, product: 'B' },
  { date: '2023-01-02', value: 550, product: 'B' },
  { date: '2023-01-03', value: 700, product: 'B' },
  { date: '2023-01-04', value: 850, product: 'B' },
  { date: '2023-01-05', value: 1000, product: 'B' }
]

// 模擬計算增長率的函數
function calculateGrowth(data) {
  // 這裡應該是實際的增長率計算邏輯
  return (Math.random() * 20 - 10).toFixed(2)
}
</script>
