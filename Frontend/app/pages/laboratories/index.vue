<script setup lang="ts">
useHead({
  title: 'Лаборатории'
})

definePageMeta({
  layout: 'default'
})

// Моковые данные лабораторий
const laboratories = ref([
  {
    id: 1,
    name: 'Лаборатория физики',
    description: 'Исследования в области квантовой физики и материаловедения',
    status: 'available',
    capacity: 20,
    equipment: 15,
    location: 'Корпус А, 3 этаж',
    supervisor: 'Проф. Иванов А.А.'
  },
  {
    id: 2,
    name: 'Лаборатория химии',
    description: 'Органическая и неорганическая химия, биохимия',
    status: 'available',
    capacity: 25,
    equipment: 18,
    location: 'Корпус Б, 2 этаж',
    supervisor: 'Проф. Петрова М.В.'
  },
  {
    id: 3,
    name: 'Лаборатория биологии',
    description: 'Молекулярная биология и генетика',
    status: 'maintenance',
    capacity: 15,
    equipment: 12,
    location: 'Корпус В, 1 этаж',
    supervisor: 'Доц. Сидоров К.Л.'
  },
  {
    id: 4,
    name: 'Лаборатория информатики',
    description: 'Программирование, ИИ и машинное обучение',
    status: 'available',
    capacity: 30,
    equipment: 25,
    location: 'Корпус Г, 4 этаж',
    supervisor: 'Проф. Козлов Д.С.'
  },
  {
    id: 5,
    name: 'Лаборатория робототехники',
    description: 'Разработка и тестирование роботизированных систем',
    status: 'occupied',
    capacity: 12,
    equipment: 8,
    location: 'Корпус Д, 2 этаж',
    supervisor: 'Доц. Волкова Е.Н.'
  }
])

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'success'
    case 'occupied':
      return 'warning'
    case 'maintenance':
      return 'neutral'
    default:
      return 'neutral'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'available':
      return 'Доступна'
    case 'occupied':
      return 'Занята'
    case 'maintenance':
      return 'Техобслуживание'
    default:
      return 'Неизвестно'
  }
}

const canReserve = (lab: any) => {
  return lab.status === 'available'
}
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Лаборатории
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Просмотр и бронирование лабораторных помещений
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="lab in laboratories"
        :key="lab.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
      >
        <!-- Заголовок и статус -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {{ lab.name }}
            </h3>
          </div>
          <UBadge :color="getStatusColor(lab.status)" variant="subtle" size="lg">
            {{ getStatusLabel(lab.status) }}
          </UBadge>
        </div>

        <!-- Описание -->
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {{ lab.description }}
        </p>

        <!-- Детали лаборатории -->
        <div class="space-y-3 mb-4">
          <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <UIcon name="i-lucide-users" class="size-4" />
            <span>Вместимость: {{ lab.capacity }} человек</span>
          </div>

          <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <UIcon name="i-lucide-wrench" class="size-4" />
            <span>Оборудование: {{ lab.equipment }} единиц</span>
          </div>

          <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <UIcon name="i-lucide-map-pin" class="size-4" />
            <span>{{ lab.location }}</span>
          </div>

          <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <UIcon name="i-lucide-user-check" class="size-4" />
            <span>{{ lab.supervisor }}</span>
          </div>
        </div>

        <!-- Кнопки действий -->
        <div class="flex gap-2">
          <UButton
            v-if="canReserve(lab)"
            color="primary"
            variant="solid"
            block
            size="lg"
            icon="i-lucide-calendar"
          >
            Забронировать
          </UButton>

          <UButton
            v-else
            color="neutral"
            variant="outline"
            block
            size="lg"
            :disabled="true"
          >
            Недоступно
          </UButton>

          <UButton
            color="neutral"
            variant="outline"
            size="lg"
            icon="i-lucide-info"
            square
          />
        </div>
      </div>
    </div>

    <!-- Пустое состояние, если нет лабораторий -->
    <div v-if="laboratories.length === 0" class="text-center py-16">
      <UIcon name="i-lucide-flask-conical" class="size-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Нет доступных лабораторий
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        Все лаборатории будут отображаться здесь
      </p>
    </div>
  </div>
</template>

