<script setup lang="ts">
useHead({
  title: 'Настройки'
})

definePageMeta({
  layout: 'default'
})

const notifications = ref(true)
const emailUpdates = ref(false)
const darkMode = ref(false)
const language = ref('ru')
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-3xl mx-auto">
      <!-- Заголовок -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Настройки
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Управление настройками вашего аккаунта
        </p>
      </div>

      <!-- Уведомления -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Уведомления
        </h3>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                Push уведомления
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Получать уведомления о новых заданиях и обновлениях
              </p>
            </div>
            <UToggle v-model="notifications" />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                Email обновления
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Еженедельный отчет по активности
              </p>
            </div>
            <UToggle v-model="emailUpdates" />
          </div>
        </div>
      </div>

      <!-- Внешний вид -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Внешний вид
        </h3>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                Темная тема
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Переключить темный режим интерфейса
              </p>
            </div>
            <UToggle v-model="darkMode" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Язык интерфейса
            </label>
            <USelect
              v-model="language"
              :options="[
                { label: 'Русский', value: 'ru' },
                { label: 'English', value: 'en' },
                { label: 'Українська', value: 'uk' }
              ]"
            />
          </div>
        </div>
      </div>

      <!-- Безопасность -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Безопасность
        </h3>

        <div class="space-y-4">
          <UButton color="primary" variant="outline" block>
            <UIcon name="i-lucide-key" class="size-4" />
            Изменить пароль
          </UButton>

          <UButton color="neutral" variant="outline" block>
            <UIcon name="i-lucide-shield" class="size-4" />
            Двухфакторная аутентификация
          </UButton>
        </div>
      </div>

      <!-- Действия -->
      <div class="flex gap-4">
        <UButton color="primary" size="lg">
          Сохранить изменения
        </UButton>

        <UButton color="red" variant="outline" size="lg">
          <UIcon name="i-lucide-log-out" class="size-4" />
          Выйти из аккаунта
        </UButton>
      </div>
    </div>
  </div>
</template>
