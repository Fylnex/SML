<script setup lang="ts">
const { isNotificationsSlideoverOpen } = useDashboard()

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
    lastActivity: '2024-01-15'
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
    lastActivity: '2024-01-14'
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
    lastActivity: '2024-01-10'
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
    lastActivity: '2024-01-16'
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
    lastActivity: '2024-01-05'
  }
])

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
      <UDashboardNavbar title="Лаборатории" :ui="{ right: 'gap-3' }">
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

          <UButton
            icon="i-lucide-plus"
            size="md"
            class="rounded-full"
          >
            Добавить лабораторию
          </UButton>
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
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <UCard
            v-for="lab in laboratories"
            :key="lab.id"
            class="hover:shadow-lg transition-shadow"
          >
            <template #header>
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-lg font-semibold">{{ lab.name }}</h3>
                  <p class="text-sm text-muted">{{ lab.location }}</p>
                </div>
                <UBadge
                  :color="statusColors[lab.status as LaboratoryStatus]"
                  variant="subtle"
                >
                  {{ statusLabels[lab.status as LaboratoryStatus] }}
                </UBadge>
              </div>
            </template>

            <div class="space-y-4">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ lab.description }}
              </p>

              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p class="text-muted">Вместимость:</p>
                  <p class="font-medium">{{ lab.capacity }} мест</p>
                </div>
                <div>
                  <p class="text-muted">Оборудование:</p>
                  <p class="font-medium">{{ lab.equipment }} единиц</p>
                </div>
              </div>

              <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p class="text-sm text-muted">Руководитель:</p>
                <p class="font-medium">{{ lab.supervisor }}</p>
              </div>

              <div class="flex items-center justify-between pt-2">
                <div class="text-xs text-muted">
                  Последняя активность: {{ new Date(lab.lastActivity).toLocaleDateString('ru-RU') }}
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
          </UCard>
        </div>

        <!-- Пустое состояние для добавления новой лаборатории -->
        <UCard class="border-dashed border-2 border-gray-300 dark:border-gray-600 hover:border-primary transition-colors">
          <div class="text-center py-8">
            <UIcon name="i-lucide-plus-circle" class="size-12 text-muted mx-auto mb-4" />
            <h3 class="text-lg font-medium mb-2">Добавить новую лабораторию</h3>
            <p class="text-muted mb-4">Создайте новую лабораторию для проведения исследований</p>
            <UButton
              icon="i-lucide-plus"
              color="primary"
              variant="outline"
            >
              Создать лабораторию
            </UButton>
          </div>
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
