<template>
  <StoryContainer title="JxEmptyStatus 空狀態組件">
    <StorySection title="基本用法">
      <template #description>
        JxEmptyStatus 是一個用於顯示空狀態的可重用 Vue 組件。當數據為空或查詢結果為空時，它會顯示一個自定義的圖片和消息。
      </template>

      <template #usage>
        使用 <StoryCode>isEmpty</StoryCode>, <StoryCode>message</StoryCode>, 和
        <StoryCode>imageSrc</StoryCode> 屬性來設置空狀態的顯示。
      </template>

      <template #props>
        <StoryList>
          <li><span class="font-semibold">isEmpty:</span> 控制是否顯示空狀態，類型為 Boolean，默認為 true</li>
          <li><span class="font-semibold">message:</span> 顯示的消息文本，類型為 String，默認為 "沒有資料"</li>
          <li><span class="font-semibold">imageSrc:</span> 自定義圖片的路徑，類型為 String，默認使用內置圖片</li>
          <li><span class="font-semibold">imageAlt:</span> 圖片的 alt 文本，類型為 String，默認為 "Data not found"</li>
          <li><span class="font-semibold">width:</span> 圖片寬度，類型為 String 或 Number，默認為 "auto"</li>
          <li><span class="font-semibold">height:</span> 圖片高度，類型為 String 或 Number，默認為 "auto"</li>
          <li><span class="font-semibold">messageClass:</span> 應用於消息文本的 CSS 類，類型為 String，默認為 "text-secondary font-medium mt-4"</li>
        </StoryList>
      </template>

      <template #code>
        <pre>
        &lt;JxEmptyStatus 
          :isEmpty="true" 
          message="沒有找到相關數據" 
          imageSrc="@/assets/data_not_found.png" 
          :width="200" 
          height="150px"
        /&gt;
        </pre>
      </template>

      <JxEmptyStatus
        :isEmpty="true"
        message="沒有找到相關數據"
        imageSrc="@/assets/data_not_found.png"
        :width="200"
        height="150px"
      />
    </StorySection>

    <StorySection title="自定義樣式">
      <template #description>
        您可以使用 <StoryCode>messageClass</StoryCode> 屬性來自定義消息的樣式。
      </template>

      <template #code>
        <pre>
        &lt;JxEmptyStatus 
          :isEmpty="true" 
          message="暫無數據" 
          messageClass="text-red-500 font-bold text-xl"
        /&gt;
        </pre>
      </template>

      <JxEmptyStatus
        :isEmpty="true"
        message="暫無數據"
        messageClass="text-red-500 font-bold text-xl"
      />
    </StorySection>

    <StorySection title="使用插槽">
      <template #description>
        JxEmptyStatus 允許您使用默認插槽來完全自定義空狀態的內容。
      </template>

      <template #usage>
        使用默認插槽來定義自定義的空狀態內容。這將覆蓋默認的圖片和消息。
      </template>

      <template #code>
        <pre>
        &lt;JxEmptyStatus :isEmpty="true"&gt;
          &lt;template #default&gt;
            &lt;div class="text-center"&gt;
              &lt;p class="mt-4 text-gray-500"&gt;這是一個完全自定義的空狀態&lt;/p&gt;
            &lt;/div&gt;
          &lt;/template&gt;
        &lt;/JxEmptyStatus&gt;
        </pre>
      </template>

      <JxEmptyStatus :isEmpty="true">
        <template #default>
          <div class="text-center">
            <p class="mt-4 text-gray-500">這是一個完全自定義的空狀態</p>
          </div>
        </template>
      </JxEmptyStatus>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
import JxEmptyStatus from '../JxEmptyStatus.vue'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryCode from './StoryCode.vue'
import StoryList from './StoryList.vue'

</script>
