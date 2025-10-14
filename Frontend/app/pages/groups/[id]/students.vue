<script setup lang="ts">
import { h } from 'vue'

// Типы для студентов
interface Student {
  id: number
  name: string
  email: string
  avatar: { src: string }
  status: 'active' | 'inactive' | 'suspended'
  joinDate: string
  studentId: string
  phone?: string
  notes?: string
}

// Типы для групп
interface Group {
  id: number
  name: string
  code: string
  description: string
  status: 'active' | 'inactive' | 'archived'
  studentsCount: number
  maxStudents: number
  course: string
  instructor: string
  startDate: string
  endDate: string
  location: string
  schedule: string
}

// Получение ID группы из параметров маршрута
const route = useRoute()
const groupId = parseInt(route.params.id as string)

// Моковые данные группы
const group: Group = {
  id: groupId,
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
}

// Моковые данные студентов
const students = ref<Student[]>([
  {
    id: 1,
    name: 'Алексей Студентов',
    email: 'alexey.student@university.ru',
    avatar: { src: 'https://i.pravatar.cc/128?u=student1' },
    status: 'active',
    joinDate: '2024-02-01',
    studentId: 'STU-001',
    phone: '+7 (999) 123-45-67',
    notes: 'Отличная успеваемость'
  },
  {
    id: 2,
    name: 'Мария Ученикова',
    email: 'maria.student@university.ru',
    avatar: { src: 'https://i.pravatar.cc/128?u=student2' },
    status: 'active',
    joinDate: '2024-02-01',
    studentId: 'STU-002',
    phone: '+7 (999) 234-56-78',
    notes: 'Активный участник дискуссий'
  },
  {
    id: 3,
    name: 'Дмитрий Студент',
    email: 'dmitry.student@university.ru',
    avatar: { src: 'https://i.pravatar.cc/128?u=student3' },
    status: 'active',
    joinDate: '2024-02-05',
    studentId: 'STU-003',
    phone: '+7 (999) 345-67-89',
    notes: 'Требует дополнительной помощи'
  },
  {
    id: 4,
    name: 'Анна Ученица',
    email: 'anna.student@university.ru',
    avatar: { src: 'https://i.pravatar.cc/128?u=student4' },
    status: 'inactive',
    joinDate: '2024-02-10',
    studentId: 'STU-004',
    phone: '+7 (999) 456-78-90',
    notes: 'Временно приостановила обучение'
  },
  {
    id: 5,
    name: 'Сергей Студент',
    email: 'sergey.student@university.ru',
    avatar: { src: 'https://i.pravatar.cc/128?u=student5' },
    status: 'active',
    joinDate: '2024-02-15',
    studentId: 'STU-005',
    phone: '+7 (999) 567-89-01',
    notes: 'Лидер группы'
  }
])

const statusColors: Record<Student['status'], 'success' | 'warning' | 'error'> = {
  active: 'success',
  inactive: 'warning',
  suspended: 'error'
}

const statusLabels: Record<Student['status'], string> = {
  active: 'Активен',
  inactive: 'Неактивен',
  suspended: 'Отстранен'
}

// Фильтры и поиск
const searchQuery = ref('')
const statusFilter = ref('all')
const sortBy = ref<'name' | 'joinDate' | 'status'>('name')
const sortOrder = ref<'asc' | 'desc'>('asc')

// Фильтрованные и отсортированные студенты
const filteredStudents = computed(() => {
  let result = students.value

  // Фильтр по статусу
  if (statusFilter.value !== 'all') {
    result = result.filter(student => student.status === statusFilter.value)
  }

  // Поиск
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(student => 
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.studentId.toLowerCase().includes(query)
    )
  }

  // Сортировка
  result.sort((a, b) => {
    let aValue: any, bValue: any
    
    switch (sortBy.value) {
      case 'name':
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
        break
      case 'joinDate':
        aValue = new Date(a.joinDate)
        bValue = new Date(b.joinDate)
        break
      case 'status':
        aValue = a.status
        bValue = b.status
        break
    }

    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return result
})

// Статистика
const stats = computed(() => ({
  total: students.value.length,
  active: students.value.filter(s => s.status === 'active').length,
  inactive: students.value.filter(s => s.status === 'inactive').length,
  suspended: students.value.filter(s => s.status === 'suspended').length
}))

const toast = useToast()

// Действия со студентами
const removeStudent = (studentId: number) => {
  const student = students.value.find(s => s.id === studentId)
  if (student) {
    students.value = students.value.filter(s => s.id !== studentId)
    toast.add({
      title: 'Студент удален',
      description: `${student.name} удален из группы`,
      color: 'success'
    })
  }
}

const toggleStudentStatus = (studentId: number) => {
  const student = students.value.find(s => s.id === studentId)
  if (student) {
    student.status = student.status === 'active' ? 'inactive' : 'active'
    toast.add({
      title: 'Статус изменен',
      description: `Статус ${student.name} изменен на ${statusLabels[student.status]}`,
      color: 'success'
    })
  }
}
</script>

<template>
  <UDashboardPanel id="group-students">
    <template #header>
      <UDashboardNavbar>
        <template #leading>
          <UDashboardSidebarCollapse />
          <nav class="flex items-center space-x-2 text-sm">
            <NuxtLink 
              to="/groups" 
              class="text-primary hover:underline"
            >
              Группы
            </NuxtLink>
            <UIcon name="i-lucide-chevron-right" class="size-4 text-muted" />
            <NuxtLink 
              :to="`/groups/${group.id}`" 
              class="text-primary hover:underline"
            >
              {{ group.name }}
            </NuxtLink>
            <UIcon name="i-lucide-chevron-right" class="size-4 text-muted" />
            <span class="text-muted">Студенты</span>
          </nav>
        </template>

        <template #right>
          <UButton
            icon="i-lucide-user-plus"
            color="primary"
          >
            Добавить студента
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-6">
        <!-- Информация о группе -->
        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-semibold">{{ group.name }}</h2>
              <p class="text-sm text-muted">{{ group.course }} • {{ group.instructor }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-muted">Студентов в группе</p>
              <p class="text-2xl font-bold">{{ group.studentsCount }}/{{ group.maxStudents }}</p>
            </div>
          </div>
        </UCard>

        <!-- Статистика -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <UIcon name="i-lucide-users" class="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Всего студентов</p>
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
              <div class="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <UIcon name="i-lucide-x-circle" class="size-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Отстраненных</p>
                <p class="text-2xl font-bold">{{ stats.suspended }}</p>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Фильтры и поиск -->
        <div class="flex flex-wrap items-center justify-between gap-4">
          <UInput
            v-model="searchQuery"
            class="max-w-sm"
            icon="i-lucide-search"
            placeholder="Поиск студентов..."
          />

          <div class="flex items-center gap-2">
            <USelect
              v-model="statusFilter"
              :options="[
                { label: 'Все студенты', value: 'all' },
                { label: 'Активные', value: 'active' },
                { label: 'Неактивные', value: 'inactive' },
                { label: 'Отстраненные', value: 'suspended' }
              ]"
              placeholder="Фильтр по статусу"
              class="min-w-32"
            />

            <USelect
              v-model="sortBy"
              :options="[
                { label: 'По имени', value: 'name' },
                { label: 'По дате вступления', value: 'joinDate' },
                { label: 'По статусу', value: 'status' }
              ]"
              placeholder="Сортировка"
              class="min-w-32"
            />

            <UButton
              :icon="sortOrder === 'asc' ? 'i-lucide-arrow-up' : 'i-lucide-arrow-down'"
              variant="outline"
              size="sm"
              @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
            />
          </div>
        </div>

        <!-- Таблица студентов -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Список студентов</h3>
              <div class="flex items-center gap-2">
                <span class="text-sm text-muted">Всего: {{ filteredStudents.length }}</span>
              </div>
            </div>
          </template>

          <div class="overflow-x-auto">
            <UTable
              :data="filteredStudents"
              :columns="[
                {
                  key: 'avatar',
                  id: 'avatar',
                  label: '',
                  class: 'w-12'
                },
                {
                  key: 'name',
                  id: 'name',
                  label: 'Студент'
                },
                {
                  key: 'studentId',
                  id: 'studentId',
                  label: 'ID студента'
                },
                {
                  key: 'email',
                  id: 'email',
                  label: 'Email'
                },
                {
                  key: 'phone',
                  id: 'phone',
                  label: 'Телефон'
                },
                {
                  key: 'status',
                  id: 'status',
                  label: 'Статус'
                },
                {
                  key: 'joinDate',
                  id: 'joinDate',
                  label: 'Дата вступления'
                },
                {
                  key: 'actions',
                  id: 'actions',
                  label: 'Действия',
                  class: 'w-32'
                }
              ]"
              :ui="{
                base: 'table-fixed border-separate border-spacing-0',
                thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
                tbody: '[&>tr]:last:[&>td]:border-b-0',
                th: 'py-3 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r text-left',
                td: 'border-b border-default py-3'
              }"
            >
              <template #avatar-data="{ row }">
                <UAvatar
                  :src="row.avatar.src"
                  size="sm"
                />
              </template>

              <template #name-data="{ row }">
                <div>
                  <div class="font-medium">{{ row.name }}</div>
                  <div v-if="row.notes" class="text-xs text-muted mt-1">{{ row.notes }}</div>
                </div>
              </template>

              <template #studentId-data="{ row }">
                <span class="font-mono text-sm">{{ row.studentId }}</span>
              </template>

              <template #email-data="{ row }">
                <a 
                  :href="`mailto:${row.email}`" 
                  class="text-primary hover:underline text-sm"
                >
                  {{ row.email }}
                </a>
              </template>

              <template #phone-data="{ row }">
                <span v-if="row.phone" class="text-sm">{{ row.phone }}</span>
                <span v-else class="text-muted text-sm">—</span>
              </template>

              <template #status-data="{ row }">
                <UBadge
                  :color="statusColors[row.status]"
                  variant="subtle"
                >
                  {{ statusLabels[row.status] }}
                </UBadge>
              </template>

              <template #joinDate-data="{ row }">
                <span class="text-sm">{{ new Date(row.joinDate).toLocaleDateString('ru-RU') }}</span>
              </template>

              <template #actions-data="{ row }">
                <div class="flex items-center gap-1">
                  <UButton
                    icon="i-lucide-mail"
                    variant="ghost"
                    size="sm"
                    color="primary"
                    @click="() => {}"
                  />
                  <UButton
                    icon="i-lucide-edit"
                    variant="ghost"
                    size="sm"
                    color="neutral"
                    @click="() => {}"
                  />
                  <UDropdown :items="[
                    [{
                      label: row.status === 'active' ? 'Деактивировать' : 'Активировать',
                      icon: row.status === 'active' ? 'i-lucide-pause' : 'i-lucide-play',
                      click: () => toggleStudentStatus(row.id)
                    }],
                    [{
                      label: 'Удалить из группы',
                      icon: 'i-lucide-trash-2',
                      click: () => removeStudent(row.id)
                    }]
                  ]">
                    <UButton
                      icon="i-lucide-ellipsis-vertical"
                      variant="ghost"
                      size="sm"
                    />
                  </UDropdown>
                </div>
              </template>
            </UTable>
          </div>
        </UCard>

        <!-- Пустое состояние -->
        <UCard v-if="filteredStudents.length === 0" class="border-dashed border-2 border-gray-300 dark:border-gray-600">
          <div class="text-center py-8">
            <UIcon name="i-lucide-search-x" class="size-12 text-muted mx-auto mb-4" />
            <h3 class="text-lg font-medium mb-2">Студенты не найдены</h3>
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
