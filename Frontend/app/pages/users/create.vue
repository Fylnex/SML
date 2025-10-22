<script setup lang="ts">
import { transliterate } from 'transliteration'

const toast = useToast()
const router = useRouter()

// Компоненты Nuxt UI должны быть доступны глобально

// Форма для создания пользователя
const form = ref({
  lastName: '',
  firstName: '',
  middleName: '',
  role: '' as 'root' | 'admin' | 'teacher' | '',
  password: '',
  confirmPassword: ''
})

// Автогенерация логина на основе ФИО
const generatedLogin = computed(() => {
  if (!form.value.lastName || !form.value.firstName) return ''
  
  const lastName = transliterate(form.value.lastName).toLowerCase()
  const firstName = transliterate(form.value.firstName).toLowerCase()
  const middleName = form.value.middleName ? transliterate(form.value.middleName).toLowerCase() : ''
  
  // Формат: фамилия.ио
  const firstInitial = firstName.charAt(0)
  const middleInitial = middleName ? middleName.charAt(0) : ''
  
  return `${lastName}.${firstInitial}${middleInitial}`
})

// Валидация формы
const errors = ref({
  lastName: '',
  firstName: '',
  role: '',
  password: '',
  confirmPassword: ''
})

const validateForm = () => {
  errors.value = {
    lastName: '',
    firstName: '',
    role: '',
    password: '',
    confirmPassword: ''
  }
  
  let isValid = true
  
  if (!form.value.lastName.trim()) {
    errors.value.lastName = 'Фамилия обязательна'
    isValid = false
  }
  
  if (!form.value.firstName.trim()) {
    errors.value.firstName = 'Имя обязательно'
    isValid = false
  }
  
  if (!form.value.role) {
    errors.value.role = 'Роль обязательна'
    isValid = false
  }
  
  if (!form.value.password.trim()) {
    errors.value.password = 'Пароль обязателен'
    isValid = false
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Пароль должен содержать минимум 6 символов'
    isValid = false
  }
  
  if (!form.value.confirmPassword.trim()) {
    errors.value.confirmPassword = 'Подтверждение пароля обязательно'
    isValid = false
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Пароли не совпадают'
    isValid = false
  }
  
  return isValid
}

// Отправка формы
const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  try {
    // Здесь будет API запрос для создания пользователя
    await new Promise(resolve => setTimeout(resolve, 1000)) // Имитация запроса
    
    toast.add({
      title: 'Пользователь создан',
      description: `Пользователь ${form.value.lastName} ${form.value.firstName} успешно создан`
    })
    
    // Перенаправление на страницу пользователей
    await router.push('/users')
  } catch (error) {
    toast.add({
      title: 'Ошибка создания',
      description: 'Произошла ошибка при создании пользователя',
      color: 'error'
    })
  } finally {
    isSubmitting.value = false
  }
}

</script>

<template>
  <UDashboardPanel id="create-user">
     <template #header>
       <UDashboardNavbar>
         <template #leading>
           <UDashboardSidebarCollapse />
         </template>

         <template #title>
           <nav class="flex items-center space-x-2 text-sm">
             <NuxtLink 
               to="/users" 
               class="text-green-600 hover:underline"
             >
               Пользователи
             </NuxtLink>
             <UIcon name="i-lucide-chevron-right" class="size-4 text-gray-400" />
             <span class="text-gray-500">Новый пользователь</span>
           </nav>
         </template>

         <template #right>
           <UButton
             color="neutral"
             variant="ghost"
             icon="i-lucide-arrow-left"
             @click="router.push('/users')"
           >
             Назад к списку
           </UButton>
         </template>
       </UDashboardNavbar>
     </template>

    <template #body>
      <div class="max-w-2xl mx-auto space-y-6">
        <!-- Блок: Аккаунт -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">Аккаунт</h3>
            <p class="text-sm text-muted mt-1">
              Основные данные пользователя
            </p>
          </template>

           <div class="space-y-8">
            <!-- Фамилия -->
            <UFormGroup
              label="Фамилия"
              required
              :error="errors.lastName"
            >
              <UInput
                v-model="form.lastName"
                placeholder="Введите фамилию"
                :disabled="isSubmitting"
              />
            </UFormGroup>

            <!-- Имя -->
            <UFormGroup
              label="Имя"
              required
              :error="errors.firstName"
            >
              <UInput
                v-model="form.firstName"
                placeholder="Введите имя"
                :disabled="isSubmitting"
              />
            </UFormGroup>

            <!-- Отчество -->
            <UFormGroup
              label="Отчество"
              description="Необязательное поле"
            >
              <UInput
                v-model="form.middleName"
                placeholder="Введите отчество"
                :disabled="isSubmitting"
              />
            </UFormGroup>

            <!-- Автогенерированный логин -->
            <UFormGroup
              label="Логин"
              description="Автоматически генерируется на основе ФИО"
            >
              <UInput
                :model-value="generatedLogin"
                readonly
                placeholder="Логин будет сгенерирован автоматически"
                class="bg-muted/50"
              />
              <template #help>
                <div class="text-xs text-muted">
                  Формат: фамилия.ио (на английском языке)
                </div>
              </template>
            </UFormGroup>
          </div>
        </UCard>

         <!-- Блок: Пароль -->
         <UCard>
           <template #header>
             <h3 class="text-lg font-semibold">Пароль</h3>
             <p class="text-sm text-muted mt-1">
               Установите пароль для входа в систему
             </p>
           </template>

           <div class="space-y-8">
             <!-- Пароль -->
             <UFormGroup
               label="Пароль"
               required
               :error="errors.password"
             >
               <UInput
                 v-model="form.password"
                 type="password"
                 placeholder="Введите пароль"
                 :disabled="isSubmitting"
               />
               <template #help>
                 <div class="text-xs text-muted">
                   Минимум 6 символов
                 </div>
               </template>
             </UFormGroup>

             <!-- Подтверждение пароля -->
             <UFormGroup
               label="Подтверждение пароля"
               required
               :error="errors.confirmPassword"
             >
               <UInput
                 v-model="form.confirmPassword"
                 type="password"
                 placeholder="Повторите пароль"
                 :disabled="isSubmitting"
               />
             </UFormGroup>
           </div>
         </UCard>

         <!-- Блок: Доступ -->
         <UCard>
           <template #header>
             <h3 class="text-lg font-semibold">Доступ</h3>
             <p class="text-sm text-muted mt-1">
               Выберите роль пользователя
             </p>
           </template>

           <div class="space-y-6">
             <UFormGroup
               label="Роль"
               required
               :error="errors.role"
             >
               <div class="space-y-4">
                 <label class="flex items-center gap-3 p-4 border border-default rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                   <URadio
                     v-model="form.role"
                     value="root"
                     :disabled="isSubmitting"
                   />
                   <div class="flex items-center gap-3">
                     <UIcon name="i-lucide-crown" class="text-xl text-warning" />
                     <div>
                       <div class="font-medium">Root</div>
                       <div class="text-sm text-muted">Супер-администратор с доступом к модулям</div>
                     </div>
                   </div>
                 </label>

                 <label class="flex items-center gap-3 p-4 border border-default rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                   <URadio
                     v-model="form.role"
                     value="admin"
                     :disabled="isSubmitting"
                   />
                   <div class="flex items-center gap-3">
                     <UIcon name="i-lucide-shield-check" class="text-xl text-error" />
                     <div>
                       <div class="font-medium">Администратор</div>
                       <div class="text-sm text-muted">Полный доступ ко всем функциям</div>
                     </div>
                   </div>
                 </label>

                 <label class="flex items-center gap-3 p-4 border border-default rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                   <URadio
                     v-model="form.role"
                     value="teacher"
                     :disabled="isSubmitting"
                   />
                   <div class="flex items-center gap-3">
                     <UIcon name="i-lucide-graduation-cap" class="text-xl text-primary" />
                     <div>
                       <div class="font-medium">Преподаватель</div>
                       <div class="text-sm text-muted">Обычный доступ к системе</div>
                     </div>
                   </div>
                 </label>
               </div>
             </UFormGroup>
           </div>
         </UCard>

        <!-- Кнопки действий -->
        <div class="flex items-center justify-end gap-3">
          <UButton
            type="button"
            color="neutral"
            variant="outline"
            :disabled="isSubmitting"
            @click="router.push('/users')"
          >
            Отмена
          </UButton>
          
          <UButton
            type="button"
            :loading="isSubmitting"
            :disabled="!form.lastName || !form.firstName || !form.role || !form.password || !form.confirmPassword"
            @click="handleSubmit"
          >
            Создать пользователя
          </UButton>
        </div>

        <!-- Предварительный просмотр -->
        <UCard v-if="form.lastName && form.firstName" class="mt-6">
          <template #header>
            <h3 class="text-lg font-medium">Предварительный просмотр</h3>
          </template>

          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <UAvatar
                :alt="`${form.lastName} ${form.firstName}`"
                size="lg"
              />
              <div>
                <p class="font-medium">
                  {{ form.lastName }} {{ form.firstName }} {{ form.middleName }}
                </p>
                <p class="text-sm text-muted">
                  {{ generatedLogin }}@sml.ru
                </p>
              </div>
            </div>

             <div class="flex items-center gap-2">
               <UBadge
                 :color="form.role === 'root' ? 'warning' : form.role === 'admin' ? 'error' : 'primary'"
                 variant="subtle"
               >
                 {{ form.role === 'root' ? 'Root' : form.role === 'admin' ? 'Администратор' : 'Преподаватель' }}
               </UBadge>
              
              <UBadge
                color="success"
                variant="subtle"
              >
                Активен
              </UBadge>
            </div>
          </div>
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
