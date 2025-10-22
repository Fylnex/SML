<script setup lang="ts">
const links = [[{
  label: 'Роли',
  icon: 'i-lucide-shield',
  to: '/roles'
}, {
  label: 'Пользователи',
  icon: 'i-lucide-user-check',
  to: '/users'
}, {
  label: 'Группы',
  icon: 'i-lucide-users',
  to: '/groups'
}]] satisfies NavigationMenuItem[][]
</script>

<template>
  <UDashboardPanel id="permissions" :ui="{ body: 'lg:py-12' }">
    <template #header>
      <UDashboardNavbar title="Разрешения">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <!-- NOTE: The `-mx-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
        <UNavigationMenu :items="links" highlight class="-mx-1 flex-1" />
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-4 sm:gap-6 lg:gap-12 w-full lg:max-w-2xl mx-auto">
        <NuxtPage />
      </div>
    </template>
  </UDashboardPanel>
</template>
