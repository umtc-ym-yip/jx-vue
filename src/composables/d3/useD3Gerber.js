import * as d3 from 'd3'

export function useD3Gerber() {
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

  const paths = []

  let regionPath
  let isInRegion = false
  let currentPath = []

  function resetState() {
    // Reset all state properties to their initial values
    Object.keys(state).forEach((key) => {
      state[key] = initialState[key]
    })
  }
  function initialState() {
    return {
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
  }

  const COMMANDS = {
    LINEAR: 'G01*',
    CLOCKWISE: 'G02*',
    COUNTERCLOCKWISE: 'G03*',
    REGION_START: 'G36*',
    REGION_END: 'G37*'
  }

  function parseGerberFile(gerberContent) {
    const lines = gerberContent.split('\n')

    lines.forEach((line, index) => {
      line = line.trim()

      if (line.startsWith('%')) {
        handleFormatCommand(line)
      } else if (line.startsWith('G')) {
        handleGCommand(line, index)
      } else if (line.match(/^[XYIJD]/)) {
        handleCoordinate(line, index)
      }
    })
    return state
  }

  function handleFormatCommand(line) {
    if (line.startsWith('%FS')) {
      parseFormatSpecification(line)
    } else if (line.startsWith('%MO')) {
      state.unit = line === '%MOMM*%' ? 'mm' : 'inch'
    } else if (line.startsWith('%ADD')) {
      parseAperture(line)
    } else if (line.startsWith('%LP')) {
      state.layerPolarity = line === '%LPD*%' ? 'dark' : 'clear'
    } else if (line.startsWith('%LN')) {
      state.layerName = line.slice(3, -2)
    }
  }

  function handleGCommand(line, index) {
    if (
      COMMANDS.LINEAR === line ||
      COMMANDS.CLOCKWISE === line ||
      COMMANDS.COUNTERCLOCKWISE === line
    ) {
      state.interpolationMode =
        line === COMMANDS.LINEAR
          ? 'linear'
          : line === COMMANDS.CLOCKWISE
            ? 'clockwise'
            : 'counterclockwise'
      state.currentG = line.slice(1, 3)
      state.coordinates.push({
        command: line.slice(0, 3),
        isInRegion: state.isInRegion,
        index
      })
    } else if (line.startsWith('G54')) {
      state.currentAperture = line.match(/D(\d+)/)?.[1]
    } else if (line === COMMANDS.REGION_START) {
      state.isInRegion = true
      state.coordinates.push({
        command: 'G36',
        isInRegion: true,
        index
      })
    } else if (line === COMMANDS.REGION_END) {
      state.isInRegion = false
      state.coordinates.push({
        command: 'G37',
        isInRegion: false,
        index
      })
    }
    // 可以在这里添加 G74 和 G75 的处理逻辑
  }

  function handleCoordinate(line, index) {
    const coord = parseCoordinate(line, index)
    state.coordinates.push(coord)
  }

  function parseFormatSpecification(line) {
    // 使用命名捕獲組
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
    // %ADD10C,0.077000*% 擷取 10 C 0.077000 ，利用正則表達式 match 的捕獲組
    const match = line.match(/%ADD(\d+)([A-Z]),([\d.]+)\*\%/)

    // pad參數
    if (match) {
      const [, number, shape, paramsString] = match
      let params = []
      if (paramsString) {
        params = paramsString.split('X').map(Number)
      }
      // state.apertures = new Map()

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

    let x = xMatch ? parseInt(xMatch[1]) * state.scale : state.currentX
    let y = yMatch ? parseInt(yMatch[1]) * state.scale : state.currentY

    const d = dMatch?.[0].slice(1) ?? null
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

  function addToPath(coord, xScale, yScale) {
    if (coord.command === '02' || currentPath.length === 0) {
      if (currentPath.length > 0) {
        paths.push(currentPath)
      }
      currentPath = [coord]
    } else {
      currentPath.push(coord)
    }
  }

  function addToRegion(coord, xScale, yScale) {
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
  function renderGerber(data, innerContent, xScale, yScale) {
    innerContent.selectAll('path.gerber-path').remove()
    innerContent.selectAll('circle.gerber-pad').remove()

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))

    // const arc = d3
    //   .arc()
    //   .innerRadius(0)
    //   .outerRadius((d) => Math.abs(d.i || d.j) * (xScale(1) - xScale(0)))
    const padData = []
    data.coordinates.forEach((coord) => {
      if (coord.command === 'G36') {
        isInRegion = true
        regionPath = ''
      } else if (coord.command === 'G37') {
        isInRegion = false
      } else if (isInRegion) {
        // addToRegion(coord, xScale, yScale)
        // 繪製pad
      } else if (coord.command === '03') {
        const aperture = data.apertures[coord.aperture]

        padData.push({
          x: xScale(coord.x),
          y: yScale(coord.y),
          r: aperture ? aperture?.params[0] : 1
        })
        // innerContent
        //   .append('circle')
        //   .attr('class', 'gerber-pad')
        //   .attr('cx', xScale(coord.x))
        //   .attr('cy', yScale(coord.y))
        //   .attr('r', (d) => (aperture ? aperture?.params[0] : 1))
        //   .attr('fill', state.layerPolarity === 'dark' ? 'gray' : 'white')
      } else {
        addToPath(coord, xScale, yScale)
      }
    })

    // innerContent
    //   .selectAll('circle.gerber-pad')
    //   .data(padData)
    //   .enter()
    //   .append('circle')
    //   .attr('class', 'gerber-pad')
    //   .attr('cx', (d) => d.x)
    //   .attr('cy', (d) => d.y)
    //   .attr('r', (d) => d.r)

    if (currentPath.length > 0) {
      paths.push(currentPath)
    }
    innerContent
      .selectAll('path.gerber-path')
      .data(paths)
      .enter()
      .append('path')
      .attr('class', 'gerber-path')
      .attr('d', (d) => line(d))
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
