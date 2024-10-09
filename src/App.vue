<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import JxIcon from '@/components/JxIcon.vue'
import { navItems } from '@/config/navLinks'

import JxRadio from '@/components/JxRadio.vue'
import JxButton from '@/components/JxButton.vue'
//
import { useValidation } from '@/utils/validate/validate.js'
const { validateField, validateFields, errors } = useValidation()
//

const activeNavItem = ref(null)
const activeLinkName = ref(null)

const currentLinks = computed(() => {
  const activeItem = navItems.find((item) => item.id === activeNavItem.value)
  return activeItem ? activeItem.links : []
})

const toggleComponentList = (itemId) => {
  if (activeNavItem.value === itemId) {
    activeNavItem.value = null
  } else {
    activeNavItem.value = itemId
  }
}
const toggleLinkList = (linkName) => {
  if (activeLinkName.value === linkName) {
    activeLinkName.value = null
  } else {
    activeLinkName.value = linkName
  }
}
const fields = ref({
  option: {
    value: '',
    rules: ['required']
  }
})
const radioItems = ref([
  {
    key: 'one',
    label: 'ONE'
  },
  {
    key: 'two',
    label: 'TWO'
  },
  {
    key: 'three',
    label: 'THREE'
  }
])
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <nav class="bg-gray-800 text-white z-10">
      <div class="p-4">
        <h1 class="flex justify-center text-2xl font-bold">SPC</h1>
      </div>
      <ul>
        <li
          v-for="item in navItems"
          :key="item.id"
          @click="toggleComponentList(item.id)"
          :class="[
            'select-none flex items-center p-4 cursor-pointer hover:bg-gray-700',
            { 'bg-gray-700': activeNavItem === item.id }
          ]"
        >
          <JxIcon class="mr-3">{{ item.icon }}</JxIcon>
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </nav>

    <!-- Dynamic list sidebar -->
    <!-- 處理點擊後列表 -->
    <div
      class="z-0 bg-white shadow-xl border-gray-300 overflow-y-auto transition-all transform duration-600"
      :class="{ 'translate-x-0': activeNavItem, '-translate-x-full': !activeNavItem }"
    >
      <ul class="p-2">
        <li v-for="link in currentLinks" :key="link.path" class="mb-2">
          <RouterLink
            @click="toggleLinkList(link.name)"
            :to="link.path"
            class="block text-center hover:underline px-2 py-1 rounded-md"
            :class="{
              'bg-gray-200 text-primary': activeLinkName === link.name,
              'text-secondary-dark': activeLinkName !== link.name
            }"
          >
            {{ link.name }}
          </RouterLink>
        </li>
      </ul>
    </div>
    <!-- Main content -->
    <main class="flex-1 p-4 border border-dark-700 overflow-y-auto">
      <RouterView></RouterView>
    </main>
  </div>

  <!-- Footer -->
  <footer class="absolute bottom-0 w-full bg-gray-200 text-center py-2 text-sm">
    Ant Design ©2024 Created by Ant UED
  </footer>
</template>
