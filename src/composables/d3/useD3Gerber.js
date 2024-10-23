import * as d3 from 'd3'

export function useD3Gerber() {
  // 常量定義
  const COMMANDS = {
    LINEAR: 'G01*',
    CLOCKWISE: 'G02*',
    COUNTERCLOCKWISE: 'G03*',
    REGION_START: 'G36*',
    REGION_END: 'G37*'
  }

  // 狀態初始化
  const initialState = {
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
    currentG: '01',
    isInRegion: false
  }

  let state = { ...initialState }
  let paths = []
  let regionPaths = []
  let currentPath = []
  let currentRegionPath = ''

  // 輔助函數
  function resetState() {
    state = { ...initialState }
    paths = []
    regionPaths = []
    currentPath = []
    currentRegionPath = ''
  }

  // Gerber 文件解析
  function parseGerberFile(gerberContent) {
    const lines = gerberContent.split('\n')
    lines.forEach((line, index) => {
      line = line.trim()
      if (line.startsWith('%')) handleFormatCommand(line)
      else if (line.startsWith('G')) handleGCommand(line, index)
      else if (line.match(/^[XYIJD]/)) handleCoordinate(line, index)
    })
    return state
  }

  // 命令處理函數
  function handleFormatCommand(line) {
    if (line.startsWith('%FS')) parseFormatSpecification(line)
    else if (line.startsWith('%MO')) state.unit = line === '%MOMM*%' ? 'mm' : 'inch'
    else if (line.startsWith('%ADD')) parseAperture(line)
    else if (line.startsWith('%LP')) state.layerPolarity = line === '%LPD*%' ? 'dark' : 'clear'
    else if (line.startsWith('%LN')) state.layerName = line.slice(3, -2)
  }

  function handleGCommand(line, index) {
    if ([COMMANDS.LINEAR, COMMANDS.CLOCKWISE, COMMANDS.COUNTERCLOCKWISE].includes(line)) {
      state.interpolationMode =
        line === COMMANDS.LINEAR
          ? 'linear'
          : line === COMMANDS.CLOCKWISE
            ? 'clockwise'
            : 'counterclockwise'
      state.currentG = line.slice(1, 3)
      state.coordinates.push({ command: line.slice(0, 3), isInRegion: state.isInRegion, index })
    } else if (line.startsWith('G54')) {
      state.currentAperture = line.match(/D(\d+)/)?.[1]
    } else if (line === COMMANDS.REGION_START) {
      state.isInRegion = true
      state.coordinates.push({ command: 'G36', isInRegion: true, index })
    } else if (line === COMMANDS.REGION_END) {
      state.isInRegion = false
      state.coordinates.push({ command: 'G37', isInRegion: false, index })
    }
  }

  function handleCoordinate(line, index) {
    const coord = parseCoordinate(line, index)
    state.coordinates.push(coord)
  }

  // 解析函數
  function parseFormatSpecification(line) {
    const match = line.match(
      /%FS(?<zeroOmission>[LT])(?<notation>[AI])X(?<xInteger>\d)(?<xDecimal>\d)Y(?<yInteger>\d)(?<yDecimal>\d)\*%/
    )
    if (match) {
      const { groups } = match
      state.format = {
        zeroOmission: groups.zeroOmission === 'L' ? 'leading' : 'trailing',
        notation: groups.notation === 'A' ? 'absolute' : 'incremental',
        xInteger: parseInt(groups.xInteger),
        xDecimal: parseInt(groups.xDecimal),
        yInteger: parseInt(groups.yInteger),
        yDecimal: parseInt(groups.yDecimal)
      }
      state.scale = Math.pow(10, -state.format.xDecimal)
    }
  }

  function parseAperture(line) {
    const match = line.match(/%ADD(\d+)([A-Z]),([\d.]+)\*\%/)
    if (match) {
      const [, number, shape, paramsString] = match
      const params = paramsString ? paramsString.split('X').map(Number) : []
      state.apertures[number] = { shape, params }
    }
  }

  function parseCoordinate(line, index) {
    const xMatch = line.match(/X(-?\d+)/)
    const yMatch = line.match(/Y(-?\d+)/)
    const dMatch = line.match(/D0[123]/)
    const iMatch = line.match(/I(-?\d+)/)
    const jMatch = line.match(/J(-?\d+)/)
    const gMatch = line.match(/G0[123]/)

    const x = xMatch ? parseInt(xMatch[1]) * state.scale : state.currentX
    const y = yMatch ? parseInt(yMatch[1]) * state.scale : state.currentY
    const d = dMatch?.[0].slice(1) ?? null
    const i = iMatch ? parseInt(iMatch[1]) * state.scale : 0
    const j = jMatch ? parseInt(jMatch[1]) * state.scale : 0

    if (gMatch) state.currentG = gMatch[0].slice(1)

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

  // 渲染函數
  function renderGerber(data, innerContent, xScale, yScale) {
    innerContent
      .selectAll('.gerber-pads-container, .gerber-path-container, .gerber-region-container')
      .remove()

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius((d) => Math.abs(d.i || d.j) * (xScale(1) - xScale(0)))

    const padData = []
    paths = []
    regionPaths = []
    currentPath = []
    let isInRegion = false

    data.coordinates.forEach((coord) => {
      if (coord.command === 'G36') {
        isInRegion = true
        currentRegionPath = ''
      } else if (coord.command === 'G37') {
        isInRegion = false
        currentRegionPath += 'Z'
        regionPaths.push(currentRegionPath)
        currentRegionPath = ''
      } else if (isInRegion) {
        addToRegion(coord, xScale, yScale, arc)
      } else if (coord.command === '03') {
        const aperture = data.apertures[coord.aperture]
        padData.push({
          x: xScale(coord.x),
          y: yScale(coord.y),
          r: aperture ? aperture.params[0] : 1
        })
      } else {
        addToPath(coord)
      }
    })

    if (currentPath.length > 0) paths.push(currentPath)

    // 先不渲染區塊
    // renderRegions(innerContent)
    renderBatch(0, 1000, padData, innerContent, xScale, yScale)
  }

  function addToPath(coord) {
    if (coord.command === '02' || currentPath.length === 0) {
      if (currentPath.length > 0) paths.push(currentPath)
      currentPath = [coord]
    } else {
      currentPath.push(coord)
    }
  }

  function addToRegion(coord, xScale, yScale, arc) {
    if (coord.command === '02') {
      currentRegionPath += `M${xScale(coord.x)},${yScale(coord.y)}`
    } else if (coord.g === '01') {
      currentRegionPath += `L${xScale(coord.x)},${yScale(coord.y)}`
    } else {
      const d = arc({
        startAngle: 0,
        endAngle: Math.PI * 2,
        x: coord.x,
        y: coord.y,
        i: coord.i,
        j: coord.j
      })
      currentRegionPath += d
    }
  }

  function renderRegions(innerContent) {
    innerContent
      .append('g')
      .attr('class', 'gerber-region-container')
      .selectAll('path.gerber-region')
      .data(regionPaths)
      .join('path')
      .attr('class', 'gerber-region')
      .attr('d', (d) => d)
      .attr('fill', state.layerPolarity === 'dark' ? 'gray' : 'white')
      .attr('stroke', 'none')
      .attr('opacity', 0.5)
  }

  function renderBatch(startIndex, batchSize, padData, innerContent, xScale, yScale) {
    const endIndex = Math.min(startIndex + batchSize, padData.length)

    innerContent
      .append('g')
      .attr('class', 'gerber-pads-container')
      .selectAll('.circle')
      .data(padData.slice(startIndex, endIndex), (d) => `${d.x},${d.y}`)
      .join('circle')
      .attr('class', 'gerber-pad')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', (d) => d.r)
      .attr('fill', state.layerPolarity === 'dark' ? 'gray' : 'white')

    if (endIndex < padData.length) {
      requestAnimationFrame(() =>
        renderBatch(endIndex, batchSize, padData, innerContent, xScale, yScale)
      )
    } else {
      renderPaths(innerContent, xScale, yScale)
    }
  }

  function renderPaths(innerContent, xScale, yScale) {
    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))

    innerContent
      .append('g')
      .attr('class', 'gerber-path-container')
      .selectAll('path.gerber-path')
      .data(paths)
      .join('path')
      .attr('class', 'gerber-path')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', state.layerPolarity === 'dark' ? 'gray' : 'white')
      .attr('stroke-width', 1)
  }

  return {
    state,
    resetState,
    parseGerberFile,
    renderGerber
  }
}
