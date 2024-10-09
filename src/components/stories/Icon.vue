<template>
  <StoryContainer title="JxIcon 圖標組件">
    <StorySection title="基本用法">
      <template #description>
        JxIcon 是一個靈活的圖標組件，基於 Material Symbols
        圖標系統。它支持自定義大小、顏色、填充度等屬性。
      </template>

      <div class="flex space-x-4">
        <JxIcon>home</JxIcon>
        <JxIcon>search</JxIcon>
        <JxIcon>settings</JxIcon>
      </div>
    </StorySection>

    <StorySection title="屬性列表">
      <StoryList>
        <li><StoryCode>size</StoryCode>: 圖標大小 (可選，Number，默認為 24，範圍 20-48)</li>
        <li><StoryCode>fill</StoryCode>: 填充度 (可選，Number，默認為 0，範圍 0-1)</li>
        <li><StoryCode>weight</StoryCode>: 粗細 (可選，Number，默認為 200，範圍 100-700)</li>
        <li><StoryCode>grade</StoryCode>: 字重 (可選，Number，默認為 0，範圍 -25 到 200)</li>
        <li><StoryCode>color</StoryCode>: 顏色 (可選，String，默認為當前文本顏色)</li>
      </StoryList>
    </StorySection>
    <StorySection title="自定義大小">
      <template #description> 使用 size 屬性來調整圖標大小。size 的值範圍是 20 到 48。 </template>
      <div class="flex items-center space-x-4">
        <JxIcon size="24">star</JxIcon>
        <JxIcon size="36">star</JxIcon>
        <JxIcon size="48">star</JxIcon>
      </div>
    </StorySection>

    <StorySection title="填充度">
      <template #description> fill 屬性控制圖標的填充度，範圍從 0 到 1。 </template>
      <div class="flex space-x-4">
        <JxIcon fill="0">favorite</JxIcon>
        <JxIcon fill="0.5">favorite</JxIcon>
        <JxIcon fill="1">favorite</JxIcon>
      </div>
    </StorySection>

    <StorySection title="粗細">
      <template #description> weight 屬性控制圖標的粗細，範圍從 100 到 700。 </template>
      <div class="flex space-x-4">
        <JxIcon weight="200">format_bold</JxIcon>
        <JxIcon weight="400">format_bold</JxIcon>
        <JxIcon weight="700">format_bold</JxIcon>
      </div>
    </StorySection>

    <StorySection title="顏色">
      <template #description>
        使用 color 屬性來設置圖標顏色。可以使用預設有效的class顏色，預設為黑色
      </template>
      <div class="flex space-x-4">
        <JxIcon color="text-primary-light">favorite</JxIcon>
        <JxIcon color="text-secondary-light">check_circle</JxIcon>
        <JxIcon color="text-error-light">info</JxIcon>
        <JxIcon>home</JxIcon>
      </div>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryList from './StoryList.vue'
import StoryCode from './StoryCode.vue'
import JxIcon from '@/components/JxIcon.vue'
</script>
