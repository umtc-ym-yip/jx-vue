<template>
  <StoryContainer title="JxModal 模態框組件">
    <StorySection title="基本用法">
      <template #description>
        JxModal 是一個可重用的模態框組件，支持自定義標題、內容和底部按鈕。使用 v-model
        來控制模態框的顯示與隱藏。
      </template>
      <div>
        <JxButton @click="showBasicModal = true"> 打開基本模態框 </JxButton>
        <JxModal v-model="showBasicModal" title="基本模態框">
          <p>這是一個基本的模態框示例。</p>
        </JxModal>
      </div>
    </StorySection>

    <StorySection title="屬性列表">
      <StoryList>
        <li><StoryCode>v-model</StoryCode>: 控制模態框的顯示與隱藏 (必需，Boolean)</li>
        <li><StoryCode>title</StoryCode>: 模態框標題 (可選，String，默認為空字符串)</li>
        <li>
          <StoryCode>size</StoryCode>: 模態框大小 (可選，String，可選值：'small', 'medium', 'large',
          'fullscreen'，默認為 'medium')
        </li>
        <li>
          <StoryCode>showFooter</StoryCode>: 是否顯示底部按鈕區域 (可選，Boolean，默認為 true)
        </li>
        <li><StoryCode>cancelText</StoryCode>: 取消按鈕文字 (可選，String，默認為 '取消')</li>
        <li><StoryCode>confirmText</StoryCode>: 確認按鈕文字 (可選，String，默認為 '確定')</li>
      </StoryList>
    </StorySection>
    <StorySection title="自定義大小">
      <template #description>
        使用 size 屬性來調整模態框大小。可選值有 'small'、'medium'（默認）、'large' 和
        'fullscreen'。
      </template>
      <div class="flex">
        <JxButton @click="showSmallModal = true" class="mr-2"> 小型模態框 </JxButton>
        <JxButton @click="showLargeModal = true" class="mr-2"> 大型模態框 </JxButton>
        <JxButton @click="showFullscreenModal = true"> 全屏模態框 </JxButton>
        <JxModal v-model="showSmallModal" title="小型模態框" size="small">
          <p>這是一個小型模態框。</p>
        </JxModal>
        <JxModal v-model="showLargeModal" title="大型模態框" size="large">
          <p>這是一個大型模態框。</p>
        </JxModal>
        <JxModal v-model="showFullscreenModal" title="全屏模態框" size="fullscreen">
          <p>這是一個全屏模態框。</p>
        </JxModal>
      </div>
    </StorySection>

    <StorySection title="自定義底部按鈕">
      <template #description>
        使用 cancelText 和 confirmText 屬性來自定義底部按鈕的文字。使用 @cancel 和 @confirm
        事件來處理按鈕點擊。
      </template>
      <div>
        <JxButton @click="showCustomButtonModal = true"> 自定義按鈕模態框 </JxButton>
        <JxModal
          v-model="showCustomButtonModal"
          title="自定義按鈕"
          cancelText="取消操作"
          confirmText="確認操作"
          @cancel="handleCancel"
          @confirm="handleConfirm"
        >
          <p>點擊底部按鈕查看控制台輸出。</p>
        </JxModal>
      </div>
    </StorySection>

    <StorySection title="隱藏底部">
      <template #description> 使用 showFooter 屬性來控制是否顯示底部按鈕區域。 </template>
      <div>
        <JxButton @click="showNoFooterModal = true"> 無底部模態框 </JxButton>
        <JxModal v-model="showNoFooterModal" title="無底部" :showFooter="false">
          <p>這個模態框沒有底部按鈕區域。</p>
        </JxModal>
      </div>
    </StorySection>

    <StorySection title="事件">
      <StoryList>
        <li><StoryCode>@update:modelValue</StoryCode>: 當模態框顯示狀態改變時觸發</li>
        <li><StoryCode>@cancel</StoryCode>: 點擊取消按鈕時觸發</li>
        <li><StoryCode>@confirm</StoryCode>: 點擊確認按鈕時觸發</li>
      </StoryList>
    </StorySection>
  </StoryContainer>
</template>
<script setup>
import { ref } from 'vue'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryList from './StoryList.vue'
import StoryCode from './StoryCode.vue'
import JxModal from '@/components/JxModal.vue'
import JxButton from '@/components/JxButton.vue'
const showBasicModal = ref(false)
const showSmallModal = ref(false)
const showLargeModal = ref(false)
const showFullscreenModal = ref(false)
const showCustomButtonModal = ref(false)
const showNoFooterModal = ref(false)
const handleCancel = () => {
  console.log('取消按鈕被點擊')
}
const handleConfirm = () => {
  console.log('確認按鈕被點擊')
}
</script>
