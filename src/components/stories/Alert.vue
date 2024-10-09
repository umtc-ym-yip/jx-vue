<template>
  <JxAlert v-model:show="alertConfig.show" v-bind="alertConfig" />
  <StoryContainer title="Alert 系統">
    <StorySection title="Alert 使用方法">
      <template #description>
        Alert 系統提供了一個簡單的方式來顯示警告、確認和其他類型的彈出框。它是基於 SweetAlert2
        的封裝。
      </template>

      <template #usage>
        使用 <StoryCode>showAlert</StoryCode> 函數來顯示 Alert。你可以通過傳入不同的參數來自定義
        Alert 的內容和樣式。
      </template>

      <template #code>
        <pre>
          import { showAlert } from '@/utils/sweetalert/swal' // 顯示成功 Alert showAlert('success',
        '操作成功', { text: '你的更改已經保存' }) // 顯示錯誤 Alert showAlert('error', '操作失敗', {
        text: '請稍後再試' }) // 顯示警告 Alert showAlert('warning', '注意', { text:
        '這個操作不可逆' }) // 顯示信息 Alert showAlert('info', '提示', { text: '你有一條新消息' })
        // 顯示確認 Alert showAlert('warning', '確認刪除', { text: '你確定要刪除這個項目嗎？',
        showCancelButton: true, confirmButtonText: '確定', cancelButtonText: '取消' })
        </pre>
      </template>

      <div class="flex mt-4 space-x-2">
        <JxButton @click="showSuccessAlert" color="primary">成功</JxButton>
        <JxButton @click="showErrorAlert" color="error">錯誤</JxButton>
        <JxButton @click="showWarningAlert" color="warning">警告</JxButton>
        <JxButton @click="showInfoAlert" color="success">信息</JxButton>
        <JxButton @click="showConfirmAlert" color="primary">確認</JxButton>
      </div>
      <template #notes> 記得要引用JxAlert.vue在template任一位置 </template>
    </StorySection>

    <StorySection title="showAlert 函數參數">
      <StoryList>
        <li>
          <StoryCode>preset</StoryCode>: Alert 的預設類型，可選值為 'success', 'error', 'warning',
          'info'（String）
        </li>
        <li><StoryCode>text</StoryCode>: Alert 的內容文字（String）</li>
        <li><StoryCode>customConfig</StoryCode>: 自定義配置對象，可以覆蓋預設配置（Object）</li>
      </StoryList>
    </StorySection>

    <StorySection title="customConfig 可用選項">
      <template #description>
        customConfig 可用選項，會覆蓋 preset 的預設值。以下是每個選項的使用範例：
      </template>

      <template #props>
        <StoryList>
          <li>
            <StoryCode>title</StoryCode>: Alert 的標題（String）
            <StoryCode> showAlert('success', '操作成功', { title: '自定義標題' }) </StoryCode>
          </li>
          <li>
            <StoryCode>icon</StoryCode>: Alert 的圖標類型，可選值為 'success', 'error', 'warning',
            'info', 'question'（String）
            <StoryCode> showAlert('success', '操作成功', { icon: 'question' }) </StoryCode>
          </li>
          <li>
            <StoryCode>showCloseButton</StoryCode>: 是否顯示關閉按鈕（Boolean）
            <StoryCode> showAlert('info', '這是一條信息', { showCloseButton: false }) </StoryCode>
          </li>
          <li>
            <StoryCode>showConfirmButton</StoryCode>: 是否顯示確認按鈕（Boolean）
            <StoryCode> showAlert('warning', '注意', { showConfirmButton: false }) </StoryCode>
          </li>
          <li>
            <StoryCode>confirmButtonText</StoryCode>: 確認按鈕的文字（String）
            <StoryCode> showAlert('success', '操作成功', { confirmButtonText: '了解' }) </StoryCode>
          </li>
          <li>
            <StoryCode>showCancelButton</StoryCode>: 是否顯示取消按鈕（Boolean）
            <StoryCode>
              showAlert('warning', '確定要刪除嗎？', { showCancelButton: true })
            </StoryCode>
          </li>
          <li>
            <StoryCode>cancelButtonText</StoryCode>: 取消按鈕的文字（String）
            <StoryCode>
              showAlert('warning', '確定要刪除嗎？', { showCancelButton: true, cancelButtonText:
              '不要刪除' })
            </StoryCode>
          </li>
          <li>
            <StoryCode>footer</StoryCode>: Alert 的頁腳內容（String）
            <StoryCode>
              showAlert('info', '系統更新', { footer: '&lt;a href="#"&gt;了解更多&lt;/a&gt;' })
            </StoryCode>
          </li>
          <li>
            <StoryCode>html</StoryCode>: 使用 HTML 內容而不是純文本（String）
            <StoryCode>
              showAlert('info', '', { html: '&lt;b&gt;粗體文字&lt;/b&gt; 和
              &lt;i&gt;斜體文字&lt;/i&gt;' })
            </StoryCode>
          </li>
        </StoryList>
      </template>

      <div class="mt-4 space-y-2">
        <JxButton @click="showCustomTitleAlert" color="primary">自定義標題</JxButton>
        <JxButton @click="showCustomIconAlert" color="success">自定義圖標</JxButton>
        <JxButton @click="showNoCloseButtonAlert" color="warning">無關閉按鈕</JxButton>
        <JxButton @click="showNoConfirmButtonAlert" color="error">無確認按鈕</JxButton>
        <JxButton @click="showCustomConfirmTextAlert" color="primary">自定義確認文字</JxButton>
        <JxButton @click="showWithCancelButtonAlert" color="primary">顯示取消按鈕</JxButton>
        <JxButton @click="showCustomCancelTextAlert" color="primary">自定義取消文字</JxButton>
        <JxButton @click="showWithFooterAlert" color="primary">顯示頁腳</JxButton>
        <JxButton @click="showHtmlContentAlert" color="primary">HTML 內容</JxButton>
      </div>
    </StorySection>
  </StoryContainer>
</template>

<script setup>
import StoryContainer from './StoryContainer.vue'
import StorySection from './StorySection.vue'
import StoryCode from './StoryCode.vue'
import StoryList from './StoryList.vue'
import JxButton from '@/components/JxButton.vue'
import JxAlert from '@/components/JxAlert.vue'
import { showAlert, alertConfig } from '@/utils/sweetalert/swal.js'

const showSuccessAlert = () =>
  showAlert('success', '操作成功', { text: '你的更改已經保存', showCancelButton: false })
const showErrorAlert = () => showAlert('error', '操作失敗', { text: '請稍後再試' })
const showWarningAlert = () => showAlert('warning', '注意', { text: '這個操作不可逆' })
const showInfoAlert = () => showAlert('info', '提示', { text: '你有一條新消息' })
const showConfirmAlert = () => {
  showAlert('warning', '確認刪除', {
    text: '你確定要刪除這個項目嗎？',
    showCancelButton: true,
    confirmButtonText: '確定',
    cancelButtonText: '取消'
  })
}

const showCustomTitleAlert = () => showAlert('success', '操作成功', { title: '自定義標題' })
const showCustomIconAlert = () => showAlert('success', '操作成功', { icon: 'question' })
const showNoCloseButtonAlert = () => showAlert('info', '這是一條信息', { showCloseButton: false })
const showNoConfirmButtonAlert = () => showAlert('warning', '注意', { showConfirmButton: false })
const showCustomConfirmTextAlert = () =>
  showAlert('success', '操作成功', { confirmButtonText: '了解' })
const showWithCancelButtonAlert = () =>
  showAlert('warning', '確定要刪除嗎？', { showCancelButton: true })
const showCustomCancelTextAlert = () =>
  showAlert('warning', '確定要刪除嗎？', { showCancelButton: true, cancelButtonText: '不要刪除' })
const showWithFooterAlert = () =>
  showAlert('info', '系統更新', { footer: '<a href="#">了解更多</a>' })
const showHtmlContentAlert = () =>
  showAlert('info', '', { html: '<b>粗體文字</b> 和 <i>斜體文字</i>' })
</script>
