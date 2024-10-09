<template>
  <StoryContainer title="JxRadio 單選按鈕組件">
    <StorySection title="基本用法">
      <template #description>
        JxRadio 是一個可重用的單選按鈕組件。使用 v-model 來綁定選中的值，options 來定義選項。
      </template>
      <template #code>
        <pre>
&lt;JxRadio
  v-model="basicValue"
  :options="[
    { value: 'A', label: '選項 A' },
    { value: 'B', label: '選項 B' },
    { value: 'C', label: '選項 C' }
  ]"
/&gt;

        </pre>
      </template>
      <JxRadio
        v-model="basicValue"
        :options="[
          { value: 'A', label: '選項 A' },
          { value: 'B', label: '選項 B' },
          { value: 'C', label: '選項 C' }
        ]"
      />
      <p class="mt-2">選中的值: {{ basicValue }}</p>
    </StorySection>
    <StorySection title="屬性列表">
      <StoryList>
        <li><StoryCode>v-model</StoryCode>: 綁定選中的值 (必需，任意類型)</li>
        <li>
          <StoryCode>options</StoryCode>: 選項數組，每個選項應包含 value 和 label (必需，Array)
        </li>
        <li><StoryCode>color</StoryCode>: 自定義顏色 (可選，String，默認為 'primary')</li>
        <li>
          <StoryCode>size</StoryCode>: 尺寸大小 (可選，String，可選值：'sm', 'md', 'lg'，默認為
          'md')
        </li>
        <li>
          <StoryCode>orientation</StoryCode>: 排列方向 (可選，String，可選值：'horizontal',
          'vertical'，默認為 'horizontal')
        </li>
        <li>
          <StoryCode>disabled</StoryCode>: 是否禁用整個單選按鈕組 (可選，Boolean，默認為 false)
        </li>
        <li><StoryCode>required</StoryCode>: 是否為必填項 (可選，Boolean，默認為 false)</li>
      </StoryList>
    </StorySection>
    <StorySection title="自定義顏色">
      <template #description>
        使用 color prop 來自定義單選按鈕的顏色。可以使用預定義的顏色主題或自定義的顏色值。
      </template>
      <template #code>
        <pre>
&lt;JxRadio
  v-model="colorValue"
  :options="[
    { value: 'success', label: '成功' },
    { value: 'warning', label: '警告' },
    { value: 'error', label: '錯誤' }
  ]"

  :color="colorValue"
/&gt;
        </pre>
      </template>
      <JxRadio
        v-model="colorValue"
        :options="[
          { value: 'success', label: '成功' },
          { value: 'warning', label: '警告' },
          { value: 'error', label: '錯誤' }
        ]"
        :color="colorValue"
      />
    </StorySection>

    <StorySection title="不同尺寸">
      <template #description>
        使用 size prop 來設置單選按鈕的大小。可選值為 'sm'、'md'（默認）和 'lg'。
      </template>
      <template #code>
        <pre>
&lt;div class="space-y-4"&gt;
  &lt;JxRadio
    v-model="sizeValue"
    :options="sizeOptions"

    size="sm"
  /&gt;
  &lt;JxRadio
    v-model="sizeValue"
    :options="sizeOptions"

    size="md"
  /&gt;
  &lt;JxRadio
    v-model="sizeValue"
    :options="sizeOptions"

    size="lg"
  /&gt;
&lt;/div&gt;
        </pre>
      </template>
      <div class="space-y-4">
        <JxRadio v-model="sizeValue" :options="sizeOptions" size="sm" />
        <JxRadio v-model="sizeValue" :options="sizeOptions" size="md" />
        <JxRadio v-model="sizeValue" :options="sizeOptions" size="lg" />
      </div>
    </StorySection>

    <StorySection title="垂直排列">
      <template #description>
        使用 orientation prop 來設置單選按鈕的排列方向。默認為水平排列，設置為 'vertical'
        可改為垂直排列。
      </template>
      <template #code>
        <pre>
&lt;JxRadio
  v-model="orientationValue"
  :options="orientationOptions"

  orientation="vertical"
/&gt;
        </pre>
      </template>
      <JxRadio
        v-model="orientationValue"
        :options="orientationOptions"
        :direction="orientationValue"
      />
    </StorySection>

    <StorySection title="禁用狀態">
      <template #description>
        使用 disabled prop 來禁用整個單選按鈕組，或在 options 中設置單個選項的 disabled 屬性。
      </template>
      <template #code>
        <pre>
&lt;JxRadio
  v-model="disabledValue"
  :options="[
    { value: '1', label: '選項 1' },
    { value: '2', label: '選項 2', disabled: true },
    { value: '3', label: '選項 3' }
  ]"

/&gt;
&lt;JxRadio
  v-model="disabledValue"
  :options="[
    { value: '4', label: '選項 4' },
    { value: '5', label: '選項 5' },
    { value: '6', label: '選項 6' }
  ]"

  disabled
/&gt;
        </pre>
      </template>
      <template #notes>
        <p>也可以在options中設置disabled屬性來禁用單個選項</p>
      </template>
      <JxRadio
        v-model="disabledValue"
        :options="[
          { value: '1', label: '選項 1' },
          { value: '2', label: '選項 2', disabled: true },
          { value: '3', label: '選項 3' }
        ]"
        name="disabled-radio"
      />
      <JxRadio
        v-model="disabledValue"
        :options="[
          { value: '4', label: '選項 4' },
          { value: '5', label: '選項 5' },
          { value: '6', label: '選項 6' }
        ]"
        :disabled="true"
        name="disabled-radio"
      />
    </StorySection>
    <StorySection title="必填驗證">
      <template #description>
        使用 <StoryCode>field</StoryCode> 中的屬性並帶入 <StoryCode>value</StoryCode> 和
        <StoryCode>rules</StoryCode>（全檢查用），這將在表單提交時進行驗證。<br />
        使用 <StoryCode>:rules="['required']"</StoryCode> 來設置單選按鈕組為必填項。
      </template>
      <template #code>
        <pre>
&lt;JxForm @submit.prevent="handleSubmit(field)&gt;
  &lt;JxRadio
  id="selectedOption"
    v-model="field.selectedOption.value"
    :options="[
            { value: '11', label: '選項 11' },
            { value: '22', label: '選項 22' },
            { value: '33', label: '選項 33' }
          ]"
          :rules="[(v) => (v.includes('1') ? '' : '需要包含有1的選項')]"
          :errors="errors.selectedOption"
          @validation="validateField"
  /&gt;
  &lt;JxButton type="submit"&gt;提交&lt;/JxButton&gt;
&lt;/JxForm&gt;
&lt;script setup&gt;
const { errors, validateField, validateFields } = useValidation()

const field = ref({
  selectedOption: {
    value: '',
    rules: ['required']
  }
})
function handleSubmit(fields) {
  validateFields(fields, () => {
    alert('表單提交成功！選擇的值：' + fields.selectedOption.value)
  })
}
&lt;/script&gt;


        </pre>
      </template>
      <template #notes>
        <p>
          要注意個別驗證的規則<span class="text-error-light font-bold">並不會包含</span
          >在全檢查的規則中，所以如果想要在全檢查的規則中包含個別驗證的規則，需要自己加入field中各屬性的rules中。
        </p>
      </template>
      <form @submit.prevent="handleSubmit(field)">
        <JxRadio
          id="selectedOption"
          v-model="field.selectedOption.value"
          :options="[
            { value: '11', label: '選項 11' },
            { value: '22', label: '選項 22' },
            { value: '33', label: '選項 33' }
          ]"
          :rules="[(v) => (v.includes('1') ? '' : '需要包含有1的選項')]"
          :errors="errors.selectedOption"
          @validate="validateField"
        />
        <JxButton type="submit" class="mt-2">提交</JxButton>
      </form>
      <p v-if="showValidationMessage" class="mt-2 text-red-500">請選擇一個選項</p>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
import { ref, reactive } from 'vue'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryList from './StoryList.vue'
import StoryCode from './StoryCode.vue'
import JxRadio from '@/components/JxRadio.vue'
import JxButton from '@/components/JxButton.vue'

import { useValidation } from '@/utils/validate/validate'

const basicValue = ref('')
const colorValue = ref('success')
const sizeValue = ref('md')
const orientationValue = ref('vertical')
const disabledValue = ref('1')
const form = reactive({
  selectedOption: ''
})
const showValidationMessage = ref(false)
const { errors, validateField, validateFields } = useValidation()
const sizeOptions = [
  { value: 'sm', label: '小' },
  { value: 'md', label: '中' },
  { value: 'lg', label: '大' }
]

const orientationOptions = [
  { value: 'horizontal', label: '水平排列' },
  { value: 'vertical', label: '垂直排列' }
]

const field = ref({
  selectedOption: {
    value: '',
    rules: ['required']
  }
})

function handleSubmit(fields) {
  validateFields(fields, () => {
    alert('表單提交成功！選擇的值：' + fields.selectedOption.value)
  })
}
</script>
