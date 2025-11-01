<script setup lang="ts">
import type { Laboratory, LaboratoryStatus } from '~/types'

const route = useRoute()
const labId = route.params.id as string

// Моковые данные лабораторий (в реальном приложении это будет API запрос)
const laboratories: Laboratory[] = [
  {
    id: 1,
    name: 'Лаборатория физики',
    description: 'Исследования в области квантовой физики и материаловедения',
    status: 'active',
    capacity: 20,
    equipment: 15,
    location: 'Корпус А, 3 этаж',
    supervisor: 'Проф. Иванов А.А.',
    lastActivity: '2024-01-15',
    performanceData: [65, 72, 68, 75, 80, 78, 82, 85, 88, 90, 87, 92, 89, 95]
  },
  {
    id: 2,
    name: 'Лаборатория химии',
    description: 'Органическая и неорганическая химия, биохимия',
    status: 'active',
    capacity: 25,
    equipment: 18,
    location: 'Корпус Б, 2 этаж',
    supervisor: 'Проф. Петрова М.В.',
    lastActivity: '2024-01-14',
    performanceData: [70, 75, 78, 82, 85, 88, 90, 87, 92, 89, 94, 91, 96, 93]
  },
  {
    id: 3,
    name: 'Лаборатория биологии',
    description: 'Молекулярная биология и генетика',
    status: 'maintenance',
    capacity: 15,
    equipment: 12,
    location: 'Корпус В, 1 этаж',
    supervisor: 'Доц. Сидоров К.Л.',
    lastActivity: '2024-01-10',
    performanceData: [45, 50, 48, 52, 55, 58, 60, 57, 62, 59, 64, 61, 66, 63]
  },
  {
    id: 4,
    name: 'Лаборатория информатики',
    description: 'Программирование, ИИ и машинное обучение',
    status: 'active',
    capacity: 30,
    equipment: 25,
    location: 'Корпус Г, 4 этаж',
    supervisor: 'Проф. Козлов Д.С.',
    lastActivity: '2024-01-16',
    performanceData: [80, 85, 88, 90, 92, 95, 97, 94, 98, 96, 99, 97, 100, 98]
  },
  {
    id: 5,
    name: 'Лаборатория робототехники',
    description: 'Разработка и тестирование роботизированных систем',
    status: 'inactive',
    capacity: 12,
    equipment: 8,
    location: 'Корпус Д, 2 этаж',
    supervisor: 'Доц. Волкова Е.Н.',
    lastActivity: '2024-01-05',
    performanceData: [30, 35, 32, 38, 40, 42, 45, 43, 47, 45, 49, 47, 50, 48]
  }
]

// Найти лабораторию по ID
const laboratory = computed(() => {
  return laboratories.find(lab => lab.id === parseInt(labId)) || null
})

const statusColors: Record<LaboratoryStatus, 'success' | 'warning' | 'error'> = {
  active: 'success',
  maintenance: 'warning',
  inactive: 'error'
}

const statusLabels: Record<LaboratoryStatus, string> = {
  active: 'Активна',
  maintenance: 'Техобслуживание',
  inactive: 'Неактивна'
}

// Функция для генерации данных графика
const getChartData = (performanceData: number[]) => {
  const max = Math.max(...performanceData)
  const min = Math.min(...performanceData)
  const range = max - min
  
  return performanceData.map((value, index) => ({
    x: index,
    y: ((value - min) / range) * 100,
    value: value
  }))
}

// Данные для графика
const chartData = computed(() => {
  if (!laboratory.value || !laboratory.value.performanceData || laboratory.value.performanceData.length === 0) return null
  
  const lab = laboratory.value
  const performanceData = lab.performanceData
  
  const firstValue = performanceData[0]!
  const areaPath = `M 0,${200 - (firstValue * 1.8)} ${performanceData.map((value, index) => `L ${(index * 600) / (performanceData.length - 1)},${200 - (value * 1.8)}`).join(' ')} L 600,200 L 0,200 Z`
  const linePath = `M 0,${200 - (firstValue * 1.8)} ${performanceData.map((value, index) => `L ${(index * 600) / (performanceData.length - 1)},${200 - (value * 1.8)}`).join(' ')}`
  const strokeColor = statusColors[lab.status] === 'success' ? '#10b981' : statusColors[lab.status] === 'warning' ? '#f59e0b' : '#ef4444'
  
  return {
    areaPath,
    linePath,
    strokeColor
  }
})

// Установить заголовок страницы
useHead({
  title: laboratory.value ? `${laboratory.value.name} - Лаборатории` : 'Лаборатория не найдена'
})

// Использовать layout для лабораторий
definePageMeta({
  layout: 'laboratories'
})
</script>

<template>
  <UDashboardPanel v-if="laboratory" id="laboratory-detail">
    <template #header>
      <UDashboardNavbar :title="laboratory.name">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #trailing>
          <div class="flex items-center gap-3">
            <UBadge
              :color="statusColors[laboratory.status]"
              variant="subtle"
              size="lg"
            >
              {{ statusLabels[laboratory.status] }}
            </UBadge>
            <UButton
              color="neutral"
              variant="outline"
              icon="i-lucide-edit"
            >
              Редактировать
            </UButton>
            <UButton
              color="primary"
              icon="i-lucide-settings"
            >
              Настройки
            </UButton>
          </div>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-6">
        <!-- Основная информация -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2">
            <UCard>
              <template #header>
                <h2 class="text-xl font-semibold">Описание</h2>
              </template>
              <div class="p-6">
                <p class="text-gray-600 dark:text-gray-400 mb-6">{{ laboratory.description }}</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Местоположение</h3>
                    <div class="flex items-center gap-2">
                      <UIcon name="i-lucide-map-pin" class="size-4 text-gray-400" />
                      <span class="font-medium">{{ laboratory.location }}</span>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Руководитель</h3>
                    <div class="flex items-center gap-2">
                      <UIcon name="i-lucide-user" class="size-4 text-gray-400" />
                      <span class="font-medium">{{ laboratory.supervisor }}</span>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Последняя активность</h3>
                    <div class="flex items-center gap-2">
                      <UIcon name="i-lucide-calendar" class="size-4 text-gray-400" />
                      <span class="font-medium">{{ new Date(laboratory.lastActivity).toLocaleDateString('ru-RU') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </UCard>
          </div>

          <!-- Статистика -->
          <div class="space-y-4">
            <UCard>
              <div class="p-6">
                <div class="flex items-center gap-4">
                  <div class="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <UIcon name="i-lucide-users" class="size-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Вместимость</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ laboratory.capacity }} мест</p>
                  </div>
                </div>
              </div>
            </UCard>

            <UCard>
              <div class="p-6">
                <div class="flex items-center gap-4">
                  <div class="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <UIcon name="i-lucide-cpu" class="size-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Оборудование</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ laboratory.equipment }} единиц</p>
                  </div>
                </div>
              </div>
            </UCard>

            <UCard>
              <div class="p-6">
                <div class="flex items-center gap-4">
                  <div class="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <UIcon name="i-lucide-activity" class="size-6 text-purple-600 dark:text-purple-400" />
                  </div>
  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Средняя загрузка</p>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">
                      {{ Math.round(laboratory.performanceData.reduce((a, b) => a + b, 0) / laboratory.performanceData.length) }}%
                    </p>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <!-- График производительности -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Производительность за последние 14 дней</h3>
              <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div class="w-3 h-3 rounded-full" :class="{
                  'bg-green-500': laboratory.status === 'active',
                  'bg-yellow-500': laboratory.status === 'maintenance',
                  'bg-red-500': laboratory.status === 'inactive'
                }"></div>
                <span>Текущий статус</span>
              </div>
            </div>
          </template>

          <div class="p-6">
            <div class="h-64 bg-gray-900 dark:bg-gray-950 rounded-lg p-4">
              <div class="relative h-full w-full">
                <svg v-if="laboratory" class="w-full h-full" viewBox="0 0 600 200">
                  <!-- Сетка -->
                  <defs>
                    <pattern id="grid-detail" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#374151" stroke-width="0.5"/>
                    </pattern>
                    <linearGradient id="areaGradient-detail" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" :style="{ stopColor: statusColors[laboratory.status] === 'success' ? '#10b981' : statusColors[laboratory.status] === 'warning' ? '#f59e0b' : '#ef4444', stopOpacity: 0.4 }" />
                      <stop offset="100%" :style="{ stopColor: statusColors[laboratory.status] === 'success' ? '#10b981' : statusColors[laboratory.status] === 'warning' ? '#f59e0b' : '#ef4444', stopOpacity: 0.1 }" />
                    </linearGradient>
                  </defs>
                  
                  <!-- Фон с сеткой -->
                  <rect width="600" height="200" fill="url(#grid-detail)" />
                  
                  <!-- Y-axis labels -->
                  <g class="text-xs fill-gray-500">
                    <text x="10" y="20">100</text>
                    <text x="10" y="50">75</text>
                    <text x="10" y="80">50</text>
                    <text x="10" y="110">25</text>
                    <text x="10" y="140">0</text>
                  </g>
                  
                  <!-- Область под линией -->
                  <path
                    v-if="chartData"
                    :d="chartData.areaPath"
                    fill="url(#areaGradient-detail)"
                  />
                  
                  <!-- Линия графика -->
                  <path
                    v-if="chartData"
                    :d="chartData.linePath"
                    :stroke="chartData.strokeColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            
            <!-- Статистика графика -->
            <div class="grid grid-cols-3 gap-4 mt-4 text-sm">
              <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p class="text-gray-500 dark:text-gray-400">Среднее</p>
                <p class="font-bold text-gray-900 dark:text-white">
                  {{ Math.round(laboratory.performanceData.reduce((a, b) => a + b, 0) / laboratory.performanceData.length) }}%
                </p>
              </div>
              <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p class="text-gray-500 dark:text-gray-400">Максимум</p>
                <p class="font-bold text-gray-900 dark:text-white">{{ Math.max(...laboratory.performanceData) }}%</p>
              </div>
              <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p class="text-gray-500 dark:text-gray-400">Текущее</p>
                <p class="font-bold text-gray-900 dark:text-white">{{ laboratory.performanceData[laboratory.performanceData.length - 1] }}%</p>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Дополнительная информация -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold">Оборудование</h3>
            </template>
            <div class="p-6 space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400">Всего единиц оборудования</span>
                <span class="font-semibold">{{ laboratory.equipment }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400">Используется</span>
                <span class="font-semibold">{{ Math.round(laboratory.equipment * 0.8) }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400">Резерв</span>
                <span class="font-semibold">{{ Math.round(laboratory.equipment * 0.2) }}</span>
              </div>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold">Использование</h3>
            </template>
            <div class="p-6 space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400">Занято мест</span>
                <span class="font-semibold">{{ Math.round(laboratory.capacity * 0.75) }}/{{ laboratory.capacity }}</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  class="bg-blue-600 h-2 rounded-full" 
                  :style="{ width: '75%' }"
                ></div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400">Свободно</span>
                <span class="font-semibold">{{ Math.round(laboratory.capacity * 0.25) }}</span>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </template>
  </UDashboardPanel>

  <!-- Страница не найдена -->
  <UDashboardPanel v-else id="laboratory-not-found">
    <template #header>
      <UDashboardNavbar title="Лаборатория не найдена">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex items-center justify-center h-96">
        <div class="text-center">
          <UIcon name="i-lucide-alert-circle" class="size-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Лаборатория не найдена
          </h3>
          <p class="text-gray-500 dark:text-gray-400 mb-4">
            Лаборатория с ID {{ labId }} не существует
          </p>
          <UButton
            color="primary"
            @click="$router.push('/laboratories')"
          >
            Вернуться к списку
          </UButton>
        </div>
  </div>
    </template>
  </UDashboardPanel>
</template>