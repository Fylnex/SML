<script setup lang="ts">

// Моковые данные модулей
const modules = ref([
  {
    id: 1,
    name: 'Модуль аутентификации',
    description: 'Система входа и регистрации пользователей',
    version: '2.1.0',
    status: 'active',
    category: 'Безопасность',
    dependencies: 3,
    lastUpdate: '2024-01-15',
    author: 'Команда разработки',
    size: '2.5 MB'
  },
  {
    id: 2,
    name: 'Модуль отчетов',
    description: 'Генерация и экспорт отчетов по лабораториям',
    version: '1.8.2',
    status: 'active',
    category: 'Аналитика',
    dependencies: 5,
    lastUpdate: '2024-01-12',
    author: 'Аналитическая команда',
    size: '4.2 MB'
  },
  {
    id: 3,
    name: 'Модуль уведомлений',
    description: 'Система push-уведомлений и email-рассылок',
    version: '3.0.1',
    status: 'maintenance',
    category: 'Коммуникации',
    dependencies: 2,
    lastUpdate: '2024-01-10',
    author: 'Команда коммуникаций',
    size: '1.8 MB'
  },
  {
    id: 4,
    name: 'Модуль календаря',
    description: 'Планирование занятий и резервирование лабораторий',
    version: '1.5.3',
    status: 'active',
    category: 'Планирование',
    dependencies: 4,
    lastUpdate: '2024-01-08',
    author: 'Команда планирования',
    size: '3.1 MB'
  },
  {
    id: 5,
    name: 'Модуль тестирования',
    description: 'Проведение онлайн-тестов и экзаменов',
    version: '2.0.0',
    status: 'inactive',
    category: 'Образование',
    dependencies: 6,
    lastUpdate: '2023-12-20',
    author: 'Образовательная команда',
    size: '5.7 MB'
  },
  {
    id: 6,
    name: 'Модуль аналитики',
    description: 'Сбор и анализ данных об использовании системы',
    version: '1.2.1',
    status: 'active',
    category: 'Аналитика',
    dependencies: 2,
    lastUpdate: '2024-01-05',
    author: 'Команда аналитики',
    size: '2.9 MB'
  }
])

const statusColors: Record<string, 'success' | 'warning' | 'error'> = {
  active: 'success',
  maintenance: 'warning',
  inactive: 'error'
}

const statusLabels: Record<string, string> = {
  active: 'Активен',
  maintenance: 'Обслуживание',
  inactive: 'Неактивен'
}

const categoryColors: Record<string, 'error' | 'info' | 'success' | 'primary' | 'warning'> = {
  'Безопасность': 'error',
  'Аналитика': 'info',
  'Коммуникации': 'success',
  'Планирование': 'primary',
  'Образование': 'warning'
}
</script>

<template>
  <UDashboardPanel id="modules">
    <template #header>
      <UDashboardNavbar title="Модули">
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
              <div class="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <UIcon name="i-lucide-puzzle" class="size-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Всего модулей</p>
                <p class="text-2xl font-bold">{{ modules.length }}</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <UIcon name="i-lucide-check-circle" class="size-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Активных</p>
                <p class="text-2xl font-bold">{{ modules.filter(m => m.status === 'active').length }}</p>
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
                <p class="text-2xl font-bold">{{ modules.filter(m => m.status === 'maintenance').length }}</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <UIcon name="i-lucide-link" class="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Зависимостей</p>
                <p class="text-2xl font-bold">{{ modules.reduce((sum, m) => sum + m.dependencies, 0) }}</p>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Список модулей -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UCard
            v-for="module in modules"
            :key="module.id"
            class="hover:shadow-lg transition-shadow"
          >
            <template #header>
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-lg font-semibold">{{ module.name }}</h3>
                  <p class="text-sm text-muted">v{{ module.version }}</p>
                </div>
                <div class="flex flex-col gap-2">
                  <UBadge
                    :color="statusColors[module.status]"
                    variant="subtle"
                  >
                    {{ statusLabels[module.status] }}
                  </UBadge>
                  <UBadge
                    :color="categoryColors[module.category]"
                    variant="outline"
                  >
                    {{ module.category }}
                  </UBadge>
                </div>
              </div>
            </template>

            <div class="space-y-4">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ module.description }}
              </p>

              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p class="text-muted">Размер:</p>
                  <p class="font-medium">{{ module.size }}</p>
                </div>
                <div>
                  <p class="text-muted">Зависимости:</p>
                  <p class="font-medium">{{ module.dependencies }}</p>
                </div>
              </div>

              <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p class="text-sm text-muted">Автор:</p>
                <p class="font-medium">{{ module.author }}</p>
              </div>

              <div class="flex items-center justify-between pt-2">
                <div class="text-xs text-muted">
                  Обновлен: {{ new Date(module.lastUpdate).toLocaleDateString('ru-RU') }}
                </div>
                <div class="flex gap-2">
                  <UButton
                    icon="i-lucide-settings"
                    size="sm"
                    variant="ghost"
                    color="primary"
                  >
                    Настройки
                  </UButton>
                  <UButton
                    icon="i-lucide-download"
                    size="sm"
                    variant="ghost"
                    color="neutral"
                  >
                    Обновить
                  </UButton>
                </div>
              </div>
            </div>
          </UCard>
        </div>

      </div>
    </template>
  </UDashboardPanel>
</template>
