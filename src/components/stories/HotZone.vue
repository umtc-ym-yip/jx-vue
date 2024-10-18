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
            <ul class="ml-4 mt-2">
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
      class="absolute bg-white border border-gray-300 rounded-md shadow-md p-3 text-sm"
      :style="{ left: `${x}px`, top: `${y}px` }"
    &gt;
      &lt;h3 class="font-bold text-lg mb-2"&gt;自定義 Tooltip&lt;/h3&gt;
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
            class="absolute bg-white border border-gray-300 rounded-md shadow-md p-3 text-sm"
            :style="{ left: `${x}px`, top: `${y}px` }"
          >
            <h3 class="font-bold text-lg mb-2">自定義 Tooltip</h3>
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

const gerberContainer = ref(null)
async function fetchGerberFile(url) {
  const response = await fetch(url)
  return await response.text()
}

onMounted(async () => {
  hotZoneData.value = generateData()
  hotZoneData2.value = generateData()
  const gerberContent = await fetchGerberFile('http://10.22.94.222/3273053a01-cus-l9.gbr')
  console.log('gerberContent', gerberContent)

  const lines = gerberContent.split('\n')
  console.log('lines', lines)
  const elements = []
  let currentAperture = null
  let scale = 0.00001 // 假設單位是毫米，並且坐標格式是 3.5
  let currentX = 0,
    currentY = 0
  let inRegion = false
  let currentPath = []
  let polarity = 'dark'
  let currentTrack = []

  function addTrack() {
    if (currentTrack.length > 1) {
      elements.push({
        type: 'track',
        points: currentTrack,
        aperture: currentAperture,
        polarity
      })
    }
    currentTrack = []
  }

  lines.forEach((line) => {
    if (line.startsWith('%FSLAX')) {
      // 解析坐標格式
      const format = line.match(/%FSLAX(\d)(\d)Y\d\d\*%/)
      if (format) {
        console.log('format', format)
        const [, integerPart, decimalPart] = format

        scale = Math.pow(10, -parseInt(decimalPart))
        console.log('scale', scale)
      }
    } else if (line.startsWith('%ADD')) {
      const match = line.match(/%ADD(\d+)([C,R]),[^*]+\*%/)
      if (match) {
        const [, id, shape, size] = match
        elements.push({ type: 'aperture', id, shape, size: parseFloat(size) })
      }
    } else if (line.startsWith('G54D')) {
      currentAperture = line.match(/G54D(\d+)/)[1]
    } else if (line.match(/X-?\d+Y-?\d+D0[123]/)) {
      const match = line.match(/X(-?\d+)Y(-?\d+)D0([123])/)
      if (match) {
        const [, x, y, d] = match
        const newX = parseInt(x) * scale
        const newY = parseInt(y) * scale
        if (d === '3') {
          addTrack() // 結束當前軌跡
          elements.push({
            type: 'flash',
            x: newX,
            y: newY,
            aperture: currentAperture,
            polarity
          })
        } else if (d === '1') {
          if (currentTrack.length === 0) {
            currentTrack.push({ x: currentX, y: currentY })
          }
          currentTrack.push({ x: newX, y: newY })
        } else if (d === '2') {
          addTrack() // 結束當前軌跡
        }
        currentX = newX
        currentY = newY
      }
    } else if (line.startsWith('G36')) {
      addTrack() // 結束當前軌跡
      inRegion = true
      currentPath = []
    } else if (line.startsWith('G37')) {
      inRegion = false
      if (currentPath.length > 0) {
        elements.push({
          type: 'region',
          path: currentPath,
          polarity
        })
      }
    } else if (inRegion && line.match(/X-?\d+Y-?\d+D0[12]/)) {
      const match = line.match(/X(-?\d+)Y(-?\d+)D0([12])/)
      if (match) {
        const [, x, y, d] = match
        const newX = parseInt(x) * scale
        const newY = parseInt(y) * scale
        currentPath.push({ x: newX, y: newY, command: d === '1' ? 'L' : 'M' })
      }
    } else if (line.startsWith('%LPD*%')) {
      polarity = 'dark'
    } else if (line.startsWith('%LPC*%')) {
      polarity = 'clear'
    }
  })

  // 加最後一個軌跡（如果有的話）
  if (currentTrack.length > 0) {
    elements.push({
      type: 'track',
      points: currentTrack,
      aperture: currentAperture,
      polarity
    })
  }

  console.log('elements', elements)
  const width = 800
  const height = 600
  const margin = { top: 20, right: 20, bottom: 20, left: 20 }

  const svg = d3
    .select(gerberContainer.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

  const allPoints = elements.flatMap((e) => {
    if (e.type === 'flash') return [{ x: e.x, y: e.y }]
    if (e.type === 'line')
      return [
        { x: e.x1, y: e.y1 },
        { x: e.x2, y: e.y2 }
      ]
    if (e.type === 'region') return e.path
    if (e.type === 'track') return e.points
    return []
  })
  console.log('allPoints', allPoints)
  const xExtent = d3.extent(allPoints, (d) => d.x)
  const yExtent = d3.extent(allPoints, (d) => d.y)

  // 調整比例尺以確保負值也能正確顯示

  const xScale = d3
    .scaleLinear()
    .domain([Math.min(0, xExtent[0]), Math.max(0, xExtent[1])])
    .range([0, width - margin.left - margin.right])

  const yScale = d3
    .scaleLinear()
    .domain([Math.min(0, yExtent[0]), Math.max(0, yExtent[1])])
    .range([height - margin.top - margin.bottom, 0])

  // 繪製閃光
  g.selectAll('circle.flash')
    .data(elements.filter((e) => e.type === 'flash'))
    .enter()
    .append('circle')
    .attr('class', 'flash')
    .attr('cx', (d) => xScale(d.x))
    .attr('cy', (d) => yScale(d.y))
    .attr('r', 2)
    .attr('fill', (d) => (d.polarity === 'dark' ? 'black' : 'white'))
    .attr('stroke', 'none')

  //繪製線段
  g.selectAll('line.trace')
    .data(elements.filter((e) => e.type === 'line'))
    .enter()
    .append('line')
    .attr('class', 'trace')
    .attr('x1', (d) => xScale(d.x1))
    .attr('y1', (d) => yScale(d.y1))
    .attr('x2', (d) => xScale(d.x2))
    .attr('y2', (d) => yScale(d.y2))
    .attr('stroke', (d) => (d.polarity === 'dark' ? 'black' : 'white'))
    .attr('stroke-width', 1)

  const regionPath = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))

  g.selectAll('path.region')
    .data(elements.filter((e) => e.type === 'region'))
    .enter()
    .append('path')
    .attr('class', 'region')
    .attr('d', (d) => regionPath(d.path))
    .attr('fill', (d) => (d.polarity === 'dark' ? 'black' : 'white'))

  // 繪製軌跡
  const trackPath = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(d3.curveLinear)

  g.selectAll('path.track')
    .data(elements.filter((e) => e.type === 'track'))
    .enter()
    .append('path')
    .attr('class', 'track')
    .attr('d', (d) => {
      console.log('d', d)
      // 只使用每個 track 的前兩個點，確保它是一個獨立的線段
      return trackPath(d.points.slice(0, 2))
    })
    .attr('stroke', (d) => (d.polarity === 'dark' ? 'black' : 'white'))
    .attr('stroke-width', 1)
    .attr('fill', 'none')
})
</script>
