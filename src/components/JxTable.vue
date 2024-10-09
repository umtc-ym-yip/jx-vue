<template>
  <div class="bg-white shadow rounded-lg">
    <!-- Header -->
    <div v-if="hasHeader" class="px-4 py-5 flex justify-between items-center">
      <h3 class="text-lg leading-6 font-medium text-gray-900">{{ title }}</h3>
      <div v-if="showSearch" class="relative">
        <input
          type="text"
          placeholder="Search..."
          v-model="searchQuery"
          class="border rounded-md py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <JxIcon color="text-gray-400" weight="300">search</JxIcon>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="overflow-x-auto">
      <!-- 自訂義插槽如果有，則不需要用columns和data來生成table -->
      <table v-if="!$slots.table" class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="column in tableColumns"
              :key="column.key"
              @click="sortBy(column.key)"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer"
            >
              <div class="flex items-center">
                <span>{{ column.label }}</span>
                <div class="flex flex-col -my-2">
                  <JxIcon
                    weight="300"
                    :color="
                      sortKey === column.key && sortOrder === 'asc'
                        ? 'text-secondary'
                        : 'text-secondary-light'
                    "
                    >arrow_drop_up</JxIcon
                  >
                  <JxIcon
                    weight="300"
                    class="-mt-4"
                    :color="
                      sortKey === column.key && sortOrder === 'desc'
                        ? 'text-secondary'
                        : 'text-secondary-light'
                    "
                    >arrow_drop_down</JxIcon
                  >
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody v-if="pageData.length > 0" class="bg-white divide-y divide-gray-200">
          <tr v-for="(row, rowIndex) in pageData" :key="rowIndex">
            <td
              v-for="column in tableColumns"
              :key="column.key"
              class="px-6 py-4 whitespace-nowrap"
            >
              <slot :name="column.key" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="100%" class="text-center">無資料</td>
          </tr>
        </tbody>
      </table>
      <table v-else class="min-w-full divide-y divide-gray-200">
        <!-- thead、tbody 自行生成 -->
        <slot
          name="table"
          :pageData="pageData"
          :tableColumns="tableColumns"
          :sortBy="sortBy"
        ></slot>
      </table>
    </div>

    <!-- Footer -->
    <div class="bg-white py-3 flex items-center justify-between border-t border-gray-200 px-6">
      <!-- <div class="flex-1 flex justify-between sm:hidden">
                <button @click="prevPage" :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                </button>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                    class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                </button>
            </div> -->
      <div class="flex-1 flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-700">
            {{ showCurrentCount }}
          </p>
        </div>
        <div>
          <nav
            class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Previous</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button
              v-for="page in displayedPages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                currentPage === page
                  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
              ]"
            >
              {{ page }}
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Next</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div class="relative flex items-center">
              <p class="ml-2 text-sm text-gray-700">每頁顯示</p>
              <input
                type="number"
                v-model.number="localItemsPerPage"
                class="w-20 mx-2 px-2 py-1 border rounded-md text-sm text-center"
                min="1"
              />
              <p class="text-sm text-gray-700">筆</p>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import JxIcon from './JxIcon.vue'

const props = defineProps({
  hasHeader: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: 'Table Title'
  },
  columns: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    required: true
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  itemsPerPage: {
    type: Number,
    default: 10
  },
  pageRange: {
    type: Number,
    default: 2
  }
})

const currentPage = ref(1)
const sortKey = ref('')
const sortOrder = ref('asc')
const searchQuery = ref('')
const localItemsPerPage = ref(props.itemsPerPage)

watch([searchQuery, localItemsPerPage], (newVal, oldVal) => {
  //當搜尋字串和每頁顯示筆數改變時，將currentPage設為1
  currentPage.value = 1
  console.log(newVal, oldVal)
})
watch(
  props.data,
  () => {
    currentPage.value = 1
  },
  { deep: true }
)

const sortedData = computed(() => {
  // 要先針對searchQuery進行過濾
  let result = []
  if (searchQuery.value) {
    props.data.forEach((item) => {
      Object.values(item).some((value) => String(value).includes(searchQuery.value))
        ? result.push(item)
        : null
    })
  } else {
    result = [...props.data]
  }
  if (sortKey.value) {
    result.sort((a, b) => {
      let modifier = sortOrder.value === 'asc' ? 1 : -1
      if (a[sortKey.value] < b[sortKey.value]) return -1 * modifier
      if (a[sortKey.value] > b[sortKey.value]) return 1 * modifier
      return 0
    })
  }
  return result
})

const pageData = computed(() => {
  // 分頁資料
  return sortedData.value.slice(
    (currentPage.value - 1) * localItemsPerPage.value,
    currentPage.value * localItemsPerPage.value
  )
})

const totalItems = computed(() => sortedData.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / localItemsPerPage.value))

const startIndex = computed(() => (currentPage.value - 1) * localItemsPerPage.value + 1)
const endIndex = computed(() => {
  return Math.min(currentPage.value * localItemsPerPage.value, totalItems.value)
})

const displayedPages = computed(() => {
  const pages = []
  // 依當前頁數，顯示前後兩頁，最小為1，最大為總頁數
  let minValue = Math.max(1, currentPage.value - props.pageRange)
  let maxValue = Math.min(totalPages.value, currentPage.value + props.pageRange)
  for (let i = minValue; i <= maxValue; i++) {
    pages.push(i)
  }
  return pages
})

const tableColumns = computed(() => {
  if (props.columns.length === 0) {
    return Object.keys(props.data[0]).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1)
    }))
  }
  return props.columns
})

const showCurrentCount = computed(() => {
  if (pageData.value.length === 0) {
    return ''
  }
  return `顯示${startIndex.value} 到 ${endIndex.value} 筆資料，共 ${totalItems.value} 筆資料`
})

function sortBy(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function goToPage(page) {
  currentPage.value = page
}
</script>
