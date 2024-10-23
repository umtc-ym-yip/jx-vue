<template>
  <StoryContainer title="JxSwitch 開關組件">
    <StorySection title="基本用法">
      <template #description>
        JxSwitch 是一個可重用的開關組件。使用 v-model 來綁定選中的值，options 來定義選項。
      </template>
      <template #code>
        <pre>
&lt;JxSwitch
  v-model="basicValue"
  :options="[
    { value: 'off', label: '關閉' },
    { value: 'on', label: '開啟' }
  ]"
/&gt;
        </pre>
      </template>
      <JxSwitch
        v-model="basicValue"
        :options="[
          { value: 'off', label: '關閉' },
          { value: 'on', label: '開啟' }
        ]"
      />
    </StorySection>

    <StorySection title="屬性列表">
      <StoryList>
        <li><StoryCode>v-model</StoryCode>: 綁定選中的值 (必需，String)</li>
        <li>
          <StoryCode>options</StoryCode>: 選項數組，必須包含兩個選項，每個選項應包含 value 和 label
          (必需，Array)
          <br />
          例如：<StoryCode
            >[{ value: 'off', label: '關閉' }, { value: 'on', label: '開啟' }]</StoryCode
          >
        </li>
        <li>
          <StoryCode>color</StoryCode>: 自定義顏色 (可選，String，默認為 'primary')
          <br />
          可選值：'primary', 'secondary', 'error', 'warning', 'info', 'success'
        </li>
        <li>
          <StoryCode>size</StoryCode>: 尺寸大小 (可選，String，默認為 'md')
          <br />
          可選值：'sm', 'md', 'lg'
        </li>
      </StoryList>
    </StorySection>

    <StorySection title="事件">
      <StoryList>
        <li><StoryCode>@update:modelValue</StoryCode>: 當開關狀態改變時觸發，返回新的值</li>
        <li><StoryCode>@labelChange</StoryCode>: 當開關狀態改變時觸發，返回當前選中選項的標籤</li>
      </StoryList>
    </StorySection>

    <StorySection title="插槽">
      <StoryList>
        <li><StoryCode>label</StoryCode>: 用於自定義開關旁邊的標籤內容</li>
      </StoryList>
    </StorySection>

    <StorySection title="自定義顏色">
      <template #description>
        使用 color prop 來自定義開關的顏色。可以使用預定義的顏色主題。
      </template>
      <template #code>
        <pre>
&lt;JxSwitch
  v-model="colorValue"
  :options="[
    { value: 'off', label: '關閉' },
    { value: 'on', label: '開啟' }
  ]"
  :color="colorValue"
/&gt;
        </pre>
      </template>
      <JxSwitch
        v-model="colorValue"
        :options="[
          { value: 'primary', label: '主要' },
          { value: 'secondary', label: '次要' },
          { value: 'error', label: '錯誤' },
          { value: 'warning', label: '警告' },
          { value: 'info', label: '信息' },
          { value: 'success', label: '成功' }
        ]"
        :color="colorValue"
      />
    </StorySection>

    <StorySection title="不同尺寸">
      <template #description>
        使用 size prop 來設置開關的大小。可選值為 'sm'、'md'（默認）和 'lg'。
      </template>
      <template #code>
        <pre>
&lt;div class="space-y-4"&gt;
  &lt;JxSwitch
    v-model="sizeValue"
    :options="sizeOptions"
    size="sm"
  /&gt;
  &lt;JxSwitch
    v-model="sizeValue"
    :options="sizeOptions"
    size="md"
  /&gt;
  &lt;JxSwitch
    v-model="sizeValue"
    :options="sizeOptions"
    size="lg"
  /&gt;
&lt;/div&gt;
        </pre>
      </template>
      <div class="space-y-4">
        <JxSwitch v-model="sizeValue" :options="sizeOptions" size="sm" />
        <JxSwitch v-model="sizeValue" :options="sizeOptions" size="md" />
        <JxSwitch v-model="sizeValue" :options="sizeOptions" size="lg" />
      </div>
    </StorySection>

    <StorySection title="顯示當前標籤">
      <template #description>
        使用 @labelChange
        事件來獲取當前選中選項的標籤。這允許您在外部組件中顯示或使用當前選中的標籤。
      </template>
      <template #code>
        <pre>
&lt;template&gt;
  &lt;JxSwitch
    v-model="switchState"
    :options="[
      { value: 'off', label: '關閉' },
      { value: 'on', label: '開啟' }
    ]"
    @labelChange="handleLabelChange"
  /&gt;
  &lt;p&gt;當前狀態: { currentLabel }&lt;/p&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import JxSwitch from '@/components/JxSwitch.vue'

const switchState = ref('off')
const currentLabel = ref('關閉')

function handleLabelChange(label) {
  currentLabel.value = label
}
&lt;/script&gt;
        </pre>
      </template>
      <JxSwitch
        v-model="labelSwitchState"
        :options="[
          { value: 'off', label: '關閉' },
          { value: 'on', label: '開啟' }
        ]"
        @labelChange="handleLabelChange"
      />
      <p class="mt-2">當前狀態: {{ currentLabel }}</p>
    </StorySection>

    <StorySection title="注意事項">
      <template #description>
        <ul class="list-disc list-inside">
          <li>使用 v-model 綁定開關的值</li>
          <li>options 必須是一個包含兩個選項的數組，每個選項都應該有 value 和 label</li>
          <li>可以使用 @labelChange 事件來獲取當前選中選項的標籤</li>
          <li>color 和 size 屬性可以用來自定義開關的外觀</li>
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
import JxSwitch from '@/components/JxSwitch.vue'

const basicValue = ref('off')
const colorValue = ref('primary')
const sizeValue = ref('md')
const labelValue = ref('off')
const labelSwitchState = ref('off')
const currentLabel = ref('關閉')

const sizeOptions = [
  { value: 'off', label: '關閉' },
  { value: 'on', label: '開啟' }
]

function handleLabelChange(label) {
  currentLabel.value = label
}
</script>
