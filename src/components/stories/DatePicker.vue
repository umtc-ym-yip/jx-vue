<template>
  <StoryContainer title="DatePicker 元件">
    <StorySection title="概述">
      <template #description>
        我們的專案使用了 Vue 3
        Datepicker，這是一個功能強大、輕量級且可重用的日期選擇器組件。它提供了多種模式，如範圍選擇、多種選擇器類型、多日曆等，並且高度可定制。
      </template>
    </StorySection>

    <StorySection title="官方文檔">
      <template #description>
        為了充分利用 Vue 3 Datepicker 的所有功能，請參考其官方文檔：
      </template>
      <JxButton @click="openDocs" type="primary"> 查看 Vue 3 Datepicker 官方文檔 </JxButton>
    </StorySection>

    <StorySection title="主要特點">
      <template #description> Vue 3 Datepicker 提供以下主要特點： </template>
      <template #props>
        <StoryList>
          <li>支持多種模式：單日選擇、日期範圍選擇、多日選擇等</li>
          <li>模塊化設計：提供豐富的功能、插槽和屬性</li>
          <li>高度可定制：支持自定義組件和 CSS 變量</li>
          <li>完全無障礙：符合 WCAG 2.1 標準</li>
          <li>響應式設計：適配移動端和桌面端</li>
          <li>內置暗色和亮色模式</li>
        </StoryList>
      </template>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
import { ref } from 'vue'
import JxButton from '../JxButton.vue'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryList from './StoryList.vue'

const openDocs = () => {
  window.open('https://vue3datepicker.com/', '_blank')
}
</script>
