<script setup lang="ts">

// Типы для лабораторий
type LaboratoryStatus = 'active' | 'maintenance' | 'inactive'

// Моковые данные лабораторий
const laboratories = ref([
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
])

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
      <div class="space-y-6">
        <!-- Статистика -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <UIcon name="i-lucide-flask-conical" class="size-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Всего лабораторий</p>
                <p class="text-2xl font-bold">{{ laboratories.length }}</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <UIcon name="i-lucide-activity" class="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Активных</p>
                <p class="text-2xl font-bold">{{ laboratories.filter(l => l.status === 'active').length }}</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <UIcon name="i-lucide-wrench" class="size-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p class="text-sm text-muted">На обслуживании</p>
                <p class="text-2xl font-bold">{{ laboratories.filter(l => l.status === 'maintenance').length }}</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <UIcon name="i-lucide-users" class="size-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Общая вместимость</p>
                <p class="text-2xl font-bold">{{ laboratories.reduce((sum, l) => sum + l.capacity, 0) }}</p>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Список лабораторий -->
        <div class="space-y-4">
          <UCard
            v-for="lab in laboratories"
            :key="lab.id"
            class="hover:shadow-lg transition-shadow"
          >
            <div class="flex items-center justify-between p-6">
              <!-- Левая часть - описание лаборатории -->
              <div class="flex-1 pr-6">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">{{ lab.name }}</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ lab.location }}</p>
                    <p class="text-gray-600 dark:text-gray-300 mb-3">{{ lab.description }}</p>
                  </div>
                  <UBadge
                    :color="statusColors[lab.status as LaboratoryStatus]"
                    variant="subtle"
                    class="ml-4"
                  >
                    {{ statusLabels[lab.status as LaboratoryStatus] }}
                  </UBadge>
                </div>

                <div class="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p class="text-gray-500 dark:text-gray-400">Вместимость:</p>
                    <p class="font-medium text-gray-900 dark:text-white">{{ lab.capacity }} мест</p>
                  </div>
                  <div>
                    <p class="text-gray-500 dark:text-gray-400">Оборудование:</p>
                    <p class="font-medium text-gray-900 dark:text-white">{{ lab.equipment }} единиц</p>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Руководитель:</p>
                    <p class="font-medium text-gray-900 dark:text-white">{{ lab.supervisor }}</p>
                  </div>
                  <div class="flex gap-2">
                    <UButton
                      icon="i-lucide-eye"
                      size="sm"
                      variant="ghost"
                      color="primary"
                    >
                      Просмотр
                    </UButton>
                    <UButton
                      icon="i-lucide-edit"
                      size="sm"
                      variant="ghost"
                      color="neutral"
                    >
                      Редактировать
                    </UButton>
                  </div>
                </div>
              </div>

              <!-- Правая часть - график производительности -->
              <div class="w-80 h-40">
                <div class="h-full bg-gray-900 dark:bg-gray-950 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-3">
                    <h4 class="text-sm font-medium text-white">Использование ресурсов</h4>
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span class="text-xs text-gray-400">Производительность</span>
                    </div>
                  </div>
                  
                  <!-- График в стиле системного мониторинга -->
                  <div class="relative h-24 w-full">
                    <svg class="w-full h-full" viewBox="0 0 300 96">
                      <!-- Сетка -->
                      <defs>
                        <pattern id="grid-{{ lab.id }}" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" stroke-width="0.5"/>
                        </pattern>
                        <linearGradient id="areaGradient-{{ lab.id }}" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" :style="{ stopColor: statusColors[lab.status as LaboratoryStatus] === 'success' ? '#10b981' : statusColors[lab.status as LaboratoryStatus] === 'warning' ? '#f59e0b' : '#ef4444', stopOpacity: 0.4 }" />
                          <stop offset="100%" :style="{ stopColor: statusColors[lab.status as LaboratoryStatus] === 'success' ? '#10b981' : statusColors[lab.status as LaboratoryStatus] === 'warning' ? '#f59e0b' : '#ef4444', stopOpacity: 0.1 }" />
                        </linearGradient>
                      </defs>
                      
                      <!-- Фон с сеткой -->
                      <rect width="300" height="96" fill="url(#grid-{{ lab.id }})" />
                      
                      <!-- Y-axis labels -->
                      <g class="text-xs fill-gray-500">
                        <text x="5" y="15" class="text-xs fill-gray-500">100</text>
                        <text x="5" y="35" class="text-xs fill-gray-500">75</text>
                        <text x="5" y="55" class="text-xs fill-gray-500">50</text>
                        <text x="5" y="75" class="text-xs fill-gray-500">25</text>
                        <text x="5" y="95" class="text-xs fill-gray-500">0</text>
                      </g>
                      
                      <!-- Область под линией -->
                      <path
                        :d="`M 0,${96 - (getChartData(lab.performanceData)[0].y * 0.8)} ${getChartData(lab.performanceData).map((point, index) => `L ${(index * 300) / (lab.performanceData.length - 1)},${96 - (point.y * 0.8)}`).join(' ')} L 300,96 L 0,96 Z`"
                        fill="url(#areaGradient-{{ lab.id }})"
                      />
                      
                      <!-- Линия графика -->
                      <path
                        :d="`M 0,${96 - (getChartData(lab.performanceData)[0].y * 0.8)} ${getChartData(lab.performanceData).map((point, index) => `L ${(index * 300) / (lab.performanceData.length - 1)},${96 - (point.y * 0.8)}`).join(' ')}`"
                        :stroke="statusColors[lab.status as LaboratoryStatus] === 'success' ? '#10b981' : statusColors[lab.status as LaboratoryStatus] === 'warning' ? '#f59e0b' : '#ef4444'"
                        stroke-width="1.5"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  
                  <!-- Статистика -->
                  <div class="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Среднее: {{ Math.round(lab.performanceData.reduce((a, b) => a + b, 0) / lab.performanceData.length) }}%</span>
                    <span>Макс: {{ Math.max(...lab.performanceData) }}%</span>
                    <span>Текущее: {{ lab.performanceData[lab.performanceData.length - 1] }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>

      </div>
    </template>
  </UDashboardPanel>
</template>
