<script setup lang="ts">
import type { StaggeredMenuItem, StaggeredMenuSocialItem } from '~/components/StaggeredMenu.vue'
import { computed } from 'vue'

const { isAuthenticated } = useAuth()

const menuItems: StaggeredMenuItem[] = [
  { label: 'Главная', ariaLabel: 'Перейти на главную страницу', link: '/' },
  { label: 'Задания', ariaLabel: 'Перейти к заданиям', link: '/tasks' },
  { label: 'Лаборатории', ariaLabel: 'Перейти к лабораториям', link: '/laboratories' },
  { label: 'Панель управления', ariaLabel: 'Перейти в панель управления', link: '/control' }
]

// Динамические ссылки в зависимости от авторизации
const socialItems = computed<StaggeredMenuSocialItem[]>(() => {
  if (isAuthenticated.value) {
    return [
      { label: 'Настройки', link: '/settings' },
      { label: 'Профиль', link: '/profile' }
    ]
  } else {
    return [
      { label: 'Вход', link: '/login' }
    ]
  }
})

const handleMenuOpen = () => console.log('Menu opened')
const handleMenuClose = () => console.log('Menu closed')
</script>

<template>
  <div class="min-h-screen flex flex-col relative">
    <!-- Staggered Menu -->
    <div class="fixed inset-0 z-50 pointer-events-none">
      <ClientOnly>
        <StaggeredMenu
          position="right"
          :items="menuItems"
          :social-items="socialItems"
          :display-socials="true"
          :display-item-numbering="true"
          menu-button-color="#fff"
          open-menu-button-color="#000"
          :change-menu-color-on-open="true"
          :colors="['#9EF2B2', '#27FF64']"
          logo-url="/favicon.ico"
          accent-color="#27FF64"
          :on-menu-open="handleMenuOpen"
          :on-menu-close="handleMenuClose"
        />
      </ClientOnly>
    </div>

    <!-- Main content -->
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
