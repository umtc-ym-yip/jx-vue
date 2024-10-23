<script setup>
import { ref, computed, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import JxIcon from '@/components/JxIcon.vue'
import { navItems } from '@/config/navLinks'

const activeNavItem = ref(null)
const activeLinkName = ref(null)
const mainContent = ref(null)

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
const route = useRoute()
watch(route, () => {
  mainContent.value.scrollTo({
    top: 0
  })
})

const switchValue = ref('one')
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <nav class="bg-gray-800 text-white z-10 flex">
      <!-- 主導航欄內容 -->
      <div>
        <div class="p-4">
          <h1 class="flex justify-center text-2xl font-bold">JXVUE</h1>
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
      </div>

      <!-- Dynamic list sidebar -->
      <div
        class="bg-white shadow-xl border-gray-300 overflow-y-hidden transition-all duration-600"
        :class="{ 'w-auto': activeNavItem, 'w-0': !activeNavItem }"
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
    </nav>

    <!-- Main content -->
    <main ref="mainContent" class="flex-1 p-4 border border-dark-700 overflow-y-auto">
      <RouterView></RouterView>
    </main>
  </div>

  <!-- Footer -->
  <footer class="absolute bottom-0 w-full bg-gray-200 text-center py-2 text-sm">
    Jx-Vue template ©2024 Created by Marvin
  </footer>
</template>
