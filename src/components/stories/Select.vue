<template>
  <StoryContainer title="JxSelect 元件">
    <StorySection title="基本用法">
      <template #description>
        JxSelect 是一個自定義的下拉選擇組件，支持標籤、佔位符、錯誤提示等功能。
      </template>

      <template #code>
        <pre>
          &lt;JxSelect id="basic-select" 
          label="選擇一個選項" v-model="selectedValue"
        :options="options" placeholder="請選擇" /&gt; 

      &lt;script setup&gt; 
      import { ref } from 'vue'
      const selectedValue = ref('') 
      const options = ['選項1', '選項2', '選項3'] 
      &lt;/script&gt;
        </pre>
      </template>

      <div class="mt-4">
        <JxSelect
          id="basic-select"
          label="選擇一個選項"
          v-model="selectedValue"
          :options="options"
          placeholder="請選擇"
        />
      </div>
    </StorySection>

    <StorySection title="帶驗證的使用">
      <template #description>
        JxSelect 支持錯誤提示和驗證規則。使用預定義的驗證規則和 useValidation hook 來管理驗證邏輯。
      </template>

      <template #code>
        <pre>
        &lt;template&gt; 
          &lt;JxSelect 
          id="validated-select" 
          label="必選項目" 
          v-model="validatedValue.option.value"
          :options="options" :errors="errors.option" 
          :rules="validatedValue.option.rules"
          @validate="validateField" required /&gt; 
        &lt;/template&gt; 

        &lt;script setup&gt; 
        import { ref } from 'vue' 
        import { useValidation } from '@/utils/validation' 
        const validatedValue = ref({ option: { value: '', rules: ['required'] } }) 
        const options = ['選項1', '選項2', '選項3'] 
        const { errors, validateField } = useValidation() 
        &lt;/script&gt;
        </pre>
      </template>

      <div class="mt-4">
        <JxSelect
          id="optionRequired"
          label="必選項目"
          v-model="validatedValue.optionRequired.value"
          :options="options"
          :errors="errors.optionRequired"
          :rules="validatedValue.optionRequired.rules"
          @validate="validateField"
          required
          placeholder="請選擇"
        />
      </div>
    </StorySection>

    <StorySection title="自定義驗證規則">
      <template #description>
        JxSelect 支持自定義驗證規則。你可以使用預定義的規則字符串，或者自定義的驗證函數。
      </template>

      <template #code>
        <pre>
        &lt;template&gt; 
          &lt;JxSelect 
          id="option" 
          label="自定義驗證" 
          v-model="customValidatedValue.option.value"
          :options="customOptions" :errors="errors.option" 
          :rules="customValidatedValue.option.rules"
          @validate="validateField" required /&gt; 
        &lt;/template&gt;
        </pre>
      </template>

      <div class="mt-4">
        <JxSelect
          id="option"
          label="自定義驗證"
          v-model="customValidatedValue.option.value"
          :options="customOptions"
          :errors="errors.option"
          :rules="customValidatedValue.option.rules"
          @validate="validateField"
          required
          placeholder="請選擇"
        />
      </div>
    </StorySection>

    <StorySection title="禁用狀態">
      <template #description> JxSelect 可以設置為禁用狀態。 </template>

      <template #code>
        <pre>
          &lt;JxSelect 
          id="disabled-select" 
          label="禁用的選擇器" 
          v-model="disabledValue"
          :options="options" 
          disabled 
          /&gt;
        </pre>
      </template>

      <div class="mt-4">
        <JxSelect
          id="disabled-select"
          label="禁用的選擇器"
          v-model="disabledValue"
          :options="options"
          disabled
        />
      </div>
    </StorySection>

    <StorySection title="屬性">
      <StoryList>
        <li><StoryCode>id</StoryCode>: 選擇器的唯一標識符（必需，String）</li>
        <li><StoryCode>label</StoryCode>: 選擇器的標籤文字（可選，String，默認為空字符串）</li>
        <li>
          <StoryCode>modelValue</StoryCode>: 選擇器的值，用於 v-model 綁定（可選，String 或
          Number，默認為空字符串）
        </li>
        <li><StoryCode>placeholder</StoryCode>: 佔位符文字（可選，String，默認為空字符串）</li>
        <li><StoryCode>required</StoryCode>: 是否為必填項（可選，Boolean，默認為 false）</li>
        <li><StoryCode>disabled</StoryCode>: 是否禁用選擇器（可選，Boolean，默認為 false）</li>
        <li><StoryCode>errors</StoryCode>: 錯誤信息數組（可選，Array，默認為空數組）</li>
        <li>
          <StoryCode>rules</StoryCode>: 驗證規則數組（可選，Array，默認為空數組）。
          可以使用預定義的規則字符串，如 ['required']，或自定義的驗證函數。
        </li>
        <li><StoryCode>options</StoryCode>: 選項數組（必需，Array）</li>
      </StoryList>
    </StorySection>

    <StorySection title="事件">
      <StoryList>
        <li><StoryCode>update:modelValue</StoryCode>: 當選擇的值改變時觸發</li>
        <li><StoryCode>validate</StoryCode>: 當需要驗證輸入時觸發，傳遞 id、value 和 rules</li>
      </StoryList>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
import { ref } from 'vue'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryCode from './StoryCode.vue'
import StoryList from './StoryList.vue'
import JxSelect from '@/components/JxSelect.vue'
import { useValidation } from '@/utils/validate/validate.js'

const selectedValue = ref('')
const validatedValue = ref({
  optionRequired: {
    value: '',
    rules: ['required']
  }
})
const customValidatedValue = ref({
  option: {
    value: '',
    rules: [
      'required',
      (value) => (value.length > 3 ? '' : '選項必須超過3個字符'),
      (value) => (['選項1', '選項2', '選項3'].includes(value) ? '' : '請選擇有效的選項')
    ]
  }
})
const disabledValue = ref('')
const options = ['選項1', '選項2', '選項3']
const customOptions = ['選項1', '選項2', '選項3', '無效選項']

const { errors, validateField } = useValidation()
</script>
