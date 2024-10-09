<template>
  <StoryContainer title="JxBoard 元件">
    <StorySection title="基本用法">
      <template #description> JxBoard 是一個可自定義的容器元件，用於包裝和展示內容。 </template>

      <template #usage>
        使用 <StoryCode>padding</StoryCode>, <StoryCode>margin</StoryCode>,
        <StoryCode>rounded</StoryCode>, <StoryCode>bgColor</StoryCode>,
        <StoryCode>hasBorder</StoryCode>, <StoryCode>borderColor</StoryCode>,
        <StoryCode>borderWidth</StoryCode> 屬性來自定義 JxBoard 的外觀。
      </template>

      <template #props>
        <StoryList>
          <li>
            <span class="font-semibold">padding:</span> 設置內邊距，可以是數字或字符串，預設為p-4
          </li>
          <li>
            <span class="font-semibold">margin:</span> 設置外邊距，可以是數字或字符串，預設為my-2
          </li>
          <li><span class="font-semibold">rounded:</span> 設置圓角，預設為 'none'</li>
          <li><span class="font-semibold">hasBorder:</span> 設置邊框，預設為 'false'</li>
          <li><span class="font-semibold">bgColor:</span> 設置背景顏色，默認為 'white'</li>
          <li><span class="font-semibold">borderColor:</span> 設置邊框顏色，默認為 'gray-300'</li>
          <li><span class="font-semibold">borderWidth:</span> 設置邊框寬度，默認為 '1px'</li>
        </StoryList>
      </template>

      <template #code>
        <pre>
&lt;JxBoard padding="4" margin="2" rounded="lg" bg-color="gray-100" has-border="true" border-color="error" border-width="2"&gt;
    &lt;p&gt;這是 JxBoard 的內容&lt;/p&gt;
  &lt;/JxBoard&gt;</pre
        >
      </template>
      <template #notes>
        屬性設定不可設定不同屬性前綴，否則會變成預設 <br />
        ex:<StoryCode>padding="p-8 m-8"</StoryCode>
      </template>

      <JxBoard
        padding="4"
        margin="8"
        rounded="lg"
        bg-color="gray-100"
        :has-border="true"
        border-color="red-700"
        :border-width="2"
      >
        <p>這是 JxBoard 的內容</p>
      </JxBoard>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
import JxBoard from '../JxBoard.vue'
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryCode from './StoryCode.vue'
import StoryList from './StoryList.vue'
</script>
