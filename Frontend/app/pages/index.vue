<script setup lang="ts">
import { sub } from 'date-fns'
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Period, Range } from '~/types'

const { isNotificationsSlideoverOpen } = useDashboard()

const items = [[{
  label: 'Новая лаборатория',
  icon: 'i-lucide-flask-conical',
  to: '/laboratories'
}, {
  label: 'Новый пользователь',
  icon: 'i-lucide-user-plus',
  to: '/users/create'
}]] satisfies DropdownMenuItem[][]

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date()
})
const period = ref<Period>('daily')

// Данные для метрик лабораторных работ
const labMetrics = ref({
  totalLabs: 24,
  activeLabs: 18,
  completedLabs: 156,
  averageCompletionTime: 45,
  successRate: 87.5,
  resourceUsage: 68.2
})

// Данные для графиков
const labActivityData = computed(() => {
  const days = []
  const completed = []
  const started = []
  
  for (let i = 13; i >= 0; i--) {
    const date = sub(new Date(), { days: i })
    days.push(date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }))
    completed.push(Math.floor(Math.random() * 20) + 5)
    started.push(Math.floor(Math.random() * 15) + 3)
  }
  
  return { days, completed, started }
})

const labPerformanceData = computed(() => {
  return [
    { name: 'Отлично', value: 45, color: '#10b981' },
    { name: 'Хорошо', value: 32, color: '#3b82f6' },
    { name: 'Удовлетворительно', value: 18, color: '#f59e0b' },
    { name: 'Неудовлетворительно', value: 5, color: '#ef4444' }
  ]
})

const resourceUsageData = computed(() => {
  return [
    { name: 'CPU', usage: 68, color: '#3b82f6' },
    { name: 'Память', usage: 45, color: '#10b981' },
    { name: 'Диск', usage: 32, color: '#f59e0b' },
    { name: 'Сеть', usage: 23, color: '#8b5cf6' }
  ]
})
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Панель управления" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UTooltip text="Уведомления" :shortcuts="['N']">
            <UButton
              color="neutral"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip color="error" inset>
                <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
              </UChip>
            </UButton>
          </UTooltip>

          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <!-- NOTE: The `-ms-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
          <HomeDateRangePicker v-model="range" class="-ms-1" />

          <HomePeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <!-- Метрики лабораторных работ -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Всего лабораторий</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ labMetrics.totalLabs }}</p>
            </div>
            <UIcon name="i-lucide-flask-conical" class="w-8 h-8 text-blue-500" />
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Активные лаборатории</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ labMetrics.activeLabs }}</p>
            </div>
            <UIcon name="i-lucide-activity" class="w-8 h-8 text-green-500" />
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Завершено работ</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ labMetrics.completedLabs }}</p>
            </div>
            <UIcon name="i-lucide-check-circle" class="w-8 h-8 text-emerald-500" />
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Среднее время (мин)</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ labMetrics.averageCompletionTime }}</p>
            </div>
            <UIcon name="i-lucide-clock" class="w-8 h-8 text-orange-500" />
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Успешность (%)</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ labMetrics.successRate }}%</p>
            </div>
            <UIcon name="i-lucide-trending-up" class="w-8 h-8 text-purple-500" />
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Использование ресурсов (%)</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ labMetrics.resourceUsage }}%</p>
            </div>
            <UIcon name="i-lucide-server" class="w-8 h-8 text-red-500" />
          </div>
        </UCard>
      </div>

      <!-- Графики -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- График активности лабораторий -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">Активность лабораторий</h3>
          </template>
          <div class="h-64 flex items-end justify-between gap-2">
            <div v-for="(day, index) in labActivityData.days" :key="index" class="flex flex-col items-center gap-2 flex-1">
              <div class="flex flex-col gap-1 w-full">
                <div 
                  class="bg-blue-500 rounded-t" 
                  :style="{ height: `${(labActivityData.completed[index] / 25) * 200}px` }"
                ></div>
                <div 
                  class="bg-green-500 rounded-b" 
                  :style="{ height: `${(labActivityData.started[index] / 25) * 200}px` }"
                ></div>
              </div>
              <span class="text-xs text-gray-500">{{ day }}</span>
            </div>
          </div>
          <div class="flex justify-center gap-4 mt-4">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-blue-500 rounded"></div>
              <span class="text-sm text-gray-600 dark:text-gray-400">Завершено</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-green-500 rounded"></div>
              <span class="text-sm text-gray-600 dark:text-gray-400">Начато</span>
            </div>
          </div>
        </UCard>

        <!-- График производительности -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">Производительность студентов</h3>
          </template>
          <div class="h-64 flex items-center justify-center">
            <div class="relative w-48 h-48">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e5e7eb"
                  stroke-width="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  :stroke="labPerformanceData[0].color"
                  stroke-width="8"
                  :stroke-dasharray="`${labPerformanceData[0].value * 2.51} 251`"
                  stroke-linecap="round"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ labPerformanceData[0].value }}%</div>
                  <div class="text-sm text-gray-500">{{ labPerformanceData[0].name }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 mt-4">
            <div v-for="item in labPerformanceData.slice(1)" :key="item.name" class="flex items-center gap-2">
              <div class="w-3 h-3 rounded" :style="{ backgroundColor: item.color }"></div>
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ item.name }}: {{ item.value }}%</span>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Использование ресурсов -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Использование ресурсов</h3>
        </template>
        <div class="space-y-4">
          <div v-for="resource in resourceUsageData" :key="resource.name" class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded" :style="{ backgroundColor: resource.color }"></div>
              <span class="font-medium text-gray-900 dark:text-white">{{ resource.name }}</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  class="h-2 rounded-full" 
                  :style="{ 
                    backgroundColor: resource.color, 
                    width: `${resource.usage}%` 
                  }"
                ></div>
              </div>
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400 w-12 text-right">{{ resource.usage }}%</span>
            </div>
          </div>
        </div>
      </UCard>
    </template>
  </UDashboardPanel>
</template>
