<script setup lang="ts">
import type { Laboratory, LaboratoryStatus } from '~/types'

defineProps<{
  collapsed?: boolean
}>()

// Моковые данные лабораторий
const laboratories: Laboratory[] = [
  {
    id: 1,
    name: 'Лаборатория Docker',
    description: 'Работа с контейнерами Docker',
    status: 'active',
    capacity: 20,
    equipment: 15,
    location: 'Корпус А, ауд. 101',
    supervisor: 'Иванов А.А.',
    lastActivity: '2024-01-15',
    performanceData: [85, 90, 88, 92, 87]
  },
  {
    id: 2,
    name: 'Лаборатория Kubernetes',
    description: 'Оркестрация контейнеров',
    status: 'active',
    capacity: 15,
    equipment: 12,
    location: 'Корпус А, ауд. 102',
    supervisor: 'Петрова М.В.',
    lastActivity: '2024-01-15',
    performanceData: [78, 82, 85, 80, 83]
  },
  {
    id: 3,
    name: 'Лаборатория CI/CD',
    description: 'Непрерывная интеграция и доставка',
    status: 'active',
    capacity: 25,
    equipment: 20,
    location: 'Корпус Б, ауд. 201',
    supervisor: 'Сидоров К.Л.',
    lastActivity: '2024-01-15',
    performanceData: [90, 88, 92, 89, 91]
  },
  {
    id: 4,
    name: 'Лаборатория мониторинга',
    description: 'Системы мониторинга и логирования',
    status: 'maintenance',
    capacity: 18,
    equipment: 15,
    location: 'Корпус Б, ауд. 202',
    supervisor: 'Волкова Е.Н.',
    lastActivity: '2024-01-10',
    performanceData: [70, 75, 72, 73, 74]
  },
  {
    id: 5,
    name: 'Лаборатория безопасности',
    description: 'Тестирование безопасности',
    status: 'active',
    capacity: 12,
    equipment: 10,
    location: 'Корпус В, ауд. 301',
    supervisor: 'Козлов Д.С.',
    lastActivity: '2024-01-15',
    performanceData: [88, 85, 90, 87, 89]
  }
]

const statusColors: Record<LaboratoryStatus, 'success' | 'warning' | 'error'> = {
  active: 'success',
  maintenance: 'warning',
  inactive: 'error'
}

const statusLabels: Record<LaboratoryStatus, string> = {
  active: 'Активна',
  maintenance: 'Обслуживание',
  inactive: 'Неактивна'
}

const router = useRouter()
const searchQuery = ref('')

// Фильтрованные лаборатории
const filteredLaboratories = computed(() => {
  if (!searchQuery.value.trim()) {
    return laboratories
  }
  
  const query = searchQuery.value.toLowerCase()
  return laboratories.filter(lab => 
    lab.name.toLowerCase().includes(query) ||
    lab.description.toLowerCase().includes(query) ||
    lab.supervisor.toLowerCase().includes(query)
  )
})

const selectLaboratory = (laboratory: Laboratory) => {
  router.push(`/control/laboratories/${laboratory.id}`)
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Поиск -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <UInput
        v-model="searchQuery"
        :placeholder="collapsed ? 'Поиск...' : 'Поиск лабораторий...'"
        icon="i-lucide-search"
        size="sm"
        class="w-full"
      />
    </div>

    <!-- Список лабораторий -->
    <div class="flex-1 overflow-y-auto">
      <div class="p-2 space-y-1">
        <UButton
          v-for="lab in filteredLaboratories"
          :key="lab.id"
          :label="collapsed ? lab.name.substring(0, 3) : lab.name"
          :color="statusColors[lab.status]"
          variant="ghost"
          size="sm"
          block
          class="justify-start"
          @click="selectLaboratory(lab)"
        >
          <template #leading>
            <UIcon 
              :name="lab.status === 'active' ? 'i-lucide-flask-conical' : lab.status === 'maintenance' ? 'i-lucide-wrench' : 'i-lucide-x-circle'" 
              class="size-4"
            />
          </template>
        </UButton>
        
        <!-- Сообщение если ничего не найдено -->
        <div v-if="filteredLaboratories.length === 0" class="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <UIcon name="i-lucide-search-x" class="size-6 mx-auto mb-2" />
          <p>Лаборатории не найдены</p>
        </div>
      </div>
    </div>
  </div>
</template>

