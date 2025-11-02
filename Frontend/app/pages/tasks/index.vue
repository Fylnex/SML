<script setup lang="ts">
useHead({
  title: 'Задания'
})

definePageMeta({
  layout: 'default'
})

// Моковые данные заданий
const assignments = ref([
  {
    id: 1,
    title: 'Лабораторная работа №1',
    description: 'Изучение основ физики',
    course: 'Физика',
    status: 'active',
    dueDate: '2024-02-01',
    progress: 45
  },
  {
    id: 2,
    title: 'Лабораторная работа №2',
    description: 'Органическая химия',
    course: 'Химия',
    status: 'active',
    dueDate: '2024-02-05',
    progress: 78
  },
  {
    id: 3,
    title: 'Программирование на Python',
    description: 'Разработка веб-приложения',
    course: 'Информатика',
    status: 'completed',
    dueDate: '2024-01-20',
    progress: 100
  },
  {
    id: 4,
    title: 'Молекулярная биология',
    description: 'Исследование ДНК',
    course: 'Биология',
    status: 'upcoming',
    dueDate: '2024-02-15',
    progress: 0
  }
])

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success'
    case 'active':
      return 'primary'
    case 'upcoming':
      return 'neutral'
    default:
      return 'neutral'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Завершено'
    case 'active':
      return 'В процессе'
    case 'upcoming':
      return 'Не начато'
    default:
      return 'Неизвестно'
  }
}
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Задания
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Просмотр и управление лабораторными заданиями
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="assignment in assignments"
        :key="assignment.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {{ assignment.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {{ assignment.description }}
            </p>
          </div>
          <UBadge :color="getStatusColor(assignment.status)" variant="subtle" size="lg">
            {{ getStatusLabel(assignment.status) }}
          </UBadge>
        </div>

        <div class="space-y-3">
          <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <UIcon name="i-lucide-book-open" class="size-4" />
            <span>{{ assignment.course }}</span>
          </div>

          <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <UIcon name="i-lucide-calendar" class="size-4" />
            <span>До {{ assignment.dueDate }}</span>
          </div>

          <div v-if="assignment.status === 'active' || assignment.status === 'completed'">
            <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Прогресс</span>
              <span>{{ assignment.progress }}%</span>
            </div>
            <UProgress :value="assignment.progress" color="primary" :ui="{ background: 'bg-gray-200 dark:bg-gray-700' }" />
          </div>

          <UButton
            v-if="assignment.status !== 'completed'"
            color="primary"
            variant="solid"
            block
            size="lg"
            class="mt-4"
          >
            {{ assignment.status === 'active' ? 'Продолжить' : 'Начать' }}
          </UButton>

          <UButton
            v-else
            color="success"
            variant="outline"
            block
            size="lg"
            class="mt-4"
            icon="i-lucide-check"
          >
            Завершено
          </UButton>
        </div>
      </div>
    </div>

    <!-- Пустое состояние, если нет заданий -->
    <div v-if="assignments.length === 0" class="text-center py-16">
      <UIcon name="i-lucide-clipboard-list" class="size-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Нет доступных заданий
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        Все задания будут отображаться здесь
      </p>
    </div>
  </div>
</template>

