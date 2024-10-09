<template>
  <StoryContainer title="JxInput 元件">
    <StorySection title="基本使用">
      <template #description>
        JxInput 是一個基本的輸入框元件，支持多種輸入類型和驗證功能。
      </template>

      <template #usage>
        使用 <StoryCode>v-model</StoryCode> 綁定輸入值，<StoryCode class="bg-gray-200 px-1 rounded"
          >label</StoryCode
        >
        設置標籤，<StoryCode>placeholder</StoryCode> 設置佔位符。
      </template>

      <template #props>
        <StoryList>
          <li><span class="font-semibold">id:</span> 輸入框的唯一標識符（必填）</li>
          <li><span class="font-semibold">label:</span> 輸入框標籤</li>
          <li><span class="font-semibold">v-model:</span> 輸入框的值</li>
          <li><span class="font-semibold">type:</span> 輸入框類型（默認為 'text'）</li>
          <li><span class="font-semibold">placeholder:</span> 佔位符文本</li>
          <li><span class="font-semibold">required:</span> 是否必填</li>
          <li><span class="font-semibold">disabled:</span> 是否禁用</li>
          <li><span class="font-semibold">errors:</span> 錯誤信息數組</li>
          <li><span class="font-semibold">rules:</span> 驗證規則數組</li>
        </StoryList>
      </template>

      <template #code>
        &lt;JxInput id="username" label="用戶名" v-model="username" placeholder="請輸入用戶名"
        :required="true" /&gt;
      </template>

      <div class="space-y-4">
        <JxInput
          id="username"
          label="用戶名"
          v-model="username"
          placeholder="請輸入用戶名"
          :required="true"
        />
      </div>
    </StorySection>

    <StorySection title="輸入類型">
      <template #description> JxInput 支持多種輸入類型，如文本、密碼、郵箱等。 </template>

      <template #usage>
        使用 <code class="bg-gray-200 px-1 rounded">type</code> 屬性設置輸入類型。
      </template>

      <template #code>
        <pre>
          &lt;JxInput id="text" label="文本" type="text" placeholder="請輸入文本" /&gt; 
          &lt;JxInput id="password" label="密碼" type="password" placeholder="請輸入密碼" /&gt; 
          &lt;JxInput id="email" label="郵箱" type="email" placeholder="請輸入郵箱" /&gt;
        </pre>
      </template>

      <div class="space-y-4">
        <JxInput id="text" label="文本" type="text" placeholder="請輸入文本" />
        <JxInput id="password" label="密碼" type="password" placeholder="請輸入密碼" />
        <JxInput id="email" label="郵箱" type="email" placeholder="請輸入郵箱" />
      </div>
    </StorySection>

    <StorySection title="禁用狀態">
      <template #description> JxInput 可以設置為禁用狀態。 </template>

      <template #usage>
        使用 <code class="bg-gray-200 px-1 rounded">disabled</code> 屬性設置禁用狀態。
      </template>

      <template #code>
        <pre>
&lt;JxInput
  id="disabled-input"
  label="禁用的輸入框"
  value="這是一個禁用的輸入框"
  :disabled="true"
/&gt;</pre
        >
      </template>

      <div class="space-y-4">
        <JxInput
          id="disabled-input"
          label="禁用的輸入框"
          value="這是一個禁用的輸入框"
          :disabled="true"
        />
      </div>
    </StorySection>

    <StorySection title="表單驗證示例">
      <template #description> 這個示例展示了如何在表單中使用 JxInput 並進行驗證。 </template>

      <template #usage>
        <StoryList>
          <li>
            使用<StoryCode>useValidation</StoryCode>解構出來的<StoryCode>errors</StoryCode>、<StoryCode>validateField</StoryCode>、<StoryCode>validateFields</StoryCode>來驗證。
          </li>
          <li>資料定義如<StoryCode>fields</StoryCode>響應物件格式。</li>
          <li>
            <StoryCode>validateFields</StoryCode
            >帶入<StoryCode>fields</StoryCode>將每個屬性進行驗證，如果驗證不通過會將各別屬性錯誤訊息傳進<StoryCode>errors</StoryCode>。
          </li>
          <li>
            同時組件傳入<StoryCode>errors</StoryCode>各別屬性錯誤訊息的陣列去內部顯示，沒有錯誤訊息則該屬性為空陣列。
          </li>
          <li>
            <StoryCode>id</StoryCode
            >、<StoryCode>v-model</StoryCode>、<StoryCode>rules</StoryCode>分別綁定
            <StoryCode>fields</StoryCode
            >中的<StoryCode>value</StoryCode>和<StoryCode>rules</StoryCode>，<StoryCode>errors</StoryCode>則綁定解構出來的<StoryCode>errors</StoryCode>中的對應屬性(同<StoryCode>field</StoryCode>的屬性)，<StoryCode
              >@validate</StoryCode
            >
            則帶上<StoryCode>validateField</StoryCode>來做單一驗證使用。
          </li>
        </StoryList>
      </template>
      <template #notes>
        <StoryCode>id</StoryCode> 一定要有值且跟
        <StoryCode>fields</StoryCode> 中的屬性相同，不然會驗證不出來。
      </template>

      <template #code>
        <pre>
import { ref } from 'vue'
import { useValidation } from '@/utils/validate/validate.js'

const fields = ref({
  emailExample: {
    value: '',
    rules: ['required', 'email']
  },
  passwordExample: {
    value: '',
    rules: [{ type: 'minLength', value: 6 }, 'required']
  }
})

const { errors, validateField, validateFields } = useValidation(fields)

&lt;form @submit.prevent="validateFields(fields)"&gt;
  &lt;JxInput
    id="emailExample"
    label="信箱"
    placeholder="請輸入信箱"
    v-model="fields.emailExample.value"
    :rules="fields.emailExample.rules"
    :errors="errors.emailExample"
    @validate="validateField"
  /&gt;
  &lt;JxInput
    id="passwordExample"
    label="密碼"
    type="password"
    placeholder="請輸入密碼"
    v-model="fields.passwordExample.value"
    :rules="fields.passwordExample.rules"
    :errors="errors.passwordExample"
    @validate="validateField"
  /&gt;
  &lt;button type="submit"&gt;提交&lt;/button&gt;
&lt;/form&gt;</pre
        >
      </template>

      <div class="space-y-4">
        <form @submit.prevent="validateFields(fields)">
          <JxInput
            id="emailExample"
            label="信箱"
            placeholder="請輸入信箱"
            v-model="fields.emailExample.value"
            :rules="fields.emailExample.rules"
            :errors="errors.emailExample"
            @validate="validateField"
          />
          <JxInput
            id="passwordExample"
            label="密碼"
            type="password"
            placeholder="請輸入密碼"
            v-model="fields.passwordExample.value"
            :rules="fields.passwordExample.rules"
            :errors="errors.passwordExample"
            @validate="validateField"
          />
          <button
            type="submit"
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            提交
          </button>
        </form>
      </div>
    </StorySection>

    <StorySection title="自訂驗證和錯誤提示">
      <template #description> JxInput 支持自定義驗證規則和錯誤提示。 </template>

      <template #usage>
        使用 <StoryCode>rules</StoryCode> 屬性設置驗證規則，<StoryCode>errors</StoryCode>
        屬性顯示錯誤信息。
      </template>

      <template #code>
        <pre>
&lt;JxInput
  id="email-validation"
  label="郵箱（帶驗證）"
  v-model="email"
  type="email"
  placeholder="請輸入有效的郵箱地址"
  :rules="[v => /.+@.+\..+/.test(v) || '請輸入有效的郵箱地址']"
  :errors="emailErrors"
  @validate="validateEmail"
/&gt;</pre
        >
      </template>

      <template #notes>
        需要額外定義
        <StoryCode>validateEmail</StoryCode> 方法和
        <StoryCode>emailErrors</StoryCode>
        來處理驗證邏輯。<br />又或是其他設定皆一樣，但<StoryCode>rules</StoryCode>中以三元表達式設計函式，<StoryCode>true</StoryCode>返回空字串，<StoryCode>false</StoryCode>返回錯誤訊息也可行。
      </template>

      <div class="space-y-4">
        <JxInput
          id="email-validation"
          label="郵箱（帶驗證）"
          v-model="email"
          type="email"
          placeholder="請輸入有效的郵箱地址"
          :rules="[(v) => /.+@.+\..+/.test(v) || '請輸入有效的郵箱地址']"
          :errors="emailErrors"
          @validate="validateEmail"
        />
      </div>
    </StorySection>

    <StorySection title="並排輸入框">
      <template #description> 展示如何並排放置多個輸入框。 </template>

      <template #usage> 使用 Flexbox 或 Grid 來實現並排佈局。 </template>

      <template #code>
        <pre>
&lt;div class="flex space-x-4"&gt;
  &lt;JxInput
    id="firstName"
    label="名"
    placeholder="請輸入名"
    v-model="firstName"
  /&gt;
  &lt;JxInput
    id="lastName"
    label="姓"
    placeholder="請輸入姓"
    v-model="lastName"
  /&gt;
&lt;/div&gt;</pre
        >
      </template>

      <div class="flex space-x-4">
        <JxInput id="firstName" label="名" placeholder="請輸入名" v-model="firstName" />
        <JxInput id="lastName" label="姓" placeholder="請輸入姓" v-model="lastName" />
      </div>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
import { ref } from 'vue'
import JxInput from '../JxInput.vue'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryCode from './StoryCode.vue'
import StoryList from './StoryList.vue'
import { useValidation } from '@/utils/validate/validate.js'

const username = ref('')
const email = ref('')
const emailErrors = ref([])
const firstName = ref('')
const lastName = ref('')

const fields = ref({
  emailExample: {
    value: '',
    rules: ['required', 'email']
  },
  passwordExample: {
    value: '',
    rules: [{ type: 'minLength', value: 6 }, 'required']
  }
})

const { errors, validateField, validateFields } = useValidation(fields)

const validateEmail = (id, value, rules) => {
  const errors = rules.map((rule) => rule(value)).filter((error) => typeof error === 'string')
  emailErrors.value = errors
}
</script>
