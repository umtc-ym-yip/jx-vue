<template>
  <img
    v-if="imageData"
    :src="`data:image/jpeg;base64,${imageData}`"
    :width="width"
    :height="height"
  />
  <div
    :style="{ width: `${width}px`, height: `${height}px` }"
    v-else
    class="flex items-center justify-center"
  >
    <i class="fas fa-spinner fa-spin mr-2 text-gray-500 opacity-50"></i>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  width: {
    type: Number,
    default: 250
  },
  height: { type: Number, default: 250 }
})
const imageData = ref(null)

async function getImage(url, factory) {
  return axios.get(`${API_BASE_URL}${API_ENDPOINTS.AOI_IMAGE}?url=${url}&factory=${factory}`)
}

onMounted(async () => {
  const { ImagePath, DefectSeq } = props.data
  const result = await getImage(`${ImagePath}/${DefectSeq}.jpg`)
  imageData.value = result.data
})
</script>
