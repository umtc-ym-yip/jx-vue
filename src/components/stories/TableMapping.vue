<template>
  <StoryContainer title="D3TableMapping 元件">
    <StorySection title="基本用法">
      <template #description>
        D3TableMapping 是一個基於 D3.js 的表格映射圖元件，用於展示二維數據的分佈情況。
      </template>

      <template #usage>
        使用 <StoryCode>data</StoryCode>, <StoryCode>layoutData</StoryCode>,
        <StoryCode>xKey</StoryCode>, <StoryCode>yKey</StoryCode>, 和
        <StoryCode>seriesKey</StoryCode> 屬性來設置圖表的數據和軸。
      </template>

      <template #props>
        <StoryList>
          <li><span class="font-semibold">data:</span> 圖表數據，必須是一個對象數組</li>
          <li><span class="font-semibold">layoutData:</span> 布局數據，用於定義表格的結構</li>
          <li><span class="font-semibold">xKey:</span> X 軸對應的數據鍵名</li>
          <li><span class="font-semibold">yKey:</span> Y 軸對應的數據鍵名</li>
          <li><span class="font-semibold">seriesKey:</span> 用於分類的鍵名</li>
        </StoryList>
      </template>

      <template #code>
        <pre>
        &lt;D3TableMapping
          :data="mappingData"
          :layout-data="layoutData"
          :x-key="'Xvalue'"
          :y-key="'Yvalue'"
          :series-key="'Classify'"
        &gt;
          &lt;!-- 自定義 tooltip 內容 --&gt;
        &lt;/D3TableMapping&gt;
        </pre>
      </template>

      <D3TableMapping
        v-if="dataLoaded"
        :data="mappingData"
        :layout-data="layoutData"
        :x-key="'Xvalue'"
        :y-key="'Yvalue'"
        :series-key="'Classify'"
      >
        <!-- 這裡可以添加自定義的 tooltip 內容 -->
      </D3TableMapping>
    </StorySection>

    <StorySection title="自定義 Tooltip">
      <template #description>
        D3TableMapping 允許您使用 <StoryCode>tooltip</StoryCode> 插槽來自定義懸浮提示的內容和樣式。
      </template>

      <template #usage>
        使用 <StoryCode>#tooltip</StoryCode> 插槽來定義自定義的 tooltip
        內容。插槽提供了當前數據點的信息。
      </template>

      <template #code>
        <pre>
        &lt;D3TableMapping
          :data="mappingData"
          :layout-data="layoutData"
          :x-key="'Xvalue'"
          :y-key="'Yvalue'"
          :series-key="'Classify'"
        &gt;
          &lt;template #tooltip="{ show, data, x, y, setTooltipRef }"&gt;
            &lt;div
              v-if="show && data.Classify !== '0'"
              :ref="setTooltipRef"
              class="absolute bg-white border border-gray-300 rounded p-2.5 text-sm"
              :style="{ left: `${x}px`, top: `${y}px` }"
            &gt;
              &lt;D3AsyncImage :data="data" :width="150" :height="150" /&gt;
              &lt;p&gt;缺點 : { data.Classify }&lt;/p&gt;
              &lt;p&gt;X : { data.Xvalue }&lt;/p&gt;
              &lt;p&gt;Y : { data.Yvalue }&lt;/p&gt;
              &lt;p&gt;板號 : { data.BoardNo }&lt;/p&gt;
            &lt;/div&gt;
          &lt;/template&gt;
        &lt;/D3TableMapping&gt;
        </pre>
      </template>

      <template #notes>
        1.記得使用 setTooltipRef 來設置 tooltip 的 ref，以便內部計算是否超出邊界並做方向轉換。
        <br />
        2.在tooltip 插槽中可以使用
        <StoryCode>D3AsyncImage</StoryCode>
        組件，並利用作用域插槽的<StoryCode>data</StoryCode>傳入當前數據點的圖片資料。
      </template>

      <D3TableMapping
        v-if="dataLoaded"
        :data="mappingData"
        :layout-data="layoutData"
        :x-key="'Xvalue'"
        :y-key="'Yvalue'"
        :series-key="'Classify'"
      >
        <template #tooltip="{ show, data, x, y, setTooltipRef }">
          <div
            v-if="show && data.Classify !== '0'"
            :ref="setTooltipRef"
            class="absolute bg-white border border-gray-300 rounded p-2.5 text-sm"
            :style="{ left: `${x}px`, top: `${y}px` }"
          >
            <D3AsyncImage :data="data" :width="150" :height="150" />
            <p>缺點 : {{ data.Classify }}</p>
            <p>X : {{ data.Xvalue }}</p>
            <p>Y : {{ data.Yvalue }}</p>
            <p>板號 : {{ data.BoardNo }}</p>
          </div>
        </template>
      </D3TableMapping>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api'

import D3TableMapping from '@/components/d3/D3TableMapping.vue'
import D3AsyncImage from '@/components/d3/D3AsyncImage.vue'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryCode from './StoryCode.vue'
import StoryList from './StoryList.vue'

const mappingData = ref([])
const layoutData = ref([])
const dataLoaded = ref(false)

const mockMappingData = [
  {
    DefectSeq: '22-S3',
    ProcName: 'AOIVRS',
    EqName: 'Y1 增層線路缺點判定機(VMS)_001',
    CheckDate: '2024-10-09T08:37:00.000Z',
    UserName: '00000000',
    Xvalue: 353,
    Yvalue: 239,
    Classify: 'S3'
  },
  {
    DefectSeq: '16-S3',
    ProcName: 'AOIVRS',
    EqName: 'Y1 增層線路缺點判定機(VMS)_001',
    CheckDate: '2024-10-09T08:37:00.000Z',
    UserName: '00000000',
    Xvalue: 412,
    Yvalue: 178,
    Classify: 'S2'
  },
  {
    DefectSeq: '25-S6',
    ProcName: 'AOIVRS',
    EqName: 'Y1 增層線路缺點判定機(VMS)_001',
    CheckDate: '2024-10-09T08:37:00.000Z',
    UserName: '00000000',
    Xvalue: 287,
    Yvalue: 456,
    Classify: 'S6'
  },
  {
    DefectSeq: '8-S3',
    ProcName: 'AOIVRS',
    EqName: 'Y1 增層線路缺點判定機(VMS)_001',
    CheckDate: '2024-10-09T08:37:00.000Z',
    UserName: '00000000',
    Xvalue: 189,
    Yvalue: 321,
    Classify: 'S1'
  },
  {
    DefectSeq: '9-S3',
    ProcName: 'AOIVRS',
    EqName: 'Y1 增層線路缺點判定機(VMS)_001',
    CheckDate: '2024-10-09T08:37:00.000Z',
    UserName: '00000000',
    Xvalue: 476,
    Yvalue: 134,
    Classify: 'S4'
  },
  {
    DefectSeq: '76-A3',
    ProcName: 'AOIVRS',
    EqName: 'Y1 增層線路缺點判定機(VMS)_001',
    CheckDate: '2024-10-09T08:37:00.000Z',
    UserName: '00000000',
    Xvalue: 231,
    Yvalue: 487,
    Classify: 'S5'
  },
  {
    DefectSeq: '25-A15',
    ProcName: 'AOIVRS',
    EqName: 'Y1 增層線路缺點判定機(VMS)_001',
    CheckDate: '2024-10-09T08:37:00.000Z',
    UserName: '00000000',
    Xvalue: 398,
    Yvalue: 265,
    Classify: 'S2'
  },
  {
    DefectSeq: '12-S3',
    ProcName: 'AOIVRS',
    EqName: 'Y1 增層線路缺點判定機(VMS)_001',
    CheckDate: '2024-10-09T08:37:00.000Z',
    UserName: '00000000',
    Xvalue: 145,
    Yvalue: 412,
    Classify: 'S6'
  },
  {
    DefectSeq: '6-S3',
    ProcName: 'AOIVRS',
    EqName: 'Y1 增層線路缺點判定機(VMS)_001',
    CheckDate: '2024-10-09T08:37:00.000Z',
    UserName: '00000000',
    Xvalue: 321,
    Yvalue: 198,
    Classify: 'S3'
  },
  {
    DefectSeq: '6-A7',
    ProcName: 'AOIVRS',
    EqName: 'Y1 增層線路缺點判定機(VMS)_001',
    CheckDate: '2024-10-09T08:37:00.000Z',
    UserName: '00000000',
    Xvalue: 467,
    Yvalue: 356,
    Classify: 'S1'
  },
  {
    DefectSeq: '51-A16',
    ProcName: 'AOIVRS',
    EqName: 'Y1 增層線路缺點判定機(VMS)_001',
    CheckDate: '2024-10-09T08:37:00.000Z',
    UserName: '00000000',
    Xvalue: 209,
    Yvalue: 478,
    Classify: 'S4'
  }
]
const mockLayoutData = [
  [
    { x: 32, y: 22.75 },
    { x: 32, y: 249.25 }
  ],
  [
    { x: 32, y: 265.75 },
    { x: 32, y: 492.25 }
  ],
  [
    { x: 83, y: 22.75 },
    { x: 83, y: 249.25 }
  ],
  [
    { x: 83, y: 265.75 },
    { x: 83, y: 492.25 }
  ],
  [
    { x: 134, y: 22.75 },
    { x: 134, y: 249.25 }
  ],
  [
    { x: 134, y: 265.75 },
    { x: 134, y: 492.25 }
  ],
  [
    { x: 185, y: 22.75 },
    { x: 185, y: 249.25 }
  ],
  [
    { x: 185, y: 265.75 },
    { x: 185, y: 492.25 }
  ],
  [
    { x: 236, y: 22.75 },
    { x: 236, y: 249.25 }
  ],
  [
    { x: 236, y: 265.75 },
    { x: 236, y: 492.25 }
  ],
  [
    { x: 274, y: 22.75 },
    { x: 274, y: 249.25 }
  ],
  [
    { x: 274, y: 265.75 },
    { x: 274, y: 492.25 }
  ],
  [
    { x: 325, y: 22.75 },
    { x: 325, y: 249.25 }
  ],
  [
    { x: 325, y: 265.75 },
    { x: 325, y: 492.25 }
  ],
  [
    { x: 376, y: 22.75 },
    { x: 376, y: 249.25 }
  ],
  [
    { x: 376, y: 265.75 },
    { x: 376, y: 492.25 }
  ],
  [
    { x: 427, y: 22.75 },
    { x: 427, y: 249.25 }
  ],
  [
    { x: 427, y: 265.75 },
    { x: 427, y: 492.25 }
  ],
  [
    { x: 478, y: 22.75 },
    { x: 478, y: 249.25 }
  ],
  [
    { x: 478, y: 265.75 },
    { x: 478, y: 492.25 }
  ],
  [
    { x: 32, y: 22.75 },
    { x: 236, y: 22.75 }
  ],
  [
    { x: 274, y: 22.75 },
    { x: 478, y: 22.75 }
  ],
  [
    { x: 32, y: 68.05 },
    { x: 236, y: 68.05 }
  ],
  [
    { x: 274, y: 68.05 },
    { x: 478, y: 68.05 }
  ],
  [
    { x: 32, y: 113.35 },
    { x: 236, y: 113.35 }
  ],
  [
    { x: 274, y: 113.35 },
    { x: 478, y: 113.35 }
  ],
  [
    { x: 32, y: 158.65 },
    { x: 236, y: 158.65 }
  ],
  [
    { x: 274, y: 158.65 },
    { x: 478, y: 158.65 }
  ],
  [
    { x: 32, y: 203.95 },
    { x: 236, y: 203.95 }
  ],
  [
    { x: 274, y: 203.95 },
    { x: 478, y: 203.95 }
  ],
  [
    { x: 32, y: 249.25 },
    { x: 236, y: 249.25 }
  ],
  [
    { x: 274, y: 249.25 },
    { x: 478, y: 249.25 }
  ],
  [
    { x: 32, y: 265.75 },
    { x: 236, y: 265.75 }
  ],
  [
    { x: 274, y: 265.75 },
    { x: 478, y: 265.75 }
  ],
  [
    { x: 32, y: 311.05 },
    { x: 236, y: 311.05 }
  ],
  [
    { x: 274, y: 311.05 },
    { x: 478, y: 311.05 }
  ],
  [
    { x: 32, y: 356.35 },
    { x: 236, y: 356.35 }
  ],
  [
    { x: 274, y: 356.35 },
    { x: 478, y: 356.35 }
  ],
  [
    { x: 32, y: 401.65 },
    { x: 236, y: 401.65 }
  ],
  [
    { x: 274, y: 401.65 },
    { x: 478, y: 401.65 }
  ],
  [
    { x: 32, y: 446.95 },
    { x: 236, y: 446.95 }
  ],
  [
    { x: 274, y: 446.95 },
    { x: 478, y: 446.95 }
  ],
  [
    { x: 32, y: 492.25 },
    { x: 236, y: 492.25 }
  ],
  [
    { x: 274, y: 492.25 },
    { x: 478, y: 492.25 }
  ]
]

const getmappingData = (lot, layer, isincludefake = 1, process, factory) =>
  axios.get(
    `${API_BASE_URL}${API_ENDPOINTS.AOI_MAPPING}/${lot}/${layer}/${isincludefake}/${process}/${factory}`
  )
const getLayoutData = () => {
  return axios.get(`${API_BASE_URL}${API_ENDPOINTS.AOI_LAYOUT}/3273012/249PE002-04-00/-L9L14`)
}

async function loadData() {
  try {
    const [res1, res2] = await Promise.all([
      getmappingData('249PE002-04-00', '-L9L14', 0, 'ptaoi', 'YM'),
      getLayoutData()
    ])
    mappingData.value = res1.data
    layoutData.value = res2.data.dataAry
    dataLoaded.value = true
  } catch (error) {
    mappingData.value = mockMappingData
    layoutData.value = mockLayoutData
    dataLoaded.value = true
  }
}
onMounted(() => {
  loadData()
})
</script>
