<template>
  <StoryContainer title="JxNotice 元件">
    <StorySection title="概述">
      <template #description>
        JxNotice
        是一個用於顯示通知或提示信息的元件。它支持多種樣式和配置選項，可以根據不同的場景進行自定義。通知可以通過按鈕觸發顯示，並支持自動關閉或手動關閉。
      </template>
    </StorySection>

    <StorySection title="基本使用">
      <template #description>
        要使用 JxNotice，首先需要導入組件並在模板中使用。通過 v-model
        綁定一個布爾值來控制通知的顯示和隱藏。
      </template>

      <template #code>
        <pre>
import { ref } from 'vue'
import JxNotice from '@/components/JxNotice.vue'

const showNotice = ref(false)


&lt;JxButton @click="showNotice = true"&gt;顯示通知&lt;/JxButton&gt;
&lt;JxNotice
  v-if="showNotice"
  width="w-1/3"
  position="top-1/2"
  title="成功通知"
  message="操作已成功完成"
  @close="showNotice = false"
/&gt;
 
        </pre>
      </template>

      <template #usage> 使用v-if來觸發內部onMounted機制，並在close事件中關閉通知。 </template>

      <JxButton @click="showNotice = true">顯示通知</JxButton>
      <JxNotice
        v-if="showNotice"
        width="w-1/3"
        position="top-1/2"
        title="成功通知"
        message="操作已成功完成"
        type="success"
        :has-icon="true"
        iconName="task_alt"
        iconColor="success"
        iconSize="4xl"
        @close="showNotice = false"
      />
    </StorySection>

    <StorySection title="屬性">
      <template #description> JxNotice 組件支持以下屬性： </template>

      <template #props>
        <StoryList>
          <li>
            <span class="font-semibold">v-model (modelValue):</span>
            <StoryCode>Boolean</StoryCode>
            控制通知的顯示狀態。當設為 true 時顯示通知，false 時隱藏通知。
          </li>
          <li>
            <span class="font-semibold">width:</span>
            <StoryCode>String</StoryCode>
            設置通知的寬度。默認值為 'w-1/2'。
          </li>
          <li>
            <span class="font-semibold">hasTitle:</span>
            <StoryCode>Boolean</StoryCode>
            是否顯示標題。默認值為 true。
          </li>
          <li>
            <span class="font-semibold">hasMessage:</span>
            <StoryCode>Boolean</StoryCode>
            是否顯示消息內容。默認值為 true。
          </li>
          <li>
            <span class="font-semibold">title:</span>
            <StoryCode>String</StoryCode>
            通知的標題文本。默認值為 'Informational Notes'。
          </li>
          <li>
            <span class="font-semibold">message:</span>
            <StoryCode>String</StoryCode>
            通知的消息內容。默認值為 'Additional description and information about copywriting.'。
          </li>
          <li>
            <span class="font-semibold">type:</span>
            <StoryCode>String</StoryCode>
            通知的類型，影響背景顏色。可選值為 'primary'、'success'、'warning'、'error'。默認值為
            'primary'。
          </li>
          <li>
            <span class="font-semibold">titleColor:</span>
            <StoryCode>String</StoryCode>
            標題文本顏色。默認值為 'text-secondary-dark'。
          </li>
          <li>
            <span class="font-semibold">titleSize:</span>
            <StoryCode>String</StoryCode>
            標題文本大小。默認為空字符串。
          </li>
          <li>
            <span class="font-semibold">messageColor:</span>
            <StoryCode>String</StoryCode>
            消息內容文本顏色。默認值為 'text-secondary-dark'。
          </li>
          <li>
            <span class="font-semibold">messageSize:</span>
            <StoryCode>String</StoryCode>
            消息內容文本大小。默認為空字符串。
          </li>
          <li>
            <span class="font-semibold">hasIcon:</span>
            <StoryCode>Boolean</StoryCode>
            是否顯示圖標。默認值為 false。
          </li>
          <li>
            <span class="font-semibold">iconName:</span>
            <StoryCode>String</StoryCode>
            圖標的名稱。默認值為 'info'。
          </li>
          <li>
            <span class="font-semibold">iconColor:</span>
            <StoryCode>String</StoryCode>
            圖標的顏色。
          </li>
          <li>
            <span class="font-semibold">iconSize:</span>
            <StoryCode>String</StoryCode>
            圖標的大小。
          </li>
          <li>
            <span class="font-semibold">iconWeight:</span>
            <StoryCode>String</StoryCode>
            圖標的粗細。
          </li>
          <li>
            <span class="font-semibold">iconGrade:</span>
            <StoryCode>String</StoryCode>
            圖標的等級。
          </li>
          <li>
            <span class="font-semibold">iconFill:</span>
            <StoryCode>String</StoryCode>
            圖標的填充。
          </li>
          <li>
            <span class="font-semibold">duration:</span>
            <StoryCode>Number | String</StoryCode>
            通知顯示的持續時間（毫秒）。設為 0 則不會自動關閉。默認值為 3000。
          </li>
          <li>
            <span class="font-semibold">position:</span>
            <StoryCode>String</StoryCode>
            通知顯示的位置。默認值為 'top-1/4'。
          </li>
          <li>
            <span class="font-semibold">offset:</span>
            <StoryCode>String</StoryCode>
            通知的位置偏移量。默認為空字符串。
          </li>
          <li>
            <span class="font-semibold">customClass:</span>
            <StoryCode>String</StoryCode>
            自定義 CSS 類名。默認為空字符串。
          </li>
          <li>
            <span class="font-semibold">showClose:</span>
            <StoryCode>Boolean</StoryCode>
            是否顯示關閉按鈕。默認值為 false。
          </li>
          <li>
            <span class="font-semibold">isBanner:</span>
            <StoryCode>Boolean</StoryCode>
            是否以橫幅形式顯示。默認值為 false。
          </li>
        </StoryList>
      </template>
    </StorySection>

    <StorySection title="使用示例">
      <template #description> 以下是一些常見的使用場景，您可以點擊按鈕查看效果： </template>

      <div class="space-y-4">
        <div>
          <h4 class="font-semibold mb-2">基本使用：</h4>
          <JxButton @click="showBasicNotice = true"> 顯示基本通知 </JxButton>
          <JxNotice
            v-if="showBasicNotice"
            title="成功通知"
            message="操作已成功完成"
            type="success"
            @close="showBasicNotice = false"
          />
        </div>

        <div>
          <h4 class="font-semibold mb-2">帶圖標的通知：</h4>
          <JxButton @click="showIconNotice = true" type="warning"> 顯示警告通知 </JxButton>
          <JxNotice
            v-if="showIconNotice"
            title="警告"
            titleColor="error-dark"
            message="請注意系統將於今晚進行維護"
            type="warning"
            :hasIcon="true"
            iconColor="error"
            iconSize="4xl"
            iconWeight="700"
            iconGrade="10"
            iconFill="1"
            iconName="warning"
            duration="0"
            @close="showIconNotice = false"
          />
        </div>

        <div>
          <h4 class="font-semibold mb-2">自定義樣式：</h4>
          <JxButton @click="showCustomNotice = true" type="primary"> 顯示自定義通知 </JxButton>
          <JxNotice
            v-if="showCustomNotice"
            title="自定義通知"
            message="這是一個自定義樣式的通知"
            titleColor="text-purple-700"
            titleSize="text-xl"
            messageColor="text-gray-600"
            customClass="shadow-lg"
            @close="showCustomNotice = false"
          />
        </div>

        <div>
          <h4 class="font-semibold mb-2">自動關閉：</h4>
          <JxButton @click="showAutoCloseNotice = true" type="success"> 顯示自動關閉通知 </JxButton>
          <JxNotice
            v-if="showAutoCloseNotice"
            title="自動關閉"
            :message="countDownMessage"
            :duration="5000"
            @close="showAutoCloseNotice = false"
          />
        </div>
      </div>

      <template #code>
        <pre>
// 基本使用
&lt;JxButton @click="showBasicNotice = true"&gt;顯示基本通知&lt;/JxButton&gt;
&lt;JxNotice
  v-if="showBasicNotice"
  title="成功通知"
  message="操作已成功完成"
  type="success"
  @close="showBasicNotice = false"
/&gt;

// 帶圖標的通知
&lt;JxButton @click="showIconNotice = true" type="warning"&gt;顯示警告通知&lt;/JxButton&gt;
&lt;JxNotice
  v-if="showIconNotice"
  title="警告"
  message="請注意系統將於今晚進行維護"
  type="warning"
  :hasIcon="true"
  iconName="warning"
  @close="showIconNotice = false"
/&gt;

// 自定義樣式
&lt;JxButton @click="showCustomNotice = true" type="primary"&gt;顯示自定義通知&lt;/JxButton&gt;
&lt;JxNotice
  v-if="showCustomNotice"
  title="自定義通知"
  message="這是一個自定義樣式的通知"
  titleColor="text-purple-700"
  titleSize="text-xl"
  messageColor="text-gray-600"
  customClass="shadow-lg"
  @close="showCustomNotice = false"
/&gt;

// 自動關閉
&lt;JxButton @click="showAutoCloseNotice = true" type="success"&gt;顯示自動關閉通知&lt;/JxButton&gt;
&lt;JxNotice
  v-if="showAutoCloseNotice"
  title="自動關閉"
  message="此通知將在 5 秒後自動關閉"
  :duration="5000"
  @close="showAutoCloseNotice = false"
/&gt;
        </pre>
      </template>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import JxNotice from '../JxNotice.vue'
import JxButton from '../JxButton.vue'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryCode from './StoryCode.vue'
import StoryList from './StoryList.vue'

const showNotice = ref(false)
const showBasicNotice = ref(false)
const showIconNotice = ref(false)
const showCustomNotice = ref(false)
const showAutoCloseNotice = ref(false)

const countDownNumber = ref(5)

const countDownMessage = computed(() => {
  return `此通知將在 ${countDownNumber.value} 秒後自動關閉`
})
watch(showAutoCloseNotice, (newVal) => {
  if (newVal) {
    setInterval(() => {
      countDownNumber.value -= 1
    }, 1000)
  }
})
</script>
