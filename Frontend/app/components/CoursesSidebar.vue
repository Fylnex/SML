<script setup lang="ts">
import type { Course, CourseStatus } from '~/types'

defineProps<{
  collapsed?: boolean
}>()

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

const router = useRouter()
const searchQuery = ref('')

// Фильтрованные курсы
const filteredCourses = computed(() => {
  if (!searchQuery.value.trim()) {
    return courses
  }
  
  const query = searchQuery.value.toLowerCase()
  return courses.filter(course => 
    course.name.toLowerCase().includes(query) ||
    course.description.toLowerCase().includes(query) ||
    course.instructor.toLowerCase().includes(query)
  )
})

const selectCourse = (course: Course) => {
  router.push(`/courses/${course.id}`)
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Поиск -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <UInput
        v-model="searchQuery"
        :placeholder="collapsed ? 'Поиск...' : 'Поиск курсов...'"
        icon="i-lucide-search"
        size="sm"
        class="w-full"
      />
    </div>

    <!-- Список курсов -->
    <div class="flex-1 overflow-y-auto">
      <div class="p-2 space-y-1">
        <UButton
          v-for="course in filteredCourses"
          :key="course.id"
          :label="collapsed ? course.name.substring(0, 3) : course.name"
          :color="statusColors[course.status]"
          variant="ghost"
          size="sm"
          block
          class="justify-start"
          @click="selectCourse(course)"
        >
          <template #leading>
            <UIcon 
              :name="course.status === 'active' ? 'i-lucide-book-open' : course.status === 'completed' ? 'i-lucide-check-circle' : course.status === 'paused' ? 'i-lucide-pause-circle' : 'i-lucide-x-circle'" 
              class="size-4"
            />
          </template>
        </UButton>
        
        <!-- Сообщение если ничего не найдено -->
        <div v-if="filteredCourses.length === 0" class="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <UIcon name="i-lucide-search-x" class="size-6 mx-auto mb-2" />
          <p>Курсы не найдены</p>
        </div>
      </div>
    </div>
  </div>
</template>
