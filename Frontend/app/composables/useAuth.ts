import { computed, ref } from 'vue'

// Глобальное состояние авторизации
const isAuthenticatedState = ref(false)

export const useAuth = () => {
  // Проверка авторизации
  const checkAuth = () => {
    if (process.client) {
      // Проверяем наличие токена в localStorage
      const token = localStorage.getItem('authToken')
      // Или проверяем cookie
      const hasAuthCookie = document.cookie.includes('auth=')
      
      isAuthenticatedState.value = !!(token || hasAuthCookie)
    }
    return isAuthenticatedState.value
  }

  // Вход пользователя
  const login = (token: string) => {
    if (process.client) {
      localStorage.setItem('authToken', token)
      isAuthenticatedState.value = true
    }
  }

  // Выход пользователя
  const logout = () => {
    if (process.client) {
      localStorage.removeItem('authToken')
      // Очистка cookie при необходимости
      document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      isAuthenticatedState.value = false
    }
  }

  // Computed свойство для реактивности
  const isAuthenticated = computed(() => {
    if (!isAuthenticatedState.value && process.client) {
      checkAuth()
    }
    return isAuthenticatedState.value
  })

  return {
    isAuthenticated,
    checkAuth,
    login,
    logout
  }
}

