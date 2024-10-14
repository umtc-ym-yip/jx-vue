<template>
  <D3Pareto :data="processedData" xKey="label" yKey="percentage" combineValue="0.8" />
</template>
<script setup>
import { ref, computed } from 'vue'
import { processParetoData } from '@/utils/d3/paretoDataProcessor'
import D3Pareto from '@/components/d3/D3Pareto.vue'

// 假設這是您的原始數據
const rawData = ref(generateTestData())
const xKey = ref('Classify')
const combineValue = ref(0.8)

function generateTestData(count = 50) {
  const classifications = ['S1', 'S2', 'S3', 'S4', 'S5']
  const data = []

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * classifications.length)
    data.push({ Classify: classifications[randomIndex] })
  }

  return data
}
// 使用 processParetoData 函數處理數據
const processedData = computed(() =>
  processParetoData(rawData.value, xKey.value, combineValue.value)
)
</script>
