<script setup lang="ts">
// Установить заголовок страницы
useHead({
  title: 'Задания'
})

// Использовать layout для заданий
definePageMeta({
  layout: 'control'
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
    submissionCount: 45,
    completionRate: 75
  },
  {
    id: 2,
    title: 'Лабораторная работа №2',
    description: 'Органическая химия',
    course: 'Химия',
    status: 'active',
    dueDate: '2024-02-05',
    submissionCount: 52,
    completionRate: 87
  },
  {
    id: 3,
    title: 'Лабораторная работа №3',
    description: 'Программирование на Python',
    course: 'Информатика',
    status: 'completed',
    dueDate: '2024-01-20',
    submissionCount: 60,
    completionRate: 95
  }
])
</script>

<template>
  <UDashboardPanel id="assignments">
    <template #header>
      <UDashboardNavbar title="Задания">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-4">
        <div v-for="assignment in assignments" :key="assignment.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {{ assignment.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {{ assignment.description }}
              </p>
              <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span class="flex items-center gap-1">
                  <UIcon name="i-lucide-book" class="size-4" />
                  {{ assignment.course }}
                </span>
                <span class="flex items-center gap-1">
                  <UIcon name="i-lucide-calendar" class="size-4" />
                  {{ assignment.dueDate }}
                </span>
              </div>
            </div>
            <UBadge
              :color="assignment.status === 'completed' ? 'success' : assignment.status === 'active' ? 'primary' : 'neutral'"
              variant="subtle"
            >
              {{ assignment.status === 'completed' ? 'Завершено' : assignment.status === 'active' ? 'Активно' : 'Не начато' }}
            </UBadge>
          </div>
          
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-users" class="size-4 text-gray-400" />
              <span class="text-sm text-gray-600 dark:text-gray-400">
                {{ assignment.submissionCount }} работ
              </span>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-check-circle" class="size-4 text-green-500" />
              <span class="text-sm text-gray-600 dark:text-gray-400">
                {{ assignment.completionRate }}% выполнено
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>

