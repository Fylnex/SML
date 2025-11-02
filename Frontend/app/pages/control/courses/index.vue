<script setup lang="ts">
// Установить заголовок страницы
useHead({
  title: 'Курсы'
})

// Использовать layout для курсов
definePageMeta({
  layout: 'courses'
})
</script>

<template>
  <UDashboardPanel id="courses">
    <template #header>
      <UDashboardNavbar title="Курсы">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col items-center justify-center h-96 text-center">
        <UIcon name="i-lucide-book-open" class="size-16 text-gray-400 mb-4" />
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Выберите курс
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-md">
          Выберите курс из списка слева, чтобы просмотреть подробную информацию о нем.
        </p>
      </div>
    </template>
  </UDashboardPanel>
</template>
