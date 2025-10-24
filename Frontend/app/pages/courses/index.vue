<script setup lang="ts">

// Типы для курсов
type CourseStatus = 'active' | 'upcoming' | 'completed'
type CourseLevel = 'beginner' | 'intermediate' | 'advanced'

interface Course {
  id: number
  title: string
  description: string
  instructor: string
  duration: string
  students: number
  status: CourseStatus
  startDate: string
  endDate: string
  level: CourseLevel
  category: string
}

// Моковые данные курсов
const courses = ref<Course[]>([
  {
    id: 1,
    title: 'Основы программирования',
    description: 'Введение в программирование на Python и JavaScript',
    instructor: 'Доц. Козлов Д.С.',
    duration: '12 недель',
    students: 45,
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    level: 'beginner',
    category: 'Программирование'
  },
  {
    id: 2,
    title: 'Квантовая физика',
    description: 'Теоретические основы квантовой механики',
    instructor: 'Проф. Иванов А.А.',
    duration: '16 недель',
    students: 28,
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-05-15',
    level: 'advanced',
    category: 'Физика'
  },
  {
    id: 3,
    title: 'Органическая химия',
    description: 'Структура и свойства органических соединений',
    instructor: 'Проф. Петрова М.В.',
    duration: '14 недель',
    students: 32,
    status: 'upcoming',
    startDate: '2024-03-01',
    endDate: '2024-06-15',
    level: 'intermediate',
    category: 'Химия'
  },
  {
    id: 4,
    title: 'Машинное обучение',
    description: 'Алгоритмы и методы машинного обучения',
    instructor: 'Доц. Сидоров К.Л.',
    duration: '10 недель',
    students: 38,
    status: 'completed',
    startDate: '2023-09-01',
    endDate: '2023-11-15',
    level: 'advanced',
    category: 'Искусственный интеллект'
  },
  {
    id: 5,
    title: 'Биоинформатика',
    description: 'Анализ биологических данных с помощью вычислительных методов',
    instructor: 'Доц. Волкова Е.Н.',
    duration: '8 недель',
    students: 24,
    status: 'active',
    startDate: '2024-01-08',
    endDate: '2024-03-01',
    level: 'intermediate',
    category: 'Биология'
  }
])

const statusColors: Record<CourseStatus, 'success' | 'info' | 'neutral'> = {
  active: 'success',
  upcoming: 'info',
  completed: 'neutral'
}

const statusLabels: Record<CourseStatus, string> = {
  active: 'Активный',
  upcoming: 'Предстоящий',
  completed: 'Завершен'
}

const levelColors: Record<CourseLevel, 'success' | 'info' | 'warning'> = {
  beginner: 'success',
  intermediate: 'info',
  advanced: 'warning'
}

const levelLabels: Record<CourseLevel, string> = {
  beginner: 'Начальный',
  intermediate: 'Средний',
  advanced: 'Продвинутый'
}
</script>

<template>
  <UDashboardPanel id="courses">
    <template #header>
      <UDashboardNavbar title="Курсы">
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
              <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <UIcon name="i-lucide-book-open" class="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Всего курсов</p>
                <p class="text-2xl font-bold">{{ courses.length }}</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <UIcon name="i-lucide-play-circle" class="size-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Активных</p>
                <p class="text-2xl font-bold">{{ courses.filter(c => c.status === 'active').length }}</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <UIcon name="i-lucide-clock" class="size-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Предстоящих</p>
                <p class="text-2xl font-bold">{{ courses.filter(c => c.status === 'upcoming').length }}</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <UIcon name="i-lucide-users" class="size-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Всего студентов</p>
                <p class="text-2xl font-bold">{{ courses.reduce((sum, c) => sum + c.students, 0) }}</p>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Список курсов -->
        <div class="space-y-4">
          <UCard
            v-for="course in courses"
            :key="course.id"
            class="hover:shadow-lg transition-shadow"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-lg font-semibold">{{ course.title }}</h3>
                  <UBadge
                    :color="statusColors[course.status as CourseStatus]"
                    variant="subtle"
                  >
                    {{ statusLabels[course.status as CourseStatus] }}
                  </UBadge>
                  <UBadge
                    :color="levelColors[course.level as CourseLevel]"
                    variant="outline"
                  >
                    {{ levelLabels[course.level as CourseLevel] }}
                  </UBadge>
                </div>

                <p class="text-sm text-muted mb-3">{{ course.description }}</p>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p class="text-muted">Преподаватель:</p>
                    <p class="font-medium">{{ course.instructor }}</p>
                  </div>
                  <div>
                    <p class="text-muted">Продолжительность:</p>
                    <p class="font-medium">{{ course.duration }}</p>
                  </div>
                  <div>
                    <p class="text-muted">Студентов:</p>
                    <p class="font-medium">{{ course.students }}</p>
                  </div>
                  <div>
                    <p class="text-muted">Категория:</p>
                    <p class="font-medium">{{ course.category }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-4 mt-4 text-sm text-muted">
                  <div class="flex items-center gap-1">
                    <UIcon name="i-lucide-calendar" class="size-4" />
                    <span>Начало: {{ new Date(course.startDate).toLocaleDateString('ru-RU') }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <UIcon name="i-lucide-calendar-check" class="size-4" />
                    <span>Окончание: {{ new Date(course.endDate).toLocaleDateString('ru-RU') }}</span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col gap-2 ml-4">
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
                <UButton
                  icon="i-lucide-users"
                  size="sm"
                  variant="ghost"
                  color="info"
                >
                  Студенты
                </UButton>
              </div>
            </div>
          </UCard>
        </div>

      </div>
    </template>
  </UDashboardPanel>
</template>
