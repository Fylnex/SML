<script setup lang="ts">
const { isAuthenticated, logout } = useAuth()
const router = useRouter()

// Если не авторизован, перенаправляем на логин
onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/login')
  }
})

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold mb-6">Профиль</h1>
      
      <div class="space-y-4">
        <div>
          <p class="text-gray-600">Добро пожаловать в ваш профиль!</p>
        </div>

        <button
          @click="handleLogout"
          class="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Выйти
        </button>
      </div>
    </div>
  </div>
</template>

