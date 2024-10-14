export const componentLinks = [
  { name: 'Alert', path: '/stories/alert' },
  { name: 'Button', path: '/stories/button' },
  { name: 'Board', path: '/stories/board' },
  { name: 'CheckBox', path: '/stories/checkbox' },
  { name: 'EmptyStatus', path: '/stories/emptystatus' },
  { name: 'Input', path: '/stories/input' },
  { name: 'Icon', path: '/stories/icon' },
  { name: 'Radio', path: '/stories/radio' },
  { name: 'Modal', path: '/stories/modal' },
  { name: 'Select', path: '/stories/select' },
  { name: 'Tab', path: '/stories/tab' },
  { name: 'Table', path: '/stories/table' }

  // 添加更多組件連結...
]

export const d3Links = [
  { name: 'D3PointTrend', path: '/stories/pointtrend' },
  { name: 'D3PanelMapping', path: '/stories/panelmapping' },
  { name: 'D3StackBarTrend', path: '/stories/stackbartrend' },
  { name: 'D3Pareto', path: '/stories/pareto' }
  // 添加更多 nav2 的連結...
]

export const nav3Links = [
  { name: 'Link A', path: '/nav3/linkA' },
  { name: 'Link B', path: '/nav3/linkB' }
  // 添加更多 nav3 的連結...
]

export const nav4Links = [
  { name: 'Item X', path: '/nav4/itemX' },
  { name: 'Item Y', path: '/nav4/itemY' }
  // 添加更多 nav4 的連結...
]

export const navItems = [
  { id: 1, label: '一般共用組件', icon: 'person', links: componentLinks },
  { id: 2, label: 'D3共用組件', icon: 'folder', links: d3Links },
  { id: 3, label: 'nav 3', icon: 'download', links: nav3Links },
  { id: 4, label: 'nav 4', icon: 'group', links: nav4Links }
]
