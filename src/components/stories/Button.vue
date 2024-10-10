<template>
  <StoryContainer title="JxButton 元件">
    <StorySection title="按鈕大小">
      <template #description>
        <p class="text-gray-700">
          JxButton
          元件支援三種不同的大小：小、中、大。這允許您根據不同的使用場景選擇適當的按鈕大小。
        </p>
      </template>

      <template #usage>
        <p class="text-gray-700">
          使用 <StoryCode>size</StoryCode> 屬性來設定按鈕大小。可選值為
          <StoryCode>sm</StoryCode
          >（小）、<StoryCode>md</StoryCode>（中，預設）、<StoryCode>lg</StoryCode>（大）。
        </p>
      </template>

      <template #props>
        <StoryList>
          <li><span class="font-semibold">size:</span> 設定按鈕大小，可選值為 sm、md、lg</li>
          <li>
            <span class="font-semibold">color:</span> 設定按鈕顏色，可選值為
            primary、secondary、error、warning、success
          </li>
          <li><span class="font-semibold">text:</span> 設定按鈕文字內容</li>
        </StoryList>
      </template>

      <template #code>
        <pre>
         &lt;JxButton size="sm" color="primary" text="小按鈕" /&gt;
&lt;JxButton size="md" color="primary" text="中按鈕" /&gt;
&lt;JxButton size="lg" color="primary" text="大按鈕" /&gt;</pre
        >
      </template>

      <template #notes>
        <p class="text-gray-700">預設大小為 md。按鈕大小會影響內部的 padding 和字體大小。</p>
      </template>

      <div class="flex space-x-2">
        <JxButton text="小" size="sm" color="primary" />
        <JxButton text="中" size="md" color="primary" />
        <JxButton text="大" size="lg" color="primary" />
      </div>
    </StorySection>

    <StorySection title="按鈕顏色">
      <template #description>
        <p class="text-gray-700">JxButton 元件支援多種顏色主題，以適應不同的設計需求和使用場景。</p>
      </template>

      <template #usage>
        <p class="text-gray-700">
          使用 <StoryCode>color</StoryCode> 屬性來設定按鈕顏色。可選值為
          <StoryCode>primary</StoryCode
          >、<StoryCode>secondary</StoryCode>、<StoryCode>error</StoryCode>、<StoryCode>warning</StoryCode>、<StoryCode>success</StoryCode>。
        </p>
      </template>

      <template #props>
        <StoryList>
          <li>
            <span class="font-semibold">color:</span> 設定按鈕顏色，可選值為
            primary、secondary、error、warning、success
          </li>
          <li><span class="font-semibold">text:</span> 設定按鈕文字內容</li>
        </StoryList>
      </template>

      <template #code>
        >&lt;JxButton color="primary" text="主要" /&gt; &lt;JxButton color="secondary" text="次要"
        /&gt; &lt;JxButton color="error" text="危險" /&gt; &lt;JxButton color="warning" text="警告"
        /&gt; &lt;JxButton color="success" text="成功" /&gt;
      </template>

      <template #notes>
        <p class="text-gray-700">
          預設顏色為 primary。不同顏色主題可用於表示不同的操作重要性或結果。
        </p>
      </template>

      <div class="flex space-x-2">
        <JxButton text="主要" color="primary" />
        <JxButton text="次要" color="secondary" />
        <JxButton text="危險" color="error" />
        <JxButton text="警告" color="warning" />
        <JxButton text="成功" color="success" />
      </div>
    </StorySection>

    <StorySection title="帶圖標的按鈕">
      <template #description>
        <p class="text-gray-700">
          JxButton 元件支援在按鈕中添加圖標，以增強視覺效果和提高可識別性。
        </p>
      </template>

      <template #usage>
        <p class="text-gray-700">
          使用 <StoryCode>icon</StoryCode> 屬性來設定按鈕圖標。使用
          <StoryCode>iconPosition</StoryCode> 屬性來設定圖標位置，可選值為
          <StoryCode>left</StoryCode>（預設）或 <StoryCode>right</StoryCode>。
        </p>
      </template>

      <template #props>
        <StoryList>
          <li><span class="font-semibold">icon:</span> 設定按鈕圖標，使用圖標名稱</li>
          <li>
            <span class="font-semibold">iconPosition:</span> 設定圖標位置，可選值為 left、right
          </li>
          <li><span class="font-semibold">isOutline:</span> 設定按鈕是否為空心按鈕</li>
          <li><span class="font-semibold">text:</span> 設定按鈕文字內容</li>
          <li><span class="font-semibold">color:</span> 設定按鈕顏色</li>
        </StoryList>
      </template>

      <template #code>
        <pre>
&lt;JxButton icon="home" text="首頁" color="primary" /&gt;
&lt;JxButton icon="settings" text="設置" color="secondary" iconPosition="right" /&gt;
&lt;JxButton icon="delete" color="error" /&gt;</pre
        >
      </template>

      <template #notes>
        <p class="text-gray-700">
          圖標可以單獨使用，也可以與文字結合使用。確保選擇的圖標能夠清晰地傳達按鈕的功能。
        </p>
      </template>

      <div class="flex space-x-2">
        <JxButton icon="home" text="首頁" color="primary" />
        <JxButton icon="settings" text="設置" color="secondary" iconPosition="right" />
        <JxButton icon="delete" color="error" />
        <JxButton icon="delete" color="error" :is-outline="true" text="刪除" />
      </div>
    </StorySection>

    <StorySection title="禁用狀態">
      <template #description>
        <p class="text-gray-700">JxButton 元件可以設置為禁用狀態，用於表示該操作當前不可用。</p>
      </template>

      <template #usage>
        <p class="text-gray-700">使用 <StoryCode>disabled</StoryCode> 屬性來設定按鈕的禁用狀態。</p>
      </template>

      <template #props>
        <StoryList>
          <li><span class="font-semibold">disabled:</span> 設定按鈕是否禁用，布林值</li>
          <li><span class="font-semibold">text:</span> 設定按鈕文字內容</li>
          <li><span class="font-semibold">color:</span> 設定按鈕顏色</li>
        </StoryList>
      </template>

      <template #code>
        <pre>
&lt;JxButton text="正常按鈕" color="primary" /&gt;
&lt;JxButton text="禁用按鈕" color="primary" disabled /&gt;</pre
        >
      </template>

      <template #notes>
        <p class="text-gray-700">禁用狀態的按鈕會顯示為灰色，並且不響應點擊事件。</p>
      </template>

      <div class="flex space-x-2">
        <JxButton text="正常按鈕" color="primary" />
        <JxButton text="禁用按鈕" :disabled="true" />
      </div>
    </StorySection>

    <StorySection title="載入狀態">
      <template #description>
        <p class="text-gray-700">JxButton 元件可以顯示載入狀態，用於表示操作正在進行中。</p>
      </template>

      <template #usage>
        <p class="text-gray-700">使用 <StoryCode>loading</StoryCode> 屬性來設定按鈕的載入狀態。</p>
      </template>

      <template #props>
        <StoryList>
          <li><span class="font-semibold">loading:</span> 設定按鈕是否顯示載入狀態，布林值</li>
          <li><span class="font-semibold">text:</span> 設定按鈕文字內容</li>
          <li><span class="font-semibold">color:</span> 設定按鈕顏色</li>
        </StoryList>
      </template>

      <template #code>
        <pre>
&lt;JxButton text="正常按鈕" color="primary" /&gt;
&lt;JxButton text="載入中" color="primary" :loading="true" /&gt;</pre
        >
      </template>

      <template #notes>
        載入狀態的按鈕會顯示一個旋轉的載入圖標，並且不響應點擊事件。
      </template>

      <div class="flex space-x-2">
        <JxButton text="正常按鈕" color="primary" />
        <JxButton text="模擬載入" color="primary" :loading="isLoading" @click="loadingClick" />
      </div>
    </StorySection>
  </StoryContainer>
  <JxAlert v-model:show="alertConfig.show" v-bind="alertConfig"/>
</template>

<script setup>
import { ref } from 'vue'
import JxButton from '../JxButton.vue'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryCode from './StoryCode.vue'
import StoryList from './StoryList.vue'

import {showAlert,alertConfig} from '@/utils/sweetalert/swal.js'
import JxAlert from '../JxAlert.vue'

const isLoading = ref(false)
function loadingClick(){
  isLoading.value = true
  setTimeout(() => {
    showAlert('success', '載入成功')
    isLoading.value = false
  }, 3000)
}
</script>
