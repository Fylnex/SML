<script setup lang="ts">
useHead({
  title: 'Профиль'
})

definePageMeta({
  layout: 'default'
})

// Моковые данные пользователя
const user = ref({
  name: 'Иван Иванов',
  email: 'ivan.ivanov@example.com',
  role: 'Студент',
  group: 'ИТ-21',
  avatar: null
})

const stats = ref([
  { label: 'Выполнено заданий', value: 24, icon: 'i-lucide-check-circle' },
  { label: 'Активных лабораторий', value: 5, icon: 'i-lucide-flask-conical' },
  { label: 'Средний балл', value: 4.8, icon: 'i-lucide-star' },
  { label: 'Дней в системе', value: 128, icon: 'i-lucide-calendar' }
])
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Заголовок -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Профиль
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Личная информация и статистика
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Профиль пользователя -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div class="text-center mb-6">
              <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 mb-4">
                <UIcon name="i-lucide-user" class="size-12 text-white" />
              </div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {{ user.name }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {{ user.role }}
              </p>
              <UBadge color="primary" variant="subtle">
                {{ user.group }}
              </UBadge>
            </div>

            <div class="space-y-3">
              <div class="flex items-center gap-3 text-sm">
                <UIcon name="i-lucide-mail" class="size-4 text-gray-400" />
                <span class="text-gray-600 dark:text-gray-400">{{ user.email }}</span>
              </div>

              <UButton color="primary" variant="outline" block>
                <UIcon name="i-lucide-edit" class="size-4" />
                Редактировать профиль
              </UButton>
            </div>
          </div>
        </div>

        <!-- Статистика -->
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Статистика
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
              >
                <div class="flex items-center gap-3 mb-2">
                  <UIcon :name="stat.icon" class="size-5 text-primary-500" />
                  <span class="text-2xl font-bold text-gray-900 dark:text-white">
                    {{ stat.value }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ stat.label }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Недавняя активность -->
      <div class="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Недавняя активность
        </h3>

        <div class="space-y-4">
          <div class="flex items-start gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <UIcon name="i-lucide-check" class="size-4 text-green-600 dark:text-green-400" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                Завершена лабораторная работа
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Физика • 2 дня назад
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <UIcon name="i-lucide-book-open" class="size-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                Начата лабораторная работа
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Химия • 5 дней назад
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <UIcon name="i-lucide-calendar" class="size-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                Забронирована лаборатория
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Информатика • 1 неделю назад
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

