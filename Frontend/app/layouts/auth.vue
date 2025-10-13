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
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="flex justify-center">
          <div class="flex items-center space-x-2">
            <UIcon name="i-lucide-shield-check" class="size-8 text-primary" />
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">SML</h1>
          </div>
        </div>

        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Система управления лабораторией
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <slot />
        </div>
      </div>

      <div class="mt-8 text-center">
        <p class="text-xs text-gray-500 dark:text-gray-400">
          © 2024 System Management Laboratory. Все права защищены.
        </p>
      </div>
    </div>
  </UApp>
</template>
