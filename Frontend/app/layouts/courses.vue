<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const toast = useToast()

const open = ref(false)
const coursesSidebarOpen = ref(true) // Всегда открыт в layout для курсов

const links = [[{
  label: 'Главная',
  icon: 'i-lucide-house',
  to: '/',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Входящие',
  icon: 'i-lucide-inbox',
  to: '/inbox',
  badge: '4',
  onSelect: () => {
    open.value = false
  }
}, 
{
  label: 'Группы',
  icon: 'i-lucide-users',
  to: '/groups',
  onSelect: () => {
    open.value = false
  }
},
{
  label: 'Лаборатории',
  icon: 'i-lucide-flask-conical',
  to: '/laboratories',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Курсы',
  icon: 'i-lucide-book-open',
  to: '/courses',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Модули',
  icon: 'i-lucide-puzzle',
  to: '/modules',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Разрешения',
  to: '/permissions',
  icon: 'i-lucide-shield',
  defaultOpen: false,
  type: 'trigger',
  children: [{
    label: 'Пользователи',
    to: '/permissions/users',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Группы',
    to: '/permissions/groups',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Роли',
    to: '/permissions/roles',
    onSelect: () => {
      open.value = false
    }
  }]
}, {
  label: 'Настройки',
  to: '/settings',
  icon: 'i-lucide-settings',
  defaultOpen: false,
  type: 'trigger',
  children: [{
    label: 'Общие',
    to: '/settings',
    exact: true,
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Уведомления',
    to: '/settings/notifications',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Безопасность',
    to: '/settings/security',
    onSelect: () => {
      open.value = false
    }
  }]
}], [{
  label: 'Помощь и поддержка',
  icon: 'i-lucide-info',
  to: '/help',
  onSelect: () => {
    open.value = false
  }
}]] satisfies NavigationMenuItem[][]

const groups = computed(() => [{
  id: 'links',
  label: 'Перейти к',
  items: links.flat()
}, {
  id: 'code',
  label: 'Код',
  items: [{
    id: 'source',
    label: 'Просмотр исходного кода страницы',
    icon: 'i-simple-icons-github',
    to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank'
  }]
}])

onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') {
    return
  }

  toast.add({
    title: 'Мы используем собственные файлы cookie для улучшения вашего опыта на нашем веб-сайте.',
    duration: 0,
    close: false,
    actions: [{
      label: 'Принять',
      color: 'neutral',
      variant: 'outline',
      onClick: () => {
        cookie.value = 'accepted'
      }
    }, {
      label: 'Отказаться',
      color: 'neutral',
      variant: 'ghost'
    }]
  })
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <!-- Основной сайдбар -->
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <TeamsMenu :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <!-- Сайдбар курсов -->
    <UDashboardSidebar
      id="courses"
      v-model:open="coursesSidebarOpen"
      side="right"
      collapsible
      resizable
      class="bg-elevated/25"
    >
      <template #default="{ collapsed }">
        <CoursesSidebar :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <slot />

    <NotificationsSlideover />
  </UDashboardGroup>
</template>
