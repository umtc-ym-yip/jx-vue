<template>
  <D3UnitMapping v-if="gerberData" :data-object="gerberData" :x-key="'x'" :y-key="'y'" />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import D3UnitMapping from '@/components/d3/D3UnitMapping.vue'
import { parseGerberFile } from '@/composables/d3/useD3Gerber'

const gerberData = ref(null)

async function fetchGerberFile(url) {
  const response = await axios.get(url)
  return response.data
}

onMounted(async () => {
  try {
    const gerberContent = await fetchGerberFile('http://192.168.0.185:3000/gerber')
    console.log('gerberContent', gerberContent)
    if (gerberContent) {
        console.log('parseGerberFile(gerberContent)',parseGerberFile(gerberContent))
      gerberData.value = parseGerberFile(gerberContent)
    }
    console.log('gerberData', gerberData.value)
  } catch (error) {
    console.error('Failed to fetch gerber content', error)
  }
})
</script>
