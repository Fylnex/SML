<script setup lang="ts">
import type { Course, CourseStatus } from '~/types'

const route = useRoute()

// Моковые данные курсов
const courses: Course[] = [
  {
    id: 1,
    name: 'Основы программирования',
    description: 'Введение в программирование на Python',
    status: 'active',
    duration: 40,
    students: 25,
    instructor: 'Проф. Иванов А.А.',
    startDate: '2024-02-01',
    endDate: '2024-06-30',
    difficulty: 'beginner',
    progress: 75
  },
  {
    id: 2,
    name: 'Веб-разработка',
    description: 'Создание современных веб-приложений',
    status: 'active',
    duration: 60,
    students: 20,
    instructor: 'Проф. Петрова М.В.',
    startDate: '2024-01-15',
    endDate: '2024-05-15',
    difficulty: 'intermediate',
    progress: 60
  },
  {
    id: 3,
    name: 'Машинное обучение',
    description: 'Алгоритмы и методы машинного обучения',
    status: 'active',
    duration: 80,
    students: 18,
    instructor: 'Доц. Сидоров К.Л.',
    startDate: '2024-03-01',
    endDate: '2024-07-01',
    difficulty: 'advanced',
    progress: 45
  },
  {
    id: 4,
    name: 'Базы данных',
    description: 'Проектирование и управление базами данных',
    status: 'completed',
    duration: 50,
    students: 15,
    instructor: 'Доц. Волкова Е.Н.',
    startDate: '2023-09-01',
    endDate: '2023-12-31',
    difficulty: 'intermediate',
    progress: 100
  },
  {
    id: 5,
    name: 'Мобильная разработка',
    description: 'Разработка мобильных приложений',
    status: 'active',
    duration: 70,
    students: 22,
    instructor: 'Проф. Козлов Д.С.',
    startDate: '2024-01-08',
    endDate: '2024-05-08',
    difficulty: 'intermediate',
    progress: 30
  }
]

// Найти курс по ID
const course = computed(() => {
  const courseId = parseInt(route.params.id as string)
  return courses.find(c => c.id === courseId) || null
})

const statusColors: Record<CourseStatus, 'success' | 'warning' | 'error'> = {
  active: 'success',
  completed: 'success',
  paused: 'warning',
  cancelled: 'error'
}

const statusLabels: Record<CourseStatus, string> = {
  active: 'Активен',
  completed: 'Завершен',
  paused: 'Приостановлен',
  cancelled: 'Отменен'
}

const difficultyColors: Record<string, 'info' | 'success' | 'error'> = {
  beginner: 'info',
  intermediate: 'success',
  advanced: 'error'
}

const difficultyLabels: Record<string, string> = {
  beginner: 'Начальный',
  intermediate: 'Средний',
  advanced: 'Продвинутый'
}

// Установить заголовок страницы
useHead({
  title: course.value ? `${course.value.name} - Курсы` : 'Курс не найден'
})

// Использовать layout для курсов
definePageMeta({
  layout: 'courses'
})
</script>

<template>
  <UDashboardPanel v-if="course" id="course-detail">
    <template #header>
      <UDashboardNavbar :title="course.name">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-6">
        <!-- Заголовок и статус -->
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ course.name }}
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-400 mt-2">
              {{ course.description }}
            </p>
          </div>
          <div class="flex items-center gap-3">
            <UBadge
              :color="statusColors[course.status]"
              variant="subtle"
              size="lg"
            >
              {{ statusLabels[course.status] }}
            </UBadge>
            <UBadge
              :color="difficultyColors[course.difficulty]"
              variant="outline"
              size="lg"
            >
              {{ difficultyLabels[course.difficulty] }}
            </UBadge>
          </div>
        </div>

        <!-- Статистика -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <UIcon name="i-lucide-clock" class="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Продолжительность</p>
                <p class="text-2xl font-bold">{{ course.duration }} ч</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <UIcon name="i-lucide-users" class="size-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Студентов</p>
                <p class="text-2xl font-bold">{{ course.students }}</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <UIcon name="i-lucide-user-check" class="size-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Преподаватель</p>
                <p class="text-lg font-semibold">{{ course.instructor }}</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <UIcon name="i-lucide-trending-up" class="size-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p class="text-sm text-muted">Прогресс</p>
                <p class="text-2xl font-bold">{{ course.progress }}%</p>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Детальная информация -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Основная информация -->
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold">Основная информация</h3>
            </template>
            <div class="space-y-4">
              <div>
                <label class="text-sm font-medium text-muted">Название курса</label>
                <p class="text-lg">{{ course.name }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-muted">Описание</label>
                <p class="text-gray-600 dark:text-gray-400">{{ course.description }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-muted">Преподаватель</label>
                <p class="text-lg">{{ course.instructor }}</p>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-muted">Дата начала</label>
                  <p class="text-lg">{{ new Date(course.startDate).toLocaleDateString('ru-RU') }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-muted">Дата окончания</label>
                  <p class="text-lg">{{ new Date(course.endDate).toLocaleDateString('ru-RU') }}</p>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Прогресс -->
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold">Прогресс курса</h3>
            </template>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium">Общий прогресс</span>
                  <span class="text-sm text-muted">{{ course.progress }}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${course.progress}%` }"
                  ></div>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4 pt-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-600">{{ course.progress }}%</div>
                  <div class="text-sm text-muted">Завершено</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-600">{{ 100 - course.progress }}%</div>
                  <div class="text-sm text-muted">Осталось</div>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Действия -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">Действия</h3>
          </template>
          <div class="flex flex-wrap gap-3">
            <UButton
              icon="i-lucide-edit"
              color="primary"
              variant="outline"
            >
              Редактировать курс
            </UButton>
            <UButton
              icon="i-lucide-users"
              color="info"
              variant="outline"
            >
              Управление студентами
            </UButton>
            <UButton
              icon="i-lucide-calendar"
              color="success"
              variant="outline"
            >
              Расписание
            </UButton>
            <UButton
              icon="i-lucide-file-text"
              color="neutral"
              variant="outline"
            >
              Материалы курса
            </UButton>
          </div>
        </UCard>
      </div>
    </template>
  </UDashboardPanel>

  <!-- Курс не найден -->
  <UDashboardPanel v-else id="course-not-found">
    <template #header>
      <UDashboardNavbar title="Курс не найден">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col items-center justify-center h-96 text-center">
        <UIcon name="i-lucide-alert-circle" class="size-16 text-red-400 mb-4" />
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Курс не найден
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-md mb-6">
          Курс с указанным ID не существует или был удален.
        </p>
        <UButton
          to="/courses"
          icon="i-lucide-arrow-left"
          color="primary"
        >
          Вернуться к курсам
        </UButton>
      </div>
    </template>
  </UDashboardPanel>
</template>