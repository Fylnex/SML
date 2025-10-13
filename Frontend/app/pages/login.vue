<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const toast = useToast()
const router = useRouter()

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

// Обработка отправки формы
const handleSubmit = async () => {
  // Сброс ошибок
  loginError.value = ''
  passwordError.value = ''

  // Валидация
  if (!form.value.login) {
    loginError.value = 'Логин обязателен'
    return
  }
  
  if (form.value.login.length < 3) {
    loginError.value = 'Логин должен содержать минимум 3 символа'
    return
  }
  
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
    <div class="mb-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white text-center">
        Вход в систему
      </h3>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
        Введите свои учетные данные для входа
      </p>
    </div>

    <UForm @submit="handleSubmit" class="space-y-6">
      <!-- Логин поле -->
      <div>
        <UFormGroup
          label="Логин"
          name="login"
          :error="loginError"
          required
        >
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
        </UFormGroup>
      </div>

      <!-- Пароль поле -->
      <div>
        <UFormGroup
          label="Пароль"
          name="password"
          :error="passwordError"
          required
        >
          <UInput
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Введите ваш пароль"
            icon="i-lucide-lock"
            :disabled="isLoading"
            @keydown="handleKeydown"
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
        </UFormGroup>
      </div>

      <!-- Запомнить меня -->
      <div class="flex items-center justify-between">
        <UCheckbox
          v-model="rememberMe"
          label="Запомнить меня"
          :disabled="isLoading"
        />
        
        <UButton
          variant="link"
          color="primary"
          size="sm"
          :disabled="isLoading"
        >
          Забыли пароль?
        </UButton>
      </div>

      <!-- Кнопка входа -->
      <div>
        <UButton
          type="submit"
          block
          size="lg"
          :loading="isLoading"
          :disabled="isLoading"
          icon="i-lucide-log-in"
          class="w-full"
        >
          {{ isLoading ? 'Вход...' : 'Войти в систему' }}
        </UButton>
      </div>

    </UForm>
  </div>
</template>