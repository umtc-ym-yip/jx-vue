<template>
  <StoryContainer title="JxCheckBox 複選框組件">
    <StorySection title="基本用法">
      <template #description>
        <p class="text-gray-700">JxCheckBox 是一個靈活的複選框組件，支持多選和自定義樣式。</p>
      </template>

      <template #usage>
        <p class="text-gray-700">
          使用 <StoryCode>v-model</StoryCode> 綁定選中的值，並通過
          <StoryCode>:items</StoryCode> 傳入選項數組。
        </p>
      </template>

      <template #code>
        <pre>
&lt;JxCheckBox
  v-model="selectedFruits"
  :items="[
    { value: 'apple', label: '蘋果' },
    { value: 'banana', label: '香蕉' },
    { value: 'orange', label: '橘子' }
  ]"
/&gt;
        </pre>
      </template>

      <JxCheckBox
        v-model="selectedFruits"
        :items="[
          { value: 'apple', label: '蘋果' },
          { value: 'banana', label: '香蕉' },
          { value: 'orange', label: '橘子' }
        ]"
      />
      <p class="mt-2">已選中: {{ selectedFruits.join(', ') }}</p>
    </StorySection>

    <StorySection title="自定義樣式">
      <template #description>
        <p class="text-gray-700">JxCheckBox 支持自定義大小、背景色、圖標顏色和邊框顏色。</p>
      </template>

      <template #props>
        <StoryList>
          <li><span class="font-semibold">size:</span> 設置複選框的大小，默認為 'w-4 h-4'</li>
          <li>
            <span class="font-semibold">bgColor:</span> 設置選中時的背景顏色，默認為 'bg-primary'
          </li>
          <li>
            <span class="font-semibold">iconColor:</span> 設置選中圖標的顏色，默認為 'text-white'
          </li>
          <li>
            <span class="font-semibold">borderColor:</span> 設置邊框顏色，默認為 'border-black'
          </li>
        </StoryList>
      </template>

      <template #code>
        <pre>
&lt;JxCheckBox
  v-model="selectedColors"
  :items="colorItems"
  size="w-5 h-5"
  bgColor="bg-blue-500"
  iconColor="text-yellow-300"
  borderColor="border-blue-700"
/&gt;
        </pre>
      </template>

      <JxCheckBox
        v-model="selectedColors"
        :items="colorItems"
        size="w-5 h-5"
        bgColor="bg-blue-500"
        iconColor="text-yellow-300"
        borderColor="border-blue-700"
      />
      <p class="mt-2">已選中: {{ selectedColors.join(', ') }}</p>
    </StorySection>

    <StorySection title="禁用選項">
      <template #description>
        <p class="text-gray-700">
          可以通過在 items 中設置 <StoryCode>disabled: true</StoryCode> 來禁用特定選項。
        </p>
      </template>

      <template #code>
        <pre>
&lt;JxCheckBox
  v-model="selectedAnimals"
  :items="[
    { value: 'cat', label: '貓' },
    { value: 'dog', label: '狗', disabled: true },
    { value: 'bird', label: '鳥' }
  ]"
/&gt;
        </pre>
      </template>

      <JxCheckBox
        v-model="selectedAnimals"
        :items="[
          { value: 'cat', label: '貓' },
          { value: 'dog', label: '狗', disabled: true },
          { value: 'bird', label: '鳥' }
        ]"
      />
      <p class="mt-2">已選中: {{ selectedAnimals.join(', ') }}</p>
    </StorySection>

    <StorySection title="表單驗證">
      <template #description>
        <p class="text-gray-700">JxCheckBox 可以與表單驗證系統集成，支持必填驗證等功能。</p>
      </template>

      <template #usage>
        <p class="text-gray-700">
          使用 <StoryCode>useValidation</StoryCode> 函數初始化驗證系統， 並通過
          <StoryCode>:errors</StoryCode> 屬性傳遞錯誤信息。
        </p>
      </template>

      <template #code>
        <pre>
import { ref } from 'vue'
import { useValidation } from '@/utils/validate/validate'

const { errors, validateFields } = useValidation()

const fields = ref({
  selectedTest: {
    value: [],
    rules: ['required']
  }
})

const testItems = ref([
  { value: 'cat', label: '貓' },
  { value: 'dog', label: '狗', disabled: true },
  { value: 'bird', label: '鳥' }
])

function handleSubmit(fields) {
  validateFields(fields, () => {
    console.log('驗證成功')
  })
}

&lt;form @submit.prevent="handleSubmit(fields)"&gt;
  &lt;JxCheckBox
    v-model="fields.selectedTest.value"
    :items="testItems"
    :errors="errors.selectedTest"
  /&gt;
  &lt;JxButton type="submit"&gt;提交&lt;/JxButton&gt;
&lt;/form&gt;
        </pre>
      </template>

      <template #notes>
        <StoryList>
          <li>使用 <StoryCode>useValidation</StoryCode> 初始化驗證系統</li>
          <li>在 <StoryCode>fields</StoryCode> 對象中定義表單字段及其驗證規則</li>
          <li>將 <StoryCode>errors</StoryCode> 對象中對應的錯誤信息傳遞給 JxCheckBox</li>
          <li>在表單提交時調用 <StoryCode>validateFields</StoryCode> 進行驗證</li>
        </StoryList>
      </template>

      <form @submit.prevent="handleSubmit(fields)">
        <JxCheckBox
          v-model="fields.selectedTest.value"
          :items="testItems"
          :errors="errors.selectedTest"
        />
        <p class="mt-2">已選中: {{ fields.selectedTest.value.join(', ') }}</p>
        <JxButton type="submit" class="mt-2">提交</JxButton>
      </form>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
import { ref } from 'vue'
import { useValidation } from '@/utils/validate/validate'
import JxCheckBox from '../JxCheckBox.vue'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryCode from './StoryCode.vue'
import StoryList from './StoryList.vue'
import JxButton from '../JxButton.vue'

const { errors, validateFields } = useValidation()

const selectedFruits = ref([])
const selectedColors = ref([])
const selectedAnimals = ref([])

const selectedTest = ref([])

const colorItems = [
  { value: 'red', label: '紅色' },
  { value: 'green', label: '綠色' },
  { value: 'blue', label: '藍色' }
]

const fields = ref({
  selectedTest: {
    value: [],
    rules: ['required']
  }
})

const testItems = ref([
  { value: 'cat', label: '貓' },
  { value: 'dog', label: '狗', disabled: true },
  { value: 'bird', label: '鳥' }
])

function handleSubmit(fields) {
  validateFields(fields, () => {
    console.log('驗證成功')
  })
}
</script>
