<script setup lang="ts">
import { h } from 'vue'

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

// Получение ID группы из параметров маршрута
const route = useRoute()
const groupId = parseInt(route.params.id as string)

// Моковые данные групп (в реальном приложении это будет API запрос)
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

// Поиск группы по ID
const group = computed(() => {
  const foundGroup = groups.find(g => g.id === groupId)
  if (!foundGroup) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Группа не найдена'
    })
  }
  return foundGroup
})

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

// Моковые данные студентов группы
const students = ref([
  {
    id: 1,
    name: 'Алексей Студентов',
    email: 'alexey.student@university.ru',
    avatar: { src: 'https://i.pravatar.cc/128?u=student1' },
    status: 'active',
    joinDate: '2024-02-01'
  },
  {
    id: 2,
    name: 'Мария Ученикова',
    email: 'maria.student@university.ru',
    avatar: { src: 'https://i.pravatar.cc/128?u=student2' },
    status: 'active',
    joinDate: '2024-02-01'
  },
  {
    id: 3,
    name: 'Дмитрий Студент',
    email: 'dmitry.student@university.ru',
    avatar: { src: 'https://i.pravatar.cc/128?u=student3' },
    status: 'active',
    joinDate: '2024-02-05'
  }
])

const toast = useToast()
</script>

<template>
  <UDashboardPanel id="group-detail">
    <template #header>
      <UDashboardNavbar :title="group.name">
        <template #leading>
          <UDashboardSidebarCollapse />
          <UButton
            icon="i-lucide-arrow-left"
            variant="ghost"
            color="neutral"
            @click="$router.back()"
          >
            Назад
          </UButton>
        </template>

        <template #right>
          <UButton
            icon="i-lucide-edit"
            color="primary"
            variant="outline"
          >
            Редактировать
          </UButton>
          <UButton
            icon="i-lucide-users-plus"
            color="success"
          >
            Добавить студента
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-6">
        <!-- Информация о группе -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Основная информация -->
          <div class="lg:col-span-2">
            <UCard>
              <template #header>
                <div class="flex items-center justify-between">
                  <div>
                    <h2 class="text-xl font-semibold">{{ group.name }}</h2>
                    <p class="text-sm text-muted">{{ group.code }}</p>
                  </div>
                  <UBadge
                    :color="statusColors[group.status]"
                    variant="subtle"
                    size="lg"
                  >
                    {{ statusLabels[group.status] }}
                  </UBadge>
                </div>
              </template>

              <div class="space-y-6">
                <div>
                  <h3 class="text-sm font-medium text-muted mb-2">Описание</h3>
                  <p class="text-sm">{{ group.description }}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-4">
                    <div>
                      <h3 class="text-sm font-medium text-muted mb-3">Основная информация</h3>
                      <div class="space-y-3">
                        <div class="flex justify-between">
                          <span class="text-sm text-muted">Курс:</span>
                          <span class="text-sm font-medium">{{ group.course }}</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-sm text-muted">Преподаватель:</span>
                          <span class="text-sm font-medium">{{ group.instructor }}</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-sm text-muted">Студентов:</span>
                          <span class="text-sm font-medium">{{ group.studentsCount }}/{{ group.maxStudents }}</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-sm text-muted">Местоположение:</span>
                          <span class="text-sm font-medium">{{ group.location }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <div>
                      <h3 class="text-sm font-medium text-muted mb-3">Расписание и период</h3>
                      <div class="space-y-3">
                        <div class="flex justify-between">
                          <span class="text-sm text-muted">Расписание:</span>
                          <span class="text-sm font-medium">{{ group.schedule }}</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-sm text-muted">Начало:</span>
                          <span class="text-sm font-medium">{{ new Date(group.startDate).toLocaleDateString('ru-RU') }}</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-sm text-muted">Окончание:</span>
                          <span class="text-sm font-medium">{{ new Date(group.endDate).toLocaleDateString('ru-RU') }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </UCard>
          </div>

          <!-- Статистика -->
          <div class="space-y-4">
            <UCard>
              <template #header>
                <h3 class="text-lg font-semibold">Статистика</h3>
              </template>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-muted">Всего студентов:</span>
                  <span class="text-lg font-bold">{{ group.studentsCount }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-muted">Свободных мест:</span>
                  <span class="text-lg font-bold text-success">{{ group.maxStudents - group.studentsCount }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-muted">Заполненность:</span>
                  <span class="text-lg font-bold">{{ Math.round((group.studentsCount / group.maxStudents) * 100) }}%</span>
                </div>
              </div>
            </UCard>

            <UCard>
              <template #header>
                <h3 class="text-lg font-semibold">Быстрые действия</h3>
              </template>
              
              <div class="space-y-2">
                <UButton
                  icon="i-lucide-users"
                  variant="outline"
                  color="primary"
                  block
                >
                  Список студентов
                </UButton>
                <UButton
                  icon="i-lucide-calendar"
                  variant="outline"
                  color="info"
                  block
                >
                  Расписание
                </UButton>
                <UButton
                  icon="i-lucide-mail"
                  variant="outline"
                  color="success"
                  block
                >
                  Отправить уведомление
                </UButton>
                <UButton
                  icon="i-lucide-download"
                  variant="outline"
                  color="neutral"
                  block
                >
                  Экспорт данных
                </UButton>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Список студентов -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Студенты группы</h3>
              <UButton
                icon="i-lucide-plus"
                size="sm"
                color="primary"
              >
                Добавить студента
              </UButton>
            </div>
          </template>

          <div class="space-y-3">
            <div
              v-for="student in students"
              :key="student.id"
              class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div class="flex items-center gap-3">
                <UAvatar
                  :src="student.avatar.src"
                  size="md"
                />
                <div>
                  <h4 class="font-medium">{{ student.name }}</h4>
                  <p class="text-sm text-muted">{{ student.email }}</p>
                </div>
              </div>
              
              <div class="flex items-center gap-2">
                <span class="text-sm text-muted">
                  Присоединился: {{ new Date(student.joinDate).toLocaleDateString('ru-RU') }}
                </span>
                <UButton
                  icon="i-lucide-ellipsis-vertical"
                  variant="ghost"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
