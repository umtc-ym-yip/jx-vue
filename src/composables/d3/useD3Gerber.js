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

export function parseGerberFile(gerberContent) {
  const lines = gerberContent.split('\n')

  lines.forEach((line, index) => {
    line = line.trim()
    if (line.startsWith('%FS')) parseFormatSpecification(line)
    else if (line.startsWith('%MO')) state.unit = line === '%MOMM*%' ? 'mm' : 'inch'
    else if (line.startsWith('%ADD')) parseAperture(line)
    else if (line.startsWith('%LP')) state.layerPolarity = line === '%LPD*%' ? 'dark' : 'clear'
    else if (line.startsWith('%LN')) state.layerName = line.slice(3, -2)
    // 繪製區塊(?)
    else if (line === 'G01*' || line === 'G02*' || line === 'G03*') {
      state.interpolationMode =
        line === 'G01*' ? 'linear' : line === 'G02*' ? 'clockwise' : 'counterclockwise'
      state.currentG = line.slice(1, 3)
      state.coordinates.push({
        command: line.slice(0, 3),
        isInRegion: state.isInRegion,
        index
      })
    } else if (line.startsWith('G54')) {
      state.currentAperture = line.match(/D(\d+)/)[1]
    } else if (line === 'G36*') {
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

    // X50720Y1678360D01* XYIJD開頭的字串會被解析成座標
    else if (line.match(/^[XYIJD]/)) {
      const coord = parseCoordinate(line, index)
      state.coordinates.push(coord)
    }
  })

  return state
}
export function parseFormatSpecification(line) {
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

export function parseAperture(line) {
  // %ADD10C,0.077000*% 擷取 10 C 0.077000 ，利用正則表達式 match 的捕獲組
  const match = line.match(/%ADD(\d+)([A-Z]),([\d.]+)\*\%/)

  // pad參數
  if (match) {
    const [, number, shape, paramsString] = match
    let params = []
    if (paramsString) {
      params = paramsString.split('X').map(Number)
    }
    state.apertures[number] = { shape, params }
  }
}

export function parseCoordinate(line, index) {
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
