<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const toast = useToast()
const router = useRouter()
const { login } = useAuth()

// Состояние формы
const isLoading = ref(false)
const rememberMe = ref(false)
const showPassword = ref(false)
const form = ref({
  login: '',
  password: ''
})

// Валидация
const loginError = ref('')
const passwordError = ref('')

// Этапы входа
const loginStep = ref<'login' | 'password'>('login')

// Обработка отправки формы
const handleSubmit = async () => {
  // Сброс ошибок
  loginError.value = ''
  passwordError.value = ''

  // Этап 1: Ввод логина
  if (loginStep.value === 'login') {
    if (!form.value.login) {
      loginError.value = 'Логин обязателен'
      return
    }
    
    if (form.value.login.length < 3) {
      loginError.value = 'Логин должен содержать минимум 3 символа'
      return
    }

    // Переход к этапу ввода пароля
    loginStep.value = 'password'
    return
  }

  // Этап 2: Ввод пароля
  if (!form.value.password) {
    passwordError.value = 'Пароль обязателен'
    return
  }
  
  if (form.value.password.length < 6) {
    passwordError.value = 'Пароль должен содержать минимум 6 символов'
    return
  }

  isLoading.value = true

  try {
    // Имитация запроса к серверу
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Проверка демо-данных
    if (form.value.login === 'admin' && form.value.password === 'admin123') {
      // Генерируем токен (в реальном приложении получаем с сервера)
      const token = `demo-token-${Date.now()}`
      
      // Сохраняем авторизацию
      login(token)
      
      toast.add({
        title: 'Успешный вход',
        description: 'Добро пожаловать в систему!',
        color: 'success'
      })
      
      // Перенаправление на главную страницу
      await router.push('/')
    } else {
      toast.add({
        title: 'Ошибка авторизации',
        description: 'Неверный логин или пароль',
        color: 'error'
      })
      // Сбрасываем только пароль, логин сохраняется
      form.value.password = ''
      passwordError.value = 'Неверный пароль'
    }
  } catch (error) {
    toast.add({
      title: 'Ошибка',
      description: 'Произошла ошибка при входе в систему',
      color: 'error'
    })
  } finally {
    isLoading.value = false
  }
}

// Возврат к вводу логина
const backToLogin = () => {
  loginStep.value = 'login'
  form.value.password = ''
  passwordError.value = ''
}

// Обработка Enter в полях
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSubmit()
  }
}

// Переключение видимости пароля
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

</script>

<template>
  <div>
    <UForm @submit="handleSubmit" class="space-y-6">
      <!-- Логин поле -->
      <div v-show="loginStep === 'login'">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Логин <span class="text-red-500">*</span>
          </label>
          <UInput
            v-model="form.login"
            type="text"
            placeholder="Введите ваш логин"
            icon="i-lucide-user"
            :disabled="isLoading"
            @keydown="handleKeydown"
            size="lg"
            class="w-full"
          />
          <div v-if="loginError" class="text-sm text-red-500">
            {{ loginError }}
          </div>
        </div>
      </div>

      <!-- Пароль поле -->
      <div v-show="loginStep === 'password'">
        <!-- Отображение логина -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Логин
          </label>
          <UInput
            :model-value="form.login"
            type="text"
            readonly
            disabled
            size="lg"
            class="w-full opacity-100"
          />
        </div>
        
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Пароль
            </label>
            <UButton
              variant="link"
              color="neutral"
              size="sm"
              :disabled="isLoading"
              class="text-xs p-0 h-auto min-h-0"
            >
              Забыли пароль?
            </UButton>
          </div>
          
          <UInput
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Ваш пароль"
            :disabled="isLoading"
            size="lg"
            class="w-full"
          >
            <template #trailing>
              <UButton
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                variant="ghost"
                color="neutral"
                size="sm"
                :disabled="isLoading"
                @click="togglePasswordVisibility"
                class="!p-1"
              />
            </template>
          </UInput>
          <div v-if="passwordError" class="text-sm text-red-500">
            {{ passwordError }}
          </div>
        </div>
      </div>

      <!-- Кнопка входа -->
      <div>
        <UButton
          v-if="loginStep === 'login'"
          type="submit"
          block
          size="lg"
          :loading="isLoading"
          :disabled="isLoading"
          class="w-full"
        >
          Продолжить
        </UButton>
        <div v-else class="space-y-3">
          <UButton
            type="submit"
            block
            size="lg"
            :loading="isLoading"
            :disabled="isLoading"
            class="w-full"
          >
            {{ isLoading ? 'Вход...' : 'Войти' }}
          </UButton>
          <div class="flex justify-center">
            <UButton
              variant="ghost"
              size="sm"
              :disabled="isLoading"
              @click="backToLogin"
              class="text-xs"
            >
              <template #leading>
                <UIcon name="i-lucide-chevron-left" class="size-4" />
              </template>
              Назад
            </UButton>
          </div>
        </div>
      </div>

    </UForm>
  </div>
</template>