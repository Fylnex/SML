<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const toast = useToast()

const open = ref(false)

const links = [[{
  label: 'Главная',
  icon: 'i-lucide-house',
  to: '/control',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Входящие',
  icon: 'i-lucide-inbox',
  to: '/control/inbox',
  badge: '4',
  onSelect: () => {
    open.value = false
  }
}, 
{
  label: 'Группы',
  icon: 'i-lucide-users',
  to: '/control/groups',
  onSelect: () => {
    open.value = false
  }
},
{
  label: 'Лаборатории',
  icon: 'i-lucide-flask-conical',
  to: '/control/laboratories',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Курсы',
  icon: 'i-lucide-book-open',
  to: '/control/courses',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Модули',
  icon: 'i-lucide-puzzle',
  to: '/control/modules',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Разрешения',
  to: '/control/permissions',
  icon: 'i-lucide-shield',
  defaultOpen: false,
  type: 'trigger',
  children: [{
    label: 'Пользователи',
    to: '/control/permissions/users',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Группы',
    to: '/control/permissions/groups',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Роли',
    to: '/control/permissions/roles',
    onSelect: () => {
      open.value = false
    }
  }]
}, {
  label: 'Настройки',
  to: '/control/settings',
  icon: 'i-lucide-settings',
  defaultOpen: false,
  type: 'trigger',
  children: [{
    label: 'Общие',
    to: '/control/settings',
    exact: true,
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Уведомления',
    to: '/control/settings/notifications',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Безопасность',
    to: '/control/settings/security',
    onSelect: () => {
      open.value = false
    }
  }]
}], [{
  label: 'Помощь и поддержка',
  icon: 'i-lucide-info',
  to: '/control/help',
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
    to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/control' ? '/control/index' : route.path}.vue`,
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


    <UDashboardSearch :groups="groups" />

    <slot />

    <NotificationsSlideover />
  </UDashboardGroup>
</template>
