# JX-Vue Project Template

JX-Vue 是一個基於 Vue 3 Composition API 和 Tailwind CSS 的專案模板。這個模板提供了一系列常用的 UI 組件和基於 D3.js 的數據可視化組件，旨在加速 Vue 3 專案的開發過程。

## 特點

- 使用 Vue 3 Composition API
- 整合 Tailwind CSS 實現快速樣式開發
- 提供常用 UI 組件（Select、Table、Radio 等）
- 包含基於 D3.js 的數據可視化組件
- 遵循最佳實踐和現代前端開發標準

## 快速開始

### 前置條件

- Node.js (版本 14 或更高)
- npm 或 yarn

### 安裝

1. 克隆此儲存庫：

   ```
   git clone https://github.com/your-username/jx-vue.git
   ```

2. 進入專案目錄：

   ```
   cd jx-vue
   ```

3. 安裝依賴：
   ```
   npm install
   ```
   或
   ```
   yarn install
   ```

### 運行開發服務器

```
npm run dev
```

或

```
yarn dev
```

訪問 `http://localhost:3000` 查看您的應用程序。

## 使用指南

### 基礎 UI 組件

JX-Vue 提供了以下常用 UI 組件：

- Select
- Table
- Radio
- Button
- Input
- Modal
- 等等

使用示例：

````vue
<template>
  <JxSelect :options="options" v-model="selectedOption" />
  <JxTable :data="tableData" :columns="tableColumns" />
  <JxRadio :options="radioOptions" v-model="selectedRadio" />
</template>
<script setup>
import { ref } from 'vue'
import { JxSelect, JxTable, JxRadio } from '@/components'
// 組件邏輯...
</script>

### D3.js 數據可視化組件 JX-Vue 還提供了基於 D3.js 的數據可視化組件： - LineChart - BarChart -
PieChart - ScatterPlot - 等等 使用示例： ```vue
<template>
  <JxLineChart :data="lineChartData" />
</template>
<script setup>
import { JxLineChart } from '@/components'
// 圖表邏輯...
</script>
````

### D3.js 數據可視化組件

JX-Vue 還提供了基於 D3.js 的數據可視化組件：

- LineChart
- BarChart
- PieChart
- ScatterPlot
- 等等

使用示例：

vue
<template>
<JxLineChart :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { ref } from 'vue'
import { JxLineChart } from '@/components/d3'
// 圖表邏輯...

## 項目結構

```
jx-vue/
│
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ │ ├── ui/
│ │ └── d3/
│ ├── composables/
│ ├── router/
│ ├── store/
│ ├── views/
│ ├── App.vue
│ └── main.js
├── tests/
├── .gitignore
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## 貢獻

我們歡迎任何形式的貢獻！如果您有任何建議或發現了問題，請提交一個 issue 或發送一個 pull request。

## 授權
