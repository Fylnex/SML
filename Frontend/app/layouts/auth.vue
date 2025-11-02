<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#1b1718' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'ru'
  }
})

const title = 'Авторизация - System Management Laboratory'
const description = 'Войдите в систему управления лабораторией'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/dashboard-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/dashboard-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col py-12 sm:px-6 lg:px-8">
      <div class="flex-1 flex items-center justify-center">
        <div class="sm:mx-auto sm:w-full sm:max-w-md w-full">
          <div class="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
            <!-- Логотип -->
            <div class="flex justify-center mb-8">
              <img src="/logo.png" alt="SML Logo" class="size-16" />
            </div>

            <!-- Форма -->
            <slot />
          </div>
        </div>
      </div>

      <!-- Футер -->
      <div class="flex flex-col items-center gap-2 mt-8">
        <UButton variant="link" color="neutral" size="sm" class="text-xs">
          Условия использования
        </UButton>
        <UButton variant="link" color="neutral" size="sm" class="text-xs">
          Политика конфиденциальности
        </UButton>
      </div>
    </div>
  </UApp>
</template>
