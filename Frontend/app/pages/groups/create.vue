<script setup lang="ts">
// Типы для формы создания группы
interface GroupForm {
  name: string
  code: string
  description: string
  course: string
  instructor: string
  maxStudents: number
  startDate: string
  endDate: string
  location: string
  schedule: string
  status: 'active' | 'inactive'
}

// Реактивная форма
const form = ref<GroupForm>({
  name: '',
  code: '',
  description: '',
  course: '',
  instructor: '',
  maxStudents: 25,
  startDate: '',
  endDate: '',
  location: '',
  schedule: '',
  status: 'active'
})

// Валидация
const errors = ref<Partial<Record<keyof GroupForm, string>>>({})

// Список курсов для выбора
const courses = ref([
  'Основы программирования',
  'Веб-разработка',
  'Машинное обучение',
  'Базы данных',
  'Мобильная разработка',
  'Кибербезопасность',
  'Алгоритмы и структуры данных',
  'Операционные системы'
])

// Список преподавателей
const instructors = ref([
  'Доц. Козлов Д.С.',
  'Проф. Петрова М.В.',
  'Доц. Сидоров К.Л.',
  'Доц. Волкова Е.Н.',
  'Проф. Иванов А.А.',
  'Доц. Морозов П.В.'
])

const toast = useToast()
const router = useRouter()

// Валидация формы
const validateForm = () => {
  errors.value = {}
  
  if (!form.value.name.trim()) {
    errors.value.name = 'Название группы обязательно'
  }
  
  if (!form.value.code.trim()) {
    errors.value.code = 'Код группы обязателен'
  }
  
  if (!form.value.course.trim()) {
    errors.value.course = 'Курс обязателен'
  }
  
  if (!form.value.instructor.trim()) {
    errors.value.instructor = 'Преподаватель обязателен'
  }
  
  if (form.value.maxStudents < 1) {
    errors.value.maxStudents = 'Максимальное количество студентов должно быть больше 0'
  }
  
  if (!form.value.startDate) {
    errors.value.startDate = 'Дата начала обязательна'
  }
  
  if (!form.value.endDate) {
    errors.value.endDate = 'Дата окончания обязательна'
  }
  
  if (form.value.startDate && form.value.endDate && new Date(form.value.startDate) >= new Date(form.value.endDate)) {
    errors.value.endDate = 'Дата окончания должна быть позже даты начала'
  }
  
  if (!form.value.location.trim()) {
    errors.value.location = 'Местоположение обязательно'
  }
  
  if (!form.value.schedule.trim()) {
    errors.value.schedule = 'Расписание обязательно'
  }
  
  return Object.keys(errors.value).length === 0
}

// Отправка формы
const submitForm = async () => {
  if (!validateForm()) {
    toast.add({
      title: 'Ошибка валидации',
      description: 'Пожалуйста, исправьте ошибки в форме',
      color: 'error'
    })
    return
  }
  
  try {
    // Здесь будет API запрос для создания группы
    console.log('Создание группы:', form.value)
    
    toast.add({
      title: 'Группа создана',
      description: `Группа "${form.value.name}" успешно создана`,
      color: 'success'
    })
    
    // Перенаправление на страницу групп
    await router.push('/groups')
  } catch (error) {
    toast.add({
      title: 'Ошибка создания',
      description: 'Не удалось создать группу',
      color: 'error'
    })
  }
}

// Сброс формы
const resetForm = () => {
  form.value = {
    name: '',
    code: '',
    description: '',
    course: '',
    instructor: '',
    maxStudents: 25,
    startDate: '',
    endDate: '',
    location: '',
    schedule: '',
    status: 'active'
  }
  errors.value = {}
}
</script>

<template>
  <UDashboardPanel id="create-group">
    <template #header>
      <UDashboardNavbar title="Создание группы">
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
            icon="i-lucide-x"
            variant="ghost"
            color="neutral"
            @click="$router.push('/groups')"
          >
            Отмена
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="max-w-4xl mx-auto space-y-6">
        <!-- Основная информация -->
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold">Основная информация</h2>
          </template>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup
              label="Название группы"
              :error="errors.name"
              required
            >
              <UInput
                v-model="form.name"
                placeholder="Например: Группа А-101"
              />
            </UFormGroup>

            <UFormGroup
              label="Код группы"
              :error="errors.code"
              required
            >
              <UInput
                v-model="form.code"
                placeholder="Например: GRP-A101"
              />
            </UFormGroup>

            <UFormGroup
              label="Курс"
              :error="errors.course"
              required
              class="md:col-span-2"
            >
              <USelect
                v-model="form.course"
                :options="courses"
                placeholder="Выберите курс"
                searchable
              />
            </UFormGroup>

            <UFormGroup
              label="Преподаватель"
              :error="errors.instructor"
              required
              class="md:col-span-2"
            >
              <USelect
                v-model="form.instructor"
                :options="instructors"
                placeholder="Выберите преподавателя"
                searchable
              />
            </UFormGroup>

            <UFormGroup
              label="Описание"
              class="md:col-span-2"
            >
              <UTextarea
                v-model="form.description"
                placeholder="Краткое описание группы"
                :rows="3"
              />
            </UFormGroup>
          </div>
        </UCard>

        <!-- Настройки группы -->
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold">Настройки группы</h2>
          </template>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup
              label="Максимальное количество студентов"
              :error="errors.maxStudents"
              required
            >
              <UInput
                v-model.number="form.maxStudents"
                type="number"
                min="1"
                max="100"
              />
            </UFormGroup>

            <UFormGroup
              label="Статус группы"
            >
              <USelect
                v-model="form.status"
                :options="[
                  { label: 'Активна', value: 'active' },
                  { label: 'Неактивна', value: 'inactive' }
                ]"
              />
            </UFormGroup>

            <UFormGroup
              label="Дата начала"
              :error="errors.startDate"
              required
            >
              <UInput
                v-model="form.startDate"
                type="date"
              />
            </UFormGroup>

            <UFormGroup
              label="Дата окончания"
              :error="errors.endDate"
              required
            >
              <UInput
                v-model="form.endDate"
                type="date"
              />
            </UFormGroup>

            <UFormGroup
              label="Местоположение"
              :error="errors.location"
              required
              class="md:col-span-2"
            >
              <UInput
                v-model="form.location"
                placeholder="Например: Корпус А, аудитория 101"
              />
            </UFormGroup>

            <UFormGroup
              label="Расписание"
              :error="errors.schedule"
              required
              class="md:col-span-2"
            >
              <UInput
                v-model="form.schedule"
                placeholder="Например: Пн, Ср, Пт 10:00-12:00"
              />
            </UFormGroup>
          </div>
        </UCard>

        <!-- Действия -->
        <div class="flex justify-end gap-3">
          <UButton
            variant="outline"
            @click="resetForm"
          >
            Сбросить
          </UButton>
          <UButton
            color="primary"
            @click="submitForm"
          >
            Создать группу
          </UButton>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>


