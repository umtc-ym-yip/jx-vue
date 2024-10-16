<template>
  <div class="hot-zone">
    <slot></slot>
  </div>
</template>

<script setup>
import * as d3 from 'd3'

// x軸data [1,2,3,4,5,6,7,8,9,10,11,12]
// y軸data [1,2,3,4,5,6,7,8,9,10]

//data [
//  {x: 1, y: 1, count: 0},
//  {x: 1, y: 2, count: 0},
//  {x: 1, y: 3, count: 0},
//  {x: 1, y: 4, count: 0},
//  {x: 1, y: 5, count: 0},
//  {x: 1, y: 6, count: 0},
//  {x: 1, y: 7, count: 0},
//  {x: 1, y: 8, count: 0},
//  {x: 1, y: 9, count: 0},
//]

///color 0
// :
// 0
// 1
// :
// 0.1
// 2
// :
// 0.2
// 3
// :
// 0.30000000000000004
// 4
// :
// 0.4
// 5
// :
// 0.5
// 6
// :
// 0.6000000000000001
// 7
// :
// 0.7000000000000001
// 8
// :
// 0.8
// 9
// :
// 0.9
// 10
// :
// 1
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  x
})

function generateData() {
  const result = []
  const usedCoordinates = new Set()

  for (let x = 2; x <= 12; x++) {
    for (let y = 2; y <= 10; y++) {
      const coordinate = `${x},${y}`
      if (!usedCoordinates.has(coordinate)) {
        result.push({ x, y, count: 0 })
        usedCoordinates.add(coordinate)
      }
    }
  }

  // 隨機設置一些 count 值為 1
  const numberOfOnes = Math.floor(result.length * 0.1) // 設置約 10% 的 count 為 1
  for (let i = 0; i < numberOfOnes; i++) {
    const randomIndex = Math.floor(Math.random() * result.length)
    result[randomIndex].count = 1
  }

  return result
}

// 使用函數
const data = generateData()
console.log(data)
</script>
