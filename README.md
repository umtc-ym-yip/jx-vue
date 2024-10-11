<<<<<<< HEAD
# JX-Vue Project Template

JX-Vue 是一個基於 Vue 3 Composition API 和 Tailwind CSS 的專案模板。這個模板提供了一系列常用的 UI 組件和基於 D3.js 的數據可視化組件，旨在加速 Vue 3 專案的開發過程。

## 特點

- 使用 Vue 3 Composition API
- 整合 Tailwind CSS 實現快速樣式開發
- 提供常用 UI 組件（Select、Table、Radio 等）
- 包含基於 D3.js 的數據可視化組件
- 遵循最佳實踐和現代前端開發標準
=======
# JX-Vue 專案模板

**JX-Vue** 是一個基於 Vue 3 Composition API 和 Tailwind CSS 的現代化專案模板。該模板內建一系列常用 UI 組件及基於 D3.js 的數據可視化組件，旨在幫助開發者快速構建具有高度擴展性和優雅設計的前端應用程式。

## 目錄
- [特點](#特點)
- [快速開始](#快速開始)
  - [前置條件](#前置條件)
  - [安裝](#安裝)
  - [運行開發伺服器](#運行開發伺服器)
- [使用指南](#使用指南)
  - [基礎 UI 組件](#基礎-ui-組件)
  - [D3.js 數據可視化組件](#d3js-數據可視化組件)
- [專案結構](#專案結構)
- [Git 提交規範](#git-提交規範)
  - [提交範例](#提交範例)
- [最佳實踐](#最佳實踐)
- [常見問題](#常見問題)
- [貢獻指南](#貢獻指南)

## 特點

- **Vue 3 Composition API**：使用 Vue 3 最新的 Composition API，提升組件的靈活性與複用性。
- **Tailwind CSS**：高度整合 Tailwind CSS，讓您能快速構建響應式和現代化的 UI。
- **UI 組件庫**：提供常用的 UI 組件，如 Select、Table、Radio、Button、Modal 等，幫助您快速構建 UI 元件。
- **D3.js 數據可視化**：內建基於 D3.js 的數據可視化組件，如折線圖、柱狀圖、圓餅圖等，讓您輕鬆整合數據可視化功能。
- **Vite 構建工具**：使用 Vite 作為構建工具，支持即時開發伺服器與高效編譯生產環境代碼。
>>>>>>> ff3f097ca01bdd9ac00bb319f6aee267f859c7fd

## 快速開始

### 前置條件

<<<<<<< HEAD
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
=======
請確保本地已安裝以下工具：

- [Node.js](https://nodejs.org/) 版本 14 或更高
- [npm](https://www.npmjs.com/) 或 [yarn](https://yarnpkg.com/)

### 安裝

1. **克隆此儲存庫：**

   ```bash
   git clone https://github.com/your-username/jx-vue.git
   ```

2. **進入專案目錄：**

   ```bash
   cd jx-vue
   ```

3. **安裝依賴：**

   使用 npm：

   ```bash
   npm install
   ```

   或使用 yarn：

   ```bash
   yarn install
   ```

### 運行開發伺服器

運行以下命令來啟動本地開發伺服器：

```bash
>>>>>>> ff3f097ca01bdd9ac00bb319f6aee267f859c7fd
npm run dev
```

或

<<<<<<< HEAD
```
yarn dev
```

訪問 `http://localhost:3000` 查看您的應用程序。
=======
```bash
yarn dev
```

開發伺服器啟動後，您可以在瀏覽器中訪問 [http://localhost:3000](http://localhost:3000) 來查看應用程式。
>>>>>>> ff3f097ca01bdd9ac00bb319f6aee267f859c7fd

## 使用指南

### 基礎 UI 組件

<<<<<<< HEAD
JX-Vue 提供了以下常用 UI 組件：

- Select
- Table
- Radio
- Button
- Input
- Modal
- 等等

使用示例：
=======
JX-Vue 提供了一系列常用的 UI 組件，這些組件已經過精心設計和測試，幫助您快速構建應用程式中的交互界面。

#### 支援的 UI 組件：

- **Select** - 下拉選單
- **Table** - 表格
- **Radio** - 單選按鈕
- **Button** - 按鈕
- **Input** - 輸入框
- **Modal** - 模態框
- 以及更多...

#### 使用範例：
>>>>>>> ff3f097ca01bdd9ac00bb319f6aee267f859c7fd

```vue
<template>
  <JxSelect :options="options" v-model="selectedOption" />
  <JxTable :data="tableData" :columns="tableColumns" />
  <JxRadio :options="radioOptions" v-model="selectedRadio" />
</template>
<<<<<<< HEAD
=======

>>>>>>> ff3f097ca01bdd9ac00bb319f6aee267f859c7fd
<script setup>
import { ref } from 'vue'
import { JxSelect, JxTable, JxRadio } from '@/components'
// 組件邏輯...
</script>
```

### D3.js 數據可視化組件

<<<<<<< HEAD
JX-Vue 還提供了基於 D3.js 的數據可視化組件：

- LineChart
- BarChart
- PieChart
- ScatterPlot
- 等等

使用示例：
=======
JX-Vue 內建了基於 D3.js 的數據可視化組件，方便開發者快速集成各種圖表功能來展示數據。

#### 支援的圖表類型：

- **LineChart** - 折線圖
- **BarChart** - 柱狀圖
- **PieChart** - 圓餅圖
- **ScatterPlot** - 散點圖

#### 使用範例：
>>>>>>> ff3f097ca01bdd9ac00bb319f6aee267f859c7fd

```vue
<template>
  <JxLineChart :data="lineChartData" />
</template>
<<<<<<< HEAD
=======

>>>>>>> ff3f097ca01bdd9ac00bb319f6aee267f859c7fd
<script setup>
import { JxLineChart } from '@/components'
// 圖表邏輯...
</script>
```

<<<<<<< HEAD
### D3.js 數據可視化組件

JX-Vue 還提供了基於 D3.js 的數據可視化組件：

- LineChart
- BarChart
- PieChart
- ScatterPlot
- 等等

使用示例：

```vue
<template>
  <JxLineChart :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { ref } from 'vue'
import { JxLineChart } from '@/components/d3'
// 圖表邏輯...
</script>
```

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
=======
## 專案結構

專案結構簡單明瞭，適合進行擴展和自定義：

```bash
jx-vue/
│
├── public/               # 靜態資源
├── src/
│   ├── assets/           # 資產文件 (圖片、字體等)
│   ├── components/       # 組件
│   ├── composables/      # Vue Composition API Hooks
│   ├── router/           # 路由配置
│   ├── views/            # 頁面組件
│   ├── App.vue           # 主應用組件
│   └── main.js           # 入口文件
├── .gitignore            # Git 忽略規則
├── package.json          # 專案配置
├── README.md             # 專案說明文件
├── tailwind.config.js    # Tailwind CSS 配置
└── vite.config.js        # Vite 配置
```

## Git 提交規範

為了保持提交歷史的清晰和一致性，請遵循以下 `[type/scope]` 格式來編寫提交信息：

| Type      | 說明                                     | Scope           | 說明                                               |
|-----------|------------------------------------------|-----------------|---------------------------------------------------|
| `fix`     | 修復問題或 Bug                           | 文件/模組名     | 修改影響的文件或模組，例如 `TrendPoint.vue`        |
| `feat`    | 添加新功能                               | 功能/模組名     | 添加新功能的模組或組件，例如 `Zoom`, `Authentication`|
| `refactor`| 代碼重構，未添加新功能或修復 Bug         | 文件/模組名     | 代碼結構或邏輯的重構，影響的文件或模組            |
| `docs`    | 文檔更新                                 | 文件/模組名     | 涉及文檔更新的部分，例如 `README`, `API Docs`      |
| `test`    | 測試相關更改                             | 文件/模組名     | 測試相關的修改，例如 `unit tests`, `integration tests`|
| `style`   | 代碼格式化，無功能性更改                 | 文件/模組名     | 例如 `CSS` 文件，代碼的格式化調整                 |
| `chore`   | 專案構建或工具更改，不影響源代碼         | 文件/工具名     | 例如 `package.json`, `CI` 配置相關                 |

### 提交範例

- `[fix/TrendPoint.vue] 修復 TrendPoint.vue 縮放功能`
- `[feat/Zoom] 添加縮放功能到 TrendPoint.vue`
- `[refactor/TrendPoint.vue] 重構 TrendPoint.vue 組件的縮放邏輯`
- `[docs/Zoom] 更新 TrendPoint.vue 縮放功能的文檔`

## 最佳實踐

1. **保持簡潔的組件設計**：每個組件應該只專注於單一功能，確保它們易於維護和測試。
2. **優先考慮組件的可重用性**：盡可能將邏輯和樣式分離，這樣可以更好地重用組件。
3. **使用 Composition API**：使用 Vue 3 的 Composition API 來組織和管理邏輯，提升可維護性。

## 常見問題

### 如何擴展現有的組件？

您可以通過創建新的組件或修改現有的組件來擴展功能。每個組件都具有良好的結構，便於自定義。

### 是否可以將此模板用於商業專案？

此專案是公司內部使用，並不開放商業授權。如果您有其他的使用需求，請遵循公司內部政策。

## 貢獻指南

此專案為公司內部使用，開發人員可根據需求提出改進或功能建議。任何新的功能或修復都應遵循以下步驟：

1. 從主分支創建新的功能分支（命名格式如：`feature/功能名稱` 或 `fix/修復內容`）。
2. 完成開發並進行自我測試。
3. 提交代碼，並使用 [Git 提交規範](#git-提交規範) 編寫提交信息。
4. 創建 Pull Request，等待團隊審核並合併代碼。

## 注意事項

- 請確保所有提交的代碼符合內部的代碼規範。
- 每次提交請附上詳細的功能描述或 Bug 修復說明，以便於團隊成員理解更改內容。
>>>>>>> ff3f097ca01bdd9ac00bb319f6aee267f859c7fd
