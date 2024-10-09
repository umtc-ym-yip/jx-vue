<template>
  <StoryContainer title="JxTable 元件">
    <StorySection title="基本用法">
      <template #description>
        JxTable 是一個功能豐富的表格組件，支持排序、搜索、分頁等功能。
      </template>

      <template #code>
        <pre>
          &lt;JxTable 
          :columns="columns" 
          :data="data" 
          title="用戶列表" 
          :itemsPerPage="10" /&gt;
        &lt;script setup&gt; 
        const columns = [ { key: 'name', label: '姓名' }, { key: 'age', label:
        '年齡' }, { key: 'email', label: '郵箱' } ] 
        const data = [ { name: '張三', age: 28, email:'zhangsan@example.com' }, { name: '李四', age: 32, email: 'lisi@example.com' }, // ...更多數據 ] &lt;/script&gt;
        </pre>
      </template>

      <JxTable :columns="columns" :data="data" title="用戶列表" :itemsPerPage="10" />
    </StorySection>
    <StorySection title="屬性">
      <template #description> JxTable 組件接受以下屬性： </template>
      <template #props>
        <StoryList>
          <li><StoryCode>columns</StoryCode>: 定義表格列的數組（必需）</li>
          <li><StoryCode>data</StoryCode>: 表格數據數組（必需）</li>
          <li><StoryCode>title</StoryCode>: 表格標題（可選，默認為 'Table Title'）</li>
          <li><StoryCode>hasHeader</StoryCode>: 是否顯示表格頭部（可選，默認為 true）</li>
          <li><StoryCode>showSearch</StoryCode>: 是否顯示搜索框（可選，默認為 true）</li>
          <li><StoryCode>itemsPerPage</StoryCode>: 每頁顯示的項目數（可選，默認為 10）</li>
          <li><StoryCode>pageRange</StoryCode>: 分頁器顯示的頁碼範圍（可選，默認為 2）</li>
        </StoryList>
      </template>
    </StorySection>

    <StorySection title="自定義列內容">
      <template #description>
        你可以使用具名插槽來自定義列的內容。插槽名稱應該與列的 key 相對應。
      </template>

      <template #code>
        &lt;JxTable :columns="columns" :data="data"&gt; &lt;template #age="{ value }"&gt;
        {{ value }} 歲 &lt;/template&gt; &lt;template #email="{ value }"&gt; &lt;a :href="'mailto:'
        + value"&gt;{{ value }}&lt;/a&gt; &lt;/template&gt; &lt;/JxTable&gt;
      </template>

      <JxTable :columns="columns" :data="data">
        <template #age="{ value }"> {{ value }} 歲 </template>
        <template #email="{ value }">
          <a :href="'mailto:' + value">{{ value }}</a>
        </template>
      </JxTable>
    </StorySection>

    <StorySection title="插槽使用範例">
      <template #description>
        JxTable 提供了多個插槽，讓你可以自定義表格的各個部分。以下是一個綜合使用各種插槽的例子。
      </template>

      <template #code>
        <pre>
        &lt;JxTable 
        :columns="columns" 
        :data="data" 
        title="員工列表"&gt;

        &lt;template #title&gt;
          &lt;h2 class="text-xl font-bold"&gt;公司員工列表&lt;/h2&gt; 
        &lt;/template&gt;

        &lt;template #header&gt; 
          &lt;div class="flex justify-between items-center mb-4"&gt; 
          &lt;span class="text-gray-600"&gt;共 {{ data.length }} 名員工&lt;/span&gt; 
          &lt;button class="bg-blue-500 text-white px-4 py-2 rounded"&gt;新增員工&lt;/button&gt; 
          &lt;/div&gt;
        &lt;/template&gt;
         
        &lt;template #name="{ value }"&gt; 
          &lt;div class="flex items-center"&gt;
            &lt;img :src="getAvatarUrl(value)" class="w-8 h-8 rounded-full mr-2" /&gt;
          {{ value }}&lt;/div&gt; 
        &lt;/template&gt;

        &lt;template #age="{ value }"&gt; 
          &lt;span :class="{'text-green-500': value < 30, 'text-red-500': value >= 50 }"&gt;{{
            value
          }} 歲 &lt;/span&gt; 
        &lt;/template&gt;
        
        &lt;template #email="{ value }"&gt; 
          &lt;a :href="'mailto:' + value" class="text-blue-600 hover:underline"&gt;{{
            value
          }}&lt;/a&gt;
        &lt;/template&gt; 
        
        &lt;template #actions="{ row }"&gt; 
          &lt;button @click="editEmployee(row)" class="text-blue-500 mr-2"&gt;編輯&lt;/button&gt; 
          &lt;button @click="deleteEmployee(row)" class="text-red-500"&gt;刪除&lt;/button&gt; 
        &lt;/template&gt; 

        &lt;template #footer&gt;
          &lt;div class="mt-4 text-gray-600 text-sm"&gt; 最後更新時間：{{
            new Date().toLocaleString()
          }}
          &lt;/div&gt; 
        &lt;/template&gt;
        &lt;/JxTable&gt;
      </pre
        >
      </template>

      <JxTable :columns="columnsWithActions" :data="data" title="員工列表">
        <template #title>
          <h2 class="text-xl font-bold">公司員工列表</h2>
        </template>

        <template #header>
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-600">共 {{ data.length }} 名員工</span>
            <button class="bg-blue-500 text-white px-4 py-2 rounded">新增員工</button>
          </div>
        </template>

        <template #name="{ value }">
          <div class="flex items-center">
            <img :src="getAvatarUrl(value)" class="w-8 h-8 rounded-full mr-2" />
            {{ value }}
          </div>
        </template>

        <template #age="{ value }">
          <span :class="{ 'text-green-500': value < 30, 'text-red-500': value >= 50 }">
            {{ value }} 歲
          </span>
        </template>

        <template #email="{ value }">
          <a :href="'mailto:' + value" class="text-blue-600 hover:underline">{{ value }}</a>
        </template>

        <template #actions="{ row }">
          <button @click="editEmployee(row)" class="text-blue-500 mr-2">編輯</button>
          <button @click="deleteEmployee(row)" class="text-red-500">刪除</button>
        </template>

        <template #footer>
          <div class="mt-4 text-gray-600 text-sm">
            最後更新時間：{{ new Date().toLocaleString() }}
          </div>
        </template>
      </JxTable>
    </StorySection>

    <StorySection title="事件">
      <template #description> JxTable 組件會觸發以下事件： </template>

      <StoryList>
        <li><StoryCode>sort</StoryCode>: 當用戶點擊列頭進行排序時觸發</li>
        <li><StoryCode>pageChange</StoryCode>: 當頁碼改變時觸發</li>
        <li><StoryCode>search</StoryCode>: 當用戶在搜索框中輸入時觸發</li>
      </StoryList>
    </StorySection>

    <StorySection title="可用插槽">
      <template #description> JxTable 提供了以下插槽： </template>

      <StoryList>
        <li><StoryCode>title</StoryCode>: 自定義表格標題</li>
        <li><StoryCode>header</StoryCode>: 在表格頂部添加自定義內容</li>
        <li><StoryCode>[column.key]</StoryCode>: 為每個列提供的具名插槽，用於自定義列內容</li>
        <li><StoryCode>actions</StoryCode>: 為每一行添加操作按鈕</li>
        <li><StoryCode>footer</StoryCode>: 在表格底部添加自定義內容</li>
        <li><StoryCode>empty</StoryCode>: 當沒有數據時顯示的內容</li>
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
import JxTable from '@/components/JxTable.vue'

const value = ref('')
const columns = ref([
  { key: 'name', label: '姓名' },
  { key: 'age', label: '年齡' },
  { key: 'email', label: '郵箱' }
])

const columnsWithActions = ref([...columns.value, { key: 'actions', label: '操作' }])

const data = ref([
  { name: '張三', age: 28, email: 'zhangsan@example.com' },
  { name: '李四', age: 32, email: 'lisi@example.com' },
  { name: '王五', age: 45, email: 'wangwu@example.com' },
  { name: '趙六', age: 36, email: 'zhaoliu@example.com' },
  { name: '錢七', age: 29, email: 'qianqi@example.com' }
])

const getAvatarUrl = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`

const editEmployee = (employee) => {
  console.log('editEmployee', employee)
}

const deleteEmployee = (employee) => {
  data.value = data.value.filter((item) => item.name !== employee.name)
}
</script>
