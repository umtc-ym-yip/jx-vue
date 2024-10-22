<template>
  <StoryContainer title="D3UnitMapping 組件">
    <StorySection title="基本用法">
      <template #description>
        <p>D3UnitMapping 組件用於顯示 Gerber 文件和相關點數據的映射。以下是基本用法示例：</p>
      </template>
      <template #code>
        <pre>
&lt;D3UnitMapping
  :gerber-data="gerberData"
  :data="pointsData"
  xKey="AdjPanel_X"
  yKey="AdjPanel_Y"
  seriesKey="Classify"
&gt;
  &lt;template #tooltip="tooltipProps"&gt;
    &lt;D3Tooltip v-bind="tooltipProps"&gt;
      &lt;template #default="{ data, status }"&gt;
        &lt;D3AsyncImage :data="data" :width="150" :height="150" /&gt;
        &lt;p&gt;缺點 : { data.Classify }&lt;/p&gt;
        &lt;p&gt;X : { data.Panel_X }&lt;/p&gt;
        &lt;p&gt;Y : { data.Panel_Y }&lt;/p&gt;
        &lt;p&gt;板號 : { data.BoardNo }&lt;/p&gt;
      &lt;/template&gt;
    &lt;/D3Tooltip&gt;
  &lt;/template&gt;
&lt;/D3UnitMapping&gt;
        </pre>
      </template>
      <D3UnitMapping
        v-if="gerberData && pointsData"
        :gerber-data="gerberData"
        :data="pointsData"
        xKey="AdjPanel_X"
        yKey="AdjPanel_Y"
        seriesKey="Classify"
      >
        <template #tooltip="tooltipProps">
          <D3Tooltip v-bind="tooltipProps">
            <template #default="{ data }">
              <D3AsyncImage :data="data" :width="150" :height="150" />
              <p>缺點 : {{ data.Classify }}</p>
              <p>X : {{ data.Panel_X }}</p>
              <p>Y : {{ data.Panel_Y }}</p>
              <p>板號 : {{ data.BoardNo }}</p>
            </template>
          </D3Tooltip>
        </template>
      </D3UnitMapping>
      <div v-else class="flex flex-col justify-center items-center h-full">
        <p class="mb-3">Loading...</p>
        <i class="fas fa-spinner fa-spin mr-2"></i>
      </div>
    </StorySection>

    <StorySection title="屬性說明">
      <template #description>
        <p>D3UnitMapping 組件接受以下屬性：</p>
      </template>
      <template #props>
        <StoryList>
          <li>
            <span class="font-semibold">gerber-data:</span> Gerber 文件數據，由 parseGerberFile
            函數解析得到
          </li>
          <li>
            <span class="font-semibold">data:</span> 點數據數組，每個點包含 x、y 坐標和其他相關信息
          </li>
          <li><span class="font-semibold">xKey:</span> 數據中表示 X 坐標的鍵名</li>
          <li><span class="font-semibold">yKey:</span> 數據中表示 Y 坐標的鍵名</li>
          <li><span class="font-semibold">seriesKey:</span> 數據中用於分類的鍵名</li>
        </StoryList>
      </template>
    </StorySection>

    <StorySection title="自定義 Tooltip">
      <template #description>
        <p>D3UnitMapping 組件允許通過 #tooltip 插槽自定義懸浮提示的內容：</p>
      </template>
      <template #code>
        <pre>
&lt;D3UnitMapping ...&gt;
  &lt;template #tooltip="tooltipProps"&gt;
    &lt;D3Tooltip v-bind="tooltipProps"&gt;
      &lt;template #default="{ data, status }"&gt;
        &lt;D3AsyncImage :data="data" :width="150" :height="150" /&gt;
        &lt;p&gt;自定義內容&lt;/p&gt;
        &lt;p&gt;缺點 : { data.Classify }&lt;/p&gt;
        &lt;p&gt;X : { data.Panel_X }&lt;/p&gt;
        &lt;p&gt;Y : { data.Panel_Y }&lt;/p&gt;
      &lt;/template&gt;
    &lt;/D3Tooltip&gt;
  &lt;/template&gt;
&lt;/D3UnitMapping&gt;
        </pre>
      </template>
    </StorySection>

    <StorySection title="數據格式">
      <template #description>
        <p>pointsData 的數據格式示例：</p>
      </template>
      <template #code>
        <pre>
[
  {
    ProcName: 'AOIVRS',
    EqName: 'Y1 增層線路缺點判定機(VMS)_001',
    CheckDate: '2024/7/23  07:29:00 PM',
    UserName: 0,
    LotType: 'C_量產',
    PartNo: '3273053A',
    LayerID: 59,
    LayerName: '-L4L7',
    Layer: 'L7-P',
    C_Side: 48,
    S_Side: 48,
    OutSide: 'S',
    BoardNo: 20,
    Panel_X: 106.239,
    Panel_Y: 369.495,
    Scrapped: 1,
    KeyDate: '2024/7/23  07:29:00 PM',
    SeqNo: 12,
    ImagePath: '//10.22.133.1/VMS-Image/GigaVis/3273053A01/L7-P-0225/247CE001-05-00-S/20',
    VrsCode: 'C3',
    Repair: 1,
    UnitDefect: 1,
    UnitDefect_AosBef: 1,
    IsFinished: 1,
    line: 55,
    DefectSeq: 9,
    image: '//10.22.133.1/VMS-Image/GigaVis/3273053A01/L7-P-0225/247CE001-05-00-S/20/9-S3.jpg',
    Classify: 'S3',
    AdjPanel_X: -8.861,
    AdjPanel_Y: -9.505
  },
  // ... 更多數據點
]
        </pre>
      </template>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import D3UnitMapping from '@/components/d3/D3UnitMapping.vue'
import D3Tooltip from '@/components/d3/D3Tooltip.vue'
import D3AsyncImage from '@/components/d3/D3AsyncImage.vue'
import { useD3Gerber } from '@/composables/d3/useD3Gerber'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryList from './StoryList.vue'

const { parseGerberFile } = useD3Gerber()

const gerberData = ref(null)
const pointsData = ref([
  {
    ProcName: 'AOIVRS',
    EqName: 'Y1 增層線路缺點判定機(VMS)_001',
    CheckDate: '2024/7/23  07:29:00 PM',
    UserName: 0,
    LotType: 'C_量產',
    PartNo: '3273053A',
    LayerID: 59,
    LayerName: '-L4L7',
    Layer: 'L7-P',
    C_Side: 48,
    S_Side: 48,
    OutSide: 'S',
    BoardNo: 20,
    Panel_X: 106.239,
    Panel_Y: 369.495,
    Scrapped: 1,
    KeyDate: '2024/7/23  07:29:00 PM',
    SeqNo: 12,
    ImagePath: '//10.22.133.1/VMS-Image/GigaVis/3273053A01/L7-P-0225/247CE001-05-00-S/20',
    ImagePath_Vms: '//10.22.133.1/VMS-Image/GigaVis/3273053A01/L7-P-0225/247CE001-05-00-S/20',
    ImagePath_All:
      '//10.22.166.87/aoi/GigaVis/umtc-gids/AI Data/3F/UMTC_IMAGE/3273053A01/L7-P-0225/247CE001-05-00-S/20',
    VrsCode: 'C3',
    Repair: 1,
    UnitDefect: 1,
    UnitDefect_AosBef: 1,
    IsFinished: 1,
    line: 55,
    DefectSeq: 9,
    image: '//10.22.133.1/VMS-Image/GigaVis/3273053A01/L7-P-0225/247CE001-05-00-S/20/9-S3.jpg',
    Classify: 'S3',
    AdjPanel_X: -8.861,
    AdjPanel_Y: -9.505
  },
  {
    ProcName: 'AOIVRS',
    EqName: 'Y1 增層線路缺點判定機(VMS)_001',
    CheckDate: '2024/7/23  07:29:00 PM',
    UserName: 0,
    LotType: 'C_量產',
    PartNo: '3273053A',
    LayerID: 59,
    LayerName: '-L4L7',
    Layer: 'L7-P',
    C_Side: 48,
    S_Side: 48,
    OutSide: 'S',
    BoardNo: 20,
    Panel_X: 106.239,
    Panel_Y: 369.495,
    Scrapped: 1,
    KeyDate: '2024/7/23  07:29:00 PM',
    SeqNo: 12,
    ImagePath: '//10.22.133.1/VMS-Image/GigaVis/3273053A01/L7-P-0225/247CE001-05-00-S/20',
    ImagePath_Vms: '//10.22.133.1/VMS-Image/GigaVis/3273053A01/L7-P-0225/247CE001-05-00-S/20',
    ImagePath_All:
      '//10.22.166.87/aoi/GigaVis/umtc-gids/AI Data/3F/UMTC_IMAGE/3273053A01/L7-P-0225/247CE001-05-00-S/20',
    VrsCode: 'C3',
    Repair: 1,
    UnitDefect: 1,
    UnitDefect_AosBef: 1,
    IsFinished: 1,
    line: 55,
    DefectSeq: 9,
    image: '//10.22.133.1/VMS-Image/GigaVis/3273053A01/L7-P-0225/247CE001-05-00-S/20/9-S3.jpg',
    Classify: 'S5',
    AdjPanel_X: 15.861,
    AdjPanel_Y: 19.505
  },
  {
    ProcName: 'AOIVRS',
    EqName: 'Y1 增層線路缺點判定機(VMS)_001',
    CheckDate: '2024/7/23  07:29:00 PM',
    UserName: 0,
    LotType: 'C_量產',
    PartNo: '3273053A',
    LayerID: 59,
    LayerName: '-L4L7',
    Layer: 'L7-P',
    C_Side: 48,
    S_Side: 48,
    OutSide: 'S',
    BoardNo: 20,
    Panel_X: 106.239,
    Panel_Y: 369.495,
    Scrapped: 1,
    KeyDate: '2024/7/23  07:29:00 PM',
    SeqNo: 12,
    ImagePath: '//10.22.133.1/VMS-Image/GigaVis/3273053A01/L7-P-0225/247CE001-05-00-S/20',
    ImagePath_Vms: '//10.22.133.1/VMS-Image/GigaVis/3273053A01/L7-P-0225/247CE001-05-00-S/20',
    ImagePath_All:
      '//10.22.166.87/aoi/GigaVis/umtc-gids/AI Data/3F/UMTC_IMAGE/3273053A01/L7-P-0225/247CE001-05-00-S/20',
    VrsCode: 'C3',
    Repair: 1,
    UnitDefect: 1,
    UnitDefect_AosBef: 1,
    IsFinished: 1,
    line: 55,
    DefectSeq: 9,
    image: '//10.22.133.1/VMS-Image/GigaVis/3273053A01/L7-P-0225/247CE001-05-00-S/20/9-S3.jpg',
    Classify: 'S4',
    AdjPanel_X: 5.861,
    AdjPanel_Y: 11.505
  },
  {
    ProcName: 'AOIVRS',
    EqName: 'Y1 增層線路缺點判定機(VMS)_001',
    CheckDate: '2024/7/23  07:29:00 PM',
    UserName: 0,
    LotType: 'C_量產',
    PartNo: '3273053A',
    LayerID: 59,
    LayerName: '-L4L7',
    Layer: 'L7-P',
    C_Side: 48,
    S_Side: 48,
    OutSide: 'S',
    BoardNo: 20,
    Panel_X: 106.239,
    Panel_Y: 369.495,
    Scrapped: 1,
    KeyDate: '2024/7/23  07:29:00 PM',
    SeqNo: 12,
    ImagePath: '//10.22.133.1/VMS-Image/GigaVis/3273053A01/L7-P-0225/247CE001-05-00-S/20',
    ImagePath_Vms: '//10.22.133.1/VMS-Image/GigaVis/3273053A01/L7-P-0225/247CE001-05-00-S/20',
    ImagePath_All:
      '//10.22.166.87/aoi/GigaVis/umtc-gids/AI Data/3F/UMTC_IMAGE/3273053A01/L7-P-0225/247CE001-05-00-S/20',
    VrsCode: 'C3',
    Repair: 1,
    UnitDefect: 1,
    UnitDefect_AosBef: 1,
    IsFinished: 1,
    line: 55,
    DefectSeq: 9,
    image: '//10.22.133.1/VMS-Image/GigaVis/3273053A01/L7-P-0225/247CE001-05-00-S/20/9-S3.jpg',
    Classify: 'S9',
    AdjPanel_X: 10.861,
    AdjPanel_Y: 5.505
  }
])
async function fetchGerberFile(url) {
  const response = await axios.get(url)
  return response.data
}

onMounted(async () => {
  try {
    const gerberContent = await fetchGerberFile('http://192.168.0.185:3000/gerber')
    if (gerberContent) {
      gerberData.value = parseGerberFile(gerberContent)
    }
  } catch (error) {
    console.error('Failed to fetch gerber content', error)
  }
})
</script>
