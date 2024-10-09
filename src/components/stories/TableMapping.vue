<template>
  <D3TableMapping
    v-if="dataLoaded"
    :data="mappingData"
    :layout-data="layoutData"
    :x-key="'Xvalue'"
    :y-key="'Yvalue'"
    :series-key="'Classify'"
  >
  </D3TableMapping>
</template>
<script setup>
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import D3TableMapping from '@/components/d3/D3TableMapping.vue'

const mappingData = ref([])
const layoutData = ref([])
const dataLoaded = ref(false)

const getmappingData = (lot, layer, isincludefake = 1, process, factory) =>
  axios.get(
    `http://10.22.94.222:8000/aoi/mapping/${lot}/${layer}/${isincludefake}/${process}/${factory}`
  )
const getLayoutData = () =>
  axios.get(`http://10.22.94.222:8000/aoi/layout/3273012/249PE002-04-00/-L9L14`)
onMounted(() => {
  Promise.all([getmappingData('249PE002-04-00', '-L9L14', 0, 'ptaoi', 'YM'), getLayoutData()]).then(
    ([res1, res2]) => {
      mappingData.value = res1.data
      layoutData.value = res2.data.dataAry
      dataLoaded.value = true
    }
  )
})
</script>
