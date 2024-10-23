<template>
  <StoryContainer title="JxAvatar 頭像組件">
    <StorySection title="基本用法">
      <template #description>
        JxAvatar 是一個可重用的頭像組件。使用 name 來設置顯示的名稱，method 來定義顯示方式。
      </template>
      <template #code>
        <pre>
&lt;JxAvatar
  name="John Doe"
  method="first"
  :maxLength="4"
/&gt;
        </pre>
      </template>
      <JxAvatar name="John Doe" method="first" :maxLength="4" />
    </StorySection>

    <StorySection title="屬性列表">
      <StoryList>
        <li><StoryCode>name</StoryCode>: 顯示的名稱 (必需，String)</li>
        <li>
          <StoryCode>method</StoryCode>: 顯示方式 (可選，String，默認為 'first')
          <br />
          可選值：'first' (首字母), 'shrink' (縮小), 'initials' (首字母縮寫)
        </li>
        <li><StoryCode>maxLength</StoryCode>: 最大顯示長度 (可選，Number，默認為 4)</li>
        <li><StoryCode>isShow</StoryCode>: 控制下拉菜單的顯示 (可選，Boolean，默認為 false)</li>
        <li><StoryCode>navDirection</StoryCode>: 下拉菜單的方向 (可選，String，默認為 'right')</li>
      </StoryList>
    </StorySection>

    <StorySection title="事件">
      <StoryList>
        <li><StoryCode>@update:isShow</StoryCode>: 當下拉菜單顯示狀態改變時觸發</li>
      </StoryList>
    </StorySection>

    <StorySection title="插槽">
      <StoryList>
        <li><StoryCode>nav</StoryCode>: 用於自定義下拉菜單的內容</li>
      </StoryList>
    </StorySection>

    <StorySection title="不同顯示方式">
      <template #description>使用 method prop 來設置不同的顯示方式。</template>
      <template #code>
        <pre>
&lt;JxAvatar name="John Doe" method="first" /&gt;
&lt;JxAvatar name="John Doe" method="shrink" /&gt;
&lt;JxAvatar name="John Doe" method="initials" /&gt;
        </pre>
      </template>
      <div class="space-x-2">
        <JxAvatar name="John Doe" method="first" />
        <JxAvatar name="John Doe" method="shrink" />
        <JxAvatar name="John Doe" method="initials" />
      </div>
    </StorySection>

    <StorySection title="自定義下拉菜單">
      <template #description>
        使用 nav 插槽來自定義下拉菜單的內容，並使用 Tailwind CSS 類來定義樣式。
      </template>
      <template #code>
        <pre>
&lt;JxAvatar name="John Doe" v-model:isShow="isMenuOpen" navDirection="left"&gt;
  &lt;template #nav="{ isShow, toggleShow, navDirectionClass }"&gt;
    &lt;nav
      v-show="isShow"
      class="absolute top-full right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      :class="[navDirectionClass, isShow ? 'opacity-100' : 'opacity-0']"
    &gt;
      &lt;ul class="py-1"&gt;
        &lt;li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"&gt;個人資料&lt;/li&gt;
        &lt;li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"&gt;設置&lt;/li&gt;
        &lt;li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"&gt;登出&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/nav&gt;
  &lt;/template&gt;
&lt;/JxAvatar&gt;
        </pre>
      </template>
      <JxAvatar name="John Doe" v-model:isShow="isMenuOpen" navDirection="left">
        <template #nav="{ isShow, toggleShow, navDirectionClass }">
          <nav
            v-show="isShow"
            class="absolute top-full right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            :class="[navDirectionClass, isShow ? 'opacity-100' : 'opacity-0']"
          >
            <ul class="py-1">
              <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                個人資料
              </li>
              <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">設置</li>
              <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">登出</li>
            </ul>
          </nav>
        </template>
      </JxAvatar>
    </StorySection>

    <StorySection title="注意事項">
      <template #description>
        <ul class="list-disc list-inside">
          <li>name 屬性是必需的，用於設置顯示的名稱</li>
          <li>method 屬性可以設置不同的顯示方式</li>
          <li>maxLength 屬性可以限制顯示的最大長度</li>
          <li>使用 v-model:isShow 來控制下拉菜單的顯示狀態</li>
          <li>可以使用 nav 插槽來自定義下拉菜單的內容</li>
          <li>navDirection 屬性可以控制下拉菜單的彈出方向</li>
        </ul>
      </template>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
import { ref } from 'vue'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryList from './StoryList.vue'
import StoryCode from './StoryCode.vue'
import JxAvatar from '@/components/JxAvatar.vue'

const isMenuOpen = ref(false)
</script>
