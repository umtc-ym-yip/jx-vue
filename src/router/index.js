import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Button from '../components/stories/Button.vue'
import Input from '../components/stories/Input.vue'
import Board from '../components/stories/Board.vue'
import Tab from '../components/stories/Tab.vue'
import Alert from '../components/stories/Alert.vue'
import Table from '../components/stories/Table.vue'
import Select from '../components/stories/Select.vue'
import Icon from '../components/stories/Icon.vue'
import Modal from '../components/stories/Modal.vue'
import Radio from '../components/stories/Radio.vue'
import PointTrend from '../components/stories/PointTrend.vue'

import { componentLinks, d3Links } from '@/config/navLinks'

// 創建一個函數來生成路由配置
const createRoutes = (links) => {
  return links.map((link) => ({
    path: link.path,
    name: link.name.toLowerCase().replace(' ', '-'),
    component: () => import(`@/components/stories/${link.path}.vue`)
  }))
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/stories/button',
      name: 'Button',
      component: Button
    },
    {
      path: '/stories/input',
      name: 'Input',
      component: Input
    },
    {
      path: '/stories/board',
      name: 'Board',
      component: Board
    },
    {
      path: '/stories/tab',
      name: 'Tab',
      component: Tab
    },
    {
      path: '/stories/alert',
      name: 'Alert',
      component: Alert
    },
    {
      path: '/stories/table',
      name: 'Table',
      component: Table
    },
    {
      path: '/stories/select',
      name: 'Select',
      component: Select
    },
    {
      path: '/stories/icon',
      name: 'Icon',
      component: Icon
    },
    {
      path: '/stories/modal',
      name: 'Modal',
      component: Modal
    },
    {
      path: '/stories/radio',
      name: 'Radio',
      component: Radio
    },
    createRoutes(componentLinks),
    // 組件路由
    // ...createRoutes(componentLinks),
    // Nav2 路由
    // ...createRoutes(d3Links)
    {
      path: '/stories/d3pointtrend',
      name: 'D3PointTrend',
      component: PointTrend
    }
  ]
})

export default router
