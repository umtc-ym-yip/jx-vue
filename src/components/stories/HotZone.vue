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

const gerberContainer = ref(null)
async function fetchGerberFile(url) {
  const response = await axios.get(url)
  return response.data
}

const state = {
  format: null,
  unit: null,
  apertures: {},
  currentAperture: null,
  coordinates: [],
  layerPolarity: 'dark',
  layerName: null,
  scale: 1,
  currentX: 0,
  currentY: 0,
  interpolationMode: 'linear',
  regionMode: false,
  quadrantMode: 'single',
  currentG: '01', // 默認為線性插值
  isInRegion: false
}

function parseAperture(line) {
  const match = line.match(/%ADD(\d+)([A-Z]),?(.*)%/)
  if (match) {
    const [, number, shape, paramsString] = match
    let params = []
    if (paramsString) {
      params = paramsString.split('X').map(Number)
    }
    state.apertures[number] = { shape, params }
  }
}

function parseGerberFile(gerberContent) {
  const lines = gerberContent.split('\n')

  function parseFormatSpecification(line) {
    const match = line.match(/%FS([LT])([AI])X(\d)(\d)Y(\d)(\d)\*%/)
    if (match) {
      state.format = {
        zeroOmission: match[1] === 'L' ? 'leading' : 'trailing',
        notation: match[2] === 'A' ? 'absolute' : 'incremental',
        xInteger: parseInt(match[3]),
        xDecimal: parseInt(match[4]),
        yInteger: parseInt(match[5]),
        yDecimal: parseInt(match[6])
      }
      state.scale = Math.pow(10, -state.format.xDecimal)
    }
  }

  function parseCoordinate(line, index) {
    const xMatch = line.match(/X(-?\d+)/)
    const yMatch = line.match(/Y(-?\d+)/)
    const dMatch = line.match(/D0[123]/)
    const iMatch = line.match(/I(-?\d+)/)
    const jMatch = line.match(/J(-?\d+)/)
    const gMatch = line.match(/G0[123]/)

    let x = xMatch ? parseInt(xMatch[1]) * state.scale : state.currentX
    let y = yMatch ? parseInt(yMatch[1]) * state.scale : state.currentY

    const d = dMatch ? dMatch[0].slice(1) : null
    const i = iMatch ? parseInt(iMatch[1]) * state.scale : 0
    const j = jMatch ? parseInt(jMatch[1]) * state.scale : 0

    if (gMatch) {
      state.currentG = gMatch[0].slice(1)
    }

    state.currentX = x
    state.currentY = y

    return {
      x,
      y,
      command: d,
      i,
      j,
      g: state.currentG,
      index,
      aperture: state.currentAperture,
      interpolationMode: state.interpolationMode,
      isInRegion: state.isInRegion
    }
  }

  lines.forEach((line, index) => {
    line = line.trim()

    if (line.startsWith('%FS')) parseFormatSpecification(line)
    else if (line.startsWith('%MO')) state.unit = line === '%MOMM*%' ? 'mm' : 'inch'
    else if (line.startsWith('%ADD')) parseAperture(line)
    else if (line.startsWith('%LP')) state.layerPolarity = line === '%LPD*%' ? 'dark' : 'clear'
    else if (line.startsWith('%LN')) state.layerName = line.slice(3, -2)
    else if (line === 'G01*' || line === 'G02*' || line === 'G03*') {
      state.interpolationMode =
        line === 'G01*' ? 'linear' : line === 'G02*' ? 'clockwise' : 'counterclockwise'
      state.currentG = line.slice(1, 3)
      state.coordinates.push({
        command: line.slice(0, 3),
        isInRegion: state.isInRegion,
        index
      })
    } else if (line.startsWith('G54')) state.currentAperture = line.match(/D(\d+)/)[1]
    else if (line === 'G36*') {
      state.isInRegion = true
      state.coordinates.push({
        command: 'G36',
        isInRegion: true,
        index
      })
    } else if (line === 'G37*') {
      state.isInRegion = false
      state.coordinates.push({
        command: 'G37',
        isInRegion: false,
        index
      })
    }
    // else if (line === 'G74*' || line === 'G75*') {
    //   state.quadrantMode = line === 'G74*' ? 'single' : 'multi'
    //   state.coordinates.push({
    //     command: line.slice(0, 3),
    //     quadrantMode: state.quadrantMode,
    //     index
    //   })
    // }
    else if (line.match(/^[XYIJD]/)) {
      const coord = parseCoordinate(line, index)
      state.coordinates.push(coord)
    }
  })

  return state
}

function renderGerber(state, svgElement) {
  const svg = d3
    .select(svgElement)
    .style('border', '1px solid black')
    .append('svg')
    .attr('width', 600)
    .attr('height', 600)

  const xExtent = d3.extent(state.coordinates, (d) => d.x)
  const yExtent = d3.extent(state.coordinates, (d) => d.y)

  const xScale = d3
    .scaleLinear()
    .domain([xExtent[0] - 1, xExtent[1] + 1])
    .range([50, 550])
  const yScale = d3
    .scaleLinear()
    .domain([yExtent[0] - 1, yExtent[1] + 1])
    .range([550, 50])

  const line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))

  // const arc = d3
  //   .arc()
  //   .innerRadius(0)
  //   .outerRadius((d) => Math.abs(d.i || d.j) * (xScale(1) - xScale(0)))

  const paths = []
  let currentPath = []
  let isInRegion = false
  let regionPath = ''

  function addToPath(coord) {
    if (coord.command === '02' || currentPath.length === 0) {
      if (currentPath.length > 0) {
        paths.push(currentPath)
      }
      currentPath = [coord]
    } else {
      currentPath.push(coord)
    }
  }

  function addToRegion(coord) {
    if (coord.command === '02') {
      regionPath += `M${xScale(coord.x)},${yScale(coord.y)}`
    } else if (coord.g === '01') {
      regionPath += `L${xScale(coord.x)},${yScale(coord.y)}`
    } else {
      const d = arc({
        startAngle: 0,
        endAngle: Math.PI * 2,
        x: coord.x,
        y: coord.y,
        i: coord.i,
        j: coord.j
      })
      regionPath += d
    }
  }

  state.coordinates.forEach((coord) => {
    if (coord.command === 'G36') {
      isInRegion = true
      regionPath = ''
    } else if (coord.command === 'G37') {
      isInRegion = false
      // svg
      //   .append('path')
      //   .attr('d', regionPath)
      //   .attr('fill', state.layerPolarity === 'dark' ? 'gray' : 'white')
      //   .attr('stroke', 'none')
    } else if (isInRegion) {
      addToRegion(coord)
    } else if (coord.command === '03') {
      const aperture = state.apertures[coord.aperture]
      if (aperture && aperture.shape === 'C') {
        svg
          .append('circle')
          .attr('cx', xScale(coord.x))
          .attr('cy', yScale(coord.y))
          .attr('r', 1)
          .attr('fill', state.layerPolarity === 'dark' ? 'gray' : 'white')
      }
    } else {
      addToPath(coord)
    }
  })

  if (currentPath.length > 0) {
    paths.push(currentPath)
  }

  svg
    .selectAll('path.gerber-path')
    .data(paths)
    .enter()
    .append('path')
    .attr('class', 'gerber-path')
    .attr('d', (d) => line(d))
    .attr('fill', 'none')
    .attr('stroke', state.layerPolarity === 'dark' ? 'black' : 'white')
    .attr('stroke-width', 1)
}

onMounted(async () => {
  hotZoneData.value = generateData()
  hotZoneData2.value = generateData()

  const gerberContent = await fetchGerberFile('http://WYMANU00954:8000/gerber')
  if (gerberContent) {
    const gerberState = parseGerberFile(gerberContent)
    console.log('Parsed Gerber state:', gerberState)
    renderGerber(gerberState, gerberContainer.value)
  } else {
    console.error('Failed to fetch gerber content')
  }
})
</script>
