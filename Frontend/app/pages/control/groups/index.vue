<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { h } from 'vue'

useHead({
  title: 'Группы'
})

definePageMeta({
  layout: 'control'
})

const UBadge = resolveComponent('UBadge')

// Типы для групп
type GroupStatus = 'active' | 'inactive' | 'archived'

interface Group {
  id: number
  name: string
  code: string
  description: string
  status: GroupStatus
  studentsCount: number
  maxStudents: number
  course: string
  instructor: string
  startDate: string
  endDate: string
  location: string
  schedule: string
}

// Моковые данные групп
const groups: Group[] = [
  {
    id: 1,
    name: 'Группа А-101',
    code: 'GRP-A101',
    description: 'Группа по программированию на Python',
    status: 'active',
    studentsCount: 25,
    maxStudents: 30,
    course: 'Основы программирования',
    instructor: 'Доц. Козлов Д.С.',
    startDate: '2024-02-01',
    endDate: '2024-06-30',
    location: 'Корпус А, аудитория 101',
    schedule: 'Пн, Ср, Пт 10:00-12:00'
  },
  {
    id: 2,
    name: 'Группа Б-202',
    code: 'GRP-B202',
    description: 'Группа по веб-разработке',
    status: 'active',
    studentsCount: 20,
    maxStudents: 25,
    course: 'Веб-разработка',
    instructor: 'Проф. Петрова М.В.',
    startDate: '2024-01-15',
    endDate: '2024-05-15',
    location: 'Корпус Б, аудитория 202',
    schedule: 'Вт, Чт 14:00-16:00'
  },
  {
    id: 3,
    name: 'Группа В-303',
    code: 'GRP-V303',
    description: 'Группа по машинному обучению',
    status: 'active',
    studentsCount: 18,
    maxStudents: 20,
    course: 'Машинное обучение',
    instructor: 'Доц. Сидоров К.Л.',
    startDate: '2024-03-01',
    endDate: '2024-07-01',
    location: 'Корпус В, аудитория 303',
    schedule: 'Пн, Ср 16:00-18:00'
  },
  {
    id: 4,
    name: 'Группа Г-404',
    code: 'GRP-G404',
    description: 'Группа по базам данных',
    status: 'inactive',
    studentsCount: 15,
    maxStudents: 20,
    course: 'Базы данных',
    instructor: 'Доц. Волкова Е.Н.',
    startDate: '2023-09-01',
    endDate: '2023-12-31',
    location: 'Корпус Г, аудитория 404',
    schedule: 'Вт, Чт 10:00-12:00'
  },
  {
    id: 5,
    name: 'Группа Д-505',
    code: 'GRP-D505',
    description: 'Группа по мобильной разработке',
    status: 'active',
    studentsCount: 22,
    maxStudents: 25,
    course: 'Мобильная разработка',
    instructor: 'Проф. Иванов А.А.',
    startDate: '2024-01-08',
    endDate: '2024-05-08',
    location: 'Корпус Д, аудитория 505',
    schedule: 'Пн, Ср, Пт 12:00-14:00'
  },
  {
    id: 6,
    name: 'Группа Е-606',
    code: 'GRP-E606',
    description: 'Группа по кибербезопасности',
    status: 'archived',
    studentsCount: 12,
    maxStudents: 15,
    course: 'Кибербезопасность',
    instructor: 'Доц. Морозов П.В.',
    startDate: '2023-10-01',
    endDate: '2024-01-31',
    location: 'Корпус Е, аудитория 606',
    schedule: 'Вт, Чт 18:00-20:00'
  }
]

const statusColors: Record<GroupStatus, 'success' | 'warning' | 'error'> = {
  active: 'success',
  inactive: 'warning',
  archived: 'error'
}

const statusLabels: Record<GroupStatus, string> = {
  active: 'Активна',
  inactive: 'Неактивна',
  archived: 'Архивная'
}

const toast = useToast()

// Фильтры
const statusFilter = ref('all')
const searchQuery = ref('')

// Виды отображения
type ViewMode = 'table' | 'cards' | 'list'
const viewMode = ref<ViewMode>('cards')

// Фильтрованные группы
const filteredGroups = computed(() => {
  let result = groups

  // Фильтр по статусу
  if (statusFilter.value !== 'all') {
    result = result.filter(group => group.status === statusFilter.value)
  }

  // Поиск
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(group => 
      group.name.toLowerCase().includes(query) ||
      group.code.toLowerCase().includes(query) ||
      group.course.toLowerCase().includes(query) ||
      group.instructor.toLowerCase().includes(query)
    )
  }

  return result
})

// Статистика
const stats = computed(() => ({
  total: groups.length,
  active: groups.filter(g => g.status === 'active').length,
  inactive: groups.filter(g => g.status === 'inactive').length,
  archived: groups.filter(g => g.status === 'archived').length,
  totalStudents: groups.reduce((sum, g) => sum + g.studentsCount, 0)
}))
</script>

<template>
  <UDashboardPanel id="customers">
    <template #header>
      <UDashboardNavbar title="Группы">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-6">
        <!-- Статистика -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <UIcon name="i-lucide-users" class="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Всего групп</p>
                <p class="text-2xl font-bold">{{ stats.total }}</p>
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
                <p class="text-2xl font-bold">{{ stats.active }}</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <UIcon name="i-lucide-pause-circle" class="size-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Неактивных</p>
                <p class="text-2xl font-bold">{{ stats.inactive }}</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-gray-100 dark:bg-gray-900/20 rounded-lg">
                <UIcon name="i-lucide-archive" class="size-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Архивных</p>
                <p class="text-2xl font-bold">{{ stats.archived }}</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <UIcon name="i-lucide-user-check" class="size-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Всего студентов</p>
                <p class="text-2xl font-bold">{{ stats.totalStudents }}</p>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Фильтры и переключатель вида -->
        <div class="flex flex-wrap items-center justify-between gap-4">
          <UInput
            v-model="searchQuery"
            class="max-w-sm"
            icon="i-lucide-search"
            placeholder="Поиск по группам..."
          />

          <div class="flex items-center gap-2">
            <USelect
              v-model="statusFilter"
              :items="[
                { label: 'Все группы', value: 'all' },
                { label: 'Активные', value: 'active' },
                { label: 'Неактивные', value: 'inactive' },
                { label: 'Архивные', value: 'archived' }
              ]"
              placeholder="Фильтр по статусу"
              class="min-w-32"
            />

             <!-- Переключатель вида отображения -->
             <div class="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
               <UButton
                 :color="viewMode === 'table' ? 'primary' : 'neutral'"
                 :variant="viewMode === 'table' ? 'solid' : 'ghost'"
                 size="sm"
                 icon="i-lucide-grid-3x3"
                 @click="viewMode = 'table'"
               />
               <UButton
                 :color="viewMode === 'cards' ? 'primary' : 'neutral'"
                 :variant="viewMode === 'cards' ? 'solid' : 'ghost'"
                 size="sm"
                 icon="i-lucide-table"
                 @click="viewMode = 'cards'"
               />
               <UButton
                 :color="viewMode === 'list' ? 'primary' : 'neutral'"
                 :variant="viewMode === 'list' ? 'solid' : 'ghost'"
                 size="sm"
                 icon="i-lucide-list"
                 @click="viewMode = 'list'"
               />
             </div>
          </div>
        </div>

        <!-- Вид: Таблица -->
        <div v-if="viewMode === 'table'" class="space-y-4">
          <!-- Группировка по строкам (максимум 11 групп в строке) -->
          <div 
            v-for="(row, rowIndex) in Math.ceil(filteredGroups.length / 11)" 
            :key="rowIndex"
            class="grid grid-cols-11 gap-2"
          >
            <UCard
              v-for="(group, groupIndex) in filteredGroups.slice(rowIndex * 11, (rowIndex + 1) * 11)"
              :key="group.id"
              class="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary"
              @click="$router.push(`/control/groups/${group.id}`)"
            >
              <div class="p-4 text-center min-h-[80px] flex items-center justify-center">
                <h3 class="text-sm font-medium leading-tight break-words">
                  {{ group.name }}
                </h3>
              </div>
            </UCard>
            
            <!-- Заполнение пустых ячеек для выравнивания -->
            <div
              v-for="n in 11 - filteredGroups.slice(rowIndex * 11, (rowIndex + 1) * 11).length"
              :key="`empty-${rowIndex}-${n}`"
              class="min-h-[80px]"
            />
          </div>
        </div>

        <!-- Вид: Карточки -->
        <div v-else-if="viewMode === 'cards'" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <UCard
            v-for="group in filteredGroups"
            :key="group.id"
            class="hover:shadow-lg transition-shadow"
          >
            <template #header>
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-lg font-semibold">{{ group.name }}</h3>
                  <p class="text-sm text-muted">{{ group.code }}</p>
                </div>
                <UBadge
                  :color="statusColors[group.status]"
                  variant="subtle"
                >
                  {{ statusLabels[group.status] }}
                </UBadge>
              </div>
            </template>

            <div class="space-y-4">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ group.description }}
              </p>

              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p class="text-muted">Курс:</p>
                  <p class="font-medium">{{ group.course }}</p>
                </div>
                <div>
                  <p class="text-muted">Преподаватель:</p>
                  <p class="font-medium">{{ group.instructor }}</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p class="text-muted">Студентов:</p>
                  <p class="font-medium">{{ group.studentsCount }}/{{ group.maxStudents }}</p>
                </div>
                <div>
                  <p class="text-muted">Местоположение:</p>
                  <p class="font-medium">{{ group.location }}</p>
                </div>
              </div>

              <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between text-sm">
                  <div>
                    <p class="text-muted">Расписание:</p>
                    <p class="font-medium">{{ group.schedule }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-muted">Период:</p>
                    <p class="font-medium">{{ new Date(group.startDate).toLocaleDateString('ru-RU') }} - {{ new Date(group.endDate).toLocaleDateString('ru-RU') }}</p>
                  </div>
                </div>
              </div>

               <div class="flex items-center justify-between pt-2">
                 <div class="flex gap-2">
                   <UButton
                     icon="i-lucide-eye"
                     size="sm"
                     variant="ghost"
                     color="primary"
                     @click="$router.push(`/control/groups/${group.id}`)"
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
                   <UButton
                     icon="i-lucide-users"
                     size="sm"
                     variant="ghost"
                     color="info"
                     @click="$router.push(`/control/groups/${group.id}/students`)"
                   >
                     Студенты
                   </UButton>
                 </div>
               </div>
            </div>
          </UCard>
        </div>

         <!-- Вид: Список -->
         <div v-else-if="viewMode === 'list'" class="overflow-x-auto">
           <UTable
             :data="filteredGroups"
             :columns="[
               { accessorKey: 'name', header: 'Название группы' },
               { 
                 accessorKey: 'status', 
                 header: 'Статус',
                 cell: ({ row }) => h(UBadge, {
                   color: statusColors[row.original.status],
                   variant: 'subtle'
                 }, () => statusLabels[row.original.status])
               },
               { accessorKey: 'course', header: 'Курс' },
               { accessorKey: 'instructor', header: 'Преподаватель' },
               { accessorKey: 'studentsCount', header: 'Студентов' },
               { accessorKey: 'location', header: 'Местоположение' },
               { accessorKey: 'schedule', header: 'Расписание' }
             ]"
             :ui="{
               base: 'table-fixed border-separate border-spacing-0',
               thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
               tbody: '[&>tr]:last:[&>td]:border-b-0',
               th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
               td: 'border-b border-default'
             }"
           />
         </div>

        <!-- Пустое состояние -->
        <UCard v-if="filteredGroups.length === 0" class="border-dashed border-2 border-gray-300 dark:border-gray-600">
          <div class="text-center py-8">
            <UIcon name="i-lucide-search-x" class="size-12 text-muted mx-auto mb-4" />
            <h3 class="text-lg font-medium mb-2">Группы не найдены</h3>
            <p class="text-muted mb-4">Попробуйте изменить фильтры или поисковый запрос</p>
            <UButton
              @click="searchQuery = ''; statusFilter = 'all'"
              color="primary"
              variant="outline"
            >
              Сбросить фильтры
            </UButton>
          </div>
        </UCard>

      </div>
    </template>
  </UDashboardPanel>
</template>
