import { createRouter, createWebHistory } from 'vue-router'

// name 是文件名
// path 是文件路徑
const componentConfigs = [
  { path: '/button', name: 'Button' },
  { path: '/input', name: 'Input' },
  { path: '/board', name: 'Board' },
  { path: '/tab', name: 'Tab' },
  { path: '/alert', name: 'Alert' },
  { path: '/table', name: 'Table' },
  { path: '/select', name: 'Select' },
  { path: '/icon', name: 'Icon' },
  { path: '/modal', name: 'Modal' },
  { path: '/radio', name: 'Radio' },
  { path: '/emptystatus', name: 'EmptyStatus' },
  { path: '/checkbox', name: 'CheckBox' },
  { path: '/notice', name: 'Notice' },
  { path: '/datepicker', name: 'DatePicker' }
]
const d3Configs = [
  { path: '/pointtrend', name: 'PointTrend' },
  { path: '/panelmapping', name: 'PanelMapping' },
  { path: '/stackbartrend', name: 'StackBarTrend' },
  { path: '/pareto', name: 'Pareto' }
]

// 創建一個函數來生成路由配置
const modules = import.meta.glob('../components/**/*.vue')
const createRoutes = (links, options = {}) => {
  const { pathPrefix = '', componentPrefix = '/components/stories' } = options
  return links.map((link) => ({
    path: `${pathPrefix}${link.path}`,
    name: link.name.toLowerCase().replace(' ', '-'),
    component: modules[`..${componentPrefix}/${link.name}.vue`]
  }))
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...createRoutes(componentConfigs, { pathPrefix: '/stories' }),
    ...createRoutes(d3Configs, { pathPrefix: '/stories' })
  ]
})

export default router
