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
    <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold mb-6">Настройки</h1>
      
      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-semibold mb-4">Общие настройки</h2>
          <p class="text-gray-600">Здесь будут настройки приложения</p>
        </div>

        <div class="pt-6 border-t">
          <button
            @click="handleLogout"
            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition-colors"
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
