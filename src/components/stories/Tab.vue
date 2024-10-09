<template>
  <StoryContainer title="JxTab 元件">
    <StorySection title="基本用法">
      <template #description>
        JxTab 是一個用於創建標籤組件。它提供了靈活的自定義選項和響應式設計。
      </template>

      <template #usage>
        使用 <StoryCode>data</StoryCode> 屬性來設置標籤頁的數據，每個標籤項應包含
        <StoryCode>key</StoryCode> 和 <StoryCode>label</StoryCode>。
      </template>

      <template #code>
        <pre>
          &lt;JxTab :data="tabData" @click="handleTabClick"&gt; &lt;/JxTab&gt; 
          &lt;script setup&gt;
          const tabData = [ { key: 'tab1', label: '標籤 1' }, { key: 'tab2', label: '標籤 2' }, { key:'tab3', label: '標籤 3' } ] 
        const handleTabClick = (item) => { console.log(`Clicked tab:
        ${item.label}, index: ${item.index}`) } 
        &lt;/script&gt;
        </pre>
      </template>

      <JxTab :data="tabData" @click="handleTabClick"> </JxTab>
    </StorySection>

    <StorySection title="屬性">
      <template #description> JxTab 組件接受以下屬性： </template>

      <StoryList>
        <li><StoryCode>data</StoryCode>: 標籤頁數據數組，每項包含 key 和 label</li>
        <li><StoryCode>listClass</StoryCode>: 應用於標籤列表的 CSS 類</li>
        <li><StoryCode>itemClass</StoryCode>: 應用於每個標籤項的 CSS 類</li>
        <li><StoryCode>activeClass</StoryCode>: 應用於激活標籤的 CSS 類</li>
        <li><StoryCode>inactiveClass</StoryCode>: 應用於非激活標籤的 CSS 類</li>
        <li><StoryCode>underlineClass</StoryCode>: 應用於下劃線的 CSS 類</li>
      </StoryList>
    </StorySection>

    <StorySection title="自定義樣式">
      <template #description>
        JxTab 提供了多個屬性來自定義其外觀，包括列表、項目、激活和非激活狀態的樣式。
      </template>

      <template #code>
        &lt;JxTab :data="tabData" listClass="bg-gray-100 rounded-t-lg" itemClass="px-6 py-3"
        activeClass="text-red-600 font-bold" inactiveClass="text-gray-500 hover:text-gray-700"
        underlineClass="bg-red-600" &gt; &lt;/JxTab&gt;
      </template>

      <JxTab
        :data="tabData"
        listClass="bg-gray-100 rounded-t-lg text-xl"
        itemClass="px-6 py-3"
        activeClass="text-red-600 font-bold"
        inactiveClass="text-gray-500 hover:text-gray-700"
        underlineClass="bg-red-600"
      />
    </StorySection>

    <StorySection title="事件">
      <template #description>
        JxTab 組件會在標籤被點擊時觸發
        <StoryCode>click</StoryCode> 事件。事件處理函數會接收一個包含被點擊項目信息的對象作為參數。
      </template>

      <template #code>
        <pre>
        &lt;JxTab :data="tabData" @click="handleTabClick"&gt;&lt;/JxTab&gt; 
        &lt;script setup&gt;
        const handleTabClick = (item) => { console.log(`Clicked tab: ${item.label}, index:
        ${item.index}`) } 
        &lt;/script&gt;
      </pre
        >
      </template>

      <JxTab :data="tabData" @click="handleTabClick"></JxTab>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
import { ref } from 'vue'
import JxTab from '../JxTab.vue'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryCode from './StoryCode.vue'
import StoryList from './StoryList.vue'

const tabData = ref([
  { key: 'tab1', label: '標籤 1' },
  { key: 'tab2', label: '標籤 2' },
  { key: 'tab3', label: '標籤 3' }
])

const handleTabClick = (item) => {
  console.log(`Clicked tab: ${item.label}, index: ${item.index}`)
}
</script>
