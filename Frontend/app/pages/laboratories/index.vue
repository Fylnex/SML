<script setup lang="ts">
// Установить заголовок страницы
useHead({
  title: 'Лаборатории'
})

// Использовать layout для лабораторий
definePageMeta({
  layout: 'laboratories'
})
</script>

<template>
  <UDashboardPanel id="laboratories">
    <template #header>
      <UDashboardNavbar title="Лаборатории">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex items-center justify-center h-96">
        <div class="text-center">
          <UIcon name="i-lucide-flask-conical" class="size-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Выберите лабораторию
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            Выберите лабораторию из списка слева, чтобы просмотреть подробную информацию
          </p>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
